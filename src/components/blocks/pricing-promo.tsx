"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { Check, Tag, X } from "lucide-react";
import { cn, prefersReducedMotion } from "@/lib/utils";

export interface PromoPlan {
  name: string;
  description: string;
  price: number;
  features: string[];
  cta?: string;
  popular?: boolean;
}

export interface PricingPromoProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  plans?: PromoPlan[];
  /** Promo code (matched case-insensitively). */
  code?: string;
  /** Percentage off applied when the code matches. */
  percentOff?: number;
  currency?: string;
  className?: string;
}

const DEFAULT_PLANS: PromoPlan[] = [
  {
    name: "Starter",
    description: "For side projects.",
    price: 15,
    features: ["Unlimited projects", "Community support", "5 GB storage"],
    cta: "Choose Starter",
  },
  {
    name: "Pro",
    description: "For growing teams.",
    price: 30,
    features: ["Everything in Starter", "Priority support", "100 GB storage", "Custom domains"],
    cta: "Choose Pro",
    popular: true,
  },
  {
    name: "Scale",
    description: "For larger orgs.",
    price: 75,
    features: ["Everything in Pro", "SSO & SAML", "Audit logs"],
    cta: "Choose Scale",
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

  return (
    <span className="tabular-nums">
      {currency}
      {Math.round(display).toLocaleString()}
    </span>
  );
}

/**
 * PricingPromo — pricing cards plus a promo-code field. Applying a valid code
 * discounts every plan, easing the prices down with a struck original and an
 * "applied" state; an invalid code shows an inline error.
 */
export function PricingPromo({
  eyebrow = "Launch offer",
  heading = "Got a promo code?",
  subheading = "Apply your code to see the discount reflected across every plan.",
  plans = DEFAULT_PLANS,
  code = "LAUNCH20",
  percentOff = 20,
  currency = "$",
  className,
}: PricingPromoProps) {
  const baseId = useId();
  const [input, setInput] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState(false);
  const factor = applied ? 1 - percentOff / 100 : 1;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim().toUpperCase() === code.toUpperCase()) {
      setApplied(true);
      setError(false);
    } else {
      setApplied(false);
      setError(true);
    }
  };

  const remove = () => {
    setApplied(false);
    setError(false);
    setInput("");
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mx-auto mt-8 max-w-md">
        <span className="sr-only" aria-live="polite">
          {applied ? `Promo code ${code} applied — ${percentOff}% off` : ""}
        </span>
        {applied ? (
          <div className="flex items-center justify-between gap-3 rounded-full border border-brand/40 bg-brand/10 px-4 py-2.5">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-ink">
              <Check className="size-4" />
              Code {code} applied — {percentOff}% off
            </span>
            <button
              type="button"
              onClick={remove}
              aria-label="Remove promo code"
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-muted transition-colors hover:text-foreground"
            >
              <X className="size-3.5" />
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <label htmlFor={`${baseId}-code`} className="sr-only">
              Promo code
            </label>
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border bg-surface py-2 pl-4 pr-2 transition-colors",
                error ? "border-brand-3" : "border-border focus-within:border-brand",
              )}
            >
              <Tag className="size-4 shrink-0 text-muted" aria-hidden />
              <input
                id={`${baseId}-code`}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Enter code (try LAUNCH20)"
                aria-invalid={error}
                aria-describedby={error ? `${baseId}-error` : undefined}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-2"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
              >
                Apply
              </button>
            </div>
            {error && (
              <p id={`${baseId}-error`} role="alert" className="mt-2 pl-4 text-xs text-brand-3">
                That code isn&apos;t valid. Try LAUNCH20.
              </p>
            )}
          </form>
        )}
      </div>

      <div className="mt-10 grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const discounted = plan.price * factor;
          return (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-3xl p-px",
                plan.popular
                  ? "bg-gradient-to-b from-brand via-brand-2/50 to-border shadow-[0_30px_80px_-50px_var(--brand)]"
                  : "bg-border",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  Most popular
                </span>
              )}
              <div className="flex h-full flex-col rounded-[calc(1.5rem_-_1px)] bg-surface p-7">
                <h3 className="text-base font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">
                    <AnimatedAmount value={discounted} currency={currency} />
                  </span>
                  <span className="text-sm text-muted">/mo</span>
                  {applied && (
                    <span className="text-sm tabular-nums text-muted-2 line-through">
                      {currency}
                      {plan.price}
                    </span>
                  )}
                </div>
                <p className="mt-1 h-5 text-xs font-medium text-brand-ink">
                  {applied ? `${percentOff}% off applied` : ""}
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
