import assert from "node:assert/strict";
import test from "node:test";
import { setImmediate } from "node:timers/promises";
import { loadConcurrent, updateSlowFrames } from "../src/lib/model-loading.ts";

test("loading queue never exceeds two simultaneous models and loads each once", async () => {
  let active = 0, peak = 0;
  const completed = [];
  await loadConcurrent([1, 2, 3, 4, 5], async item => {
    peak = Math.max(peak, ++active);
    await setImmediate();
    completed.push(item);
    active--;
  }, new AbortController().signal);
  assert.equal(peak, 2);
  assert.deepEqual(completed.sort(), [1, 2, 3, 4, 5]);
});

test("navigation abort prevents any new queued model request", async () => {
  const controller = new AbortController();
  const started = [];
  await loadConcurrent([1, 2, 3, 4], async item => {
    started.push(item);
    await setImmediate();
    controller.abort();
  }, controller.signal);
  assert.deepEqual(started, [1, 2]);
});

test("failed model stops the queue and propagates to the fallback owner", async () => {
  const started = [];
  await assert.rejects(loadConcurrent([1, 2, 3], async item => {
    started.push(item);
    throw new Error("missing GLB");
  }, new AbortController().signal, 1), /missing GLB/);
  assert.deepEqual(started, [1]);
});

test("slow frames accumulate only during continuous rendering, including severe stalls", () => {
  assert.equal(updateSlowFrames(10, 5000, false), 0);
  assert.equal(updateSlowFrames(10, 65, true), 11);
  assert.equal(updateSlowFrames(10, 400, true), 11);
  assert.equal(updateSlowFrames(10, 16, true), 8);
  assert.equal(updateSlowFrames(1, 16, true), 0);
});
