import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComparisonRow {
  feature: string;
  /** One cell per plan: true/false, or a string value. */
  values: (boolean | string)[];
}

export interface ComparisonTableProps {
  plans?: string[];
  rows?: ComparisonRow[];
  /** Index of the highlighted plan column. */
  highlight?: number;
  className?: string;
}

const DEFAULT_PLANS = ["Starter", "Pro", "Studio"];
const DEFAULT_ROWS: ComparisonRow[] = [
  { feature: "Components", values: ["12", "All", "All"] },
  { feature: "Section blocks", values: [false, true, true] },
  { feature: "Light & dark themes", values: [true, true, true] },
  { feature: "Figma tokens", values: [false, true, true] },
  { feature: "Priority support", values: [false, false, true] },
  { feature: "Custom theming", values: [false, false, true] },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-foreground">{value}</span>;
  }
  return value ? (
    <Check className="mx-auto size-4 text-brand-2" />
  ) : (
    <Minus className="mx-auto size-4 text-muted-2" />
  );
}

/**
 * ComparisonTable — a feature matrix comparing plans, with one column elevated
 * as the recommended choice.
 */
export function ComparisonTable({
  plans = DEFAULT_PLANS,
  rows = DEFAULT_ROWS,
  highlight = 1,
  className,
}: ComparisonTableProps) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-2xl border border-border",
        className,
      )}
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-sm font-medium text-muted">Features</th>
            {plans.map((plan, i) => (
              <th
                key={plan}
                className={cn(
                  "p-4 text-center text-sm font-semibold",
                  i === highlight && "text-brand-ink",
                )}
              >
                {plan}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-border last:border-0">
              <th
                scope="row"
                className="p-4 text-left text-sm font-normal text-foreground/90"
              >
                {row.feature}
              </th>
              {row.values.map((value, i) => (
                <td
                  key={i}
                  className={cn(
                    "p-4 text-center",
                    i === highlight && "bg-brand/5",
                  )}
                >
                  <Cell value={value} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
