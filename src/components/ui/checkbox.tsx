"use client";

import { type ReactNode, useId, useState } from "react";
import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  /** Renders the mixed (–) state; reports aria-checked="mixed". */
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
}

/**
 * Checkbox — an accessible tri-state checkbox (role="checkbox", aria-checked).
 * Works controlled or uncontrolled; the check springs in. The visible label
 * becomes the accessible name, and an optional description is wired via
 * aria-describedby.
 */
export function Checkbox({
  checked,
  defaultChecked = false,
  indeterminate = false,
  onCheckedChange,
  disabled = false,
  label,
  description,
  className,
}: CheckboxProps) {
  const descId = useId();
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const marked = on || indeterminate;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : on}
      aria-label={typeof label === "string" ? label : undefined}
      aria-describedby={description ? descId : undefined}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "group inline-flex items-start gap-2.5 text-left outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors group-focus-visible:ring-2 group-focus-visible:ring-brand/50 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
          marked
            ? "border-brand bg-brand text-white"
            : "border-border-strong bg-surface",
        )}
      >
        <motion.span
          initial={false}
          animate={{ scale: marked ? 1 : 0, opacity: marked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 520, damping: 30 }}
          className="grid place-items-center"
        >
          {indeterminate ? (
            <Minus className="size-3.5" strokeWidth={3} />
          ) : (
            <Check className="size-3.5" strokeWidth={3} />
          )}
        </motion.span>
      </span>
      {(label || description) && (
        <span className="space-y-0.5">
          {label && (
            <span className="block text-sm font-medium text-foreground">
              {label}
            </span>
          )}
          {description && (
            <span id={descId} className="block text-xs text-muted">
              {description}
            </span>
          )}
        </span>
      )}
    </button>
  );
}
