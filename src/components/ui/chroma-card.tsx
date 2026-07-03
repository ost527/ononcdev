"use client";

import type { CSSProperties, HTMLAttributes, PointerEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface ChromaCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Max tilt toward the pointer, in degrees. */
  tilt?: number;
  /** Scale applied while hovered. */
  scale?: number;
  /** Chromatic red/cyan fringe offset on hover, in pixels. */
  rgbShift?: number;
  /** Holographic sheen strength (0–1). */
  sheen?: number;
  /** How far the sheen hue travels with the pointer, in degrees. */
  hueRange?: number;
  /** Corner radius in pixels. */
  radius?: number;
  /** Pointer-tracking specular highlight. */
  glare?: boolean;
  /** Soft colored drop glow beneath the card while hovered. */
  glow?: boolean;
  /** Glow color (any CSS color). */
  glowColor?: string;
  /** Settle transition when the pointer enters/leaves, in seconds. */
  duration?: number;
  children: ReactNode;
}

/**
 * ChromaCard — a pointer-tracked 3D card with a hue-shifting holographic
 * sheen, chromatic red/cyan edge fringing and a specular glare. All motion is
 * written to CSS variables on pointer move so hovering never re-renders, and
 * tilt/scale are skipped entirely for reduced-motion users.
 */
export function ChromaCard({
  className,
  tilt = 10,
  scale = 1.03,
  rgbShift = 5,
  sheen = 0.55,
  hueRange = 220,
  radius = 20,
  glare = true,
  glow = true,
  glowColor = "var(--brand)",
  duration = 0.5,
  children,
  style,
  ...props
}: ChromaCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    },
    [],
  );

  const setVars = (el: HTMLDivElement, px: number, py: number) => {
    el.style.setProperty("--rx", `${(0.5 - py) * 2 * tilt}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 2 * tilt}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--hue", `${(px - 0.5) * hueRange}deg`);
  };

  const handleEnter = () => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    el.style.setProperty("--s", String(scale));
    // Ease into the first pointer position, then track 1:1.
    el.style.transitionDuration = `${duration}s`;
    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      el.style.transitionDuration = "0s";
    }, duration * 1000);
  };

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    setVars(
      el,
      (e.clientX - rect.left) / rect.width,
      (e.clientY - rect.top) / rect.height,
    );
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    el.style.transitionDuration = `${duration}s`;
    el.style.setProperty("--s", "1");
    setVars(el, 0.5, 0.5);
  };

  const layerDuration = { transitionDuration: `${duration}s` };

  return (
    <div className="[perspective:900px]">
      <div
        ref={ref}
        onPointerEnter={handleEnter}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={cn(
          "group relative border border-border bg-surface transition-transform ease-out will-change-transform",
          "[transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_scale(var(--s,1))]",
          className,
        )}
        style={
          {
            borderRadius: radius,
            transformStyle: "preserve-3d",
            ...style,
          } as CSSProperties
        }
        {...props}
      >
        {glow && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[inherit] opacity-0 blur-2xl transition-opacity group-hover:opacity-40"
            style={{ background: glowColor, ...layerDuration }}
          />
        )}
        {/* Chromatic fringe: red / cyan rings pulled apart while hovered. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-[rgba(255,60,60,0.55)] opacity-0 mix-blend-screen transition-[opacity,transform] group-hover:opacity-100"
          style={{
            transform: `translate(${-rgbShift}px, ${-rgbShift / 2}px)`,
            ...layerDuration,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-[rgba(60,200,255,0.55)] opacity-0 mix-blend-screen transition-[opacity,transform] group-hover:opacity-100"
          style={{
            transform: `translate(${rgbShift}px, ${rgbShift / 2}px)`,
            ...layerDuration,
          }}
        />
        {/* Holographic sheen, hue-rotated by pointer position. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity group-hover:opacity-100"
          style={layerDuration}
        >
          <div
            className="absolute inset-0"
            style={{
              opacity: sheen,
              background:
                "linear-gradient(115deg, transparent 20%, rgba(255,0,132,0.30) 36%, rgba(0,229,255,0.30) 50%, rgba(124,255,0,0.24) 64%, transparent 80%)",
              backgroundPosition: "var(--mx, 50%) var(--my, 50%)",
              backgroundSize: "220% 220%",
              filter: "hue-rotate(var(--hue, 0deg)) saturate(1.4)",
              mixBlendMode: "color-dodge",
            }}
          />
        </div>
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.28), transparent 65%)",
              ...layerDuration,
            }}
          />
        )}
        <div className="relative" style={{ transform: "translateZ(24px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
