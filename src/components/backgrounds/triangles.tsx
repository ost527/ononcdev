"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface TrianglesProps extends HTMLAttributes<HTMLDivElement> {
  /** Cell size in pixels. */
  size?: number;
  colors?: string[];
  children?: ReactNode;
}

interface Tri {
  pts: [number, number][];
  cx: number;
  cy: number;
  color: string;
}

interface State {
  tris: Tri[];
}

export function Triangles({
  className,
  size = 64,
  colors = ["139,124,255", "94,234,255", "244,114,182"],
  children,
  ...props
}: TrianglesProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const cols = Math.ceil(width / size) + 1;
      const rows = Math.ceil(height / size) + 1;
      const jit = size * 0.32;
      const verts: [number, number][][] = [];
      for (let r = 0; r < rows; r++) {
        verts[r] = [];
        for (let c = 0; c < cols; c++) {
          verts[r][c] = [
            c * size + (Math.random() - 0.5) * jit,
            r * size + (Math.random() - 0.5) * jit,
          ];
        }
      }
      const tris: Tri[] = [];
      const push = (a: [number, number], b: [number, number], c: [number, number]) => {
        tris.push({
          pts: [a, b, c],
          cx: (a[0] + b[0] + c[0]) / 3,
          cy: (a[1] + b[1] + c[1]) / 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      };
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          push(verts[r][c], verts[r][c + 1], verts[r + 1][c]);
          push(verts[r][c + 1], verts[r + 1][c + 1], verts[r + 1][c]);
        }
      }
      return { tris };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      for (const tri of state.tris) {
        const b =
          (Math.sin(tri.cx * 0.01 + t) +
            Math.sin(tri.cy * 0.012 - t * 0.8) +
            Math.sin((tri.cx + tri.cy) * 0.008 + t * 0.5)) /
            3;
        const n = b * 0.5 + 0.5;
        ctx.fillStyle = `rgba(${tri.color},${0.04 + n * 0.26})`;
        ctx.beginPath();
        ctx.moveTo(tri.pts[0][0], tri.pts[0][1]);
        ctx.lineTo(tri.pts[1][0], tri.pts[1][1]);
        ctx.lineTo(tri.pts[2][0], tri.pts[2][1]);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = `rgba(${tri.color},0.07)`;
        ctx.lineWidth = 1;
        ctx.stroke();
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
