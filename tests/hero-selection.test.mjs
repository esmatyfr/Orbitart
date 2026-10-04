import assert from "node:assert/strict";
import test from "node:test";
import { nearestSelection, wrapSelection } from "../src/lib/hero-selection.ts";

test("selection wraps in both directions, including rapid repeated input", () => {
  assert.equal(wrapSelection(-1, 6), 5);
  assert.equal(wrapSelection(6, 6), 0);
  assert.equal(wrapSelection(21, 6), 3);
  assert.equal(wrapSelection(-20, 6), 4);
});

test("direct selection takes the nearest position without adding full rotations", () => {
  for (const step of [-20, -6, -1, 0, 5, 6, 20]) {
    for (let index = 0; index < 6; index++) {
      const target = nearestSelection(step, index, 6);
      assert.equal(wrapSelection(target, 6), index);
      assert.ok(Math.abs(target - step) <= 3);
    }
  }
});

test("drag release snaps to the closest selection", () => {
  assert.equal(wrapSelection(1.49, 6), 1);
  assert.equal(wrapSelection(1.51, 6), 2);
  assert.equal(wrapSelection(-0.6, 6), 5);
});
