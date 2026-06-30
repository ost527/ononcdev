"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface CometsProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hist: [number, number][];
  color: string;
}

interface State {
  comets: Comet[];
}

export function Comets({
  className,
  count = 4,
  colors = ["196,181,253", "94,234,255", "244,114,182"],
  children,
  ...props
}: CometsProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const spawn = (): Comet => {
        const fromLeft = Math.random() > 0.5;
        const speed = 120 + Math.random() * 120;
        const ang = (fromLeft ? 0.2 : Math.PI - 0.2) + (Math.random() - 0.5) * 0.5;
        return {
          x: fromLeft ? -40 : width + 40,
          y: Math.random() * height * 0.6,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          hist: [],
          color: colors[Math.floor(Math.random() * colors.length)],
        };
      };
      return { comets: Array.from({ length: count }, spawn) };
    },
    draw: ({ ctx, width, height }, state, _t, dt) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      for (const c of state.comets) {
        // Gentle curve: rotate velocity slightly.
        const cosr = Math.cos(0.6 * dt);
        const sinr = Math.sin(0.6 * dt);
        const nvx = c.vx * cosr - c.vy * sinr;
        const nvy = c.vx * sinr + c.vy * cosr;
        c.vx = nvx;
        c.vy = nvy;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        c.hist.push([c.x, c.y]);
        if (c.hist.length > 28) c.hist.shift();

        for (let i = 1; i < c.hist.length; i++) {
          const a = i / c.hist.length;
          ctx.strokeStyle = `rgba(${c.color},${a * 0.7})`;
          ctx.lineWidth = a * 3;
          ctx.beginPath();
          ctx.moveTo(c.hist[i - 1][0], c.hist[i - 1][1]);
          ctx.lineTo(c.hist[i][0], c.hist[i][1]);
          ctx.stroke();
        }
        const glow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 8);
        glow.addColorStop(0, `rgba(${c.color},1)`);
        glow.addColorStop(1, `rgba(${c.color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
        ctx.fill();

        if (c.x < -60 || c.x > width + 60 || c.y < -60 || c.y > height + 60) {
          const fromLeft = Math.random() > 0.5;
          const speed = 120 + Math.random() * 120;
          const ang = (fromLeft ? 0.2 : Math.PI - 0.2) + (Math.random() - 0.5) * 0.5;
          c.x = fromLeft ? -40 : width + 40;
          c.y = Math.random() * height * 0.6;
          c.vx = Math.cos(ang) * speed;
          c.vy = Math.sin(ang) * speed;
          c.hist = [];
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
