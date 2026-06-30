"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FocusTextProps {
  words: string[];
  className?: string;
  /** Milliseconds each word stays in focus. */
  interval?: number;
}

/**
 * FocusText — the words read as a phrase while focus rolls across them: the
 * active word is sharp, the rest are dimmed and blurred. Loops while in view and
 * pauses off-screen. Under reduced motion every word stays sharp. The full
 * phrase is exposed via aria-label.
 */
export function FocusText({ words, className, interval = 1500 }: FocusTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || !inView || words.length < 2) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % words.length),
      interval,
    );
    return () => clearInterval(id);
  }, [inView, reduce, words.length, interval]);

  return (
    <span
      ref={ref}
      aria-label={words.join(" ")}
      className={cn("inline-flex flex-wrap justify-center gap-x-[0.28em]", className)}
    >
      {words.map((word, i) => {
        const dim = !reduce && i !== active;
        return (
          <span
            key={i}
            aria-hidden
            className={cn(
              "transition-[filter,opacity,color] duration-500",
              dim
                ? "text-muted opacity-50 blur-[3px]"
                : "text-foreground opacity-100 blur-0",
            )}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
