import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsBlockProps {
  heading?: string;
  steps?: Step[];
  className?: string;
}

const DEFAULT_STEPS: Step[] = [
  {
    title: "Install",
    description: "Spin up a Next.js app and add Tailwind and motion.",
  },
  {
    title: "Copy a component",
    description: "Grab any component's source from the Code tab and paste it in.",
  },
  {
    title: "Make it yours",
    description: "Tweak the tokens and props until it matches your brand.",
  },
];

/**
 * StepsBlock — a numbered "how it works" sequence with a connecting line on
 * larger screens.
 */
export function StepsBlock({
  heading = "Up and running in minutes",
  steps = DEFAULT_STEPS,
  className,
}: StepsBlockProps) {
  return (
    <section className={cn("w-full", className)}>
      <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
        {heading}
      </h2>
      <ol className="relative mt-12 grid gap-8 sm:grid-cols-3">
        <span
          aria-hidden
          className="absolute left-0 right-0 top-5 hidden h-px bg-border sm:block"
        />
        {steps.map((step, i) => (
          <li key={i} className="relative">
            <div className="relative z-10 grid size-10 place-items-center rounded-full border border-border bg-surface font-semibold text-brand-ink">
              {step.icon ?? i + 1}
            </div>
            <h3 className="mt-4 font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
