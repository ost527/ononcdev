"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface NeonTunnelProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of concentric layers. */
  layers?: number;
  /** Inner and outer colors as [r,g,b] triples. */
  from?: [number, number, number];
  to?: [number, number, number];
  children?: ReactNode;
}

interface State {
  layers: number;
}

export function NeonTunnel({
  className,
  layers = 16,
  from = [139, 124, 255],
  to = [94, 234, 255],
  children,
  ...props
}: NeonTunnelProps) {
  const ref = useCanvas<State>({
    init: () => ({ layers }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.hypot(width, height) / 2;
      ctx.globalCompositeOperation = "lighter";

      for (let k = 0; k < state.layers; k++) {
        const progress = (t * 0.22 + k / state.layers) % 1;
        const r = progress * maxR;
        const fadeIn = Math.min(1, progress * 5);
        const fadeOut = 1 - progress;
        const alpha = fadeIn * fadeOut * 0.7;
        if (alpha <= 0.01) continue;

        const cr = Math.round(from[0] + (to[0] - from[0]) * progress);
        const cg = Math.round(from[1] + (to[1] - from[1]) * progress);
        const cb = Math.round(from[2] + (to[2] - from[2]) * progress);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(progress * 0.8 + t * 0.05);
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.lineWidth = 1 + progress * 2;
        ctx.strokeRect(-r, -r, r * 2, r * 2);
        ctx.restore();
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
