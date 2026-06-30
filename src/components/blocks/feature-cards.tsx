"use client";

import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Fingerprint,
  Gauge,
  Layers,
  Palette,
  Sparkles,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface FeatureCard {
  title: string;
  description: string;
  icon?: ReactNode;
  /** Optional link target; when set, the card renders a "Learn more" affordance. */
  href?: string;
}

export interface FeatureCardsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: FeatureCard[];
  className?: string;
}

const DEFAULT_FEATURES: FeatureCard[] = [
  {
    title: "Motion, built in",
    description:
      "Interruptible, spring-based transitions that feel native — never bolted on after the fact.",
    icon: <Sparkles className="size-5" />,
    href: "#",
  },
  {
    title: "Themeable tokens",
    description:
      "Every color flows from CSS variables, so a single edit restyles the entire surface.",
    icon: <Palette className="size-5" />,
    href: "#",
  },
  {
    title: "Effortless speed",
    description:
      "GPU-friendly transforms and off-screen pausing keep frames smooth and batteries full.",
    icon: <Gauge className="size-5" />,
    href: "#",
  },
  {
    title: "Composable layers",
    description:
      "Small, sharp primitives snap together into bespoke sections without fighting the grid.",
    icon: <Layers className="size-5" />,
    href: "#",
  },
  {
    title: "Secure by default",
    description:
      "Sensible defaults, validated inputs, and focus-safe interactions on every control.",
    icon: <Fingerprint className="size-5" />,
    href: "#",
  },
  {
    title: "Automated flows",
    description:
      "Wire steps together once and let the system carry the work from trigger to result.",
    icon: <Workflow className="size-5" />,
    href: "#",
  },
];

/**
 * FeatureCards — an elevated three-column capability grid. Each card lifts on
 * hover, lights a brand ring and top hairline, and reveals a "Learn more"
 * affordance. Cards rise in with a staggered scroll reveal that collapses for
 * reduced-motion users.
 */
export function FeatureCards({
  eyebrow = "Features",
  heading = "Crafted down to the last pixel",
  subheading = "A complete toolkit of building blocks, tuned to work together and stay out of your way.",
  features = DEFAULT_FEATURES,
  className,
}: FeatureCardsProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const revealProps = reduce
    ? {}
    : {
        variants: container,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-brand-2" />
            {eyebrow}
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-brand-2" />
          </span>
        )}
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-muted">{subheading}</p>
      </div>

      <motion.div
        {...revealProps}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((f, i) => {
          const inner = (
            <>
              {/* hover glow + top hairline */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(140px circle at 50% 0%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 70%)",
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="relative grid size-11 place-items-center rounded-xl border border-border bg-gradient-to-br from-brand/15 to-brand-2/10 text-brand-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-300 group-hover:text-brand-2">
                {f.icon}
              </span>
              <h3 className="relative mt-5 text-base font-semibold">
                {f.title}
              </h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-muted">
                {f.description}
              </p>
              {f.href && (
                <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-2">
                  Learn more
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              )}
            </>
          );

          const cardClass =
            "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-32px_var(--brand)]";

          return (
            <motion.div key={i} variants={item} className="h-full">
              {f.href ? (
                <a href={f.href} className={cardClass}>
                  {inner}
                </a>
              ) : (
                <div className={cardClass}>{inner}</div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
