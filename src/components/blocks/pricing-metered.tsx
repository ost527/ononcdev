import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MeterTier {
  label: string;
  rate: string;
}

export interface Meter {
  name: string;
  unit: string;
  tiers: MeterTier[];
}

export interface PricingMeteredProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  baseFee?: string;
  basePeriod?: string;
  meters?: Meter[];
  perks?: string[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_METERS: Meter[] = [
  {
    name: "API requests",
    unit: "per 1k",
    tiers: [
      { label: "First 50k", rate: "Free" },
      { label: "50k – 1M", rate: "$0.40" },
      { label: "1M+", rate: "$0.25" },
    ],
  },
  {
    name: "Storage",
    unit: "per GB / mo",
    tiers: [
      { label: "First 5 GB", rate: "Free" },
      { label: "5 – 500 GB", rate: "$0.02" },
      { label: "500 GB+", rate: "$0.015" },
    ],
  },
  {
    name: "Bandwidth",
    unit: "per GB",
    tiers: [
      { label: "First 100 GB", rate: "Free" },
      { label: "100 GB – 10 TB", rate: "$0.08" },
      { label: "10 TB+", rate: "$0.05" },
    ],
  },
];

const DEFAULT_PERKS = [
  "No minimums or commitments",
  "Volume discounts applied automatically",
  "Real-time usage dashboard",
];

/**
 * PricingMetered — a transparent metered-usage schedule: a flat platform fee
 * plus per-unit rate tables that step down at higher volume.
 */
export function PricingMetered({
  eyebrow = "Usage-based",
  heading = "Metered pricing, no surprises",
  subheading = "A flat platform fee plus transparent per-unit rates. Only pay for what you use.",
  baseFee = "$0",
  basePeriod = "/mo platform fee",
  meters = DEFAULT_METERS,
  perks = DEFAULT_PERKS,
  ctaLabel = "Start building free",
  className,
}: PricingMeteredProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border p-6 sm:p-7">
          <h3 className="text-base font-semibold">Pay-as-you-go</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold tracking-tight">{baseFee}</span>
            <span className="text-sm text-muted">{basePeriod}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {meters.map((meter) => (
            <div key={meter.name} className="bg-surface p-6">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-sm font-semibold">{meter.name}</h4>
                <span className="text-xs text-muted-2">{meter.unit}</span>
              </div>
              <dl className="mt-3 space-y-2">
                {meter.tiers.map((tier) => (
                  <div
                    key={tier.label}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <dt className="text-muted">{tier.label}</dt>
                    <dd className="font-medium tabular-nums">{tier.rate}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border bg-background/40 p-6 sm:flex-row sm:p-7">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-start">
            {perks.map((perk) => (
              <li
                key={perk}
                className="inline-flex items-center gap-1.5 text-sm text-foreground/80"
              >
                <Check className="size-4 shrink-0 text-brand-2" />
                {perk}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:w-auto"
          >
            {ctaLabel}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
