"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CountUp } from "@/components/text/count-up";
import { GradientText } from "@/components/text/gradient-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

export interface HeroStat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

export interface HeroStatsProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  stats?: HeroStat[];
  className?: string;
}

const DEFAULT_STATS: HeroStat[] = [
  { value: 99.99, suffix: "%", decimals: 2, label: "Uptime SLA" },
  { value: 120, suffix: "+", label: "Integrations" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Average rating" },
  { value: 38, suffix: "ms", label: "Median latency" },
];

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

/**
 * HeroStats — a credibility-forward hero: a centered pitch and CTAs above a
 * band of headline metrics that count up as they scroll into view. A soft
 * brand glow and faint grid anchor it without stealing focus from the numbers.
 */
export function HeroStats({
  eyebrow = "Trusted at scale",
  title = "Infrastructure your team can",
  highlight = "rely on",
  description = "From your first user to your ten-millionth, Lumen stays fast, observable, and calm. The numbers below update live as you scroll.",
  primaryLabel = "Start free",
  secondaryLabel = "Talk to sales",
  stats = DEFAULT_STATS,
  className,
}: HeroStatsProps) {
  const reduce = useReducedMotion();
  const reveal = reduce
    ? {}
    : {
        variants: container,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.3 },
      };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-background px-6 py-16 text-center sm:px-10 lg:py-20",
        className,
      )}
    >
      {/* Soft center glow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20%] -z-10 size-[34rem] max-w-[120%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand) 40%, transparent), transparent 70%)",
        }}
      />

      <motion.div {...reveal} className="mx-auto max-w-2xl">
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur"
        >
          <ShieldCheck className="size-3.5 text-brand-2" />
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
          className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
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

      {/* Metrics band */}
      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-y-8 border-t border-border pt-10 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={cn(
              "px-2",
              i > 0 && "sm:border-l sm:border-border",
            )}
          >
            <div className="text-3xl font-semibold tracking-tight sm:text-4xl">
              <CountUp
                className="text-gradient"
                to={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </div>
            <div className="mt-1 text-sm text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
