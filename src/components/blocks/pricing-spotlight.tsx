import { ArrowRight, Check, ShieldCheck, Star } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

export interface PricingSpotlightProps {
  badge?: string;
  name?: string;
  description?: string;
  price?: string;
  /** Optional struck-through reference price. */
  originalPrice?: string;
  priceNote?: string;
  features?: string[];
  ctaLabel?: string;
  /** Social-proof line shown beneath the CTA. */
  proof?: string;
  guarantee?: string;
  className?: string;
}

const DEFAULT_FEATURES = [
  "All 80+ components",
  "Lifetime updates",
  "Figma design tokens",
  "Unlimited projects",
  "Copy-paste source",
  "Priority email support",
  "Dark & light themes",
  "No attribution required",
];

/**
 * PricingSpotlight — a single, conversion-focused plan lit by a soft gradient
 * glow, with a two-column feature checklist and trust signals. The CTA reuses
 * the ShimmerButton primitive for a premium, animated accent.
 */
export function PricingSpotlight({
  badge = "Lifetime deal",
  name = "Lumen Pro",
  description = "Everything in one payment. Own it forever — no subscription, no lock-in.",
  price = "$199",
  originalPrice = "$399",
  priceNote = "one-time payment",
  features = DEFAULT_FEATURES,
  ctaLabel = "Get lifetime access",
  proof = "Loved by 2,000+ product teams",
  guarantee = "30-day money-back guarantee",
  className,
}: PricingSpotlightProps) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-brand/30 via-brand-2/20 to-brand-3/30 blur-3xl"
      />
      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-border-strong bg-surface shadow-[0_40px_120px_-60px_var(--brand)]">
        <div className="p-8 sm:p-10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-ink">
              {badge}
            </span>
            <div className="flex items-center gap-0.5 text-brand-3" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-tight">{name}</h2>
          <p className="mt-2 text-pretty text-sm text-muted">{description}</p>

          <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-5xl font-semibold tracking-tight">
              {price}
            </span>
            {originalPrice && (
              <span className="pb-1.5 text-lg text-muted-2 line-through">
                {originalPrice}
              </span>
            )}
            <span className="pb-1.5 text-sm text-muted">{priceNote}</span>
          </div>

          <div className="mt-7 flex justify-center">
            <ShimmerButton type="button" className="w-full justify-center">
              {ctaLabel}
              <ArrowRight className="size-4" />
            </ShimmerButton>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2 text-center text-xs text-muted sm:flex-row sm:justify-center sm:gap-4">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-brand-2" />
              {guarantee}
            </span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>{proof}</span>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border bg-background/40 p-8 text-sm sm:grid-cols-2 sm:p-10">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
              <span className="text-foreground/90">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
