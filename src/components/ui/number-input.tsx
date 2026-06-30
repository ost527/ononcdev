"use client";

import { type KeyboardEvent, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

const decimalsOf = (step: number) => (step.toString().split(".")[1]?.length ?? 0);

/**
 * NumberInput — an accessible numeric stepper (role="spinbutton"). The −/+
 * buttons and ↑/↓ adjust by step, PageUp/PageDown by ten steps, Home/End jump
 * to the bounds, and every value is clamped to [min, max]. Controlled or
 * uncontrolled.
 */
export function NumberInput({
  value,
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onValueChange,
  disabled = false,
  className,
  ...aria
}: NumberInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;
  const [draft, setDraft] = useState<string | null>(null);

  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const round = (n: number) => {
    const d = decimalsOf(step);
    return d > 0 ? Number(n.toFixed(d)) : n;
  };

  const commit = (n: number) => {
    if (Number.isNaN(n)) return;
    const next = round(clamp(n));
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
    return next;
  };

  const nudge = (delta: number) => {
    setDraft(null);
    commit(current + delta);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      nudge(step);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      nudge(-step);
    } else if (e.key === "PageUp") {
      e.preventDefault();
      nudge(step * 10);
    } else if (e.key === "PageDown") {
      e.preventDefault();
      nudge(-step * 10);
    } else if (e.key === "Home" && Number.isFinite(min)) {
      e.preventDefault();
      setDraft(null);
      commit(min);
    } else if (e.key === "End" && Number.isFinite(max)) {
      e.preventDefault();
      setDraft(null);
      commit(max);
    }
  };

  const btn =
    "grid size-9 shrink-0 place-items-center text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-surface focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/40",
        disabled && "opacity-50",
        className,
      )}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        disabled={disabled || current <= min}
        onClick={() => nudge(-step)}
        className={cn(btn, "rounded-l-lg")}
      >
        <Minus className="size-4" />
      </button>
      <input
        type="text"
        inputMode="decimal"
        role="spinbutton"
        aria-label={aria["aria-label"]}
        aria-valuenow={current}
        aria-valuemin={Number.isFinite(min) ? min : undefined}
        aria-valuemax={Number.isFinite(max) ? max : undefined}
        disabled={disabled}
        value={draft ?? String(current)}
        onChange={(e) => {
          const raw = e.target.value;
          setDraft(raw);
          const parsed = Number(raw);
          if (raw.trim() !== "" && !Number.isNaN(parsed)) commit(parsed);
        }}
        onKeyDown={onKeyDown}
        onBlur={() => {
          if (draft !== null) {
            const parsed = Number(draft);
            commit(Number.isNaN(parsed) ? current : parsed);
          }
          setDraft(null);
        }}
        className="w-14 border-x border-border bg-transparent py-2 text-center text-sm tabular-nums outline-none"
      />
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        disabled={disabled || current >= max}
        onClick={() => nudge(step)}
        className={cn(btn, "rounded-r-lg")}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
