"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface SmokeProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  /** Fog color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface Puff {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  alpha: number;
}

interface State {
  puffs: Puff[];
}

export function Smoke({
  className,
  count = 16,
  color = "150,160,190",
  children,
  ...props
}: SmokeProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const puffs: Puff[] = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 70 + Math.random() * 120,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.15 + Math.random() * 0.4),
        phase: Math.random() * Math.PI * 2,
        alpha: 0.03 + Math.random() * 0.06,
      }));
      return { puffs };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const p of state.puffs) {
        p.x += p.vx + Math.sin(t * 0.3 + p.phase) * 0.3;
        p.y += p.vy;
        if (p.y < -p.r) {
          p.y = height + p.r;
          p.x = Math.random() * width;
        }
        const r = p.r * (0.9 + 0.1 * Math.sin(t * 0.5 + p.phase));
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        glow.addColorStop(0, `rgba(${color},${p.alpha})`);
        glow.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
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
