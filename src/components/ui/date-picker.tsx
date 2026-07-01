"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
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
const triggerFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
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
 * DatePicker — a calendar in a popover. The grid follows the WAI-ARIA pattern
 * (grid → row → gridcell): ←/→ move by a day, ↑/↓ by a week, Home/End to the
 * week edges, PageUp/PageDown by a month, Enter/Space selects, Escape closes.
 * Only the focused day is in the tab order. Closes on outside click and restores
 * focus to the trigger.
 */
export function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = "Pick a date",
  className,
  ...aria
}: DatePickerProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dayRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const shouldFocus = useRef(false);

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<Date | undefined>(defaultValue);
  const selected = isControlled ? value : internal;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => startOfMonth(selected ?? new Date()));
  const [focused, setFocused] = useState(() => selected ?? new Date());

  const today = new Date();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Move focus to the focused day only on open and keyboard navigation — never
  // on mouse paging (which keeps focus on the Prev/Next button).
  useEffect(() => {
    if (open && shouldFocus.current) {
      dayRefs.current.get(key(focused))?.focus();
      shouldFocus.current = false;
    }
  }, [open, focused, view]);

  const openCalendar = () => {
    const base = selected ?? new Date();
    setView(startOfMonth(base));
    setFocused(base);
    shouldFocus.current = true;
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

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

  // Paging keeps a focusable day in the visible month (preserving the tab stop)
  // without moving focus off the clicked button.
  const pageMonth = (delta: number) => {
    const v = addMonths(view, delta);
    setView(v);
    setFocused(clampToMonth(focused.getDate(), v));
  };

  const choose = (date: Date) => {
    if (!isControlled) setInternal(date);
    onChange?.(date);
    setOpen(false);
    triggerRef.current?.focus();
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
        choose(focused);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  const days = monthGrid(view);
  const weeks = Array.from({ length: 6 }, (_, w) => days.slice(w * 7, w * 7 + 7));
  const labelId = `${id}-month`;

  return (
    <div ref={rootRef} className={cn("relative w-64", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={aria["aria-label"]}
        onClick={() => (open ? setOpen(false) : openCalendar())}
        className="flex w-full items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        <Calendar className="size-4 shrink-0 text-muted" />
        <span className={cn(!selected && "text-muted")}>
          {selected ? triggerFmt.format(selected) : placeholder}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Choose date"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                close();
              }
            }}
            className="absolute z-50 mt-2 w-72 rounded-xl border border-border bg-surface p-3 shadow-xl"
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
            <div role="grid" aria-labelledby={labelId} onKeyDown={onGridKeyDown}>
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
                  <div role="row" key={wi} className="grid grid-cols-7 gap-0.5">
                    {week.map((day) => {
                      const inMonth = day.getMonth() === view.getMonth();
                      const isSelected = selected ? sameDay(day, selected) : false;
                      const isToday = sameDay(day, today);
                      const isFocusable = sameDay(day, focused);
                      return (
                        <div role="gridcell" aria-selected={isSelected} key={key(day)}>
                          <button
                            ref={(el) => {
                              if (el) dayRefs.current.set(key(day), el);
                              else dayRefs.current.delete(key(day));
                            }}
                            type="button"
                            tabIndex={isFocusable ? 0 : -1}
                            aria-current={isToday ? "date" : undefined}
                            aria-label={longFmt.format(day)}
                            onClick={() => choose(day)}
                            className={cn(
                              "grid size-9 w-full place-items-center rounded-lg text-sm tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/50",
                              !inMonth && "text-muted-2",
                              inMonth && !isSelected && "text-foreground hover:bg-background",
                              isSelected && "bg-brand font-semibold text-white",
                              !isSelected && isToday && "ring-1 ring-inset ring-border-strong",
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
