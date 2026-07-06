"use client";

import { type KeyboardEvent, type PointerEvent, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Volume1, Volume2 } from "lucide-react";
import { cn, clamp, prefersReducedMotion } from "@/lib/utils";

/** Props for {@link ElasticSlider}. */
export interface ElasticSliderProps {
  /** Initial value when uncontrolled. */
  defaultValue?: number;
  /** Minimum value. */
  min?: number;
  /** Maximum value. */
  max?: number;
  /** Increment per key press / drag snap. */
  step?: number;
  /** Number of evenly spaced tick marks along the track; 0 renders none. */
  markers?: number;
  /** Spring stiffness driving the elastic overflow stretch. */
  stiffness?: number;
  /** Spring damping driving the elastic overflow stretch. */
  damping?: number;
  /** Max pixels the track elastically stretches past an end while dragging. */
  overflow?: number;
  /** Flank the track with min/max icons (lucide Volume1 / Volume2). */
  showIcons?: boolean;
  /** Fill color, as a hex string. */
  accent?: string;
  /** Called with the new value whenever it changes. */
  onValueChange?: (value: number) => void;
  /** Accessible name for the slider. */
  label?: string;
  /** Additional class names for the root element. */
  className?: string;
}

/**
 * ElasticSlider — an accessible range slider that elastically stretches when
 * dragged past a bound, springing back to shape on release. Fully keyboard
 * operable (Arrow/Home/End/PageUp/PageDown). The elastic stretch is skipped
 * under `prefers-reduced-motion: reduce`, leaving a plain accessible slider.
 */
export function ElasticSlider({
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  markers = 0,
  stiffness = 300,
  damping = 30,
  overflow = 60,
  showIcons = true,
  accent = "#8b5cf6",
  onValueChange,
  label = "Elastic slider",
  className,
}: ElasticSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [value, setValue] = useState(() => clamp(defaultValue, min, max));

  const overflowAmount = useMotionValue(0);
  const springed = useSpring(overflowAmount, { stiffness, damping });
  const scaleX = useTransform(springed, (v) => 1 + Math.abs(v) / 300);
  const scaleY = useTransform(springed, (v) => 1 - Math.min(0.4, Math.abs(v) / 400));

  const reduce = prefersReducedMotion();
  const pct = ((value - min) / (max - min)) * 100;

  const set = (raw: number) => {
    const snapped = clamp(Math.round(raw / step) * step, min, max);
    setValue(snapped);
    onValueChange?.(snapped);
  };

  const fromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const ratio = (clientX - rect.left) / rect.width;
    set(min + ratio * (max - min));

    if (!reduce) {
      if (ratio < 0) overflowAmount.set(ratio * overflow);
      else if (ratio > 1) overflowAmount.set((ratio - 1) * overflow);
      else overflowAmount.set(0);
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) fromClientX(e.clientX);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    overflowAmount.set(0);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      set(value + step);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      set(value - step);
    } else if (e.key === "Home") {
      e.preventDefault();
      set(min);
    } else if (e.key === "End") {
      e.preventDefault();
      set(max);
    } else if (e.key === "PageUp") {
      e.preventDefault();
      set(value + step * 10);
    } else if (e.key === "PageDown") {
      e.preventDefault();
      set(value - step * 10);
    }
  };

  const ticks =
    markers > 0
      ? Array.from({ length: markers }, (_, i) => (i / Math.max(1, markers - 1)) * 100)
      : [];

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <motion.div
        style={reduce ? undefined : { scaleX, scaleY }}
        className="flex w-full items-center gap-3"
      >
        {showIcons && (
          <Volume1 className="size-4 shrink-0 text-muted" aria-hidden="true" />
        )}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="relative flex h-6 w-full touch-none items-center"
        >
          <div className="h-1.5 w-full rounded-full bg-surface" />
          <div
            className="absolute h-1.5 rounded-full"
            style={{ width: `${pct}%`, background: accent }}
          />
          {ticks.map((t, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="absolute top-1/2 size-1 -translate-y-1/2 rounded-full bg-muted-2"
              style={{ left: `${t}%` }}
            />
          ))}
          <div
            role="slider"
            tabIndex={0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-label={label}
            onKeyDown={onKeyDown}
            style={{ left: `${pct}%`, borderColor: accent }}
            className="absolute size-4 -translate-x-1/2 cursor-grab rounded-full border-2 bg-background shadow outline-none focus-visible:ring-2 focus-visible:ring-brand/50 active:cursor-grabbing"
          />
        </div>
        {showIcons && (
          <Volume2 className="size-4 shrink-0 text-muted" aria-hidden="true" />
        )}
      </motion.div>
    </div>
  );
}
