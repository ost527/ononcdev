"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./utils";

export interface CanvasFrame {
  ctx: CanvasRenderingContext2D;
  /** Width in CSS pixels (already DPR-corrected via transform). */
  width: number;
  /** Height in CSS pixels. */
  height: number;
  dpr: number;
}

export interface CanvasHandlers<S> {
  /** Build initial state on mount and on every resize. */
  init: (frame: CanvasFrame) => S;
  /** Draw one frame. `t` = elapsed seconds, `dt` = clamped delta seconds. */
  draw: (frame: CanvasFrame, state: S, t: number, dt: number) => void;
  /** Pointer position in canvas-local CSS pixels (`inside` = within bounds). */
  onPointer?: (state: S, x: number, y: number, inside: boolean) => void;
}

/**
 * Drives a <canvas> animation loop with sensible defaults:
 * - Hi-DPI aware (capped at 2x) with ResizeObserver re-measure.
 * - Pauses when scrolled out of view or the tab is hidden.
 * - Renders a single static frame when the user prefers reduced motion.
 *
 * Handler config is treated as static after mount; drive runtime changes
 * through mutable state returned by `init`.
 */
export function useCanvas<S>(handlers: CanvasHandlers<S>) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let state: S;
    let startTs = 0;
    let lastTs = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const reduce = prefersReducedMotion();

    const frame = (): CanvasFrame => ({ ctx, width, height, dpr });

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state = handlersRef.current.init(frame());
    };

    const loop = (now: number) => {
      if (!running) return;
      if (!startTs) {
        startTs = now;
        lastTs = now;
      }
      const t = (now - startTs) / 1000;
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      handlersRef.current.draw(frame(), state, t, dt);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      if (reduce) {
        handlersRef.current.draw(frame(), state, 0, 0);
        return;
      }
      running = true;
      startTs = 0;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    measure();

    const ro = new ResizeObserver(() => {
      measure();
      if (reduce) handlersRef.current.draw(frame(), state, 0, 0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0.04 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let onMove: ((e: PointerEvent) => void) | null = null;
    let onLeave: (() => void) | null = null;
    if (handlersRef.current.onPointer) {
      onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const inside =
          x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
        handlersRef.current.onPointer?.(state, x, y, inside);
      };
      onLeave = () => handlersRef.current.onPointer?.(state, -9999, -9999, false);
      window.addEventListener("pointermove", onMove, { passive: true });
      canvas.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (onMove) window.removeEventListener("pointermove", onMove);
      if (onLeave) canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return ref;
}
