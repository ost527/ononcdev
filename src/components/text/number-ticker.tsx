"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn, prefersReducedMotion } from "@/lib/utils";

function Digit({ digit }: { digit: number }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden">
      <span
        className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-700 ease-out"
        style={{ transform: `translateY(-${digit}em)` }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="flex h-[1em] items-center justify-center leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export interface NumberTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * NumberTicker — an odometer. Each digit column rolls to its target when the
 * element scrolls into view. Exposed value is announced via aria-label.
 */
export function NumberTicker({ value, prefix = "", suffix = "", className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = prefersReducedMotion() ? 0 : 1300;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = duration <= 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const formatted = display.toLocaleString("en-US");

  return (
    <span
      ref={ref}
      aria-label={`${prefix}${value.toLocaleString("en-US")}${suffix}`}
      className={cn("inline-flex items-center tabular-nums", className)}
    >
      <span aria-hidden className="inline-flex items-center">
        {prefix}
        {formatted.split("").map((char, i) =>
          /\d/.test(char) ? (
            <Digit key={i} digit={Number(char)} />
          ) : (
            <span key={i}>{char}</span>
          ),
        )}
        {suffix}
      </span>
    </span>
  );
}
