"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface BallpitProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of balls. */
  count?: number;
  /** Downward gravity strength (0 = weightless). */
  gravity?: number;
  /** Bounciness of walls + collisions (0 = dead, 1 = elastic). */
  bounce?: number;
  /** Base ball radius in px. */
  size?: number;
  /** How hard the cursor shoves nearby balls. */
  pointerForce?: number;
  /** Ball colors as "r,g,b". */
  colors?: string[];
  /** Glossy top-lit shading strength (0–1). */
  gloss?: number;
  children?: ReactNode;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}
interface State {
  balls: Ball[];
  pointer: { x: number; y: number; inside: boolean };
}

const shade = (rgb: string, f: number) => {
  const [r, g, b] = rgb.split(",").map((v) => parseInt(v, 10) || 0);
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n * f)));
  return `${c(r)},${c(g)},${c(b)}`;
};

/**
 * Ballpit — a pit of colorful balls under gravity that bounce off the walls and
 * each other, and scatter away from the cursor. Equal-mass elastic collisions
 * are resolved pairwise (count is capped to keep the O(n²) pass cheap).
 */
export function Ballpit({
  className,
  count = 40,
  gravity = 1,
  bounce = 0.75,
  size = 18,
  pointerForce = 1,
  colors = ["139,92,246", "34,211,238", "244,114,182"],
  gloss = 0.7,
  children,
  ...props
}: BallpitProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const palette = colors.length ? colors : ["139,92,246"];
      const n = Math.max(1, Math.min(80, Math.round(count)));
      const balls: Ball[] = Array.from({ length: n }, () => {
        const r = size * (0.7 + Math.random() * 0.7);
        return {
          x: r + Math.random() * Math.max(1, width - 2 * r),
          y: r + Math.random() * Math.max(1, height - 2 * r),
          vx: (Math.random() - 0.5) * 120,
          vy: (Math.random() - 0.5) * 120,
          r,
          color: palette[(Math.random() * palette.length) | 0],
        };
      });
      return { balls, pointer: { x: -9999, y: -9999, inside: false } };
    },
    draw: ({ ctx, width, height }, state, _t, dt) => {
      ctx.clearRect(0, 0, width, height);
      const { balls, pointer } = state;
      const step = Math.min(0.05, dt || 0.016);
      const g = gravity * 620;
      const repelR = 130;

      for (const b of balls) {
        b.vy += g * step;

        // Cursor shoves nearby balls outward.
        if (pointer.inside) {
          const dx = b.x - pointer.x;
          const dy = b.y - pointer.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < repelR) {
            const f = (1 - d / repelR) * pointerForce * 1800 * step;
            b.vx += (dx / d) * f;
            b.vy += (dy / d) * f;
          }
        }

        b.x += b.vx * step;
        b.y += b.vy * step;
        b.vx *= 0.999; // faint air drag so the pit settles

        // Walls.
        if (b.x < b.r) {
          b.x = b.r;
          b.vx = Math.abs(b.vx) * bounce;
        } else if (b.x > width - b.r) {
          b.x = width - b.r;
          b.vx = -Math.abs(b.vx) * bounce;
        }
        if (b.y < b.r) {
          b.y = b.r;
          b.vy = Math.abs(b.vy) * bounce;
        } else if (b.y > height - b.r) {
          b.y = height - b.r;
          b.vy = -Math.abs(b.vy) * bounce;
        }
      }

      // Pairwise collisions (equal mass).
      for (let i = 0; i < balls.length; i++) {
        const a = balls[i];
        for (let j = i + 1; j < balls.length; j++) {
          const b = balls[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const min = a.r + b.r;
          if (dist < min) {
            const nx = dx / dist;
            const ny = dy / dist;
            const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            if (rel < 0) {
              const imp = (-(1 + bounce) * rel) / 2;
              a.vx -= imp * nx;
              a.vy -= imp * ny;
              b.vx += imp * nx;
              b.vy += imp * ny;
            }
            const push = (min - dist) / 2;
            a.x -= nx * push;
            a.y -= ny * push;
            b.x += nx * push;
            b.y += ny * push;
          }
        }
      }

      // Render glossy spheres.
      for (const b of balls) {
        const grad = ctx.createRadialGradient(
          b.x - b.r * 0.35,
          b.y - b.r * 0.4,
          b.r * 0.1,
          b.x,
          b.y,
          b.r,
        );
        grad.addColorStop(0, `rgb(${shade(b.color, 1 + 0.85 * gloss)})`);
        grad.addColorStop(0.5, `rgb(${b.color})`);
        grad.addColorStop(1, `rgb(${shade(b.color, 0.55)})`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
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
