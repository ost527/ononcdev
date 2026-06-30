"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface DotMatrixProps extends HTMLAttributes<HTMLDivElement> {
  /** Spacing between dots in pixels. */
  gap?: number;
  /** Base dot radius in pixels. */
  dotRadius?: number;
  /** Influence radius of the cursor in pixels. */
  reach?: number;
  /** Dot color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface Dot {
  x: number;
  y: number;
}
interface State {
  dots: Dot[];
  pointer: { x: number; y: number; inside: boolean };
  glow: number; // eased pointer presence 0..1
}

export function DotMatrix({
  className,
  gap = 28,
  dotRadius = 1.3,
  reach = 130,
  color = "150,170,255",
  children,
  ...props
}: DotMatrixProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const dots: Dot[] = [];
      const cols = Math.ceil(width / gap);
      const rows = Math.ceil(height / gap);
      const offX = (width - (cols - 1) * gap) / 2;
      const offY = (height - (rows - 1) * gap) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: offX + c * gap, y: offY + r * gap });
        }
      }
      return { dots, pointer: { x: -9999, y: -9999, inside: false }, glow: 0 };
    },
    draw: ({ ctx, width, height }, state, _t, dt) => {
      ctx.clearRect(0, 0, width, height);
      const { dots, pointer } = state;
      const targetGlow = pointer.inside ? 1 : 0;
      state.glow += (targetGlow - state.glow) * Math.min(1, dt * 6 || 0.2);

      for (const d of dots) {
        let intensity = 0.18;
        let radius = dotRadius;
        if (state.glow > 0.01) {
          const dist = Math.hypot(pointer.x - d.x, pointer.y - d.y);
          if (dist < reach) {
            const f = (1 - dist / reach) * state.glow;
            intensity = 0.18 + f * 0.82;
            radius = dotRadius + f * 2.4;
          }
        }
        ctx.fillStyle = `rgba(${color},${intensity})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    onPointer: (state, x, y, inside) => {
      state.pointer.x = x;
      state.pointer.y = y;
      state.pointer.inside = inside;
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
