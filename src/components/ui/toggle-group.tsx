"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

export interface ToggleOption {
  value: string;
  label: ReactNode;
}

export interface ToggleGroupProps {
  options: ToggleOption[];
  type?: "single" | "multiple";
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
}

/**
 * ToggleGroup — a row of toggle buttons supporting single or multiple
 * selection. Each button reflects state via aria-pressed inside a group.
 */
export function ToggleGroup({
  options,
  type = "single",
  defaultValue = [],
  onChange,
  className,
}: ToggleGroupProps) {
  const [value, setValue] = useState<Set<string>>(() => new Set(defaultValue));

  const toggle = (v: string) => {
    setValue((prev) => {
      let next: Set<string>;
      if (type === "single") {
        next = prev.has(v) ? new Set() : new Set([v]);
      } else {
        next = new Set(prev);
        if (next.has(v)) next.delete(v);
        else next.add(v);
      }
      onChange?.([...next]);
      return next;
    });
  };

  return (
    <div
      role="group"
      className={cn(
        "inline-flex gap-1 rounded-xl border border-border bg-surface p-1",
        className,
      )}
    >
      {options.map((option) => {
        const pressed = value.has(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => toggle(option.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              pressed
                ? "bg-brand text-white"
                : "text-muted hover:bg-background hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
