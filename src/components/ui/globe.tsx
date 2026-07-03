"use client";

import type { HTMLAttributes, PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { clamp, cn, seededRandom } from "@/lib/utils";

export interface GlobeProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of surface dots. */
  dots?: number;
  /** Dot radius in pixels. */
  dotSize?: number;
  /** Auto-rotation speed in degrees per second. */
  speed?: number;
  /** Axial tilt in degrees. */
  tilt?: number;
  /** Dot color as "r,g,b". */
  color?: string;
  /** Arc color as "r,g,b". */
  accent?: string;
  /** Number of animated connection arcs (0 disables). */
  arcs?: number;
  /** Soft atmosphere glow and rim light. */
  atmosphere?: boolean;
  /** Allow dragging to spin the globe. */
  draggable?: boolean;
  /** Accessible description of the visual. */
  label?: string;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface GlobeState {
  points: Vec3[];
  pairs: [Vec3, Vec3, number][];
}

const TAU = Math.PI * 2;

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = clamp(a.x * b.x + a.y * b.y + a.z * b.z, -1, 1);
  const omega = Math.acos(dot);
  if (omega < 1e-4) return a;
  const so = Math.sin(omega);
  // Antipodal endpoints: snap to the nearer end instead of dividing by ~0.
  if (so < 1e-4) return t < 0.5 ? a : b;
  const ka = Math.sin((1 - t) * omega) / so;
  const kb = Math.sin(t * omega) / so;
  return {
    x: ka * a.x + kb * b.x,
    y: ka * a.y + kb * b.y,
    z: ka * a.z + kb * b.z,
  };
}

/**
 * Globe — a dotted sphere rendered on canvas: points spread on a Fibonacci
 * lattice, auto-rotating with animated connection arcs, an atmosphere glow
 * and pointer drag to spin (with inertia). Pauses off-screen and renders a
 * single static frame under reduced motion (via the shared canvas loop).
 */
export function Globe({
  className,
  dots = 520,
  dotSize = 1.6,
  speed = 14,
  tilt = 18,
  color = "139,160,255",
  accent = "196,181,253",
  arcs = 6,
  atmosphere = true,
  draggable = true,
  label = "Rotating dotted globe",
  ...props
}: GlobeProps) {
  const view = useRef({ rotY: 0, vy: 0, dragging: false, lastX: 0 });

  const ref = useCanvas<GlobeState>({
    init: () => {
      const points: Vec3[] = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < dots; i++) {
        const y = 1 - (i / Math.max(1, dots - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = golden * i;
        points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
      }
      const pairs: [Vec3, Vec3, number][] = [];
      for (let i = 0; i < arcs; i++) {
        const a = points[Math.floor(seededRandom(i * 7 + 1) * points.length)];
        const b = points[Math.floor(seededRandom(i * 13 + 5) * points.length)];
        if (a && b && a !== b) pairs.push([a, b, seededRandom(i * 3 + 2)]);
      }
      return { points, pairs };
    },
    draw: ({ ctx, width, height }, state, t, dt) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.38;

      const v = view.current;
      if (!v.dragging) {
        v.rotY += ((speed * Math.PI) / 180) * dt;
        if (Math.abs(v.vy) > 0.0002) {
          v.rotY += v.vy;
          v.vy *= 0.94;
        }
      }

      const cosY = Math.cos(v.rotY);
      const sinY = Math.sin(v.rotY);
      const tiltRad = (tilt * Math.PI) / 180;
      const cosT = Math.cos(tiltRad);
      const sinT = Math.sin(tiltRad);

      const project = (p: Vec3) => {
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        return { sx: cx + x1 * R, sy: cy + y2 * R, depth: z2 };
      };

      if (atmosphere) {
        const glow = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.32);
        glow.addColorStop(0, `rgba(${color},0.14)`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.32, 0, TAU);
        ctx.fill();
        ctx.strokeStyle = `rgba(${color},0.28)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, TAU);
        ctx.stroke();
      }

      for (const p of state.points) {
        const { sx, sy, depth } = project(p);
        const facing = (depth + 1) / 2; // 0 back, 1 front
        ctx.fillStyle = `rgba(${color},${0.08 + facing * 0.72})`;
        const size = dotSize * (0.55 + facing * 0.45);
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, TAU);
        ctx.fill();
      }

      // Comet arcs: a bright window sweeps along each great-circle path.
      const SEGMENTS = 44;
      for (const [a, b, phase] of state.pairs) {
        const head = ((t * 0.22 + phase) % 1.3) - 0.15;
        const from = Math.max(0, head - 0.3);
        const to = Math.min(1, head);
        if (to <= from) continue;
        ctx.lineWidth = 1.4;
        let prev: { sx: number; sy: number; depth: number } | null = null;
        for (let i = 0; i <= SEGMENTS; i++) {
          const u = from + ((to - from) * i) / SEGMENTS;
          const raw = slerp(a, b, u);
          const lift = 1 + 0.28 * Math.sin(Math.PI * u);
          const point = project({ x: raw.x * lift, y: raw.y * lift, z: raw.z * lift });
          if (prev) {
            const fade = i / SEGMENTS; // brighter toward the head
            const facing = (Math.max(prev.depth, point.depth) + 1) / 2;
            ctx.strokeStyle = `rgba(${accent},${(0.08 + 0.55 * fade) * (0.25 + 0.75 * facing)})`;
            ctx.beginPath();
            ctx.moveTo(prev.sx, prev.sy);
            ctx.lineTo(point.sx, point.sy);
            ctx.stroke();
          }
          prev = point;
        }
        if (prev && to < 1) {
          const facing = (prev.depth + 1) / 2;
          ctx.fillStyle = `rgba(${accent},${0.3 + 0.6 * facing})`;
          ctx.beginPath();
          ctx.arc(prev.sx, prev.sy, 1.8, 0, TAU);
          ctx.fill();
        }
      }
    },
  });

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    const v = view.current;
    v.dragging = true;
    v.vy = 0;
    v.lastX = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const v = view.current;
    if (!v.dragging) return;
    const dx = e.clientX - v.lastX;
    v.lastX = e.clientX;
    v.rotY += dx * 0.005;
    v.vy = dx * 0.005;
  };
  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    view.current.dragging = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      role="img"
      aria-label={label}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        "relative overflow-hidden",
        draggable && "cursor-grab touch-none active:cursor-grabbing",
        className,
      )}
      {...props}
    >
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </div>
  );
}
