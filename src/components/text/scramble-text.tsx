"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface ScrambleTextProps {
  /** Target text to decode to. */
  text: string;
  className?: string;
  /** Glyph pool used while scrambling. */
  glyphs?: string;
  /** Milliseconds per animation step. */
  speed?: number;
  /** Frames each character stays scrambled before locking. */
  framesPerChar?: number;
  /** What starts the effect. */
  trigger?: "view" | "hover" | "mount";
}

const DEFAULT_GLYPHS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789@#%&*<>/\\[]{}=+-?";

/**
 * ScrambleText — characters flicker through random glyphs and lock in
 * left-to-right. Screen readers get the final text via aria-label.
 */
export function ScrambleText({
  text,
  className,
  glyphs = DEFAULT_GLYPHS,
  speed = 28,
  framesPerChar = 2,
  trigger = "view",
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [output, setOutput] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = () => {
    if (prefersReducedMotion()) return;
    if (timer.current) clearInterval(timer.current);
    let frame = 0;
    const total = text.length * framesPerChar;
    timer.current = setInterval(() => {
      frame += 1;
      const revealed = frame / framesPerChar;
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") out += " ";
        else if (i < revealed) out += ch;
        else out += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      setOutput(out);
      if (frame >= total) {
        setOutput(text);
        if (timer.current) clearInterval(timer.current);
      }
    }, speed);
  };

  useEffect(() => {
    if (trigger === "mount") run();
    else if (trigger === "view" && inView) run();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, trigger]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={text}
      onMouseEnter={trigger === "hover" ? run : undefined}
    >
      <span aria-hidden>{output}</span>
    </span>
  );
}
