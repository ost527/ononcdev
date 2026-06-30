"use client";

import { type ReactNode, useId, useState } from "react";
import {
  Check,
  ChevronDown,
  Gauge,
  Layers,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionFeature {
  title: string;
  /** One-line summary shown under the title even when collapsed. */
  teaser?: string;
  description: string;
  points?: string[];
  icon?: ReactNode;
}

export interface FeatureAccordionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: AccordionFeature[];
  /** Index expanded by default (use -1 for all collapsed). */
  defaultIndex?: number;
  className?: string;
}

const DEFAULT_FEATURES: AccordionFeature[] = [
  {
    title: "Motion, built in",
    teaser: "Spring-based transitions that feel native.",
    description:
      "Every interaction is interruptible and physically grounded — drags hand off to inertia, panels settle with a spring, and nothing janks mid-flight.",
    points: ["Interruptible springs", "Reduced-motion aware", "60fps transforms"],
    icon: <Sparkles className="size-5" />,
  },
  {
    title: "Effortless performance",
    teaser: "GPU-friendly and idle when off-screen.",
    description:
      "Animations pause when scrolled out of view or the tab is hidden, transforms stay on the compositor, and device pixel ratio is capped to protect battery.",
    points: ["Off-screen pausing", "DPR-capped canvases", "No layout thrash"],
    icon: <Gauge className="size-5" />,
  },
  {
    title: "Accessible by default",
    teaser: "Keyboard, ARIA, and focus handled for you.",
    description:
      "Interactive components ship with full keyboard paths, correct roles and state, and visible focus — accessibility is the default, not an add-on.",
    points: ["Full keyboard nav", "Correct ARIA roles", "Visible focus rings"],
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: "Composable primitives",
    teaser: "Snap small parts into bespoke sections.",
    description:
      "Each block is built from the same small set of primitives, so you can recombine them into your own layouts without fighting the system.",
    points: ["Tokenized theming", "Zero lock-in", "Copy-paste friendly"],
    icon: <Layers className="size-5" />,
  },
  {
    title: "Automate the busywork",
    teaser: "Wire steps once and let them run.",
    description:
      "Compose triggers, conditions, and actions into flows that carry the routine work from start to finish — reliably and on their own schedule.",
    points: ["Visual flow builder", "Replayable runs", "Native connectors"],
    icon: <Workflow className="size-5" />,
  },
];

/**
 * FeatureAccordion — an icon-led disclosure accordion. One feature is open at a
 * time and expands inline (distinct from the side-panel Feature Tabs). Headers
 * are buttons wired with aria-expanded/aria-controls; panels use a grid-rows
 * height transition and `inert` so collapsed content leaves the tab/AT tree.
 * Reduced motion is handled by the global stylesheet (it neutralizes the CSS
 * transition).
 */
export function FeatureAccordion({
  eyebrow = "How it works",
  heading = "Depth where you want it",
  subheading = "Open any capability to go deeper — the rest stay tucked away.",
  features = DEFAULT_FEATURES,
  defaultIndex = 0,
  className,
}: FeatureAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(defaultIndex);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? -1 : i));

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

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {features.map((f, i) => {
          const isOpen = i === openIndex;
          const headerId = `${baseId}-h-${i}`;
          const panelId = `${baseId}-p-${i}`;
          return (
            <div
              key={i}
              className={cn(
                "overflow-hidden rounded-2xl border bg-surface transition-colors",
                isOpen ? "border-brand/40" : "border-border",
              )}
            >
              <h3>
                <button
                  id={headerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-xl border border-border transition-colors",
                      isOpen
                        ? "bg-gradient-to-br from-brand/15 to-brand-2/10 text-brand-2"
                        : "bg-background text-brand-ink",
                    )}
                  >
                    {f.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{f.title}</span>
                    {f.teaser && (
                      <span className="mt-0.5 block truncate text-sm text-muted">
                        {f.teaser}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-muted transition-transform duration-300",
                      isOpen && "rotate-180 text-brand-ink",
                    )}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                inert={!isOpen}
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pl-20">
                    <p className="text-sm leading-relaxed text-muted">
                      {f.description}
                    </p>
                    {f.points && f.points.length > 0 && (
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {f.points.map((p, j) => (
                          <li
                            key={j}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-2">
                              <Check className="size-3.5" />
                            </span>
                            <span className="text-foreground/90">{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
