"use client";

import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  type MotionProps,
  type Variants,
} from "motion/react";
import { GradientUnderline } from "@/components/text/gradient-underline";
import { cn } from "@/lib/utils";

export interface HeroEditorialProps {
  eyebrow?: string;
  /** Small right-aligned meta on the top hairline, e.g. an issue/volume. */
  index?: string;
  /** Words before the emphasized phrase. */
  title?: string;
  /** Emphasized phrase, set in gradient italics. */
  highlight?: string;
  /** Words after the emphasized phrase. */
  titleAfter?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  /** Items shown on the bottom hairline meta row. */
  meta?: string[];
  className?: string;
}

const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * HeroEditorial — a typography-forward, left-aligned hero with generous
 * whitespace, hairline meta rows top and bottom, a headline that resolves word
 * by word, and an understated gradient-underline call to action. The aesthetic
 * is restraint; the only flourish is the emphasized phrase.
 */
export function HeroEditorial({
  eyebrow = "Studio — Independent design practice",
  index = "Vol. 01 / 2026",
  title = "We build brands that",
  highlight = "speak",
  titleAfter = "before a single word is read.",
  description = "A small studio for ambitious teams. We shape identity, motion, and interface into one coherent voice — considered, deliberate, and unmistakably yours.",
  primaryLabel = "View selected work",
  secondaryLabel = "Read our approach",
  meta = ["Based in Seoul", "Est. 2026", "Available for projects"],
  className,
}: HeroEditorialProps) {
  const reduce = useReducedMotion();

  const tokens = [
    ...title.split(" ").map((t) => ({ text: t, em: false })),
    { text: highlight, em: true },
    ...titleAfter.split(" ").map((t) => ({ text: t, em: false })),
  ];

  const fadeUp = (delay: number): MotionProps =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.6, ease: "easeOut", delay },
        };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-surface px-8 py-16 sm:px-12 sm:py-20",
        className,
      )}
    >
      {/* Faint paper grain for an editorial texture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="mx-auto max-w-4xl">
        {/* Top hairline */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between gap-4 border-b border-border pb-5 text-xs uppercase tracking-[0.2em] text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand-2" />
            {eyebrow}
          </span>
          <span className="shrink-0 text-muted-2">{index}</span>
        </motion.div>

        {/* Headline, revealed word by word */}
        <motion.h1
          variants={reduce ? undefined : headline}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 text-balance text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl"
        >
          {tokens.map((t, i) => (
            <Fragment key={i}>
              <motion.span
                variants={reduce ? undefined : word}
                className={cn(
                  "inline-block",
                  t.em && "text-gradient italic",
                )}
              >
                {t.text}
              </motion.span>
              {i < tokens.length - 1 ? " " : null}
            </Fragment>
          ))}
        </motion.h1>

        {/* Lead */}
        <motion.p
          {...fadeUp(0.15)}
          className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted"
        >
          {description}
        </motion.p>

        {/* Calls to action */}
        <motion.div
          {...fadeUp(0.25)}
          className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          <GradientUnderline
            href="#"
            className="inline-flex items-center gap-1 text-base"
          >
            {primaryLabel}
            <ArrowUpRight className="size-4" />
          </GradientUnderline>
          <a
            href="#"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {secondaryLabel}
          </a>
        </motion.div>

        {/* Bottom hairline meta */}
        <motion.div
          {...fadeUp(0.35)}
          className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-6 text-xs uppercase tracking-[0.18em] text-muted-2"
        >
          {meta.map((m, i) => (
            <Fragment key={m}>
              {i > 0 && <span className="text-border-strong">/</span>}
              <span>{m}</span>
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
