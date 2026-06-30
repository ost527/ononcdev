"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface LettersPullUpProps {
  text: string;
  className?: string;
  /** Seconds between each letter. */
  stagger?: number;
  delay?: number;
  /** Replay every time it scrolls into view (default: once). */
  repeat?: boolean;
}

/**
 * LettersPullUp — each letter fades and rises into place, staggered, when the
 * element scrolls into view. The full string stays screen-readable via
 * aria-label; under reduced motion the letters appear in place.
 */
export function LettersPullUp({
  text,
  className,
  stagger = 0.04,
  delay = 0,
  repeat = false,
}: LettersPullUpProps) {
  const reduce = useReducedMotion();
  const chars = Array.from(text);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { y: "0.45em", opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 320, damping: 26 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.4 }}
      aria-label={text}
      className={cn("inline-block", className)}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={item}
          aria-hidden
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
