import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SavingsPlan {
  name: string;
  description: string;
  /** Per-month price when billed monthly. */
  monthly: number;
  /** Per-month price when billed annually. */
  yearly: number;
  features: string[];
  cta?: string;
  popular?: boolean;
}

export interface PricingSavingsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  plans?: SavingsPlan[];
  currency?: string;
  className?: string;
}

const DEFAULT_PLANS: SavingsPlan[] = [
  {
    name: "Starter",
    description: "For side projects.",
    monthly: 12,
    yearly: 9,
    features: ["Unlimited projects", "Community support", "5 GB storage"],
    cta: "Choose Starter",
  },
  {
    name: "Pro",
    description: "For growing teams.",
    monthly: 30,
    yearly: 24,
    features: ["Everything in Starter", "Priority support", "100 GB storage", "Custom domains"],
    cta: "Choose Pro",
    popular: true,
  },
  {
    name: "Scale",
    description: "For larger orgs.",
    monthly: 80,
    yearly: 64,
    features: ["Everything in Pro", "SSO & SAML", "Audit logs", "Dedicated manager"],
    cta: "Choose Scale",
  },
];

/**
 * PricingSavings — annual-billing cards that show the monthly price struck
 * through beside the cheaper annual rate, plus an explicit "Save $X/yr" badge.
 */
export function PricingSavings({
  eyebrow = "Save with annual billing",
  heading = "Pay yearly, save big",
  subheading = "Every plan costs less per month when billed annually — here's exactly how much you save.",
  plans = DEFAULT_PLANS,
  currency = "$",
  className,
}: PricingSavingsProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-5 pt-3 lg:grid-cols-3">
        {plans.map((plan) => {
          const savings = (plan.monthly - plan.yearly) * 12;
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
                  Most popular
                </span>
              )}
              <div className="flex h-full flex-col rounded-[calc(1.5rem_-_1px)] bg-surface p-7">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold">{plan.name}</h3>
                  {savings > 0 && (
                    <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand-ink">
                      Save {currency}
                      {savings.toLocaleString("en-US")}/yr
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight tabular-nums">
                    {currency}
                    {plan.yearly}
                  </span>
                  <span className="text-sm text-muted">/mo</span>
                  {plan.monthly > plan.yearly && (
                    <span className="text-sm tabular-nums text-muted-2 line-through">
                      {currency}
                      {plan.monthly}
                    </span>
                  )}
                </div>
                <p className="mt-1 h-5 text-xs text-muted-2">
                  billed annually ({currency}
                  {(plan.yearly * 12).toLocaleString("en-US")}/yr)
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
