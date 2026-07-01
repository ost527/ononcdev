import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface HolographicTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Speed of the hue rotation in seconds. */
  speed?: number;
  children: ReactNode;
}

/**
 * HolographicText — iridescent text whose colors continuously shift through
 * the spectrum, with a subtle shimmer overlay. Pure CSS clip + hue-rotate.
 * Freezes under reduced-motion.
 */
export function HolographicText({
  className,
  speed = 3.5,
  children,
  ...props
}: HolographicTextProps) {
  return (
    <span
      className={cn("inline-block select-none", className)}
      style={
        {
          backgroundImage:
            "linear-gradient(110deg, var(--brand-3), var(--brand), var(--brand-2), var(--brand-3), var(--brand))",
          backgroundSize: "300% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          animation: `holographic ${speed}s linear infinite`,
          filter: "saturate(1.3) brightness(1.1)",
        } as CSSProperties
      }
      {...props}
    >
      <style>{`
        @keyframes holographic {
          0% { background-position: 0% 50%; filter: hue-rotate(0deg) saturate(1.3) brightness(1.1); }
          25% { filter: hue-rotate(90deg) saturate(1.5) brightness(1.2); }
          50% { background-position: 200% 50%; filter: hue-rotate(180deg) saturate(1.3) brightness(1.1); }
          75% { filter: hue-rotate(270deg) saturate(1.5) brightness(1.2); }
          100% { background-position: 0% 50%; filter: hue-rotate(360deg) saturate(1.3) brightness(1.1); }
        }
      `}</style>
      {children}
    </span>
  );
}
