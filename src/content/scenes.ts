import type { ModelAssetId } from "@/types/model-asset";

type Rotation = readonly [number, number, number];

export const scenePresets = {
  hero: {
    cameraPosition: [0, 2.1, 9.2] as const,
    cameraTarget: [0, -0.05, 0] as const,
    fov: 37,
    ambientIntensity: 1.4,
    keyIntensity: 3.1,
    fillIntensity: 1.5,
    accentIntensity: 1.2,
    focusScale: 1.55,
    mobileFocusScale: 1.1,
    phoneFocusScaleMultiplier: 1.8,
    focusCenter: [0.28, 0.5] as const,
    focusTargetY: 1.1,
    slotSpacing: 3.05,
    wideRailSpread: 1.28,
    entryScale: 1.06,
    mobileEntryScale: 0.9,
    entryLift: 0.35,
    depthStep: 0.5,
    modelMaxSize: 2.95,
    floorY: -0.62,
    platformY: -1.46,
    platformHalfWidth: 1.9,
    platformScale: 0.8,
  },
  process: {
    cameraPosition: [2.7, 2.3, 5.7] as const,
    cameraTarget: [0, 0, 0] as const,
    fov: 39,
    minimumViewAspect: 1,
    ambientIntensity: 1.4,
    keyIntensity: 3,
    fillIntensity: 1.3,
    modelMaxSize: 4.3,
    floorY: -1.9,
    phoneSampleLift: 0.3,
    printer: {
      cameraPosition: [3.5, 3.1, 7.4] as const,
      cameraTarget: [0, 0.55, 0] as const,
      bedY: -1.05,
      partSize: 2.15,
      nozzleGap: 0.045,
      filamentColor: "#b593ec",
      resultLift: 1.05,
      resultEnlarge: 0.55,
    },
  },
} as const;

export const modelPresentation: Record<
  ModelAssetId,
  { rotation: Rotation; sizeMultiplier: number; focusScale?: number; mobileFocusScale?: number }
> = {
  "a1-orbit-gear": { rotation: [0.55, 0.12, 0], sizeMultiplier: 1 },
  "a2-tide-five": { rotation: [-0.85, -0.2, 0], sizeMultiplier: 1 },
  "a3-modushell": { rotation: [-0.16, 0.32, 0], sizeMultiplier: 0.95 },
  "a4-blade-of-chaos": { rotation: [0, 1.57, 0], sizeMultiplier: 1.05, focusScale: 1.3, mobileFocusScale: 0.77 },
  "a5-orbit-vase": { rotation: [0, 0.12, 0], sizeMultiplier: 1, focusScale: 1.35, mobileFocusScale: 0.8 },
  "a6-stone-guardian": { rotation: [0, 0.08, 0], sizeMultiplier: 1, focusScale: 1.3, mobileFocusScale: 0.8 },
};
