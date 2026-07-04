"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface DitherProps extends HTMLAttributes<HTMLDivElement> {
  /** Two colours as "r,g,b": [shadow, highlight] the gradient ramps between. */
  colors?: [string, string];
  /** Size of each dither pixel in px (bigger = chunkier, cheaper). */
  pixelSize?: number;
  /** Flow speed multiplier (0 = frozen). */
  speed?: number;
  /** Pattern scale — higher spreads the plasma wider. */
  scale?: number;
  /** Number of quantised tones the dither ramps through (2–6). */
  levels?: number;
  /** Contrast of the underlying gradient before dithering (0.5–2). */
  contrast?: number;
  children?: ReactNode;
}

type Rgb = [number, number, number];

interface State {
  a: Rgb;
  b: Rgb;
}

/** Bayer 4×4 ordered-dither thresholds, normalised to (0,1). */
const BAYER = [
  0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5,
].map((v) => (v + 0.5) / 16);

const parse = (value: string): Rgb => {
  const p = value.split(",").map((v) => parseInt(v, 10) || 0);
  return [p[0] ?? 0, p[1] ?? 0, p[2] ?? 0];
};

/**
 * Dither — a smooth animated plasma pushed through an ordered Bayer 4×4 dither
 * matrix, so the gradient resolves into crisp, retro bands of stippled pixels
 * (think 1-bit displays and old demoscene intros) instead of a soft blur. The
 * gradient ramps between two colours across a handful of quantised tones.
 */
export function Dither({
  className,
  colors = ["13,15,28", "139,160,255"],
  pixelSize = 6,
  speed = 1,
  scale = 1,
  levels = 4,
  contrast = 1,
  children,
  ...props
}: DitherProps) {
  const ref = useCanvas<State>({
    init: () => ({ a: parse(colors[0]), b: parse(colors[1]) }),
    draw: ({ ctx, width, height }, state, time) => {
      const t = time * speed * 0.5;
      const { a, b } = state;
      const px = Math.max(2, Math.round(pixelSize));
      const inv = 1 / (Math.max(0.2, scale) * 220);
      const lv = Math.max(2, Math.round(levels));
      const con = Math.max(0.2, contrast);

      const cols = Math.ceil(width / px);
      const rows = Math.ceil(height / px);

      for (let cy = 0; cy < rows; cy++) {
        const y = cy * px;
        const v = y * inv;
        for (let cx = 0; cx < cols; cx++) {
          const x = cx * px;
          const u = x * inv;

          // Layered plasma → normalised 0..1 field, then contrast around 0.5.
          const raw =
            Math.sin(u * 3 + t) +
            Math.sin(v * 2.4 - t * 0.8) +
            Math.sin((u + v) * 1.8 + t * 0.6) +
            Math.sin(Math.hypot(u - 3, v - 2) * 3 - t);
          let field = raw / 4 + 0.5;
          field = Math.min(1, Math.max(0, (field - 0.5) * con + 0.5));

          // Ordered dithering between the two nearest quantised levels.
          const scaled = field * (lv - 1);
          const thr = BAYER[(cy & 3) * 4 + (cx & 3)];
          let level = Math.floor(scaled) + (scaled - Math.floor(scaled) > thr ? 1 : 0);
          if (level < 0) level = 0;
          else if (level > lv - 1) level = lv - 1;
          const f = level / (lv - 1);

          const r = (a[0] + (b[0] - a[0]) * f) | 0;
          const g = (a[1] + (b[1] - a[1]) * f) | 0;
          const bl = (a[2] + (b[2] - a[2]) * f) | 0;
          ctx.fillStyle = `rgb(${r},${g},${bl})`;
          ctx.fillRect(x, y, px, px);
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
