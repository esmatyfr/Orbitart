import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Box3, BufferGeometry, Float32BufferAttribute, Mesh, MeshStandardMaterial, Plane, Vector3, type Material, type Points, type Group } from "three";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";
import { modelPresentation, scenePresets } from "@/content/scenes";
import { motionSettings } from "@/content/motion";
import { processStage, processStageProgress, type PresentationMotion } from "@/lib/scroll-presentation";
import type { ModelAsset } from "@/types/model-asset";
import type { LoadedModel } from "./model-resources";

/** All effects derive from one loaded GLB. Own materials/point geometry, shared source geometry/textures. */
export function AnimatedProcessModel({ asset, scene, maxSize, floorY, onReady, presentation, reducedMotion }: {
  asset: ModelAsset; scene: LoadedModel["scene"]; maxSize: number; floorY: number;
  onReady: () => void; presentation: RefObject<PresentationMotion>; reducedMotion: boolean;
}) {
  const points = useRef<Points>(null);
  const band = useRef<Mesh>(null);
  const rotationGroup = useRef<Group>(null);
  const data = useMemo(() => {
    const surface = scene.clone(true);
    const orientation = modelPresentation[asset.id];
    surface.rotation.set(...orientation.rotation);
    surface.updateMatrixWorld(true);
    const box = new Box3().setFromObject(surface);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = maxSize * orientation.sizeMultiplier / Math.max(size.x, size.y, size.z, 0.001);
    surface.scale.multiplyScalar(scale);
    surface.position.set(-center.x * scale, floorY - box.min.y * scale, -center.z * scale);
    surface.updateMatrixWorld(true);
    const materials: Material[] = [];
    const clipping = new Plane(new Vector3(0, -1, 0), 100);
    const triangles: number[] = [];
    const vertex = new Vector3();
    surface.traverse(object => {
      if (!(object instanceof Mesh)) return;
      const cloneMaterial = (source: Material) => {
        const material = source.clone();
        material.clippingPlanes = [clipping];
        materials.push(material);
        return material;
      };
      object.material = Array.isArray(object.material) ? object.material.map(cloneMaterial) : cloneMaterial(object.material);
      const position = object.geometry.getAttribute("position");
      const index = object.geometry.index;
      // Bake all mesh transforms before surface sampling, so triangle area weights are correct.
      for (let i = 0; i < (index?.count ?? position.count); i++) {
        vertex.fromBufferAttribute(position, index ? index.getX(i) : i).applyMatrix4(object.matrixWorld);
        triangles.push(vertex.x, vertex.y, vertex.z);
      }
    });
    const merged = new BufferGeometry();
    merged.setAttribute("position", new Float32BufferAttribute(triangles, 3));
    const sampleMaterial = new MeshStandardMaterial();
    const sampler = new MeshSurfaceSampler(new Mesh(merged, sampleMaterial)).build();
    const sampled = new Float32Array(motionSettings.pointCount * 3);
    for (let i = 0; i < motionSettings.pointCount; i++) {
      sampler.sample(vertex);
      vertex.toArray(sampled, i * 3);
    }
    merged.dispose();
    sampleMaterial.dispose();
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(sampled, 3));
    const bounds = new Box3().setFromObject(surface);
    return { surface, materials, clipping, geometry, min: bounds.min.y, height: bounds.max.y - bounds.min.y };
  }, [asset.id, scene, maxSize, floorY]);
  const resources = useRef<typeof data | null>(null);
  useEffect(() => { resources.current = data; onReady(); return () => { data.materials.forEach(material => material.dispose()); data.geometry.dispose(); }; }, [data, onReady]);
  useFrame((frame) => {
    const current = resources.current;
    if (!current) return;
    const progress = presentation.current.process;
    if (rotationGroup.current) rotationGroup.current.rotation.y = reducedMotion ? 0 : progress * 0.3;
    const stage = reducedMotion ? 0 : processStage(progress);
    if (rotationGroup.current) rotationGroup.current.position.y = frame.gl.domElement.clientWidth < 640 && stage < 3 ? scenePresets.process.phoneSampleLift : 0;
    const local = processStageProgress(progress);
    const scanFade = stage === 1 ? Math.min(1, local * 6) : 0;
    if (rotationGroup.current) rotationGroup.current.visible = stage < 3;
    current.surface.visible = stage !== 1 || scanFade < 1;
    if (points.current) {
      points.current.visible = stage === 1;
      const material = points.current.material;
      if (!Array.isArray(material)) material.setValues({ opacity: scanFade * 0.85 });
    }
    if (band.current) {
      band.current.visible = stage === 1;
      band.current.position.y = current.min + current.height * local;
    }
    current.clipping.constant = 100;
    for (const material of current.materials) {
      if (material instanceof MeshStandardMaterial) {
        material.setValues({ transparent: stage === 1 && scanFade < 1, opacity: 1 - scanFade });
        const wireframe = stage === 2;
        if (material.wireframe !== wireframe) { material.setValues({ wireframe }); }
      }
    }
  });
  return <group ref={rotationGroup}>
    <primitive object={data.surface} dispose={null} />
    <points ref={points} geometry={data.geometry} visible={false}>
      <pointsMaterial color="#e9d5ff" size={0.05} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
    <mesh ref={band} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <planeGeometry args={[6, 4]} />
      <shaderMaterial transparent side={2} depthWrite={false}
        vertexShader={`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`}
        fragmentShader={`varying vec2 vUv; void main(){ float edge=pow(max(0.0,1.0-abs(vUv.x-.5)*2.0),.6); float line=exp(-abs(vUv.y-.5)*48.0); float halo=exp(-abs(vUv.y-.5)*9.0); gl_FragColor=vec4(vec3(.64,.4,1.)+line*.35, edge*(line*.85+halo*.15)); }`} />
    </mesh>
  </group>;
}
