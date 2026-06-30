import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MinimalPlan {
  name: string;
  description: string;
  price: string;
  period?: string;
  cta?: string;
  popular?: boolean;
}

export interface PricingMinimalProps {
  heading?: string;
  subheading?: string;
  plans?: MinimalPlan[];
  className?: string;
}

const DEFAULT_PLANS: MinimalPlan[] = [
  {
    name: "Hobby",
    description: "Personal projects and prototypes.",
    price: "$0",
    period: "/mo",
    cta: "Get started",
  },
  {
    name: "Pro",
    description: "Everything you need to ship for a living.",
    price: "$19",
    period: "/mo",
    cta: "Start trial",
    popular: true,
  },
  {
    name: "Team",
    description: "Collaboration, roles, and shared billing.",
    price: "$49",
    period: "/mo",
    cta: "Start trial",
  },
  {
    name: "Enterprise",
    description: "Custom security, support, and contracts.",
    price: "Custom",
    cta: "Contact us",
  },
];

/**
 * PricingMinimal — understated, typography-forward pricing on hairline dividers
 * (no boxed cards), with quiet text-link CTAs. Server-safe, pure CSS.
 */
export function PricingMinimal({
  heading = "Pricing, without the noise",
  subheading = "A few clear plans — no feature-matrix overwhelm. Pick one and start building.",
  plans = DEFAULT_PLANS,
  className,
}: PricingMinimalProps) {
  return (
    <section className={cn("mx-auto w-full max-w-3xl", className)}>
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-10 border-y border-border">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="grid grid-cols-1 items-baseline gap-3 border-b border-border py-6 last:border-0 sm:grid-cols-[1fr_auto_auto] sm:gap-8"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{plan.name}</h3>
                {plan.popular && (
                  <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand-ink">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted">{plan.description}</p>
            </div>
            <div className="flex items-baseline gap-1 sm:justify-end">
              <span className="text-2xl font-semibold tracking-tight">{plan.price}</span>
              {plan.period && <span className="text-sm text-muted">{plan.period}</span>}
            </div>
            <button
              type="button"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink sm:justify-self-end"
            >
              {plan.cta ?? "Choose"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
