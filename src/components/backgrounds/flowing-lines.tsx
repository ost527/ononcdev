"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface FlowingLinesProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of flowing lines. */
  lines?: number;
  /** Line colors as "r,g,b" (cycled). */
  colors?: string[];
  children?: ReactNode;
}

interface Line {
  offset: number;
  amplitude: number;
  wavelength: number;
  speed: number;
  color: string;
  phase: number;
}

interface State {
  lines: Line[];
  pointer: { y: number; inside: boolean };
}

export function FlowingLines({
  className,
  lines = 18,
  colors = ["139,92,246", "34,211,238", "251,113,133"],
  children,
  ...props
}: FlowingLinesProps) {
  const ref = useCanvas<State>({
    init: ({ height }) => {
      const arr: Line[] = Array.from({ length: lines }, (_, i) => {
        const f = i / Math.max(1, lines - 1);
        return {
          offset: height * (0.12 + f * 0.76),
          amplitude: 14 + (i % 5) * 7,
          wavelength: 300 + (i % 4) * 110,
          speed: 0.25 + (i % 3) * 0.12,
          color: colors[i % colors.length],
          phase: i * 0.6,
        };
      });
      return { lines: arr, pointer: { y: 0, inside: false } };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.5;
      for (const line of state.lines) {
        const boost =
          state.pointer.inside
            ? Math.max(0, 1 - Math.abs(state.pointer.y - line.offset) / 120) * 26
            : 0;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const y =
            line.offset +
            Math.sin(x / line.wavelength + t * line.speed + line.phase) *
              (line.amplitude + boost) +
            Math.sin(x / (line.wavelength * 0.4) + t * line.speed * 1.6) * 4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${line.color},0.32)`;
        ctx.stroke();
      }
    },
    onPointer: (state, _x, y, inside) => {
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
