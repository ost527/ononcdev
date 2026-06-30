"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface OscilloscopeProps extends HTMLAttributes<HTMLDivElement> {
  /** Waveform colors as "r,g,b" (one line each). */
  colors?: string[];
  children?: ReactNode;
}

interface State {
  empty: true;
}

export function Oscilloscope({
  className,
  colors = ["94,234,255", "139,124,255"],
  children,
  ...props
}: OscilloscopeProps) {
  const ref = useCanvas<State>({
    init: () => ({ empty: true }),
    draw: ({ ctx, width, height }, _state, t) => {
      ctx.clearRect(0, 0, width, height);
      const cy = height / 2;

      // Faint scope grid.
      ctx.strokeStyle = "rgba(120,200,255,0.07)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 32) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += 32) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      colors.forEach((color, idx) => {
        const amp = height * (0.26 - idx * 0.07);
        const speed = 2 + idx * 1.3;
        const draw = (lw: number, alpha: number) => {
          ctx.strokeStyle = `rgba(${color},${alpha})`;
          ctx.lineWidth = lw;
          ctx.beginPath();
          for (let x = 0; x <= width; x += 4) {
            const y =
              cy +
              (Math.sin(x * 0.02 + t * speed) * 0.6 +
                Math.sin(x * 0.05 - t * (speed + 1)) * 0.3 +
                Math.sin(x * 0.011 + t) * 0.2) *
                amp +
              idx * 18;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        };
        draw(6, 0.12);
        draw(1.6, 0.9);
      });
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
