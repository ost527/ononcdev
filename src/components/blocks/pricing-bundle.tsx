import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BundleItem {
  name: string;
  description?: string;
  price: number;
}

export interface PricingBundleProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  items?: BundleItem[];
  bundleName?: string;
  bundlePrice?: number;
  bundleFeatures?: string[];
  currency?: string;
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: BundleItem[] = [
  { name: "Component Library", description: "80+ accessible components", price: 49 },
  { name: "Section Blocks", description: "Drop-in page sections", price: 39 },
  { name: "Figma Kit", description: "Design tokens & source files", price: 29 },
];

/**
 * PricingBundle — individual products combined into a single discounted bundle,
 * with the per-item prices, the struck individual total, and a "Save $X" callout.
 */
export function PricingBundle({
  eyebrow = "Bundle & save",
  heading = "Get everything together",
  subheading = "Buy the complete toolkit as a bundle and save versus purchasing each part on its own.",
  items = DEFAULT_ITEMS,
  bundleName = "Complete Bundle",
  bundlePrice = 89,
  bundleFeatures = ["Lifetime access", "1 year of updates", "Priority support"],
  currency = "$",
  ctaLabel = "Get the bundle",
  className,
}: PricingBundleProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const savings = Math.max(0, total - bundlePrice);
  const pct = total > 0 ? Math.round((savings / total) * 100) : 0;

  return (
    <section className={cn("mx-auto w-full max-w-3xl", className)}>
      <div className="text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface">
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.name} className="flex items-center justify-between gap-4 p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-border bg-background text-brand-2">
                  <Check className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  {item.description && (
                    <div className="text-xs text-muted">{item.description}</div>
                  )}
                </div>
              </div>
              <span className="text-sm font-semibold tabular-nums text-muted">
                {currency}
                {item.price}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-border bg-background/40 p-6 sm:p-7">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">{bundleName}</h3>
                {savings > 0 && (
                  <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-white">
                    Save {currency}
                    {savings.toLocaleString()} ({pct}%)
                  </span>
                )}
              </div>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {bundleFeatures.map((f) => (
                  <li
                    key={f}
                    className="inline-flex items-center gap-1.5 text-xs text-foreground/80"
                  >
                    <Check className="size-3.5 shrink-0 text-brand-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <div className="flex items-baseline gap-2 sm:justify-end">
                <span className="text-3xl font-semibold tracking-tight tabular-nums">
                  {currency}
                  {bundlePrice}
                </span>
                {savings > 0 && (
                  <span className="text-sm tabular-nums text-muted-2 line-through">
                    {currency}
                    {total}
                  </span>
                )}
              </div>
              <button
                type="button"
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:w-auto"
              >
                {ctaLabel}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
