"use client";

import { type PointerEvent, useEffect, useRef } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface TextPressureProps {
  text: string;
  className?: string;
  /** Pixel radius of influence around the pointer. */
  radius?: number;
  /** Maximum extra scale applied to the closest letter. */
  maxScale?: number;
}

/**
 * TextPressure — letters swell and thicken toward the pointer, like a pressure
 * field. Pointer-driven (no animation loop); style is written directly to the
 * DOM in a rAF. The full string is exposed via aria-label, and reduced-motion
 * users get a static, unreactive label.
 */
export function TextPressure({
  text,
  className,
  radius = 130,
  maxScale = 0.6,
}: TextPressureProps) {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const apply = (clientX: number, clientY: number) => {
    charRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(clientX - cx, clientY - cy);
      const t = Math.max(0, 1 - dist / radius);
      el.style.transform = `scale(${1 + t * maxScale})`;
      el.style.fontWeight = String(400 + Math.round(t * 500));
    });
  };

  const onPointerMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion()) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => apply(clientX, clientY));
  };

  const reset = () => {
    cancelAnimationFrame(raf.current);
    charRefs.current.forEach((el) => {
      if (el) {
        el.style.transform = "";
        el.style.fontWeight = "";
      }
    });
  };

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
          className="inline-block origin-center transition-transform duration-150 will-change-transform"
          style={{ whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
