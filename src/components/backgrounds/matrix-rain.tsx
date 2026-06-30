"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface MatrixRainProps extends HTMLAttributes<HTMLDivElement> {
  /** Font size (px) — also the column width. */
  fontSize?: number;
  /** Glyph color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

interface State {
  drops: number[];
  acc: number;
}

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネ0123456789ABCDEF<>{}/*+-";

export function MatrixRain({
  className,
  fontSize = 14,
  color = "34,211,238",
  children,
  ...props
}: MatrixRainProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const cols = Math.ceil(width / fontSize);
      const drops = Array.from({ length: cols }, () =>
        Math.floor((Math.random() * height) / fontSize),
      );
      return { drops, acc: 0 };
    },
    draw: ({ ctx, width, height }, state, _t, dt) => {
      // Fade the previous frame to leave glowing trails.
      ctx.fillStyle = "rgba(6, 7, 13, 0.1)";
      ctx.fillRect(0, 0, width, height);

      state.acc += dt;
      const step = state.acc >= 0.05;
      if (step) state.acc = 0;

      ctx.font = `${fontSize}px ui-monospace, monospace`;
      for (let i = 0; i < state.drops.length; i++) {
        const x = i * fontSize;
        const y = state.drops[i] * fontSize;
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        // Bright head, dimmer tail.
        ctx.fillStyle = `rgba(${color},0.9)`;
        ctx.fillText(glyph, x, y);

        if (step) {
          if (y > height && Math.random() > 0.975) state.drops[i] = 0;
          else state.drops[i] += 1;
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
