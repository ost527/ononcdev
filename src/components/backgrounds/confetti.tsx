"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface ConfettiProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Piece {
  x: number;
  y: number;
  vy: number;
  vx: number;
  rot: number;
  vrot: number;
  w: number;
  h: number;
  seed: number;
  color: string;
}

interface State {
  pieces: Piece[];
}

export function Confetti({
  className,
  count = 130,
  colors = ["139,124,255", "94,234,255", "244,114,182", "250,204,21", "52,211,153"],
  children,
  ...props
}: ConfettiProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const make = (): Piece => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: 1 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.6,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.18,
        w: 4 + Math.random() * 5,
        h: 7 + Math.random() * 7,
        seed: Math.random() * 1000,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      return { pieces: Array.from({ length: count }, make) };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of state.pieces) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 2 + p.seed) * 0.7;
        p.rot += p.vrot;
        if (p.y > height + 14) {
          p.y = -14;
          p.x = Math.random() * width;
        }
        // Flip width by rotation for a fluttering look.
        const sw = p.w * Math.abs(Math.cos(p.rot));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = `rgba(${p.color},0.92)`;
        ctx.fillRect(-sw / 2, -p.h / 2, Math.max(1, sw), p.h);
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
