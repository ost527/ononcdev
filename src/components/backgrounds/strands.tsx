"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface StrandsProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of flowing strands in the bundle. */
  count?: number;
  /** Strand colors as "r,g,b", blended across the bundle from top to bottom. */
  colors?: string[];
  /** Flow speed multiplier (0 = frozen). */
  speed?: number;
  /** Wave height multiplier (0–2). */
  amplitude?: number;
  /** Strand thickness multiplier. */
  thickness?: number;
  /** Additive glow strength (0–1). */
  glow?: number;
  /** How strongly the cursor parts the strands as it passes (0–2). */
  pointerPull?: number;
  children?: ReactNode;
}

type Rgb = [number, number, number];

interface Strand {
  /** Base vertical position as a fraction of height (0–1). */
  y: number;
  /** Depth, 0 = far (thin, dim, slow) … 1 = near (thick, bright, fast). */
  z: number;
  k1: number;
  k2: number;
  p1: number;
  p2: number;
  s1: number;
  s2: number;
  /** Base amplitude as a fraction of height. */
  amp: number;
  color: Rgb;
}

interface State {
  strands: Strand[];
  pointer: { x: number; y: number; inside: boolean };
  /** Eased pointer position + engagement (k) so combing glides in and out. */
  ease: { x: number; y: number; k: number };
}

const parse = (value: string): Rgb => {
  const p = value.split(",").map((v) => parseInt(v, 10) || 0);
  return [p[0] ?? 0, p[1] ?? 0, p[2] ?? 0];
};

/** Sample a colour palette at position `p` in [0,1], linear between stops. */
function paletteAt(stops: Rgb[], p: number): Rgb {
  if (stops.length === 1) return stops[0];
  const x = Math.min(0.999999, Math.max(0, p)) * (stops.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = stops[i];
  const b = stops[Math.min(stops.length - 1, i + 1)];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

/** Stable, seedless hash in [0,1] so the bundle is identical across remounts. */
const hash = (n: number): number => {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Strands — a luminous bundle of fine threads that flow like windblown hair or
 * an aurora curtain. Each strand is a superposition of two travelling sine
 * waves; a per-strand depth drives its thickness, opacity and speed for a sense
 * of parallax, and the cursor gently parts the strands it passes through.
 */
export function Strands({
  className,
  count = 24,
  colors = ["139,92,246", "34,211,238", "251,113,133"],
  speed = 1,
  amplitude = 1,
  thickness = 1,
  glow = 0.6,
  pointerPull = 1,
  children,
  ...props
}: StrandsProps) {
  const ref = useCanvas<State>({
    init: () => {
      const stops = (colors.length ? colors : ["139,160,255"]).map(parse);
      const cnt = Math.max(1, Math.round(count));
      const strands: Strand[] = [];
      for (let i = 0; i < cnt; i++) {
        const f = cnt === 1 ? 0.5 : i / (cnt - 1);
        const ha = hash(i * 1.7 + 0.5);
        const hb = hash(i * 3.1 + 1.2);
        const hy = hash(i * 0.7 + 4.4);
        strands.push({
          y: 0.12 + f * 0.76 + (hy - 0.5) * 0.05,
          z: 0.15 + hb * 0.85,
          k1: (1.5 + ha * 2) / 520,
          k2: (3 + hb * 4) / 520,
          p1: i * 0.7 + ha * 6.283,
          p2: i * 1.3 + hb * 6.283,
          s1: 0.25 + ha * 0.45,
          s2: 0.4 + hb * 0.55,
          amp: 0.03 + ha * 0.05,
          color: paletteAt(stops, f),
        });
      }
      // Draw far strands first so near ones layer on top.
      strands.sort((a, b) => a.z - b.z);
      return {
        strands,
        pointer: { x: -9999, y: -9999, inside: false },
        ease: { x: -9999, y: -9999, k: 0 },
      };
    },
    draw: ({ ctx, width, height }, state, time, dt) => {
      const t = time * speed;
      ctx.clearRect(0, 0, width, height);

      // Ease the cursor and its engagement so combing glides rather than snaps.
      const { ease, pointer } = state;
      const posLerp = dt > 0 ? Math.min(1, dt * 6) : 1;
      const kLerp = dt > 0 ? Math.min(1, dt * 4) : 1;
      ease.x += (pointer.x - ease.x) * posLerp;
      ease.y += (pointer.y - ease.y) * posLerp;
      ease.k += ((pointer.inside ? 1 : 0) - ease.k) * kLerp;

      const pull = pointerPull * ease.k;
      const reach = Math.max(90, Math.min(width, height) * 0.5);
      const reach2 = reach * reach;
      const g = Math.max(0, Math.min(1, glow));
      const stepX = 8;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "lighter";

      for (const st of state.strands) {
        const depth = 0.35 + 0.65 * st.z;
        const ampPx = st.amp * height * amplitude * (0.5 + st.z);
        const baseY = st.y * height;

        ctx.beginPath();
        for (let x = -stepX; x <= width + stepX; x += stepX) {
          let y =
            baseY +
            Math.sin(x * st.k1 + t * st.s1 + st.p1) * ampPx +
            Math.sin(x * st.k2 - t * st.s2 + st.p2) * ampPx * 0.5;
          if (pull > 0) {
            const dx = x - ease.x;
            const dy = y - ease.y;
            const fall = Math.exp(-(dx * dx + dy * dy) / reach2);
            // Push the strand away from the cursor along the vertical axis.
            y += Math.sign(dy || 1) * fall * reach * 0.5 * pull * depth;
          }
          if (x <= -stepX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const [r, gc, b] = st.color;
        const w = (0.6 + st.z * 2.6) * thickness;
        if (g > 0) {
          ctx.strokeStyle = `rgba(${r | 0},${gc | 0},${b | 0},${0.13 * g * depth})`;
          ctx.lineWidth = w * 4;
          ctx.stroke();
        }
        ctx.strokeStyle = `rgba(${r | 0},${gc | 0},${b | 0},${0.24 + 0.5 * st.z})`;
        ctx.lineWidth = w;
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
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
