"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface WaveInterferenceProps extends HTMLAttributes<HTMLDivElement> {
  /** Dot grid spacing in pixels. */
  gap?: number;
  /** Dot color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface State {
  gap: number;
}

export function WaveInterference({
  className,
  gap = 18,
  color = "120,180,255",
  children,
  ...props
}: WaveInterferenceProps) {
  const ref = useCanvas<State>({
    init: () => ({ gap }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const g = state.gap;

      // Three slowly orbiting wave sources.
      const sources = [
        [width * (0.5 + 0.34 * Math.sin(t * 0.3)), height * (0.5 + 0.34 * Math.cos(t * 0.26))],
        [width * (0.5 + 0.32 * Math.sin(t * 0.22 + 2)), height * (0.5 + 0.3 * Math.cos(t * 0.34 + 1))],
        [width * (0.5 + 0.3 * Math.cos(t * 0.28 + 4)), height * (0.5 + 0.33 * Math.sin(t * 0.24 + 3))],
      ] as const;

      for (let y = g / 2; y < height; y += g) {
        for (let x = g / 2; x < width; x += g) {
          let v = 0;
          for (const [sx, sy] of sources) {
            v += Math.sin(Math.hypot(x - sx, y - sy) * 0.045 - t * 2.2);
          }
          const b = (v / sources.length + 1) / 2; // 0..1
          const r = 0.6 + b * b * 2.6;
          ctx.fillStyle = `rgba(${color},${0.08 + b * b * 0.6})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
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
