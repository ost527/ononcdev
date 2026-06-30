"use client";

import { Check } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface TabbedPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta?: string;
  popular?: boolean;
}

export interface AudienceGroup {
  label: string;
  plans: TabbedPlan[];
}

export interface PricingTabsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  groups?: AudienceGroup[];
  className?: string;
}

const DEFAULT_GROUPS: AudienceGroup[] = [
  {
    label: "Individuals",
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "/mo",
        description: "For hobby projects.",
        features: ["3 projects", "Community support", "1 GB storage"],
        cta: "Start free",
      },
      {
        name: "Plus",
        price: "$12",
        period: "/mo",
        description: "For solo makers.",
        features: ["Unlimited projects", "Email support", "20 GB storage", "Custom domains"],
        cta: "Go Plus",
        popular: true,
      },
    ],
  },
  {
    label: "Teams",
    plans: [
      {
        name: "Team",
        price: "$32",
        period: "/seat",
        description: "For small teams.",
        features: ["Everything in Plus", "Shared workspaces", "Roles & permissions", "100 GB storage"],
        cta: "Start trial",
        popular: true,
      },
      {
        name: "Business",
        price: "$64",
        period: "/seat",
        description: "For scaling teams.",
        features: ["Everything in Team", "SSO & SAML", "Audit logs", "Priority support"],
        cta: "Start trial",
      },
    ],
  },
  {
    label: "Enterprise",
    plans: [
      {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations with bespoke needs.",
        features: [
          "Unlimited everything",
          "Dedicated success manager",
          "99.9% uptime SLA",
          "Custom contracts & invoicing",
        ],
        cta: "Contact sales",
        popular: true,
      },
    ],
  },
];

function PlanCard({ plan }: { plan: TabbedPlan }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-surface p-6",
        plan.popular ? "border-brand/50 ring-1 ring-brand/40" : "border-border",
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
          Recommended
        </span>
      )}
      <h3 className="text-base font-semibold text-foreground">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted">{plan.description}</p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight text-foreground">{plan.price}</span>
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
  );
}

/**
 * PricingTabs — segments plans by audience (Individuals / Teams / Enterprise)
 * behind an accessible tablist; switching a tab swaps the whole plan set.
 */
export function PricingTabs({
  eyebrow = "Pricing",
  heading = "Plans for every kind of team",
  subheading = "Pick the audience that fits — pricing adapts to how you work.",
  groups = DEFAULT_GROUPS,
  className,
}: PricingTabsProps) {
  const items = groups.map((group) => ({
    label: group.label,
    content: (
      <div
        className={cn(
          "grid grid-cols-1 gap-5 pt-2 sm:grid-cols-2",
          group.plans.length >= 3 && "lg:grid-cols-3",
          group.plans.length === 1 && "mx-auto max-w-md",
        )}
      >
        {group.plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    ),
  }));

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>
      <div className="mx-auto mt-8 max-w-4xl">
        <Tabs items={items} />
      </div>
    </section>
  );
}
