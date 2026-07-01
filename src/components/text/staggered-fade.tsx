"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface StaggeredFadeProps {
  text: string;
  className?: string;
  /** Seconds between each character entry. */
  stagger?: number;
  /** Initial rotation in degrees. */
  rotate?: number;
  delay?: number;
  repeat?: boolean;
}

/**
 * StaggeredFade — each character fades in, slides up, and rotates into
 * place one by one on view. Accessible via aria-label.
 */
export function StaggeredFade({
  text,
  className,
  stagger = 0.04,
  rotate = 12,
  delay = 0,
  repeat = false,
}: StaggeredFadeProps) {
  const chars = Array.from(text);
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 18, rotate: rotate },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 180, damping: 18 },
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
