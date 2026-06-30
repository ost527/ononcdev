"use client";

import { type ReactNode, useId, useRef } from "react";
import { motion, useInView } from "motion/react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: ReactNode;
  /** Period-over-period change in %. Its sign drives the arrow and color. */
  delta?: number;
  /** Small muted qualifier, e.g. "vs last week". */
  hint?: string;
  icon?: ReactNode;
  /** Optional sparkline series; drawn and animated the first time in view. */
  data?: number[];
  className?: string;
}

function sparkPath(data: number[], w: number, h: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  return data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((d - min) / span) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

/**
 * StatCard — a KPI tile: a label, a prominent value, an optional trend delta
 * (green up / red down) and a gradient sparkline that draws itself the first
 * time the card scrolls into view.
 */
export function StatCard({
  label,
  value,
  delta,
  hint,
  icon,
  data,
  className,
}: StatCardProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const up = (delta ?? 0) >= 0;
  const path = data && data.length > 1 ? sparkPath(data, 100, 32) : "";

  return (
    <div
      ref={ref}
      className={cn(
        "w-60 rounded-2xl border border-border bg-surface p-5",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        {icon && <span className="text-muted-2">{icon}</span>}
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="text-2xl font-semibold tabular-nums text-foreground">
            {value}
          </div>
          {(delta !== undefined || hint) && (
            <div className="mt-1 flex items-center gap-1.5 text-xs">
              {delta !== undefined && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 font-medium",
                    up
                      ? "text-emerald-600 dark:text-emerald-300"
                      : "text-rose-600 dark:text-rose-300",
                  )}
                >
                  {up ? (
                    <TrendingUp className="size-3.5" />
                  ) : (
                    <TrendingDown className="size-3.5" />
                  )}
                  {up ? "+" : ""}
                  {delta}%
                </span>
              )}
              {hint && <span className="truncate text-muted">{hint}</span>}
            </div>
          )}
        </div>
        {path && (
          <svg
            viewBox="0 0 100 32"
            preserveAspectRatio="none"
            aria-hidden
            className="h-9 w-24 shrink-0"
          >
            <defs>
              <linearGradient id={`${id}-spark`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--brand)" />
                <stop offset="100%" stopColor="var(--brand-2)" />
              </linearGradient>
            </defs>
            <motion.path
              d={path}
              fill="none"
              stroke={`url(#${id}-spark)`}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: 1, ease: "easeOut" }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
