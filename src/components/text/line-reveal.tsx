"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface LineRevealProps {
  /** Each string is one line, revealed in sequence. */
  lines: string[];
  className?: string;
  /** Seconds between each line. */
  stagger?: number;
  delay?: number;
  repeat?: boolean;
}

/**
 * LineReveal — each line slides up from behind its own mask, staggered, when the
 * element scrolls into view. Ideal for multi-line headings. The full text is
 * exposed via aria-label; reduced motion shows the lines in place.
 */
export function LineReveal({
  lines,
  className,
  stagger = 0.12,
  delay = 0,
  repeat = false,
}: LineRevealProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { y: "110%" },
    show: {
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 26 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.4 }}
      aria-label={lines.join(" ")}
      className={cn("flex flex-col", className)}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden
          className="overflow-hidden"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span variants={item} className="inline-block">
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
