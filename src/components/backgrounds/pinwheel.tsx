"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface PinwheelProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of sectors (blades). */
  sectors?: number;
  colors?: string[];
  children?: ReactNode;
}

interface State {
  sectors: number;
}

export function Pinwheel({
  className,
  sectors = 14,
  colors = ["139,92,246", "34,211,238", "244,114,182", "79,70,229"],
  children,
  ...props
}: PinwheelProps) {
  const ref = useCanvas<State>({
    init: () => ({ sectors }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.hypot(width, height);
      const step = (Math.PI * 2) / state.sectors;
      const rot = t * 0.3;

      for (let k = 0; k < state.sectors; k++) {
        const a0 = rot + k * step;
        const color = colors[k % colors.length];
        const alpha = k % 2 === 0 ? 0.3 : 0.12;
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, a0, a0 + step);
        ctx.closePath();
        ctx.fill();
      }

      // Edge vignette + center glow.
      const vg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.6);
      vg.addColorStop(0, "rgba(6,7,13,0.1)");
      vg.addColorStop(0.55, "rgba(6,7,13,0)");
      vg.addColorStop(1, "rgba(6,7,13,0.65)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      core.addColorStop(0, "rgba(255,255,255,0.18)");
      core.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fill();
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
