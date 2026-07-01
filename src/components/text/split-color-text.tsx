"use client";

import { type PointerEvent, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SplitColorTextProps {
  text: string;
  className?: string;
}

/**
 * SplitColorText — text is split horizontally at the cursor position:
 * the top half renders in one brand color, the bottom in another. The
 * split line follows the pointer vertically. Pure CSS clip-path driven
 * by rAF; freezes under reduced-motion. Accessible via aria-label.
 */
export function SplitColorText({
  text,
  className,
}: SplitColorTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    const split = splitRef.current;
    if (!root || !split) return;
    const rect = root.getBoundingClientRect();
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      split.style.clipPath = `inset(${(y * 100).toFixed(1)}% 0 0 0)`;
    });
  }, []);

  const reset = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const split = splitRef.current;
    if (split) split.style.clipPath = "inset(50% 0 0 0)";
  }, []);

  return (
    <div
      ref={rootRef}
      aria-label={text}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn(
        "relative inline-flex cursor-default select-none",
        className,
      )}
    >
      {/* Top layer: brand-ink */}
      <span aria-hidden className="text-brand-ink">
        {text}
      </span>
      {/* Bottom layer: brand-2, clipped */}
      <span
        ref={splitRef}
        aria-hidden
        className="absolute inset-0 text-brand-2"
        style={{ clipPath: "inset(50% 0 0 0)" }}
      >
        {text}
      </span>
    </div>
  );
}
