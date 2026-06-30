"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TypewriterProps {
  /** Phrases to cycle through. */
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  /** Pause (ms) once a word is fully typed. */
  pauseTime?: number;
  className?: string;
  cursorClassName?: string;
  /** Loop back to the first word (default true). */
  loop?: boolean;
}

type Phase = "typing" | "deleting";

/**
 * Typewriter — types each phrase out, pauses, deletes, and advances to the
 * next, with a hard-blinking caret. Stops on the last word when loop=false.
 */
export function Typewriter({
  words,
  typingSpeed = 70,
  deletingSpeed = 38,
  pauseTime = 1400,
  className,
  cursorClassName,
  loop = true,
}: TypewriterProps) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[wordIndex % words.length] ?? "";
    const atLastWord = wordIndex === words.length - 1;
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < current.length) {
        timeout = setTimeout(
          () => setDisplay(current.slice(0, display.length + 1)),
          typingSpeed,
        );
      } else if (loop || !atLastWord) {
        timeout = setTimeout(() => setPhase("deleting"), pauseTime);
      }
    } else if (display.length > 0) {
      timeout = setTimeout(
        () => setDisplay(current.slice(0, display.length - 1)),
        deletingSpeed,
      );
    } else {
      timeout = setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [display, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseTime, loop]);

  if (words.length === 0) return null;

  return (
    <span className={cn("inline-flex items-baseline", className)} aria-live="polite">
      <span>{display}</span>
      <span
        aria-hidden
        className={cn(
          "animate-blink ml-0.5 inline-block w-[0.08em] self-stretch bg-current",
          cursorClassName,
        )}
      />
    </span>
  );
}
