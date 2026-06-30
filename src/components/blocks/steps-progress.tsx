"use client";

import { type ReactNode, useRef } from "react";
import { Check, Copy, Download, Rocket, Wand2 } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface ProgressStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsProgressProps {
  eyebrow?: string;
  heading?: string;
  steps?: ProgressStep[];
  className?: string;
}

const DEFAULT_STEPS: ProgressStep[] = [
  {
    title: "Install",
    description:
      "Spin up a Next.js app and add Tailwind, motion, and lucide-react.",
    icon: <Download className="size-5" />,
  },
  {
    title: "Copy a component",
    description:
      "Open any component's Code tab and paste the real source into your project.",
    icon: <Copy className="size-5" />,
  },
  {
    title: "Make it yours",
    description:
      "Tune the CSS variables and props until the color and motion match your brand.",
    icon: <Wand2 className="size-5" />,
  },
  {
    title: "Ship it",
    description: "Build, deploy, and watch your interface come alive.",
    icon: <Rocket className="size-5" />,
  },
];

function StepRow({
  step,
  index,
  reduced,
}: {
  step: ProgressStep;
  index: number;
  reduced: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const active = reduced || inView;

  return (
    <li ref={ref} className="relative flex gap-5 pb-12 last:pb-0">
      <span
        className={cn(
          "relative z-10 grid size-12 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-all duration-500",
          active
            ? "border-brand bg-brand text-white shadow-[0_0_0_4px_var(--ring)]"
            : "border-border bg-surface text-muted",
        )}
      >
        {active ? step.icon ?? <Check className="size-5" /> : index + 1}
      </span>
      <div
        className={cn(
          "pt-1 transition-opacity duration-500",
          active ? "opacity-100" : "opacity-60",
        )}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
          Step {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {step.description}
        </p>
      </div>
    </li>
  );
}

/**
 * StepsProgress — a vertical timeline whose gradient rail fills as the section
 * scrolls through the viewport, while each node lights up (and swaps to a
 * check) once it comes into view. Under reduced-motion the rail is fully drawn
 * and every step reads as complete.
 */
export function StepsProgress({
  eyebrow = "Your journey",
  heading = "Follow the path, step by step",
  steps = DEFAULT_STEPS,
  className,
}: StepsProgressProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

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

      <ol ref={ref} className="relative mt-12">
        {/* static track */}
        <span
          aria-hidden
          className="absolute bottom-6 left-6 top-6 w-0.5 -translate-x-1/2 rounded bg-border"
        />
        {/* scroll-driven fill */}
        <motion.span
          aria-hidden
          style={{ scaleY: reduced ? 1 : scaleY }}
          className="absolute bottom-6 left-6 top-6 w-0.5 -translate-x-1/2 origin-top rounded bg-gradient-to-b from-brand via-brand-2 to-brand-3"
        />
        {steps.map((step, i) => (
          <StepRow key={i} step={step} index={i} reduced={!!reduced} />
        ))}
      </ol>
    </section>
  );
}
