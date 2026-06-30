"use client";

import { type KeyboardEvent, type PointerEvent, type ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ImageCompareProps {
  before: ReactNode;
  after: ReactNode;
  className?: string;
  /** Starting split position (0–100). */
  defaultPosition?: number;
}

/**
 * ImageCompare — drag (or use ←/→) to wipe between a "before" and "after"
 * layer. The handle is an accessible slider.
 */
export function ImageCompare({
  before,
  after,
  className,
  defaultPosition = 50,
}: ImageCompareProps) {
  const [pos, setPos] = useState(defaultPosition);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) update(e.clientX);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 4));
    }
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={cn(
        "relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-2xl border border-border",
        className,
      )}
    >
      <div className="absolute inset-0">{before}</div>
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {after}
      </div>
      <div
        className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white/90"
        style={{ left: `${pos}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparison position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-white/60 bg-background/80 text-foreground shadow-lg outline-none backdrop-blur focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span className="text-xs">↔</span>
        </div>
      </div>
    </div>
  );
}
