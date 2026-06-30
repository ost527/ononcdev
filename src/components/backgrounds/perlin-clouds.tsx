"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface PerlinCloudsProps extends HTMLAttributes<HTMLDivElement> {
  /** Grid step in pixels. */
  step?: number;
  /** Cloud color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface State {
  step: number;
}

export function PerlinClouds({
  className,
  step = 10,
  color = "150,170,220",
  children,
  ...props
}: PerlinCloudsProps) {
  const ref = useCanvas<State>({
    init: () => ({ step }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const s = state.step;
      for (let y = 0; y < height; y += s) {
        for (let x = 0; x < width; x += s) {
          // Fractal sum of sine octaves ~ value noise.
          let n =
            0.5 * (0.5 + 0.5 * Math.sin(x * 0.006 + y * 0.004 + t * 0.2));
          n += 0.25 * (0.5 + 0.5 * Math.sin(x * 0.013 - y * 0.009 - t * 0.3 + 1.3));
          n += 0.15 * (0.5 + 0.5 * Math.sin(x * 0.027 + y * 0.021 + t * 0.15 + 2.1));
          n += 0.1 * (0.5 + 0.5 * Math.sin((x + y) * 0.04 - t * 0.4));
          const b = Math.pow(n, 1.7);
          if (b < 0.04) continue;
          ctx.fillStyle = `rgba(${color},${b * 0.5})`;
          ctx.fillRect(x, y, s, s);
        }
      }
    },
  });

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-background", className)}
      {...props}
    >
      <canvas ref={ref} className="absolute inset-0 -z-10 h-full w-full blur-[6px]" />
      {children}
    </div>
  );
}
