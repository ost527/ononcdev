import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EnterprisePlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta?: string;
  popular?: boolean;
}

export interface PricingEnterpriseProps {
  heading?: string;
  subheading?: string;
  plans?: EnterprisePlan[];
  enterpriseTitle?: string;
  enterpriseDescription?: string;
  enterpriseFeatures?: string[];
  enterpriseCta?: string;
  className?: string;
}

const DEFAULT_PLANS: EnterprisePlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "For getting started.",
    features: ["3 projects", "Community support", "1 GB storage"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$24",
    period: "/mo",
    description: "For growing teams.",
    features: ["Unlimited projects", "Priority support", "50 GB storage"],
    cta: "Start trial",
    popular: true,
  },
  {
    name: "Business",
    price: "$64",
    period: "/mo",
    description: "For scaling teams.",
    features: ["Everything in Pro", "Roles & permissions", "Audit logs"],
    cta: "Start trial",
  },
];

const DEFAULT_ENTERPRISE_FEATURES = [
  "SSO & SAML",
  "Dedicated success manager",
  "99.9% uptime SLA",
  "Custom contracts & invoicing",
];

/**
 * PricingEnterprise — self-serve tiers above a full-width Enterprise band with
 * a gradient wash, feature bullets, and a contact-sales CTA.
 */
export function PricingEnterprise({
  heading = "Plans that grow with you",
  subheading = "Start self-serve and move to Enterprise when you need more control.",
  plans = DEFAULT_PLANS,
  enterpriseTitle = "Enterprise",
  enterpriseDescription = "Custom pricing with the security, support, and controls large teams need.",
  enterpriseFeatures = DEFAULT_ENTERPRISE_FEATURES,
  enterpriseCta = "Talk to sales",
  className,
}: PricingEnterpriseProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-5 pt-3 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex h-full flex-col rounded-2xl border bg-surface p-6",
              plan.popular ? "border-brand/50 ring-1 ring-brand/40" : "border-border",
            )}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h3 className="text-base font-semibold">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted">{plan.description}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
              {plan.period && <span className="text-sm text-muted">{plan.period}</span>}
            </div>
            <ul className="mt-5 flex-1 space-y-2.5 text-sm">
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
                "mt-6 w-full rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                plan.popular
                  ? "bg-brand text-white hover:bg-brand/90"
                  : "border border-border-strong text-foreground hover:bg-surface-2",
              )}
            >
              {plan.cta ?? "Choose plan"}
            </button>
          </div>
        ))}
      </div>

      {/* Enterprise band */}
      <div className="relative mt-5 overflow-hidden rounded-3xl border border-border-strong bg-surface p-8 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand/10 via-transparent to-brand-2/10"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold tracking-tight">{enterpriseTitle}</h3>
            <p className="mt-2 text-sm text-muted">{enterpriseDescription}</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {enterpriseFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground/90">
                  <Check className="size-4 shrink-0 text-brand-2" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90 lg:w-auto"
            >
              {enterpriseCta}
              <ArrowRight className="size-4" />
            </button>
            <p className="mt-2 text-center text-xs text-muted-2 lg:text-right">
              Custom invoicing & MSAs available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
