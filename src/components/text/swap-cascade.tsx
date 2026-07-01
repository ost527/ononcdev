"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SwapCascadeProps {
  text: string;
  className?: string;
}

/**
 * SwapCascade — each character rapidly swaps between random glyphs in a
 * cascading wave from left to right, finally settling into the target string
 * one by one. Runs once on mount. Accessible via aria-label.
 */
export function SwapCascade({ text, className }: SwapCascadeProps) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [phase, setPhase] = useState<"idle" | "swapping" | "done">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setPhase("swapping");
    setProgress(0);
  }, [text]);

  useEffect(() => {
    if (phase !== "swapping") return;
    const total = chars.length;
    const duration = 1200 + total * 80;
    const start = performance.now();

    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p >= 1) {
        setPhase("done");
        return;
      }
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [phase, chars.length]);

  const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  const getGlyph = (i: number, p: number) => {
    const revealPoint = (i / chars.length) * 1.0;
    if (p > revealPoint) return chars[i];
    const seed = Math.floor(i * 17 + p * 300);
    return GLYPHS[seed % GLYPHS.length];
  };

  if (phase === "idle") {
    return (
      <span aria-label={text} className={cn("inline-flex", className)}>
        {chars.map((char, i) => (
          <span key={i} aria-hidden className="inline-block" style={{ whiteSpace: "pre" }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span aria-label={text} className={cn("inline-flex font-mono", className)}>
      {chars.map((char, i) => {
        const display = char === " " ? "\u00A0" : getGlyph(i, progress);
        const revealed = progress > (i / chars.length) * 1.0;
        return (
          <span
            key={i}
            aria-hidden
            className={cn(
              "inline-block",
              revealed ? "text-brand-ink" : "text-muted-2",
            )}
            style={{ whiteSpace: "pre" }}
          >
            {display}
          </span>
        );
      })}
    </span>
  );
}
