/** Signed distance along the six-model rail, wrapping at either end. */
export function railOffset(index: number, step: number, count: number) {
  return ((index - step + count * 1.5) % count + count) % count - count / 2;
}

/** The selected model sits forward; its neighbours recede without forming a ring. */
export function railPose(offset: number, spacing: number, depthStep: number) {
  const distance = Math.abs(offset);
  return {
    x: offset * spacing,
    z: -distance * depthStep,
    scale: Math.max(0.52, 1.15 - distance * 0.29),
    yaw: -Math.max(-2, Math.min(2, offset)) * 0.12,
    tilt: -Math.max(-2, Math.min(2, offset)) * 0.035,
    visible: distance < 2.75,
  };
}
