"use client";

import { type ReactNode, useRef, useState } from "react";
import { Copy, Download, Rocket, Wand2 } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface StickyStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsStickyProps {
  eyebrow?: string;
  heading?: string;
  steps?: StickyStep[];
  className?: string;
}

const DEFAULT_STEPS: StickyStep[] = [
  {
    title: "Install",
    description:
      "Create a Next.js app and add Tailwind, motion, and lucide-react. Paste in the design tokens and the whole kit themes itself from a handful of CSS variables.",
    icon: <Download className="size-5" />,
  },
  {
    title: "Copy a component",
    description:
      "Open any component's Code tab and copy its real source. There's no package to install and nothing to wire up — the code you read is the code you ship.",
    icon: <Copy className="size-5" />,
  },
  {
    title: "Make it yours",
    description:
      "Adjust the tokens and props until the motion, color, and spacing match your brand. Every value is exposed; nothing is locked behind a build step.",
    icon: <Wand2 className="size-5" />,
  },
  {
    title: "Ship it",
    description:
      "Each component is accessible and reduced-motion aware out of the box, so you can build, deploy, and trust it in production from day one.",
    icon: <Rocket className="size-5" />,
  },
];

/**
 * StepsSticky — a scroll-linked walkthrough. A sticky index on the left tracks
 * the step you're reading on the right (driven by scroll position), and each
 * index entry scrolls its panel into view on click. Reduced motion swaps smooth
 * scrolling for instant jumps and fills the rail statically.
 */
export function StepsSticky({
  eyebrow = "Walkthrough",
  heading = "Everything you need, in order",
  steps = DEFAULT_STEPS,
  className,
}: StepsStickyProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 70%"],
  });
  const railScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.max(0, Math.min(steps.length - 1, Math.floor(v * steps.length)));
    setActive(idx);
  });

  function goTo(i: number) {
    panelRefs.current[i]?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
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

      <div
        ref={containerRef}
        className="mt-12 grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-12"
      >
        {/* sticky index (desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 self-start">
            <ol className="relative space-y-1">
              <span
                aria-hidden
                className="absolute bottom-3 left-6 top-3 w-px -translate-x-1/2 bg-border"
              />
              <motion.span
                aria-hidden
                style={{ scaleY: reduced ? 1 : railScale }}
                className="absolute bottom-3 left-6 top-3 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-brand via-brand-2 to-brand-3"
              />
              {steps.map((step, i) => {
                const reached = i <= active;
                const current = i === active;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={current ? "step" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors",
                        current ? "bg-surface" : "hover:bg-surface",
                      )}
                    >
                      <span
                        className={cn(
                          "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors",
                          reached
                            ? "border-brand bg-brand text-white"
                            : "border-border bg-surface text-muted",
                        )}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors",
                          current ? "text-foreground" : "text-muted",
                        )}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* scrolling panels */}
        <ol className="space-y-6">
          {steps.map((step, i) => (
            <li
              key={i}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className={cn(
                "scroll-mt-24 rounded-2xl border bg-surface p-6 transition-colors sm:p-8",
                i === active ? "border-border-strong" : "border-border",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl border border-border bg-background text-brand-ink">
                  {step.icon ?? (
                    <span className="text-sm font-semibold">{i + 1}</span>
                  )}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
