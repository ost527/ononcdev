import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingTrialProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  benefits?: string[];
  ctaLabel?: string;
  priceNote?: string;
  className?: string;
}

const DEFAULT_BENEFITS = [
  "Full access to every feature",
  "No credit card required",
  "Cancel anytime",
];

/**
 * PricingTrial — a conversion-focused free-trial band: a soft gradient wash,
 * benefit chips, a prominent CTA, and the post-trial price.
 */
export function PricingTrial({
  eyebrow = "Free trial",
  heading = "Try every feature free for 14 days",
  description = "Spin up your workspace in minutes and explore the entire product with no limits — decide later.",
  benefits = DEFAULT_BENEFITS,
  ctaLabel = "Start your free trial",
  priceNote = "Then $24/mo · cancel anytime",
  className,
}: PricingTrialProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface px-6 py-12 text-center sm:px-10 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/12 via-transparent to-brand-2/12"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-56 w-[34rem] max-w-full -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-ink">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-pretty text-muted">{description}</p>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {benefits.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-1.5 text-sm text-foreground/90"
              >
                <Check className="size-4 shrink-0 text-brand-2" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              {ctaLabel}
              <ArrowRight className="size-4" />
            </button>
            <p className="text-xs text-muted-2">{priceNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
