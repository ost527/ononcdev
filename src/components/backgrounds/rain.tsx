"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface RainProps extends HTMLAttributes<HTMLDivElement> {
  /** Approx. drops per 100k px² (capped). */
  density?: number;
  /** Streak color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface Drop {
  x: number;
  y: number;
  len: number;
  vy: number;
  alpha: number;
}

interface State {
  drops: Drop[];
}

const SLANT = 0.18;

export function Rain({
  className,
  density = 14,
  color = "150,180,255",
  children,
  ...props
}: RainProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const count = Math.max(
        40,
        Math.min(320, Math.round(((width * height) / 100000) * density)),
      );
      const make = (): Drop => {
        const depth = Math.random();
        return {
          x: Math.random() * (width + 80) - 40,
          y: Math.random() * height,
          len: 8 + depth * 18,
          vy: 7 + depth * 11,
          alpha: 0.1 + depth * 0.35,
        };
      };
      return { drops: Array.from({ length: count }, make) };
    },
    draw: ({ ctx, width, height }, state) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      for (const d of state.drops) {
        d.y += d.vy;
        d.x += d.vy * SLANT;
        if (d.y > height + d.len) {
          d.y = -d.len;
          d.x = Math.random() * (width + 80) - 40;
        }
        ctx.strokeStyle = `rgba(${color},${d.alpha})`;
        ctx.lineWidth = d.len > 18 ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * SLANT, d.y - d.len);
        ctx.stroke();
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
