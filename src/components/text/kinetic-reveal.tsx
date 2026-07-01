"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface KineticRevealProps {
  text: string;
  className?: string;
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
  repeat?: boolean;
}

/**
 * KineticReveal — each word bursts in with scale, rotation, and a blur that
 * resolves, staggered on scroll into view. Energetic entry suited for hero
 * headlines. Accessible via aria-label.
 */
export function KineticReveal({
  text,
  className,
  stagger = 0.1,
  delay = 0,
  repeat = false,
}: KineticRevealProps) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      rotate: -8,
      filter: "blur(12px)",
    },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 16,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.4 }}
      aria-label={text}
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span variants={item} aria-hidden className="inline-block">
            {word}
          </motion.span>
        </Fragment>
      ))}
    </motion.span>
  );
}
