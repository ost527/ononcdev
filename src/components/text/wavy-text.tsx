import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface WavyTextProps {
  text: string;
  className?: string;
  /** Seconds for one full bob cycle. */
  duration?: number;
  /** Seconds of delay added per letter. */
  stagger?: number;
}

/**
 * WavyText — each letter rides a sine wave, offset by position, for a gentle
 * continuous ripple. Pure CSS; freezes under reduced-motion. Screen readers
 * get the whole word via aria-label.
 */
export function WavyText({
  text,
  className,
  duration = 1.8,
  stagger = 0.06,
}: WavyTextProps) {
  return (
    <span className={cn("inline-flex", className)} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block"
          style={
            {
              animation: `wave ${duration}s ease-in-out ${i * stagger}s infinite`,
              whiteSpace: "pre",
            } as CSSProperties
          }
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
