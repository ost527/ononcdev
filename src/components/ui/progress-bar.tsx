"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  /** Target value (0–100). */
  value: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

/**
 * ProgressBar — a linear meter that fills to its value the first time it
 * scrolls into view. Exposed as an ARIA progressbar.
 */
export function ProgressBar({
  value,
  label,
  showValue = true,
  className,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const v = Math.max(0, Math.min(100, value));

  return (
    <div ref={ref} className={cn("w-72", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label ? <span className="text-foreground">{label}</span> : <span />}
          {showValue && <span className="tabular-nums text-muted">{v}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={v}
        aria-label={label ?? "Progress"}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-2"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2 transition-[width] duration-700 ease-out"
          style={{ width: inView ? `${v}%` : "0%" }}
        />
      </div>
    </div>
  );
}
