import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface NeonTextProps {
  text: string;
  className?: string;
  /** Glow color (default: brand-2/cyan). */
  color?: string;
  /** Flicker intensity 0-1. 0 = steady. */
  flicker?: number;
}

/**
 * NeonText — glowing sign text with an optional subtle flicker. Two overlay
 * layers create depth: a wide blurred glow behind crisp text. Pure CSS;
 * freezes under reduced-motion. Screen readers get the raw text.
 */
export function NeonText({
  text,
  className,
  color = "var(--brand-2)",
  flicker = 0.3,
}: NeonTextProps) {
  return (
    <span className={cn("relative inline-block select-none", className)} aria-label={text}>
      {/* Wide blur glow behind */}
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={
          {
            color,
            textShadow: `0 0 18px ${color}, 0 0 42px ${color}, 0 0 80px ${color}`,
            filter: "blur(4px)",
            opacity: 0.65,
            animation:
              flicker > 0
                ? `neon-flicker ${(3 - flicker * 2.4).toFixed(2)}s ease-in-out infinite alternate`
                : "none",
          } as CSSProperties
        }
      >
        {text}
      </span>
      {/* Sharp text layer */}
      <span
        aria-hidden
        className="relative select-none"
        style={
          {
            color: "#ffffff",
            textShadow: `0 0 7px ${color}, 0 0 14px ${color}`,
          } as CSSProperties
        }
      >
        {text}
      </span>
    </span>
  );
}
