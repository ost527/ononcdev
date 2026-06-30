import type { ReactNode } from "react";
import { Copy, Download, Rocket, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HorizontalStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsHorizontalProps {
  eyebrow?: string;
  heading?: string;
  steps?: HorizontalStep[];
  className?: string;
}

const DEFAULT_STEPS: HorizontalStep[] = [
  {
    title: "Install",
    description: "Spin up a Next.js app and add Tailwind, motion, and lucide.",
    icon: <Download className="size-5" />,
  },
  {
    title: "Copy a component",
    description: "Open any Code tab and paste the source into your project.",
    icon: <Copy className="size-5" />,
  },
  {
    title: "Make it yours",
    description: "Tune the design tokens and props until it fits your brand.",
    icon: <Wand2 className="size-5" />,
  },
  {
    title: "Ship it",
    description: "Build, deploy, and watch your interface come alive.",
    icon: <Rocket className="size-5" />,
  },
];

/**
 * StepsHorizontal — a refined horizontal "how it works" row. Gradient-ringed
 * icon nodes sit on a connector line that fades from brand to border, each
 * carrying a small index badge. The sequence folds into a centered column on
 * small screens.
 */
export function StepsHorizontal({
  eyebrow = "How it works",
  heading = "From zero to shipped in four steps",
  steps = DEFAULT_STEPS,
  className,
}: StepsHorizontalProps) {
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

      <ol className="relative mt-14 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
        {steps.map((step, i) => (
          <li
            key={i}
            className="group relative flex flex-col items-center gap-4 px-2 text-center"
          >
            {/* connector to the next node (desktop, horizontal) */}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-1/2 top-7 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-brand/50 to-border lg:block"
              />
            )}
            {/* gradient-ringed node */}
            <span className="relative z-10 grid size-14 place-items-center rounded-full bg-gradient-to-br from-brand via-brand-2 to-brand-3 p-px shadow-[0_10px_30px_-12px_var(--brand)] transition-transform duration-300 group-hover:scale-105">
              <span className="grid size-full place-items-center rounded-full bg-surface text-brand-ink">
                {step.icon ?? (
                  <span className="text-sm font-semibold">{i + 1}</span>
                )}
              </span>
              {step.icon && (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              )}
            </span>
            <div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mx-auto mt-1 max-w-[18rem] text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
