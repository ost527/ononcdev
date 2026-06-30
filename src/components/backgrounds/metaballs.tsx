"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface MetaballsProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  colors?: string[];
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
}

export function Metaballs({
  className,
  count = 8,
  colors = ["139,92,246", "34,211,238", "244,114,182"],
  children,
  ...props
}: MetaballsProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const balls: Ball[] = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        r: 60 + Math.random() * 90,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      return { balls };
    },
    draw: ({ ctx, width, height }, state) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const b of state.balls) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r * 0.5 || b.x > width + b.r * 0.5) b.vx *= -1;
        if (b.y < -b.r * 0.5 || b.y > height + b.r * 0.5) b.vy *= -1;

        const glow = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        glow.addColorStop(0, `rgba(${b.color},0.5)`);
        glow.addColorStop(0.5, `rgba(${b.color},0.18)`);
        glow.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
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
      <canvas ref={ref} className="absolute inset-0 -z-10 h-full w-full blur-[6px]" />
      {children}
    </div>
  );
}
