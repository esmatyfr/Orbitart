"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { Box3, Group, Raycaster, Vector2, Vector3, MathUtils, PerspectiveCamera as ThreePerspectiveCamera, type SpotLight } from "three";

import { clampProgress, processStage, processStageProgress, type PresentationMotion } from "@/lib/scroll-presentation";
import { motionSettings } from "@/content/motion";
import { AnimatedProcessModel } from "./animated-process-model";
import { AnimatedFdmPrinter } from "./animated-fdm-printer";
import { FittedModel } from "@/components/three/fitted-model";
import { modelPresentation, scenePresets } from "@/content/scenes";
import type { ModelAsset } from "@/types/model-asset";
import { wrapSelection, type HeroMotion } from "@/lib/hero-selection";
import { railOffset, railPose } from "@/lib/hero-axis";
import type { LoadedModel } from "./model-resources";

function ReadyModel({
  asset,
  scene,
  maxSize,
  floorY,
  position,
  onReady,
}: {
  asset: ModelAsset;
  scene: LoadedModel["scene"];
  maxSize: number;
  floorY: number;
  position?: readonly [number, number, number];
  onReady?: () => void;
}) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <FittedModel
      asset={asset}
      scene={scene}
      maxSize={maxSize}
      floorY={floorY}
      position={position}
    />
  );
}

