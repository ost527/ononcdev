"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MorphingTextProps {
  /** Words to cycle through. */
  words: string[];
  /** Display time per word in ms. */
  interval?: number;
  className?: string;
}

/**
 * MorphingText — each word scales down and fades out while the next scales
 * up and fades in, creating a smooth morph transition. Resets at end of list.
 */
export function MorphingText({
  words,
  interval = 2600,
  className,
}: MorphingTextProps) {
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
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, scale: 0.7, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.3, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
