"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface WavesProps extends HTMLAttributes<HTMLDivElement> {
  /** Wave layer colors as "r,g,b" strings (back to front). */
  colors?: string[];
  children?: ReactNode;
}

interface Layer {
  color: string;
  amplitude: number;
  wavelength: number;
  speed: number;
  yBase: number;
  phase: number;
}

interface State {
  layers: Layer[];
}

export function Waves({
  className,
  colors = ["139,92,246", "34,211,238", "251,113,133"],
  children,
  ...props
}: WavesProps) {
  const ref = useCanvas<State>({
    init: ({ height }) => {
      const layers: Layer[] = colors.map((color, i) => ({
        color,
        amplitude: 16 + i * 10,
        wavelength: 260 + i * 90,
        speed: 0.6 - i * 0.12,
        yBase: height * (0.62 + i * 0.13),
        phase: i * 1.3,
      }));
      return { layers };
    },
    draw: ({ ctx, width, height }, state, t) => {
      ctx.clearRect(0, 0, width, height);
      for (const layer of state.layers) {
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 8) {
          const y =
            layer.yBase +
            Math.sin(
              x / layer.wavelength + t * layer.speed + layer.phase,
            ) *
              layer.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, layer.yBase - 60, 0, height);
        grad.addColorStop(0, `rgba(${layer.color},0.30)`);
        grad.addColorStop(1, `rgba(${layer.color},0.02)`);
        ctx.fillStyle = grad;
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
