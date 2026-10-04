"use client";

import { createContext, useContext, type ReactNode } from "react";

const ProcessSelection = createContext<{ stage: number; selectStage: (index: number) => void } | null>(null);

export function ProcessStepControls({ stage, selectStage, children }: {
  stage: number;
  selectStage: (index: number) => void;
  children: ReactNode;
}) {
  return <ProcessSelection.Provider value={{ stage, selectStage }}>{children}</ProcessSelection.Provider>;
}

/** Only the control hydrates; card images and descriptions remain server content. */
export function ProcessStepControl({ index, stepId }: { index: number; stepId: string }) {
  const selection = useContext(ProcessSelection);
  return <button type="button" aria-labelledby={`process-title-${stepId}`}
    aria-describedby={`process-description-${stepId}`} aria-controls="process-model"
    aria-pressed={(selection?.stage ?? 0) === index}
    onClick={() => selection?.selectStage(index)}
    className="absolute inset-0 z-20 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-violet-300" />;
}
