"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { clamp, cn, prefersReducedMotion } from "@/lib/utils";

export interface SliderTier {
  name: string;
  /** Monthly price as a number (eases between tiers). */
  price: number;
  description: string;
  features: string[];
  cta?: string;
}

export interface PricingTierSliderProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  tiers?: SliderTier[];
  currency?: string;
  defaultIndex?: number;
  className?: string;
}

const DEFAULT_TIERS: SliderTier[] = [
  {
    name: "Starter",
    price: 0,
    description: "For side projects and trying things out.",
    features: ["3 projects", "Community support", "1 GB storage"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: 24,
    description: "For freelancers shipping to production.",
    features: ["Unlimited projects", "Priority support", "50 GB storage", "Custom domains"],
    cta: "Start trial",
  },
  {
    name: "Team",
    price: 64,
    description: "For teams that collaborate daily.",
    features: ["Everything in Pro", "Roles & permissions", "Shared workspaces", "Audit logs"],
    cta: "Start trial",
  },
  {
    name: "Enterprise",
    price: 128,
    description: "For organizations operating at scale.",
    features: ["Everything in Team", "SSO & SAML", "99.9% uptime SLA", "Dedicated manager"],
    cta: "Contact sales",
  },
];

/** Eases the displayed amount toward `value`; jumps in one frame under reduced motion. */
function AnimatedAmount({ value, currency }: { value: number; currency: string }) {
  const [display, setDisplay] = useState(value);
  const displayRef = useRef(value);
  const raf = useRef(0);

  useEffect(() => {
    const from = displayRef.current;
    const to = value;
    if (from === to) return;
    const duration = prefersReducedMotion() ? 0 : 360;
    const start = performance.now();
    const tick = (now: number) => {
      const p = duration <= 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      displayRef.current = from + (to - from) * eased;
      setDisplay(displayRef.current);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else displayRef.current = to;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return (
    <span className="tabular-nums">
      {currency}
      {Math.round(display).toLocaleString("en-US")}
    </span>
  );
}

/**
 * PricingTierSlider — drag a slider that snaps across discrete named tiers;
 * the price eases and the detail panel swaps as you move. Tier labels are also
 * clickable, and the selection is announced to screen readers.
 */
export function PricingTierSlider({
  eyebrow = "Find your fit",
  heading = "Slide to your plan",
  subheading = "Drag to explore tiers — the plan details update as you go.",
  tiers = DEFAULT_TIERS,
  currency = "$",
  defaultIndex = 1,
  className,
}: PricingTierSliderProps) {
  const max = tiers.length - 1;
  const [index, setIndex] = useState(clamp(defaultIndex, 0, Math.max(0, max)));
  const tier = tiers[index];
  if (!tier) return null;

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-border bg-surface p-7 sm:p-9">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="mt-1 text-sm text-muted">{tier.description}</p>
          </div>
          <div className="flex shrink-0 items-baseline gap-1">
            <span className="text-4xl font-semibold tracking-tight">
              <AnimatedAmount value={tier.price} currency={currency} />
            </span>
            <span className="text-sm text-muted">/mo</span>
          </div>
        </div>

        <div className="mt-7">
          <Slider
            min={0}
            max={max}
            step={1}
            value={index}
            onValueChange={setIndex}
            aria-label="Plan tier"
            className="w-full"
          />
          <div className="mt-3 flex justify-between gap-2">
            {tiers.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "text-xs font-medium transition-colors",
                  i === index ? "text-brand-ink" : "text-muted-2 hover:text-foreground",
                )}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <span className="sr-only" aria-live="polite">
          Selected {tier.name}, {currency}
          {tier.price.toLocaleString("en-US")} per month
        </span>

        <ul className="mt-7 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
              <span className="text-foreground/90">{f}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-7 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          {tier.cta ?? "Choose plan"}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
