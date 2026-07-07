"use client";

import { type ReactNode, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  /** Allow multiple panels open at once. */
  multiple?: boolean;
  /** Index open by default. */
  defaultIndex?: number | null;
  /**
   * Heading level wrapping each header button. WAI-ARIA recommends accordion
   * headers be headings at a level that fits the surrounding document; defaults
   * to "h3".
   */
  headingLevel?: "h2" | "h3" | "h4";
}

/**
 * Accordion — accessible disclosure list. Each header is a button wired with
 * aria-expanded/aria-controls; panels expand via a grid-rows height transition.
 */
export function Accordion({
  items,
  className,
  multiple = false,
  defaultIndex = null,
  headingLevel = "h3",
}: AccordionProps) {
  const HeadingTag = headingLevel;
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(defaultIndex != null ? [defaultIndex] : []),
  );

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={cn("divide-y divide-border rounded-2xl border border-border bg-surface", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const headerId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={i}>
            <HeadingTag>
              <button
                id={headerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors hover:text-foreground"
              >
                {item.title}
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted transition-transform duration-300",
                    isOpen && "rotate-180 text-brand-ink",
                  )}
                />
              </button>
            </HeadingTag>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              inert={!isOpen}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 text-sm text-muted">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
