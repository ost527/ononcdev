"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useState } from "react";
import { motion, type PanInfo } from "motion/react";
import { cn, clamp, seededRandom, prefersReducedMotion } from "@/lib/utils";

export interface CardStackItem {
  /** Card heading. */
  title: string;
  /** Optional supporting line under the title. */
  subtitle?: string;
  /** CSS background for the card (gradient, color, or url()). */
  background?: string;
}

export interface CardStackProps {
  /** Cards in the stack, front to back. Defaults to a built-in gradient set. */
  items?: CardStackItem[];
  /** Card width in pixels. */
  cardWidth?: number;
  /** Card height in pixels. */
  cardHeight?: number;
  /** Drag distance (px, x or y) past which the top card is sent to the back. */
  sensitivity?: number;
  /** Positional offset per card deeper in the stack, in pixels. */
  offset?: number;
  /** Apply a small, deterministic per-card rotation (seeded by index). */
  randomRotate?: boolean;
  /** Clicking the top card also sends it to the back. */
  sendToBackOnClick?: boolean;
  /** Card corner radius in pixels. */
  radius?: number;
  /** Accessible name for the stack. */
  label?: string;
  className?: string;
}

const DEFAULT_ITEMS: CardStackItem[] = [
  { title: "Analytics", subtitle: "Realtime insight", background: "linear-gradient(150deg,#7c3aed,#22d3ee)" },
  { title: "Automation", subtitle: "Flows that run themselves", background: "linear-gradient(150deg,#fb7185,#f59e0b)" },
  { title: "Collaboration", subtitle: "Ship together", background: "linear-gradient(150deg,#0ea5e9,#10b981)" },
  { title: "Security", subtitle: "Locked down by default", background: "linear-gradient(150deg,#a855f7,#ec4899)" },
];

/** Small, deterministic per-card tilt in degrees, stable across renders. */
function cardTilt(index: number) {
  return (seededRandom(index) - 0.5) * 12;
}

/**
 * CardStack — a draggable deck of stacked cards. Drag the top card far
 * enough (or click it, optionally) and it tucks to the back while the rest
 * slide forward to fill in. Order lives in React state, so the stack is
 * fully reorderable without a pointer via the keyboard. Reduced-motion users
 * get instant restacking instead of spring transitions.
 */
export function CardStack({
  items = DEFAULT_ITEMS,
  cardWidth = 300,
  cardHeight = 200,
  sensitivity = 160,
  offset = 10,
  randomRotate = true,
  sendToBackOnClick = false,
  radius = 18,
  label = "Card stack",
  className,
}: CardStackProps) {
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const n = items.length;
  const reduce = prefersReducedMotion();

  const sendToBack = () => {
    setOrder((prev) => (prev.length > 1 ? [...prev.slice(1), prev[0]] : prev));
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      sendToBack();
    }
  };

  const handleTopKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      sendToBack();
    }
  };

  const maxWidth = n > 0 ? cardWidth + offset * (n - 1) + 24 : cardWidth;
  const maxHeight = n > 0 ? cardHeight + offset * (n - 1) + 24 : cardHeight;

  return (
    <div
      role="group"
      aria-roledescription="Card stack"
      aria-label={label}
      tabIndex={n > 1 ? 0 : undefined}
      onKeyDown={n > 1 ? handleTopKeyDown : undefined}
      aria-keyshortcuts="Enter Space"
      className={cn(
        "grid w-full place-items-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
        className,
      )}
      style={{ maxWidth }}
    >
      {n > 1 && (
        <span className="sr-only">
          Press Enter or Space to send the top card to the back.
        </span>
      )}
      <div
        className="relative"
        style={{ width: cardWidth, height: cardHeight, maxHeight }}
      >
        {n === 0
          ? null
          : order.map((itemIndex, depth) => {
              const item = items[itemIndex];
              const isTop = depth === 0;
              const rotate = randomRotate ? cardTilt(itemIndex) : 0;
              const scale = clamp(1 - depth * 0.04, 0, 1);

              return (
                <motion.div
                  key={itemIndex}
                  role="article"
                  aria-hidden={!isTop}
                  onClick={isTop && sendToBackOnClick ? sendToBack : undefined}
                  className={cn(
                    "absolute inset-0 flex flex-col overflow-hidden border border-border bg-surface shadow-xl outline-none",
                    isTop ? "touch-none" : "pointer-events-none",
                    isTop && sendToBackOnClick && "cursor-pointer",
                    isTop && !sendToBackOnClick && "cursor-grab active:cursor-grabbing",
                  )}
                  style={{ borderRadius: radius, zIndex: n - depth }}
                  initial={false}
                  animate={{
                    x: depth * offset,
                    y: depth * offset,
                    rotate,
                    scale,
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 260, damping: 26 }
                  }
                  drag={isTop}
                  dragElastic={0.6}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  whileDrag={{ scale: reduce ? scale : scale * 1.03 }}
                  onDragEnd={isTop ? handleDragEnd : undefined}
                >
                  <div
                    className="relative h-1/2 w-full shrink-0"
                    style={{
                      background:
                        item.background ?? "linear-gradient(150deg,#7c3aed,#22d3ee)",
                    }}
                  />
                  <div className="flex flex-1 flex-col justify-center gap-1 px-5">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-sm text-muted">{item.subtitle}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
}
