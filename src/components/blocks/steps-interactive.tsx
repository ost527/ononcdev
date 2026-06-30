"use client";

import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";
import { ArrowRight, Copy, Download, Rocket, Wand2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface InteractiveStep {
  title: string;
  tagline: string;
  description: string;
  bullets?: string[];
  icon?: ReactNode;
}

export interface StepsInteractiveProps {
  eyebrow?: string;
  heading?: string;
  steps?: InteractiveStep[];
  className?: string;
}

const DEFAULT_STEPS: InteractiveStep[] = [
  {
    title: "Install",
    tagline: "Set up the foundation",
    description:
      "Create a Next.js app, then add Tailwind, motion, and lucide-react. Drop in the design tokens and you're ready to paste components.",
    bullets: ["Create a Next.js app", "Add the Tailwind v4 tokens", "Install motion + lucide"],
    icon: <Download className="size-5" />,
  },
  {
    title: "Copy a component",
    tagline: "Grab the source",
    description:
      "Every component exposes its real source in the Code tab. Copy it straight into your project — no package, no lock-in.",
    bullets: ["Open the Code tab", "Copy the full source", "Paste it into your app"],
    icon: <Copy className="size-5" />,
  },
  {
    title: "Make it yours",
    tagline: "Tune the details",
    description:
      "Adjust the CSS variables and component props until the motion, color, and spacing match your brand.",
    bullets: ["Restyle via tokens", "Tweak props and timing", "Compose into blocks"],
    icon: <Wand2 className="size-5" />,
  },
  {
    title: "Ship it",
    tagline: "Launch with confidence",
    description:
      "Everything is accessible and reduced-motion aware out of the box. Build, deploy, and watch it come alive.",
    bullets: ["Accessible by default", "Reduced-motion safe", "Deploy anywhere"],
    icon: <Rocket className="size-5" />,
  },
];

/**
 * StepsInteractive — a clickable product walkthrough. A vertical tablist of
 * steps (full keyboard support: arrows, Home/End, roving tabindex) drives an
 * animated detail panel. Motion is disabled under reduced-motion.
 */
export function StepsInteractive({
  eyebrow = "Walkthrough",
  heading = "See how it fits together",
  steps = DEFAULT_STEPS,
  className,
}: StepsInteractiveProps) {
  const reduced = useReducedMotion();
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const current = steps[active];

  function selectAndFocus(i: number) {
    setActive(i);
    tabsRef.current[i]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = steps.length - 1;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        selectAndFocus(active === last ? 0 : active + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        selectAndFocus(active === 0 ? last : active - 1);
        break;
      case "Home":
        e.preventDefault();
        selectAndFocus(0);
        break;
      case "End":
        e.preventDefault();
        selectAndFocus(last);
        break;
    }
  }

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

      <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,20rem)_1fr]">
        {/* tablist */}
        <div
          role="tablist"
          aria-label={heading}
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {steps.map((step, i) => {
            const selected = i === active;
            return (
              <button
                key={i}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "flex min-w-[12rem] flex-1 items-center gap-3 rounded-xl border p-3 text-left transition-colors lg:min-w-0 lg:flex-none",
                  selected
                    ? "border-brand/50 bg-surface shadow-[0_10px_30px_-20px_var(--brand)]"
                    : "border-border hover:bg-surface",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg border text-sm font-semibold transition-colors",
                    selected
                      ? "border-brand bg-brand text-white"
                      : "border-border bg-background text-muted",
                  )}
                >
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">
                    {step.title}
                  </span>
                  <span className="block truncate text-xs text-muted">
                    {step.tagline}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* panel */}
        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          tabIndex={0}
          className="relative overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: reduced ? 0 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduced ? 0 : -16 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
              className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
                  Step {String(active + 1).padStart(2, "0")} · {current.tagline}
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {current.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {current.description}
                </p>
                {current.bullets && current.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {current.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <ArrowRight className="size-4 shrink-0 text-brand-2" />
                        <span className="text-foreground/90">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div
                aria-hidden
                className="relative hidden size-32 shrink-0 place-items-center sm:grid"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/25 via-brand-2/10 to-transparent blur-xl" />
                <div className="relative grid size-20 place-items-center rounded-2xl border border-border bg-background text-brand-ink [&_svg]:size-8">
                  {current.icon ?? (
                    <span className="text-lg font-semibold">{active + 1}</span>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
