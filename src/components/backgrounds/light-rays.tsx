"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { clamp, cn } from "@/lib/utils";

export type LightRaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "left"
  | "right"
  | "bottom-center"
  | "bottom-left"
  | "bottom-right";

export interface LightRaysProps extends HTMLAttributes<HTMLDivElement> {
  /** Which edge the rays stream from (the source sits just past it). */
  origin?: LightRaysOrigin;
  /** Ray tint as "r,g,b" (white lets the built-in blue-weighted falloff show). */
  color?: string;
  /** Animation speed multiplier (0 = frozen). */
  speed?: number;
  /** Beam tightness — lower is a tighter, more focused cone. */
  lightSpread?: number;
  /** How far the rays reach, as a multiple of the width. */
  rayLength?: number;
  /** Gently pulse the whole beam. */
  pulsating?: boolean;
  /** Distance over which rays fade out, as a multiple of the width. */
  fadeDistance?: number;
  /** Colour saturation (0 = greyscale, 1 = full). */
  saturation?: number;
  /** Bend the rays toward the cursor. */
  followMouse?: boolean;
  /** How strongly the cursor bends the rays (0–1). */
  mouseInfluence?: number;
  /** Amount of animated grain mixed into the rays (0–1). */
  noiseAmount?: number;
  /** Warp the rays with a travelling wobble (0–1). */
  distortion?: number;
  /** Canvas shading cell size in px (smaller = smoother, heavier). */
  detail?: number;
  children?: ReactNode;
}

interface State {
  mouse: { x: number; y: number };
  smooth: { x: number; y: number };
}

/** Deepest surface token (#06070d) the rays glow additively over. */
const BG: [number, number, number] = [6 / 255, 7 / 255, 13 / 255];

/** Parse an "r,g,b" string to a 0–1 triplet (defaults to white). */
function parseRgb01(s: string): [number, number, number] {
  const p = s.split(",").map((v) => (parseInt(v, 10) || 0) / 255);
  return [p[0] ?? 1, p[1] ?? 1, p[2] ?? 1];
}

/**
 * Source anchor + unit direction for each origin, in top-left / y-down space
 * (the source sits 20% outside the frame). Mirrors the reference shader.
 */
function anchorDir(o: LightRaysOrigin, w: number, h: number) {
  const out = 0.2;
  switch (o) {
    case "top-left":
      return { ax: 0, ay: -out * h, dx: 0, dy: 1 };
    case "top-right":
      return { ax: w, ay: -out * h, dx: 0, dy: 1 };
    case "left":
      return { ax: -out * w, ay: 0.5 * h, dx: 1, dy: 0 };
    case "right":
      return { ax: (1 + out) * w, ay: 0.5 * h, dx: -1, dy: 0 };
    case "bottom-left":
      return { ax: 0, ay: (1 + out) * h, dx: 0, dy: -1 };
    case "bottom-center":
      return { ax: 0.5 * w, ay: (1 + out) * h, dx: 0, dy: -1 };
    case "bottom-right":
      return { ax: w, ay: (1 + out) * h, dx: 0, dy: -1 };
    case "top-center":
    default:
      return { ax: 0.5 * w, ay: -out * h, dx: 0, dy: 1 };
  }
}

/**
 * LightRays — volumetric shafts of light streaming from an off-screen source.
 * A faithful port of the classic god-ray shader to a 2D canvas: two layered
 * angular ray fields (spread controlled by `lightSpread`) with distance +
 * fade falloff, an optional pulse, animated noise, a travelling distortion,
 * and a blue-weighted vertical brightness ramp, tinted by `color`. The bundle
 * can bend toward the cursor. Renders one static frame under reduced motion.
 */
