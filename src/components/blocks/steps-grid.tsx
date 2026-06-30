import { cn } from "@/lib/utils";

export interface GridStep {
  title: string;
  description: string;
}

export interface StepsGridProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  steps?: GridStep[];
  className?: string;
}

const DEFAULT_STEPS: GridStep[] = [
  {
    title: "Install",
    description:
      "Spin up a Next.js app and add Tailwind, motion, and lucide-react, then drop in the design tokens.",
  },
  {
    title: "Copy a component",
    description:
      "Open any Code tab and paste the real source into your project — no package, no lock-in.",
  },
  {
    title: "Make it yours",
    description:
      "Retune the tokens and props until the color, motion, and spacing match your brand.",
  },
  {
    title: "Ship it",
    description:
      "Accessible and reduced-motion aware by default, so it's ready the moment you deploy.",
  },
];

/**
 * StepsGrid — a two-column matrix of steps separated by hairline dividers, each
 * cell led by an oversized gradient numeral. Pure CSS, server-safe; the cells
 * lift subtly on hover.
 */
export function StepsGrid({
  eyebrow = "How it works",
  heading = "A clear, four-part workflow",
  subheading = "Each step stands on its own — start anywhere, finish in order.",
  steps = DEFAULT_STEPS,
  className,
}: StepsGridProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {subheading && <p className="mt-3 text-muted">{subheading}</p>}
      </div>

      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {steps.map((step, i) => (
          <li
            key={i}
            className="group relative bg-surface p-6 transition-colors hover:bg-background sm:p-8"
          >
            <span
              aria-hidden
              className="text-gradient text-4xl font-black leading-none tabular-nums sm:text-5xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </li>
        ))}
        {steps.length % 2 === 1 && (
          <li aria-hidden className="hidden bg-surface sm:block" />
        )}
      </ol>
    </section>
  );
}
