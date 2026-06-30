"use client";

import { useId } from "react";
import { ArrowRight, CheckCircle2, Play, Star, TrendingUp } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { GradientText } from "@/components/text/gradient-text";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

export interface HeroSplitProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase appended after the title, rendered as gradient text. */
  highlight?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  /** Names used for the social-proof avatar stack. */
  customers?: string[];
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

/**
 * HeroSplit — an asymmetric product hero: persuasive copy and social proof on
 * the left, a 3D-tilting app-window mock with a live-feeling chart and floating
 * glass stats on the right, all over a faint dotted grid and a soft brand glow.
 */
export function HeroSplit({
  eyebrow = "New · Analytics 2.0",
  title = "Ship products your users",
  highlight = "actually love",
  description = "A motion-first toolkit for building fast, beautiful interfaces — real-time insight, zero configuration, and a design system that scales with your team.",
  primaryLabel = "Start free",
  secondaryLabel = "Watch demo",
  customers = ["Ava Chen", "Liam Park", "Noah Kim", "Mia Cho", "Eli Ramos"],
  className,
}: HeroSplitProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");

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
        "relative isolate overflow-hidden rounded-2xl border border-border bg-background px-6 py-16 sm:px-10 lg:py-20",
        className,
      )}
    >
      {/* Faint dotted grid, faded toward the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--border-strong) 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(130% 120% at 30% 0%, #000 35%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(130% 120% at 30% 0%, #000 35%, transparent 78%)",
        }}
      />
      {/* Soft brand glow anchored top-left. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-28 -z-10 size-[30rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand) 45%, transparent), transparent 70%)",
        }}
      />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Copy column */}
        <motion.div {...reveal} className="max-w-xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-2 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-2" />
            </span>
            {eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {title} <GradientText>{highlight}</GradientText>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-pretty text-base text-muted sm:text-lg"
          >
            {description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton aria-label={primaryLabel}>
              {primaryLabel}
              <ArrowRight className="size-4" />
            </MagneticButton>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              <Play className="size-4 text-brand-ink" />
              {secondaryLabel}
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3"
          >
            <AvatarStack names={customers} max={4} />
            <div className="text-sm">
              <div className="flex items-center gap-1 text-brand-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-0.5 text-muted">
                Trusted by{" "}
                <span className="font-semibold text-foreground">2,000+</span>{" "}
                product teams
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Product mock column */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:mx-0"
        >
          <TiltCard
            max={8}
            className="rounded-2xl border border-border-strong bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
          >
            <div className="overflow-hidden rounded-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-3">
                <span className="size-2.5 rounded-full bg-brand-3/80" />
                <span className="size-2.5 rounded-full bg-brand/70" />
                <span className="size-2.5 rounded-full bg-brand-2/70" />
                <span className="ml-3 truncate rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] text-muted">
                  app.ononc.dev/overview
                </span>
              </div>

              {/* App body */}
              <div className="grid grid-cols-[56px_1fr]">
                {/* Mini sidebar */}
                <div className="flex flex-col gap-3 border-r border-border bg-background/40 p-3">
                  <span className="size-7 rounded-lg bg-gradient-to-br from-brand to-brand-2" />
                  <span className="h-1.5 w-6 rounded-full bg-border-strong" />
                  <span className="h-1.5 w-7 rounded-full bg-border-strong" />
                  <span className="h-1.5 w-5 rounded-full bg-border-strong" />
                  <span className="mt-auto size-7 rounded-full bg-gradient-to-br from-brand-2 to-brand-3" />
                </div>

                {/* Main panel */}
                <div className="space-y-4 p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-muted">
                        Revenue
                      </p>
                      <p className="text-2xl font-semibold tracking-tight">
                        $48,250
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-1 text-xs font-medium text-brand-2">
                      <TrendingUp className="size-3.5" />
                      +128%
                    </span>
                  </div>

                  {/* Area chart */}
                  <svg
                    viewBox="0 0 320 120"
                    className="h-24 w-full"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Revenue trending upward over time"
                  >
                    <defs>
                      <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--brand-ink)" />
                        <stop offset="100%" stopColor="var(--brand-2)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,96 C28,86 44,70 72,72 C104,74 120,40 152,44 C188,49 208,22 244,30 C276,37 296,18 320,12 L320,120 L0,120 Z"
                      fill={`url(#${uid}-area)`}
                    />
                    <path
                      d="M0,96 C28,86 44,70 72,72 C104,74 120,40 152,44 C188,49 208,22 244,30 C276,37 296,18 320,12"
                      fill="none"
                      stroke={`url(#${uid}-line)`}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Stat tiles */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border bg-background/50 p-3">
                      <p className="text-[11px] text-muted">Active users</p>
                      <p className="mt-1 text-lg font-semibold tracking-tight">
                        12,480
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-background/50 p-3">
                      <p className="text-[11px] text-muted">Conversion</p>
                      <p className="mt-1 text-lg font-semibold tracking-tight">
                        6.4%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Floating glass badges */}
          <div
            className="animate-float absolute -left-3 top-20 flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 shadow-lg backdrop-blur sm:-left-5"
            style={{ animationDelay: "-1.5s" }}
          >
            <CheckCircle2 className="size-4 text-brand-2" />
            <span className="text-xs font-medium">Deployed to edge</span>
          </div>
          <div
            className="animate-float absolute -right-2 bottom-12 flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 shadow-lg backdrop-blur sm:-right-4"
            style={{ animationDelay: "-3.5s" }}
          >
            <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-[10px] font-bold text-white">
              ↑
            </span>
            <span className="text-xs font-medium">+2,418 today</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
