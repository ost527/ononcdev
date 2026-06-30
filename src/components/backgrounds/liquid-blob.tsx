"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface LiquidBlobProps extends HTMLAttributes<HTMLDivElement> {
  /** The two blob colors as "r,g,b". */
  colors?: [string, string];
  children?: ReactNode;
}

interface State {
  empty: true;
}

export function LiquidBlob({
  className,
  colors = ["139,92,246", "34,211,238"],
  children,
  ...props
}: LiquidBlobProps) {
  const ref = useCanvas<State>({
    init: () => ({ empty: true }),
    draw: ({ ctx, width, height }, _state, t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      const base = Math.min(width, height) * 0.3;

      const blob = (
        cx: number,
        cy: number,
        baseR: number,
        phase: number,
        color: string,
      ) => {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.001; a += 0.12) {
          const r =
            baseR *
            (1 +
              0.18 * Math.sin(a * 3 + t + phase) +
              0.12 * Math.sin(a * 5 - t * 1.3 + phase) +
              0.07 * Math.sin(a * 7 + t * 0.7 + phase));
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.3);
        grad.addColorStop(0, `rgba(${color},0.5)`);
        grad.addColorStop(1, `rgba(${color},0.04)`);
        ctx.fillStyle = grad;
        ctx.fill();
      };

      blob(
        width / 2 + Math.sin(t * 0.4) * width * 0.08,
        height / 2 + Math.cos(t * 0.5) * height * 0.08,
        base * 1.05,
        2.5,
        colors[1],
      );
      blob(
        width / 2 - Math.sin(t * 0.35) * width * 0.06,
        height / 2 - Math.cos(t * 0.45) * height * 0.06,
        base,
        0,
        colors[0],
      );
      ctx.globalCompositeOperation = "source-over";
    },
  });

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-background", className)}
      {...props}
    >
      <canvas ref={ref} className="absolute inset-0 -z-10 h-full w-full blur-[14px]" />
      {children}
    </div>
  );
}
