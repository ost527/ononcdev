"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface BubblesProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  /** Bubble color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface Bubble {
  x: number;
  y: number;
  r: number;
  vy: number;
  wob: number;
  phase: number;
}

interface State {
  bubbles: Bubble[];
}

export function Bubbles({
  className,
  count = 28,
  color = "150,220,255",
  children,
  ...props
}: BubblesProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const make = (seeded: boolean): Bubble => {
        const r = 6 + Math.random() * 26;
        return {
          x: Math.random() * width,
          y: seeded ? Math.random() * height : height + r + Math.random() * 40,
          r,
          vy: 0.4 + (30 - r) * 0.03 + Math.random() * 0.5,
          wob: 0.4 + Math.random() * 1.1,
          phase: Math.random() * Math.PI * 2,
        };
      };
      return { bubbles: Array.from({ length: count }, () => make(true)) };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      for (const b of state.bubbles) {
        b.y -= b.vy;
        b.x += Math.sin(t * 1.2 + b.phase) * b.wob;
        if (b.y < -b.r - 4) {
          b.y = height + b.r + 4;
          b.x = Math.random() * width;
        }

        const fill = ctx.createRadialGradient(
          b.x - b.r * 0.3,
          b.y - b.r * 0.3,
          0,
          b.x,
          b.y,
          b.r,
        );
        fill.addColorStop(0, `rgba(${color},0.10)`);
        fill.addColorStop(1, `rgba(${color},0.02)`);
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(${color},0.45)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Specular highlight.
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.28, Math.PI * 1.1, Math.PI * 1.7);
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
