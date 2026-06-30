"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { RotatingText } from "@/components/text/rotating-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

export interface HeroRotatingProps {
  eyebrow?: string;
  /** Static words that precede the rotating slot. */
  titleBefore?: string;
  /** Words cycled through the rotating slot. */
  words?: string[];
  /** Static line beneath the rotating headline. */
  titleAfter?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  /** Small reassurances under the buttons. */
  notes?: string[];
  className?: string;
}

const DEFAULT_WORDS = ["SaaS", "portfolio", "online store", "next big idea"];

/**
 * HeroRotating — a clean, centered hero whose headline swaps a key noun on a
 * loop while soft gradient orbs drift behind it. The rotating word stops on a
 * single value under prefers-reduced-motion (handled inside RotatingText).
 */
export function HeroRotating({
  eyebrow = "Ship in a weekend",
  titleBefore = "Launch your",
  words = DEFAULT_WORDS,
  titleAfter = "without the busywork.",
  description = "Opinionated building blocks, beautiful defaults, and zero boilerplate — so you can go from blank page to live in an afternoon.",
  primaryLabel = "Start building",
  secondaryLabel = "See examples",
  notes = ["No credit card required", "Cancel anytime"],
  className,
}: HeroRotatingProps) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[32rem] items-center justify-center overflow-hidden rounded-2xl border border-border bg-background px-6 py-20 text-center",
        className,
      )}
    >
      {/* Drifting gradient orbs. */}
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -left-10 top-6 -z-10 size-72 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand) 55%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -right-12 bottom-0 -z-10 size-80 rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-2) 55%, transparent), transparent 70%)",
          animationDelay: "-3s",
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
          <span className="size-1.5 rounded-full bg-brand-2" />
          {eyebrow}
        </span>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          <span className="block">
            {titleBefore}{" "}
            <RotatingText words={words} className="text-brand-ink" />
          </span>
          <span className="block">{titleAfter}</span>
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
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            {secondaryLabel}
          </button>
        </div>

        {notes.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
            {notes.map((note) => (
              <span key={note} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-brand-2" />
                {note}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