export function HeroScene({
  assets,
  models,
  onFirstReady,
  introPlayedRef,
  motion,
  reducedMotion,
  accent,
  platformRimEmission,
  onSettled,
  pickRef,
  presentation,
  onMotionChange,
}: {
  assets: readonly ModelAsset[];
  models: readonly LoadedModel[];
  onFirstReady: () => void;
  introPlayedRef: RefObject<boolean>;
  motion: RefObject<HeroMotion>;
  reducedMotion: boolean;
  accent: string;
  platformRimEmission: number;
  onSettled: (index: number) => void;
  pickRef: RefObject<((x: number, y: number) => number | undefined) | null>;
  presentation: RefObject<PresentationMotion>;
  onMotionChange: (active: boolean) => void;
}) {
  const preset = scenePresets.hero;
  const groups = useRef<(Group | null)[]>([]);
  const platform = useRef<Group>(null);
  const platformLight = useRef<SpotLight>(null);
  const platformRay = useRef(new Vector3());
  const focusRay = useRef(new Vector3());
  const modelCenters = useRef<Vector3[]>([]);
  const modelGroups = useRef<(Group | null)[]>([]);
  const { camera, invalidate, gl } = useThree();
  const lastSettled = useRef<number | null>(null);
  const currentStep = useRef<number | null>(null);
  const entrance = motionSettings.heroEntrance;
  const elapsed = useRef<number | null>(null);
  const reportedReady = useRef(false);
  // Fade the fully depth-tested image, never the individual GLB surfaces.
  // Restore the shared canvas when this View leaves so the process scene stays visible.
  useEffect(() => () => { gl.domElement.style.opacity = "1"; }, [gl]);
  useEffect(() => () => onMotionChange(false), [onMotionChange]);
  useEffect(() => {
    if (modelCenters.current.length === models.length) return;
    groups.current.forEach((group, index) => {
      if (!group) return;
      group.updateWorldMatrix(true, true);
      modelCenters.current[index] = group.worldToLocal(new Box3().setFromObject(group).getCenter(new Vector3()));
    });
  }, [models]);

  useEffect(() => {
    const raycaster = new Raycaster();
    pickRef.current = (x, y) => {
      raycaster.setFromCamera(new Vector2(x, y), camera);
      const hits = groups.current.flatMap((group, index) =>
        group?.visible ? raycaster.intersectObject(group, true).slice(0, 1).map(hit => ({ index, distance: hit.distance })) : [],
      );
      return hits.sort((a, b) => a.distance - b.distance)[0]?.index;
    };
    return () => { pickRef.current = null; };
  }, [camera, pickRef]);

  useFrame((frame, delta) => {
    const previousElapsed = elapsed.current ?? (introPlayedRef.current ? entrance.delay + entrance.duration : 0);
    elapsed.current = reducedMotion ? entrance.delay + entrance.duration : Math.min(entrance.delay + entrance.duration, previousElapsed + Math.min(delta, 0.05));
    const t = MathUtils.clamp((elapsed.current - entrance.delay) / entrance.duration, 0, 1);
    const reveal = t * t * (3 - 2 * t);
    frame.gl.domElement.style.opacity = String(reveal);
    const state = motion.current;
    // Match CSS breakpoints including the scrollbar, rather than the narrower canvas box.
    const viewportWidth = window.innerWidth;
    const phone = viewportWidth < 640;
    const portraitTablet = !phone && viewportWidth <= preset.portraitTabletMaxWidth && window.innerHeight > viewportWidth;
    const narrow = viewportWidth < 1024 || portraitTablet;
    // View updates projection after scene callbacks; fit against this frame's DOM measurements first.
    if (frame.camera instanceof ThreePerspectiveCamera && presentation.current.heroAspect !== undefined) {
      frame.camera.aspect = presentation.current.heroAspect;
      frame.camera.updateProjectionMatrix();
    }
    if (!reducedMotion) {
      frame.camera.position.set(presentation.current.pointerX * motionSettings.parallax, preset.cameraPosition[1] - presentation.current.pointerY * motionSettings.parallax, preset.cameraPosition[2] + 0);
      frame.camera.lookAt(0, preset.cameraTarget[1] + (narrow ? 0 : presentation.current.inspection * preset.focusTargetY), 0);
    } else { frame.camera.position.set(...preset.cameraPosition); frame.camera.lookAt(...preset.cameraTarget); }
    frame.camera.updateMatrixWorld();
    let platformY: number = preset.platformY;
    if (presentation.current.platformNdcY !== undefined) {
      const ray = platformRay.current.set(0, presentation.current.platformNdcY, 0.5).unproject(frame.camera).sub(frame.camera.position);
      platformY = frame.camera.position.y + ray.y * ((-0.35 - frame.camera.position.z) / ray.z);
    }
    const exit = reducedMotion ? 0 : presentation.current.inspection;
    const entryScale = portraitTablet ? preset.tabletEntryScale : narrow ? preset.mobileEntryScale : preset.entryScale;
    const entryOffset = (platformY - preset.platformY + (portraitTablet ? preset.tabletEntryLift : preset.entryLift)) * (1 - exit);
    const railSpread = 1 + (MathUtils.clamp(frame.gl.domElement.clientWidth / 1440, 1, preset.wideRailSpread) - 1) * (1 - exit);
    currentStep.current = reducedMotion || currentStep.current === null ? state.target : MathUtils.damp(currentStep.current, state.target, state.dragging ? 20 : 8, Math.min(delta, 0.05));
    if (Math.abs(currentStep.current - state.target) < 0.001) currentStep.current = state.target;
    const step = currentStep.current;
    groups.current.forEach((group, index) => {
      if (!group) return;
      const pose = railPose(railOffset(index, step, assets.length), preset.slotSpacing * railSpread, preset.depthStep);
      const departure = reducedMotion || phone ? 0 : Math.max(0, (presentation.current.heroExit - 0.88) / 0.2);
      const active = index === wrapSelection(Math.round(step), assets.length);
      const focusScale = modelPresentation[assets[index].id].focusScale ?? preset.focusScale;
      const mobileFocusScale = (modelPresentation[assets[index].id].mobileFocusScale ?? preset.mobileFocusScale) * (phone ? preset.phoneFocusScaleMultiplier : portraitTablet ? preset.tabletFocusScaleMultiplier : 1);
      group.scale.setScalar(pose.scale * (active ? (entryScale + exit * ((narrow ? mobileFocusScale : focusScale) - entryScale)) * (1 - departure * 0.65) : 1 - exit * 0.8));
      group.rotation.y = pose.yaw + (active ? exit * 0.2 + presentation.current.rotation * exit : 0);
      const z = pose.z - (active ? departure * 3 : exit * 7);
      let x = pose.x, y = preset.floorY + entryOffset + exit * (narrow ? 0.2 : -0.25);
      if (active && (!narrow || phone || portraitTablet) && modelCenters.current[index]) {
        // Project the fitted model's center into the left column, independent of screen width or model shape.
        const ray = focusRay.current.set(narrow ? 0 : preset.focusCenter[0] * 2 - 1, narrow ? 0 : 1 - preset.focusCenter[1] * 2, 0.5)
          .unproject(frame.camera).sub(frame.camera.position);
        const distance = (z - frame.camera.position.z) / ray.z;
        const center = modelCenters.current[index];
        x = MathUtils.lerp(x, frame.camera.position.x + ray.x * distance - center.x * group.scale.x, exit);
        y = MathUtils.lerp(y, frame.camera.position.y + ray.y * distance - center.y * group.scale.y, exit);
      }
      group.position.set(x, y, z + (1 - reveal) * entrance.depth);
      group.visible = pose.visible && (active || exit < 0.8);
      if (modelGroups.current[index]) modelGroups.current[index].rotation.z = pose.tilt;
    });
    if (platform.current) { platform.current.position.y = platformY; platform.current.scale.setScalar((1 - exit) * (portraitTablet ? preset.tabletPlatformScale : preset.platformScale)); platform.current.visible = exit < 0.98; }
    if (platformLight.current) platformLight.current.position.y = platformY + 0.12;
    // Notify only after the first responsive layout is applied, before the View's first draw.
    if (!reportedReady.current) { reportedReady.current = true; onFirstReady(); }
    if (reveal === 1) introPlayedRef.current = true;
    const animating = reveal < 1 || step !== state.target || state.dragging;
    onMotionChange(animating);
    if (animating) invalidate();
    else if (lastSettled.current !== state.target) {
      lastSettled.current = state.target;
      onSettled(wrapSelection(state.target, assets.length));
    }
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={preset.cameraPosition}
        fov={preset.fov}
        onUpdate={(camera) => camera.lookAt(...preset.cameraTarget)}
      />
      <ambientLight intensity={preset.ambientIntensity} />
      <directionalLight position={[4, 8, 7]} intensity={preset.keyIntensity} />
      <directionalLight position={[-6, 3, -5]} intensity={preset.fillIntensity} />
      <pointLight position={[0, 3, -3]} color={accent} intensity={preset.accentIntensity} />
      <spotLight ref={platformLight} position={[0, preset.platformY + 0.12, 0]} color={accent} intensity={2.2} distance={4.5} angle={0.65} penumbra={0.9} />
      <group ref={platform} position={[0, preset.platformY, -0.35]}>
        <mesh position={[0, -0.09, 0]} scale={[preset.platformHalfWidth, 1, 0.92]}>
          <cylinderGeometry args={[1, 1, 0.13, 64]} />
          <meshStandardMaterial color="#090a0f" metalness={0.5} roughness={0.28} />
        </mesh>
        <mesh position={[0, -0.012, 0]} scale={[preset.platformHalfWidth, 1, 0.92]}>
          <cylinderGeometry args={[0.96, 1, 0.05, 64]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={platformRimEmission} transparent opacity={platformRimEmission > 0 ? preset.platformLitRimOpacity : preset.platformRimOpacity} metalness={0.65} roughness={0.32} />
        </mesh>
        <mesh position={[0, 0.045, 0]} scale={[preset.platformHalfWidth, 1, 0.92]}>
          <cylinderGeometry args={[0.82, 0.89, 0.08, 64]} />
          <meshPhysicalMaterial color="#050609" metalness={0.52} roughness={0.18} clearcoat={0.9} clearcoatRoughness={0.1} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.09, 0]}>
          <planeGeometry args={[3.4, 1.2]} />
          <shaderMaterial
            transparent
            depthWrite={false}
            vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
            fragmentShader={`varying vec2 vUv; void main() { vec2 p = (vUv - 0.5) * 2.0; float soft = exp(-dot(p * vec2(1.0, 2.8), p * vec2(1.0, 2.8)) * 4.0); float streak = exp(-pow((p.x + p.y * 0.3) * 3.0, 2.0)) * exp(-pow(p.y * 3.0, 2.0)); gl_FragColor = vec4(vec3(0.78, 0.81, 0.88), soft * 0.24 + streak * 0.09); }`}
          />
        </mesh>
      </group>
      {assets.map((asset, index) => {
        const pose = railPose(railOffset(index, 0, assets.length), preset.slotSpacing, preset.depthStep);

        return (
          <group key={asset.id} ref={(group) => { groups.current[index] = group; }}
            position={[pose.x, preset.floorY, pose.z]} rotation={[0, pose.yaw, 0]}
            scale={pose.scale} visible={false}>
            <group ref={(group) => { modelGroups.current[index] = group; }} rotation={[0, 0, pose.tilt]}>
              <ReadyModel
                asset={asset}
                scene={models[index].scene}
                maxSize={preset.modelMaxSize}
                floorY={0.025}
              />
            </group>
          </group>
        );
      })}
    </>
  );
}

