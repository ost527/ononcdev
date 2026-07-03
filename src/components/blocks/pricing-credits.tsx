import { Check, Coins, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CreditPack {
  name: string;
  /** Base credits in the pack. */
  credits: number;
  /** Bonus credits added on top. */
  bonus?: number;
  /** One-time price. */
  price: number;
  perks?: string[];
  popular?: boolean;
}

export interface PricingCreditsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  packs?: CreditPack[];
  currency?: string;
  className?: string;
}

const DEFAULT_PACKS: CreditPack[] = [
  {
    name: "Starter",
    credits: 1000,
    price: 9,
    perks: ["Credits never expire", "All models included"],
  },
  {
    name: "Growth",
    credits: 5000,
    bonus: 500,
    price: 39,
    perks: ["Everything in Starter", "Priority queue", "Usage analytics"],
    popular: true,
  },
  {
    name: "Scale",
    credits: 20000,
    bonus: 3000,
    price: 129,
    perks: ["Everything in Growth", "Volume discounts", "Dedicated support"],
  },
];

/**
 * PricingCredits — one-time credit packs for usage-metered products. Each pack
 * shows bonus credits and an effective per-credit price, with a best-value
 * pack highlighted.
 */
export function PricingCredits({
  eyebrow = "Pay as you go",
  heading = "Buy credits, use them anytime",
  subheading = "No subscription. Top up once and your credits never expire.",
  packs = DEFAULT_PACKS,
  currency = "$",
  className,
}: PricingCreditsProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-pretty text-muted">{subheading}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-5 pt-3 lg:grid-cols-3">
        {packs.map((pack) => {
          const totalCredits = pack.credits + (pack.bonus ?? 0);
          const perCredit = pack.price / totalCredits;
          return (
            <div
              key={pack.name}
              className={cn(
                "relative h-full rounded-3xl p-px",
                pack.popular
                  ? "bg-gradient-to-b from-brand via-brand-2/50 to-border shadow-[0_30px_80px_-50px_var(--brand)]"
                  : "bg-border",
              )}
            >
              {pack.popular && (
                <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  <Sparkles className="size-3.5" />
                  Best value
                </span>
              )}
              <div className="flex h-full flex-col rounded-[calc(1.5rem_-_1px)] bg-surface p-7">
                <div className="flex items-center gap-2">
                  <Coins
                    className={cn("size-5", pack.popular ? "text-brand" : "text-brand-2")}
                    aria-hidden
                  />
                  <h3 className="text-base font-semibold">{pack.name}</h3>
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight tabular-nums">
                    {currency}
                    {pack.price}
                  </span>
                  <span className="text-sm text-muted">one-time</span>
                </div>

                <div className="mt-4 rounded-2xl border border-border bg-background/50 p-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-semibold tabular-nums">
                      {pack.credits.toLocaleString("en-US")}
                    </span>
                    <span className="text-sm text-muted">credits</span>
                  </div>
                  {pack.bonus ? (
                    <p className="mt-1 text-sm font-medium text-brand-ink">
                      + {pack.bonus.toLocaleString("en-US")} bonus credits
                    </p>
                  ) : null}
                  <p className="mt-2 text-xs tabular-nums text-muted-2">
                    ≈ {currency}
                    {perCredit.toFixed(3)} / credit
                  </p>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                  {(pack.perks ?? []).map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                      <span className="text-foreground/90">{perk}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={cn(
                    "mt-7 w-full rounded-full px-5 py-3 text-sm font-semibold transition-colors",
                    pack.popular
                      ? "bg-brand text-white hover:bg-brand/90"
                      : "border border-border-strong text-foreground hover:bg-surface-2",
                  )}
                >
                  Buy {pack.name}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
