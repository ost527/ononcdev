"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface EmbersProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of embers. */
  count?: number;
  /** Ember colors as "r,g,b" (warm by default). */
  colors?: string[];
  children?: ReactNode;
}

interface Ember {
  x: number;
  y: number;
  vy: number;
  drift: number;
  r: number;
  seed: number;
  life: number;
  maxLife: number;
  color: string;
}

interface State {
  embers: Ember[];
}

export function Embers({
  className,
  count = 90,
  colors = ["255,176,84", "255,138,76", "255,214,140"],
  children,
  ...props
}: EmbersProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const make = (seeded: boolean): Ember => ({
        x: Math.random() * width,
        y: seeded ? Math.random() * height : height + Math.random() * 40,
        vy: 0.3 + Math.random() * 0.9,
        drift: (Math.random() - 0.5) * 0.4,
        r: 1 + Math.random() * 2.4,
        seed: Math.random() * 1000,
        life: seeded ? Math.random() * 200 : 0,
        maxLife: 200 + Math.random() * 220,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      return { embers: Array.from({ length: count }, () => make(true)) };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.fillStyle = "rgba(6,7,13,0.18)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const e of state.embers) {
        e.y -= e.vy;
        e.x += e.drift + Math.sin(t * 1.5 + e.seed) * 0.4;
        e.life += 1;

        const lifeT = e.life / e.maxLife;
        const flicker = 0.65 + 0.35 * Math.sin(t * 9 + e.seed);
        const alpha = Math.sin(Math.min(1, lifeT) * Math.PI) * flicker;

        if (alpha > 0.01) {
          const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 4);
          glow.addColorStop(0, `rgba(${e.color},${alpha})`);
          glow.addColorStop(1, `rgba(${e.color},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        if (e.life >= e.maxLife || e.y < -10) {
          e.x = Math.random() * width;
          e.y = height + Math.random() * 30;
          e.life = 0;
          e.vy = 0.3 + Math.random() * 0.9;
          e.r = 1 + Math.random() * 2.4;
          e.color = colors[Math.floor(Math.random() * colors.length)];
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
