import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PulseWaveTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Glow color. */
  color?: string;
  /** Seconds for one full wave cycle. */
  duration?: number;
  children: ReactNode;
}

/**
 * PulseWaveText — a brightness/glow wave sweeps left-to-right through the
 * text in a continuous loop. Uses a gradient mask animated over the text
 * background. Pure CSS; freezes under reduced-motion.
 */
export function PulseWaveText({
  className,
  color = "var(--brand-2)",
  duration = 3,
  children,
  ...props
}: PulseWaveTextProps) {
  return (
    <span
      className={cn("inline-block select-none", className)}
      style={
        {
          backgroundImage: `linear-gradient(90deg, currentColor 0%, currentColor 35%, ${color} 50%, currentColor 65%, currentColor 100%)`,
          backgroundSize: "300% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          animation: `pulse-wave ${duration}s linear infinite`,
        } as CSSProperties
      }
      {...props}
    >
      <style>{`
        @keyframes pulse-wave {
          0% { background-position: 100% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      {children}
    </span>
  );
}
