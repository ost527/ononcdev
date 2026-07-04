"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clamp, cn } from "@/lib/utils";

export interface GooeyNavProps {
  /** Item labels, left to right. Defaults to a built-in set. */
  items?: string[];
  /** Index selected on first render. */
  defaultActive?: number;
  /** Indicator color (hex). */
  color?: string;
  /** Gooey blur strength (feGaussianBlur stdDeviation). */
  gooStrength?: number;
  /** Nav height in pixels. */
  height?: number;
  /** Fires with the selected index. */
  onChange?: (index: number) => void;
  /** Accessible name for the navigation. */
  label?: string;
  className?: string;
}

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

const DEFAULT_ITEMS = ["Home", "Projects", "Studio", "About", "Contact"];

/**
 * GooeyNav — a pill navigation whose active indicator morphs between items with
 * a liquid "gooey" merge, produced by an SVG blur+contrast filter over a moving
 * pill and a trailing blob. Item boxes are measured with a ResizeObserver and
 * the indicator springs to the active one; the labels stay outside the filtered
 * layer so text is always crisp. Buttons are natively focusable/activatable and
 * carry aria-current; the morph collapses to instant for reduced-motion users.
 */
export function GooeyNav({
  items = DEFAULT_ITEMS,
  defaultActive = 0,
  color = "#8b5cf6",
  gooStrength = 7,
  height = 46,
  onChange,
  label = "Primary",
  className,
}: GooeyNavProps) {
  const rawId = useId();
  const filterId = `goo-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const navRef = useRef<HTMLElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(() =>
    clamp(defaultActive, 0, Math.max(0, items.length - 1)),
  );
  const [rects, setRects] = useState<Rect[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () =>
      setRects(
        btnRefs.current.map((b) => ({
          left: b?.offsetLeft ?? 0,
          top: b?.offsetTop ?? 0,
          width: b?.offsetWidth ?? 0,
          height: b?.offsetHeight ?? 0,
        })),
      );
    const ro = new ResizeObserver(measure);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [items]);

  const select = (i: number) => {
    setActive(i);
    onChange?.(i);
  };

  const idx = clamp(active, 0, Math.max(0, items.length - 1));
  const target = rects[idx];
  const ready = Boolean(target);
  const blob = height * 0.5;
  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 400, damping: 30 };
  const blobSpring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 220, damping: 16 };

  return (
    <nav
      ref={navRef}
      aria-label={label}
      className={cn(
        "relative inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1.5",
        className,
      )}
    >
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation={gooStrength} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      {/* Gooey indicator layer (behind the labels). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ filter: `url(#${filterId})`, opacity: ready ? 1 : 0 }}
      >
        <motion.span
          className="absolute left-0 top-0 block"
          style={{ background: color, borderRadius: 999 }}
          initial={false}
          animate={{
            x: target?.left ?? 0,
            y: target?.top ?? 0,
            width: target?.width ?? 0,
            height: target?.height ?? 0,
          }}
          transition={spring}
        />
        <motion.span
          className="absolute left-0 top-0 block rounded-full"
          style={{ background: color, width: blob, height: blob }}
          initial={false}
          animate={{
            x: (target?.left ?? 0) + (target?.width ?? 0) / 2 - blob / 2,
            y: (target?.top ?? 0) + (target?.height ?? 0) / 2 - blob / 2,
          }}
          transition={blobSpring}
        />
      </div>

      {items.map((item, i) => (
        <button
          key={`${item}-${i}`}
          ref={(el) => {
            btnRefs.current[i] = el;
          }}
          type="button"
          onClick={() => select(i)}
          aria-current={i === idx ? "page" : undefined}
          className={cn(
            "relative z-10 rounded-full px-4 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/60",
            i === idx ? "text-white" : "text-muted hover:text-foreground",
          )}
          style={{ height: height - 12 }}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}
