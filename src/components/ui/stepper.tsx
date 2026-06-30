import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperProps {
  steps: string[];
  /** Zero-based index of the current step. */
  current: number;
  className?: string;
}

/**
 * Stepper — a horizontal progress indicator. Completed steps show a check,
 * the current step is highlighted, and a filled bar tracks progress.
 */
export function Stepper({ steps, current, className }: StepperProps) {
  const pct = steps.length > 1 ? (current / (steps.length - 1)) * 100 : 0;

  return (
    <div className={cn("w-full", className)}>
      <ol className="relative flex items-center justify-between">
        <span
          aria-hidden
          className="absolute left-0 right-0 top-4 h-0.5 -translate-y-1/2 bg-border"
        />
        <span
          aria-hidden
          className="absolute left-0 top-4 h-0.5 -translate-y-1/2 bg-brand transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
        {steps.map((step, i) => {
          const done = i < current;
          const activeStep = i === current;
          return (
            <li
              key={step}
              className="relative z-10 flex flex-col items-center gap-2"
              aria-current={activeStep ? "step" : undefined}
            >
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-full border text-sm font-semibold transition-colors",
                  done && "border-brand bg-brand text-white",
                  activeStep && "border-brand bg-background text-brand-ink",
                  !done && !activeStep && "border-border bg-surface text-muted",
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-xs",
                  activeStep ? "font-medium text-foreground" : "text-muted",
                )}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
