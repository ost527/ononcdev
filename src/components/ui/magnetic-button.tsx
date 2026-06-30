"use client";

import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor offset the button follows (0–1). */
  strength?: number;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

/**
 * MagneticButton — the button is gently pulled toward the pointer while it
 * hovers, snapping back with a spring on leave. The transform lives on a
 * wrapper so all native button semantics stay intact.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.4,
  onClick,
  type = "button",
  ...aria
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 14, mass: 0.3 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const handleMove = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90",
          className,
        )}
        {...aria}
      >
        {children}
      </button>
    </motion.span>
  );
}
