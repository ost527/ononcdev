import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton — a shimmering placeholder for loading states. Size it with utility
 * classes (e.g. `h-4 w-32`). A light band sweeps across via the shimmer keyframe.
 */
export function Skeleton({ className, style, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn("animate-shimmer rounded-md", className)}
      style={
        {
          backgroundImage:
            "linear-gradient(90deg, var(--surface-2), color-mix(in oklab, var(--foreground) 9%, var(--surface-2)), var(--surface-2))",
          backgroundSize: "200% 100%",
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
