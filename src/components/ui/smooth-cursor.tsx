"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export type SmoothCursorVariant = "both" | "ring" | "dot";

export interface SmoothCursorProps {
  /** Which cursor parts to draw. */
  variant?: SmoothCursorVariant;
  /** Ring diameter in pixels. */
  size?: number;
  /** Dot diameter in pixels. */
  dotSize?: number;
  /** Ring follow smoothing (0.02 = floaty, 0.4 = tight). */
  smooth?: number;
  /** Number of ghost dots trailing the cursor (0 disables). */
  trail?: number;
  /** Ring growth multiplier over links, buttons and [data-cursor-hover]. */
  growScale?: number;
  /** Blend the cursor with what's underneath (mix-blend-difference). */
  blend?: boolean;
  /** Cursor color (any CSS color). */
  color?: string;
  /** Hide the native cursor inside the area. */
  hideNative?: boolean;
  /** The hover area the cursor lives in. */
  children: ReactNode;
  className?: string;
}

/**
 * SmoothCursor — a custom dot + ring cursor scoped to its container: the dot
 * sticks to the pointer while the ring eases behind it, growing over
 * interactive targets and shrinking while pressed. Optional ghost trail.
 * Everything is driven by direct style writes inside one rAF loop (no
 * re-renders); reduced-motion users get a snap follow with no trail.
 */
export function SmoothCursor({
  variant = "both",
  size = 34,
  dotSize = 6,
  smooth = 0.14,
  trail = 0,
  growScale = 1.8,
  blend = false,
  color = "var(--brand)",
  hideNative = true,
  children,
  className,
}: SmoothCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sim = useRef({
    x: 0,
    y: 0,
    ringX: 0,
    ringY: 0,
    scale: 1,
    targetScale: 1,
    pressed: false,
    hovering: false,
    points: [] as { x: number; y: number }[],
    raf: 0,
    running: false,
  });

  const showRing = variant !== "dot";
  const showDot = variant !== "ring";

  useEffect(() => {
    const s = sim.current;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const loop = () => {
    const s = sim.current;
    if (!s.running) return;
    const reduce = prefersReducedMotion();
    const ease = reduce ? 1 : smooth;

    s.ringX += (s.x - s.ringX) * ease;
    s.ringY += (s.y - s.ringY) * ease;
    s.targetScale = s.pressed ? 0.8 : s.hovering ? growScale : 1;
    s.scale += (s.targetScale - s.scale) * (reduce ? 1 : 0.18);

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${s.x - dotSize / 2}px, ${s.y - dotSize / 2}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${s.ringX - size / 2}px, ${s.ringY - size / 2}px) scale(${s.scale})`;
    }

    // Ghost chain: each point eases toward the one before it.
    let px = s.x;
    let py = s.y;
    for (let i = 0; i < s.points.length; i++) {
      const p = s.points[i];
      p.x += (px - p.x) * 0.3;
      p.y += (py - p.y) * 0.3;
      const el = trailRefs.current[i];
      if (el) {
        const d = dotSize * (1 - (i + 1) / (s.points.length + 1));
        el.style.transform = `translate(${p.x - d / 2}px, ${p.y - d / 2}px)`;
        el.style.width = `${d}px`;
        el.style.height = `${d}px`;
        el.style.opacity = String(0.5 * (1 - i / s.points.length));
      }
      px = p.x;
      py = p.y;
    }

    s.raf = requestAnimationFrame(loop);
  };

  const setVisible = (visible: boolean) => {
    const el = containerRef.current;
    if (el) el.style.setProperty("--cursor-opacity", visible ? "1" : "0");
  };

  const onPointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    const s = sim.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    s.x = e.clientX - rect.left;
    s.y = e.clientY - rect.top;
    s.ringX = s.x;
    s.ringY = s.y;
    const ghosts = prefersReducedMotion() ? 0 : trail;
    s.points = Array.from({ length: ghosts }, () => ({ x: s.x, y: s.y }));
    setVisible(true);
    if (!s.running) {
      s.running = true;
      s.raf = requestAnimationFrame(loop);
    }
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    const s = sim.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    s.x = e.clientX - rect.left;
    s.y = e.clientY - rect.top;
    const target = e.target as Element | null;
    s.hovering = Boolean(
      target?.closest?.("a, button, [data-cursor-hover]"),
    );
  };

  const onPointerLeave = () => {
    const s = sim.current;
    s.running = false;
    s.pressed = false;
    s.hovering = false;
    cancelAnimationFrame(s.raf);
    setVisible(false);
  };

  const ghost = (i: number) => (
    <div
      key={i}
      ref={(el) => {
        trailRefs.current[i] = el;
      }}
      className="absolute left-0 top-0 rounded-full opacity-0"
      style={{ background: color }}
    />
  );

  return (
    <div
      ref={containerRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={() => (sim.current.pressed = true)}
      onPointerUp={() => (sim.current.pressed = false)}
      className={cn(
        "relative h-full w-full overflow-hidden",
        hideNative && "[&_*]:cursor-none cursor-none",
        className,
      )}
    >
      {children}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-20 opacity-[var(--cursor-opacity,0)] transition-opacity duration-200",
          blend && "mix-blend-difference",
        )}
      >
        {trail > 0 && Array.from({ length: trail }, (_, i) => ghost(i))}
        {showRing && (
          <div
            ref={ringRef}
            className="absolute left-0 top-0 rounded-full border-2"
            style={{ width: size, height: size, borderColor: color }}
          />
        )}
        {showDot && (
          <div
            ref={dotRef}
            className="absolute left-0 top-0 rounded-full"
            style={{ width: dotSize, height: dotSize, background: color }}
          />
        )}
      </div>
    </div>
  );
}
