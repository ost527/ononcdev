"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface WarpInTextProps {
  text: string;
  className?: string;
  /** Seconds between each character. */
  stagger?: number;
  delay?: number;
  repeat?: boolean;
}

/**
 * WarpInText — each character warps in from a compressed, skewed, and
 * blurred state, stretching into place with an energetic snap. Differs
 * from ZoomBlur by using skewX and scaleX compression instead of uniform
 * scale. Accessible via aria-label.
 */
export function WarpInText({
  text,
  className,
  stagger = 0.04,
  delay = 0,
  repeat = false,
}: WarpInTextProps) {
  const chars = Array.from(text);
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { scaleX: 0.1, skewX: -20, opacity: 0, filter: "blur(6px)" },
    show: {
      scaleX: 1,
      skewX: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 280, damping: 20, mass: 0.5 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.3 }}
      aria-label={text}
      className={cn("inline-flex", className)}
    >
      {chars.map((char, i) => (
        <Fragment key={i}>
          <motion.span
            variants={item}
            aria-hidden
            className="inline-block origin-left"
            style={{ whiteSpace: "pre" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </Fragment>
      ))}
    </motion.span>
  );
}
