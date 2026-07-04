"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface SilkProps extends HTMLAttributes<HTMLDivElement> {
  /** The two silk colors, blended across the folds, as "r,g,b". */
  colors?: [string, string];
  /** Fold size — higher spreads the weave wider. */
  scale?: number;
  /** Flow speed multiplier (0 = frozen). */
  speed?: number;
  /** Sheen sharpness — tighter, brighter highlights as it rises (0–1). */
  sheen?: number;
  /** How much the weave warps and ripples (0–2). */
  warp?: number;
  /** Shading cell size in px (smaller = smoother surface, heavier). */
  detail?: number;
  children?: ReactNode;
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}
interface State {
  a: Rgb;
  b: Rgb;
}

const parse = (s: string): Rgb => {
  const [r, g, b] = s.split(",").map((v) => parseInt(v, 10) || 0);
  return { r, g, b };
};

/**
 * Silk — a smooth, flowing woven sheen. A low-frequency interference field is
 * shaded per grid cell and tinted between two colors, with a sharpened
 * highlight ramp that reads as satin folds catching the light.
 */
export function Silk({
  className,
  colors = ["139,92,246", "34,211,238"],
  scale = 1,
  speed = 1,
  sheen = 0.6,
  warp = 1,
  detail = 8,
  children,
  ...props
}: SilkProps) {
  const ref = useCanvas<State>({
    init: () => ({ a: parse(colors[0]), b: parse(colors[1]) }),
    draw: ({ ctx, width, height }, state, time) => {
      const t = time * speed;
      const { a, b } = state;
      const step = Math.max(4, detail);
      const inv = 1 / (Math.max(0.2, scale) * 150);
      const exp = 1 + 2.5 * sheen;

      for (let y = 0; y < height; y += step) {
        const v = y * inv;
        for (let x = 0; x < width; x += step) {
          const u = x * inv;
          // Two warped sine sheets interfere to make the flowing weave.
          const w1 = Math.sin(u * 3 + Math.sin(v * 2 + t * 0.5) * warp + t * 0.6);
          const w2 = Math.sin(v * 2.6 - Math.cos(u * 1.5 - t * 0.4) * warp + t * 0.5);
          const f = (w1 + w2) * 0.5; // -1..1
          const l = 0.5 + 0.5 * f;
          const lum = 0.18 + 0.95 * Math.pow(l, exp); // sharpened satin highlight
          const m = 0.5 + 0.5 * Math.sin(f * 2 + t * 0.2); // color blend across folds
          const r = Math.min(255, (a.r + (b.r - a.r) * m) * lum);
          const g = Math.min(255, (a.g + (b.g - a.g) * m) * lum);
          const bl = Math.min(255, (a.b + (b.b - a.b) * m) * lum);
          ctx.fillStyle = `rgb(${r | 0},${g | 0},${bl | 0})`;
          ctx.fillRect(x, y, step + 1, step + 1);
        }
      }
    },
  });

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-background", className)}
      {...props}
    >
      <canvas ref={ref} className="absolute inset-0 -z-10 h-full w-full" />
      {children}
    </div>
  );
}
