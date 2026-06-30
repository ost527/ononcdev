import { Fragment } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MatrixPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  cta?: string;
  popular?: boolean;
}

export interface MatrixRow {
  feature: string;
  /** One cell per plan: true/false renders a check/dash; a string renders as-is. */
  values: (boolean | string)[];
}

export interface MatrixGroup {
  label: string;
  rows: MatrixRow[];
}

export interface PricingTableProps {
  heading?: string;
  subheading?: string;
  plans?: MatrixPlan[];
  groups?: MatrixGroup[];
  /** Index of the highlighted (recommended) plan column. */
  highlight?: number;
  className?: string;
}

const DEFAULT_PLANS: MatrixPlan[] = [
  { name: "Starter", price: "$0", period: "/mo", description: "For trying things out.", cta: "Start free" },
  {
    name: "Pro",
    price: "$24",
    period: "/mo",
    description: "For growing teams.",
    cta: "Start trial",
    popular: true,
  },
  { name: "Scale", price: "$64", period: "/mo", description: "For larger orgs.", cta: "Contact sales" },
];

const DEFAULT_GROUPS: MatrixGroup[] = [
  {
    label: "Usage",
    rows: [
      { feature: "Projects", values: ["3", "Unlimited", "Unlimited"] },
      { feature: "Asset storage", values: ["1 GB", "50 GB", "1 TB"] },
      { feature: "API requests", values: ["10k / mo", "1M / mo", "Unlimited"] },
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
      { feature: "Community", values: [true, true, true] },
      { feature: "Priority support", values: [false, true, true] },
      { feature: "Dedicated manager", values: [false, false, true] },
    ],
  },
];

function MatrixCell({
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
 * PricingTable — a full comparison matrix with per-plan price and CTA in the
 * header, grouped feature rows, and a highlighted recommended column. Built as
 * a semantic, scrollable table.
 */
export function PricingTable({
  heading = "Compare every plan",
  subheading = "All the details, side by side — so you can choose with confidence.",
  plans = DEFAULT_PLANS,
  groups = DEFAULT_GROUPS,
  highlight = 1,
  className,
}: PricingTableProps) {
  const colCount = plans.length + 1;
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-10 overflow-x-auto rounded-3xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">Plan comparison</caption>
          <thead>
            <tr>
              <th scope="col" className="w-1/4 p-5 align-bottom">
                <span className="text-sm font-medium text-muted">Plans</span>
              </th>
              {plans.map((plan, i) => (
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
                    <span className="text-2xl font-semibold tracking-tight">{plan.price}</span>
                    {plan.period && <span className="text-xs text-muted">{plan.period}</span>}
                  </div>
                  {plan.description && (
                    <p className="mt-1 text-xs font-normal text-muted">{plan.description}</p>
                  )}
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
              ))}
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
                      <MatrixCell key={i} value={value} highlighted={i === highlight} />
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
