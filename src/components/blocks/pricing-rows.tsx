import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RowPlan {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  cta?: string;
  popular?: boolean;
}

export interface PricingRowsProps {
  heading?: string;
  subheading?: string;
  plans?: RowPlan[];
  className?: string;
}

const DEFAULT_PLANS: RowPlan[] = [
  {
    name: "Hobby",
    description: "For personal projects and weekend experiments.",
    price: "$0",
    period: "/mo",
    features: ["3 projects", "Community support", "1 GB storage"],
    cta: "Start free",
  },
  {
    name: "Pro",
    description: "For freelancers and small teams shipping to production.",
    price: "$29",
    period: "/mo",
    features: [
      "Unlimited projects",
      "Priority support",
      "50 GB storage",
      "Custom domains",
    ],
    cta: "Choose Pro",
    popular: true,
  },
  {
    name: "Business",
    description: "For organizations that need scale and governance.",
    price: "$99",
    period: "/mo",
    features: ["SSO & SAML", "Audit logs", "Unlimited storage", "Dedicated manager"],
    cta: "Choose Business",
  },
];

/**
 * PricingRows — compact, horizontally stacked plan rows that stay scannable on
 * dense pages. The recommended plan is lifted with a brand ring.
 */
export function PricingRows({
  heading = "Find the right plan",
  subheading = "Straightforward tiers with no hidden fees. Upgrade or downgrade anytime.",
  plans = DEFAULT_PLANS,
  className,
}: PricingRowsProps) {
  return (
    <section className={cn("mx-auto w-full max-w-3xl", className)}>
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-10 space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col gap-5 rounded-2xl border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between",
              plan.popular
                ? "border-brand/50 ring-1 ring-brand/40"
                : "border-border",
            )}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.popular && (
                  <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="inline-flex items-center gap-1.5 text-xs text-foreground/80"
                  >
                    <Check className="size-3.5 shrink-0 text-brand-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-5 border-t border-border pt-4 sm:flex-col sm:items-end sm:border-0 sm:pt-0 sm:text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-muted">{plan.period}</span>
                )}
              </div>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                  plan.popular
                    ? "bg-brand text-white hover:bg-brand/90"
                    : "border border-border-strong text-foreground hover:bg-surface-2",
                )}
              >
                {plan.cta ?? "Choose"}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
