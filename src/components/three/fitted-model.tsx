import { Clone } from "@react-three/drei";
import { useMemo } from "react";
import { Box3, Euler, Vector3 } from "three";

import { modelPresentation } from "@/content/scenes";
import type { ModelAsset } from "@/types/model-asset";
import type { LoadedModel } from "./model-resources";

type FittedModelProps = {
  asset: ModelAsset;
  scene: LoadedModel["scene"];
  maxSize: number;
  floorY: number;
  position?: readonly [number, number, number];
};

export function FittedModel({
  asset,
  scene,
  maxSize,
  floorY,
  position = [0, 0, 0],
}: FittedModelProps) {
  const presentation = modelPresentation[asset.id];

  const fit = useMemo(() => {
    const measure = scene.clone(true);
    measure.rotation.copy(new Euler(...presentation.rotation));
    measure.updateMatrixWorld(true);

    const box = new Box3().setFromObject(measure);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const longest = Math.max(size.x, size.y, size.z, 0.001);

    return {
      scale: (maxSize * presentation.sizeMultiplier) / longest,
      center: [center.x, center.z] as const,
      bottom: box.min.y,
    };
  }, [maxSize, presentation, scene]);

  return (
    <group dispose={null} position={[position[0], floorY + position[1], position[2]]}>
      <group scale={fit.scale}>
        <group position={[-fit.center[0], -fit.bottom, -fit.center[1]]}>
          <group rotation={presentation.rotation}>
            <Clone object={scene} />
          </group>
        </group>
      </group>
    </group>
  );
}
