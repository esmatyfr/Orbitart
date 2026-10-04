import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { BoxGeometry, Group, Mesh, MeshStandardMaterial, Texture } from "three";
import { disposeModels, loadModel, loadScene } from "../src/components/three/model-resources.ts";
import { modelAssets } from "../src/content/model-assets.ts";

test("shared geometry/material/texture is disposed once when the experience exits", () => {
  const geometry = new BoxGeometry();
  const texture = new Texture();
  const material = new MeshStandardMaterial({ map: texture, normalMap: texture });
  const group = new Group();
  group.add(new Mesh(geometry, material), new Mesh(geometry, material));
  const calls = { geometry: 0, material: 0, texture: 0 };
  geometry.addEventListener("dispose", () => calls.geometry++);
  material.addEventListener("dispose", () => calls.material++);
  texture.addEventListener("dispose", () => calls.texture++);
  disposeModels([group, group]);
  assert.deepEqual(calls, { geometry: 1, material: 1, texture: 1 });
});

test("loader parses the real A1 GLB without downloading other models", async t => {
  const bytes = await readFile(new URL("../public/models/showcase/a1-orbit-gear.glb", import.meta.url));
  const requested = [];
  t.mock.method(globalThis, "fetch", async path => {
    requested.push(path);
    return new Response(bytes);
  });
  const result = await loadModel(modelAssets[0], new AbortController().signal);
  assert.equal(result.asset.id, "a1-orbit-gear");
  assert.ok(result.scene.children.length > 0);
  assert.deepEqual(requested, [modelAssets[0].modelPath]);
  disposeModels([result.scene]);
});

test("404 GLB rejects cleanly for poster fallback", async t => {
  t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 404 }));
  await assert.rejects(loadModel(modelAssets[0], new AbortController().signal), /Model yüklenemedi/);
  await assert.rejects(loadScene('/models/showcase/process-fdm-printer.glb', new AbortController().signal), /Model yüklenemedi/);
});

test("printer accessory loads independently with separate movable nodes and disposes on exit", async t => {
  const bytes = await readFile(new URL("../public/models/showcase/process-fdm-printer.glb", import.meta.url));
  t.mock.method(globalThis, "fetch", async () => new Response(bytes));
  const scene = await loadScene('/models/showcase/process-fdm-printer.glb', new AbortController().signal);
  assert.ok(scene.getObjectByName('print-head'));
  assert.ok(scene.getObjectByName('print-gantry'));
  const other = await loadScene('/models/showcase/process-fdm-printer.glb', new AbortController().signal);
  assert.notEqual(scene.getObjectByName('print-head'), other.getObjectByName('print-head'));
  disposeModels([scene, other]);
});

test("an already aborted visit does not issue a model request", async t => {
  const fetch = t.mock.method(globalThis, "fetch", async () => { throw new Error("unexpected request"); });
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(loadModel(modelAssets[0], controller.signal), { name: "AbortError" });
  assert.equal(fetch.mock.callCount(), 0);
});

test("leaving during a download aborts the underlying request", async t => {
  const controller = new AbortController();
  t.mock.method(globalThis, "fetch", (_path, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
    queueMicrotask(() => controller.abort());
  }));
  await assert.rejects(loadModel(modelAssets[0], controller.signal), { name: "AbortError" });
});
