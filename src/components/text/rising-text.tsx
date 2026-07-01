"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface RisingTextProps {
  text: string;
  className?: string;
  /** Seconds between each character. */
  stagger?: number;
  /** Vertical rise distance in px. */
  rise?: number;
  delay?: number;
  repeat?: boolean;
}

/**
 * RisingText — each character rises up from below, fades in, and scales
 * slightly larger before settling. Staggered on scroll into view. Accessible
 * via aria-label.
 */
export function RisingText({
  text,
  className,
  stagger = 0.03,
  rise = 32,
  delay = 0,
  repeat = false,
}: RisingTextProps) {
  const chars = Array.from(text);
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: rise, scale: 0.7 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
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
            className="inline-block"
            style={{ whiteSpace: "pre" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </Fragment>
      ))}
    </motion.span>
  );
}
