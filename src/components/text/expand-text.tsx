"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface ExpandTextProps {
  text: string;
  className?: string;
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
  repeat?: boolean;
}

/**
 * ExpandText — text expands from heavily compressed letter-spacing into
 * natural breathing room, staggered word by word. The kerning opens up
 * like an accordion. Accessible via aria-label.
 */
export function ExpandText({
  text,
  className,
  stagger = 0.12,
  delay = 0,
  repeat = false,
}: ExpandTextProps) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: { letterSpacing: "-0.15em", opacity: 0 },
    show: {
      letterSpacing: "normal",
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
        letterSpacing: { duration: 1.2, ease: [0.32, 0.72, 0, 1] },
        opacity: { duration: 0.4 },
      },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.3 }}
      aria-label={text}
      className={cn("inline-flex flex-wrap", className)}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span
            variants={item}
            aria-hidden
            className="inline-block whitespace-nowrap"
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
