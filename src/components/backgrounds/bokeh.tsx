"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface BokehProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Orb {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

interface State {
  orbs: Orb[];
}

export function Bokeh({
  className,
  count = 22,
  colors = ["139,124,255", "94,234,255", "244,114,182"],
  children,
  ...props
}: BokehProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const orbs: Orb[] = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 16 + Math.random() * 64,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: 0.06 + Math.random() * 0.12,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      return { orbs };
    },
    draw: ({ ctx, width, height }, state) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const o of state.orbs) {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r) o.x = width + o.r;
        if (o.x > width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = height + o.r;
        if (o.y > height + o.r) o.y = -o.r;

        const glow = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        glow.addColorStop(0, `rgba(${o.color},${o.alpha})`);
        glow.addColorStop(0.7, `rgba(${o.color},${o.alpha * 0.5})`);
        glow.addColorStop(1, `rgba(${o.color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
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
