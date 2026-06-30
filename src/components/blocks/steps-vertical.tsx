import type { ReactNode } from "react";
import { Copy, Download, Rocket, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VerticalStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsVerticalProps {
  eyebrow?: string;
  heading?: string;
  steps?: VerticalStep[];
  className?: string;
}

const DEFAULT_STEPS: VerticalStep[] = [
  {
    title: "Install",
    description:
      "Spin up a Next.js app and add Tailwind, motion, and lucide-react, then drop in the design tokens.",
    icon: <Download className="size-5" />,
  },
  {
    title: "Copy a component",
    description:
      "Open any component's Code tab and paste its real source straight into your project — no package, no lock-in.",
    icon: <Copy className="size-5" />,
  },
  {
    title: "Make it yours",
    description:
      "Tune the CSS variables and component props until the color, motion, and spacing match your brand.",
    icon: <Wand2 className="size-5" />,
  },
  {
    title: "Ship it",
    description:
      "Everything is accessible and reduced-motion aware out of the box. Build, deploy, and launch.",
    icon: <Rocket className="size-5" />,
  },
];

/**
 * StepsVertical — a vertical "flow" of steps connected by a gradient rail.
 * Rounded-square icon nodes anchor each row, with an index eyebrow, title, and
 * description. Self-contained connectors keep the rail aligned at any length.
 */
export function StepsVertical({
  eyebrow = "Getting started",
  heading = "A clear path from idea to launch",
  steps = DEFAULT_STEPS,
  className,
}: StepsVerticalProps) {
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

      <ol className="mt-12">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <li key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-border bg-surface text-brand-ink shadow-sm">
                  {step.icon ?? (
                    <span className="text-sm font-semibold">{i + 1}</span>
                  )}
                </span>
                {!isLast && (
                  <span
                    aria-hidden
                    className="my-2 w-px flex-1 bg-gradient-to-b from-brand/50 via-border to-border"
                  />
                )}
              </div>
              <div className={cn("pb-10", isLast && "pb-0")}>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
