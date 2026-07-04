"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";
import { clamp, cn, prefersReducedMotion } from "@/lib/utils";

export interface MagicBentoItem {
  title: string;
  subtitle?: string;
  /** Column span. */
  c?: number;
  /** Row span. */
  r?: number;
}

export interface MagicBentoProps {
  /** Cards in the bento grid. Defaults to a built-in set. */
  items?: MagicBentoItem[];
  /** Number of columns. */
  columns?: number;
  /** Height of one grid row in pixels. */
  rowHeight?: number;
  /** Gap between cards in pixels. */
  gap?: number;
  /** Card corner radius in pixels. */
  radius?: number;
  /** Glow / spotlight color (hex). */
  color?: string;
  /** Pointer proximity (px) over which a card's glow fades in. */
  glowRadius?: number;
  /** Show the radial spotlight that follows the pointer inside each card. */
  spotlight?: boolean;
  /** Light each card's border as the pointer nears it. */
  borderGlow?: boolean;
  /** Max pointer tilt in degrees (0 disables). */
  tilt?: number;
  /** Accessible name for the grid. */
  label?: string;
  className?: string;
}

const DEFAULT_ITEMS: MagicBentoItem[] = [
  { title: "Analytics", subtitle: "Realtime insight", c: 2, r: 2 },
  { title: "Automation", subtitle: "Flows that run themselves", c: 2, r: 1 },
  { title: "Security", subtitle: "SOC 2 by default", c: 1, r: 1 },
  { title: "Edge Speed", subtitle: "Global CDN", c: 1, r: 1 },
  { title: "Insights", subtitle: "AI summaries", c: 2, r: 1 },
];

/**
 * MagicBento — an asymmetric bento grid where a radial spotlight tracks the
 * pointer inside each card, every card's border lights up as the cursor nears
 * it (fading with proximity), and cards tilt toward the pointer. A single
 * container pointer handler writes CSS variables to each card, so the whole
 * grid reacts without any React re-render. Tilt is disabled for reduced-motion
 * users; the pointer-driven glow is not auto-motion and remains.
 */
export function MagicBento({
  items = DEFAULT_ITEMS,
  columns = 4,
  rowHeight = 132,
  gap = 14,
  radius = 18,
  color = "#8b5cf6",
  glowRadius = 320,
  spotlight = true,
  borderGlow = true,
  tilt = 6,
  label = "Magic bento grid",
  className,
}: MagicBentoProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const reduce = prefersReducedMotion();
    for (const card of cardRefs.current) {
      if (!card) continue;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      card.style.setProperty("--glow", String(clamp(1 - dist / glowRadius, 0, 1)));
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      if (tilt > 0 && !reduce && inside) {
        card.style.setProperty("--ry", `${(x / r.width - 0.5) * 2 * tilt}deg`);
        card.style.setProperty("--rx", `${(0.5 - y / r.height) * 2 * tilt}deg`);
      } else {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      }
    }
  };

  const handleLeave = () => {
    for (const card of cardRefs.current) {
      if (!card) continue;
      card.style.setProperty("--glow", "0");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    }
  };

  const borderMask: CSSProperties = {
    padding: 1.5,
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };

  return (
    <div
      role="group"
      aria-label={label}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("grid w-full", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridAutoRows: `${rowHeight}px`,
        gridAutoFlow: "dense",
        gap,
      }}
    >
      {items.map((item, i) => (
        <div
          key={`${item.title}-${i}`}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="relative overflow-hidden border border-border bg-surface p-5 transition-transform duration-150 ease-out will-change-transform [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
          style={{
            gridColumn: `span ${Math.min(item.c ?? 1, columns)}`,
            gridRow: `span ${item.r ?? 1}`,
            borderRadius: radius,
          }}
        >
          {spotlight && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                background: `radial-gradient(240px circle at var(--mx, -100px) var(--my, -100px), color-mix(in srgb, ${color} 13%, transparent), transparent 70%)`,
                opacity: "var(--glow, 0)",
              }}
            />
          )}
          {borderGlow && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                ...borderMask,
                background: `radial-gradient(200px circle at var(--mx, -100px) var(--my, -100px), ${color}, transparent 70%)`,
                opacity: "var(--glow, 0)",
              }}
            />
          )}
          <div className="relative flex h-full flex-col">
            <p className="text-base font-semibold text-foreground">
              {item.title}
            </p>
            {item.subtitle && (
              <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
