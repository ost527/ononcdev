"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface PricingSliderProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  minSeats?: number;
  maxSeats?: number;
  defaultSeats?: number;
  /** What every seat includes, shown as a checklist. */
  features?: string[];
  currency?: string;
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_FEATURES = [
  "Unlimited projects",
  "Role-based access",
  "Advanced analytics",
  "SSO & SAML",
  "Priority support",
  "99.9% uptime SLA",
];

/** Marginal price per seat — cheaper as the team grows. */
function rateForSeats(seats: number) {
  if (seats <= 5) return 12;
  if (seats <= 20) return 9;
  return 7;
}

/** Eases the displayed amount toward `value` whenever it changes. */
function AnimatedAmount({
  value,
  currency,
}: {
  value: number;
  currency: string;
}) {
  const [display, setDisplay] = useState(value);
  const displayRef = useRef(value);
  const raf = useRef(0);

  useEffect(() => {
    const from = displayRef.current;
    const to = value;
    if (from === to) return;
    // Tween toward the new value; jump instantly (one frame) under reduced
    // motion. All setState happens inside rAF, never synchronously in-effect.
    const duration = prefersReducedMotion() ? 0 : 320;
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
 * PricingSlider — a pay-as-you-grow calculator. Drag the slider to set seats;
 * the per-seat rate drops at volume tiers and the total eases to its value.
 */
export function PricingSlider({
  eyebrow = "Usage-based",
  heading = "Pricing that scales with your team",
  subheading = "Only pay for the seats you use. Volume discounts apply automatically.",
  minSeats = 1,
  maxSeats = 50,
  defaultSeats = 8,
  features = DEFAULT_FEATURES,
  currency = "$",
  ctaLabel = "Start 14-day trial",
  className,
}: PricingSliderProps) {
  const [seats, setSeats] = useState(defaultSeats);
  const rate = rateForSeats(seats);
  const total = seats * rate;

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-5">
          {/* Calculator */}
          <div className="lg:col-span-3">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tight">
                <AnimatedAmount value={total} currency={currency} />
              </span>
              <span className="text-muted">/mo</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {currency}
              {rate} per seat · billed monthly
            </p>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-muted">Team members</span>
                <span className="rounded-full border border-border bg-background px-2.5 py-0.5 font-semibold tabular-nums">
                  {seats}
                </span>
              </div>
              <Slider
                min={minSeats}
                max={maxSeats}
                value={seats}
                onValueChange={setSeats}
                aria-label="Team members"
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-xs tabular-nums text-muted-2">
                <span>{minSeats}</span>
                <span>{maxSeats}+</span>
              </div>
            </div>
          </div>

          {/* Included */}
          <div className="lg:col-span-2 lg:border-l lg:border-border lg:pl-8">
            <p className="text-sm font-medium text-foreground">
              Included in every seat
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-y-2.5 text-sm sm:grid-cols-2 lg:grid-cols-1">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border bg-background/40 px-7 py-5 sm:flex-row sm:px-9">
          <p className="text-sm text-muted">
            Save 20% with annual billing — no credit card required to start.
          </p>
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:w-auto"
          >
            {ctaLabel}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
