"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface StarfieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Approx. stars per 100k px². */
  density?: number;
  /** Star color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface Star {
  x: number;
  y: number;
  z: number; // 0..1 depth → size + speed + twinkle rate
  phase: number;
}

interface State {
  stars: Star[];
  pointer: { x: number; y: number; inside: boolean };
}

export function Starfield({
  className,
  density = 14,
  color = "210,220,255",
  children,
  ...props
}: StarfieldProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const count = Math.max(
        24,
        Math.min(220, Math.round(((width * height) / 100000) * density)),
      );
      const stars: Star[] = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        phase: Math.random() * Math.PI * 2,
      }));
      return { stars, pointer: { x: 0, y: 0, inside: false } };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const px = state.pointer.inside
        ? (state.pointer.x / width - 0.5) * 2
        : 0;
      const py = state.pointer.inside
        ? (state.pointer.y / height - 0.5) * 2
        : 0;

      for (const s of state.stars) {
        s.y += (0.05 + s.z * 0.35) * 0.6;
        if (s.y > height + 2) {
          s.y = -2;
          s.x = Math.random() * width;
        }
        const twinkle = 0.5 + 0.5 * Math.sin(t * (1 + s.z * 2) + s.phase);
        const size = 0.4 + s.z * 1.6;
        const offX = px * s.z * 14;
        const offY = py * s.z * 14;
        ctx.fillStyle = `rgba(${color},${0.25 + twinkle * 0.7 * s.z})`;
        ctx.beginPath();
        ctx.arc(s.x + offX, s.y + offY, size, 0, Math.PI * 2);
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
