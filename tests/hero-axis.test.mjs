import assert from "node:assert/strict";
import test from "node:test";
import { railOffset, railPose } from "../src/lib/hero-axis.ts";

test("selected model is centered, neighbours stay on one horizontal axis", () => {
  const positions = [0, 1, 2, 3, 4, 5].map(index => railPose(railOffset(index, 0, 6), 2.35, 0.5));
  assert.equal(Math.abs(positions[0].x), 0);
  assert.equal(Math.abs(positions[0].z), 0);
  assert.ok(positions[0].scale > positions[1].scale);
  assert.equal(positions[1].x, -positions[5].x);
  assert.equal(positions[1].z, positions[5].z);
  assert.equal(positions[3].visible, false);
});

test("the rail wraps smoothly through the first and last model", () => {
  assert.equal(railOffset(5, 0, 6), -1);
  assert.equal(railOffset(0, 5, 6), 1);
  assert.equal(railOffset(1, 0.5, 6), 0.5);
  assert.equal(railOffset(0, 0.5, 6), -0.5);
});
