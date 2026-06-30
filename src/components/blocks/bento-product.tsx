"use client";

import { type ReactNode, useId } from "react";
import {
  BarChart3,
  Folder,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CountUp } from "@/components/text/count-up";
import { cn } from "@/lib/utils";

export interface BentoProductProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  className?: string;
}

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

/** A drawn-on-view area chart for the app-window mock. */
function AreaChart({ reduce }: { reduce: boolean | null }) {
  const id = useId();
  const line =
    "M0,40 C16,38 24,24 40,26 C58,28 64,14 84,18 C104,22 112,30 132,22 C152,14 160,8 176,10 C190,12 196,16 200,14";
  return (
    <svg
      viewBox="0 0 200 50"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--brand-2)" />
        </linearGradient>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${line} L200,50 L0,50 Z`}
        fill={`url(#${id}-f)`}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={`url(#${id}-s)`}
        strokeWidth="2"
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

const NAV = [
  { icon: <LayoutDashboard className="size-4" />, label: "Overview" },
  { icon: <Folder className="size-4" />, label: "Projects" },
  { icon: <BarChart3 className="size-4" />, label: "Reports" },
  { icon: <Settings className="size-4" />, label: "Settings" },
];

const STATS = [
  { label: "Revenue", value: "$48k" },
  { label: "Users", value: "2,310" },
  { label: "Churn", value: "1.2%" },
];

const COLUMNS = [
  { name: "To do", cards: 2, tint: "bg-muted-2/40" },
  { name: "Doing", cards: 2, tint: "bg-brand/60" },
  { name: "Done", cards: 1, tint: "bg-emerald-500/60" },
];

const ACTIVITY = [
  { who: "Mara", what: "shipped v2.4", when: "2m", gradient: "from-brand to-brand-2" },
  { who: "Devon", what: "opened a PR", when: "18m", gradient: "from-brand-2 to-brand-3" },
  { who: "Iris", what: "left a review", when: "1h", gradient: "from-brand-3 to-brand" },
];

/**
 * BentoProduct — a "see it in action" bento. The hero is a faithful app-window
 * mock (chrome, sidebar nav, and a chart that draws itself), surrounded by a
 * mini kanban board, a live activity feed, and a headline KPI. It's all real
 * markup — resizable, themable, and still under reduced-motion.
 */
export function BentoProduct({
  eyebrow = "Product",
  heading = "See your whole workspace at a glance",
  subheading = "One calm surface for projects, metrics, and the people moving them forward.",
  className,
}: BentoProductProps) {
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
          <LayoutDashboard className="size-3.5 text-brand-ink" />
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
        {/* App window — hero */}
        <Cell
          variants={item}
          className="min-h-[20rem] p-0 sm:col-span-2 lg:row-span-2"
        >
          <div className="flex h-full flex-col">
            {/* chrome */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="size-2.5 rounded-full bg-brand-3/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 flex-1 truncate rounded-md bg-background px-3 py-1 text-[11px] text-muted-2">
                app.ononc.ui/dashboard
              </span>
            </div>
            {/* body */}
            <div className="flex min-h-0 flex-1">
              <nav className="hidden w-32 shrink-0 flex-col gap-1 border-r border-border p-3 sm:flex">
                {NAV.map((n, i) => (
                  <span
                    key={n.label}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm",
                      i === 0
                        ? "bg-surface-2 font-medium text-foreground"
                        : "text-muted",
                    )}
                  >
                    <span className={i === 0 ? "text-brand-ink" : ""}>
                      {n.icon}
                    </span>
                    {n.label}
                  </span>
                ))}
              </nav>
              <div className="flex min-w-0 flex-1 flex-col p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Overview</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-muted">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Live
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg border border-border bg-background px-2.5 py-2"
                    >
                      <div className="text-[10px] uppercase tracking-wide text-muted-2">
                        {s.label}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold tabular-nums">
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 min-h-0 flex-1">
                  <AreaChart reduce={reduce} />
                </div>
              </div>
            </div>
          </div>
        </Cell>

        {/* Kanban */}
        <Cell variants={item} accent="var(--brand-2)" className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Sprint board</h3>
            <span className="text-xs text-muted">5 tasks</span>
          </div>
          <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
            {COLUMNS.map((col) => (
              <div
                key={col.name}
                className="flex flex-col rounded-lg border border-border bg-background p-2"
              >
                <span className="mb-2 text-[10px] uppercase tracking-wide text-muted-2">
                  {col.name}
                </span>
                <div className="flex flex-col gap-1.5">
                  {Array.from({ length: col.cards }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-md border border-border bg-surface p-2"
                    >
                      <span className={cn("block h-1.5 w-3/4 rounded-full", col.tint)} />
                      <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-border-strong" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Cell>

        {/* Activity feed */}
        <Cell variants={item} className="min-h-[12rem]">
          <h3 className="text-sm font-medium">Activity</h3>
          <ul className="mt-3 flex flex-col gap-2.5">
            {ACTIVITY.map((a) => (
              <li key={a.who} className="flex items-center gap-2.5 text-sm">
                <span
                  aria-hidden
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white",
                    a.gradient,
                  )}
                >
                  {a.who[0]}
                </span>
                <span className="min-w-0 flex-1 truncate text-muted">
                  <span className="font-medium text-foreground">{a.who}</span>{" "}
                  {a.what}
                </span>
                <span className="shrink-0 text-xs text-muted-2">{a.when}</span>
              </li>
            ))}
          </ul>
        </Cell>

        {/* KPI */}
        <Cell variants={item} accent="var(--brand-3)" className="min-h-[12rem]">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Users className="size-4 text-brand-ink" />
            Active projects
          </div>
          <div className="mt-auto">
            <div className="text-3xl font-semibold tracking-tight">
              <CountUp to={42} />
            </div>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium text-emerald-500">
              <TrendingUp className="size-3" />
              +6 this week
            </span>
          </div>
        </Cell>
      </motion.div>
    </section>
  );
}
