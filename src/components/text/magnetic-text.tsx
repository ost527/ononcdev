"use client";

import { type PointerEvent, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export interface MagneticTextProps {
  text: string;
  className?: string;
  /** Maximum pixel displacement toward the cursor. */
  pull?: number;
  /** Radius of magnetic influence. */
  radius?: number;
}

/**
 * MagneticText — each letter is pulled toward the cursor like iron filings
 * toward a magnet, then springs back on leave. Pointer-driven rAF; freezes
 * under reduced-motion. Accessible via aria-label.
 */
export function MagneticText({
  text,
  className,
  pull = 14,
  radius = 150,
}: MagneticTextProps) {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const raf = useRef(0);

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLSpanElement>) => {
      const { clientX, clientY } = e;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        charRefs.current.forEach((el) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = clientX - cx;
          const dy = clientY - cy;
          const dist = Math.hypot(dx, dy);
          const t = Math.max(0, 1 - dist / radius);
          const smoothT = t * t;
          el.style.transform = `translate(${dx * smoothT * (pull / radius) * 3}px, ${dy * smoothT * (pull / radius) * 3}px)`;
        });
      });
    },
    [pull, radius],
  );

  const reset = useCallback(() => {
    cancelAnimationFrame(raf.current);
    charRefs.current.forEach((el) => {
      if (el) el.style.transform = "";
    });
  }, []);

  return (
    <span
      aria-label={text}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn("inline-flex cursor-default select-none", className)}
    >
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          ref={(el) => { charRefs.current[i] = el; }}
          aria-hidden
          className="inline-block transition-transform duration-300 ease-out"
          style={{ whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
