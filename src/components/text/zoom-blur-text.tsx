"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface ZoomBlurTextProps {
  text: string;
  className?: string;
  /** Seconds between each character. */
  stagger?: number;
  /** Starting scale. */
  fromScale?: number;
  delay?: number;
  repeat?: boolean;
}

/**
 * ZoomBlurText — each character zooms in from a huge distant scale with
 * extreme motion blur, then snaps into place. Dramatic entry suited for
 * hero impact moments. Accessible via aria-label.
 */
export function ZoomBlurText({
  text,
  className,
  stagger = 0.05,
  fromScale = 4,
  delay = 0,
  repeat = false,
}: ZoomBlurTextProps) {
  const chars = Array.from(text);
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { scale: fromScale, opacity: 0, filter: "blur(20px)" },
    show: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 240, damping: 22, mass: 0.7 },
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