function ProcessCamera({ presentation, active, reducedMotion }: { presentation: RefObject<PresentationMotion>; active: boolean; reducedMotion: boolean }) {
  useFrame((frame) => {
    if (!active) return;
    const camera = frame.camera;
    const preset = scenePresets.process;
    if (camera instanceof ThreePerspectiveCamera && presentation.current.processAspect !== undefined) {
      camera.aspect = presentation.current.processAspect;
      camera.updateProjectionMatrix();
    }
    // A narrow desktop View needs more distance than its wider mobile counterpart.
    const fit = camera instanceof ThreePerspectiveCamera
      ? Math.max(1, preset.minimumViewAspect / Math.max(camera.aspect, 0.1))
      : 1;
    if (reducedMotion) {
      if (camera instanceof ThreePerspectiveCamera && camera.view?.enabled) camera.clearViewOffset();
      camera.position.set(...preset.cameraPosition).multiplyScalar(fit);
      camera.lookAt(...preset.cameraTarget);
      camera.updateMatrixWorld();
      return;
    }
    const progress = presentation.current.process;
    const stage = processStage(progress);
    const t = stage === 4 ? 1 - clampProgress(processStageProgress(progress) / 0.25) : clampProgress((progress - 0.57) / 0.03);
    const mix = t * t * (3 - 2 * t);
    if (camera instanceof ThreePerspectiveCamera) {
      const viewportWidth = window.innerWidth;
      const tablet = viewportWidth >= 640 && (viewportWidth < 1024 || (viewportWidth <= preset.portraitTabletMaxWidth && window.innerHeight > viewportWidth));
      const resultReveal = stage === 4 ? clampProgress(processStageProgress(progress) / 0.25) : 0;
      const lift = tablet ? MathUtils.lerp(preset.tabletViewLiftRatio, preset.tabletPrinterViewLiftRatio, mix) * (1 - resultReveal) : 0;
      if (lift > 0) {
        // Shift the composition up without changing model scale, lighting or camera angle.
        const height = frame.size.height;
        const width = height * camera.aspect;
        camera.setViewOffset(width, height, 0, height * lift, width, height);
      } else if (camera.view?.enabled) camera.clearViewOffset();
    }
    const targetY = preset.printer.cameraTarget[1] * mix;
    camera.position.set(
      MathUtils.lerp(preset.cameraPosition[0], preset.printer.cameraPosition[0], mix) * fit,
      targetY + (MathUtils.lerp(preset.cameraPosition[1], preset.printer.cameraPosition[1], mix) - targetY) * fit,
      MathUtils.lerp(preset.cameraPosition[2], preset.printer.cameraPosition[2], mix) * fit,
    );
    camera.lookAt(0, targetY, 0);
    camera.updateMatrixWorld();
  });
  return null;
}

