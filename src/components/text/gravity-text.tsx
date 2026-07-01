"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface GravityTextProps {
  text: string;
  className?: string;
  /** Seconds between each character. */
  stagger?: number;
  /** Drop height in px. */
  drop?: number;
  delay?: number;
  repeat?: boolean;
}

/**
 * GravityText — each character drops in from above with a heavy bounce,
 * settling with a secondary wobble. The physics feel (low damping, high mass)
 * differs from RisingText which uses a lighter spring. Accessible via
 * aria-label.
 */
export function GravityText({
  text,
  className,
  stagger = 0.04,
  drop = 60,
  delay = 0,
  repeat = false,
}: GravityTextProps) {
  const chars = Array.from(text);
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { y: -drop, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 8, mass: 1.4 },
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
