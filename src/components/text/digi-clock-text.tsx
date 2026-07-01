"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface DigiClockTextProps {
  text: string;
  className?: string;
  /** Seconds before the scramble resolves. */
  duration?: number;
}

/**
 * DigiClockText — characters rapidly flip through random alphanumeric
 * glyphs like a digital clock or old airport board, finally resolving
 * into the target text. Runs once on mount. Accessible via aria-label.
 */
export function DigiClockText({
  text,
  className,
  duration = 2,
}: DigiClockTextProps) {
  const chars = Array.from(text);
  const [frame, setFrame] = useState(0);

  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    const start = performance.now();
    let id: number;

    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(elapsed / (duration * 1000), 1);
      setFrame(Math.floor(p * 40));
      if (p < 1) {
        id = requestAnimationFrame(tick);
      }
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [text, duration]);

  const getChar = (i: number, f: number) => {
    const pGlobal = f / 40;
    const reveal = (i / chars.length) * 1.0;
    if (pGlobal > reveal) return chars[i];
    const seed = i * 31 + f * 7;
    return GLYPHS[seed % GLYPHS.length];
  };

  return (
    <span
      aria-label={text}
      className={cn("inline-flex font-mono tabular-nums", className)}
    >
      {chars.map((char, i) => {
        if (char === " ") {
          return (
            <span key={i} aria-hidden className="inline-block" style={{ whiteSpace: "pre" }}>
              {"\u00A0"}
            </span>
          );
        }
        const display = getChar(i, frame);
        const stable = (frame / 40) > (i / chars.length) * 1.0;
        return (
          <span
            key={i}
            aria-hidden
            className={cn("inline-block", stable && "text-brand-ink")}
            style={{ whiteSpace: "pre" }}
          >
            {display}
          </span>
        );
      })}
    </span>
  );
}
