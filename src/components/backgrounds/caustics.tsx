"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface CausticsProps extends HTMLAttributes<HTMLDivElement> {
  /** Grid step in pixels (smaller = finer, heavier). */
  step?: number;
  /** Light color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface State {
  step: number;
}

export function Caustics({
  className,
  step = 7,
  color = "120,200,255",
  children,
  ...props
}: CausticsProps) {
  const ref = useCanvas<State>({
    init: () => ({ step }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const s = state.step;
      const cx = width / 2;
      const cy = height / 2;
      ctx.globalCompositeOperation = "lighter";
      for (let y = 0; y < height; y += s) {
        for (let x = 0; x < width; x += s) {
          const v =
            Math.sin(x * 0.03 + t) +
            Math.sin(y * 0.03 - t * 0.8) +
            Math.sin((x + y) * 0.02 + t * 0.5) +
            Math.sin(Math.hypot(x - cx, y - cy) * 0.04 - t * 1.2);
          const n = (v + 4) / 8; // 0..1
          const b = n * n * n * n; // sharpen into veins
          if (b < 0.02) continue;
          ctx.fillStyle = `rgba(${color},${Math.min(0.8, b)})`;
          ctx.fillRect(x, y, s, s);
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
