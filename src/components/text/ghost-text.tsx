import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface GhostTextProps {
  text: string;
  className?: string;
  /** Seconds for one apparition cycle. */
  duration?: number;
}

/**
 * GhostText — ethereal text that continuously fades in and out like an
 * apparition, with a subtle vertical drift. Pure CSS; freezes under
 * reduced-motion. Accessible via aria-label.
 */
export function GhostText({
  text,
  className,
  duration = 3.4,
}: GhostTextProps) {
  return (
    <span className={cn("inline-block select-none", className)} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block"
          style={
            {
              animation: `ghost-appear ${duration}s ease-in-out ${i * 0.08}s infinite`,
              whiteSpace: "pre",
            } as CSSProperties
          }
        >
          {char === " " ? "\u00A0" : char}
          <style>{`
            @keyframes ghost-appear {
              0%, 100% { opacity: 0.12; transform: translateY(3px); }
              45% { opacity: 0.9; transform: translateY(-2px); }
              55% { opacity: 0.95; transform: translateY(-2px); }
            }
          `}</style>
        </span>
      ))}
    </span>
  );
}
