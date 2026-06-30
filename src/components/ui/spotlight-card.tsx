"use client";

import type { HTMLAttributes, PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Spotlight color (CSS color). */
  color?: string;
  /** Spotlight radius in pixels. */
  radius?: number;
  children: ReactNode;
}

/**
 * SpotlightCard — a soft radial glow follows the cursor across the surface.
 * Position is written to CSS variables on pointer move, so it never re-renders.
 */
export function SpotlightCard({
  className,
  color = "var(--brand)",
  radius = 280,
  children,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface p-6",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, ${color} 22%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
