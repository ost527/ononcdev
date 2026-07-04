"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface LiquidChromeProps extends HTMLAttributes<HTMLDivElement> {
  /** Metallic tint as "r,g,b" — the colour of the mid-tones. */
  color?: string;
  /** Flow speed multiplier (0 = frozen). */
  speed?: number;
  /** Pattern scale — higher spreads the flowing bands wider. */
  scale?: number;
  /** Domain-warp strength: how molten and folded the metal looks (0–2). */
  warp?: number;
  /** Overall brightness of the specular highlights (0–1.5). */
  brightness?: number;
  /** Shading cell size in px (smaller = smoother, heavier). */
  detail?: number;
  /** How strongly the cursor drags the molten surface (0–2). */
  pointerWarp?: number;
  children?: ReactNode;
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}
interface State {
  tint: Rgb;
  pointer: { x: number; y: number; inside: boolean };
  ease: { x: number; y: number; k: number };
}

const parse = (value: string): Rgb => {
  const p = value.split(",").map((v) => parseInt(v, 10) || 0);
  return { r: p[0] ?? 0, g: p[1] ?? 0, b: p[2] ?? 0 };
};

/**
 * Liquid Chrome — a sheet of molten, mirror-bright metal. The coordinate space
 * is warped through itself two times (domain warping) to fold smooth gradients
 * into liquid ridges, then a sharpened highlight ramp adds the specular streaks
 * that read as polished chrome. The cursor drags the surface as it moves.
 */
export function LiquidChrome({
  className,
  color = "173,188,214",
  speed = 1,
  scale = 1,
  warp = 1,
  brightness = 1,
  detail = 8,
  pointerWarp = 1,
  children,
  ...props
}: LiquidChromeProps) {
  const ref = useCanvas<State>({
    init: () => ({
      tint: parse(color),
      pointer: { x: -9999, y: -9999, inside: false },
      ease: { x: 0.5, y: 0.5, k: 0 },
    }),
    draw: ({ ctx, width, height }, state, time, dt) => {
      const t = time * speed * 0.4;
      const { ease, pointer, tint } = state;

      const nx = pointer.inside ? pointer.x / Math.max(1, width) : 0.5;
      const ny = pointer.inside ? pointer.y / Math.max(1, height) : 0.5;
      const posLerp = dt > 0 ? Math.min(1, dt * 5) : 1;
      const kLerp = dt > 0 ? Math.min(1, dt * 3) : 1;
      ease.x += (nx - ease.x) * posLerp;
      ease.y += (ny - ease.y) * posLerp;
      ease.k += ((pointer.inside ? 1 : 0) - ease.k) * kLerp;

      const step = Math.max(4, detail);
      const inv = 1 / (Math.max(0.2, scale) * 190);
      const warpAmt = Math.max(0, warp);
      const bri = Math.max(0, brightness);
      const drag = pointerWarp * ease.k;

      for (let y = 0; y < height; y += step) {
        const v = y * inv;
        const py = y / Math.max(1, height);
        for (let x = 0; x < width; x += step) {
          const u = x * inv;
          const px = x / Math.max(1, width);

          let extra = 0;
          if (drag > 0) {
            const dx = px - ease.x;
            const dy = py - ease.y;
            extra = Math.exp(-(dx * dx + dy * dy) * 5) * drag * 2;
          }

          // Two folds of domain warping over the base coordinates.
          const a =
            Math.sin(u * 2 + t) + Math.cos(v * 2 - t * 0.7 + extra);
          const b =
            Math.sin((u + a * warpAmt) * 3 - t * 0.5) +
            Math.cos((v - a * warpAmt) * 3 + t * 0.4);
          const f = Math.sin((u + b * warpAmt) * 4 + t * 0.3 + extra);

          const m = Math.pow(0.5 + 0.5 * f, 0.7); // base metal value
          const spec = Math.pow(m, 7); // narrow mirror highlight
          const lum = 0.1 + 0.7 * m;

          const r = tint.r * lum + 255 * spec;
          const g = tint.g * lum + 255 * spec;
          const bl = tint.b * lum + 255 * spec;

          ctx.fillStyle = `rgb(${Math.min(255, r * bri) | 0},${Math.min(255, g * bri) | 0},${Math.min(255, bl * bri) | 0})`;
          ctx.fillRect(x, y, step + 1, step + 1);
        }
      }
    },
    onPointer: (state, x, y, inside) => {
      state.pointer.x = x;
      state.pointer.y = y;
      state.pointer.inside = inside;
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
