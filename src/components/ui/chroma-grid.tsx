"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface ChromaGridItem {
  title: string;
  subtitle?: string;
  /** CSS background for the tile (gradient, color, or url()). */
  background?: string;
  /** Accent border/glow color (any CSS color). */
  color?: string;
}

export interface ChromaGridProps {
  /** Tiles shown in the grid. Defaults to a built-in set. */
  items?: ChromaGridItem[];
  /** Number of columns. */
  columns?: number;
  /** Gap between tiles in pixels. */
  gap?: number;
  /** Tile height in pixels. */
  tileHeight?: number;
  /** Tile corner radius in pixels. */
  radius?: number;
  /** Diameter of the color-reveal spotlight in pixels. */
  spotlightSize?: number;
  /** Brightness of the resting (desaturated) grid, 0–1. */
  dim?: number;
  /** Drain color from the resting grid (vs. only dimming it). */
  grayscale?: boolean;
  /** Show a soft brand glow that trails the pointer. */
  glow?: boolean;
  /** Accessible name for the grid region. */
  label?: string;
  className?: string;
}

const DEFAULT_ITEMS: ChromaGridItem[] = [
  { title: "Lyra", subtitle: "Design systems", background: "linear-gradient(150deg,#7c3aed,#22d3ee)", color: "#22d3ee" },
  { title: "Orion", subtitle: "Motion", background: "linear-gradient(150deg,#fb7185,#f59e0b)", color: "#fb7185" },
  { title: "Vega", subtitle: "Frontend", background: "linear-gradient(150deg,#0ea5e9,#10b981)", color: "#10b981" },
  { title: "Rigel", subtitle: "Platform", background: "linear-gradient(150deg,#a855f7,#ec4899)", color: "#a855f7" },
  { title: "Mira", subtitle: "Research", background: "linear-gradient(150deg,#6366f1,#0ea5e9)", color: "#6366f1" },
  { title: "Atlas", subtitle: "Infra", background: "linear-gradient(150deg,#84cc16,#14b8a6)", color: "#84cc16" },
];

/**
 * ChromaGrid — a grid that rests desaturated until the pointer sweeps over it,
 * revealing each tile's colour through a soft spotlight (with an optional brand
 * glow trailing the cursor). The reveal is a masked colour copy layered over a
 * greyscale one; pointer position is written to CSS variables, so tracking
 * never re-renders. The colour layer carries the accessible content; its
 * greyscale twin is hidden from assistive tech.
 */
export function ChromaGrid({
  items = DEFAULT_ITEMS,
  columns = 3,
  gap = 14,
  tileHeight = 150,
  radius = 16,
  spotlightSize = 260,
  dim = 0.5,
  grayscale = true,
  glow = true,
  label = "Chroma grid",
  className,
}: ChromaGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  const setVars = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setVars(e.clientX - rect.left, e.clientY - rect.top);
  };
  const onPointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setVars(e.clientX - rect.left, e.clientY - rect.top);
    el.style.setProperty("--r", `${spotlightSize / 2}px`);
  };
  const onPointerLeave = () => {
    ref.current?.style.setProperty("--r", "0px");
  };

  const grid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap,
  };

  const renderTiles = (tone: "color" | "mono") =>
    items.map((item, i) => (
      <div
        key={`${item.title}-${i}`}
        className="relative flex flex-col justify-end overflow-hidden border p-4"
        style={{
          height: tileHeight,
          borderRadius: radius,
          background:
            item.background ?? "linear-gradient(150deg,#7c3aed,#22d3ee)",
          borderColor:
            tone === "color" ? (item.color ?? "rgba(255,255,255,0.14)") : "rgba(255,255,255,0.1)",
          boxShadow:
            tone === "color" && item.color
              ? `inset 0 0 0 1px ${item.color}55`
              : undefined,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6), transparent 62%)",
          }}
        />
        <div className="relative">
          <p className="text-sm font-semibold text-white drop-shadow-sm">
            {item.title}
          </p>
          {item.subtitle && (
            <p className="text-xs text-white/75">{item.subtitle}</p>
          )}
        </div>
      </div>
    ));

  const maskEdge = Math.max(1, Math.round((spotlightSize / 2) * 0.55));
  // Hole punched in the greyscale layer, revealing the colour layer beneath.
  const holeMask = `radial-gradient(circle var(--r, 0px) at var(--x, -100px) var(--y, -100px), transparent 0%, transparent ${maskEdge}px, #000 100%)`;

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={cn("relative w-full", className)}
    >
      {/* Colour layer — the accessible content. */}
      <div style={grid}>{renderTiles("color")}</div>

      {/* Greyscale twin on top; the spotlight punches a hole to reveal colour. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          ...grid,
          filter: grayscale
            ? `grayscale(1) brightness(${dim})`
            : `brightness(${dim})`,
          WebkitMaskImage: holeMask,
          maskImage: holeMask,
          // Reduced motion is handled globally (globals.css forces
          // transition-duration ~0), so this is safe to emit unconditionally.
          transition: "filter 200ms ease",
        }}
      >
        {renderTiles("mono")}
      </div>

      {/* Soft brand glow trailing the pointer. */}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: radius,
            background: `radial-gradient(circle var(--r, 0px) at var(--x, -100px) var(--y, -100px), rgba(139,92,246,0.18), transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
