import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta?: string;
  popular?: boolean;
}

export interface PricingProps {
  plans?: PricingPlan[];
  className?: string;
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For side projects and experiments.",
    features: ["12 components", "Community support", "MIT license"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "For teams shipping real products.",
    features: [
      "All components",
      "Section blocks",
      "Priority updates",
      "Figma tokens",
    ],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Studio",
    price: "$49",
    period: "/mo",
    description: "For agencies and design systems.",
    features: ["Everything in Pro", "Source figma", "Custom theming", "Email support"],
    cta: "Contact sales",
  },
];

/**
 * Pricing — three comparable tiers with the recommended plan elevated by a
 * brand ring and badge.
 */
export function Pricing({ plans = DEFAULT_PLANS, className }: PricingProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-stretch gap-4 pt-3 md:grid-cols-3",
        className,
      )}
    >
      {plans.map((plan, i) => (
        <div
          key={i}
          className={cn(
            "relative flex h-full flex-col rounded-2xl border bg-surface p-6",
            plan.popular
              ? "border-brand/60 shadow-[0_0_60px_-20px_var(--brand)]"
              : "border-border",
          )}
        >
          {plan.popular && (
            <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
              Most popular
            </span>
          )}
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <p className="mt-1 text-sm text-muted">{plan.description}</p>
          <div className="mt-5 flex items-baseline gap-1">
            <span className="text-4xl font-semibold tracking-tight">
              {plan.price}
            </span>
            {plan.period && (
              <span className="text-sm text-muted">{plan.period}</span>
            )}
          </div>
          <ul className="mt-6 flex-1 space-y-3 text-sm">
            {plan.features.map((feature, j) => (
              <li key={j} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-brand-2" />
                <span className="text-foreground/90">{feature}</span>
              </li>
            ))}
          </ul>
          <button
            className={cn(
              "mt-8 w-full rounded-full px-5 py-3 text-sm font-semibold transition-colors",
              plan.popular
                ? "bg-brand text-white hover:bg-brand/90"
                : "border border-border text-foreground hover:bg-background",
            )}
          >
            {plan.cta ?? "Choose plan"}
          </button>
        </div>
      ))}
    </div>
  );
}
