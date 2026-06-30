"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface MagneticFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of field lines traced from the + pole. */
  lines?: number;
  /** Field-line color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface State {
  lines: number;
}

export function MagneticField({
  className,
  lines = 18,
  color = "139,160,255",
  children,
  ...props
}: MagneticFieldProps) {
  const ref = useCanvas<State>({
    init: () => ({ lines }),
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const sep = Math.min(width, height) * 0.22;
      const poles = [
        { x: width / 2 + Math.cos(t * 0.3) * sep, y: height / 2 + Math.sin(t * 0.3) * sep, q: 1 },
        { x: width / 2 - Math.cos(t * 0.3) * sep, y: height / 2 - Math.sin(t * 0.3) * sep, q: -1 },
      ];

      const field = (px: number, py: number) => {
        let fx = 0;
        let fy = 0;
        for (const p of poles) {
          const dx = px - p.x;
          const dy = py - p.y;
          const r2 = dx * dx + dy * dy + 1;
          const inv = p.q / (r2 * Math.sqrt(r2));
          fx += dx * inv;
          fy += dy * inv;
        }
        return [fx, fy] as const;
      };

      ctx.lineWidth = 1.2;
      const plus = poles[0];
      const minus = poles[1];
      for (let i = 0; i < state.lines; i++) {
        const a = (i / state.lines) * Math.PI * 2;
        let x = plus.x + Math.cos(a) * 16;
        let y = plus.y + Math.sin(a) * 16;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let step = 0; step < 200; step++) {
          const [fx, fy] = field(x, y);
          const mag = Math.hypot(fx, fy) || 1;
          x += (fx / mag) * 4;
          y += (fy / mag) * 4;
          ctx.lineTo(x, y);
          if (Math.hypot(x - minus.x, y - minus.y) < 14) break;
          if (x < -20 || x > width + 20 || y < -20 || y > height + 20) break;
        }
        ctx.strokeStyle = `rgba(${color},0.3)`;
        ctx.stroke();
      }

      // Pole glows.
      for (const p of poles) {
        const c = p.q > 0 ? "120,200,255" : "244,114,182";
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 24);
        g.addColorStop(0, `rgba(${c},0.9)`);
        g.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 24, 0, Math.PI * 2);
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
