import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ShinyTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Sweep duration in seconds. */
  speed?: number;
  children: ReactNode;
}

/**
 * ShinyText — muted text with a bright glare that sweeps across on a loop.
 * Pure CSS via the global `shimmer` keyframe.
 */
export function ShinyText({
  className,
  speed = 3,
  children,
  ...props
}: ShinyTextProps) {
  return (
    <span
      className={cn(
        "animate-shimmer bg-clip-text text-transparent",
        className,
      )}
      style={
        {
          backgroundImage:
            "linear-gradient(110deg, var(--muted) 35%, #ffffff 50%, var(--muted) 65%)",
          backgroundSize: "200% 100%",
          animationDuration: `${speed}s`,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </span>
  );
}
