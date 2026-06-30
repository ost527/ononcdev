"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface TopographicLinesProps extends HTMLAttributes<HTMLDivElement> {
  /** Vertical gap between contour lines in pixels. */
  gap?: number;
  /** Line color as "r,g,b". */
  color?: string;
  /** Accent color (every 5th line) as "r,g,b". */
  accent?: string;
  children?: ReactNode;
}

interface State {
  gap: number;
}

export function TopographicLines({
  className,
  gap = 26,
  color = "150,160,255",
  accent = "94,234,255",
  children,
  ...props
}: TopographicLinesProps) {
  const ref = useCanvas<State>({
    init: () => ({ gap }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.2;

      const lines = Math.ceil(height / state.gap) + 2;
      for (let i = 0; i < lines; i++) {
        const baseY = i * state.gap;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const f =
            Math.sin(x * 0.006 + baseY * 0.01 + t * 0.3) * 18 +
            Math.sin(x * 0.003 - baseY * 0.014 - t * 0.22) * 14 +
            Math.sin(x * 0.011 + baseY * 0.006 + t * 0.15) * 6;
          const y = baseY + f;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const isAccent = i % 5 === 0;
        ctx.strokeStyle = isAccent
          ? `rgba(${accent},0.32)`
          : `rgba(${color},0.16)`;
        ctx.stroke();
      }

      // Soft vignette for depth.
      const vg = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7,
      );
      vg.addColorStop(0, "rgba(6,7,13,0)");
      vg.addColorStop(1, "rgba(6,7,13,0.6)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);
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
