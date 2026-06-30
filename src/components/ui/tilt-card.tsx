"use client";

import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Show the moving glare highlight. */
  glare?: boolean;
}

/**
 * TiltCard — tilts in 3D toward the pointer with a spring, and casts a soft
 * glare that tracks the cursor. Flattens smoothly on leave.
 */
export function TiltCard({
  children,
  className,
  max = 12,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(180px circle at ${glareX} ${glareY}, rgba(255,255,255,0.22), transparent 60%)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("relative rounded-2xl", className)}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}
