"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface OrbitingDotsProps extends HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  children?: ReactNode;
}

interface Ring {
  radius: number;
  count: number;
  speed: number;
  phase: number;
  color: string;
  dotR: number;
}

interface State {
  rings: Ring[];
}

export function OrbitingDots({
  className,
  colors = ["139,124,255", "94,234,255", "244,114,182"],
  children,
  ...props
}: OrbitingDotsProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const maxR = Math.min(width, height) * 0.44;
      const ringCount = 6;
      const rings: Ring[] = Array.from({ length: ringCount }, (_, i) => {
        const radius = maxR * ((i + 1) / ringCount);
        return {
          radius,
          count: 4 + i * 3,
          speed: (0.15 + i * 0.05) * (i % 2 === 0 ? 1 : -1),
          phase: i * 0.7,
          color: colors[i % colors.length],
          dotR: 2.6 - i * 0.18,
        };
      });
      return { rings };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      // Center glow.
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
      core.addColorStop(0, "rgba(196,181,253,0.9)");
      core.addColorStop(1, "rgba(196,181,253,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fill();

      for (const ring of state.rings) {
        ctx.strokeStyle = `rgba(${ring.color},0.1)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.stroke();

        for (let i = 0; i < ring.count; i++) {
          const a = ring.phase + t * ring.speed + (i * Math.PI * 2) / ring.count;
          const x = cx + Math.cos(a) * ring.radius;
          const y = cy + Math.sin(a) * ring.radius;
          ctx.fillStyle = `rgba(${ring.color},0.85)`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1, ring.dotR), 0, Math.PI * 2);
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
