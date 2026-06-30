"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
  children: ReactNode;
  className?: string;
  /** Direction the wipe travels from. */
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  repeat?: boolean;
}

const FROM: Record<NonNullable<TextRevealProps["direction"]>, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

/**
 * TextReveal — the text is wiped into view behind a sliding clip-path mask.
 * The text is real (no per-character spans), so it stays fully accessible;
 * under reduced motion it simply appears.
 */
export function TextReveal({
  children,
  className,
  direction = "left",
  delay = 0,
  duration = 0.8,
  repeat = false,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const shown = "inset(0 0 0 0)";

  return (
    <motion.span
      initial={{ clipPath: reduce ? shown : FROM[direction] }}
      whileInView={{ clipPath: shown }}
      viewport={{ once: !repeat, amount: 0.5 }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}
