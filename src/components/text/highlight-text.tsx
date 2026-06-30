"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface HighlightTextProps {
  children: ReactNode;
  className?: string;
  /** Marker color (CSS color). */
  color?: string;
  /** Delay before the sweep (seconds). */
  delay?: number;
}

/**
 * HighlightText — a marker stroke sweeps in behind the text from the left the
 * first time it scrolls into view.
 */
export function HighlightText({
  children,
  className,
  color = "color-mix(in oklab, var(--brand) 45%, transparent)",
  delay = 0,
}: HighlightTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <motion.span
        aria-hidden
        className="absolute inset-x-[-0.12em] bottom-[0.04em] -z-10 h-[0.72em] origin-left rounded-[0.2em]"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.55, ease: "easeOut", delay }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
