"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, BarChart3, CheckCircle2, Inbox, LayoutGrid } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { GradientText } from "@/components/text/gradient-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

export interface HeroShowcaseProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  /** Short checklist of selling points under the buttons. */
  features?: string[];
  className?: string;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 130, damping: 18 },
  },
};

interface Screen {
  key: string;
  label: string;
  icon: ReactNode;
  render: () => ReactNode;
}

const bar = (h: number, i: number) => (
  <span
    key={i}
    className="flex-1 rounded-t bg-gradient-to-t from-brand/30 to-brand-2/70"
    style={{ height: `${h}%` }}
  />
);

const SCREENS: Screen[] = [
  {
    key: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="size-3.5" />,
    render: () => (
      <div className="flex h-full flex-col">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] text-muted">Weekly active</p>
            <p className="text-xl font-semibold tracking-tight">18,402</p>
          </div>
          <span className="rounded-full bg-brand/10 px-2 py-1 text-[11px] font-medium text-brand-2">
            +24%
          </span>
        </div>
        <div className="mt-4 flex flex-1 items-end gap-2">
          {[42, 60, 38, 72, 54, 86, 64].map(bar)}
        </div>
      </div>
    ),
  },
  {
    key: "inbox",
    label: "Inbox",
    icon: <Inbox className="size-3.5" />,
    render: () => (
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className={cn(
                "size-8 shrink-0 rounded-full bg-gradient-to-br",
                i % 2 ? "from-brand-2 to-brand-3" : "from-brand to-brand-2",
              )}
            />
            <div className="flex-1 space-y-1.5">
              <span className="block h-2 w-1/3 rounded-full bg-border-strong" />
              <span className="block h-2 w-2/3 rounded-full bg-border" />
            </div>
            <span className="text-[10px] text-muted-2">2m</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "board",
    label: "Board",
    icon: <LayoutGrid className="size-3.5" />,
    render: () => (
      <div className="grid h-full grid-cols-3 gap-2">
        {["To do", "Doing", "Done"].map((col, c) => (
          <div key={col} className="rounded-lg border border-border bg-background/50 p-2">
            <p className="mb-2 text-[10px] font-medium text-muted">{col}</p>
            <div className="space-y-2">
              {Array.from({ length: c === 1 ? 1 : 2 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-md border border-border bg-surface p-2"
                >
                  <span className="block h-1.5 w-full rounded-full bg-border-strong" />
                  <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-border" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

/**
 * HeroShowcase — an asymmetric hero whose right side is a stacked "screen deck"
 * that cycles through product views (analytics, inbox, board) with a crossfade.
 * Dots let you jump to any view; autoplay pauses and the deck rests on the
 * first view under prefers-reduced-motion.
 */
export function HeroShowcase({
  eyebrow = "One workspace, every view",
  title = "See your work the way your team",
  highlight = "thinks",
  description = "Switch between dashboards, conversations, and boards without losing context. ONONC keeps everything a glance away.",
  primaryLabel = "Start free",
  secondaryLabel = "Take a tour",
  features = ["Real-time sync", "Role-based access", "Full audit trail"],
  className,
}: HeroShowcaseProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || SCREENS.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SCREENS.length),
      3400,
    );
    return () => clearInterval(id);
  }, [reduce]);

  const reveal = reduce
    ? {}
    : {
        variants: container,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.3 },
      };

  const active = SCREENS[index];

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-background px-6 py-16 sm:px-10 lg:py-20",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-20 -z-10 size-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand) 42%, transparent), transparent 70%)",
        }}
      />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <motion.div {...reveal} className="max-w-xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur"
          >
            <LayoutGrid className="size-3.5 text-brand-2" />
            {eyebrow}
          </motion.span>
          <motion.h1
            variants={item}
            className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {title} <GradientText>{highlight}</GradientText>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-pretty text-base text-muted sm:text-lg"
          >
            {description}
          </motion.p>
          <motion.ul
            variants={item}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted"
          >
            {features.map((f) => (
              <li key={f} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-brand-2" />
                {f}
              </li>
            ))}
          </motion.ul>
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton aria-label={primaryLabel}>
              {primaryLabel}
              <ArrowRight className="size-4" />
            </MagneticButton>
            <button
              type="button"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              {secondaryLabel}
            </button>
          </motion.div>
        </motion.div>

        {/* Screen deck */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.1 }}
          className="relative mx-auto h-80 w-full max-w-sm"
        >
          {/* Stacked back cards for depth. */}
          <div className="absolute inset-0 translate-x-4 translate-y-5 rotate-[3deg] rounded-2xl border border-border bg-surface/50" />
          <div className="absolute inset-0 translate-x-2 translate-y-2.5 rotate-[1.5deg] rounded-2xl border border-border bg-surface/75" />

          {/* Front card */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-3">
              <span className="size-2.5 rounded-full bg-brand-3/70" />
              <span className="size-2.5 rounded-full bg-brand/60" />
              <span className="size-2.5 rounded-full bg-brand-2/60" />
              <span className="ml-2 inline-flex items-center gap-1.5 text-xs text-muted">
                {active.icon}
                {active.label}
              </span>
            </div>
            <div className="relative h-[calc(100%-2.875rem)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
                  className="absolute inset-0 p-4"
                >
                  {active.render()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dot controls */}
          <div className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 gap-2">
            {SCREENS.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.label}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index
                    ? "w-6 bg-brand"
                    : "w-2 bg-border-strong hover:bg-muted",
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
