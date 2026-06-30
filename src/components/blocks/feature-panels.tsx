"use client";

import { type ReactNode, useId, useState } from "react";
import { BarChart3, Globe, Lock, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PanelFeature {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface FeaturePanelsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: PanelFeature[];
  /** Index expanded by default. */
  defaultIndex?: number;
  className?: string;
}

const DEFAULT_FEATURES: PanelFeature[] = [
  {
    title: "Insights",
    description:
      "Live dashboards that turn raw events into decisions — trends, anomalies, and milestones surface on their own.",
    icon: <BarChart3 className="size-5" />,
  },
  {
    title: "Automation",
    description:
      "Compose triggers, conditions, and actions into flows that run themselves around the clock.",
    icon: <Workflow className="size-5" />,
  },
  {
    title: "Security",
    description:
      "Scoped roles, SSO, and a tamper-proof audit log keep every action accountable and reversible.",
    icon: <Lock className="size-5" />,
  },
  {
    title: "Global scale",
    description:
      "Served from the edge nearest each visitor, holding steady from your first user to your millionth.",
    icon: <Globe className="size-5" />,
  },
];

/**
 * FeaturePanels — a row of panels where the active one expands to reveal its
 * copy while the others collapse to a sliver (an "image-accordion" pattern). On
 * large screens the panels grow/shrink with flex; below `lg` they stack into a
 * simple list with all copy visible. Each panel is driven by an overlay button
 * (hover, focus, or click activates it) wired with aria-expanded/controls; the
 * flex transition is neutralized for reduced-motion users by the global styles.
 */
export function FeaturePanels({
  eyebrow = "Explore",
  heading = "One product, many angles",
  subheading = "Hover, focus, or tap a panel to open it.",
  features = DEFAULT_FEATURES,
  defaultIndex = 0,
  className,
}: FeaturePanelsProps) {
  const baseId = useId();
  const [active, setActive] = useState(defaultIndex);

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-2">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-muted">{subheading}</p>
      </div>

      <div className="mt-10 flex flex-col gap-3 lg:h-80 lg:flex-row">
        {features.map((f, i) => {
          const isActive = i === active;
          const titleId = `${baseId}-t-${i}`;
          const descId = `${baseId}-d-${i}`;
          return (
            <div
              key={i}
              className={cn(
                "group relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-[var(--ring)]",
                isActive
                  ? "border-brand/40 lg:flex-[3.2]"
                  : "border-border lg:flex-[1]",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/12 to-brand-2/5 opacity-0 transition-opacity duration-500",
                  isActive && "opacity-100",
                )}
              />
              <button
                type="button"
                aria-labelledby={titleId}
                aria-expanded={isActive}
                aria-controls={descId}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="absolute inset-0 z-10 cursor-pointer focus:outline-none"
              />
              <div className="relative flex h-full min-h-[13rem] flex-col justify-end gap-3 p-6 lg:min-h-0">
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl border border-border transition-colors duration-300",
                    isActive
                      ? "bg-gradient-to-br from-brand/15 to-brand-2/10 text-brand-2"
                      : "bg-background/70 text-brand-ink",
                  )}
                >
                  {f.icon}
                </span>
                <div className="w-full lg:w-80">
                  <h3
                    id={titleId}
                    className="truncate text-lg font-semibold lg:whitespace-nowrap"
                  >
                    {f.title}
                  </h3>
                  <p
                    id={descId}
                    className={cn(
                      "mt-1.5 text-sm leading-relaxed text-muted transition-opacity duration-300 max-lg:opacity-100",
                      isActive ? "lg:opacity-100" : "lg:opacity-0",
                    )}
                  >
                    {f.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
