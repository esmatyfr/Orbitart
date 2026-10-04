/** A bounded queue: completed items are not downloaded again by this run. */
export async function loadConcurrent<T>(
  items: readonly T[],
  load: (item: T) => Promise<void>,
  signal: AbortSignal,
  concurrency = 2,
) {
  let cursor = 0;
  let failed = false;
  async function worker() {
    while (!failed && !signal.aborted && cursor < items.length) {
      const item = items[cursor++];
      try { await load(item); }
      catch (error) { failed = true; throw error; }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
}

/** Only sample continuous rendering; idle demand-render gaps are not slow frames. */
export function updateSlowFrames(previous: number, frameMs: number, active: boolean) {
  if (!active) return 0;
  return frameMs > 50 ? previous + 1 : Math.max(0, previous - 2);
}
