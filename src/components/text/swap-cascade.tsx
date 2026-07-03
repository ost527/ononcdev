"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export interface SwapCascadeProps {
  text: string;
  className?: string;
}

const GLYPHS =
  "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

/**
 * SwapCascade — each character rapidly swaps between random glyphs in a
 * cascading wave from left to right, finally settling into the target string
 * one by one. Runs once on mount. Accessible via aria-label.
 */
export function SwapCascade({ text, className }: SwapCascadeProps) {
  return <SwapCascadeText key={text} text={text} className={className} />;
}

function SwapCascadeText({ text, className }: SwapCascadeProps) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = chars.length;
    const duration = 1200 + total * 80;
    const start = performance.now();
    let frameId = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [chars.length]);

  const getGlyph = (i: number, p: number) => {
    const revealPoint = (i / chars.length) * 1.0;
    if (p > revealPoint) return chars[i];
    const seed = Math.floor(i * 17 + p * 300);
    return GLYPHS[seed % GLYPHS.length];
  };

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
