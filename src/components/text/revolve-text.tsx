"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface RevolveTextProps {
  text: string;
  className?: string;
  /** Seconds between each character. */
  stagger?: number;
  delay?: number;
  repeat?: boolean;
}

/**
 * RevolveText — each character does a full 360° rotateY spin into place,
 * staggered on scroll into view. The 3D perspective gives a coin-flip feel.
 * Accessible via aria-label.
 */
export function RevolveText({
  text,
  className,
  stagger = 0.05,
  delay = 0,
  repeat = false,
}: RevolveTextProps) {
  const chars = Array.from(text);
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { rotateY: 180, opacity: 0, scale: 0.4 },
    show: {
      rotateY: 360,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 160, damping: 16, mass: 0.6 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.3 }}
      aria-label={text}
      className={cn("inline-flex [perspective:800px]", className)}
    >
      {chars.map((char, i) => (
        <Fragment key={i}>
          <motion.span
            variants={item}
            aria-hidden
            className="inline-block [transform-style:preserve-3d]"
            style={{ whiteSpace: "pre" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </Fragment>
      ))}
    </motion.span>
  );
}
