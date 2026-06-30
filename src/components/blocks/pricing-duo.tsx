import { ArrowRight, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DuoPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta?: string;
  highlighted?: boolean;
}

export interface PricingDuoProps {
  heading?: string;
  subheading?: string;
  plans?: DuoPlan[];
  className?: string;
}

const DEFAULT_PLANS: DuoPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Everything you need to get started, forever free.",
    features: ["Up to 3 projects", "Community support", "1 GB storage", "Basic analytics"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "Unlock the full toolkit for serious work.",
    features: [
      "Unlimited projects",
      "Priority support",
      "100 GB storage",
      "Advanced analytics",
      "Custom domains",
      "Team roles",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
];

/**
 * PricingDuo — a focused two-plan layout that contrasts a free tier with a
 * gradient-highlighted Pro, for products with a simple upgrade path.
 */
export function PricingDuo({
  heading = "Two ways to build",
  subheading = "Start free and upgrade the moment you need more. No surprises.",
  plans = DEFAULT_PLANS,
  className,
}: PricingDuoProps) {
  return (
    <section className={cn("mx-auto w-full max-w-3xl", className)}>
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative rounded-3xl p-px",
              plan.highlighted
                ? "bg-gradient-to-b from-brand via-brand-2/50 to-border shadow-[0_30px_80px_-50px_var(--brand)]"
                : "bg-border",
            )}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                <Sparkles className="size-3.5" />
                Recommended
              </span>
            )}
            <div className="flex h-full flex-col rounded-[calc(1.5rem_-_1px)] bg-surface p-7">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted">{plan.period}</span>}
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={cn(
                  "mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition-colors",
                  plan.highlighted
                    ? "bg-brand text-white hover:bg-brand/90"
                    : "border border-border-strong text-foreground hover:bg-surface-2",
                )}
              >
                {plan.cta ?? "Choose plan"}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
