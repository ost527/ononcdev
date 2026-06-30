"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface ScanlinesProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of glitch bands. */
  bands?: number;
  children?: ReactNode;
}

interface Band {
  y: number;
  h: number;
  speed: number;
  amp: number;
  seed: number;
  color: string;
}

interface State {
  bands: Band[];
}

export function Scanlines({
  className,
  bands = 5,
  children,
  ...props
}: ScanlinesProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const palette = ["94,234,255", "244,114,182", "139,124,255"];
      return {
        bands: Array.from({ length: bands }, () => ({
          y: Math.random() * height,
          h: 6 + Math.random() * 30,
          speed: 4 + Math.random() * 16,
          amp: 6 + Math.random() * (width * 0.04),
          seed: Math.random() * 100,
          color: palette[Math.floor(Math.random() * palette.length)],
        })),
      };
    },
    draw: ({ ctx, width, height }, state, t, dt) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // Chromatic glitch bands drifting downward with horizontal jitter.
      for (const b of state.bands) {
        b.y += b.speed * dt * 6;
        if (b.y > height + b.h) b.y = -b.h;
        const jump = Math.sin(t * 13 + b.seed) > 0.93 ? b.amp * 2 : 0;
        const ox = Math.sin(t * 2 + b.seed) * b.amp + jump;
        ctx.fillStyle = `rgba(${b.color},0.12)`;
        ctx.fillRect(ox, b.y, width, b.h);
        ctx.fillStyle = `rgba(${b.color},0.08)`;
        ctx.fillRect(-ox * 0.6, b.y, width, b.h);
      }

      ctx.globalCompositeOperation = "source-over";
      // Scrolling scanlines.
      const off = (t * 30) % 4;
      ctx.fillStyle = "rgba(200,220,255,0.035)";
      for (let y = off; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
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
