"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface CellsProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of Voronoi seeds. */
  seeds?: number;
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
}

export function Cells({
  className,
  seeds = 11,
  colors = ["139,124,255", "94,234,255", "244,114,182"],
  children,
  ...props
}: CellsProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => ({
      seeds: Array.from({ length: seeds }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
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

      const step = 8;
      const edge = 9;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          let m1 = Infinity;
          let m2 = Infinity;
          let nearest = state.seeds[0];
          for (const s of state.seeds) {
            const dx = x - s.x;
            const dy = y - s.y;
            const d = dx * dx + dy * dy;
            if (d < m1) {
              m2 = m1;
              m1 = d;
              nearest = s;
            } else if (d < m2) {
              m2 = d;
            }
          }
          const border = Math.sqrt(m2) - Math.sqrt(m1);
          if (border < edge) {
            const a = (1 - border / edge) * 0.7;
            ctx.fillStyle = `rgba(${nearest.color},${a})`;
            ctx.fillRect(x, y, step - 1, step - 1);
          }
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
