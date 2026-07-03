"use client";

import type { KeyboardEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface InfiniteGalleryProps {
  /** Tile faces, cycled across the wall. Defaults to a built-in gradient set. */
  items?: ReactNode[];
  /** Tile size in pixels. */
  tileWidth?: number;
  tileHeight?: number;
  /** Gap between tiles in pixels. */
  gap?: number;
  /** Base grid shape; the wall tiles it infinitely in both directions. */
  cols?: number;
  rows?: number;
  /** Idle drift speed in px/s (0 disables). */
  speed?: number;
  /** Idle drift direction in degrees (0 = right, 90 = down). */
  angle?: number;
  /** Inertia decay per frame after release (0–0.99). */
  friction?: number;
  /** Tile corner radius in pixels. */
  radius?: number;
  /** Scale tiles up slightly on hover. */
  hoverLift?: boolean;
  /** Accessible name for the pannable region. */
  label?: string;
  className?: string;
}

const DEFAULT_TILES = [
  "linear-gradient(135deg, #7c3aed, #4f46e5)",
  "linear-gradient(135deg, #0ea5e9, #22d3ee)",
  "linear-gradient(135deg, #f43f5e, #fb923c)",
  "linear-gradient(135deg, #10b981, #84cc16)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #06b6d4, #8b5cf6)",
  "linear-gradient(135deg, #ec4899, #a855f7)",
  "linear-gradient(135deg, #14b8a6, #0ea5e9)",
  "linear-gradient(135deg, #6366f1, #ec4899)",
  "linear-gradient(135deg, #84cc16, #14b8a6)",
  "linear-gradient(135deg, #fb7185, #7c3aed)",
  "linear-gradient(135deg, #22d3ee, #10b981)",
].map((background, i) => (
  <div
    key={i}
    className="flex h-full w-full items-end p-3"
    style={{ background }}
  >
    <span className="rounded-full bg-black/30 px-2 py-0.5 font-mono text-[10px] text-white/90">
      {String(i + 1).padStart(2, "0")}
    </span>
  </div>
));

/**
 * InfiniteGallery — a wall of tiles you can grab and throw in any direction;
 * it wraps seamlessly forever and drifts slowly while idle. Also pannable
 * with the arrow keys. Position is written to a transform inside rAF, so
 * panning never re-renders; drift and inertia are disabled for
 * reduced-motion users.
 */
export function InfiniteGallery({
  items = DEFAULT_TILES,
  tileWidth = 168,
  tileHeight = 112,
  gap = 12,
  cols = 4,
  rows = 3,
  speed = 24,
  angle = 135,
  friction = 0.92,
  radius = 14,
  hoverLift = true,
  label = "Infinite gallery",
  className,
}: InfiniteGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState({ x: 2, y: 2 });

  const blockW = cols * (tileWidth + gap);
  const blockH = rows * (tileHeight + gap);

  const sim = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    vx: 0,
    vy: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  // Enough block copies that the wall always overflows the container.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () =>
      setCopies({
        x: Math.max(2, Math.ceil(el.clientWidth / blockW) + 1),
        y: Math.max(2, Math.ceil(el.clientHeight / blockH) + 1),
      });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [blockW, blockH]);

  useEffect(() => {
    const container = containerRef.current;
    const plane = planeRef.current;
    if (!container || !plane) return;

    const reduce = prefersReducedMotion();
    const rad = (angle * Math.PI) / 180;
    let raf = 0;
    let running = false;
    let last = 0;

    const apply = () => {
      const s = sim.current;
      const wx = ((s.x % blockW) - blockW) % blockW;
      const wy = ((s.y % blockH) - blockH) % blockH;
      plane.style.transform = `translate3d(${wx}px, ${wy}px, 0)`;
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const s = sim.current;

      if (!s.dragging) {
        if (!reduce && speed > 0) {
          s.tx += Math.cos(rad) * speed * dt;
          s.ty += Math.sin(rad) * speed * dt;
        }
        if (!reduce && (Math.abs(s.vx) > 0.1 || Math.abs(s.vy) > 0.1)) {
          s.tx += s.vx;
          s.ty += s.vy;
          s.vx *= friction;
          s.vy *= friction;
        }
      }

      const ease = reduce || s.dragging ? 1 : 0.16;
      s.x += (s.tx - s.x) * ease;
      s.y += (s.ty - s.y) * ease;
      apply();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if ((entries[0]?.isIntersecting ?? false) && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(container);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    apply();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [blockW, blockH, speed, angle, friction]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = sim.current;
    s.dragging = true;
    s.vx = 0;
    s.vy = 0;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = sim.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.tx += dx;
    s.ty += dy;
    s.vx = dx;
    s.vy = dy;
  };
  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    sim.current.dragging = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const s = sim.current;
    const stepX = tileWidth + gap;
    const stepY = tileHeight + gap;
    if (e.key === "ArrowLeft") s.tx += stepX;
    else if (e.key === "ArrowRight") s.tx -= stepX;
    else if (e.key === "ArrowUp") s.ty += stepY;
    else if (e.key === "ArrowDown") s.ty -= stepY;
    else return;
    e.preventDefault();
  };

  const totalCols = cols * copies.x;
  const totalRows = rows * copies.y;
  const tiles = [];
  for (let r = 0; r < totalRows; r++) {
    for (let c = 0; c < totalCols; c++) {
      const index = ((r % rows) * cols + (c % cols)) % items.length;
      tiles.push(
        <div
          key={`${r}-${c}`}
          className={cn(
            "overflow-hidden border border-white/10",
            hoverLift &&
              "transition-transform duration-300 hover:scale-[1.04] motion-reduce:hover:scale-100",
          )}
          style={{ width: tileWidth, height: tileHeight, borderRadius: radius }}
        >
          {items[index]}
        </div>,
      );
    }
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={label}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      className={cn(
        "relative h-full w-full cursor-grab touch-none select-none overflow-hidden outline-none active:cursor-grabbing",
        "focus-visible:ring-2 focus-visible:ring-brand/60",
        className,
      )}
    >
      <span className="sr-only">
        Drag with the pointer or pan with the arrow keys.
      </span>
      <div
        ref={planeRef}
        aria-hidden
        className="absolute left-0 top-0 grid will-change-transform"
        style={{
          gap,
          gridTemplateColumns: `repeat(${totalCols}, ${tileWidth}px)`,
        }}
      >
        {tiles}
      </div>
    </div>
  );
}
