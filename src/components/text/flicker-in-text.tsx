import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface FlickerInTextProps {
  text: string;
  className?: string;
}

/**
 * FlickerInText — text rapidly strobes on/off (like a dying fluorescent)
 * before stabilizing permanently. Pure CSS animation that runs once;
 * accessible via aria-label.
 */
export function FlickerInText({ text, className }: FlickerInTextProps) {
  return (
    <span className={cn("inline-flex", className)} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block"
          style={
            {
              animation: `flicker-in 2.3s ${i * 0.06}s steps(1) forwards`,
              whiteSpace: "pre",
              opacity: 0,
            } as CSSProperties
          }
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      <style>{`
        @keyframes flicker-in {
          0%   { opacity: 0; }
          4%   { opacity: 1; }
          6%   { opacity: 0.1; }
          10%  { opacity: 1; }
          12%  { opacity: 0; }
          16%  { opacity: 0.6; }
          18%  { opacity: 0; }
          22%  { opacity: 1; }
          24%  { opacity: 0.2; }
          26%  { opacity: 1; }
          50%  { opacity: 0.8; }
          52%  { opacity: 0.3; }
          54%  { opacity: 1; }
          70%  { opacity: 0.9; }
          72%  { opacity: 1; }
          100% { opacity: 1; }
        }
      `}</style>
    </span>
  );
}
