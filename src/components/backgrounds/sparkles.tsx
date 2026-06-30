"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface SparklesProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  color: string;
}

interface State {
  sparkles: Sparkle[];
}

export function Sparkles({
  className,
  count = 70,
  colors = ["255,255,255", "196,181,253", "150,234,255"],
  children,
  ...props
}: SparklesProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => ({
      sparkles: Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1.4 + Math.random() * 2.6,
        phase: Math.random() * Math.PI * 2,
        speed: 1 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
    }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const s of state.sparkles) {
        const tw = Math.sin(t * s.speed + s.phase);
        if (tw <= 0) continue;
        const a = tw;
        const len = s.size * (3 + tw * 3);

        // Center glow.
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 2);
        glow.addColorStop(0, `rgba(${s.color},${a})`);
        glow.addColorStop(1, `rgba(${s.color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Cross flare.
        ctx.lineWidth = 1;
        const gh = ctx.createLinearGradient(s.x - len, s.y, s.x + len, s.y);
        gh.addColorStop(0, `rgba(${s.color},0)`);
        gh.addColorStop(0.5, `rgba(${s.color},${a})`);
        gh.addColorStop(1, `rgba(${s.color},0)`);
        ctx.strokeStyle = gh;
        ctx.beginPath();
        ctx.moveTo(s.x - len, s.y);
        ctx.lineTo(s.x + len, s.y);
        ctx.stroke();

        const gv = ctx.createLinearGradient(s.x, s.y - len, s.x, s.y + len);
        gv.addColorStop(0, `rgba(${s.color},0)`);
        gv.addColorStop(0.5, `rgba(${s.color},${a})`);
        gv.addColorStop(1, `rgba(${s.color},0)`);
        ctx.strokeStyle = gv;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - len);
        ctx.lineTo(s.x, s.y + len);
        ctx.stroke();
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
