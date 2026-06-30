"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface FireworksProps extends HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  children?: ReactNode;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  burstY: number;
  color: string;
}

interface State {
  rockets: Rocket[];
  sparks: Spark[];
  timer: number;
}

export function Fireworks({
  className,
  colors = ["139,124,255", "94,234,255", "244,114,182", "250,204,21", "120,255,180"],
  children,
  ...props
}: FireworksProps) {
  const ref = useCanvas<State>({
    init: () => ({ rockets: [], sparks: [], timer: 0.3 }),
    draw: ({ ctx, width, height }, state, _t, dt) => {
      ctx.fillStyle = "rgba(6,7,13,0.2)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      state.timer -= dt;
      if (state.timer <= 0) {
        state.rockets.push({
          x: width * (0.15 + Math.random() * 0.7),
          y: height,
          vy: -(height * 0.55 + Math.random() * height * 0.2),
          burstY: height * (0.12 + Math.random() * 0.4),
          color: colors[Math.floor(Math.random() * colors.length)],
        });
        state.timer = 0.5 + Math.random() * 1.1;
      }

      for (const r of state.rockets) {
        r.y += r.vy * dt;
        ctx.fillStyle = `rgba(${r.color},0.9)`;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();
        if (r.y <= r.burstY) {
          const n = 44 + Math.floor(Math.random() * 28);
          for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2;
            const sp = 50 + Math.random() * 150;
            state.sparks.push({
              x: r.x,
              y: r.y,
              vx: Math.cos(a) * sp,
              vy: Math.sin(a) * sp,
              life: 1 + Math.random() * 0.8,
              max: 1.8,
              color: r.color,
            });
          }
        }
      }
      state.rockets = state.rockets.filter((r) => r.y > r.burstY);

      for (const s of state.sparks) {
        s.vy += 80 * dt;
        s.vx *= 0.985;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.life -= dt;
        const a = Math.max(0, s.life / s.max);
        ctx.fillStyle = `rgba(${s.color},${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      state.sparks = state.sparks.filter((s) => s.life > 0);
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
