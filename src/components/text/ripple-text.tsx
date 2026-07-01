"use client";

import { type PointerEvent, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface RippleTextProps {
  text: string;
  className?: string;
  /** Radius of the ripple wave in px. */
  radius?: number;
  /** Maximum vertical displacement of letters. */
  amplitude?: number;
}

/**
 * RippleText — letters undulate away from the cursor like a ripple on water.
 * Pointer-driven on a rAF; reduced-motion users see static text. Accessible
 * via aria-label.
 */
export function RippleText({
  text,
  className,
  radius = 100,
  amplitude = 14,
}: RippleTextProps) {
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
          const dist = Math.hypot(clientX - cx, clientY - cy);
          const t = Math.max(0, 1 - dist / radius);
          // Ripple: sine wave over distance
          const wave = Math.sin(t * Math.PI * 3) * t * amplitude;
          el.style.transform = `translateY(${wave}px)`;
        });
      });
    },
    [radius, amplitude],
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
          ref={(el) => {
            charRefs.current[i] = el;
          }}
          aria-hidden
          className="inline-block origin-center"
          style={{ whiteSpace: "pre", transition: "transform 0.15s ease-out" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
