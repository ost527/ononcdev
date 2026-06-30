"use client";

import { type KeyboardEvent } from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimeValue {
  hour: number; // 1–12
  minute: number; // 0–59
  period: "AM" | "PM";
}

export interface TimePickerProps {
  defaultValue?: TimeValue;
  onChange?: (value: TimeValue) => void;
  minuteStep?: number;
  className?: string;
}

const pad = (n: number) => n.toString().padStart(2, "0");

function Segment({
  label,
  display,
  valueNow,
  valueText,
  min,
  max,
  onStep,
}: {
  label: string;
  display: string;
  valueNow: number;
  valueText: string;
  min: number;
  max: number;
  onStep: (dir: 1 | -1) => void;
}) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onStep(1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onStep(-1);
    }
  };
  const chevron =
    "grid h-5 w-9 place-items-center rounded text-muted transition-colors hover:bg-background hover:text-foreground";
  return (
    <div className="flex flex-col items-center gap-0.5">
      <button type="button" tabIndex={-1} aria-hidden onClick={() => onStep(1)} className={chevron}>
        <ChevronUp className="size-4" />
      </button>
      <div
        role="spinbutton"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={valueNow}
        aria-valuetext={valueText}
        onKeyDown={onKeyDown}
        className="grid w-9 place-items-center rounded-lg bg-surface-2 py-1.5 text-lg font-semibold tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
      >
        {display}
      </div>
      <button type="button" tabIndex={-1} aria-hidden onClick={() => onStep(-1)} className={chevron}>
        <ChevronDown className="size-4" />
      </button>
    </div>
  );
}

/**
 * TimePicker — choose an hour, minute and AM/PM. Each segment is a spinbutton:
 * focus it and use ↑/↓ (values wrap), or click the chevrons. The AM/PM toggle is
 * a button. Controlled output via onChange.
 */
export function TimePicker({
  defaultValue = { hour: 9, minute: 0, period: "AM" },
  onChange,
  minuteStep = 5,
  className,
}: TimePickerProps) {
  const [value, setValue] = useState<TimeValue>(defaultValue);

  const update = (next: TimeValue) => {
    setValue(next);
    onChange?.(next);
  };

  const stepHour = (dir: 1 | -1) => {
    let hour = value.hour + dir;
    if (hour > 12) hour = 1;
    if (hour < 1) hour = 12;
    update({ ...value, hour });
  };
  const stepMinute = (dir: 1 | -1) => {
    const minute = (((value.minute + dir * minuteStep) % 60) + 60) % 60;
    update({ ...value, minute });
  };
  const togglePeriod = () =>
    update({ ...value, period: value.period === "AM" ? "PM" : "AM" });

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-border bg-surface p-2",
        className,
      )}
    >
      <Clock className="ml-1 size-4 shrink-0 text-muted" />
      <Segment
        label="Hour"
        display={pad(value.hour)}
        valueNow={value.hour}
        valueText={`${value.hour} o'clock`}
        min={1}
        max={12}
        onStep={stepHour}
      />
      <span className="text-lg font-semibold text-muted-2">:</span>
      <Segment
        label="Minute"
        display={pad(value.minute)}
        valueNow={value.minute}
        valueText={`${value.minute} minutes`}
        min={0}
        max={59}
        onStep={stepMinute}
      />
      <button
        type="button"
        aria-label={`Period, currently ${value.period}. Activate to toggle.`}
        onClick={togglePeriod}
        className="ml-1 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-brand/50"
      >
        {value.period}
      </button>
    </div>
  );
}
