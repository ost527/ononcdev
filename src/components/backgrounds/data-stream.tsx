"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface DataStreamProps extends HTMLAttributes<HTMLDivElement> {
  /** Lane spacing in pixels. */
  gap?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Lane {
  x: number;
  speed: number;
  offset: number;
  tail: number;
  color: string;
}

interface State {
  lanes: Lane[];
}

export function DataStream({
  className,
  gap = 18,
  colors = ["94,234,255", "139,124,255", "120,255,180"],
  children,
  ...props
}: DataStreamProps) {
  const ref = useCanvas<State>({
    init: ({ width }) => {
      const cols = Math.ceil(width / gap);
      const lanes: Lane[] = Array.from({ length: cols }, (_, i) => ({
        x: i * gap + gap / 2,
        speed: 60 + Math.random() * 220,
        offset: Math.random() * 1000,
        tail: 6 + Math.floor(Math.random() * 12),
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      return { lanes };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      const dash = 9;
      const span = height + 200;

      for (const lane of state.lanes) {
        const head = ((t * lane.speed + lane.offset) % span) - 100;
        for (let k = 0; k < lane.tail; k++) {
          const y = head - k * dash;
          if (y < -dash || y > height) continue;
          const alpha = (1 - k / lane.tail) * 0.85;
          ctx.fillStyle = `rgba(${lane.color},${alpha})`;
          ctx.fillRect(lane.x - 1, y, 2, dash - 3);
        }
      }
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
