"use client";

import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  "aria-label"?: string;
}

/**
 * RadioGroup — an accessible single-select (role="radiogroup"). One stop in the
 * tab order; ↑/↓/←/→ move and select the next enabled option (wrapping), and
 * Home/End jump to the ends. Works controlled or uncontrolled.
 */
export function RadioGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  ...aria
}: RadioGroupProps) {
  const groupId = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const selected = isControlled ? value : internal;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const enabledIndexes = options
    .map((o, i) => (o.disabled ? -1 : i))
    .filter((i) => i >= 0);

  const select = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const moveTo = (index: number) => {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    select(opt.value);
    refs.current[index]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const pos = enabledIndexes.indexOf(index);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      moveTo(enabledIndexes[(pos + 1) % enabledIndexes.length]);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      moveTo(
        enabledIndexes[(pos - 1 + enabledIndexes.length) % enabledIndexes.length],
      );
    } else if (e.key === "Home") {
      e.preventDefault();
      moveTo(enabledIndexes[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      moveTo(enabledIndexes[enabledIndexes.length - 1]);
    }
  };

  // The roving tabindex lands on the selected option, else the first enabled one.
  const tabStop = options.findIndex((o) => o.value === selected && !o.disabled);
  const fallbackStop = enabledIndexes[0] ?? -1;

  return (
    <div
      role="radiogroup"
      aria-label={aria["aria-label"]}
      className={cn("space-y-2", className)}
    >
      {options.map((option, i) => {
        const isChecked = option.value === selected;
        const isTabStop = i === (tabStop >= 0 ? tabStop : fallbackStop);
        const descId = `${groupId}-${i}-desc`;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isChecked}
            aria-label={typeof option.label === "string" ? option.label : undefined}
            aria-describedby={option.description ? descId : undefined}
            disabled={option.disabled}
            tabIndex={isTabStop ? 0 : -1}
            onClick={() => !option.disabled && select(option.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl border p-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/50 disabled:cursor-not-allowed disabled:opacity-50",
              isChecked
                ? "border-brand bg-brand/10"
                : "border-border bg-surface hover:border-border-strong",
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                isChecked ? "border-brand" : "border-border-strong",
              )}
            >
              <motion.span
                initial={false}
                animate={{ scale: isChecked ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 520, damping: 30 }}
                className="size-2.5 rounded-full bg-brand"
              />
            </span>
            <span className="space-y-0.5">
              <span className="block text-sm font-medium text-foreground">
                {option.label}
              </span>
              {option.description && (
                <span id={descId} className="block text-xs text-muted">
                  {option.description}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
