import { cn } from "@/lib/utils";

export interface EditorialStep {
  title: string;
  description: string;
}

export interface StepsEditorialProps {
  eyebrow?: string;
  heading?: string;
  steps?: EditorialStep[];
  className?: string;
}

const DEFAULT_STEPS: EditorialStep[] = [
  {
    title: "Install",
    description:
      "Spin up a Next.js app and add Tailwind, motion, and lucide-react. The design tokens slot straight into your globals.",
  },
  {
    title: "Copy a component",
    description:
      "Open any Code tab and paste the real source into your project. No package, no lock-in — just the code you can read.",
  },
  {
    title: "Make it yours",
    description:
      "Retune the tokens and props until the color, motion, and spacing feel unmistakably like your brand.",
  },
  {
    title: "Ship it",
    description:
      "Accessible and reduced-motion aware by default, so it's ready for production the moment you deploy.",
  },
];

/**
 * StepsEditorial — a typography-forward sequence. Oversized gradient numerals
 * and hairline dividers carry the rhythm; there are no cards or icons, just
 * confident type. Pure CSS, server-safe.
 */
export function StepsEditorial({
  eyebrow = "How it works",
  heading = "A few deliberate steps",
  steps = DEFAULT_STEPS,
  className,
}: StepsEditorialProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
      </div>

      <ol className="mt-12">
        {steps.map((step, i) => (
          <li
            key={i}
            className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-border py-8 first:border-t-0 first:pt-0 sm:gap-10"
          >
            <span
              aria-hidden
              className="text-gradient text-5xl font-black leading-none tabular-nums sm:text-6xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
