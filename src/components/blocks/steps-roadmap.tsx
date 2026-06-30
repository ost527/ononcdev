import { cn } from "@/lib/utils";

export interface RoadmapStep {
  /** Short phase label, e.g. "Step 01" or "Q1". */
  phase: string;
  title: string;
  description: string;
}

export interface StepsRoadmapProps {
  eyebrow?: string;
  heading?: string;
  steps?: RoadmapStep[];
  className?: string;
}

const DEFAULT_STEPS: RoadmapStep[] = [
  { phase: "Step 01", title: "Install", description: "Add Tailwind, motion, and lucide, then drop in the tokens." },
  { phase: "Step 02", title: "Copy a component", description: "Paste any component's source straight into your project." },
  { phase: "Step 03", title: "Make it yours", description: "Retune the tokens and props to match your brand." },
  { phase: "Step 04", title: "Ship it", description: "Build, deploy, and watch your interface come alive." },
];

function Card({ step }: { step: RoadmapStep }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 text-left transition-colors hover:border-border-strong">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ink">
        {step.phase}
      </span>
      <h3 className="mt-1 font-semibold">{step.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
    </div>
  );
}

function Node({ n }: { n: number }) {
  return (
    <span className="grid size-9 place-items-center rounded-full border border-brand bg-background text-xs font-semibold text-brand-ink">
      {n}
    </span>
  );
}

/**
 * StepsRoadmap — a horizontal roadmap. On desktop, milestone nodes ride a
 * central axis with cards alternating above and below; on mobile it folds into
 * a vertical rail. Pure CSS, server-safe.
 */
export function StepsRoadmap({
  eyebrow = "The roadmap",
  heading = "From install to launch",
  steps = DEFAULT_STEPS,
  className,
}: StepsRoadmapProps) {
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

      {/* desktop: horizontal axis with alternating cards */}
      <ol className="relative mt-16 hidden min-h-[24rem] md:flex">
        <span
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-brand/40 via-border to-border"
        />
        {steps.map((step, i) => {
          const up = i % 2 === 0;
          return (
            <li key={i} className="relative flex-1">
              <div
                className={cn(
                  "absolute inset-x-0 px-3",
                  up ? "bottom-1/2 mb-7" : "top-1/2 mt-7",
                )}
              >
                <Card step={step} />
              </div>
              <span
                aria-hidden
                className={cn(
                  "absolute left-1/2 h-7 w-px -translate-x-1/2 bg-border",
                  up ? "bottom-1/2" : "top-1/2",
                )}
              />
              <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <Node n={i + 1} />
              </span>
            </li>
          );
        })}
      </ol>

      {/* mobile: vertical rail */}
      <ol className="mt-10 md:hidden">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <li key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <Node n={i + 1} />
                {!isLast && (
                  <span aria-hidden className="my-1 w-px flex-1 bg-border" />
                )}
              </div>
              <div className={cn("pb-6", isLast && "pb-0")}>
                <Card step={step} />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
