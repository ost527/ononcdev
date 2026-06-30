import { ArrowRight, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HighlightPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta?: string;
  featured?: boolean;
}

export interface PricingHighlightProps {
  heading?: string;
  subheading?: string;
  plans?: HighlightPlan[];
  className?: string;
}

const DEFAULT_PLANS: HighlightPlan[] = [
  {
    name: "Basic",
    price: "$9",
    period: "/mo",
    description: "For individuals getting started.",
    features: ["10 projects", "Email support", "5 GB storage"],
    cta: "Choose Basic",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "Everything serious teams need to ship.",
    features: [
      "Unlimited projects",
      "Priority support",
      "100 GB storage",
      "Advanced analytics",
      "Custom domains",
    ],
    cta: "Choose Pro",
    featured: true,
  },
  {
    name: "Business",
    price: "$79",
    period: "/mo",
    description: "For organizations at scale.",
    features: ["Everything in Pro", "SSO & SAML", "Audit logs"],
    cta: "Choose Business",
  },
];

/**
 * PricingHighlight — an asymmetric "podium" 3-up where the recommended plan is
 * enlarged and gradient-highlighted, with the two flanking plans kept compact.
 */
export function PricingHighlight({
  heading = "One plan stands out",
  subheading = "Most teams choose Pro — it's the sweet spot of power and price.",
  plans = DEFAULT_PLANS,
  className,
}: PricingHighlightProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 items-center gap-5 lg:grid-cols-3">
        {plans.map((plan) =>
          plan.featured ? (
            <div
              key={plan.name}
              className="relative rounded-3xl bg-gradient-to-b from-brand via-brand-2/50 to-border p-px shadow-[0_40px_100px_-50px_var(--brand)] lg:-my-4"
            >
              <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                <Sparkles className="size-3.5" />
                Most popular
              </span>
              <div className="flex h-full flex-col rounded-[calc(1.5rem_-_1px)] bg-surface p-8">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-sm text-muted">{plan.period}</span>}
                </div>
                <button
                  type="button"
                  className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
                >
                  {plan.cta ?? "Choose plan"}
                  <ArrowRight className="size-4" />
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
          ) : (
            <div
              key={plan.name}
              className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7"
            >
              <h3 className="text-base font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted">{plan.period}</span>}
              </div>
              <button
                type="button"
                className="mt-6 w-full rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
              >
                {plan.cta ?? "Choose plan"}
              </button>
              <ul className="mt-6 space-y-2.5 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
