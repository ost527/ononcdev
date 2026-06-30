"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface DnaHelixProps extends HTMLAttributes<HTMLDivElement> {
  /** The two strand colors as "r,g,b". */
  colors?: [string, string];
  children?: ReactNode;
}

interface State {
  empty: true;
}

export function DnaHelix({
  className,
  colors = ["139,124,255", "94,234,255"],
  children,
  ...props
}: DnaHelixProps) {
  const ref = useCanvas<State>({
    init: () => ({ empty: true }),
    draw: ({ ctx, width, height }, _state, t) => {
      ctx.clearRect(0, 0, width, height);
      const cy = height / 2;
      const amp = height * 0.3;
      const freq = 0.016;
      const speed = 1.3;
      const [c1, c2] = colors;
      const step = 22;

      for (let x = 0; x <= width; x += step) {
        const ph = x * freq + t * speed;
        const y1 = cy + Math.sin(ph) * amp;
        const y2 = cy + Math.sin(ph + Math.PI) * amp;
        const depth1 = (Math.cos(ph) + 1) / 2; // 0 (back) .. 1 (front)
        const depth2 = 1 - depth1;

        // Rung connecting the strands.
        ctx.strokeStyle = `rgba(180,190,220,${0.06 + Math.min(depth1, depth2) * 0.18})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();

        // Strand nodes (front drawn larger / brighter).
        ctx.fillStyle = `rgba(${c1},${0.35 + depth1 * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y1, 1.5 + depth1 * 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${c2},${0.35 + depth2 * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y2, 1.5 + depth2 * 3.5, 0, Math.PI * 2);
        ctx.fill();
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
