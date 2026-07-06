"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn, clamp, prefersReducedMotion } from "@/lib/utils";

export interface MagnetProps {
  /** Content the magnet effect wraps. Carries its own semantics. */
  children: ReactNode;
  /** Activation radius (px) around the element's bounds. */
  padding?: number;
  /** Fraction (0–1) of the pointer offset the element follows. */
  strength?: number;
  /** Maximum translation in either axis, in pixels. */
  maxTranslate?: number;
  /** Spring stiffness driving the follow motion. */
  springStiffness?: number;
  /** Spring damping driving the follow motion. */
  springDamping?: number;
  /** Disable the magnet effect entirely. */
  disabled?: boolean;
  /** Class name applied to the outer, non-moving wrapper. */
  className?: string;
  /** Class name applied to the inner, moving element. */
  innerClassName?: string;
}

/**
 * Magnet — wraps arbitrary children so the inner element is pulled toward
 * the pointer whenever it comes within `padding` pixels of the element's
 * bounds, springing back to rest on exit. Purely presentational: the
 * wrapper never intercepts pointer events, so children keep their own
 * interactivity. Disabled automatically under reduced motion.
 */
export function Magnet({
  children,
  padding = 120,
  strength = 0.4,
  maxTranslate = 40,
  springStiffness = 200,
  springDamping = 18,
  disabled = false,
  className,
  innerClassName,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: springStiffness, damping: springDamping });
  const sy = useSpring(y, { stiffness: springStiffness, damping: springDamping });

  useEffect(() => {
    if (disabled || prefersReducedMotion()) {
      x.set(0);
      y.set(0);
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const withinBounds =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (withinBounds) {
        x.set(clamp((e.clientX - cx) * strength, -maxTranslate, maxTranslate));
        y.set(clamp((e.clientY - cy) * strength, -maxTranslate, maxTranslate));
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [disabled, padding, strength, maxTranslate, x, y]);

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      <motion.div style={{ x: sx, y: sy }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  );
}
