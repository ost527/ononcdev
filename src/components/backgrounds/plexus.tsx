"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface PlexusProps extends HTMLAttributes<HTMLDivElement> {
  /** Approx. nodes per 100k px² (capped). */
  density?: number;
  /** Node + line color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

interface State {
  nodes: Node[];
}

export function Plexus({
  className,
  density = 5,
  color = "139,160,255",
  children,
  ...props
}: PlexusProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const count = Math.max(
        24,
        Math.min(80, Math.round(((width * height) / 100000) * density * 6)),
      );
      const rnd = () => Math.random() * 2 - 1;
      const nodes: Node[] = Array.from({ length: count }, () => ({
        x: rnd(),
        y: rnd(),
        z: rnd(),
        vx: rnd() * 0.0016,
        vy: rnd() * 0.0016,
        vz: rnd() * 0.0016,
      }));
      return { nodes };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const spread = Math.min(width, height) * 0.62;
      const fov = 2.4;
      const cosA = Math.cos(t * 0.08);
      const sinA = Math.sin(t * 0.08);

      const proj = state.nodes.map((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;
        if (n.x < -1 || n.x > 1) n.vx *= -1;
        if (n.y < -1 || n.y > 1) n.vy *= -1;
        if (n.z < -1 || n.z > 1) n.vz *= -1;
        const xr = n.x * cosA - n.z * sinA;
        const zr = n.x * sinA + n.z * cosA;
        const scale = fov / (fov + zr);
        return {
          sx: cx + xr * scale * spread,
          sy: cy + n.y * scale * spread,
          scale,
          depth: (zr + 1) / 2,
        };
      });

      const thresh = 0.62;
      ctx.lineWidth = 1;
      for (let i = 0; i < state.nodes.length; i++) {
        for (let j = i + 1; j < state.nodes.length; j++) {
          const a = state.nodes[i];
          const b = state.nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < thresh) {
            const alpha = (1 - d / thresh) * 0.4 * ((proj[i].depth + proj[j].depth) / 2 + 0.3);
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(proj[i].sx, proj[i].sy);
            ctx.lineTo(proj[j].sx, proj[j].sy);
            ctx.stroke();
          }
        }
      }

      for (const p of proj) {
        ctx.fillStyle = `rgba(${color},${0.4 + p.depth * 0.55})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 1 + p.scale * 1.6, 0, Math.PI * 2);
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
