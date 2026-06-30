import { Check } from "lucide-react";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FaqPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta?: string;
  popular?: boolean;
}

export interface PricingFaqProps {
  heading?: string;
  subheading?: string;
  plans?: FaqPlan[];
  faqHeading?: string;
  faqs?: AccordionItem[];
  className?: string;
}

const DEFAULT_PLANS: FaqPlan[] = [
  {
    name: "Starter",
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
    name: "Scale",
    price: "$64",
    period: "/mo",
    description: "For larger orgs.",
    features: ["Everything in Pro", "SSO & SAML", "Audit logs"],
    cta: "Contact sales",
  },
];

const DEFAULT_FAQS: AccordionItem[] = [
  {
    title: "Can I change plans later?",
    content:
      "Yes — upgrade or downgrade anytime. We prorate the difference automatically.",
  },
  {
    title: "Is there a free trial?",
    content:
      "Every paid plan includes a 14-day free trial, and no credit card is required to start.",
  },
  {
    title: "What payment methods do you accept?",
    content:
      "All major credit cards. On annual plans we can also invoice your team.",
  },
  {
    title: "Do you offer discounts?",
    content:
      "Annual billing saves about 20%, and we offer discounts for students and nonprofits.",
  },
  {
    title: "Can I cancel anytime?",
    content:
      "Absolutely. Cancel in one click and keep access until the end of your billing period.",
  },
];

/**
 * PricingFaq — compact tiers above an integrated Pricing FAQ built on the
 * accessible Accordion, so buyers can resolve objections without leaving.
 */
export function PricingFaq({
  heading = "Pricing & FAQ",
  subheading = "Straightforward plans, and answers to the questions we hear most.",
  plans = DEFAULT_PLANS,
  faqHeading = "Frequently asked questions",
  faqs = DEFAULT_FAQS,
  className,
}: PricingFaqProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-start gap-5 md:grid-cols-3">
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

      <div className="mx-auto mt-16 max-w-2xl">
        <h3 className="text-center text-xl font-semibold tracking-tight">{faqHeading}</h3>
        <Accordion items={faqs} defaultIndex={0} className="mt-6" />
      </div>
    </section>
  );
}
