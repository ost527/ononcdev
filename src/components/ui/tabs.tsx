"use client";

import { type KeyboardEvent, type ReactNode, useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabItem {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  className?: string;
  defaultIndex?: number;
}

/**
 * Tabs — an accessible tablist (roles, arrow-key roving focus) with a sliding
 * underline indicator shared across tabs via motion's layoutId.
 */
export function Tabs({ items, className, defaultIndex = 0 }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(defaultIndex);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (active + dir + items.length) % items.length;
      setActive(next);
      document.getElementById(`${baseId}-tab-${next}`)?.focus();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div role="tablist" aria-label="Tabs" className="flex gap-1 border-b border-border">
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={i}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "relative px-4 py-2.5 text-sm font-medium transition-colors",
                selected ? "text-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
              {selected && (
                <motion.span
                  layoutId={`${baseId}-indicator`}
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          id={`${baseId}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          className="pt-4 text-sm text-muted"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
