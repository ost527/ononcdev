"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export type SquaresDirection = "diagonal" | "up" | "down" | "left" | "right";

export interface SquaresProps extends HTMLAttributes<HTMLDivElement> {
  /** Square size in px. */
  size?: number;
  /** Drift speed (0 = still). */
  speed?: number;
  /** Direction the grid scrolls. */
  direction?: SquaresDirection;
  /** Grid line color as "r,g,b". */
  lineColor?: string;
  /** Fill color of squares lit near the cursor, as "r,g,b". */
  hoverColor?: string;
  /** Cursor influence radius in px. */
  reach?: number;
  children?: ReactNode;
}

interface State {
  pointer: { x: number; y: number; inside: boolean };
}

/**
 * Squares — an endlessly drifting grid of squares that fades into the dark at
 * the edges, with cells lighting up as the cursor passes over them.
 */
export function Squares({
  className,
  size = 44,
  speed = 1,
  direction = "diagonal",
  lineColor = "139,160,255",
  hoverColor = "196,181,253",
  reach = 150,
  children,
  ...props
}: SquaresProps) {
  const ref = useCanvas<State>({
    init: () => ({ pointer: { x: -9999, y: -9999, inside: false } }),
    draw: ({ ctx, width, height }, state, time) => {
      ctx.clearRect(0, 0, width, height);
      const s = Math.max(12, size);
      const d = time * speed * 26;
      let ox = 0;
      let oy = 0;
      if (direction === "diagonal") {
        ox = d;
        oy = d;
      } else if (direction === "right") ox = d;
      else if (direction === "left") ox = -d;
      else if (direction === "down") oy = d;
      else if (direction === "up") oy = -d;

      // Wrap the scroll offset into [0, s) so the grid tiles seamlessly.
      const startX = -(((ox % s) + s) % s);
      const startY = -(((oy % s) + s) % s);

      // Light up cells near the pointer.
      const { pointer } = state;
      if (pointer.inside) {
        for (let gx = startX; gx < width; gx += s) {
          for (let gy = startY; gy < height; gy += s) {
            const dist = Math.hypot(pointer.x - (gx + s / 2), pointer.y - (gy + s / 2));
            if (dist < reach) {
              ctx.fillStyle = `rgba(${hoverColor},${(1 - dist / reach) * 0.5})`;
              ctx.fillRect(gx, gy, s, s);
            }
          }
        }
      }

      // Grid lines in a single stroked path.
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${lineColor},0.4)`;
      ctx.beginPath();
      for (let x = startX; x <= width; x += s) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = startY; y <= height; y += s) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Center-out vignette so the grid dissolves into the dark edges.
      const vg = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.hypot(width, height) / 2,
      );
      vg.addColorStop(0, "rgba(6,7,13,0)");
      vg.addColorStop(1, "rgba(6,7,13,0.9)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);
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
