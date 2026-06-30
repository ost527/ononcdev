"use client";

import { type ReactNode, useId } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Cloud,
  Code2,
  Database,
  ShieldCheck,
  Sparkles,
  Webhook,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CountUp } from "@/components/text/count-up";
import { cn } from "@/lib/utils";

export interface BentoShowcaseProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  className?: string;
}

/** Bar heights (%) for the analytics mini-chart. */
const BARS = [38, 56, 44, 72, 58, 88, 76];
/** Integration tiles. */
const INTEGRATIONS = [Boxes, Cloud, Database, Code2, Webhook, Zap];
const AVATARS = [
  { initials: "MV", gradient: "from-brand to-brand-2" },
  { initials: "DP", gradient: "from-brand-2 to-brand-3" },
  { initials: "IC", gradient: "from-brand-3 to-brand" },
  { initials: "LR", gradient: "from-indigo-500 to-brand" },
];

/**
 * Cell — the shared surface for every bento tile: a bordered card that lifts a
 * touch and reveals a gradient hairline along its top edge on hover. Animation
 * is driven by the parent's stagger via the passed `variants`.
 */
function Cell({
  className,
  children,
  variants,
  accent = "var(--brand)",
}: {
  className?: string;
  children: ReactNode;
  variants?: Variants;
  accent?: string;
}) {
  return (
    <motion.div
      variants={variants}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-0.5 hover:border-border-strong",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      {children}
    </motion.div>
  );
}

/** A drawn-on-view area sparkline used by the performance cell. */
function Sparkline({ reduce }: { reduce: boolean | null }) {
  const id = useId();
  const line =
    "M0,46 C20,40 28,18 48,24 C70,30 78,8 100,14 C122,20 130,44 152,38 C172,33 184,18 200,12";
  return (
    <svg
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      className="mt-4 h-16 w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--brand-2)" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${line} L200,60 L0,60 Z`}
        fill={`url(#${id}-fill)`}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.25 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={`url(#${id}-stroke)`}
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
 * BentoShowcase — a flagship product bento. Seven cells of varying size, each
 * carrying a bespoke visual (an orbiting hero, an animated bar chart, an avatar
 * stack, an integrations grid, a drawn sparkline, a pulsing security badge, and
 * a live uptime readout). Cells fade and lift in with a stagger on first view,
 * and every animation collapses gracefully under reduced-motion.
 */
export function BentoShowcase({
  eyebrow = "The platform",
  heading = "Everything you need, on one canvas",
  subheading = "A composable foundation that scales from your first prototype to production traffic — without the seams.",
  className,
}: BentoShowcaseProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted">
          <Sparkles className="size-3.5 text-brand-ink" />
          {eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-muted">
          {subheading}
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13rem]"
      >
        {/* Hero — orbiting feature */}
        <Cell
          variants={item}
          className="min-h-[18rem] sm:col-span-2 lg:row-span-2"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 size-56"
          >
            <div
              className="absolute inset-0 rounded-full opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--brand) 45%, transparent), transparent 70%)",
              }}
            />
            <div className="absolute inset-6 animate-spin-slow rounded-full border border-border-strong">
              <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_12px_var(--brand)]" />
            </div>
            <div className="absolute inset-14 animate-spin-slow rounded-full border border-border [animation-direction:reverse] [animation-duration:12s]">
              <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-2 shadow-[0_0_10px_var(--brand-2)]" />
            </div>
            <div className="absolute inset-[5.5rem] rounded-full border border-border" />
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-2">
            Featured
          </span>
          <div className="relative mt-auto">
            <h3 className="text-2xl font-semibold tracking-tight">
              Ship faster with one{" "}
              <span className="text-gradient">cohesive</span> toolkit
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Backgrounds, motion, and polished blocks that already speak the
              same design language — drop them in and go.
            </p>
            <a
              href="#"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink"
            >
              Explore the system
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Cell>

        {/* Analytics — animated bar chart */}
        <Cell variants={item} accent="var(--brand-2)" className="sm:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <BarChart3 className="size-4 text-brand-ink" />
                Realtime analytics
              </div>
              <p className="mt-1 text-xs text-muted">
                Events streamed over the last 7 days
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium text-brand-2">
              <Activity className="size-3" />
              +18%
            </span>
          </div>
          <div className="mt-4 flex h-20 items-end gap-2">
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-brand/25 to-brand"
                style={{ height: `${h}%`, transformOrigin: "bottom" }}
                initial={reduce ? false : { scaleY: 0, opacity: 0.5 }}
                whileInView={reduce ? undefined : { scaleY: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>
        </Cell>

        {/* Community — avatar stack */}
        <Cell variants={item} className="min-h-[12rem]">
          <div className="flex -space-x-3">
            {AVATARS.map((a) => (
              <span
                key={a.initials}
                className={cn(
                  "grid size-9 place-items-center rounded-full bg-gradient-to-br text-xs font-semibold text-white ring-2 ring-surface",
                  a.gradient,
                )}
              >
                {a.initials}
              </span>
            ))}
            <span className="grid size-9 place-items-center rounded-full border border-border bg-background text-xs font-medium text-muted ring-2 ring-surface">
              9k+
            </span>
          </div>
          <div className="mt-auto">
            <div className="text-2xl font-semibold tracking-tight">
              <CountUp to={10} suffix="k+" />
            </div>
            <p className="text-sm text-muted">Teams building with ONONC</p>
          </div>
        </Cell>

        {/* Integrations — icon tile grid */}
        <Cell variants={item} accent="var(--brand-3)" className="min-h-[12rem]">
          <div className="grid grid-cols-3 gap-2">
            {INTEGRATIONS.map((Icon, i) => (
              <span
                key={i}
                className="grid h-12 place-items-center rounded-lg border border-border bg-background text-muted transition-colors duration-300 group-hover:text-brand-ink"
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
          <p className="mt-auto pt-4 text-sm text-muted">
            <span className="font-semibold text-foreground">50+</span> native
            integrations
          </p>
        </Cell>

        {/* Performance — drawn sparkline */}
        <Cell variants={item} className="sm:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-2">
                p95 response time
              </p>
              <div className="mt-1 text-3xl font-semibold tracking-tight">
                <CountUp to={120} suffix="ms" />
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium text-brand-2">
              <Zap className="size-3" />
              Fast
            </span>
          </div>
          <Sparkline reduce={reduce} />
        </Cell>

        {/* Security — pulsing badge */}
        <Cell variants={item} accent="var(--brand-2)" className="min-h-[12rem]">
          <div className="relative w-fit">
            <span
              aria-hidden
              className="absolute inset-0 animate-pulse-ring rounded-xl border border-brand/50"
            />
            <span className="relative grid size-11 place-items-center rounded-xl border border-border bg-background text-brand-ink">
              <ShieldCheck className="size-5" />
            </span>
          </div>
          <div className="mt-auto">
            <h3 className="text-base font-semibold">Secure by default</h3>
            <p className="mt-1 text-sm text-muted">
              SOC 2 Type II and end-to-end encryption.
            </p>
          </div>
        </Cell>

        {/* Uptime — live readout */}
        <Cell variants={item} className="min-h-[12rem]">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Operational
          </span>
          <div className="mt-auto">
            <div className="text-3xl font-semibold tracking-tight">
              <CountUp to={99.98} decimals={2} suffix="%" />
            </div>
            <p className="text-sm text-muted">Uptime over 90 days</p>
          </div>
        </Cell>
      </motion.div>
    </section>
  );
}
