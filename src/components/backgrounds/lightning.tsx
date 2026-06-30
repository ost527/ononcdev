"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCanvas } from "@/lib/use-canvas";
import { cn } from "@/lib/utils";

export interface LightningProps extends HTMLAttributes<HTMLDivElement> {
  /** Bolt glow color as "r,g,b". */
  color?: string;
  children?: ReactNode;
}

type Point = [number, number];

interface Bolt {
  segs: Point[][];
  life: number;
  max: number;
}

interface State {
  bolts: Bolt[];
  timer: number;
}

function jaggedLine(x1: number, y1: number, x2: number, y2: number): Point[] {
  let pts: Point[] = [
    [x1, y1],
    [x2, y2],
  ];
  let disp = Math.hypot(x2 - x1, y2 - y1) * 0.16;
  for (let i = 0; i < 6; i++) {
    const next: Point[] = [];
    for (let j = 0; j < pts.length - 1; j++) {
      const [ax, ay] = pts[j];
      const [bx, by] = pts[j + 1];
      next.push([ax, ay]);
      const dx = bx - ax;
      const dy = by - ay;
      const len = Math.hypot(dx, dy) || 1;
      const off = (Math.random() - 0.5) * disp;
      next.push([(ax + bx) / 2 + (-dy / len) * off, (ay + by) / 2 + (dx / len) * off]);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
    disp *= 0.52;
  }
  return pts;
}

function makeBolt(w: number, h: number): Point[][] {
  const x1 = Math.random() * w;
  const main = jaggedLine(x1, -10, x1 + (Math.random() - 0.5) * w * 0.4, h + 10);
  const segs = [main];
  const branches = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < branches; i++) {
    const p = main[Math.floor(main.length * (0.25 + Math.random() * 0.5))];
    if (!p) continue;
    segs.push(
      jaggedLine(
        p[0],
        p[1],
        p[0] + (Math.random() - 0.5) * w * 0.3,
        Math.min(h, p[1] + Math.random() * h * 0.35),
      ),
    );
  }
  return segs;
}

export function Lightning({
  className,
  color = "150,170,255",
  children,
  ...props
}: LightningProps) {
  const ref = useCanvas<State>({
    init: () => ({ bolts: [], timer: 0.4 }),
    draw: ({ ctx, width, height }, state, _t, dt) => {
      ctx.clearRect(0, 0, width, height);

      state.timer -= dt;
      if (state.timer <= 0) {
        state.bolts.push({ segs: makeBolt(width, height), life: 0.45, max: 0.45 });
        state.timer = 0.5 + Math.random() * 1.7;
      }

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const bolt of state.bolts) {
        bolt.life -= dt;
        const a = Math.max(0, bolt.life / bolt.max) * (0.55 + Math.random() * 0.45);
        for (const seg of bolt.segs) {
          ctx.beginPath();
          ctx.moveTo(seg[0][0], seg[0][1]);
          for (let i = 1; i < seg.length; i++) ctx.lineTo(seg[i][0], seg[i][1]);
          ctx.strokeStyle = `rgba(${color},${a * 0.18})`;
          ctx.lineWidth = 7;
          ctx.stroke();
          ctx.strokeStyle = `rgba(235,240,255,${a})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = "source-over";
      state.bolts = state.bolts.filter((b) => b.life > 0);
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
