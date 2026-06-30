"use client";

import { type ReactNode, useState } from "react";
import { Check, Copy, Download, Rocket, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChecklistStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsChecklistProps {
  eyebrow?: string;
  heading?: string;
  steps?: ChecklistStep[];
  className?: string;
}

const DEFAULT_STEPS: ChecklistStep[] = [
  {
    title: "Install the toolkit",
    description: "Add Tailwind, motion, and lucide-react, then drop in the tokens.",
    icon: <Download className="size-5" />,
  },
  {
    title: "Copy your first component",
    description: "Grab any component's source from the Code tab and paste it in.",
    icon: <Copy className="size-5" />,
  },
  {
    title: "Theme it to your brand",
    description: "Tune the CSS variables until the color and motion feel right.",
    icon: <Wand2 className="size-5" />,
  },
  {
    title: "Ship to production",
    description: "Build and deploy — it's accessible and reduced-motion aware.",
    icon: <Rocket className="size-5" />,
  },
];

/**
 * StepsChecklist — an interactive getting-started checklist. Each row is a
 * toggleable checkbox (role=checkbox, keyboard-operable) and a live meter
 * tracks how many steps are complete.
 */
export function StepsChecklist({
  eyebrow = "Getting started",
  heading = "Check off your first launch",
  steps = DEFAULT_STEPS,
  className,
}: StepsChecklistProps) {
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));
  const completed = done.filter(Boolean).length;
  const pct = steps.length ? Math.round((completed / steps.length) * 100) : 0;
  const allDone = completed === steps.length && steps.length > 0;

  const toggle = (i: number) =>
    setDone((prev) => prev.map((v, j) => (j === i ? !v : v)));

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

      <div className="mt-8 flex items-center gap-4">
        <div
          className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-valuenow={completed}
          aria-label="Steps completed"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2 transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="shrink-0 text-sm font-medium tabular-nums text-muted">
          {allDone ? "All done 🎉" : `${completed} of ${steps.length}`}
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {steps.map((step, i) => {
          const checked = done[i];
          return (
            <li key={i}>
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggle(i)}
                className={cn(
                  "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors",
                  checked
                    ? "border-brand/40 bg-surface"
                    : "border-border hover:bg-surface",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border transition-colors",
                    checked
                      ? "border-brand bg-brand text-white"
                      : "border-border-strong text-transparent",
                  )}
                >
                  <Check className="size-4" />
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "block font-semibold transition-colors",
                      checked && "text-muted line-through",
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {step.description}
                  </span>
                </span>
                {step.icon && (
                  <span className="mt-0.5 shrink-0 text-muted-2">{step.icon}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
