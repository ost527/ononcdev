"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface TronTrailsProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of moving heads. */
  heads?: number;
  /** Grid cell size in pixels. */
  cell?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Head {
  x: number;
  y: number;
  dir: number;
  since: number;
  color: string;
}

interface State {
  heads: Head[];
  cell: number;
}

const DIRS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export function TronTrails({
  className,
  heads = 7,
  cell = 22,
  colors = ["94,234,255", "139,124,255", "244,114,182"],
  children,
  ...props
}: TronTrailsProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const make = (): Head => ({
        x: Math.floor((Math.random() * width) / cell) * cell,
        y: Math.floor((Math.random() * height) / cell) * cell,
        dir: Math.floor(Math.random() * 4),
        since: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      return { heads: Array.from({ length: heads }, make), cell };
    },
    draw: ({ ctx, width, height }, state, _t, dt) => {
      // Fade prior frame so trails linger then die.
      ctx.fillStyle = "rgba(6,7,13,0.06)";
      ctx.fillRect(0, 0, width, height);

      const speed = 90;
      const move = Math.min(state.cell, speed * dt);
      ctx.globalCompositeOperation = "lighter";
      for (const h of state.heads) {
        const [dx, dy] = DIRS[h.dir];
        h.x += dx * move;
        h.y += dy * move;
        h.since += move;

        if (h.since >= state.cell) {
          h.since = 0;
          h.x = Math.round(h.x / state.cell) * state.cell;
          h.y = Math.round(h.y / state.cell) * state.cell;
          if (Math.random() < 0.4) {
            h.dir = (h.dir + (Math.random() < 0.5 ? 1 : 3)) % 4;
          }
        }

        if (h.x < -4) h.x = width;
        if (h.x > width + 4) h.x = 0;
        if (h.y < -4) h.y = height;
        if (h.y > height + 4) h.y = 0;

        ctx.fillStyle = `rgba(${h.color},0.9)`;
        ctx.fillRect(h.x - 1.5, h.y - 1.5, 3, 3);
      }
      ctx.globalCompositeOperation = "source-over";
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
