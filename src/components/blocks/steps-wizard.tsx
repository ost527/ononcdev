"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WizardStep {
  title: string;
  description: string;
}

export interface StepsWizardProps {
  eyebrow?: string;
  heading?: string;
  steps?: WizardStep[];
  className?: string;
}

const DEFAULT_STEPS: WizardStep[] = [
  {
    title: "Install",
    description:
      "Create a Next.js app and add Tailwind, motion, and lucide-react, then drop in the design tokens so the whole kit themes itself.",
  },
  {
    title: "Copy a component",
    description:
      "Open any component's Code tab and paste its real source into your project. No package to install, nothing to lock you in.",
  },
  {
    title: "Make it yours",
    description:
      "Tune the CSS variables and props until the motion, color, and spacing match your brand exactly.",
  },
  {
    title: "Ship it",
    description:
      "Everything is accessible and reduced-motion aware out of the box, so you can deploy with confidence.",
  },
];

/**
 * StepsWizard — a guided, linear flow. A numbered stepper tracks progress
 * (completed steps show a check), nodes are clickable, and Back/Continue move
 * through the steps, marking each complete as you advance.
 */
export function StepsWizard({
  eyebrow = "Setup wizard",
  heading = "Get set up, step by step",
  steps = DEFAULT_STEPS,
  className,
}: StepsWizardProps) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));
  const last = steps.length - 1;
  const allDone = done.every(Boolean);

  const markAndAdvance = () => {
    setDone((prev) => prev.map((v, i) => (i === current ? true : v)));
    if (current < last) setCurrent(current + 1);
  };

  return (
    <section className={cn("mx-auto max-w-2xl", className)}>
      <div>
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
      </div>

      {/* stepper */}
      <ol className="relative mt-10 flex items-center justify-between">
        <span
          aria-hidden
          className="absolute inset-x-0 top-4 h-px -translate-y-1/2 bg-border"
        />
        {steps.map((step, i) => {
          const isDone = done[i];
          const isCurrent = i === current;
          return (
            <li key={i} className="relative z-10">
              <button
                type="button"
                onClick={() => setCurrent(i)}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Step ${i + 1}: ${step.title}`}
                className="group flex flex-col items-center gap-2"
              >
                <span
                  className={cn(
                    "grid size-8 place-items-center rounded-full border text-xs font-semibold transition-colors",
                    isDone && "border-brand bg-brand text-white",
                    isCurrent &&
                      !isDone &&
                      "border-brand bg-background text-brand-ink ring-4 ring-[var(--ring)]",
                    !isDone &&
                      !isCurrent &&
                      "border-border bg-surface text-muted group-hover:border-border-strong",
                  )}
                >
                  {isDone ? <Check className="size-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium sm:block",
                    isCurrent ? "text-foreground" : "text-muted",
                  )}
                >
                  {step.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* panel */}
      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
          Step {String(current + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
        </span>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          {steps[current].title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {steps[current].description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-background disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>

          {allDone ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
              <Check className="size-4" />
              All steps complete
            </span>
          ) : (
            <button
              type="button"
              onClick={markAndAdvance}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              {current === last ? "Finish" : "Continue"}
              <ArrowRight className="size-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
