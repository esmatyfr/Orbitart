import { Mesh, Texture, type Material, type Object3D } from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { ModelAsset } from "@/types/model-asset";

export type LoadedModel = { asset: ModelAsset; scene: GLTF["scene"] };

export function disposeModels(scenes: Iterable<Object3D>) {
  const geometries = new Set<Mesh["geometry"]>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  for (const scene of scenes) scene.traverse((node) => {
    if (!(node instanceof Mesh)) return;
    geometries.add(node.geometry);
    for (const material of Array.isArray(node.material) ? node.material : [node.material]) materials.add(material);
  });
  for (const material of materials) {
    for (const value of Object.values(material)) if (value instanceof Texture) textures.add(value);
    material.dispose();
  }
  for (const geometry of geometries) geometry.dispose();
  const images = new Set<ImageBitmap>();
  for (const texture of textures) {
    const image: unknown = texture.source.data;
    if (typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) images.add(image);
    texture.dispose();
  }
  for (const image of images) image.close();
}

export async function loadModel(asset: ModelAsset, parentSignal: AbortSignal): Promise<LoadedModel> {
  return { asset, scene: await loadScene(asset.modelPath, parentSignal) };
}

/** Accessories share the same abort, timeout and resource ownership contract. */
export async function loadScene(modelPath: string, parentSignal: AbortSignal): Promise<GLTF["scene"]> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  parentSignal.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(abort, 25000);
  try {
    parentSignal.throwIfAborted();
    const response = await fetch(modelPath, { signal: controller.signal });
    if (!response.ok) throw new Error("Model yüklenemedi");
    const buffer = await response.arrayBuffer();
    controller.signal.throwIfAborted();
    const gltf = await new GLTFLoader().parseAsync(buffer, "/");
    if (controller.signal.aborted) {
      disposeModels([gltf.scene]);
      throw new Error("Model yüklemesi iptal edildi");
    }
    return gltf.scene;
  } finally {
    clearTimeout(timeout);
    parentSignal.removeEventListener("abort", abort);
  }
}
