"use client";

import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface RollingGalleryItem {
  title: string;
  subtitle?: string;
  /** CSS background for the face (gradient, color, or url()). */
  background?: string;
}

export interface RollingGalleryProps {
  /** Faces arranged around the cylinder. Defaults to a built-in gradient set. */
  items?: RollingGalleryItem[];
  /** Face width in pixels. */
  faceWidth?: number;
  /** Face height in pixels. */
  faceHeight?: number;
  /** Extra spacing between neighbouring faces, as a fraction of the radius. */
  spacing?: number;
  /** Auto-spin speed in degrees per second (0 disables; negative reverses). */
  speed?: number;
  /** Degrees of spin applied per pixel of horizontal drag. */
  sensitivity?: number;
  /** Inertia decay per frame after a drag (0.8–0.98). */
  friction?: number;
  /** Pause the auto-spin while the pointer is over the ring. */
  pauseOnHover?: boolean;
  /** Forward tilt of the whole cylinder, in degrees. */
  tilt?: number;
  /** Scene perspective in pixels (smaller = stronger 3D). */
  perspective?: number;
  /** Dim faces as they rotate to the back. */
  dim?: boolean;
  /** Face corner radius in pixels. */
  radius?: number;
  /** Accessible name for the gallery region. */
  label?: string;
  className?: string;
}

const DEFAULT_ITEMS: RollingGalleryItem[] = [
  { title: "Aurora", background: "linear-gradient(160deg,#7c3aed,#22d3ee)" },
  { title: "Ember", background: "linear-gradient(160deg,#fb7185,#f59e0b)" },
  { title: "Tide", background: "linear-gradient(160deg,#0ea5e9,#10b981)" },
  { title: "Nova", background: "linear-gradient(160deg,#a855f7,#ec4899)" },
  { title: "Dusk", background: "linear-gradient(160deg,#6366f1,#0ea5e9)" },
  { title: "Moss", background: "linear-gradient(160deg,#84cc16,#14b8a6)" },
  { title: "Flare", background: "linear-gradient(160deg,#f43f5e,#8b5cf6)" },
  { title: "Frost", background: "linear-gradient(160deg,#22d3ee,#818cf8)" },
];

const DEG = Math.PI / 180;

/**
 * RollingGallery — cards mounted around the outside of a 3D cylinder that
 * spins on its own, dims the faces turning to the back, and can be grabbed and
 * flung (with inertia) or nudged a face at a time with the arrow keys. Only the
 * ring's rotation is written each frame (inside a rAF loop), so spinning never
 * re-renders. The loop pauses off-screen; the auto-spin and inertia are
 * disabled for reduced-motion users, who can still drag to explore.
 */
export function RollingGallery({
  items = DEFAULT_ITEMS,
  faceWidth = 190,
  faceHeight = 250,
  spacing = 0.18,
  speed = 22,
  sensitivity = 0.22,
  friction = 0.94,
  pauseOnHover = true,
  tilt = 6,
  perspective = 1100,
  dim = true,
  radius = 18,
  label = "Rolling gallery",
  className,
}: RollingGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const faceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const view = useRef({
    rot: 0,
    target: 0,
    vel: 0,
    dragging: false,
    hovering: false,
    lastX: 0,
  });

  const count = Math.max(1, items.length);
  const anglePer = 360 / count;
  // Radius so `count` faces of `faceWidth` tile the cylinder, plus spacing.
  const ringRadius =
    (faceWidth / 2) / Math.tan(Math.PI / Math.max(3, count)) * (1 + spacing);

  useEffect(() => {
    const container = containerRef.current;
    const ring = ringRef.current;
    if (!container || !ring) return;

    const reduce = prefersReducedMotion();
    let raf = 0;
    let running = false;
    let last = 0;

    const apply = () => {
      const v = view.current;
      ring.style.transform = `translateZ(${-ringRadius}px) rotateX(${tilt}deg) rotateY(${v.rot}deg)`;
      if (!dim) return;
      for (let i = 0; i < faceRefs.current.length; i++) {
        const el = faceRefs.current[i];
        if (!el) continue;
        const front = Math.cos((i * anglePer + v.rot) * DEG); // 1 front … -1 back
        const f = front * 0.5 + 0.5;
        el.style.opacity = String(0.32 + 0.68 * f);
        el.style.filter = `brightness(${0.45 + 0.55 * f})`;
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const v = view.current;
      const paused = pauseOnHover && v.hovering && !v.dragging;
      if (!v.dragging) {
        if (!reduce && !paused && speed !== 0) v.target += speed * dt;
        if (!reduce && Math.abs(v.vel) > 0.01) {
          v.target += v.vel;
          v.vel *= friction;
        }
      }
      const ease = reduce || v.dragging ? 1 : 0.12;
      v.rot += (v.target - v.rot) * ease;
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
  }, [
    anglePer,
    ringRadius,
    speed,
    sensitivity,
    friction,
    pauseOnHover,
    tilt,
    dim,
  ]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const v = view.current;
    v.dragging = true;
    v.vel = 0;
    v.lastX = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const v = view.current;
    if (!v.dragging) return;
    const dx = e.clientX - v.lastX;
    v.lastX = e.clientX;
    v.target += dx * sensitivity;
    v.vel = dx * sensitivity;
  };
  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const v = view.current;
    if (!v.dragging) return;
    v.dragging = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };
  const onEnter = () => {
    view.current.hovering = true;
  };
  const onLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    view.current.hovering = false;
    endDrag(e);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const v = view.current;
    if (e.key === "ArrowLeft") v.target -= anglePer;
    else if (e.key === "ArrowRight") v.target += anglePer;
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
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onKeyDown={onKeyDown}
      className={cn(
        "relative grid h-full w-full cursor-grab touch-none select-none place-items-center overflow-hidden outline-none",
        "active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-brand/60",
        className,
      )}
      style={{ perspective }}
    >
      <span className="sr-only">
        Drag sideways or use the left and right arrow keys to spin the gallery.
      </span>
      <div
        className="relative [transform-style:preserve-3d]"
        style={{ width: faceWidth, height: faceHeight }}
      >
        <div
          ref={ringRef}
          aria-hidden
          className="absolute inset-0 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              ref={(el) => {
                faceRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-end overflow-hidden border border-white/10 p-4 shadow-xl [backface-visibility:hidden]"
              style={{
                borderRadius: radius,
                background:
                  item.background ?? "linear-gradient(160deg,#7c3aed,#22d3ee)",
                transform: `rotateY(${i * anglePer}deg) translateZ(${ringRadius}px)`,
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
                <p className="text-base font-semibold text-white drop-shadow-sm">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
