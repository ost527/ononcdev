"use client";

import { useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GradientText } from "@/components/text/gradient-text";
import { cn } from "@/lib/utils";

export interface HeroVideoProps {
  eyebrow?: string;
  title?: string;
  /** Highlighted phrase rendered as gradient text. */
  highlight?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  /** Duration chip text, e.g. "2:14". */
  duration?: string;
  /** Caption shown along the bottom of the media card. */
  caption?: string;
  className?: string;
}

/**
 * HeroVideo — a cinematic hero with a 16:9 media card. The play control is a
 * real, labelled button that toggles a faux playback state (a progress bar
 * sweeps across) — front-end only, so no media is fetched. Swap the poster and
 * wire the button to your own <video> to make it real.
 */
export function HeroVideo({
  eyebrow = "Watch the 2-minute tour",
  title = "See Lumen in",
  highlight = "motion",
  description = "A quick look at how teams design, review, and ship — all in one calm, fast surface.",
  primaryLabel = "Get started",
  secondaryLabel = "Read the story",
  duration = "2:14",
  caption = "Product overview — 2026",
  className,
}: HeroVideoProps) {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-background px-6 py-16 text-center sm:px-10 lg:py-20",
        className,
      )}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
          <Play className="size-3 fill-current text-brand-2" />
          {eyebrow}
        </span>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {title} <GradientText>{highlight}</GradientText>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_var(--brand)] transition-colors hover:bg-brand/90"
          >
            {primaryLabel}
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            {secondaryLabel}
          </button>
        </div>
      </motion.div>

      {/* Media card */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="relative mx-auto mt-12 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
      >
        {/* Gradient "poster". */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(40% 60% at 22% 28%, color-mix(in oklab, var(--brand) 60%, transparent), transparent 70%)",
              "radial-gradient(45% 55% at 80% 24%, color-mix(in oklab, var(--brand-2) 55%, transparent), transparent 70%)",
              "radial-gradient(55% 65% at 65% 90%, color-mix(in oklab, var(--brand-3) 45%, transparent), transparent 72%)",
              "linear-gradient(180deg, color-mix(in oklab, var(--background) 35%, transparent), var(--background))",
            ].join(","),
          }}
        />

        {/* Duration chip + caption (decorative; clicks pass through to the button). */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
          {duration}
        </span>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-4 pb-6 text-left">
          <span className="text-sm font-medium text-foreground [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            {caption}
          </span>
        </div>

        {/* Faux playback progress. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-border">
          <div
            className="h-full bg-gradient-to-r from-brand to-brand-2 transition-[width] ease-linear"
            style={{
              width: playing ? "100%" : "0%",
              transitionDuration: playing ? "8s" : "0.3s",
            }}
          />
        </div>

        {/* Play / pause control covers the poster. */}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
          aria-label={playing ? "Pause overview video" : "Play overview video"}
          className="group/play absolute inset-0 grid place-items-center focus:outline-none"
        >
          <span className="relative grid size-16 place-items-center rounded-full bg-surface/80 text-foreground ring-1 ring-border-strong backdrop-blur transition-transform hover:scale-105 group-focus-visible/play:ring-2 group-focus-visible/play:ring-brand">
            {!playing && (
              <span className="animate-pulse-ring absolute inset-0 rounded-full ring-2 ring-brand/50" />
            )}
            {playing ? (
              <Pause className="size-6 fill-current" />
            ) : (
              <Play className="ml-0.5 size-6 fill-current" />
            )}
          </span>
        </button>
      </motion.div>
    </section>
  );
}
