"use client";

import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SpotlightFeature {
  eyebrow?: string;
  title: string;
  description: string;
  points?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Custom visual; defaults to a built-in branded mock chosen by position. */
  visual?: ReactNode;
}

export interface FeatureSpotlightProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: SpotlightFeature[];
  className?: string;
}

/* ---------- Built-in abstract "product" visuals (token-driven, no images) -- */

function AnalyticsMock() {
  const bars = [42, 64, 38, 78, 56, 90, 70];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-2 w-24 rounded-full bg-foreground/15" />
          <div className="h-2 w-14 rounded-full bg-foreground/10" />
        </div>
        <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-semibold text-brand-ink">
          +24%
        </span>
      </div>
      <div className="flex h-32 items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-brand/25 to-brand-2/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function WorkflowMock() {
  const rows = ["Trigger received", "Enrich & validate", "Route to channel"];
  return (
    <div className="space-y-2.5">
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5"
        >
          <div className="flex items-center gap-2.5">
            <span className="grid size-6 place-items-center rounded-md bg-brand/15 text-brand-ink">
              <Check className="size-3.5" />
            </span>
            <span className="text-xs font-medium text-foreground/80">{r}</span>
          </div>
          <span className="flex h-4 w-7 items-center rounded-full bg-brand/70 px-0.5">
            <span className="size-3 translate-x-2.5 rounded-full bg-white" />
          </span>
        </div>
      ))}
    </div>
  );
}

function LayersMock() {
  return (
    <div className="grid grid-cols-6 gap-2.5">
      {Array.from({ length: 24 }).map((_, i) => {
        const lit = [8, 9, 14, 15].includes(i);
        return (
          <span
            key={i}
            className={cn(
              "aspect-square rounded-md border",
              lit
                ? "border-brand/40 bg-gradient-to-br from-brand/30 to-brand-2/30"
                : "border-border bg-background",
            )}
          />
        );
      })}
    </div>
  );
}

const MOCKS = [<AnalyticsMock key="a" />, <WorkflowMock key="w" />, <LayersMock key="l" />];

const DEFAULT_FEATURES: SpotlightFeature[] = [
  {
    eyebrow: "Insight",
    title: "See the whole picture at a glance",
    description:
      "Pull every signal into one live view. Trends, anomalies, and milestones surface on their own — you stop digging and start deciding.",
    points: [
      "Real-time streaming metrics",
      "Anomaly detection out of the box",
      "Shareable, embeddable dashboards",
    ],
    ctaLabel: "Explore analytics",
    ctaHref: "#",
  },
  {
    eyebrow: "Automation",
    title: "Let the busywork run itself",
    description:
      "Compose triggers, conditions, and actions into flows that never sleep. Set them once and watch the routine work disappear.",
    points: [
      "Visual, branch-aware builder",
      "Hundreds of native connectors",
      "Replay and audit every run",
    ],
    ctaLabel: "Build a flow",
    ctaHref: "#",
  },
  {
    eyebrow: "Scale",
    title: "Grow without re-architecting",
    description:
      "Modular building blocks compose into anything, then scale horizontally as you go — no rewrites, no surprises at the next tier.",
    points: [
      "Composable primitives",
      "Horizontal by design",
      "Predictable, usage-based cost",
    ],
    ctaLabel: "Read the docs",
    ctaHref: "#",
  },
];

/** Reveal wrapper: rises in on scroll, or renders plain for reduced motion. */
function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FeatureSpotlight — alternating, full-width feature rows. Each pairs a copy
 * column (eyebrow, title, checklist, CTA) with a branded mock visual, flipping
 * sides row to row. Rows rise in on view; reduced motion renders them static.
 */
export function FeatureSpotlight({
  eyebrow = "Capabilities",
  heading = "Built for the way you actually work",
  subheading = "Three pillars that carry a product from first signal to global scale.",
  features = DEFAULT_FEATURES,
  className,
}: FeatureSpotlightProps) {
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

      <div className="mt-16 space-y-16 sm:space-y-24">
        {features.map((f, i) => {
          const flip = i % 2 === 1;
          const visual = f.visual ?? MOCKS[i % MOCKS.length];
          return (
            <Reveal
              key={i}
              className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2"
            >
              <div className={cn("space-y-5", flip && "lg:order-2")}>
                {f.eyebrow && (
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-2">
                    <span className="h-px w-6 bg-gradient-to-r from-transparent to-brand-2" />
                    {f.eyebrow}
                  </span>
                )}
                <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  {f.title}
                </h3>
                <p className="text-pretty leading-relaxed text-muted">
                  {f.description}
                </p>
                {f.points && f.points.length > 0 && (
                  <ul className="space-y-2.5">
                    {f.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-2">
                          <Check className="size-3.5" />
                        </span>
                        <span className="text-foreground/90">{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {f.ctaLabel && (
                  <a
                    href={f.ctaHref ?? "#"}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-2"
                  >
                    {f.ctaLabel}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>

              <div className={cn(flip && "lg:order-1")}>
                <div className="relative" aria-hidden>
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-brand/10 via-transparent to-brand-2/10 opacity-70 blur-2xl"
                  />
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
                    />
                    {visual}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
