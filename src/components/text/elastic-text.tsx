"use client";

import { type PointerEvent, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ElasticTextProps {
  text: string;
  className?: string;
  /** Radius of elastic influence around the pointer (px). */
  radius?: number;
  /** Maximum extra scale applied to letters near the cursor. */
  maxScale?: number;
}

/**
 * ElasticText — letters stretch toward the pointer like rubber, with a
 * gravity-like falloff. Pointer-driven on a rAF; reduced-motion users
 * see static text. Screen readers get the raw text via aria-label.
 */
export function ElasticText({
  text,
  className,
  radius = 120,
  maxScale = 0.5,
}: ElasticTextProps) {
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
          const dist = Math.hypot(dx, clientY - cy);
          const t = Math.max(0, 1 - dist / radius);
          const scaleX = 1 + t * maxScale;
          const scaleY = 1 - t * maxScale * 0.4;
          el.style.transform = `scale(${scaleX}, ${scaleY})`;
        });
      });
    },
    [radius, maxScale],
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
          style={{ whiteSpace: "pre", transition: "transform 0.2s ease-out" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
