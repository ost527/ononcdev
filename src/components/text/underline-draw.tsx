"use client";

import { type ReactNode, useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface UnderlineDrawProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  repeat?: boolean;
}

/**
 * UnderlineDraw — a hand-drawn gradient underline that draws itself beneath the
 * text when it scrolls into view. The underline is decorative (aria-hidden); the
 * text stays real and accessible. Reduced motion shows the finished stroke.
 */
export function UnderlineDraw({
  children,
  className,
  delay = 0.1,
  duration = 0.7,
  repeat = false,
}: UnderlineDrawProps) {
  const id = useId();
  const reduce = useReducedMotion();

  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 300 14"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.18em] left-0 h-[0.34em] w-full overflow-visible"
      >
        <defs>
          <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--brand)" />
            <stop offset="100%" stopColor="var(--brand-3)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M3 9 C 70 3, 120 13, 180 7 S 270 3, 297 8"
          fill="none"
          stroke={`url(#${id}-stroke)`}
          strokeWidth={4}
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: !repeat, amount: 0.6 }}
          transition={{
            duration: reduce ? 0 : duration,
            delay: reduce ? 0 : delay,
            ease: "easeInOut",
          }}
        />
      </svg>
    </span>
  );
}
