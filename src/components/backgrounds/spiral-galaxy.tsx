"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface SpiralGalaxyProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of star dots. */
  count?: number;
  /** Number of spiral arms. */
  arms?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Star {
  r: number;
  baseAngle: number;
  size: number;
  color: string;
}

interface State {
  stars: Star[];
}

export function SpiralGalaxy({
  className,
  count = 420,
  arms = 3,
  colors = ["196,181,253", "94,234,255", "244,114,182"],
  children,
  ...props
}: SpiralGalaxyProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const maxR = Math.min(width, height) * 0.48;
      const turns = 2.4;
      const stars: Star[] = Array.from({ length: count }, (_, j) => {
        const f = j / count;
        const arm = j % arms;
        return {
          r: f * maxR + (Math.random() - 0.5) * 10,
          baseAngle:
            f * turns * Math.PI * 2 +
            arm * ((Math.PI * 2) / arms) +
            (Math.random() - 0.5) * 0.35,
          size: 0.5 + (1 - f) * 1.9,
          color: colors[arm % colors.length],
        };
      });
      return { stars };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.min(width, height) * 0.48;
      ctx.globalCompositeOperation = "lighter";

      // Glowing core.
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.4);
      core.addColorStop(0, "rgba(220,210,255,0.5)");
      core.addColorStop(1, "rgba(220,210,255,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.4, 0, Math.PI * 2);
      ctx.fill();

      for (const s of state.stars) {
        // Inner stars rotate faster (differential rotation).
        const angle = s.baseAngle + t * (0.32 - (s.r / maxR) * 0.2);
        const x = cx + Math.cos(angle) * s.r;
        const y = cy + Math.sin(angle) * s.r;
        const alpha = 0.25 + (1 - s.r / maxR) * 0.7;
        ctx.fillStyle = `rgba(${s.color},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fill();
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
