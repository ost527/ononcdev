"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface RippleProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface Ring {
  id: number;
  x: number;
  y: number;
}

/**
 * Ripple — clicking (or pressing) anywhere on the surface emits an expanding
 * concentric ring from the exact point. Each ring cleans itself up on end.
 */
export function Ripple({ className, children, ...props }: RippleProps) {
  const [rings, setRings] = useState<Ring[]>([]);

  const spawn = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRings((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
  };
  const remove = (id: number) =>
    setRings((prev) => prev.filter((r) => r.id !== id));

  return (
    <div
      onPointerDown={spawn}
      className={cn(
        "relative isolate grid place-items-center overflow-hidden bg-background",
        className,
      )}
      {...props}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        {rings.map((ring) => (
          <span
            key={ring.id}
            onAnimationEnd={() => remove(ring.id)}
            className="absolute rounded-full border"
            style={
              {
                left: ring.x,
                top: ring.y,
                width: 480,
                height: 480,
                marginLeft: -240,
                marginTop: -240,
                borderColor: "color-mix(in oklab, var(--brand) 55%, transparent)",
                animation: "ring 1s ease-out forwards",
              } as CSSProperties
            }
          />
        ))}
      </div>
      {children ?? (
        <p className="pointer-events-none text-sm text-muted">
          Click anywhere
        </p>
      )}
    </div>
  );
}
