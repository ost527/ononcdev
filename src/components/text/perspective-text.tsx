"use client";

import { type PointerEvent, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PerspectiveTextProps {
  text: string;
  className?: string;
  /** Maximum tilt in degrees. */
  tilt?: number;
}

/**
 * PerspectiveText — text tilts in 3D toward the mouse pointer with
 * a subtle parallax glow. Pointer-driven via CSS transform on a rAF.
 * Reduced-motion users see static text.
 */
export function PerspectiveText({
  text,
  className,
  tilt = 16,
}: PerspectiveTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLSpanElement>) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(600px) rotateY(${x * tilt}deg) rotateX(${-y * tilt}deg)`;
        el.style.textShadow = [
          `${x * 12}px ${-y * 12}px 18px rgba(139, 92, 246, 0.3)`,
          `${-x * 8}px ${y * 8}px 14px rgba(8, 145, 178, 0.25)`,
        ].join(", ");
      });
    },
    [tilt],
  );

  const reset = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const el = rootRef.current;
    if (el) {
      el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
      el.style.textShadow = "";
    }
  }, []);

  return (
    <span
      ref={rootRef}
      aria-label={text}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn(
        "inline-flex cursor-default select-none transition-transform duration-200 ease-out will-change-transform",
        className,
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block"
          style={{ whiteSpace: "pre", transform: "translateZ(0)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
