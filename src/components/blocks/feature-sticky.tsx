"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Plug,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface StickyFeature {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface FeatureStickyProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  features?: StickyFeature[];
  className?: string;
}

const DEFAULT_FEATURES: StickyFeature[] = [
  {
    title: "Live analytics",
    description:
      "Watch usage, retention, and revenue update in real time — no nightly batch, no waiting.",
    icon: <BarChart3 className="size-5" />,
  },
  {
    title: "Smart alerts",
    description:
      "Get pinged the moment something drifts out of range, routed to the right channel automatically.",
    icon: <Bell className="size-5" />,
  },
  {
    title: "Hardened access",
    description:
      "Role-based permissions, audit trails, and SSO keep every action accountable.",
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: "Connects to everything",
    description:
      "Drop-in integrations and a typed API mean your stack talks to ours in minutes.",
    icon: <Plug className="size-5" />,
  },
];

/** Reveal wrapper: rises in on scroll, or renders plain for reduced motion. */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FeatureSticky — a two-column split where the intro and call-to-action stay
 * pinned (CSS sticky) while a list of features scrolls past. Each row rises in
 * on view; the sticky behavior and reveals both no-op under reduced motion.
 */
export function FeatureSticky({
  eyebrow = "Why teams switch",
  heading = "One surface for the whole operation",
  subheading = "Stop stitching dashboards together. Everything your team watches, in a single, fast place.",
  ctaLabel = "Start free",
  ctaHref = "#",
  features = DEFAULT_FEATURES,
  className,
}: FeatureStickyProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-brand-2" />
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-pretty text-muted">{subheading}</p>
          <a
            href={ctaHref}
            className="group mt-7 inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            {ctaLabel}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        <ul className="lg:py-2">
          {features.map((f, i) => (
            <li key={i}>
              <Reveal className="flex gap-5 border-t border-border py-7 first:border-t-0 first:pt-0 lg:py-8">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-surface text-brand-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  {f.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
