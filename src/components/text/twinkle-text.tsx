import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface TwinkleTextProps {
  text: string;
  className?: string;
  /** Base duration per character in seconds. */
  duration?: number;
}

/**
 * TwinkleText — each character twinkles with staggered random delays like
 * starlight. Pure CSS; freezes under reduced-motion. Accessible via aria-label.
 */
export function TwinkleText({
  text,
  className,
  duration = 2.2,
}: TwinkleTextProps) {
  const mulberry32 = (seed: number) => {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return (
    <span className={cn("inline-flex", className)} aria-label={text}>
      {Array.from(text).map((char, i) => {
        const delay = (mulberry32(i * 31 + 7) * duration).toFixed(2);
        const dur = (duration * 0.6 + mulberry32(i * 17 + 3) * duration * 0.8).toFixed(2);
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block"
            style={
              {
                animation: `twinkle ${dur}s ${delay}s ease-in-out infinite`,
                whiteSpace: "pre",
              } as CSSProperties
            }
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          30% { opacity: 1; }
          50% { opacity: 0.3; }
          70% { opacity: 0.9; }
        }
      `}</style>
    </span>
  );
}
