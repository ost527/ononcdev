"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface GlareHoverProps extends HTMLAttributes<HTMLDivElement> {
  /** Content to wrap with the glare layer. */
  children: ReactNode;
  /** Glare color as a hex string. @default "#ffffff" */
  glareColor?: string;
  /** Peak opacity of the glare (0–1). @default 0.35 */
  glareOpacity?: number;
  /** Glare band angle in degrees. @default 45 */
  angle?: number;
  /** Glare band width as a percentage of the element. @default 220 */
  size?: number;
  /** Sweep duration in seconds. @default 0.8 */
  duration?: number;
  /** Corner radius in pixels. @default 16 */
  radius?: number;
  /** CSS class applied to the outer wrapper. */
  className?: string;
}

/**
 * GlareHover — a surface that sweeps a diagonal glare highlight across its face
 * on hover or focus. The glare moves from one side to the other via a CSS transition.
 */
export function GlareHover({
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.35,
  angle = 45,
  size = 220,
  duration = 0.8,
  radius = 16,
  className,
  style,
  ...props
}: GlareHoverProps) {
  const reduce = prefersReducedMotion();
  const mid = `color-mix(in srgb, ${glareColor} ${Math.round(
    glareOpacity * 100,
  )}%, transparent)`;

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={{ borderRadius: radius, ...style }}
      {...props}
    >
      {children}
      {/* Glare layer — swept purely via CSS on hover/focus, so it never
          blocks pointer events to the content beneath it. */}
      {!reduce && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-position:100%_0] transition-[background-position] ease-in-out group-hover:[background-position:0%_0] group-focus-within:[background-position:0%_0]"
          style={{
            borderRadius: radius,
            backgroundImage: `linear-gradient(${angle}deg, transparent 35%, ${mid} 50%, transparent 65%)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${size}% 100%`,
            transitionDuration: `${duration}s`,
          }}
        />
      )}
    </div>
  );
}
