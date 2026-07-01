import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ColorCycleTextProps {
  text: string;
  className?: string;
  /** Seconds for one full cycle per character. */
  duration?: number;
}

/**
 * ColorCycleText — each character independently cycles through the brand
 * palette, staggered so a rainbow wave travels through the text. Pure CSS
 * with per-character keyframes; freezes under reduced-motion. Accessible
 * via aria-label.
 */
export function ColorCycleText({
  text,
  className,
  duration = 4,
}: ColorCycleTextProps) {
  const PALETTE = [
    "var(--brand)",       // violet
    "var(--brand-2)",     // cyan
    "var(--brand-3)",     // rose
    "var(--brand-ink)",   // deep violet
  ];

  return (
    <span className={cn("inline-flex", className)} aria-label={text}>
      <style>{`
        @keyframes cc-a {
          0%, 100% { color: var(--brand); }
          25% { color: var(--brand-2); }
          50% { color: var(--brand-3); }
          75% { color: var(--brand-ink); }
        }
        @keyframes cc-b {
          0%, 100% { color: var(--brand-2); }
          25% { color: var(--brand-3); }
          50% { color: var(--brand-ink); }
          75% { color: var(--brand); }
        }
        @keyframes cc-c {
          0%, 100% { color: var(--brand-3); }
          25% { color: var(--brand-ink); }
          50% { color: var(--brand); }
          75% { color: var(--brand-2); }
        }
        @keyframes cc-d {
          0%, 100% { color: var(--brand-ink); }
          25% { color: var(--brand); }
          50% { color: var(--brand-2); }
          75% { color: var(--brand-3); }
        }
      `}</style>
      {Array.from(text).map((char, i) => {
        const keyframes = ["cc-a", "cc-b", "cc-c", "cc-d"][i % 4];
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block"
            style={
              {
                animation: `${keyframes} ${duration}s ${i * 0.1}s ease-in-out infinite`,
                whiteSpace: "pre",
              } as CSSProperties
            }
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}
