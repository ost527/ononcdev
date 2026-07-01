"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarProps {
  mode?: "single" | "range";
  defaultMonth?: Date;
  onSelect?: (date: Date) => void;
  onRangeChange?: (range: DateRange) => void;
  className?: string;
  "aria-label"?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEKDAYS_FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const longFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
const monthFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => {
  const target = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(d.getDate(), last));
  return target;
};
const clampToMonth = (day: number, view: Date) => {
  const last = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  return new Date(view.getFullYear(), view.getMonth(), Math.min(day, last));
};
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const monthGrid = (view: Date) => {
  const first = startOfMonth(view);
  const start = addDays(first, -first.getDay());
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
};

/**
 * Calendar — an inline month grid for single or range selection. Follows the
 * WAI-ARIA grid pattern (grid → row → gridcell): ←/→ a day, ↑/↓ a week, Home/End
 * the week edges, PageUp/PageDown a month, Enter/Space selects. In range mode the
 * second click sets the end (auto-ordered) and hovering previews the range.
 */
export function Calendar({
  mode = "single",
  defaultMonth,
  onSelect,
  onRangeChange,
  className,
  ...aria
}: CalendarProps) {
  const labelId = useId();
  const dayRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const shouldFocus = useRef(false);

  const [view, setView] = useState(() => startOfMonth(defaultMonth ?? new Date()));
  const [focused, setFocused] = useState(() => defaultMonth ?? new Date());
  const [selected, setSelected] = useState<Date | null>(null);
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [hovered, setHovered] = useState<Date | null>(null);

  const today = new Date();

  // Only move DOM focus in response to keyboard navigation (never on mount or
  // when paging with the mouse).
  useEffect(() => {
    if (shouldFocus.current) {
      dayRefs.current.get(key(focused))?.focus();
      shouldFocus.current = false;
    }
  }, [focused, view]);

  const moveFocus = (next: Date) => {
    shouldFocus.current = true;
    setFocused(next);
    if (
      next.getMonth() !== view.getMonth() ||
      next.getFullYear() !== view.getFullYear()
    ) {
      setView(startOfMonth(next));
    }
  };

  // Paging keeps the focused day within the visible month so the grid always has
  // a tab stop, but does not steal focus from the clicked button.
  const pageMonth = (delta: number) => {
    const v = addMonths(view, delta);
    setView(v);
    setFocused(clampToMonth(focused.getDate(), v));
  };

  const selectDay = (day: Date) => {
    setFocused(day);
    if (mode === "single") {
      setSelected(day);
      onSelect?.(day);
      return;
    }
    if (!range.start || range.end) {
      const next = { start: day, end: null };
      setRange(next);
      setHovered(null);
      onRangeChange?.(next);
    } else {
      let start = range.start;
      let end = day;
      if (day.getTime() < range.start.getTime()) {
        start = day;
        end = range.start;
      }
      const next = { start, end };
      setRange(next);
      setHovered(null);
      onRangeChange?.(next);
    }
  };

  const onGridKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        moveFocus(addDays(focused, -1));
        break;
      case "ArrowRight":
        e.preventDefault();
        moveFocus(addDays(focused, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus(addDays(focused, -7));
        break;
      case "ArrowDown":
        e.preventDefault();
        moveFocus(addDays(focused, 7));
        break;
      case "Home":
        e.preventDefault();
        moveFocus(addDays(focused, -focused.getDay()));
        break;
      case "End":
        e.preventDefault();
        moveFocus(addDays(focused, 6 - focused.getDay()));
        break;
      case "PageUp":
        e.preventDefault();
        moveFocus(addMonths(focused, -1));
        break;
      case "PageDown":
        e.preventDefault();
        moveFocus(addMonths(focused, 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectDay(focused);
        break;
    }
  };

  const previewEnd = range.end ?? hovered;
  const inRange = (day: Date) => {
    if (mode !== "range" || !range.start || !previewEnd) return false;
    const lo = Math.min(range.start.getTime(), previewEnd.getTime());
    const hi = Math.max(range.start.getTime(), previewEnd.getTime());
    const t = day.getTime();
    return t > lo && t < hi;
  };
  const isEndpoint = (day: Date) =>
    mode === "single"
      ? !!selected && sameDay(day, selected)
      : (!!range.start && sameDay(day, range.start)) ||
        (!!range.end && sameDay(day, range.end));

  const days = monthGrid(view);
  const weeks = Array.from({ length: 6 }, (_, w) => days.slice(w * 7, w * 7 + 7));

  return (
    <div
      role="group"
      aria-label={aria["aria-label"] ?? "Calendar"}
      className={cn(
        "w-72 rounded-xl border border-border bg-surface p-3",
        className,
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => pageMonth(-1)}
          className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span id={labelId} aria-live="polite" className="text-sm font-semibold">
          {monthFmt.format(view)}
        </span>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => pageMonth(1)}
          className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div
        role="grid"
        aria-labelledby={labelId}
        onKeyDown={onGridKeyDown}
        onMouseLeave={() => setHovered(null)}
      >
        <div role="row" className="mb-1 grid grid-cols-7">
          {WEEKDAYS.map((w, i) => (
            <span
              key={w}
              role="columnheader"
              aria-label={WEEKDAYS_FULL[i]}
              className="grid h-8 place-items-center text-xs font-medium text-muted-2"
            >
              {w}
            </span>
          ))}
        </div>
        <div role="rowgroup" className="space-y-0.5">
          {weeks.map((week, wi) => (
            <div role="row" key={wi} className="grid grid-cols-7">
              {week.map((day) => {
                const inMonth = day.getMonth() === view.getMonth();
                const endpoint = isEndpoint(day);
                const middle = inRange(day);
                const isToday = sameDay(day, today);
                const isFocusable = sameDay(day, focused);
                return (
                  <div
                    role="gridcell"
                    aria-selected={endpoint}
                    key={key(day)}
                    className={cn(
                      middle && "bg-brand/15",
                      "first:rounded-l-lg last:rounded-r-lg",
                    )}
                  >
                    <button
                      ref={(el) => {
                        if (el) dayRefs.current.set(key(day), el);
                        else dayRefs.current.delete(key(day));
                      }}
                      type="button"
                      tabIndex={isFocusable ? 0 : -1}
                      aria-current={isToday ? "date" : undefined}
                      aria-label={longFmt.format(day)}
                      onClick={() => selectDay(day)}
                      onMouseEnter={() => {
                        if (mode === "range" && range.start && !range.end) {
                          setHovered(day);
                        }
                      }}
                      className={cn(
                        "grid size-9 w-full place-items-center rounded-lg text-sm tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/50",
                        !inMonth && "text-muted-2",
                        inMonth && !endpoint && !middle && "text-foreground hover:bg-background",
                        middle && !endpoint && "text-foreground",
                        endpoint && "bg-brand font-semibold text-white",
                        !endpoint && isToday && "ring-1 ring-inset ring-border-strong",
                      )}
                    >
                      {day.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
