"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface FlowFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Approx. particles per 100k px² (capped). */
  density?: number;
  /** Trail colors as "r,g,b" (cycled per particle). */
  colors?: string[];
  children?: ReactNode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface State {
  ps: Particle[];
  pointer: { x: number; y: number; inside: boolean };
}

export function FlowField({
  className,
  density = 6,
  colors = ["139,124,255", "94,234,255", "244,114,182"],
  children,
  ...props
}: FlowFieldProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const count = Math.max(
        80,
        Math.min(460, Math.round(((width * height) / 100000) * density * 10)),
      );
      const spawn = (): Particle => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        life: 60 + Math.random() * 240,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      return {
        ps: Array.from({ length: count }, spawn),
        pointer: { x: 0, y: 0, inside: false },
      };
    },
    draw: ({ ctx, width, height }, state, t) => {
      // Fade prior frame for silky trails (instead of clearing).
      ctx.fillStyle = "rgba(6,7,13,0.07)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1.1;

      const { ps, pointer } = state;
      for (const p of ps) {
        // Flow angle from layered sine "noise".
        const angle =
          (Math.sin(p.x * 0.0022 + t * 0.25) +
            Math.sin(p.y * 0.0027 - t * 0.2) +
            Math.sin((p.x + p.y) * 0.0016 + t * 0.12)) *
          Math.PI;
        p.vx += Math.cos(angle) * 0.08;
        p.vy += Math.sin(angle) * 0.08;

        if (pointer.inside) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 160 * 160 && d2 > 1) {
            const f = 22 / d2;
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }

        p.vx *= 0.93;
        p.vy *= 0.93;
        const nx = p.x + p.vx;
        const ny = p.y + p.vy;

        ctx.strokeStyle = `rgba(${p.color},0.5)`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        p.life -= 1;
        if (
          p.life <= 0 ||
          p.x < -20 ||
          p.x > width + 20 ||
          p.y < -20 ||
          p.y > height + 20
        ) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.vx = 0;
          p.vy = 0;
          p.life = 60 + Math.random() * 240;
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
