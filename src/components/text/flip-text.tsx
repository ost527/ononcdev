"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface FlipTextProps {
  text: string;
  className?: string;
  /** Seconds between each character. */
  stagger?: number;
  delay?: number;
  repeat?: boolean;
}

/**
 * FlipText — each character flips up from a -90° tilt into place, staggered,
 * when it scrolls into view. The full string stays screen-readable.
 */
export function FlipText({
  text,
  className,
  stagger = 0.04,
  delay = 0,
  repeat = false,
}: FlipTextProps) {
  const chars = Array.from(text);
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { rotateX: -90, opacity: 0 },
    show: {
      rotateX: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.4 }}
      aria-label={text}
      className={cn("inline-flex [perspective:600px]", className)}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={item}
          aria-hidden
          className="inline-block origin-bottom [transform-style:preserve-3d]"
          style={{ whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
