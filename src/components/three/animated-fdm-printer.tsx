import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Box3, BufferGeometry, Float32BufferAttribute, Group, Mesh, MeshStandardMaterial, Plane, Vector3 } from "three";
import { scenePresets } from "@/content/scenes";
import { printerPose, processStage, type PresentationMotion } from "@/lib/scroll-presentation";
import type { LoadedModel } from "./model-resources";

/** Shared GLB geometry; this component owns only its print material and scene clones. */
export function AnimatedFdmPrinter({ scene, gearScene, presentation, active, reducedMotion, onMotionChange }: {
  scene: LoadedModel["scene"]; gearScene: LoadedModel["scene"];
  presentation: RefObject<PresentationMotion>; active: boolean; reducedMotion: boolean;
  onMotionChange: (active: boolean) => void;
}) {
  const root = useRef<Group>(null);
  const part = useRef<Group>(null);
  const layer = useRef<Mesh>(null);
  const data = useMemo(() => {
    const printer = scene.clone(true);
    const gear = gearScene.clone(true);
    gear.updateMatrixWorld(true);
    const box = new Box3().setFromObject(gear);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const preset = scenePresets.process.printer;
    const scale = preset.partSize / Math.max(size.x, size.y, size.z);
    gear.scale.setScalar(scale);
    gear.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
    gear.updateMatrixWorld(true);
    const clipping = new Plane(new Vector3(0, -1, 0), 100);
    const material = new MeshStandardMaterial({ color: preset.filamentColor, metalness: 0, roughness: 0.68, clippingPlanes: [clipping] });
    // Fine horizontal ridges distinguish printed polymer from the metallic sample.
    material.onBeforeCompile = shader => {
      shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nvarying float vPrintY;")
        .replace("#include <worldpos_vertex>", "#include <worldpos_vertex>\nvPrintY = transformed.y;");
      shader.fragmentShader = shader.fragmentShader.replace("#include <common>", "#include <common>\nvarying float vPrintY;")
        .replace("#include <color_fragment>", "#include <color_fragment>\nfloat ridge = smoothstep(.15, .45, abs(sin(vPrintY * 355.0)));\ndiffuseColor.rgb *= .82 + ridge * .18;");
    };
    material.customProgramCacheKey = () => "orbitart-print-layers-v1";
    gear.traverse(node => { if (node instanceof Mesh) node.material = material; });
    // Project upward faces into a filled print layer; clipping alone leaves an open shell.
    const faces: number[] = [];
    const vertices = [new Vector3(), new Vector3(), new Vector3()];
    const normal = new Vector3();
    const edge = new Vector3();
    gear.traverse(node => {
      if (!(node instanceof Mesh)) return;
      const position = node.geometry.getAttribute("position");
      const index = node.geometry.index;
      for (let i = 0; i < (index?.count ?? position.count); i += 3) {
        for (let j = 0; j < 3; j++) vertices[j].fromBufferAttribute(position, index ? index.getX(i + j) : i + j).applyMatrix4(node.matrixWorld);
        normal.subVectors(vertices[1], vertices[0]).cross(edge.subVectors(vertices[2], vertices[0])).normalize();
        if (normal.y > 0.6) for (const vertex of vertices) faces.push(vertex.x, 0, vertex.z);
      }
    });
    const layerGeometry = new BufferGeometry();
    layerGeometry.setAttribute("position", new Float32BufferAttribute(faces, 3));
    layerGeometry.computeVertexNormals();
    const layerMaterial = new MeshStandardMaterial({ color: preset.filamentColor, roughness: 0.68, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
    return { printer, gear, clipping, material, layerGeometry, layerMaterial, height: size.y * scale, head: printer.getObjectByName("print-head"), gantry: printer.getObjectByName("print-gantry"), bed: printer.getObjectByName("print-bed"), bedEdge: printer.getObjectByName("bed-violet-edge") };
  }, [scene, gearScene]);
  const resources = useRef<typeof data | null>(null);
  useEffect(() => { resources.current = data; return () => { resources.current = null; data.material.dispose(); data.layerMaterial.dispose(); data.layerGeometry.dispose(); onMotionChange(false); }; }, [data, onMotionChange]);
  useEffect(() => { if (!active) onMotionChange(false); }, [active, onMotionChange]);
  useFrame(({ clock, invalidate }) => {
    const current = resources.current;
    if (!current) return;
    const progress = presentation.current.process;
    const stage = processStage(progress);
    const pose = printerPose(progress, reducedMotion ? 0 : clock.elapsedTime);
    const printing = active && !reducedMotion && stage === 3 && pose.complete < 1;
    onMotionChange(printing);
    if (printing) invalidate();
    if (root.current) root.current.visible = !reducedMotion && stage >= 3;
    const preset = scenePresets.process.printer;
    const layerHeight = current.height * Math.max(pose.complete, 0.015);
    if (layer.current) { layer.current.position.y = layerHeight; layer.current.visible = stage === 3 && pose.complete < 1; }
    current.printer.visible = stage === 3 || pose.reveal < 1;
    current.printer.scale.setScalar(1 - pose.reveal);
    const headHeight = preset.bedY + layerHeight + preset.nozzleGap;
    // Cartesian FDM: head travels horizontally and rises; bed carries the part along depth.
    if (current.head) current.head.position.set(pose.x, headHeight, 0);
    if (current.gantry) current.gantry.position.y = headHeight;
    if (current.bed) current.bed.position.z = -pose.z;
    if (current.bedEdge) current.bedEdge.position.z = 1.32 - pose.z;
    if (part.current) {
      part.current.position.y = preset.bedY + pose.reveal * preset.resultLift;
      part.current.position.z = -pose.z * (1 - pose.reveal);
      part.current.scale.setScalar(1 + pose.reveal * preset.resultEnlarge);
      part.current.rotation.set(pose.reveal * 0.45, pose.reveal * 0.25, pose.reveal * 0.12);
    }
    current.clipping.constant = stage === 3 ? preset.bedY + layerHeight : 100;
  });
  return <group ref={root} visible={false}>
    <primitive object={data.printer} dispose={null} />
    <group ref={part} position={[0, scenePresets.process.printer.bedY, 0]}>
      <primitive object={data.gear} dispose={null} />
      <mesh ref={layer} geometry={data.layerGeometry} material={data.layerMaterial} dispose={null} />
    </group>
  </group>;
}
