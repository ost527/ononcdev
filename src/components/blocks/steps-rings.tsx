"use client";

import { type ReactNode, useId, useRef } from "react";
import { Copy, Download, Rocket, Wand2 } from "lucide-react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

export interface RingStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsRingsProps {
  eyebrow?: string;
  heading?: string;
  steps?: RingStep[];
  className?: string;
}

const DEFAULT_STEPS: RingStep[] = [
  {
    title: "Install",
    description: "Add Tailwind, motion, and lucide, then drop in the tokens.",
    icon: <Download className="size-5" />,
  },
  {
    title: "Copy a component",
    description: "Paste any component's source straight into your project.",
    icon: <Copy className="size-5" />,
  },
  {
    title: "Make it yours",
    description: "Retune the tokens and props to match your brand.",
    icon: <Wand2 className="size-5" />,
  },
  {
    title: "Ship it",
    description: "Build, deploy, and watch your interface come alive.",
    icon: <Rocket className="size-5" />,
  },
];

const SIZE = 76;
const STROKE = 4;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function RingNode({
  step,
  index,
  total,
  gradId,
}: {
  step: RingStep;
  index: number;
  total: number;
  gradId: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <li
      ref={ref}
      className="relative flex flex-col items-center gap-4 px-2 text-center"
    >
      {index < total - 1 && (
        <span
          aria-hidden
          className="absolute left-1/2 top-[38px] hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-brand/40 to-border lg:block"
        />
      )}
      <div
        className="relative z-10 grid place-items-center"
        style={{ width: SIZE, height: SIZE }}
      >
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--brand)" />
              <stop offset="100%" stopColor="var(--brand-2)" />
            </linearGradient>
          </defs>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--border)"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={inView ? 0 : CIRCUMFERENCE}
            style={{ transition: "stroke-dashoffset 1.1s ease-out" }}
          />
        </svg>
        <span className="absolute grid place-items-center text-brand-ink">
          {step.icon ?? <span className="text-sm font-semibold">{index + 1}</span>}
        </span>
      </div>
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ink">
          Step {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-0.5 font-semibold">{step.title}</h3>
        <p className="mx-auto mt-1 max-w-[16rem] text-sm leading-relaxed text-muted">
          {step.description}
        </p>
      </div>
    </li>
  );
}

/**
 * StepsRings — a row of steps anchored by circular progress rings that sweep
 * from empty to full when they scroll into view (instant under reduced motion).
 * The rings fold into a single centered column on small screens.
 */
export function StepsRings({
  eyebrow = "How it works",
  heading = "A guided path, ring by ring",
  steps = DEFAULT_STEPS,
  className,
}: StepsRingsProps) {
  const baseId = useId();

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
          <RingNode
            key={i}
            step={step}
            index={i}
            total={steps.length}
            gradId={`${baseId}-ring-${i}`}
          />
        ))}
      </ol>
    </section>
  );
}
