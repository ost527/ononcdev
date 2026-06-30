import { ArrowRight, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingSplitProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  benefits?: string[];
  note?: string;
  planName?: string;
  price?: string;
  period?: string;
  planDescription?: string;
  features?: string[];
  cta?: string;
  className?: string;
}

const DEFAULT_BENEFITS = [
  "Ship 2× faster with ready-made sections",
  "Own the code — no runtime dependency",
  "Accessible and responsive out of the box",
  "Free updates for a full year",
];

const DEFAULT_FEATURES = [
  "All 80+ components",
  "Section blocks",
  "Figma design tokens",
  "Priority support",
  "Dark & light themes",
];

/**
 * PricingSplit — an editorial two-column layout: a value-prop column with
 * benefit bullets beside a single, highlighted price card.
 */
export function PricingSplit({
  eyebrow = "Simple pricing",
  heading = "One plan. Everything included.",
  description = "Stop assembling tools. Get the entire component library, section blocks, and design tokens in a single, fair plan.",
  benefits = DEFAULT_BENEFITS,
  note = "Trusted by 2,000+ teams · 30-day money-back guarantee",
  planName = "Pro",
  price = "$19",
  period = "/mo",
  planDescription = "Everything you need to design and ship.",
  features = DEFAULT_FEATURES,
  cta = "Start free trial",
  className,
}: PricingSplitProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <span className="text-sm font-semibold text-brand-ink">{eyebrow}</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-pretty text-muted">{description}</p>
          <ul className="mt-6 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand-2">
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-2">{note}</p>
        </div>

        {/* Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-brand via-brand-2/50 to-border p-px shadow-[0_30px_80px_-50px_var(--brand)]">
          <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
            <Sparkles className="size-3.5" />
            Best value
          </span>
          <div className="flex h-full flex-col rounded-[calc(1.5rem_-_1px)] bg-surface p-8">
            <h3 className="text-lg font-semibold">{planName}</h3>
            <p className="mt-1 text-sm text-muted">{planDescription}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-5xl font-semibold tracking-tight">{price}</span>
              {period && <span className="text-sm text-muted">{period}</span>}
            </div>
            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              {cta}
              <ArrowRight className="size-4" />
            </button>
            <ul className="mt-7 space-y-3 text-sm">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
