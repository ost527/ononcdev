"use client";

import {
  type ButtonHTMLAttributes,
  type PointerEvent,
  type ReactNode,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * RippleButton — emits a circular ripple from the exact press point on each
 * pointer-down, cleaning each ripple up when its animation ends.
 */
export function RippleButton({
  className,
  children,
  onPointerDown,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    setRipples((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x: e.clientX - rect.left - size / 2,
        y: e.clientY - rect.top - size / 2,
        size,
      },
    ]);
    onPointerDown?.(e);
  };

  const remove = (id: number) =>
    setRipples((prev) => prev.filter((r) => r.id !== id));

  return (
    <button
      onPointerDown={handlePointerDown}
      className={cn(
        "relative overflow-hidden rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white",
        className,
      )}
      {...props}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          onAnimationEnd={() => remove(r.id)}
          className="pointer-events-none absolute rounded-full bg-white/40"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            animation: "ripple 0.6s ease-out",
          }}
        />
      ))}
      <span className="relative">{children}</span>
    </button>
  );
}
