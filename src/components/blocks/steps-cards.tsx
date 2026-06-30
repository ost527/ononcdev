import { Fragment, type ReactNode } from "react";
import { ChevronDown, ChevronRight, Copy, Download, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsCardsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  steps?: CardStep[];
  className?: string;
}

const DEFAULT_STEPS: CardStep[] = [
  {
    title: "Install",
    description:
      "Spin up a Next.js app and add Tailwind, motion, and lucide-react.",
    icon: <Download className="size-5" />,
  },
  {
    title: "Copy a component",
    description:
      "Open the Code tab and paste the real source into your project.",
    icon: <Copy className="size-5" />,
  },
  {
    title: "Make it yours",
    description: "Tune the tokens and props until it matches your brand.",
    icon: <Wand2 className="size-5" />,
  },
];

/**
 * StepsCards — numbered "how it works" cards joined by chevron connectors.
 * Each card carries a large ghost numeral and lifts on hover; the connectors
 * point right on desktop and down when the cards stack on small screens.
 */
export function StepsCards({
  eyebrow = "Workflow",
  heading = "Three steps to a polished UI",
  subheading = "No setup ceremony — copy, customize, and ship.",
  steps = DEFAULT_STEPS,
  className,
}: StepsCardsProps) {
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

      <ol className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {steps.map((step, i) => (
          <Fragment key={i}>
            <li className="group relative flex-1 overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_24px_60px_-32px_var(--brand)]">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-3 select-none text-7xl font-black leading-none text-brand/10 transition-colors duration-300 group-hover:text-brand/20"
              >
                {i + 1}
              </span>
              <span className="relative grid size-11 place-items-center rounded-xl border border-border bg-background text-brand-ink transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand-2">
                {step.icon ?? (
                  <span className="text-sm font-semibold">{i + 1}</span>
                )}
              </span>
              <h3 className="relative mt-5 text-base font-semibold">
                {step.title}
              </h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
            {i < steps.length - 1 && (
              <li
                aria-hidden
                className="flex items-center justify-center text-muted-2"
              >
                <ChevronRight className="hidden size-6 shrink-0 lg:block" />
                <ChevronDown className="size-6 shrink-0 lg:hidden" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </section>
  );
}
