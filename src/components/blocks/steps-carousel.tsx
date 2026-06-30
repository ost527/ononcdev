"use client";

import { type KeyboardEvent, type ReactNode, useState } from "react";
import { ArrowLeft, ArrowRight, Copy, Download, Rocket, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsCarouselProps {
  eyebrow?: string;
  heading?: string;
  steps?: CarouselStep[];
  className?: string;
}

const DEFAULT_STEPS: CarouselStep[] = [
  {
    title: "Install",
    description:
      "Create a Next.js app and add Tailwind, motion, and lucide-react, then paste in the design tokens to theme the whole kit at once.",
    icon: <Download className="size-6" />,
  },
  {
    title: "Copy a component",
    description:
      "Open any component's Code tab and copy its real source straight into your project — no package, no lock-in.",
    icon: <Copy className="size-6" />,
  },
  {
    title: "Make it yours",
    description:
      "Tune the CSS variables and props until the motion, color, and spacing feel unmistakably like your brand.",
    icon: <Wand2 className="size-6" />,
  },
  {
    title: "Ship it",
    description:
      "Accessible and reduced-motion aware by default, so you can build, deploy, and trust it in production.",
    icon: <Rocket className="size-6" />,
  },
];

/**
 * StepsCarousel — a guided, one-at-a-time walkthrough. A translateX track moves
 * between steps with a top progress bar and an "01 / 04" counter; Prev/Next are
 * bounded (no looping) and the region supports arrow-key navigation.
 */
export function StepsCarousel({
  eyebrow = "Walkthrough",
  heading = "Step through it one at a time",
  steps = DEFAULT_STEPS,
  className,
}: StepsCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = steps.length;
  const go = (i: number) => setIndex(Math.max(0, Math.min(count - 1, i)));

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  if (count === 0) return null;

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
        role="region"
        aria-roledescription="carousel"
        aria-label={heading}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <div className="h-1 w-full bg-surface-2">
          <div
            className="h-full bg-gradient-to-r from-brand to-brand-2 transition-[width] duration-500 ease-out"
            style={{ width: `${((index + 1) / count) * 100}%` }}
          />
        </div>

        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Step ${i + 1} of ${count}`}
              aria-hidden={i !== index}
              className="min-w-full p-6 sm:p-10"
            >
              <span className="grid size-12 place-items-center rounded-2xl border border-border bg-background text-brand-ink">
                {step.icon ?? <span className="text-lg font-semibold">{i + 1}</span>}
              </span>
              <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border p-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous step"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-background disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="size-4" />
            Prev
          </button>
          <span className="text-xs font-semibold tabular-nums tracking-[0.18em] text-muted">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === count - 1}
            aria-label="Next step"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-background disabled:pointer-events-none disabled:opacity-40"
          >
            Next
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
