"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface WarpStarsProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  color?: string;
  children?: ReactNode;
}

interface Star {
  angle: number;
  r: number;
  speed: number;
}

interface State {
  stars: Star[];
}

export function WarpStars({
  className,
  count = 150,
  color = "200,214,255",
  children,
  ...props
}: WarpStarsProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const maxR = Math.hypot(width, height) / 2;
      const stars: Star[] = Array.from({ length: count }, () => ({
        angle: Math.random() * Math.PI * 2,
        r: Math.random() * maxR,
        speed: 0.6 + Math.random() * 1.6,
      }));
      return { stars };
    },
    draw: ({ ctx, width, height }, state) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.hypot(width, height) / 2;
      ctx.globalCompositeOperation = "lighter";

      for (const s of state.stars) {
        const oldR = s.r;
        s.r += s.speed * (s.r * 0.02 + 0.6);
        const cos = Math.cos(s.angle);
        const sin = Math.sin(s.angle);
        const alpha = Math.min(1, s.r / (maxR * 0.55));
        ctx.strokeStyle = `rgba(${color},${alpha * 0.9})`;
        ctx.lineWidth = Math.min(2.6, 0.4 + alpha * 2.4);
        ctx.beginPath();
        ctx.moveTo(cx + cos * oldR, cy + sin * oldR);
        ctx.lineTo(cx + cos * s.r, cy + sin * s.r);
        ctx.stroke();

        if (s.r > maxR) {
          s.r = Math.random() * 24;
          s.angle = Math.random() * Math.PI * 2;
          s.speed = 0.6 + Math.random() * 1.6;
        }
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
