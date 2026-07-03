"use client";

import { type ReactNode, useState } from "react";
import { RotateCcw } from "lucide-react";
import { ColorPicker } from "@/components/ui/color-picker";
import { NumberInput } from "@/components/ui/number-input";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type {
  Control,
  ControlValue,
  PlaygroundValues,
} from "@/registry/types";
import { cn } from "@/lib/utils";

/** Build the default value map for a set of controls. */
export function initialValues(controls?: readonly Control[]): PlaygroundValues {
  const values: PlaygroundValues = {};
  for (const control of controls ?? []) values[control.key] = control.default;
  return values;
}

/** Small per-control "back to default" affordance, shown once modified. */
function ResetButton({ label, onReset }: { label: string; onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      aria-label={`Reset ${label}`}
      title="Reset to default"
      className="grid size-5 place-items-center rounded text-muted-2 transition-colors hover:text-foreground"
    >
      <RotateCcw className="size-3" />
    </button>
  );
}

/** Label row + optional readout + the control itself. */
function Field({
  label,
  hint,
  readout,
  action,
  children,
}: {
  label: string;
  hint?: string;
  readout?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          {label}
          {action}
        </span>
        {readout !== undefined && (
          <span className="font-mono text-xs tabular-nums text-muted">
            {readout}
          </span>
        )}
      </div>
      {children}
      {hint && <p className="text-xs text-muted-2">{hint}</p>}
    </div>
  );
}

/** Color swatch button that toggles an inline ColorPicker. */
function ColorField({
  label,
  hint,
  value,
  action,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  action?: ReactNode;
  onChange: (hex: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          {label}
          {action}
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={`${label}: ${value}`}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-2 py-1 text-xs transition-colors hover:border-border-strong"
        >
          <span
            aria-hidden
            className="size-4 rounded border border-border"
            style={{ background: value }}
          />
          <span className="font-mono uppercase text-muted">{value}</span>
        </button>
      </div>
      {open && (
        <ColorPicker defaultValue={value} onChange={onChange} className="w-full" />
      )}
      {hint && <p className="text-xs text-muted-2">{hint}</p>}
    </div>
  );
}

/** Render one Customize control bound to a value. */
export function ControlField({
  control,
  value,
  onChange,
  onReset,
}: {
  control: Control;
  value: ControlValue;
  onChange: (value: ControlValue) => void;
  /** Reset this control to its default; rendered once the value differs. */
  onReset?: () => void;
}) {
  const modified = value !== control.default;
  const action =
    modified && onReset ? (
      <ResetButton label={control.label} onReset={onReset} />
    ) : undefined;

  switch (control.type) {
    case "number": {
      const val = Number(value);
      const readout = `${val}${control.unit ?? ""}`;
      if (control.variant === "stepper") {
        return (
          <Field label={control.label} hint={control.hint} readout={readout} action={action}>
            <NumberInput
              aria-label={control.label}
              value={val}
              min={control.min}
              max={control.max}
              step={control.step ?? 1}
              onValueChange={onChange}
            />
          </Field>
        );
      }
      return (
        <Field label={control.label} hint={control.hint} readout={readout} action={action}>
          <Slider
            aria-label={control.label}
            className="w-full"
            value={val}
            min={control.min}
            max={control.max}
            step={control.step ?? 1}
            onValueChange={onChange}
          />
        </Field>
      );
    }
    case "boolean":
      return (
        <div className="flex items-center justify-between gap-3 py-1">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            {control.label}
            {action}
          </span>
          <Switch
            label={control.label}
            checked={Boolean(value)}
            onCheckedChange={onChange}
          />
        </div>
      );
    case "select": {
      const variant =
        control.variant ?? (control.options.length <= 4 ? "segmented" : "select");
      if (variant === "segmented") {
        return (
          <Field label={control.label} hint={control.hint} action={action}>
            <SegmentedControl
              aria-label={control.label}
              className="flex flex-wrap"
              options={control.options.map((o) => o.value)}
              value={String(value)}
              onValueChange={onChange}
            />
          </Field>
        );
      }
      return (
        <Field label={control.label} hint={control.hint} action={action}>
          <Select
            aria-label={control.label}
            className="w-full"
            options={[...control.options]}
            value={String(value)}
            onValueChange={onChange}
          />
        </Field>
      );
    }
    case "color":
      return (
        <ColorField
          label={control.label}
          hint={control.hint}
          value={String(value)}
          action={action}
          onChange={onChange}
        />
      );
    case "text":
      return (
        <Field label={control.label} hint={control.hint} action={action}>
          <input
            type="text"
            aria-label={control.label}
            value={String(value)}
            placeholder={control.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors",
              "focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40",
            )}
          />
        </Field>
      );
  }
}
