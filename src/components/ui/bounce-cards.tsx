"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface BounceCardItem {
  title: string;
  subtitle?: string;
  /** CSS background for the card (gradient, color, or url()). */
  background?: string;
}

export interface BounceCardsProps {
  /** Cards in the fan, left to right. Defaults to a built-in gradient set. */
  items?: BounceCardItem[];
  /** Card width in pixels. */
  cardWidth?: number;
  /** Card height in pixels. */
  cardHeight?: number;
  /** Fan rotation applied per card away from the center, in degrees. */
  rotate?: number;
  /** Horizontal overlap between cards while resting, in pixels. */
  stackGap?: number;
  /** Horizontal spacing between cards while spread (hover/focus), in pixels. */
  spreadGap?: number;
  /** Card corner radius in pixels. */
  radius?: number;
  /** Accessible name for the fan. */
  label?: string;
  className?: string;
}

const DEFAULT_ITEMS: BounceCardItem[] = [
  { title: "Aurora", subtitle: "Calm", background: "linear-gradient(150deg,#7c3aed,#22d3ee)" },
  { title: "Ember", subtitle: "Warm", background: "linear-gradient(150deg,#fb7185,#f59e0b)" },
  { title: "Tide", subtitle: "Cool", background: "linear-gradient(150deg,#0ea5e9,#10b981)" },
  { title: "Nova", subtitle: "Vivid", background: "linear-gradient(150deg,#a855f7,#ec4899)" },
  { title: "Dusk", subtitle: "Soft", background: "linear-gradient(150deg,#6366f1,#0ea5e9)" },
];

/**
 * BounceCards — a fan of overlapping cards that springs into place on mount and
 * spreads apart with a bouncy stagger when you hover or focus it, then settles
 * back. Layout is driven entirely by Framer Motion springs off a single
 * "spread" flag; the entrance and spread collapse to instant transitions for
 * reduced-motion users (who can still spread the fan by focusing it).
 */
export function BounceCards({
  items = DEFAULT_ITEMS,
  cardWidth = 200,
  cardHeight = 260,
  rotate = 8,
  stackGap = 48,
  spreadGap = 150,
  radius = 20,
  label = "Bounce cards",
  className,
}: BounceCardsProps) {
  const [spread, setSpread] = useState(false);
  const reduce = useReducedMotion();
  const n = Math.max(1, items.length);
  const center = (n - 1) / 2;

  return (
    <div
      role="group"
      aria-label={label}
      tabIndex={0}
      onPointerEnter={() => setSpread(true)}
      onPointerLeave={() => setSpread(false)}
      onFocus={() => setSpread(true)}
      onBlur={() => setSpread(false)}
      className={cn(
        "relative grid w-full place-items-center outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
        className,
      )}
      style={{
        maxWidth: cardWidth + spreadGap * (n - 1) + 24,
        height: cardHeight + 48,
      }}
    >
      <span className="sr-only">
        Hover or focus to spread the cards apart.
      </span>
      <div className="relative [transform-style:preserve-3d]" style={{ width: cardWidth, height: cardHeight }}>
        {items.map((item, i) => {
          const off = i - center;
          const x = off * (spread ? spreadGap : stackGap);
          const rot = spread ? off * rotate * 0.35 : off * rotate;
          const y = spread ? 0 : Math.abs(off) * 8;
          return (
            <motion.div
              key={`${item.title}-${i}`}
              className="absolute inset-0 flex flex-col justify-end overflow-hidden border border-white/10 shadow-xl will-change-transform"
              style={{
                borderRadius: radius,
                zIndex: n - Math.abs(off),
                background:
                  item.background ?? "linear-gradient(150deg,#7c3aed,#22d3ee)",
              }}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, x, y, rotate: rot }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                      delay: Math.abs(off) * 0.05,
                    }
              }
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%)",
                }}
              />
              <div className="relative p-4">
                {item.subtitle && (
                  <span className="font-mono text-[11px] tracking-wide text-white/70">
                    {item.subtitle}
                  </span>
                )}
                <p className="text-lg font-semibold text-white drop-shadow-sm">
                  {item.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
