"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface InkDropsProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Drop {
  x: number;
  y: number;
  maxR: number;
  life: number;
  max: number;
  delay: number;
  color: string;
}

interface State {
  drops: Drop[];
}

export function InkDrops({
  className,
  count = 14,
  colors = ["139,124,255", "94,234,255", "244,114,182"],
  children,
  ...props
}: InkDropsProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const make = (): Drop => ({
        x: Math.random() * width,
        y: Math.random() * height,
        maxR: 50 + Math.random() * 120,
        life: 0,
        max: 2.5 + Math.random() * 3,
        delay: Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      return { drops: Array.from({ length: count }, make) };
    },
    draw: ({ ctx, width, height }, state, _t, dt) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const d of state.drops) {
        if (d.delay > 0) {
          d.delay -= dt;
          continue;
        }
        d.life += dt;
        const p = d.life / d.max;
        if (p >= 1) {
          d.x = Math.random() * width;
          d.y = Math.random() * height;
          d.maxR = 50 + Math.random() * 120;
          d.life = 0;
          d.max = 2.5 + Math.random() * 3;
          d.delay = Math.random() * 1.5;
          d.color = colors[Math.floor(Math.random() * colors.length)];
          continue;
        }
        const r = d.maxR * (1 - (1 - p) * (1 - p));
        const alpha = Math.sin(p * Math.PI) * 0.45;
        const glow = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r);
        glow.addColorStop(0, `rgba(${d.color},${alpha})`);
        glow.addColorStop(0.6, `rgba(${d.color},${alpha * 0.4})`);
        glow.addColorStop(1, `rgba(${d.color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
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
