"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface ProgressRingProps {
  /** Target percentage (0–100). */
  value?: number;
  size?: number;
  stroke?: number;
  className?: string;
}

/**
 * ProgressRing — a radial progress dial that eases from 0 to its value the
 * first time it scrolls into view, with a gradient arc and a live percentage.
 */
export function ProgressRing({
  value = 72,
  size = 120,
  stroke = 10,
  className,
}: ProgressRingProps) {
  const gradId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = prefersReducedMotion() ? 0 : 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = duration <= 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - display / 100);

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(display)}
      className={cn("relative inline-grid place-items-center", className)}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand)" />
            <stop offset="100%" stopColor="var(--brand-2)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-xl font-semibold tabular-nums">
        {Math.round(display)}%
      </span>
    </div>
  );
}
