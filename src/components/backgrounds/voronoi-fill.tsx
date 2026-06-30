"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface VoronoiFillProps extends HTMLAttributes<HTMLDivElement> {
  seeds?: number;
  /** Grid step in pixels. */
  step?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Seed {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface State {
  seeds: Seed[];
  step: number;
}

export function VoronoiFill({
  className,
  seeds = 13,
  step = 9,
  colors = ["139,92,246", "34,211,238", "244,114,182", "79,70,229", "120,255,180"],
  children,
  ...props
}: VoronoiFillProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => ({
      step,
      seeds: Array.from({ length: seeds }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
    }),
    draw: ({ ctx, width, height }, state) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of state.seeds) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > width) s.vx *= -1;
        if (s.y < 0 || s.y > height) s.vy *= -1;
      }
      const st = state.step;
      for (let y = 0; y < height; y += st) {
        for (let x = 0; x < width; x += st) {
          let m1 = Infinity;
          let m2 = Infinity;
          let color = state.seeds[0].color;
          for (const s of state.seeds) {
            const dx = x - s.x;
            const dy = y - s.y;
            const d = dx * dx + dy * dy;
            if (d < m1) {
              m2 = m1;
              m1 = d;
              color = s.color;
            } else if (d < m2) {
              m2 = d;
            }
          }
          const border = Math.sqrt(m2) - Math.sqrt(m1);
          const edge = border < 6 ? border / 6 : 1;
          ctx.fillStyle = `rgba(${color},${0.45 * edge + 0.05})`;
          ctx.fillRect(x, y, st, st);
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
