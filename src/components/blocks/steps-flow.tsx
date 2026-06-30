import { Fragment, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FlowStep {
  title: string;
}

export interface FlowOutcome {
  label: string;
  icon?: ReactNode;
}

export interface StepsFlowProps {
  eyebrow?: string;
  heading?: string;
  steps?: FlowStep[];
  outcome?: FlowOutcome;
  className?: string;
}

const DEFAULT_STEPS: FlowStep[] = [
  { title: "Install" },
  { title: "Copy a component" },
  { title: "Make it yours" },
];

const DEFAULT_OUTCOME: FlowOutcome = {
  label: "Shipped",
  icon: <Rocket className="size-4" />,
};

/**
 * StepsFlow — a compact process diagram. Numbered chips connect left to right
 * with arrows and resolve into a highlighted outcome node; the flow stacks
 * vertically (with down-arrows) on small screens. Pure CSS, server-safe.
 */
export function StepsFlow({
  eyebrow = "The flow",
  heading = "A simple path to launch",
  steps = DEFAULT_STEPS,
  outcome = DEFAULT_OUTCOME,
  className,
}: StepsFlowProps) {
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
      </div>

      <ol className="mt-12 flex flex-col items-stretch justify-center gap-3 lg:flex-row lg:items-center">
        {steps.map((step, i) => (
          <Fragment key={i}>
            <li className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 transition-colors hover:border-border-strong lg:flex-col lg:gap-2 lg:px-6 lg:text-center">
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-background text-xs font-semibold text-brand-ink">
                {i + 1}
              </span>
              <span className="font-semibold">{step.title}</span>
            </li>
            <li aria-hidden className="flex items-center justify-center text-muted-2">
              <ArrowRight className="hidden size-5 shrink-0 lg:block" />
              <ArrowDown className="size-5 shrink-0 lg:hidden" />
            </li>
          </Fragment>
        ))}
        <li className="flex items-center gap-3 rounded-2xl border border-brand/50 bg-brand/10 px-5 py-4 shadow-[0_0_40px_-18px_var(--brand)] lg:flex-col lg:gap-2 lg:px-6 lg:text-center">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white">
            {outcome.icon}
          </span>
          <span className="font-semibold text-brand-ink">{outcome.label}</span>
        </li>
      </ol>
    </section>
  );
}
