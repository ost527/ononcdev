"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface GridBeamsProps extends HTMLAttributes<HTMLDivElement> {
  /** Grid cell size in pixels. */
  size?: number;
  /** Beam colors as "r,g,b". */
  colors?: string[];
  children?: ReactNode;
}

interface Beam {
  axis: "h" | "v";
  coord: number;
  pos: number;
  len: number;
  speed: number;
  color: string;
}

interface State {
  beams: Beam[];
  size: number;
}

export function GridBeams({
  className,
  size = 46,
  colors = ["139,124,255", "94,234,255", "244,114,182"],
  children,
  ...props
}: GridBeamsProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const cols = Math.max(1, Math.floor(width / size));
      const rows = Math.max(1, Math.floor(height / size));
      const beamCount = Math.min(26, Math.max(8, Math.round((cols + rows) / 3)));
      const make = (): Beam => {
        const axis = Math.random() > 0.5 ? "h" : "v";
        const coord =
          axis === "h"
            ? Math.floor(Math.random() * (rows + 1)) * size
            : Math.floor(Math.random() * (cols + 1)) * size;
        const length = axis === "h" ? width : height;
        return {
          axis,
          coord,
          pos: Math.random() * length,
          len: 70 + Math.random() * 150,
          speed: 90 + Math.random() * 160,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
      };
      return { beams: Array.from({ length: beamCount }, make), size };
    },
    draw: ({ ctx, width, height }, state, _t, dt) => {
      ctx.clearRect(0, 0, width, height);

      // Faint grid.
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += state.size) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += state.size) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Travelling beams.
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 2;
      for (const b of state.beams) {
        const length = b.axis === "h" ? width : height;
        b.pos += b.speed * dt;
        if (b.pos - b.len > length) b.pos = -b.len + Math.random() * 40;

        const headX = b.axis === "h" ? b.pos : b.coord;
        const headY = b.axis === "h" ? b.coord : b.pos;
        const tailX = b.axis === "h" ? b.pos - b.len : b.coord;
        const tailY = b.axis === "h" ? b.coord : b.pos - b.len;

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, `rgba(${b.color},0)`);
        grad.addColorStop(1, `rgba(${b.color},0.85)`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        ctx.fillStyle = `rgba(${b.color},0.95)`;
        ctx.beginPath();
        ctx.arc(headX, headY, 2.2, 0, Math.PI * 2);
        ctx.fill();
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
