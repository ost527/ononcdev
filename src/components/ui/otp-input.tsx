"use client";

import { type ClipboardEvent, type KeyboardEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  className?: string;
}

/**
 * OTPInput — a segmented one-time-code field. Typing auto-advances, Backspace
 * steps back, ←/→ move between cells, and pasting a code fills every cell.
 */
export function OTPInput({ length = 6, onComplete, className }: OTPInputProps) {
  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length }, () => ""),
  );
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const focusAt = (i: number) => refs.current[Math.max(0, Math.min(i, length - 1))]?.focus();

  const commit = (next: string[]) => {
    setValues(next);
    if (next.every((v) => v !== "")) onComplete?.(next.join(""));
  };

  const handleChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...values];
    next[i] = digit;
    commit(next);
    if (digit) focusAt(i + 1);
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (values[i] === "" && i > 0) {
        e.preventDefault();
        const next = [...values];
        next[i - 1] = "";
        setValues(next);
        focusAt(i - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusAt(i - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusAt(i + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!digits) return;
    const next = Array.from({ length }, (_, i) => digits[i] ?? "");
    commit(next);
    focusAt(digits.length);
  };

  return (
    <div className={cn("flex gap-2", className)} onPaste={handlePaste}>
      {values.map((value, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={value}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          className="size-12 rounded-xl border border-border bg-surface text-center text-lg font-semibold tabular-nums outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40"
        />
      ))}
    </div>
  );
}
