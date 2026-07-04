"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/*+-=$#&@%".split("");

export interface LetterGlitchProps extends HTMLAttributes<HTMLDivElement> {
  /** Glyph colors as "r,g,b" — each cell picks one at a random brightness. */
  colors?: string[];
  /** Monospace glyph size in px (drives the cell size). */
  fontSize?: number;
  /** How frantically cells mutate (higher = more churn). */
  glitchSpeed?: number;
  /** Glyph brightness / opacity (0–1). */
  glow?: number;
  /** Edge darkening toward the corners (0–1). */
  vignette?: number;
  children?: ReactNode;
}

interface Cell {
  ch: string;
  style: string;
}
interface State {
  fs: number;
  cw: number;
  ch: number;
  cols: number;
  rows: number;
  cells: Cell[];
  palette: string[];
  drawn: boolean;
}

/** A random fillStyle from the palette at a random brightness + alpha. */
function makeStyle(palette: string[], glow: number): string {
  const c = palette[(Math.random() * palette.length) | 0] ?? "139,92,246";
  const [r, g, b] = c.split(",").map((v) => parseInt(v, 10) || 0);
  const bright = 0.45 + Math.random() * 0.55;
  const alpha = (0.55 + Math.random() * 0.45) * glow;
  return `rgba(${(r * bright) | 0},${(g * bright) | 0},${(b * bright) | 0},${alpha})`;
}

const makeCell = (palette: string[], glow: number): Cell => ({
  ch: GLYPHS[(Math.random() * GLYPHS.length) | 0],
  style: makeStyle(palette, glow),
});

/**
 * Letter Glitch — a dense grid of monospace glyphs that continuously flip to
 * new letters and colors. Only the handful of cells that change each frame are
 * repainted (over a baked, vignetted backdrop), so the effect stays cheap even
 * at full-bleed sizes.
 */
export function LetterGlitch({
  className,
  colors = ["139,92,246", "34,211,238", "244,114,182"],
  fontSize = 18,
  glitchSpeed = 18,
  glow = 0.9,
  vignette = 0.7,
  children,
  ...props
}: LetterGlitchProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      const fs = Math.max(8, fontSize);
      const cw = Math.max(6, Math.round(fs * 0.8));
      const ch = Math.max(8, Math.round(fs * 1.1));
      const cols = Math.ceil(width / cw);
      const rows = Math.ceil(height / ch);
      const palette = colors.length ? colors : ["139,92,246"];
      const cells = Array.from({ length: cols * rows }, () => makeCell(palette, glow));
      return { fs, cw, ch, cols, rows, cells, palette, drawn: false };
    },
    draw: ({ ctx, width, height }, state, _t, dt) => {
      const { fs, cw, ch, cols, cells, palette } = state;
      const half = Math.hypot(width, height) / 2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${fs}px ui-monospace, SFMono-Regular, Menlo, monospace`;

      const paint = (idx: number) => {
        const x = (idx % cols) * cw;
        const y = ((idx / cols) | 0) * ch;
        const cx = x + cw / 2;
        const cy = y + ch / 2;
        const nd = Math.hypot(cx - width / 2, cy - height / 2) / half;
        const dark = 1 - vignette * Math.min(1, nd * nd);
        ctx.fillStyle = `rgb(${(11 * dark) | 0},${(12 * dark) | 0},${(20 * dark) | 0})`;
        ctx.fillRect(x, y, cw, ch);
        ctx.fillStyle = cells[idx].style;
        ctx.fillText(cells[idx].ch, cx, cy + 1);
      };

      // First frame (and after every resize): paint the whole grid once.
      if (!state.drawn) {
        for (let i = 0; i < cells.length; i++) paint(i);
        state.drawn = true;
        return;
      }

      // Steady state: mutate + repaint only a few cells.
      const total = cells.length;
      const k = Math.max(1, Math.round(total * (dt || 0.016) * (glitchSpeed / 50)));
      for (let n = 0; n < k; n++) {
        const idx = (Math.random() * total) | 0;
        cells[idx] = makeCell(palette, glow);
        paint(idx);
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
