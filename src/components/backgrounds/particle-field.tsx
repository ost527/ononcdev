"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface ParticleFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Approx. particles per 100k px². Higher = denser. */
  density?: number;
  /** Max distance (px) at which particles link. */
  linkDistance?: number;
  /** Particle + link color. */
  color?: string;
  children?: ReactNode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface State {
  ps: Particle[];
  pointer: { x: number; y: number; inside: boolean };
}

export function ParticleField({
  className,
  density = 9,
  linkDistance = 130,
  color = "139,160,255",
  children,
  ...props
}: ParticleFieldProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const target = Math.round((width * height) / 100000 * density);
      const count = Math.max(16, Math.min(120, target));
      const ps: Particle[] = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.7,
      }));
      return { ps, pointer: { x: -9999, y: -9999, inside: false } };
    },
    draw: ({ ctx, width, height }, state) => {
      ctx.clearRect(0, 0, width, height);
      const { ps, pointer } = state;

      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        if (pointer.inside) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 150 * 150 && d2 > 0.01) {
            const f = 0.02 / Math.sqrt(d2);
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }
        // gentle damping keeps drift bounded
        p.vx *= 0.992;
        p.vy *= 0.992;
      }

      // links between nearby particles
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i];
          const b = ps[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.5;
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // links to the cursor
      if (pointer.inside) {
        for (const p of ps) {
          const dist = Math.hypot(pointer.x - p.x, pointer.y - p.y);
          if (dist < linkDistance * 1.4) {
            const alpha = (1 - dist / (linkDistance * 1.4)) * 0.6;
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      for (const p of ps) {
        ctx.fillStyle = `rgba(${color},0.9)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
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
