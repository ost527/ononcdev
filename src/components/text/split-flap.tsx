"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SplitFlapProps {
  /** Words to cycle through, split-flap style. */
  words: string[];
  /** Display time per word in ms. */
  interval?: number;
  className?: string;
}

/**
 * SplitFlap — old-school split-flap display. Each word flips down (top half
 * fades while bottom half scales in), one after another. Accessible via
 * aria-live.
 */
export function SplitFlap({
  words,
  interval = 2800,
  className,
}: SplitFlapProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  if (words.length === 0) return null;

  return (
    <span
      className={cn("relative inline-flex items-center justify-center overflow-hidden", className)}
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ rotateX: -90, opacity: 0, y: -10 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: 90, opacity: 0, y: 10 }}
          transition={{ duration: 0.45, ease: [0.45, 0, 0.55, 1] }}
          className="inline-block"
          style={{ transformOrigin: "bottom center" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
