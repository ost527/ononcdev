"use client";

import { type KeyboardEvent, useId, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectablePlan {
  name: string;
  description: string;
  price: string;
  period?: string;
  /** Small label shown beside the name, e.g. "Save 20%". */
  note?: string;
}

export interface PricingSelectorProps {
  heading?: string;
  subheading?: string;
  plans?: SelectablePlan[];
  defaultIndex?: number;
  className?: string;
}

const DEFAULT_PLANS: SelectablePlan[] = [
  {
    name: "Monthly",
    description: "Pay as you go, cancel whenever you like.",
    price: "$29",
    period: "/mo",
  },
  {
    name: "Annual",
    description: "12 months upfront — two months free.",
    price: "$23",
    period: "/mo",
    note: "Save 20%",
  },
  {
    name: "Lifetime",
    description: "One payment, yours forever with free updates.",
    price: "$599",
    period: "once",
    note: "Best value",
  },
];

/**
 * PricingSelector — selectable plan cards exposed as a radiogroup. Click or use
 * ↑/↓ to choose a plan; the summary bar and CTA reflect the active selection.
 */
export function PricingSelector({
  heading = "Choose how you pay",
  subheading = "Switch plans at any time. Every option includes the full component library.",
  plans = DEFAULT_PLANS,
  defaultIndex = 1,
  className,
}: PricingSelectorProps) {
  const baseId = useId();
  const [selected, setSelected] = useState(
    Math.min(Math.max(defaultIndex, 0), plans.length - 1),
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = selected;
    if (e.key === "ArrowDown" || e.key === "ArrowRight")
      next = (selected + 1) % plans.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      next = (selected - 1 + plans.length) % plans.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = plans.length - 1;
    else return;
    e.preventDefault();
    setSelected(next);
    document.getElementById(`${baseId}-${next}`)?.focus();
  };

  const active = plans[selected];

  return (
    <section className={cn("mx-auto w-full max-w-xl", className)}>
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div
        role="radiogroup"
        aria-label="Billing plan"
        onKeyDown={onKeyDown}
        className="mt-8 space-y-3"
      >
        {plans.map((plan, i) => {
          const isSelected = i === selected;
          return (
            <button
              key={plan.name}
              id={`${baseId}-${i}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(i)}
              className={cn(
                "flex w-full items-center gap-4 rounded-2xl border bg-surface p-5 text-left transition-colors",
                isSelected
                  ? "border-brand/60 ring-1 ring-brand/40"
                  : "border-border hover:border-border-strong",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                  isSelected
                    ? "border-brand bg-brand text-white"
                    : "border-border-strong",
                )}
              >
                {isSelected && <Check className="size-3" />}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-semibold">{plan.name}</span>
                  {plan.note && (
                    <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand-ink">
                      {plan.note}
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {plan.description}
                </span>
              </span>

              <span className="flex shrink-0 items-baseline gap-1">
                <span className="text-xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-xs text-muted">{plan.period}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-background/50 p-4 sm:flex-row">
        <p className="text-sm text-muted">
          Selected:{" "}
          <span className="font-semibold text-foreground">{active.name}</span> —{" "}
          {active.price}
          {active.period ? ` ${active.period}` : ""}
        </p>
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:w-auto"
        >
          Continue with {active.name}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
