"use client";
import { motion, useAnimationControls, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { motionSettings } from "@/content/motion";
/** Initial HTML is visible; motion runs only after hydration and on entry. */
export function Reveal({ children, className, delay = 0, direction = "up", profile = "default", staggerIndex }: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "fade";
  profile?: "default" | "secondary";
  staggerIndex?: number;
}) {
  const element = useRef<HTMLDivElement>(null);
  const seen = useRef(false);
  const controls = useAnimationControls();
  const inView = useInView(element, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced === null) return;
    const secondary = profile === "secondary";
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    const horizontalDistance = secondary
      ? (mobile ? motionSettings.secondary.mobileHorizontalDistance : motionSettings.secondary.horizontalDistance)
      : motionSettings.revealHorizontalDistance;
    const verticalDistance = secondary
      ? (mobile ? motionSettings.secondary.mobileRevealDistance : motionSettings.secondary.revealDistance)
      : motionSettings.revealDistance;
    const visible = { x: 0, y: 0, opacity: 1 };
    if (reduced || (element.current && element.current.getBoundingClientRect().bottom <= 0)) {
      seen.current = true;
      controls.set(visible);
    } else if (inView) {
      seen.current = true;
      // Resolve the actual grid columns at entry, so delays restart on every responsive row.
      const parent = element.current?.parentElement;
      const columns = parent ? getComputedStyle(parent).gridTemplateColumns.split(/\s+/).length : 1;
      const entryDelay = staggerIndex === undefined ? delay : (staggerIndex % columns) * motionSettings.secondary.rowDelay;
      void controls.start({ ...visible, transition: {
        duration: direction === "fade"
          ? (secondary ? motionSettings.secondary.fadeDuration : motionSettings.fadeDuration)
          : (secondary ? motionSettings.secondary.revealDuration : motionSettings.revealDuration),
        ease: direction === "fade" ? motionSettings.fadeEase : motionSettings.revealEase,
        delay: entryDelay,
      } });
    } else if (!seen.current) {
      controls.set({
        x: direction === "left" ? -horizontalDistance : direction === "right" ? horizontalDistance : 0,
        y: direction === "up" ? verticalDistance : 0,
        opacity: motionSettings.revealOpacity,
      });
    }
    return () => controls.stop();
  }, [controls, delay, direction, inView, reduced, profile, staggerIndex]);

  return <motion.div ref={element} data-reveal={direction} className={className} initial={false} animate={controls}
    onFocusCapture={() => { seen.current = true; controls.set({ x: 0, y: 0, opacity: 1 }); }}>{children}</motion.div>;
}
