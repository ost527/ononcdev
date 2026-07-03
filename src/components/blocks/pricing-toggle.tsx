"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Period = "Monthly" | "Annual";

export interface TogglePlan {
  name: string;
  description: string;
  /** Price per month when billed monthly. */
  monthly: number;
  /** Price per month when billed annually. */
  yearly: number;
  features: string[];
  cta?: string;
  popular?: boolean;
}

export interface PricingToggleProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  plans?: TogglePlan[];
  /** Currency symbol prefixed to every amount. */
  currency?: string;
  className?: string;
}

const DEFAULT_PLANS: TogglePlan[] = [
  {
    name: "Starter",
    description: "Everything you need to launch your first idea.",
    monthly: 0,
    yearly: 0,
    features: [
      "Up to 3 projects",
      "Community support",
      "1 GB asset storage",
      "Basic analytics",
    ],
    cta: "Start for free",
  },
  {
    name: "Pro",
    description: "For teams that ship on a weekly cadence.",
    monthly: 24,
    yearly: 19,
    features: [
      "Unlimited projects",
      "Priority support",
      "50 GB asset storage",
      "Advanced analytics",
      "Custom domains",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Scale",
    description: "Security and controls for larger organizations.",
    monthly: 64,
    yearly: 52,
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Unlimited storage",
      "Audit logs",
      "Dedicated manager",
    ],
    cta: "Contact sales",
  },
];

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
    const duration = prefersReducedMotion() ? 0 : 480;
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
 * PricingToggle — three tiers with a Monthly/Annual switch. Prices tween when
 * the billing period changes (instant under reduced-motion), and the
 * recommended tier is elevated with a gradient ring and glow.
 */
export function PricingToggle({
  eyebrow = "Pricing",
  heading = "Simple, transparent pricing",
  subheading = "Start free, then scale as your team grows. Switch or cancel anytime.",
  plans = DEFAULT_PLANS,
  currency = "$",
  className,
}: PricingToggleProps) {
  const [period, setPeriod] = useState<Period>("Monthly");
  const annual = period === "Annual";

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <SegmentedControl
          options={["Monthly", "Annual"]}
          value={period}
          onValueChange={(v) => setPeriod(v as Period)}
        />
        <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-ink">
          <Sparkles className="size-3.5" />
          Save up to 20% yearly
        </span>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-5 pt-3 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = annual ? plan.yearly : plan.monthly;
          const free = price === 0;
          return (
            <div
              key={plan.name}
            className={cn(
                "relative h-full rounded-3xl p-px",
                plan.popular
                  ? "bg-gradient-to-b from-brand via-brand-2/50 to-border shadow-[0_30px_80px_-50px_var(--brand)]"
                  : "bg-border",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  <Sparkles className="size-3.5" />
                  Most popular
                </span>
              )}
              <div className="flex h-full flex-col rounded-[calc(1.5rem_-_1px)] bg-surface p-7">
                <h3 className="text-base font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  {free ? (
                    <span className="text-4xl font-semibold tracking-tight">
                      Free
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-semibold tracking-tight">
                        <AnimatedAmount value={price} currency={currency} />
                      </span>
                      <span className="text-sm text-muted">/mo</span>
                    </>
                  )}
                </div>
                <p className="mt-1 h-5 text-xs text-muted-2">
                  {free
                    ? "Free forever"
                    : annual
                      ? `${currency}${(plan.yearly * 12).toLocaleString("en-US")} billed yearly`
                      : "Billed monthly"}
                </p>

                <button
                  type="button"
                  className={cn(
                    "mt-6 w-full rounded-full px-5 py-3 text-sm font-semibold transition-colors",
                    plan.popular
                      ? "bg-brand text-white hover:bg-brand/90"
                      : "border border-border-strong text-foreground hover:bg-surface-2",
                  )}
                >
                  {plan.cta ?? "Choose plan"}
                </button>

                <ul className="mt-7 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
