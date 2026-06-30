"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface SnowfallProps extends HTMLAttributes<HTMLDivElement> {
  /** Approx. flakes per 100k px² (capped). */
  density?: number;
  children?: ReactNode;
}

interface Flake {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  phase: number;
}

interface State {
  flakes: Flake[];
}

export function Snowfall({
  className,
  density = 9,
  children,
  ...props
}: SnowfallProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const count = Math.max(
        30,
        Math.min(220, Math.round(((width * height) / 100000) * density)),
      );
      const flakes: Flake[] = Array.from({ length: count }, () => {
        const r = 0.8 + Math.random() * 2.8;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          vy: 0.3 + r * 0.35,
          sway: 0.3 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
        };
      });
      return { flakes };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      for (const f of state.flakes) {
        f.y += f.vy;
        f.x += Math.sin(t * 0.8 + f.phase) * f.sway;
        if (f.y > height + 4) {
          f.y = -4;
          f.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(235,240,255,${0.35 + f.r * 0.14})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
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
