"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface ClothFlagProps extends HTMLAttributes<HTMLDivElement> {
  cols?: number;
  rows?: number;
  /** Left and right edge colors as [r,g,b]. */
  from?: [number, number, number];
  to?: [number, number, number];
  children?: ReactNode;
}

interface State {
  cols: number;
  rows: number;
}

export function ClothFlag({
  className,
  cols = 22,
  rows = 15,
  from = [139, 92, 246],
  to = [34, 211, 238],
  children,
  ...props
}: ClothFlagProps) {
  const ref = useCanvas<State>({
    init: () => ({ cols, rows }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const { cols: C, rows: R } = state;

      const pt = (c: number, r: number) => {
        const gx = c / (C - 1);
        const gy = r / (R - 1);
        const wave =
          (Math.sin(gx * 6 - t * 2.5) + Math.sin(gy * 4 + t * 1.3) * 0.5) * gx;
        return {
          x: gx * width + Math.sin(gy * 5 + t * 2) * gx * width * 0.02,
          y: gy * height + wave * height * 0.09,
          z: wave,
        };
      };

      for (let r = 0; r < R - 1; r++) {
        for (let c = 0; c < C - 1; c++) {
          const tl = pt(c, r);
          const tr = pt(c + 1, r);
          const br = pt(c + 1, r + 1);
          const bl = pt(c, r + 1);
          const gx = c / (C - 1);
          const shade = 0.45 + 0.55 * ((tl.z + br.z) / 2 + 0.5);
          const cr = Math.round((from[0] + (to[0] - from[0]) * gx) * shade);
          const cg = Math.round((from[1] + (to[1] - from[1]) * gx) * shade);
          const cb = Math.round((from[2] + (to[2] - from[2]) * gx) * shade);
          ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
          ctx.beginPath();
          ctx.moveTo(tl.x, tl.y);
          ctx.lineTo(tr.x, tr.y);
          ctx.lineTo(br.x, br.y);
          ctx.lineTo(bl.x, bl.y);
          ctx.closePath();
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
