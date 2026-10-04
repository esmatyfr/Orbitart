/** Shared motion/quality budgets for the Phase 3 presentation. */
export const motionSettings = {
  phoneDpr: 1,
  pointCount: 1800,
  inspectionScale: 1.12,
  parallax: 0.16,
  revealDistance: 18,
  revealHorizontalDistance: 40,
  revealOpacity: 0.12,
  revealDuration: 0.8,
  fadeDuration: 1.05,
  revealEase: [0.22, 1, 0.36, 1],
  fadeEase: [0.42, 0, 0.58, 1],
  scanBandWidth: 0.22,
  secondary: {
    revealDistance: 18,
    mobileRevealDistance: 12,
    horizontalDistance: 28,
    mobileHorizontalDistance: 14,
    revealDuration: 0.75,
    fadeDuration: 0.9,
    rowDelay: 0.07,
  },
} as const;
