"use client";

import type { CSSProperties, HTMLAttributes, PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightCursorProps extends HTMLAttributes<HTMLDivElement> {
  /** Spotlight radius in pixels. */
  radius?: number;
  children?: ReactNode;
}

/**
 * SpotlightCursor — a hidden dot grid that's only revealed inside a soft
 * spotlight tracking the cursor, via a CSS mask updated through variables
 * (no re-renders).
 */
export function SpotlightCursor({
  className,
  radius = 180,
  children,
  ...props
}: SpotlightCursorProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  const mask = `radial-gradient(${radius}px circle at var(--sx, 50%) var(--sy, 50%), #000 0%, transparent 72%)`;

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn("relative isolate overflow-hidden bg-background", className)}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={
          {
            backgroundImage:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-ink) 70%, transparent) 1.2px, transparent 1.2px)",
            backgroundSize: "22px 22px",
            maskImage: mask,
            WebkitMaskImage: mask,
          } as CSSProperties
        }
      />
      {children}
    </div>
  );
}
