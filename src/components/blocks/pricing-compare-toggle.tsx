"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Check, Minus, Sparkles } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Period = "Monthly" | "Annual";

export interface ComparePlan {
  name: string;
  monthly: number;
  /** Per-month price when billed annually. */
  yearly: number;
  cta?: string;
  popular?: boolean;
}

export interface CompareRow {
  feature: string;
  values: (boolean | string)[];
}

export interface CompareGroup {
  label: string;
  rows: CompareRow[];
}

export interface PricingCompareToggleProps {
  heading?: string;
  subheading?: string;
  plans?: ComparePlan[];
  groups?: CompareGroup[];
  highlight?: number;
  currency?: string;
  className?: string;
}

const DEFAULT_PLANS: ComparePlan[] = [
  { name: "Starter", monthly: 0, yearly: 0, cta: "Start free" },
  { name: "Pro", monthly: 24, yearly: 19, cta: "Start trial", popular: true },
  { name: "Scale", monthly: 64, yearly: 52, cta: "Contact sales" },
];

const DEFAULT_GROUPS: CompareGroup[] = [
  {
    label: "Usage",
    rows: [
      { feature: "Projects", values: ["3", "Unlimited", "Unlimited"] },
      { feature: "Asset storage", values: ["1 GB", "50 GB", "1 TB"] },
    ],
  },
  {
    label: "Collaboration",
    rows: [
      { feature: "Team members", values: ["1", "10", "Unlimited"] },
      { feature: "Roles & permissions", values: [false, true, true] },
      { feature: "Audit log", values: [false, false, true] },
    ],
  },
  {
    label: "Support",
    rows: [
      { feature: "Priority support", values: [false, true, true] },
      { feature: "Dedicated manager", values: [false, false, true] },
    ],
  },
];

/** Eases the displayed amount toward `value`; jumps in one frame under reduced motion. */
function AnimatedAmount({ value, currency }: { value: number; currency: string }) {
  const [display, setDisplay] = useState(value);
  const displayRef = useRef(value);
  const raf = useRef(0);

  useEffect(() => {
    const from = displayRef.current;
    const to = value;
    if (from === to) return;
    const duration = prefersReducedMotion() ? 0 : 420;
    const start = performance.now();
    const tick = (now: number) => {
      const p = duration <= 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      displayRef.current = from + (to - from) * eased;
      setDisplay(displayRef.current);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else displayRef.current = to;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return (
    <span className="tabular-nums">
      {currency}
      {Math.round(display).toLocaleString("en-US")}
    </span>
  );
}

function CompareCell({
  value,
  highlighted,
}: {
  value: boolean | string;
  highlighted: boolean;
}) {
  return (
    <td className={cn("px-5 py-3 text-center align-middle", highlighted && "bg-brand/5")}>
      {typeof value === "string" ? (
        <span className="text-sm text-foreground/90">{value}</span>
      ) : value ? (
        <Check className="mx-auto size-4 text-brand-2" role="img" aria-label="Included" />
      ) : (
        <Minus className="mx-auto size-4 text-muted-2" role="img" aria-label="Not included" />
      )}
    </td>
  );
}

/**
 * PricingCompareToggle — a comparison matrix with a Monthly/Annual switch whose
 * per-plan header prices tween between periods (instant under reduced-motion).
 */
export function PricingCompareToggle({
  heading = "Compare plans",
  subheading = "Switch billing to see how every plan scales.",
  plans = DEFAULT_PLANS,
  groups = DEFAULT_GROUPS,
  highlight = 1,
  currency = "$",
  className,
}: PricingCompareToggleProps) {
  const [period, setPeriod] = useState<Period>("Monthly");
  const annual = period === "Annual";
  const colCount = plans.length + 1;

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <SegmentedControl
          options={["Monthly", "Annual"]}
          value={period}
          onValueChange={(v) => setPeriod(v as Period)}
        />
        <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-ink">
          <Sparkles className="size-3.5" />
          Save up to 20% yearly
        </span>
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">Plan comparison ({period} billing)</caption>
          <thead>
            <tr>
              <th scope="col" className="w-1/4 p-5 align-bottom">
                <span className="text-sm font-medium text-muted">Plans</span>
              </th>
              {plans.map((plan, i) => {
                const price = annual ? plan.yearly : plan.monthly;
                const free = price === 0;
                return (
                  <th
                    key={plan.name}
                    scope="col"
                    className={cn("p-5 text-center align-bottom", i === highlight && "bg-brand/5")}
                  >
                    {plan.popular && (
                      <span className="mb-2 inline-block rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        Most popular
                      </span>
                    )}
                    <div
                      className={cn(
                        "text-base font-semibold",
                        i === highlight && "text-brand-ink",
                      )}
                    >
                      {plan.name}
                    </div>
                    <div className="mt-1 flex items-baseline justify-center gap-1">
                      {free ? (
                        <span className="text-2xl font-semibold tracking-tight">Free</span>
                      ) : (
                        <>
                          <span className="text-2xl font-semibold tracking-tight">
                            <AnimatedAmount value={price} currency={currency} />
                          </span>
                          <span className="text-xs text-muted">/mo</span>
                        </>
                      )}
                    </div>
                    <p className="mt-0.5 h-4 text-[11px] font-normal text-muted-2">
                      {free ? "" : annual ? "billed yearly" : "billed monthly"}
                    </p>
                    <button
                      type="button"
                      className={cn(
                        "mt-3 w-full rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                        i === highlight
                          ? "bg-brand text-white hover:bg-brand/90"
                          : "border border-border-strong text-foreground hover:bg-surface-2",
                      )}
                    >
                      {plan.cta ?? "Choose"}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <Fragment key={group.label}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={colCount}
                    className="border-t border-border bg-surface px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-2"
                  >
                    {group.label}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.feature} className="border-t border-border">
                    <th
                      scope="row"
                      className="px-5 py-3 text-left text-sm font-normal text-foreground/90"
                    >
                      {row.feature}
                    </th>
                    {row.values.map((value, i) => (
                      <CompareCell key={i} value={value} highlighted={i === highlight} />
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
