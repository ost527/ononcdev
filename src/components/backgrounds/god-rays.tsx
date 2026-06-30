"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface GodRaysProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of light shafts. */
  rays?: number;
  /** Ray color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface State {
  rays: number;
}

export function GodRays({
  className,
  rays = 26,
  color = "150,200,255",
  children,
  ...props
}: GodRaysProps) {
  const ref = useCanvas<State>({
    init: () => ({ rays }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const sx = width * (0.5 + 0.32 * Math.sin(t * 0.15));
      const sy = height * 0.18;
      const maxLen = Math.hypot(width, height) * 1.1;
      ctx.globalCompositeOperation = "lighter";

      const half = (Math.PI * 2) / state.rays / 2.4;
      for (let k = 0; k < state.rays; k++) {
        const a = t * 0.05 + (k * (Math.PI * 2)) / state.rays;
        const intensity = 0.5 + 0.5 * Math.sin(t * 1.4 + k * 1.3);
        const ex = sx + Math.cos(a) * maxLen;
        const ey = sy + Math.sin(a) * maxLen;
        const grad = ctx.createLinearGradient(sx, sy, ex, ey);
        grad.addColorStop(0, `rgba(${color},${0.12 * intensity})`);
        grad.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(a - half) * maxLen, sy + Math.sin(a - half) * maxLen);
        ctx.lineTo(sx + Math.cos(a + half) * maxLen, sy + Math.sin(a + half) * maxLen);
        ctx.closePath();
        ctx.fill();
      }

      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 90);
      glow.addColorStop(0, `rgba(${color},0.5)`);
      glow.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(sx, sy, 90, 0, Math.PI * 2);
      ctx.fill();
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
