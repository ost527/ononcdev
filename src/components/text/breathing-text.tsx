import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BreathingTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Seconds for one full breath cycle. */
  duration?: number;
  /** Maximum scale factor (e.g. 1.06). */
  scale?: number;
  children: ReactNode;
}

/**
 * BreathingText — text gently expands and contracts like a breathing rhythm.
 * Uses the global `float` keyframe with a scale-only variant. Pure CSS;
 * settles under reduced-motion. Stays fully readable.
 */
export function BreathingText({
  className,
  duration = 4,
  scale = 1.04,
  children,
  ...props
}: BreathingTextProps) {
  return (
    <span
      className={cn("inline-block", className)}
      style={
        {
          animationName: "breathing",
          animationDuration: `${duration}s`,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          "--breathing-scale": scale,
        } as CSSProperties
      }
      {...props}
    >
      <style>{`
        @keyframes breathing {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(var(--breathing-scale, 1.04)); opacity: 1; }
        }
      `}</style>
      {children}
    </span>
  );
}
