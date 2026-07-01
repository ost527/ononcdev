"use client";

import { type PointerEvent, useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ShakeTextProps {
  text: string;
  className?: string;
  /** Shake intensity in px. */
  intensity?: number;
}

/**
 * ShakeText — text vibrates with random micro-displacements on pointer move,
 * settling instantly when the pointer leaves. No animation loop; direct DOM
 * rAF writes. Reduced-motion users get static text. Accessible via aria-label.
 */
export function ShakeText({
  text,
  className,
  intensity = 2.5,
}: ShakeTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const mulberry32 = (seed: number) => {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLSpanElement>) => {
      const el = rootRef.current;
      if (!el) return;
      cancelAnimationFrame(raf.current);
      const seed = Math.floor(e.timeStamp / 40);
      raf.current = requestAnimationFrame(() => {
        const dx = (mulberry32(seed) - 0.5) * intensity * 2;
        const dy = (mulberry32(seed + 100) - 0.5) * intensity * 2;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    },
    [intensity],
  );

  const reset = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const el = rootRef.current;
    if (el) el.style.transform = "";
  }, []);

  return (
    <span
      ref={rootRef}
      aria-label={text}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn("inline-flex cursor-default select-none", className)}
    >
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