export function LightRays({
  className,
  origin = "top-center",
  color = "255,255,255",
  speed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  detail = 8,
  children,
  ...props
}: LightRaysProps) {
  const ref = useCanvas<State>({
    init: ({ width, height }) => ({
      mouse: { x: width / 2, y: height / 2 },
      smooth: { x: width / 2, y: height / 2 },
    }),
    draw: ({ ctx, width, height }, state, time, dt) => {
      const iTime = time;
      const step = clamp(Math.round(detail), 4, 16);
      const [cr, cg, cb] = parseRgb01(color);
      const { ax, ay, dx, dy } = anchorDir(origin, width, height);

      // Ease the (global) pointer toward the beam, matching the reference feel.
      let fdx = dx;
      let fdy = dy;
      if (followMouse && mouseInfluence > 0) {
        const k = dt > 0 ? 0.08 : 1;
        state.smooth.x += (state.mouse.x - state.smooth.x) * k;
        state.smooth.y += (state.mouse.y - state.smooth.y) * k;
        const mdx = state.smooth.x - ax;
        const mdy = state.smooth.y - ay;
        const ml = Math.hypot(mdx, mdy) || 1e-4;
        const mx = dx + (mdx / ml - dx) * mouseInfluence;
        const my = dy + (mdy / ml - dy) * mouseInfluence;
        const l = Math.hypot(mx, my) || 1e-4;
        fdx = mx / l;
        fdy = my / l;
      }

      const sp1 = 1.5 * speed;
      const sp2 = 1.1 * speed;
      const p1 = pulsating ? 0.8 + 0.2 * Math.sin(iTime * sp1 * 3) : 1;
      const p2 = pulsating ? 0.8 + 0.2 * Math.sin(iTime * sp2 * 3) : 1;
      const invSpread = 1 / Math.max(lightSpread, 0.001);
      const maxDist = width * rayLength;
      const fadeD = width * fadeDistance;
      const wob = distortion * 0.2;

      for (let y = 0; y < height; y += step) {
        // Blue-weighted vertical brightness ramp (brighter toward the top).
        const bright = 1 - y / height;
        const gR = 0.1 + bright * 0.8;
        const gG = 0.3 + bright * 0.6;
        const gB = 0.5 + bright * 0.5;

        for (let x = 0; x < width; x += step) {
          const sx = x - ax;
          const sy = y - ay;
          const dist = Math.sqrt(sx * sx + sy * sy) || 1e-4;
          const cosA = (sx / dist) * fdx + (sy / dist) * fdy;
          const distorted =
            wob > 0 ? cosA + wob * Math.sin(iTime * 2 + dist * 0.01) : cosA;

          let R = BG[0];
          let G = BG[1];
          let B = BG[2];

          if (distorted > 0) {
            const spread = Math.pow(distorted, invSpread);
            const lenFall = clamp((maxDist - dist) / maxDist, 0, 1);
            const fadeFall = clamp((fadeD - dist) / fadeD, 0.5, 1);
            const common = spread * lenFall * fadeFall;

            const s1 =
              clamp(
                0.45 +
                  0.15 * Math.sin(distorted * 36.2214 + iTime * sp1) +
                  0.3 +
                  0.2 * Math.cos(-distorted * 21.11349 + iTime * sp1),
                0,
                1,
              ) * p1;
            const s2 =
              clamp(
                0.45 +
                  0.15 * Math.sin(distorted * 22.3991 + iTime * sp2) +
                  0.3 +
                  0.2 * Math.cos(-distorted * 18.0234 + iTime * sp2),
                0,
                1,
              ) * p2;

            let frag = (s1 * 0.5 + s2 * 0.4) * common;
            if (noiseAmount > 0) {
              const d = (x * 0.01 + iTime * 0.1) * 12.9898 + (y * 0.01 + iTime * 0.1) * 78.233;
              const nv = Math.sin(d) * 43758.5453123;
              const n = nv - Math.floor(nv);
              frag *= 1 - noiseAmount + noiseAmount * n;
            }

            let lr = frag * gR;
            let lg = frag * gG;
            let lb = frag * gB;
            if (saturation !== 1) {
              const gray = 0.299 * lr + 0.587 * lg + 0.114 * lb;
              lr = gray + (lr - gray) * saturation;
              lg = gray + (lg - gray) * saturation;
              lb = gray + (lb - gray) * saturation;
            }
            R = Math.min(1, BG[0] + lr * cr);
            G = Math.min(1, BG[1] + lg * cg);
            B = Math.min(1, BG[2] + lb * cb);
          }

          ctx.fillStyle = `rgb(${(R * 255) | 0},${(G * 255) | 0},${(B * 255) | 0})`;
          ctx.fillRect(x, y, step + 1, step + 1);
        }
      }
    },
    onPointer: (state, x, y) => {
      // Keep the last real position when the pointer leaves the canvas.
      if (x < -9000) return;
      state.mouse.x = x;
      state.mouse.y = y;
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
