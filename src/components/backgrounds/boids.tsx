"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface BoidsProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  color?: string;
  children?: ReactNode;
}

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface State {
  boids: Boid[];
}

export function Boids({
  className,
  count = 60,
  color = "150,180,255",
  children,
  ...props
}: BoidsProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const boids: Boid[] = Array.from({ length: count }, () => {
        const a = Math.random() * Math.PI * 2;
        const sp = 60 + Math.random() * 40;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
        };
      });
      return { boids };
    },
    draw: ({ ctx, width, height }, state, _t, dt) => {
      ctx.clearRect(0, 0, width, height);
      const boids = state.boids;
      const R = 56;
      const sepR = 24;
      const maxSpeed = 110;
      const minSpeed = 50;

      for (const b of boids) {
        let ax = 0;
        let ay = 0;
        let cx = 0;
        let cy = 0;
        let sx = 0;
        let sy = 0;
        let n = 0;
        for (const o of boids) {
          if (o === b) continue;
          const dx = o.x - b.x;
          const dy = o.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            ax += o.vx;
            ay += o.vy;
            cx += o.x;
            cy += o.y;
            n++;
            if (d2 < sepR * sepR && d2 > 0.01) {
              sx -= dx / d2;
              sy -= dy / d2;
            }
          }
        }
        if (n > 0) {
          b.vx += (ax / n - b.vx) * 0.04;
          b.vy += (ay / n - b.vy) * 0.04;
          b.vx += (cx / n - b.x) * 0.0008;
          b.vy += (cy / n - b.y) * 0.0008;
        }
        b.vx += sx * 600;
        b.vy += sy * 600;

        const sp = Math.hypot(b.vx, b.vy) || 1;
        const clamped = Math.max(minSpeed, Math.min(maxSpeed, sp));
        b.vx = (b.vx / sp) * clamped;
        b.vy = (b.vy / sp) * clamped;

        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.x < 0) b.x += width;
        if (b.x > width) b.x -= width;
        if (b.y < 0) b.y += height;
        if (b.y > height) b.y -= height;

        const ang = Math.atan2(b.vy, b.vx);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(ang);
        ctx.fillStyle = `rgba(${color},0.8)`;
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(-4, 3);
        ctx.lineTo(-4, -3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
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
