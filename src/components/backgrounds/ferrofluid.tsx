"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface FerrofluidProps extends HTMLAttributes<HTMLDivElement> {
  /** Body color of the fluid, as an "r,g,b" triplet. */
  color?: string;
  /** Specular / rim highlight color that gives the liquid-metal sheen, "r,g,b". */
  highlight?: string;
  /** Number of magnetic spikes that grow out of the core (radial arms). */
  spikes?: number;
  /** How far the spikes reach past the core, as a fraction of its radius (0–1.5). */
  spikeLength?: number;
  /** Free droplets that orbit and merge back into the mass. */
  droplets?: number;
  /** Core radius as a fraction of the smaller canvas edge (0.1–0.4). */
  coreSize?: number;
  /**
   * Surface tension of the metaball merge (iso threshold). Lower fuses blobs
   * from farther apart (rounder, gooier); higher keeps them tight and spiky.
   */
  threshold?: number;
  /** Spike breathing amount — how much each spike pulses in and out (0–1). */
  wobble?: number;
  /** Master animation speed multiplier (0 = frozen). */
  speed?: number;
  /** Rotation of the spike crown, in turns per second (can be negative). */
  spin?: number;
  /** Outer glow / bloom intensity around the silhouette (0–1). */
  glow?: number;
  /** Strength of the top-lit specular sheen on the body (0–1). */
  sheen?: number;
  /** Whether the fluid is drawn toward the pointer like a magnet. */
  pointerReactive?: boolean;
  /** How hard the mass leans toward the pointer (0–1). */
  magnetStrength?: number;
  /** Pointer distance (px) within which the fluid reaches out a tendril. */
  magnetReach?: number;
  children?: ReactNode;
}

/** A metaball charge: center + squared radius (the field's numerator). */
interface Ball {
  x: number;
  y: number;
  /** Effective radius; the field contribution is r² / d². */
  r: number;
}

