import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FlowGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Grid cell size in pixels. */
  size?: number;
  /** Line color (CSS color string). */
  lineColor?: string;
  children?: ReactNode;
}

/**
 * FlowGrid — a tilted perspective grid that scrolls toward the horizon,
 * faded with a radial mask. Pure CSS; the pan honors reduced-motion globally.
 */
export function FlowGrid({
  className,
  size = 44,
  lineColor = "rgba(139,92,246,0.35)",
  children,
  ...props
}: FlowGridProps) {
  return (
    <div
      className={cn("relative isolate overflow-hidden bg-background", className)}
      style={{ ["--grid-size" as string]: `${size}px` }}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [perspective:520px]"
      >
        <div
          className="animate-grid-pan absolute inset-[-60%_-20%_-10%] [transform:rotateX(62deg)]"
          style={
            {
              backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
              backgroundSize: `${size}px ${size}px`,
              maskImage:
                "radial-gradient(60% 60% at 50% 35%, #000 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(60% 60% at 50% 35%, #000 30%, transparent 80%)",
            } as CSSProperties
          }
        />
      </div>
      {/* Horizon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-40 opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 50%, color-mix(in oklab, var(--brand-2) 45%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
