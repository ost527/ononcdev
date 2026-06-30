import { Check, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LicenseTier {
  name: string;
  price: string;
  /** Seat scope, e.g. "1 developer". */
  seats: string;
  description: string;
  features: string[];
  cta?: string;
  popular?: boolean;
}

export interface PricingOnetimeProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  tiers?: LicenseTier[];
  note?: string;
  className?: string;
}

const DEFAULT_TIERS: LicenseTier[] = [
  {
    name: "Personal",
    price: "$79",
    seats: "1 developer",
    description: "For solo makers and indie projects.",
    features: [
      "All components & blocks",
      "Unlimited personal projects",
      "1 year of free updates",
    ],
    cta: "Buy license",
  },
  {
    name: "Team",
    price: "$249",
    seats: "Up to 5 developers",
    description: "For small teams shipping together.",
    features: [
      "Everything in Personal",
      "Use in client & commercial work",
      "Priority email support",
      "1 year of free updates",
    ],
    cta: "Buy license",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$899",
    seats: "Unlimited developers",
    description: "For organizations and agencies.",
    features: [
      "Everything in Team",
      "Company-wide license",
      "Onboarding session",
      "1 year of free updates",
    ],
    cta: "Contact sales",
  },
];

/**
 * PricingOnetime — perpetual one-time license tiers (no subscription): a single
 * payment per seat scope, each including a year of updates and use-forever terms.
 */
export function PricingOnetime({
  eyebrow = "One-time purchase",
  heading = "Buy once, own it forever",
  subheading = "No subscriptions. Pay a single time and keep using your version forever.",
  tiers = DEFAULT_TIERS,
  note = "All licenses are perpetual — keep the version you buy forever. Includes one year of free updates.",
  className,
}: PricingOnetimeProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative rounded-3xl p-px",
              tier.popular
                ? "bg-gradient-to-b from-brand via-brand-2/50 to-border shadow-[0_30px_80px_-50px_var(--brand)]"
                : "bg-border",
            )}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                Most popular
              </span>
            )}
            <div className="flex h-full flex-col rounded-[calc(1.5rem_-_1px)] bg-surface p-7">
              <div className="flex items-center gap-2">
                <KeyRound
                  className={cn("size-5", tier.popular ? "text-brand" : "text-brand-2")}
                  aria-hidden
                />
                <h3 className="text-base font-semibold">{tier.name}</h3>
              </div>
              <p className="mt-2 text-sm text-muted">{tier.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                <span className="text-sm text-muted">one-time</span>
              </div>
              <p className="mt-1 text-xs text-muted-2">{tier.seats}</p>
              <button
                type="button"
                className={cn(
                  "mt-6 w-full rounded-full px-5 py-3 text-sm font-semibold transition-colors",
                  tier.popular
                    ? "bg-brand text-white hover:bg-brand/90"
                    : "border border-border-strong text-foreground hover:bg-surface-2",
                )}
              >
                {tier.cta ?? "Buy license"}
              </button>
              <ul className="mt-7 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-2">{note}</p>
    </section>
  );
}
