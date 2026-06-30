"use client";

import { type KeyboardEvent, useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SegmentedControlProps {
  options: string[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/**
 * SegmentedControl — single-select control with a pill that slides to the
 * active option (motion layoutId). Exposed as a radiogroup with arrow keys.
 */
export function SegmentedControl({
  options,
  defaultValue,
  value,
  onValueChange,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SegmentedControlProps) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue ?? options[0]);
  const selected = value ?? internal;

  const select = (option: string) => {
    if (value === undefined) setInternal(option);
    onValueChange?.(option);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const idx = options.indexOf(selected);
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (idx + dir + options.length) % options.length;
    select(options[nextIndex]);
    document.getElementById(`${baseId}-${nextIndex}`)?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex gap-1 rounded-full border border-border bg-surface p-1",
        className,
      )}
    >
      {options.map((option, i) => {
        const isSelected = option === selected;
        return (
          <button
            key={option}
            id={`${baseId}-${i}`}
            role="radio"
            type="button"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => select(option)}
            className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
          >
            {isSelected && (
              <motion.span
                layoutId={`${baseId}-pill`}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 -z-10 rounded-full bg-brand"
              />
            )}
            <span className={isSelected ? "text-white" : "text-muted"}>
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}
