"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MasonryItem {
  title?: string;
  subtitle?: string;
  /** Visual height of the tile in pixels. */
  height?: number;
  /** CSS background for the tile (gradient, color, or url()). */
  background?: string;
}

export interface MasonryProps {
  /** Tiles laid out across the columns. Defaults to a built-in gradient set. */
  items?: MasonryItem[];
  /** Target number of columns at full width. */
  columns?: number;
  /** Gap between tiles in pixels. */
  gap?: number;
  /** Column count drops on narrow containers below this width per column. */
  minColumnWidth?: number;
  /** Tile corner radius in pixels. */
  radius?: number;
  /** Scale applied to a tile on hover (1 disables). */
  hoverScale?: number;
  /** Seconds of delay added per column position during the reveal. */
  stagger?: number;
  /** Accessible name for the grid. */
  label?: string;
  className?: string;
}

const DEFAULT_ITEMS: MasonryItem[] = [
  { title: "Nebula", subtitle: "Space", height: 220, background: "linear-gradient(160deg,#7c3aed,#22d3ee)" },
  { title: "Ember", subtitle: "Fire", height: 150, background: "linear-gradient(160deg,#fb7185,#f59e0b)" },
  { title: "Tide", subtitle: "Ocean", height: 190, background: "linear-gradient(160deg,#0ea5e9,#10b981)" },
  { title: "Nova", subtitle: "Star", height: 260, background: "linear-gradient(160deg,#a855f7,#ec4899)" },
  { title: "Dusk", subtitle: "Sky", height: 170, background: "linear-gradient(160deg,#6366f1,#0ea5e9)" },
  { title: "Moss", subtitle: "Forest", height: 210, background: "linear-gradient(160deg,#84cc16,#14b8a6)" },
  { title: "Flare", subtitle: "Sun", height: 240, background: "linear-gradient(160deg,#f43f5e,#8b5cf6)" },
  { title: "Frost", subtitle: "Ice", height: 160, background: "linear-gradient(160deg,#22d3ee,#818cf8)" },
  { title: "Clay", subtitle: "Earth", height: 200, background: "linear-gradient(160deg,#f59e0b,#ef4444)" },
  { title: "Iris", subtitle: "Bloom", height: 180, background: "linear-gradient(160deg,#ec4899,#a855f7)" },
];

/**
 * Masonry — a responsive multi-column tile grid that packs items of varying
 * heights and reveals them with a staggered fade-and-rise as they scroll into
 * view; hovering lifts a tile. The column count adapts to the container width
 * via a ResizeObserver. The reveal collapses to instant for reduced-motion
 * users (Framer Motion `useReducedMotion`), and each tile animates only once.
 */
export function Masonry({
  items = DEFAULT_ITEMS,
  columns = 3,
  gap = 16,
  minColumnWidth = 200,
  radius = 14,
  hoverScale = 1.03,
  stagger = 0.06,
  label = "Masonry gallery",
  className,
}: MasonryProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [cols, setCols] = useState(columns);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const fit = Math.max(1, Math.floor((w + gap) / (minColumnWidth + gap)));
      setCols(Math.min(columns, fit));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [columns, gap, minColumnWidth]);

  return (
    <ul
      ref={ref}
      aria-label={label}
      className={cn("m-0 w-full list-none p-0", className)}
      style={{ columnCount: cols, columnGap: gap }}
    >
      {items.map((item, i) => (
        <motion.li
          key={`${item.title ?? "tile"}-${i}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={reduce || hoverScale === 1 ? undefined : { scale: hoverScale }}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.5, delay: (i % cols) * stagger, ease: "easeOut" }
          }
          className="relative flex flex-col justify-end overflow-hidden border border-white/10 shadow-lg will-change-transform"
          style={{
            height: item.height ?? 200,
            marginBottom: gap,
            borderRadius: radius,
            breakInside: "avoid",
            background:
              item.background ?? "linear-gradient(160deg,#7c3aed,#22d3ee)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55), transparent 58%)",
            }}
          />
          {(item.title || item.subtitle) && (
            <div className="relative p-4">
              {item.subtitle && (
                <span className="font-mono text-[11px] tracking-wide text-white/70">
                  {item.subtitle}
                </span>
              )}
              {item.title && (
                <p className="text-base font-semibold text-white drop-shadow-sm">
                  {item.title}
                </p>
              )}
            </div>
          )}
        </motion.li>
      ))}
    </ul>
  );
}
