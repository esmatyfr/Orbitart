export type PresentationMotion = {
  inspection: number;
  heroExit: number;
  process: number;
  rotation: number;
  pointerX: number;
  pointerY: number;
  platformNdcY?: number;
  heroAspect?: number;
  processAspect?: number;
};
export const clampProgress = (value: number) => Math.max(0, Math.min(1, value));
export function sectionProgress(top: number, height: number, viewport: number) {
  return clampProgress((viewport * 0.65 - top) / Math.max(height - viewport * 0.35, 1));
}
export const processStageCount = 5;
export function processStage(progress: number) {
  return Math.min(processStageCount - 1, Math.floor(clampProgress(progress) * processStageCount));
}
export const processStageProgress = (progress: number) => Math.min(1, clampProgress(progress) * processStageCount - processStage(progress));
/** Land inside the stage, past the result reveal, rather than on a rounding-sensitive boundary. */
export function processStageScrollTop(index: number, sectionTop: number, height: number, viewport: number) {
  const stage = Math.max(0, Math.min(processStageCount - 1, Math.round(index)));
  return Math.max(0, sectionTop + 72 + Math.max(height - viewport + 72, 1) * (stage + 0.6) / processStageCount);
}
/** Scroll owns build height; elapsed time only animates the illustrative print head. */
export function printerPose(progress: number, seconds: number) {
  const stage = processStage(progress);
  const local = processStageProgress(progress);
  const complete = stage === 4 ? 1 : stage === 3 ? Math.min(1, local / 0.9) : 0;
  const angle = seconds * 2.4 + complete * Math.PI * 12;
  return { complete, x: Math.cos(angle) * 0.88, z: Math.sin(angle) * 0.88, reveal: stage === 4 ? Math.min(1, local / 0.25) : 0 };
}

/** Progress starts when the presentation reaches the navbar, ends before the next section. */
export function stickyProgress(top: number, height: number, viewport: number) {
  return clampProgress(-top / Math.max(height - viewport + 72, 1));
}
/** Match a native sticky frame's actual start and unpin positions, independent of browser chrome. */
export function stickyFrameProgress(top: number, height: number, frameHeight: number, offset = 72) {
  return clampProgress((offset - top) / Math.max(height - frameHeight, 1));
}
export function processStageFrameScrollTop(index: number, sectionTop: number, height: number, frameHeight: number) {
  const stage = Math.max(0, Math.min(processStageCount - 1, Math.round(index)));
  return Math.max(0, sectionTop - 72 + Math.max(height - frameHeight, 1) * (stage + 0.6) / processStageCount);
}
const smooth = (value: number) => { const t = clampProgress(value); return t * t * (3 - 2 * t); };
export function heroStoryPose(progress: number) {
  const p = clampProgress(progress);
  return {
    enlarge: smooth((p - 0.04) / 0.22),
    intro: 1 - smooth((p - 0.025) / 0.14),
    heading: smooth((p - 0.18) / 0.1) * (1 - smooth((p - 0.95) / 0.05)),
    theme: smooth((p - 0.7) / 0.3),
  };
}
export function storyCardPose(progress: number, index: number, settleOnPhone = false) {
  const center = 0.34 + index * 0.21;
  // Phones trigger a timed entrance instead of freezing a card midway through a swipe.
  const enter = settleOnPhone ? Number(progress >= center - 0.03) : smooth((progress - center + 0.06) / 0.06);
  return { y: (1 - enter) * 125, opacity: index === 0 ? enter : enter > 0 ? 1 : 0 };
}
