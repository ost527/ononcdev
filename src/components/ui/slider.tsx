"use client";

import { type KeyboardEvent, type PointerEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  className?: string;
  "aria-label"?: string;
}

/**
 * Slider — an accessible range input. Drag the thumb or the track; ←/→ and
 * Home/End adjust by step. Works controlled or uncontrolled.
 */
export function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  value,
  onValueChange,
  className,
  ...aria
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const pct = ((current - min) / (max - min)) * 100;

  const set = (v: number) => {
    const snapped = Math.round(Math.max(min, Math.min(max, v)) / step) * step;
    if (value === undefined) setInternal(snapped);
    onValueChange?.(snapped);
  };

  const fromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    set(min + ((clientX - rect.left) / rect.width) * (max - min));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) fromClientX(e.clientX);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      set(current + step);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      set(current - step);
    } else if (e.key === "Home") {
      e.preventDefault();
      set(min);
    } else if (e.key === "End") {
      e.preventDefault();
      set(max);
    }
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={cn(
        "relative flex h-6 w-56 touch-none items-center",
        className,
      )}
    >
      <div className="h-1.5 w-full rounded-full bg-surface-2" />
      <div
        className="absolute h-1.5 rounded-full bg-brand"
        style={{ width: `${pct}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-label={aria["aria-label"] ?? "Value"}
        onKeyDown={onKeyDown}
        style={{ left: `${pct}%` }}
        className="absolute size-4 -translate-x-1/2 cursor-grab rounded-full border-2 border-brand bg-background shadow outline-none focus-visible:ring-2 focus-visible:ring-brand/50 active:cursor-grabbing"
      />
    </div>
  );
}
