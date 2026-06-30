"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GradientText } from "@/components/text/gradient-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

export interface HeroMarqueeProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  /** Large words scrolling in the backdrop. */
  words?: string[];
  className?: string;
}

const DEFAULT_WORDS = ["DESIGN", "BUILD", "SHIP", "SCALE", "MOTION", "CRAFT"];

/**
 * HeroMarquee — centered content floating over three rows of huge, ghosted
 * wordmarks that scroll in alternating directions. A radial vignette dims the
 * backdrop behind the copy for legibility; the marquee freezes under
 * prefers-reduced-motion via the global rule.
 */
export function HeroMarquee({
  eyebrow = "Built for momentum",
  title = "Everything you need to",
  highlight = "keep shipping",
  description = "A complete, motion-first foundation — primitives, blocks, and patterns — so your team can move from idea to release without losing the thread.",
  primaryLabel = "Get started",
  secondaryLabel = "Explore blocks",
  words = DEFAULT_WORDS,
  className,
}: HeroMarqueeProps) {
  const reduce = useReducedMotion();

  const outlined =
    "mx-6 text-6xl font-extrabold tracking-tight text-transparent sm:text-8xl [-webkit-text-stroke:1px_var(--border-strong)]";
  const filled =
    "mx-6 text-6xl font-extrabold tracking-tight text-foreground/[0.045] sm:text-8xl";

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[34rem] items-center justify-center overflow-hidden rounded-2xl border border-border bg-background px-6 py-20 text-center",
        className,
      )}
    >
      {/* Ghost-text marquee backdrop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex flex-col justify-center gap-4 sm:gap-8"
      >
        <Marquee duration={42} fade>
          {words.map((w) => (
            <span key={w} className={outlined}>
              {w}
            </span>
          ))}
        </Marquee>
        <Marquee duration={52} reverse fade>
          {words.map((w) => (
            <span key={w} className={filled}>
              {w}
            </span>
          ))}
        </Marquee>
        <Marquee duration={47} fade>
          {words.map((w) => (
            <span key={w} className={outlined}>
              {w}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Center vignette to keep the copy readable. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--background) 82%, transparent), transparent 78%)",
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
          <Sparkles className="size-3.5 text-brand-ink" />
          {eyebrow}
        </span>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {title} <GradientText>{highlight}</GradientText>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg">
          {description}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton aria-label={primaryLabel}>
            {primaryLabel}
            <ArrowRight className="size-4" />
          </MagneticButton>
          <button
            type="button"
            className="rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface"
          >
            {secondaryLabel}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
