import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface GlitchTextProps {
  text: string;
  className?: string;
}

/**
 * GlitchText — two offset color channels (cyan / rose) jitter and clip over the
 * base text for a CRT-glitch effect. Pure CSS; settles under reduced-motion.
 */
export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span
      className={cn("relative inline-block font-semibold", className)}
      aria-label={text}
    >
      <span aria-hidden className="relative">
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0"
        style={
          {
            color: "var(--brand-2)",
            animation: "glitch-a 2.4s steps(2, jump-none) infinite",
            textShadow: "1px 0 var(--brand-2)",
          } as CSSProperties
        }
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0"
        style={
          {
            color: "var(--brand-3)",
            animation: "glitch-b 3.1s steps(2, jump-none) infinite",
            textShadow: "-1px 0 var(--brand-3)",
          } as CSSProperties
        }
      >
        {text}
      </span>
    </span>
  );
}
