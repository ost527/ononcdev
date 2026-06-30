"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface VortexProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of orbiting particles. */
  count?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface State {
  ps: Particle[];
  pointer: { x: number; y: number; inside: boolean };
}

export function Vortex({
  className,
  count = 240,
  colors = ["139,124,255", "94,234,255", "244,114,182"],
  children,
  ...props
}: VortexProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const ps: Particle[] = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      return { ps, pointer: { x: 0, y: 0, inside: false } };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.fillStyle = "rgba(6,7,13,0.09)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1.1;

      const cx = state.pointer.inside
        ? state.pointer.x
        : width / 2 + Math.sin(t * 0.2) * width * 0.12;
      const cy = state.pointer.inside
        ? state.pointer.y
        : height / 2 + Math.cos(t * 0.24) * height * 0.12;
      const maxR = Math.hypot(width, height) * 0.6;

      for (const p of state.ps) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const r = Math.hypot(dx, dy) || 0.001;
        // Tangential (swirl) + gentle radial correction toward a mid band.
        const tx = -dy / r;
        const ty = dx / r;
        const swirl = 1.7;
        p.vx += tx * swirl * 0.12;
        p.vy += ty * swirl * 0.12;
        const pull = (r - height * 0.32) * 0.0006;
        p.vx -= (dx / r) * pull * 40;
        p.vy -= (dy / r) * pull * 40;
        p.vx *= 0.95;
        p.vy *= 0.95;

        const nx = p.x + p.vx;
        const ny = p.y + p.vy;
        ctx.strokeStyle = `rgba(${p.color},0.55)`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;

        if (r > maxR) {
          const a = Math.random() * Math.PI * 2;
          const rr = height * (0.2 + Math.random() * 0.25);
          p.x = cx + Math.cos(a) * rr;
          p.y = cy + Math.sin(a) * rr;
          p.vx = 0;
          p.vy = 0;
        }
      }
      ctx.globalCompositeOperation = "source-over";
    },
    onPointer: (state, x, y, inside) => {
      state.pointer.x = x;
      state.pointer.y = y;
      state.pointer.inside = inside;
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
