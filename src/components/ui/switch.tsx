"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

/**
 * Switch — an accessible toggle (role="switch", aria-checked). Works controlled
 * or uncontrolled; the thumb slides with a spring.
 */
export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
  className,
}: SwitchProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "inline-flex h-6 w-11 items-center rounded-full border border-border p-0.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        on ? "bg-brand" : "bg-surface",
        className,
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn(
          "size-4 rounded-full bg-white shadow-sm",
          on ? "ml-auto" : "ml-0",
        )}
      />
    </button>
  );
}
