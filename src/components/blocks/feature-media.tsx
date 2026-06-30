"use client";

import type { ReactNode } from "react";
import {
  BarChart3,
  Bell,
  Globe,
  Layers,
  Lock,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface MediaFeature {
  title: string;
  description: string;
  icon?: ReactNode;
  /** Custom poster visual; defaults to a built-in branded mock by position. */
  visual?: ReactNode;
}

export interface FeatureMediaProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: MediaFeature[];
  className?: string;
}

/* ---------- Built-in "poster" visuals (token-driven, no images) ---------- */

function DashboardPoster() {
  const bars = [40, 64, 52, 78, 60, 90];
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="h-2 w-20 rounded-full bg-foreground/15" />
        <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-semibold text-brand-ink">
          +18%
        </span>
      </div>
      <div className="flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-brand/25 to-brand-2/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function TogglesPoster() {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2"
        >
          <span className="h-2 w-16 rounded-full bg-foreground/15" />
          <span className="flex h-4 w-7 items-center rounded-full bg-brand/70 px-0.5">
            <span className="size-3 translate-x-2.5 rounded-full bg-white" />
          </span>
        </div>
      ))}
    </div>
  );
}

function GridPoster() {
  return (
    <div className="grid h-full grid-cols-5 place-content-center gap-2">
      {Array.from({ length: 15 }).map((_, i) => {
        const lit = [6, 7, 8].includes(i);
        return (
          <span
            key={i}
            className={cn(
              "aspect-square rounded-md border",
              lit
                ? "border-brand/40 bg-gradient-to-br from-brand/30 to-brand-2/30"
                : "border-border bg-surface",
            )}
          />
        );
      })}
    </div>
  );
}

const POSTERS = [
  <DashboardPoster key="d" />,
  <TogglesPoster key="t" />,
  <GridPoster key="g" />,
];

const DEFAULT_FEATURES: MediaFeature[] = [
  {
    title: "Dashboards that update live",
    description:
      "Real-time metrics with saved views and one-click sharing across the team.",
    icon: <BarChart3 className="size-5" />,
  },
  {
    title: "Controls you can trust",
    description:
      "Toggle features safely with per-environment flags and instant rollback.",
    icon: <Workflow className="size-5" />,
  },
  {
    title: "Composable building blocks",
    description:
      "Snap modular primitives together into the exact surface you need.",
    icon: <Layers className="size-5" />,
  },
  {
    title: "Global edge delivery",
    description: "Served from the region nearest each visitor, automatically.",
    icon: <Globe className="size-5" />,
  },
  {
    title: "Encrypted everywhere",
    description: "Sealed in transit and at rest, with keys you control.",
    icon: <Lock className="size-5" />,
  },
  {
    title: "Alerts that find you",
    description: "Routed to the right channel the instant something drifts.",
    icon: <Bell className="size-5" />,
  },
];

/**
 * FeatureMedia — a three-column grid of premium feature cards, each topped with
 * a branded mock visual (distinct from the icon-only Feature Cards). Cards lift
 * and light a brand ring on hover and rise in with a staggered scroll reveal
 * that collapses for reduced-motion users.
 */
export function FeatureMedia({
  eyebrow = "Showcase",
  heading = "A closer look at what ships",
  subheading = "Real surfaces, not stock art — every card previews a piece of the product.",
  features = DEFAULT_FEATURES,
  className,
}: FeatureMediaProps) {
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
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-2">
            {eyebrow}
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
        {features.map((f, i) => (
          <motion.div key={i} variants={item} className="h-full">
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-32px_var(--brand)]">
              <div
                aria-hidden
                className="relative h-36 overflow-hidden border-b border-border bg-background/60 p-5"
              >
                {f.visual ?? POSTERS[i % POSTERS.length]}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="grid size-10 place-items-center rounded-xl border border-border bg-gradient-to-br from-brand/15 to-brand-2/10 text-brand-ink transition-colors duration-300 group-hover:text-brand-2">
                  {f.icon}
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
