"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface CurrencyOption {
  code: string;
  symbol: string;
  /** Multiplier applied to the USD base price. */
  rate: number;
}

export interface CurrencyPlan {
  name: string;
  description: string;
  /** Base monthly price in USD. */
  usd: number;
  features: string[];
  cta?: string;
  popular?: boolean;
}

export interface PricingCurrencyProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  currencies?: CurrencyOption[];
  plans?: CurrencyPlan[];
  className?: string;
}

const DEFAULT_CURRENCIES: CurrencyOption[] = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
];

const DEFAULT_PLANS: CurrencyPlan[] = [
  {
    name: "Starter",
    description: "For side projects and experiments.",
    usd: 0,
    features: ["3 projects", "Community support", "1 GB storage"],
    cta: "Start free",
  },
  {
    name: "Pro",
    description: "For growing teams shipping weekly.",
    usd: 24,
    features: ["Unlimited projects", "Priority support", "50 GB storage", "Custom domains"],
    cta: "Start trial",
    popular: true,
  },
  {
    name: "Scale",
    description: "For larger organizations.",
    usd: 64,
    features: ["Everything in Pro", "SSO & SAML", "Audit logs", "Dedicated manager"],
    cta: "Contact sales",
  },
];

/** Eases the displayed number toward `value`; jumps in one frame under reduced motion. */
function AnimatedAmount({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const displayRef = useRef(value);
  const raf = useRef(0);

  useEffect(() => {
    const from = displayRef.current;
    const to = value;
    if (from === to) return;
    const duration = prefersReducedMotion() ? 0 : 420;
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

  return <span className="tabular-nums">{Math.round(display).toLocaleString("en-US")}</span>;
}

/**
 * PricingCurrency — three tiers with a currency switcher. Prices convert from a
 * USD base and tween to the new amount (instant under reduced-motion); the
 * symbol swaps with the selected currency.
 */
export function PricingCurrency({
  eyebrow = "Global pricing",
  heading = "Priced for wherever you are",
  subheading = "Switch currency to see your local rate. Taxes are calculated at checkout.",
  currencies = DEFAULT_CURRENCIES,
  plans = DEFAULT_PLANS,
  className,
}: PricingCurrencyProps) {
  const [code, setCode] = useState(currencies[0]?.code ?? "USD");
  const active = currencies.find((c) => c.code === code) ?? currencies[0];
  if (!active) return null;

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-8 flex justify-center">
        <SegmentedControl
          options={currencies.map((c) => c.code)}
          value={code}
          onValueChange={setCode}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-5 pt-3 lg:grid-cols-3">
        {plans.map((plan) => {
          const converted = Math.round(plan.usd * active.rate);
          const free = plan.usd === 0;
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

                <div className="mt-5 flex items-baseline gap-1">
                  {free ? (
                    <span className="text-4xl font-semibold tracking-tight">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-semibold tracking-tight">
                        {active.symbol}
                        <AnimatedAmount value={converted} />
                      </span>
                      <span className="text-sm text-muted">/mo</span>
                    </>
                  )}
                </div>
                <p className="mt-1 h-5 text-xs text-muted-2">
                  {free ? "Free forever" : `Billed in ${active.code}`}
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
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                      <span className="text-foreground/90">{f}</span>
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
