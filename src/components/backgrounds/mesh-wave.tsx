"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface MeshWaveProps extends HTMLAttributes<HTMLDivElement> {
  /** Grid columns / rows. */
  cols?: number;
  rows?: number;
  /** Line color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface State {
  cols: number;
  rows: number;
}

export function MeshWave({
  className,
  cols = 26,
  rows = 18,
  color = "139,124,255",
  children,
  ...props
}: MeshWaveProps) {
  const ref = useCanvas<State>({
    init: () => ({ cols, rows }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const { cols: C, rows: R } = state;
      const tilt = 1.05;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const cx = width / 2;
      const cy = height * 0.46;
      const spread = Math.min(width, height) * 1.5;
      const fov = 3;

      // Project a grid point (gx,gy in [-1,1]) to screen.
      const project = (gx: number, gy: number) => {
        const z =
          Math.sin(gx * 3 + t) * 0.18 + Math.sin(gy * 3.4 - t * 0.8) * 0.18;
        const ry = gy * cosT - z * sinT;
        const rz = gy * sinT + z * cosT;
        const scale = fov / (fov + rz);
        return {
          x: cx + gx * scale * spread,
          y: cy + ry * scale * spread,
          z: rz,
        };
      };

      for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
          const gx = (c / (C - 1)) * 2 - 1;
          const gy = (r / (R - 1)) * 2 - 1;
          const p = project(gx, gy);
          const alpha = Math.max(0.05, 0.5 - p.z * 0.4);
          ctx.strokeStyle = `rgba(${color},${alpha})`;
          ctx.lineWidth = 1;
          if (c < C - 1) {
            const pr = project(((c + 1) / (C - 1)) * 2 - 1, gy);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pr.x, pr.y);
            ctx.stroke();
          }
          if (r < R - 1) {
            const pd = project(gx, ((r + 1) / (R - 1)) * 2 - 1);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pd.x, pd.y);
            ctx.stroke();
          }
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
