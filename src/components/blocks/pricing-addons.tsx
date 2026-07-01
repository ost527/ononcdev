"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface Addon {
  name: string;
  description: string;
  /** Added to the monthly total when enabled. */
  price: number;
  defaultOn?: boolean;
}

export interface PricingAddonsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  planName?: string;
  basePrice?: number;
  baseFeatures?: string[];
  addons?: Addon[];
  currency?: string;
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_BASE_FEATURES = ["Unlimited projects", "Core analytics", "Community support"];

const DEFAULT_ADDONS: Addon[] = [
  {
    name: "Advanced analytics",
    description: "Funnels, retention, and custom dashboards.",
    price: 12,
    defaultOn: true,
  },
  {
    name: "Priority support",
    description: "1-hour response with a dedicated channel.",
    price: 20,
  },
  { name: "Extra storage", description: "1 TB of additional asset storage.", price: 8 },
  { name: "SSO & SAML", description: "Enterprise single sign-on and SCIM.", price: 16 },
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
 * PricingAddons — a build-your-plan card: a fixed base plan plus toggleable
 * add-ons (each an accessible Switch) with a live total that eases as you go.
 */
export function PricingAddons({
  eyebrow = "Build your plan",
  heading = "Start with the essentials, add what you need",
  subheading = "Toggle add-ons to tailor your plan — your total updates as you go.",
  planName = "Pro plan",
  basePrice = 24,
  baseFeatures = DEFAULT_BASE_FEATURES,
  addons = DEFAULT_ADDONS,
  currency = "$",
  ctaLabel = "Continue to checkout",
  className,
}: PricingAddonsProps) {
  const [enabled, setEnabled] = useState<boolean[]>(() =>
    addons.map((a) => a.defaultOn ?? false),
  );

  const total =
    basePrice + addons.reduce((sum, a, i) => (enabled[i] ? sum + a.price : sum), 0);

  const toggle = (index: number, on: boolean) =>
    setEnabled((prev) => prev.map((v, j) => (j === index ? on : v)));

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-border bg-surface">
        {/* Base plan */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border p-6">
          <div className="min-w-0">
            <h3 className="text-base font-semibold">{planName}</h3>
            <p className="mt-0.5 text-sm text-muted">{baseFeatures.join(" · ")}</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold tracking-tight">
              {currency}
              {basePrice}
            </span>
            <span className="text-sm text-muted">/mo base</span>
          </div>
        </div>

        {/* Add-ons */}
        <ul className="divide-y divide-border">
          {addons.map((addon, i) => (
            <li key={addon.name} className="flex items-center justify-between gap-4 p-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 text-sm font-medium">
                  {addon.name}
                  <span className="font-normal text-muted">
                    +{currency}
                    {addon.price}/mo
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted">{addon.description}</p>
              </div>
              <Switch
                checked={enabled[i]}
                onCheckedChange={(on) => toggle(i, on)}
                label={`${addon.name} (+${currency}${addon.price}/mo)`}
              />
            </li>
          ))}
        </ul>

        {/* Total */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border bg-background/40 p-6 sm:flex-row">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight" aria-hidden="true">
              <AnimatedAmount value={total} currency={currency} />
            </span>
            <span className="text-sm text-muted" aria-hidden="true">
              /mo total
            </span>
            <span className="sr-only" aria-live="polite">
              Total {currency}
              {total.toLocaleString("en-US")} per month
            </span>
          </div>
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