interface State {
  /** Grid cell size in CSS px (adaptive to canvas size, perf-bounded). */
  cell: number;
  cols: number;
  rows: number;
  /** Scalar field sampled at every grid vertex: length (cols+1)*(rows+1). */
  field: Float32Array;
  /** Reusable ball buffer, refilled analytically each frame. */
  balls: Ball[];
  /** Per-spike phase offsets so the crown breathes irregularly. */
  seeds: number[];
  pointer: { x: number; y: number; inside: boolean };
  /** Eased pointer position + presence for smooth magnet response. */
  ease: { x: number; y: number; on: number };
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function Ferrofluid({
  className,
  color = "142,116,255",
  highlight = "186,230,255",
  spikes = 9,
  spikeLength = 0.55,
  droplets = 4,
  coreSize = 0.22,
  threshold = 1,
  wobble = 0.6,
  speed = 1,
  spin = 0.12,
  glow = 0.55,
  sheen = 0.6,
  pointerReactive = true,
  magnetStrength = 0.6,
  magnetReach = 260,
  children,
  ...props
}: FerrofluidProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => {
      // Adaptive resolution: finer grid on small canvases, capped so a large
      // hero stays well within a 60fps budget (~cols*rows vertices/frame).
      const cell = Math.max(7, Math.min(15, Math.round(Math.min(width, height) / 46)));
      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      const seeds = Array.from({ length: 64 }, (_, i) => {
        const v = Math.sin(i * 12.9898) * 43758.5453;
        return v - Math.floor(v); // deterministic fract in [0,1)
      });
      return {
        cell,
        cols,
        rows,
        field: new Float32Array((cols + 1) * (rows + 1)),
        balls: [],
        seeds,
        pointer: { x: -9999, y: -9999, inside: false },
        ease: { x: width / 2, y: height / 2, on: 0 },
      };
    },
    draw: ({ ctx, width, height }, state, time, dt) => {
      ctx.clearRect(0, 0, width, height);

      const t = time * speed;
      const { cell, cols, rows, field, seeds, pointer, ease } = state;

      // --- Smoothly ease pointer presence + position (magnet feels liquid) ---
      const k = Math.min(1, (dt || 0.016) * 6);
      const targetOn = pointerReactive && pointer.inside ? 1 : 0;
      ease.on += (targetOn - ease.on) * k;
      if (pointer.inside) {
        ease.x += (pointer.x - ease.x) * k;
        ease.y += (pointer.y - ease.y) * k;
      }

      // --- Compose the charges that define the fluid this frame ---
      const base = Math.min(width, height) * clamp01(coreSize / 0.4) * 0.4;
      const coreR = Math.max(28, base);

      // Core leans toward the pointer within reach, like iron filings pulled up.
      let cx = width / 2 + Math.sin(t * 0.3) * width * 0.04;
      let cy = height / 2 + Math.cos(t * 0.26) * height * 0.05;
      let pull = 0;
      if (ease.on > 0.001) {
        const pdx = ease.x - cx;
        const pdy = ease.y - cy;
        const pd = Math.hypot(pdx, pdy) || 1;
        pull = clamp01(1 - pd / magnetReach) * ease.on;
        const lean = 0.28 * magnetStrength * pull;
        cx += pdx * lean;
        cy += pdy * lean;
      }

      const balls = state.balls;
      balls.length = 0;
      balls.push({ x: cx, y: cy, r: coreR });

      // Magnetic spikes: a crown of small charges that breathe outward from the
      // core. As a spike extends it pulls the iso-surface into a sharp tendril.
      const nSpikes = Math.max(0, Math.round(spikes));
      for (let i = 0; i < nSpikes; i++) {
        const ang =
          (i / nSpikes) * Math.PI * 2 +
          spin * t * Math.PI * 2 +
          0.12 * Math.sin(t * 0.5 + i);
        const s = seeds[i % seeds.length];
        const osc = 0.5 + 0.5 * Math.sin(t * (1.1 + s * 0.8) + i * 1.7);
        const reach = 0.78 + spikeLength * (0.3 + 0.7 * (1 - wobble + wobble * osc));
        const d = coreR * reach;
        balls.push({
          x: cx + Math.cos(ang) * d,
          y: cy + Math.sin(ang) * d,
          r: coreR * (0.3 + 0.05 * Math.sin(t + i)),
        });
      }

      // Free droplets orbit the mass and periodically fuse back in.
      const nDrops = Math.max(0, Math.round(droplets));
      for (let j = 0; j < nDrops; j++) {
        const s = seeds[(j * 7 + 3) % seeds.length];
        const orbit = coreR * (1.35 + 0.55 * j + 0.2 * Math.sin(t * 0.6 + j));
        const ang = t * (0.35 + 0.12 * j) * (j % 2 ? -1 : 1) + j * 2.4 + s * 6.28;
        balls.push({
          x: cx + Math.cos(ang) * orbit,
          y: cy + Math.sin(ang) * orbit * 0.82,
          r: coreR * (0.22 + 0.12 * s),
        });
      }

      // The pointer draws a tendril of fluid toward itself and can pinch off a
      // droplet at the cursor — the signature ferrofluid-meets-magnet moment.
      if (pull > 0.001) {
        balls.push({
          x: cx + (ease.x - cx) * 0.58,
          y: cy + (ease.y - cy) * 0.58,
          r: coreR * (0.28 + 0.4 * pull),
        });
        balls.push({ x: ease.x, y: ease.y, r: coreR * 0.24 * pull });
      }

      // --- Sample the metaball field at every grid vertex ---
      // field(x,y) = Σ rᵢ² / (dx² + dy² + ε); iso-surface is field = threshold.
      const iso = Math.max(0.3, threshold);
      for (let gy = 0; gy <= rows; gy++) {
        const py = gy * cell;
        const rowOff = gy * (cols + 1);
        for (let gx = 0; gx <= cols; gx++) {
          const px = gx * cell;
          let sum = 0;
          for (let b = 0; b < balls.length; b++) {
            const ball = balls[b];
            const dx = px - ball.x;
            const dy = py - ball.y;
            sum += (ball.r * ball.r) / (dx * dx + dy * dy + 40);
          }
          field[rowOff + gx] = sum;
        }
      }

      // --- March the grid into a single fillable silhouette path ---
      // Each cell contributes the polygon of its interior (the square clipped by
      // the iso line); adjacent cells share identical edge crossings, so their
      // union tiles seamlessly into one crisp fluid body with a single fill().
      const body = new Path2D();
      const lerp = (a: number, b: number, fa: number, fb: number) =>
        a + ((iso - fa) / (fb - fa)) * (b - a);

      for (let gy = 0; gy < rows; gy++) {
        const top = gy * cell;
        const bottom = top + cell;
        const r0 = gy * (cols + 1);
        const r1 = r0 + (cols + 1);
        for (let gx = 0; gx < cols; gx++) {
          const left = gx * cell;
          const right = left + cell;
          const tl = field[r0 + gx];
          const tr = field[r0 + gx + 1];
          const br = field[r1 + gx + 1];
          const bl = field[r1 + gx];

          const code =
            (tl >= iso ? 8 : 0) | (tr >= iso ? 4 : 0) | (br >= iso ? 2 : 0) | (bl >= iso ? 1 : 0);
          if (code === 0) continue; // wholly outside

          if (code === 15) {
            // wholly inside — emit the full cell
            body.moveTo(left, top);
            body.lineTo(right, top);
            body.lineTo(right, bottom);
            body.lineTo(left, bottom);
            body.closePath();
            continue;
          }

          // Walk the cell perimeter (TL → top → TR → right → BR → bottom → BL →
          // left), emitting inside corners and every iso crossing in order.
          const poly: number[] = [];
          if (tl >= iso) poly.push(left, top);
          if ((tl >= iso) !== (tr >= iso)) poly.push(lerp(left, right, tl, tr), top);
          if (tr >= iso) poly.push(right, top);
          if ((tr >= iso) !== (br >= iso)) poly.push(right, lerp(top, bottom, tr, br));
          if (br >= iso) poly.push(right, bottom);
          if ((br >= iso) !== (bl >= iso)) poly.push(lerp(right, left, br, bl), bottom);
          if (bl >= iso) poly.push(left, bottom);
          if ((bl >= iso) !== (tl >= iso)) poly.push(left, lerp(bottom, top, bl, tl));

          if (poly.length >= 6) {
            body.moveTo(poly[0], poly[1]);
            for (let p = 2; p < poly.length; p += 2) body.lineTo(poly[p], poly[p + 1]);
            body.closePath();
          }
        }
      }

      // --- Paint the body: glow halo → liquid-metal fill → specular sheen ---
      const gRadius = Math.hypot(width, height);

      // Colored bloom around the silhouette.
      if (glow > 0.001) {
        ctx.save();
        ctx.shadowColor = `rgba(${color},${0.9 * glow})`;
        ctx.shadowBlur = 18 + 34 * glow;
        ctx.fillStyle = `rgba(${color},0.55)`;
        ctx.fill(body);
        ctx.fill(body); // second pass deepens the bloom
        ctx.restore();
      }

      // Vertical liquid-metal gradient — brighter crown, deep base.
      const grad = ctx.createLinearGradient(0, cy - coreR * 1.6, 0, cy + coreR * 1.8);
      grad.addColorStop(0, `rgba(${color},0.98)`);
      grad.addColorStop(0.55, `rgba(${color},0.88)`);
      grad.addColorStop(1, "rgba(4,5,12,0.94)"); // deep near-black base
      ctx.fillStyle = grad;
      ctx.fill(body);

      // Clip to the fluid and lay in the top-lit specular highlight + rim.
      if (sheen > 0.001) {
        ctx.save();
        ctx.clip(body);
        ctx.globalCompositeOperation = "lighter";

        const spec = ctx.createRadialGradient(
          cx - coreR * 0.35,
          cy - coreR * 0.7,
          0,
          cx - coreR * 0.35,
          cy - coreR * 0.7,
          coreR * 1.8,
        );
        spec.addColorStop(0, `rgba(${highlight},${0.5 * sheen})`);
        spec.addColorStop(0.4, `rgba(${highlight},${0.14 * sheen})`);
        spec.addColorStop(1, `rgba(${highlight},0)`);
        ctx.fillStyle = spec;
        ctx.fillRect(0, 0, width, height);

        // A soft global sheen sweep for the metallic read.
        const sweep = ctx.createLinearGradient(cx - gRadius, cy - gRadius, cx + gRadius, cy + gRadius);
        const phase = 0.5 + 0.5 * Math.sin(t * 0.4);
        sweep.addColorStop(clamp01(phase - 0.12), "rgba(255,255,255,0)");
        sweep.addColorStop(clamp01(phase), `rgba(${highlight},${0.16 * sheen})`);
        sweep.addColorStop(clamp01(phase + 0.12), "rgba(255,255,255,0)");
        ctx.fillStyle = sweep;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
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
