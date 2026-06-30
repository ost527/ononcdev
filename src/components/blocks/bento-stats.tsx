"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  CalendarDays,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CountUp } from "@/components/text/count-up";
import { cn } from "@/lib/utils";

export interface SourceShare {
  label: string;
  value: number;
}

export interface BentoStatsProps {
  eyebrow?: string;
  heading?: string;
  sources?: SourceShare[];
  className?: string;
}

const DEFAULT_SOURCES: SourceShare[] = [
  { label: "Direct", value: 42 },
  { label: "Organic", value: 28 },
  { label: "Referral", value: 18 },
  { label: "Social", value: 12 },
];

/** A horizontal share bar that grows from the left on first view. */
function ShareBar({
  label,
  value,
  delay,
  reduce,
}: {
  label: string;
  value: number;
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 text-sm text-muted">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-brand-2"
          style={{ width: `${value}%` }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-sm font-medium tabular-nums">
        {value}%
      </span>
    </div>
  );
}

/** A compact drawn-on-view area sparkline for the revenue cell. */
function RevenueSpark({ reduce }: { reduce: boolean | null }) {
  const id = useId();
  const line =
    "M0,52 C18,50 30,36 50,38 C72,40 80,20 104,24 C126,28 138,40 160,30 C182,20 190,12 200,8";
  return (
    <svg
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      className="mt-auto h-20 w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--brand-2)" />
        </linearGradient>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${line} L200,60 L0,60 Z`}
        fill={`url(#${id}-f)`}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.25 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={`url(#${id}-s)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
    </svg>
  );
}

/**
 * GoalDial — a radial progress dial that eases from 0 to its value the first
 * time it scrolls into view. Unlike a bare ring it carries an accessible name,
 * so screen readers announce what the percentage measures.
 */
function GoalDial({
  value,
  label,
  reduce,
}: {
  value: number;
  label: string;
  reduce: boolean | null;
}) {
  const gradId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const size = 104;
  const stroke = 9;

  useEffect(() => {
    if (!inView) return;
    const duration = reduce ? 0 : 1200;
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
  }, [inView, value, reduce]);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - display / 100);

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(display)}
      className="relative inline-grid place-items-center"
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

/**
 * BentoStats — an analytics bento that reads like a tidy product dashboard:
 * a revenue hero with a drawn sparkline, a radial goal dial, a live active
 * count, an animated traffic-source breakdown, a conversion KPI, and a rating
 * summary. Every number eases up and every bar grows in on first view, and all
 * of it holds still under reduced-motion.
 */
export function BentoStats({
  eyebrow = "Overview",
  heading = "Numbers that move in real time",
  sources = DEFAULT_SOURCES,
  className,
}: BentoStatsProps) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("w-full", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-brand-ink">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            {heading}
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted">
          <CalendarDays className="size-3.5" />
          Last 30 days
        </span>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[12rem]">
        {/* Revenue — hero metric + sparkline */}
        <div className="flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface p-6 sm:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-2">
                Monthly revenue
              </p>
              <div className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                <CountUp to={128.4} decimals={1} prefix="$" suffix="k" />
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium text-emerald-500">
              <TrendingUp className="size-3" />
              +24%
            </span>
          </div>
          <RevenueSpark reduce={reduce} />
        </div>

        {/* Goal — radial dial */}
        <div className="flex min-h-[12rem] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center">
          <GoalDial value={78} label="Quarterly goal completion" reduce={reduce} />
          <div>
            <p className="text-sm font-medium">Quarterly goal</p>
            <p className="text-xs text-muted">$1.2M target</p>
          </div>
        </div>

        {/* Active now — live count */}
        <div className="flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface p-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
          <div className="mt-auto">
            <div className="flex items-center gap-1.5 text-3xl font-semibold tracking-tight">
              <Users className="size-5 text-brand-ink" />
              <CountUp to={1284} />
            </div>
            <p className="text-sm text-muted">Active users right now</p>
          </div>
        </div>

        {/* Traffic sources — animated bars */}
        <div className="flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface p-6 sm:col-span-2">
          <p className="text-sm font-medium">Traffic sources</p>
          <div className="mt-auto flex flex-col gap-3">
            {sources.map((s, i) => (
              <ShareBar
                key={s.label}
                label={s.label}
                value={s.value}
                delay={i * 0.08}
                reduce={reduce}
              />
            ))}
          </div>
        </div>

        {/* Conversion — KPI */}
        <div className="flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface p-6">
          <p className="text-[11px] uppercase tracking-wider text-muted-2">
            Checkout conversion
          </p>
          <div className="mt-auto">
            <div className="text-3xl font-semibold tracking-tight">
              <CountUp to={3.8} decimals={1} suffix="%" />
            </div>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium text-emerald-500">
              <TrendingUp className="size-3" />
              +0.6 pts
            </span>
          </div>
        </div>

        {/* Rating — satisfaction */}
        <div className="flex min-h-[12rem] flex-col rounded-2xl border border-border bg-surface p-6">
          <div className="flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-brand text-brand" />
            ))}
          </div>
          <div className="mt-auto">
            <div className="text-3xl font-semibold tracking-tight">
              <CountUp to={4.9} decimals={1} />
              <span className="text-lg text-muted">/5</span>
            </div>
            <p className="text-sm text-muted">From 2,400 reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
