import type { ReactNode } from "react";
import { Copy, Download, Rocket, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AlternatingStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsAlternatingProps {
  eyebrow?: string;
  heading?: string;
  steps?: AlternatingStep[];
  className?: string;
}

const DEFAULT_STEPS: AlternatingStep[] = [
  {
    title: "Install",
    description:
      "Spin up a Next.js app and add Tailwind, motion, and lucide-react.",
    icon: <Download className="size-5" />,
  },
  {
    title: "Copy a component",
    description:
      "Open any Code tab and paste the real source into your project.",
    icon: <Copy className="size-5" />,
  },
  {
    title: "Make it yours",
    description:
      "Tune the design tokens and props until it matches your brand.",
    icon: <Wand2 className="size-5" />,
  },
  {
    title: "Ship it",
    description: "Build, deploy, and watch your interface come alive.",
    icon: <Rocket className="size-5" />,
  },
];

/**
 * StepsAlternating — a center-rail timeline whose cards zigzag left and right
 * on desktop and stack into a single left-anchored rail on mobile. Numbered
 * icon nodes ride the gradient rail.
 */
export function StepsAlternating({
  eyebrow = "The process",
  heading = "How a project comes together",
  steps = DEFAULT_STEPS,
  className,
}: StepsAlternatingProps) {
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

      <ol className="relative mt-14">
        <span
          aria-hidden
          className="absolute left-5 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand/50 via-border to-border md:left-1/2 md:-translate-x-1/2"
        />
        {steps.map((step, i) => {
          const left = i % 2 === 0;
          return (
            <li
              key={i}
              className="relative mb-10 last:mb-0 md:mb-12 md:grid md:grid-cols-2 md:items-center md:gap-x-12"
            >
              <span className="absolute left-5 top-1 z-10 grid size-10 -translate-x-1/2 place-items-center rounded-full border border-border bg-surface text-brand-ink shadow-sm md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                {step.icon ?? (
                  <span className="text-sm font-semibold">{i + 1}</span>
                )}
              </span>
              <div
                className={cn(
                  "ml-14 md:ml-0",
                  left
                    ? "md:col-start-1 md:pr-12 md:text-right"
                    : "md:col-start-2 md:pl-12",
                )}
              >
                <div className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
