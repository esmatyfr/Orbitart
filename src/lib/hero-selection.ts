export const wrapSelection = (step: number, count: number) =>
  ((Math.round(step) % count) + count) % count;

export function nearestSelection(current: number, index: number, count: number) {
  return current + ((index - wrapSelection(current, count) + count * 1.5) % count) - count / 2;
}

export type HeroMotion = { target: number; dragging: boolean };
