"use client";

import { type KeyboardEvent, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingProps {
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
}

/**
 * Rating — a star rating exposed as a slider. Hover previews, click sets, and
 * ←/→ (Home/End) adjust the value for keyboard users.
 */
export function Rating({
  max = 5,
  defaultValue = 0,
  onChange,
  className,
}: RatingProps) {
  const [value, setValue] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? value;

  const set = (v: number) => {
    const clamped = Math.max(0, Math.min(max, v));
    setValue(clamped);
    onChange?.(clamped);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      set(value + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      set(value - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      set(0);
    } else if (e.key === "End") {
      e.preventDefault();
      set(max);
    }
  };

  return (
    <div
      role="slider"
      aria-label="Rating"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseLeave={() => setHover(null)}
      className={cn(
        "inline-flex gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
        className,
      )}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < shown;
        return (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            aria-hidden
            onMouseEnter={() => setHover(i + 1)}
            onClick={() => set(i + 1)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={cn(
                "size-6 transition-colors",
                filled
                  ? "fill-brand-3 text-brand-3"
                  : "fill-transparent text-muted-2",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
