"use client";

import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef } from "react";
import { clamp, cn, prefersReducedMotion } from "@/lib/utils";

export interface CircularGalleryItem {
  title: string;
  subtitle?: string;
  /** CSS background for the card face (gradient, color, or url()). */
  background?: string;
}

export interface CircularGalleryProps {
  /** Cards laid out along the arc. Defaults to a built-in gradient set. */
  items?: CircularGalleryItem[];
  /** Card width in pixels. */
  itemWidth?: number;
  /** Card height in pixels. */
  itemHeight?: number;
  /** Extra spacing between card centers, in pixels. */
  gap?: number;
  /** Max rotation of edge cards toward the viewer, in degrees (the "bend"). */
  bend?: number;
  /** How far edge cards dip down the arc, in pixels. */
  arc?: number;
  /** Scale of the outermost cards (center is always 1). */
  minScale?: number;
  /** How much edge cards fade (0 keeps them opaque, 1 fades to clear). */
  fade?: number;
  /** Idle auto-rotation speed in px/s (0 disables; negative reverses). */
  autoScroll?: number;
  /** Inertia decay per frame after a drag (0.8–0.98). */
  friction?: number;
  /** Snap to the nearest card when a drag ends. */
  snap?: boolean;
  /** Card corner radius in pixels. */
  radius?: number;
  /** Accessible name for the gallery region. */
  label?: string;
  className?: string;
}

const DEFAULT_ITEMS: CircularGalleryItem[] = [
  { title: "Nebula", subtitle: "01", background: "linear-gradient(150deg,#7c3aed,#22d3ee)" },
  { title: "Ember", subtitle: "02", background: "linear-gradient(150deg,#fb7185,#f59e0b)" },
  { title: "Tide", subtitle: "03", background: "linear-gradient(150deg,#0ea5e9,#10b981)" },
  { title: "Nova", subtitle: "04", background: "linear-gradient(150deg,#a855f7,#ec4899)" },
  { title: "Dusk", subtitle: "05", background: "linear-gradient(150deg,#6366f1,#0ea5e9)" },
  { title: "Moss", subtitle: "06", background: "linear-gradient(150deg,#84cc16,#14b8a6)" },
  { title: "Flare", subtitle: "07", background: "linear-gradient(150deg,#f43f5e,#8b5cf6)" },
  { title: "Frost", subtitle: "08", background: "linear-gradient(150deg,#22d3ee,#818cf8)" },
];

/**
 * CircularGallery — a horizontal band of cards bent along a gentle arc. Grab
 * and throw it sideways (with inertia), step through with the arrow keys, or
 * let it drift on its own; it wraps seamlessly forever. The centered card is
 * upright and full-size while its neighbours rotate away, shrink and fade.
 *
 * Position is written to per-card transforms inside a rAF loop, so browsing
 * never triggers a React re-render. The loop pauses off-screen, and idle drift
 * and inertia are disabled for reduced-motion users (dragging still works).
 */
export function CircularGallery({
  items = DEFAULT_ITEMS,
  itemWidth = 200,
  itemHeight = 260,
  gap = 44,
  bend = 42,
  arc = 46,
  minScale = 0.62,
  fade = 0.55,
  autoScroll = 18,
  friction = 0.92,
  snap = false,
  radius = 20,
  label = "Circular gallery",
  className,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sim = useRef({
    offset: 0,
    target: 0,
    vel: 0,
    dragging: false,
    lastX: 0,
    w: 0,
  });

  const count = Math.max(1, items.length);
  const stride = itemWidth + gap;
  const total = count * stride;

  // Nearest wrapped horizontal position of card `i` around the centre, so the
  // band tiles infinitely in both directions.
  const wrappedX = (i: number, offset: number) => {
    let x = ((i * stride - offset) % total + total) % total;
    if (x > total / 2) x -= total;
    return x;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = prefersReducedMotion();
    let raf = 0;
    let running = false;
    let last = 0;

    const draw = () => {
      const s = sim.current;
      const half = Math.max(1, (s.w || container.clientWidth) / 2);
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const x = wrappedX(i, s.offset);
        const k = clamp(Math.abs(x) / half, 0, 1);
        const ry = clamp((-x / half) * bend, -bend, bend);
        const scale = 1 - k * (1 - minScale);
        const dip = arc * k;
        el.style.transform = `translate(-50%, -50%) translateX(${x}px) translateY(${dip}px) rotateY(${ry}deg) scale(${scale})`;
        el.style.opacity = String(1 - k * fade);
        el.style.zIndex = String(Math.round(100 - k * 100));
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const s = sim.current;
      if (!s.dragging) {
        if (!reduce && autoScroll !== 0) s.target += autoScroll * dt;
        if (!reduce && Math.abs(s.vel) > 0.1) {
          s.target += s.vel;
          s.vel *= friction;
        }
      }
      const ease = reduce || s.dragging ? 1 : 0.14;
      s.offset += (s.target - s.offset) * ease;
      draw();
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

    const measure = () => {
      sim.current.w = container.clientWidth;
      draw();
    };
    const ro = new ResizeObserver(measure);
    ro.observe(container);

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

    measure();
    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stride, total, autoScroll, friction, bend, arc, minScale, fade]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = sim.current;
    s.dragging = true;
    s.vel = 0;
    s.lastX = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = sim.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.target -= dx;
    s.vel = -dx;
  };
  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = sim.current;
    if (!s.dragging) return;
    s.dragging = false;
    if (snap) s.target = Math.round(s.target / stride) * stride;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const s = sim.current;
    if (e.key === "ArrowLeft") s.target -= stride;
    else if (e.key === "ArrowRight") s.target += stride;
    else if (e.key === "Home") s.target = 0;
    else return;
    e.preventDefault();
  };

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
        "relative h-full w-full cursor-grab touch-none select-none overflow-hidden outline-none",
        "[perspective:1200px] active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-brand/60",
        className,
      )}
    >
      <span className="sr-only">
        Drag sideways or use the left and right arrow keys to browse.
      </span>
      <div
        aria-hidden
        className="absolute inset-0 [transform-style:preserve-3d]"
      >
        {items.map((item, i) => (
          <div
            key={`${item.title}-${i}`}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 flex flex-col justify-end overflow-hidden border border-white/10 p-4 shadow-xl will-change-transform"
            style={{
              width: itemWidth,
              height: itemHeight,
              borderRadius: radius,
              background:
                item.background ?? "linear-gradient(150deg,#7c3aed,#22d3ee)",
              transform: `translate(-50%, -50%) translateX(${wrappedX(i, 0)}px)`,
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%)",
              }}
            />
            <div className="relative">
              {item.subtitle && (
                <span className="font-mono text-[11px] tracking-wide text-white/70">
                  {item.subtitle}
                </span>
              )}
              <p className="text-lg font-semibold text-white drop-shadow-sm">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
