import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { heroShowcase } from "../src/content/hero-showcase.ts";
import { isPublishedModelAsset, modelAssets, publishedModelAssets, processPrinterAsset } from "../src/content/model-assets.ts";
import { scanProcess } from "../src/content/scan-process.ts";

test("hero contains six unique approved choices, three technical and three creative", () => {
  assert.equal(new Set(heroShowcase.map(item => item.assetId)).size, 6);
  assert.equal(heroShowcase.filter(item => item.track === "technical").length, 3);
  assert.equal(heroShowcase.filter(item => item.track === "creative").length, 3);
  assert.deepEqual(heroShowcase.map(item => item.order).sort(), [0, 1, 2, 3, 4, 5]);
  assert.equal(scanProcess.assetId, heroShowcase[0].assetId);
  for (const item of heroShowcase) assert.ok(modelAssets.some(asset => asset.id === item.assetId && asset.userApproved));
});

test("publication requires every approval; review assets never become production 3D", () => {
  const approved = { ...modelAssets[0], userApproved: true, rightsStatus: "approved", technicalStatus: "approved", publicationStatus: "published" };
  assert.equal(isPublishedModelAsset(approved), true);
  for (const change of [{ userApproved: false }, { rightsStatus: "review" }, { technicalStatus: "review" }, { publicationStatus: "review" }]) {
    assert.equal(isPublishedModelAsset({ ...approved, ...change }), false);
  }
  assert.ok(publishedModelAssets.every(isPublishedModelAsset));
  assert.equal(publishedModelAssets.length, 6);
});

test("all model and process media exist; GLBs are self-contained with no decoder dependency", async () => {
  for (const asset of [...modelAssets, processPrinterAsset]) {
    const bytes = await readFile(new URL(`../public${asset.modelPath}`, import.meta.url));
    assert.equal(bytes.toString("ascii", 0, 4), "glTF");
    const json = JSON.parse(bytes.toString("utf8", 20, 20 + bytes.readUInt32LE(12)).trim());
    for (const item of [...(json.buffers ?? []), ...(json.images ?? [])]) assert.ok(!item.uri || item.uri.startsWith("data:"));
    assert.ok(!(json.extensionsRequired ?? []).some(extension => ["KHR_draco_mesh_compression", "EXT_meshopt_compression", "KHR_texture_basisu"].includes(extension)));
    assert.ok((await stat(new URL(`../public${asset.posterPath}`, import.meta.url))).size > 0);
    for (const url of [asset.sourceUrl, asset.licenseUrl].filter(Boolean)) assert.equal(new URL(url).protocol, "https:");
    if (asset.sourceKind && asset.sourceKind !== "orbitart") assert.ok(asset.attribution && asset.creator && asset.licenseUrl && asset.sourceUrl);
    if (asset === processPrinterAsset) {
      for (const name of ["print-head", "print-gantry", "print-bed"]) assert.ok(json.nodes.some(node => node.name === name), name);
      assert.ok(bytes.length < 250_000);
      assert.equal(json.images?.length ?? 0, 0);
    }
  }
  assert.equal(scanProcess.steps.length, 5);
  for (const step of scanProcess.steps) assert.ok((await stat(new URL(`../public${step.posterPath}`, import.meta.url))).size > 0);
});

const luminance = hex => {
  const rgb = hex.slice(1).match(/../g).map(channel => Number.parseInt(channel, 16) / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};

test("every hero CTA palette has at least 4.5:1 text contrast", () => {
  for (const { assetId, palette } of heroShowcase) {
    const values = [luminance(palette.buttonBackground), luminance(palette.buttonText)].sort((a, b) => b - a);
    assert.ok((values[0] + 0.05) / (values[1] + 0.05) >= 4.5, assetId);
  }
});
