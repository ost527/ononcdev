"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface BlurInTextProps {
  text: string;
  className?: string;
  /** Seconds between each word. */
  stagger?: number;
  /** Delay before the first word (seconds). */
  delay?: number;
  repeat?: boolean;
}

/**
 * BlurInText — words resolve from a soft blur while fading and rising, one
 * after another, when scrolled into view. Stays screen-readable via aria-label.
 */
export function BlurInText({
  text,
  className,
  stagger = 0.09,
  delay = 0,
  repeat = false,
}: BlurInTextProps) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 12, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.4 }}
      aria-label={text}
      className={cn("inline", className)}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span variants={item} aria-hidden className="inline-block">
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
