"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface CountUpProps {
  /** Target value. */
  to: number;
  /** Starting value. */
  from?: number;
  /** Tween duration in seconds. */
  duration?: number;
  /** Decimal places. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Group thousands with commas. */
  separator?: boolean;
  className?: string;
}

/**
 * CountUp — eases a number from `from` to `to` the first time it scrolls into
 * view (easeOutCubic). Jumps straight to the value under reduced-motion.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = true,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(from);
  const raf = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const seconds = prefersReducedMotion() ? 0 : duration;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const p = seconds <= 0 ? 1 : Math.min(1, elapsed / seconds);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (to - from) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, to, from, duration]);

  const formatted = (() => {
    const fixed = value.toFixed(decimals);
    if (!separator) return fixed;
    const [int, dec] = fixed.split(".");
    const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return dec ? `${grouped}.${dec}` : grouped;
  })();

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
