"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface RotatingTextProps {
  words: string[];
  className?: string;
  /** Milliseconds each word is shown. */
  interval?: number;
}

/**
 * RotatingText — swaps through a list of words, each sliding up out of a slot
 * as the next slides in. The current word is announced politely.
 */
export function RotatingText({
  words,
  className,
  interval = 2200,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1 || prefersReducedMotion()) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span
      className={cn("relative inline-flex overflow-hidden align-bottom", className)}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="inline-block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
