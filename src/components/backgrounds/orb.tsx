"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface OrbProps extends HTMLAttributes<HTMLDivElement> {
  /** Base orb color as "r,g,b" — its hue drives the whole sphere. */
  color?: string;
  /** Orb size as a fraction of the frame's smaller side (0.4–1). */
  size?: number;
  /** Churn + spin speed multiplier (0 = frozen). */
  speed?: number;
  /** Outer corona glow strength (0–1). */
  glow?: number;
  /** How strongly the orb brightens, swells and hue-shifts toward the cursor (0–1). */
  hoverIntensity?: number;
  children?: ReactNode;
}

interface State {
  h: number; // base hue, 0..360
  s: number; // base saturation, 0..100
  hover: number; // eased hover factor, 0..1
  pointer: { x: number; y: number; inside: boolean };
}

/** Base hue + saturation of an "r,g,b" string (for HSL-driven shading). */
function baseHueSat(rgb: string): { h: number; s: number } {
  const [r, g, b] = rgb.split(",").map((v) => (parseInt(v, 10) || 0) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  // Fall back to a vivid saturation for (near-)gray inputs so the orb never
  // renders as a dead flat disc; pass a colored "r,g,b" to pin a specific hue.
  return { h, s: Math.min(100, Math.round(s * 100)) || 70 };
}

/**
 * Orb — a living plasma sphere: a hot core wrapped in orbiting, hue-shifting
 * light blobs behind a glassy rim, floating over a soft corona. The pointer
 * pulls a specular highlight across the surface and makes the whole orb
 * brighten, swell and drift its hue. Hue and saturation derive from `color`.
 */
export function Orb({
  className,
  color = "139,92,246",
  size = 0.72,
  speed = 1,
  glow = 0.7,
  hoverIntensity = 0.6,
  children,
  ...props
}: OrbProps) {
  const ref = useCanvas<State>({
    init: () => {
      const { h, s } = baseHueSat(color);
      return { h, s, hover: 0, pointer: { x: -9999, y: -9999, inside: false } };
    },
    draw: ({ ctx, width, height }, state, time, dt) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * speed;
      const cx = width / 2;
      const cy = height / 2;
      const R =
        Math.min(width, height) * 0.5 * Math.min(1, Math.max(0.4, size)) * 0.92;

      // Ease the hover factor toward its target (pointer proximity to center).
      let target = 0;
      if (state.pointer.inside) {
        const d = Math.hypot(state.pointer.x - cx, state.pointer.y - cy);
        target = Math.max(0, 1 - d / (R * 1.4));
      }
      // dt is 0 on the reduced-motion single frame; settle immediately then.
      const k = dt > 0 ? Math.min(1, dt * 6) : 1;
      state.hover += (target - state.hover) * k;
      const hv = state.hover * Math.min(1, Math.max(0, hoverIntensity));

      const baseH = state.h + Math.sin(t * 0.15) * 8 + hv * 50;
      const sat = state.s;
      const g = Math.min(1, Math.max(0, glow));

      // Gentle parallax toward the pointer.
      const ox = cx + (state.pointer.inside ? (state.pointer.x - cx) * 0.03 : 0);
      const oy = cy + (state.pointer.inside ? (state.pointer.y - cy) * 0.03 : 0);

      // Corona behind the orb.
      const corona = ctx.createRadialGradient(
        ox,
        oy,
        R * 0.4,
        ox,
        oy,
        R * (1.9 + hv),
      );
      corona.addColorStop(0, `hsla(${baseH},${sat}%,60%,${(0.28 + hv * 0.3) * g})`);
      corona.addColorStop(1, `hsla(${baseH},${sat}%,50%,0)`);
      ctx.fillStyle = corona;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.beginPath();
      ctx.arc(ox, oy, R, 0, Math.PI * 2);
      ctx.clip();

      // Body base gradient: hot offset core → base → dark rim.
      const body = ctx.createRadialGradient(
        ox - R * 0.2,
        oy - R * 0.25,
        R * 0.05,
        ox,
        oy,
        R,
      );
      body.addColorStop(0, `hsl(${baseH + 20},${sat}%,${72 + hv * 12}%)`);
      body.addColorStop(0.45, `hsl(${baseH},${sat}%,52%)`);
      body.addColorStop(1, `hsl(${baseH - 10},${Math.min(100, sat + 10)}%,16%)`);
      ctx.fillStyle = body;
      ctx.fillRect(ox - R, oy - R, R * 2, R * 2);

      // Orbiting plasma blobs (additive) give the surface its living churn.
      ctx.globalCompositeOperation = "lighter";
      const blobs = 5;
      for (let i = 0; i < blobs; i++) {
        const ang = t * (0.5 + i * 0.18) + (i * Math.PI * 2) / blobs;
        const rr = R * (0.28 + 0.34 * Math.sin(t * 0.6 + i));
        const bx = ox + Math.cos(ang) * rr;
        const by = oy + Math.sin(ang * 1.1) * rr;
        const br = R * (0.4 + 0.15 * Math.sin(t + i * 2));
        const hue = baseH + i * 26 - 40 + Math.sin(t * 0.4 + i) * 12;
        const gr = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        gr.addColorStop(0, `hsla(${hue},${sat}%,68%,${0.5 + hv * 0.2})`);
        gr.addColorStop(1, `hsla(${hue},${sat}%,55%,0)`);
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
      }

      // Specular highlight drifting toward the pointer (or idling up-left).
      const sa = state.pointer.inside
        ? Math.atan2(state.pointer.y - oy, state.pointer.x - ox)
        : -Math.PI / 2 + Math.sin(t * 0.3) * 0.4;
      const hx = ox + Math.cos(sa) * R * 0.5;
      const hy = oy + Math.sin(sa) * R * 0.5;
      const spec = ctx.createRadialGradient(hx, hy, 0, hx, hy, R * 0.7);
      spec.addColorStop(0, `hsla(${baseH + 30},100%,92%,${0.5 + hv * 0.35})`);
      spec.addColorStop(1, `hsla(${baseH + 30},100%,80%,0)`);
      ctx.fillStyle = spec;
      ctx.fillRect(ox - R, oy - R, R * 2, R * 2);
      ctx.globalCompositeOperation = "source-over";

      ctx.restore();

      // Glassy rim highlight.
      ctx.lineWidth = Math.max(1, R * 0.02);
      ctx.strokeStyle = `hsla(${baseH + 20},100%,85%,${0.4 + hv * 0.3})`;
      ctx.beginPath();
      ctx.arc(ox, oy, R, 0, Math.PI * 2);
      ctx.stroke();
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
