"use client";

import { type KeyboardEvent, useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabStep {
  title: string;
  description: string;
  points?: string[];
}

export interface StepsTabsProps {
  eyebrow?: string;
  heading?: string;
  steps?: TabStep[];
  className?: string;
}

const DEFAULT_STEPS: TabStep[] = [
  {
    title: "Install",
    description:
      "Create a Next.js app and add Tailwind, motion, and lucide-react, then drop in the design tokens.",
    points: ["Create a Next.js app", "Add the Tailwind v4 tokens", "Install motion + lucide"],
  },
  {
    title: "Copy a component",
    description:
      "Open any component's Code tab and paste its real source into your project — no package, no lock-in.",
    points: ["Open the Code tab", "Copy the full source", "Paste it into your app"],
  },
  {
    title: "Make it yours",
    description:
      "Tune the CSS variables and props until the motion, color, and spacing match your brand.",
    points: ["Restyle via tokens", "Tweak props and timing", "Compose into blocks"],
  },
  {
    title: "Ship it",
    description:
      "Accessible and reduced-motion aware by default, so it's ready for production the moment you deploy.",
    points: ["Accessible by default", "Reduced-motion safe", "Deploy anywhere"],
  },
];

/**
 * StepsTabs — a horizontal tablist of steps with a sliding underline indicator
 * (shared via motion's layoutId) and a content panel below. Full tablist
 * keyboard support: arrow keys, Home/End, and roving tabindex.
 */
export function StepsTabs({
  eyebrow = "How it works",
  heading = "Pick a step to explore",
  steps = DEFAULT_STEPS,
  className,
}: StepsTabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(0);

  const focusTab = (i: number) => {
    setActive(i);
    document.getElementById(`${baseId}-tab-${i}`)?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = steps.length - 1;
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab(active === last ? 0 : active + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusTab(active === 0 ? last : active - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(last);
        break;
    }
  };

  return (
    <section className={cn("mx-auto max-w-3xl", className)}>
      <div className="text-center">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
      </div>

      <div
        role="tablist"
        aria-label={heading}
        className="mt-10 flex gap-1 overflow-x-auto border-b border-border"
      >
        {steps.map((step, i) => {
          const selected = i === active;
          return (
            <button
              key={i}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "relative flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                selected ? "text-foreground" : "text-muted hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full border text-xs font-semibold transition-colors",
                  selected
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-surface",
                )}
              >
                {i + 1}
              </span>
              {step.title}
              {selected && (
                <motion.span
                  layoutId={`${baseId}-indicator`}
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {steps.map((step, i) => (
        <div
          key={i}
          id={`${baseId}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
          className="rounded-b-2xl border border-t-0 border-border bg-surface p-6 sm:p-8"
        >
          <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {step.description}
          </p>
          {step.points && step.points.length > 0 && (
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {step.points.map((point, j) => (
                <li
                  key={j}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <ArrowRight className="size-4 shrink-0 text-brand-2" />
                  <span className="text-foreground/90">{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
