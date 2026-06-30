"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface FirefliesProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Fly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  color: string;
}

interface State {
  flies: Fly[];
}

export function Fireflies({
  className,
  count = 48,
  colors = ["190,255,150", "255,224,130", "150,234,255"],
  children,
  ...props
}: FirefliesProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const flies: Fly[] = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      return { flies };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const f of state.flies) {
        f.vx += (Math.random() - 0.5) * 0.06;
        f.vy += (Math.random() - 0.5) * 0.06;
        f.vx = Math.max(-0.7, Math.min(0.7, f.vx));
        f.vy = Math.max(-0.7, Math.min(0.7, f.vy));
        f.x += f.vx;
        f.y += f.vy;
        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        const blink = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 2.2 + f.phase));
        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 6);
        glow.addColorStop(0, `rgba(${f.color},${blink})`);
        glow.addColorStop(1, `rgba(${f.color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 6, 0, Math.PI * 2);
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
