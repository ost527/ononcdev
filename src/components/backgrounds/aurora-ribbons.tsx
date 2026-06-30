"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface AuroraRibbonsProps extends HTMLAttributes<HTMLDivElement> {
  /** Ribbon colors as "r,g,b" (back to front). */
  colors?: string[];
  children?: ReactNode;
}

interface Ribbon {
  color: string;
  yBase: number;
  amp: number;
  amp2: number;
  len: number;
  len2: number;
  speed: number;
  phase: number;
  thickness: number;
}

interface State {
  ribbons: Ribbon[];
}

export function AuroraRibbons({
  className,
  colors = ["139,92,246", "34,211,238", "244,114,182", "79,70,229"],
  children,
  ...props
}: AuroraRibbonsProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const ribbons: Ribbon[] = colors.map((color, i) => ({
        color,
        yBase: height * (0.32 + i * 0.13),
        amp: 28 + i * 10,
        amp2: 12 + i * 6,
        len: width * (0.5 + i * 0.12),
        len2: width * (0.18 + i * 0.05),
        speed: 0.12 + i * 0.05,
        phase: i * 1.7,
        thickness: 60 + i * 18,
      }));
      return { ribbons };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const r of state.ribbons) {
        const top: [number, number][] = [];
        const bottom: [number, number][] = [];
        for (let x = 0; x <= width; x += 12) {
          const wobble =
            Math.sin(x / r.len + t * r.speed + r.phase) * r.amp +
            Math.sin(x / r.len2 - t * r.speed * 1.7 + r.phase) * r.amp2;
          const y = r.yBase + wobble;
          const thick =
            r.thickness * (0.6 + 0.4 * Math.sin(x / (r.len * 0.7) + t * 0.3));
          top.push([x, y - thick / 2]);
          bottom.push([x, y + thick / 2]);
        }

        ctx.beginPath();
        ctx.moveTo(top[0][0], top[0][1]);
        for (const [x, y] of top) ctx.lineTo(x, y);
        for (let i = bottom.length - 1; i >= 0; i--)
          ctx.lineTo(bottom[i][0], bottom[i][1]);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, `rgba(${r.color},0)`);
        grad.addColorStop(0.5, `rgba(${r.color},0.22)`);
        grad.addColorStop(1, `rgba(${r.color},0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      // Vignette to seat the ribbons.
      const vg = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7,
      );
      vg.addColorStop(0, "rgba(6,7,13,0)");
      vg.addColorStop(1, "rgba(6,7,13,0.55)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);
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
