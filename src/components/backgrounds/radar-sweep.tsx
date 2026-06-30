"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface RadarSweepProps extends HTMLAttributes<HTMLDivElement> {
  /** Sweep color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface Blip {
  angle: number;
  dist: number;
}
interface State {
  blips: Blip[];
}

const TAU = Math.PI * 2;

export function RadarSweep({
  className,
  color = "94,234,255",
  children,
  ...props
}: RadarSweepProps) {
  const ref = useCanvas<State>({
    init: () => ({
      blips: Array.from({ length: 7 }, () => ({
        angle: Math.random() * TAU,
        dist: 0.25 + Math.random() * 0.7,
      })),
    }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.min(width, height) * 0.48;

      // Concentric rings + crosshair.
      ctx.strokeStyle = `rgba(${color},0.16)`;
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (maxR * i) / 4, 0, TAU);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.stroke();

      const sweep = (t * 0.9) % TAU;

      // Fading trailing wedge.
      const steps = 16;
      for (let k = 0; k < steps; k++) {
        const a = sweep - k * 0.055;
        ctx.fillStyle = `rgba(${color},${(1 - k / steps) * 0.12})`;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, a - 0.06, a);
        ctx.closePath();
        ctx.fill();
      }
      // Leading edge.
      ctx.strokeStyle = `rgba(${color},0.7)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweep) * maxR, cy + Math.sin(sweep) * maxR);
      ctx.stroke();

      // Blips light up as the sweep passes.
      for (const b of state.blips) {
        const diff = (sweep - b.angle + TAU) % TAU;
        const bright = Math.max(0, 1 - diff / 0.9);
        if (bright <= 0.02) continue;
        const x = cx + Math.cos(b.angle) * maxR * b.dist;
        const y = cy + Math.sin(b.angle) * maxR * b.dist;
        ctx.fillStyle = `rgba(${color},${bright})`;
        ctx.beginPath();
        ctx.arc(x, y, 2 + bright * 2.5, 0, TAU);
        ctx.fill();
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
