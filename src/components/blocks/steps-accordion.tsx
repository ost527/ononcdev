"use client";

import { type ReactNode, useId, useState } from "react";
import { Copy, Download, Plus, Rocket, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface StepsAccordionProps {
  eyebrow?: string;
  heading?: string;
  steps?: AccordionStep[];
  className?: string;
}

const DEFAULT_STEPS: AccordionStep[] = [
  {
    title: "Install",
    description:
      "Spin up a Next.js app and add Tailwind, motion, and lucide-react. Drop in the design tokens and the kit themes itself from a few CSS variables.",
    icon: <Download className="size-5" />,
  },
  {
    title: "Copy a component",
    description:
      "Open any component's Code tab and paste its real source into your project. There's no package to install — the code you read is the code you ship.",
    icon: <Copy className="size-5" />,
  },
  {
    title: "Make it yours",
    description:
      "Adjust the CSS variables and props until the motion, color, and spacing match your brand. Every value is exposed and editable.",
    icon: <Wand2 className="size-5" />,
  },
  {
    title: "Ship it",
    description:
      "Each component is accessible and reduced-motion aware out of the box, so it's production-ready the moment you deploy.",
    icon: <Rocket className="size-5" />,
  },
];

/**
 * StepsAccordion — a sequence of expandable steps. One step is open at a time;
 * each header is a proper disclosure button (aria-expanded/aria-controls) and
 * the body expands via a grid-rows height transition, with the collapsed region
 * marked inert. The toggle glyph rotates from + to ×.
 */
export function StepsAccordion({
  eyebrow = "How it works",
  heading = "Open each step to dig in",
  steps = DEFAULT_STEPS,
  className,
}: StepsAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

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

      <ol className="mt-10 space-y-3">
        {steps.map((step, i) => {
          const isOpen = i === open;
          const headerId = `${baseId}-h-${i}`;
          const panelId = `${baseId}-p-${i}`;
          return (
            <li
              key={i}
              className={cn(
                "overflow-hidden rounded-2xl border transition-colors",
                isOpen ? "border-border-strong bg-surface" : "border-border",
              )}
            >
              <h3>
                <button
                  id={headerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors",
                      isOpen
                        ? "border-brand bg-brand text-white"
                        : "border-border bg-surface text-brand-ink",
                    )}
                  >
                    {step.icon ?? <span>{i + 1}</span>}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ink">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block font-semibold">{step.title}</span>
                  </span>
                  <Plus
                    aria-hidden
                    className={cn(
                      "size-5 shrink-0 text-muted transition-transform duration-300",
                      isOpen && "rotate-45 text-brand-ink",
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
                  <p className="px-4 pb-5 pl-[4.5rem] text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
