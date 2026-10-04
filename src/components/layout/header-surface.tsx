"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function HeaderSurface() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  const solid = pathname !== "/" || scrolled;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-[#09080f]/50 to-transparent" />
      <div
        className={`absolute inset-0 border-b border-white/8 bg-[#09080f]/90 backdrop-blur-xl transition-opacity duration-300 ${solid ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-opacity duration-300 ${solid ? "opacity-25" : "opacity-90"}`}
      />
    </div>
  );
}
