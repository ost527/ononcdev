"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface HalftoneProps extends HTMLAttributes<HTMLDivElement> {
  /** Dot grid spacing in pixels. */
  gap?: number;
  /** Dot color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface State {
  gap: number;
}

export function Halftone({
  className,
  gap = 16,
  color = "150,160,255",
  children,
  ...props
}: HalftoneProps) {
  const ref = useCanvas<State>({
    init: () => ({ gap }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const g = state.gap;
      const maxR = g * 0.5;
      for (let y = g / 2; y < height; y += g) {
        for (let x = g / 2; x < width; x += g) {
          const wave =
            0.5 +
            0.5 *
              Math.sin(x * 0.02 + y * 0.014 - t * 1.8) *
              Math.cos(y * 0.02 - t * 0.6);
          const r = wave * maxR;
          if (r < 0.3) continue;
          ctx.fillStyle = `rgba(${color},${0.18 + wave * 0.5})`;
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
