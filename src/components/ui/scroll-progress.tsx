"use client";

import { type RefObject } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export interface ScrollProgressProps {
  /** Track this scroll container instead of the window. */
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * ScrollProgress — a gradient bar that fills with scroll progress. Tracks the
 * window by default, or a given scroll container. Position it with className
 * (defaults to fixed at the top of the viewport).
 */
export function ScrollProgress({ containerRef, className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : undefined,
  );
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn(
        "z-[130] h-1 origin-left bg-gradient-to-r from-brand via-brand-2 to-brand-3",
        containerRef ? "absolute inset-x-0 top-0" : "fixed inset-x-0 top-0",
        className,
      )}
    />
  );
}
