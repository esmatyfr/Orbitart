"use client";

import type { ReactNode } from "react";

export function MobileNavigation({ children }: { children: ReactNode }) {
  return (
    <details className="mobile-navigation relative lg:hidden" onClick={event => {
      if (event.target instanceof Element && event.target.closest("a")) {
        event.currentTarget.open = false;
        event.currentTarget.querySelector("summary")?.focus();
      }
    }}>
      <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/15 bg-white/5 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300">
        <span className="sr-only">Menüyü aç</span>
        <span className="menu-icon" aria-hidden="true" />
      </summary>
      {children}
    </details>
  );
}
