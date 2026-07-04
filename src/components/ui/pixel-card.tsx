"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface PixelCardProps {
  /** Card content, layered above the pixel canvas. */
  children: ReactNode;
  /** Size of each pixel square, in pixels. */
  pixelSize?: number;
  /** Gap between pixels, in pixels. */
  gap?: number;
  /** Pixel fill color (hex). */
  color?: string;
  /** Fill progress per second (higher fills faster). */
  speed?: number;
  /** Randomness of per-pixel timing and shading (0–1). */
  variance?: number;
  /** Reveal the pixels without a pointer/focus (always on). */
  active?: boolean;
  /** Corner radius in pixels. */
  radius?: number;
  /** Accessible name for the card. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

interface Pixel {
  x: number;
  y: number;
  max: number;
  p: number;
  delay: number;
  r: number;
  g: number;
  b: number;
}

function parseHex(hex: string): { r: number; g: number; b: number } {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return { r: 139, g: 92, b: 246 };
  const int = parseInt(m[1], 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

/**
 * PixelCard — a surface that dissolves a mosaic of pixels into view when you
 * hover or focus it, then clears them when you leave. The grid is drawn on a
 * canvas with a self-terminating rAF loop (it sleeps once every pixel settles),
 * so it costs nothing at rest. Reduced-motion users get the same reveal applied
 * instantly, with no animation.
 */
export function PixelCard({
  children,
  pixelSize = 10,
  gap = 2,
  color = "#8b5cf6",
  speed = 4,
  variance = 0.35,
  active = false,
  radius = 16,
  label,
  className,
  style,
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = prefersReducedMotion();
    const base = parseHex(color);
    const step = Math.max(2, pixelSize + gap);
    const maxDelay = Math.max(0, variance) * 0.4;

    let pixels: Pixel[] = [];
    let w = 0;
    let h = 0;
    let mode: "in" | "out" = active ? "in" : "out";
    let elapsed = 0;
    let raf = 0;
    let running = false;
    let last = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const px of pixels) {
        if (px.p <= 0.001) continue;
        const size = px.p * px.max;
        const off = (px.max - size) / 2;
        ctx.fillStyle = `rgba(${px.r},${px.g},${px.b},${px.p})`;
        ctx.fillRect(px.x + off, px.y + off, size, size);
      }
    };

    const build = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const startP = mode === "in" ? 1 : 0;
      pixels = [];
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const shade = 1 - Math.random() * Math.max(0, variance) * 0.5;
          pixels.push({
            x,
            y,
            max: pixelSize,
            p: startP,
            delay: Math.random() * maxDelay,
            r: Math.round(base.r * shade),
            g: Math.round(base.g * shade),
            b: Math.round(base.b * shade),
          });
        }
      }
      draw();
    };

    const settle = () => {
      const target = mode === "in" ? 1 : 0;
      for (const px of pixels) px.p = target;
      draw();
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      elapsed += dt;
      const target = mode === "in" ? 1 : 0;
      let done = true;
      for (const px of pixels) {
        const gate = mode === "in" ? px.delay : 0;
        if (elapsed >= gate) {
          if (mode === "in") px.p = Math.min(1, px.p + speed * dt);
          else px.p = Math.max(0, px.p - speed * dt);
        }
        if (Math.abs(px.p - target) > 0.001) done = false;
      }
      draw();
      if (done) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (reduce || speed <= 0) {
        settle();
        return;
      }
      elapsed = 0;
      last = 0;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const activate = () => {
      if (active) return;
      mode = "in";
      kick();
    };
    const deactivate = () => {
      if (active) return;
      mode = "out";
      kick();
    };

    const ro = new ResizeObserver(build);
    ro.observe(container);

    container.addEventListener("pointerenter", activate);
    container.addEventListener("pointerleave", deactivate);
    container.addEventListener("focusin", activate);
    container.addEventListener("focusout", deactivate);

    build();
    if (active) settle();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointerenter", activate);
      container.removeEventListener("pointerleave", deactivate);
      container.removeEventListener("focusin", activate);
      container.removeEventListener("focusout", deactivate);
    };
  }, [pixelSize, gap, color, speed, variance, active]);

  return (
    <div
      ref={containerRef}
      tabIndex={label ? 0 : undefined}
      role={label ? "group" : undefined}
      aria-label={label}
      className={cn(
        "group relative overflow-hidden border border-border bg-surface outline-none",
        "focus-visible:ring-2 focus-visible:ring-brand/60",
        className,
      )}
      style={{ borderRadius: radius, ...style }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
