"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface EqualizerProps extends HTMLAttributes<HTMLDivElement> {
  /** Approximate bar width (incl. gap) in pixels. */
  barWidth?: number;
  /** Top and bottom gradient colors as "r,g,b". */
  colors?: [string, string];
  children?: ReactNode;
}

interface Bar {
  phase: number;
  freq: number;
}

interface State {
  bars: Bar[];
}

export function Equalizer({
  className,
  barWidth = 16,
  colors = ["94,234,255", "139,92,246"],
  children,
  ...props
}: EqualizerProps) {
  const ref = useCanvas<State>({
    init: ({ width }) => {
      const count = Math.max(6, Math.floor(width / barWidth));
      const bars: Bar[] = Array.from({ length: count }, () => ({
        phase: Math.random() * Math.PI * 2,
        freq: 0.8 + Math.random() * 1.8,
      }));
      return { bars };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const count = state.bars.length;
      const bw = width / count;
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, `rgba(${colors[0]},0.9)`);
      grad.addColorStop(1, `rgba(${colors[1]},0.25)`);
      ctx.fillStyle = grad;

      for (let i = 0; i < count; i++) {
        const b = state.bars[i];
        const v =
          (0.5 + 0.5 * Math.sin(t * b.freq + b.phase)) *
          (0.55 + 0.45 * Math.sin(t * 0.5 + i * 0.3));
        const bh = (0.12 + 0.8 * v) * height;
        const x = i * bw + bw * 0.18;
        const w = bw * 0.64;
        const y = height - bh;
        const r = Math.min(w / 2, 4);
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, height);
        ctx.closePath();
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
