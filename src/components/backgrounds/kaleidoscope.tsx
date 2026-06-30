"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface KaleidoscopeProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of mirrored segments. */
  segments?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Petal {
  baseDist: number;
  baseAng: number;
  r: number;
  s1: number;
  s2: number;
  color: string;
}

interface State {
  petals: Petal[];
}

export function Kaleidoscope({
  className,
  segments = 10,
  colors = ["139,124,255", "94,234,255", "244,114,182"],
  children,
  ...props
}: KaleidoscopeProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const maxR = Math.min(width, height) * 0.5;
      const petals: Petal[] = Array.from({ length: 5 }, () => ({
        baseDist: maxR * (0.2 + Math.random() * 0.7),
        baseAng: Math.random() * (Math.PI / segments),
        r: 10 + Math.random() * 26,
        s1: 0.4 + Math.random() * 0.9,
        s2: 0.3 + Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      return { petals };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const wedge = (Math.PI * 2) / segments;
      ctx.globalCompositeOperation = "lighter";

      for (let seg = 0; seg < segments; seg++) {
        for (const mirror of [1, -1]) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(seg * wedge);
          ctx.scale(1, mirror);
          for (const p of state.petals) {
            const ang = p.baseAng + Math.sin(t * p.s1) * 0.18;
            const dist = p.baseDist + Math.sin(t * p.s2) * 24;
            const x = Math.cos(ang) * dist;
            const y = Math.sin(ang) * dist;
            const glow = ctx.createRadialGradient(x, y, 0, x, y, p.r);
            glow.addColorStop(0, `rgba(${p.color},0.5)`);
            glow.addColorStop(1, `rgba(${p.color},0)`);
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(x, y, p.r, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
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
