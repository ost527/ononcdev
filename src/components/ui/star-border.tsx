"use client";

import type { ReactNode } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface StarBorderProps {
  /** Content to wrap with the star border. */
  children: ReactNode;
  /** Glow color as a hex string. @default "#8b5cf6" */
  color?: string;
  /** Duration of the animation loop in seconds. @default 6 */
  speed?: number;
  /** Border thickness in pixels. @default 2 */
  thickness?: number;
  /** Corner radius in pixels. @default 16 */
  radius?: number;
  /** Soft outer glow radius in pixels (0 disables). @default 14 */
  glow?: number;
  /** CSS class applied to the inner content element. */
  className?: string;
}

/**
 * StarBorder — a wrapper whose border is ringed by a soft band of light that
 * continuously orbits it: a slowly rotating conic gradient over a dim base (the
 * same mechanic as ShimmerButton), read through the `thickness` ring left by the
 * opaque content, plus a soft outer glow. Smooth and seamless; reduced motion
 * shows a static soft ring.
 */
export function StarBorder({
  children,
  color = "#8b5cf6",
  speed = 6,
  thickness = 2,
  radius = 16,
  glow = 14,
  className,
}: StarBorderProps) {
  const reduce = prefersReducedMotion();
  const pad = Math.max(1, thickness);
  const dim = `color-mix(in srgb, ${color} 12%, transparent)`;
  const mid = `color-mix(in srgb, ${color} 45%, transparent)`;
  // A soft band that peaks at `color` and fades to a dim base — no transparent
  // gap, so there is no hard seam and the whole ring stays gently lit.
  const band = `conic-gradient(from 0deg, ${dim} 0deg, ${dim} 90deg, ${mid} 140deg, ${color} 180deg, ${mid} 220deg, ${dim} 270deg, ${dim} 360deg)`;
  const evenRing = `conic-gradient(from 0deg, ${mid}, ${dim}, ${mid}, ${dim}, ${mid})`;

  return (
    <div
      className="relative inline-flex overflow-hidden"
      style={{
        borderRadius: radius,
        padding: pad,
        // Soft outer glow (drawn outside the clip).
        boxShadow:
          glow > 0
            ? `0 0 ${glow}px color-mix(in srgb, ${color} 55%, transparent)`
            : undefined,
      }}
    >
      {/* The orbiting light: an oversized conic gradient rotating behind the
          opaque content, so only the `thickness` ring reads it. */}
      <span
        aria-hidden
        className="absolute inset-[-250%]"
        style={{
          background: reduce ? evenRing : band,
          animation: reduce ? undefined : `star-spin ${speed}s linear infinite`,
        }}
      />

      {/* Inner content */}
      <div
        className={cn(
          "relative z-[1] inline-flex items-center bg-surface px-5 py-2.5 text-foreground",
          className,
        )}
        style={{ borderRadius: Math.max(0, radius - pad) }}
      >
        {children}
      </div>
    </div>
  );
}