export function ProcessScene({
  asset,
  scene,
  onReady,
  presentation,
  reducedMotion,
  printerScene,
  active,
  onMotionChange,
}: {
  asset: ModelAsset;
  scene: LoadedModel["scene"];
  onReady: () => void;
  presentation: RefObject<PresentationMotion>;
  reducedMotion: boolean;
  printerScene: LoadedModel["scene"];
  active: boolean;
  onMotionChange: (active: boolean) => void;
}) {
  const preset = scenePresets.process;

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={preset.cameraPosition}
        fov={preset.fov}
        onUpdate={(camera) => camera.lookAt(...preset.cameraTarget)}
      />
      <ambientLight intensity={preset.ambientIntensity} />
      <ProcessCamera presentation={presentation} active={active} reducedMotion={reducedMotion} />
      <directionalLight position={[3, 6, 5]} intensity={preset.keyIntensity} />
      <directionalLight position={[-5, 2, -3]} intensity={preset.fillIntensity} />
      <AnimatedProcessModel
          asset={asset}
          scene={scene}
          maxSize={preset.modelMaxSize}
          floorY={preset.floorY}
          onReady={onReady}
          presentation={presentation} reducedMotion={reducedMotion}
        />
      <AnimatedFdmPrinter scene={printerScene} gearScene={scene} presentation={presentation}
        active={active} reducedMotion={reducedMotion} onMotionChange={onMotionChange} />
    </>
  );
}
