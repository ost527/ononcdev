"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface AuroraCurtainsProps extends HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  children?: ReactNode;
}

interface Curtain {
  xBase: number;
  width: number;
  amp: number;
  speed: number;
  phase: number;
  color: string;
}

interface State {
  curtains: Curtain[];
}

export function AuroraCurtains({
  className,
  colors = ["139,92,246", "34,211,238", "120,255,180", "244,114,182"],
  children,
  ...props
}: AuroraCurtainsProps) {
  const ref = useCanvas<State>({
    init: ({ width }) => {
      const curtains: Curtain[] = Array.from({ length: 6 }, (_, i) => ({
        xBase: (width * (i + 0.5)) / 6,
        width: 40 + Math.random() * 70,
        amp: 20 + Math.random() * 50,
        speed: 0.4 + Math.random() * 0.7,
        phase: i * 1.3,
        color: colors[i % colors.length],
      }));
      return { curtains };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const c of state.curtains) {
        const leftX = (y: number) =>
          c.xBase + Math.sin(y * 0.011 + t * c.speed + c.phase) * c.amp;
        ctx.beginPath();
        ctx.moveTo(leftX(0), 0);
        for (let y = 0; y <= height; y += 16) ctx.lineTo(leftX(y), y);
        for (let y = height; y >= 0; y -= 16) ctx.lineTo(leftX(y) + c.width, y);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, `rgba(${c.color},0)`);
        grad.addColorStop(0.4, `rgba(${c.color},0.22)`);
        grad.addColorStop(0.75, `rgba(${c.color},0.12)`);
        grad.addColorStop(1, `rgba(${c.color},0)`);
        ctx.fillStyle = grad;
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
