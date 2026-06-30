"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface HexGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Hexagon radius in pixels. */
  size?: number;
  /** Cell color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface Cell {
  x: number;
  y: number;
}
interface State {
  cells: Cell[];
  size: number;
  pointer: { x: number; y: number; inside: boolean };
}

export function HexGrid({
  className,
  size = 26,
  color = "139,124,255",
  children,
  ...props
}: HexGridProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const cells: Cell[] = [];
      const hw = Math.sqrt(3) * size;
      const vs = 1.5 * size;
      const rows = Math.ceil(height / vs) + 1;
      const cols = Math.ceil(width / hw) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({ x: c * hw + (r % 2) * (hw / 2), y: r * vs });
        }
      }
      return { cells, size, pointer: { x: 0, y: 0, inside: false } };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      const s = state.size;

      for (const cell of state.cells) {
        // Ambient ring wave from the center + optional cursor highlight.
        const dwave = Math.hypot(cell.x - width / 2, cell.y - height / 2);
        let alpha = 0.05 + 0.06 * (0.5 + 0.5 * Math.sin(dwave * 0.02 - t * 1.6));
        if (state.pointer.inside) {
          const d = Math.hypot(cell.x - state.pointer.x, cell.y - state.pointer.y);
          if (d < 160) alpha += (1 - d / 160) * 0.6;
        }

        ctx.strokeStyle = `rgba(${color},${alpha})`;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 180) * (60 * i - 90);
          const px = cell.x + s * Math.cos(a);
          const py = cell.y + s * Math.sin(a);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
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
