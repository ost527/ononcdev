import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Gradient stops, left to right (CSS color strings). */
  colors?: string[];
  /** Animation duration in seconds. */
  speed?: number;
  children: ReactNode;
}

/**
 * GradientText — a multi-stop gradient clipped to the text that pans
 * horizontally. Pure CSS; freezes under prefers-reduced-motion.
 */
export function GradientText({
  className,
  colors = ["var(--brand-ink)", "var(--brand-2)", "var(--brand-3)", "var(--brand-ink)"],
  speed = 8,
  children,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "animate-gradient bg-clip-text text-transparent",
        className,
      )}
      style={
        {
          backgroundImage: `linear-gradient(100deg, ${colors.join(", ")})`,
          backgroundSize: "200% auto",
          animationDuration: `${speed}s`,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </span>
  );
}
