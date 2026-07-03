"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

export type Viewport = "mobile" | "tablet" | "desktop";

/** Preset widths per viewport; `desktop` fills the available width. */
export const VIEWPORT_WIDTHS: Record<Viewport, number | null> = {
  desktop: null,
  tablet: 768,
  mobile: 390,
};

const ITEMS: { mode: Viewport; label: string; icon: typeof Monitor }[] = [
  { mode: "desktop", label: "Desktop", icon: Monitor },
  { mode: "tablet", label: "Tablet", icon: Tablet },
  { mode: "mobile", label: "Mobile", icon: Smartphone },
];

/**
 * ViewportToggle — Desktop / Tablet / Mobile preset buttons. `value` is a string
 * so a caller using a wider mode set (e.g. a "custom" resize state) can pass it;
 * no button is pressed when it matches none.
 */
export function ViewportToggle({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (mode: Viewport) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Viewport size"
      className={cn(
        "inline-flex rounded-lg border border-border bg-background p-0.5",
        className,
      )}
    >
      {ITEMS.map(({ mode, label, icon: Icon }) => (
        <button
          key={mode}
          type="button"
          aria-label={label}
          aria-pressed={value === mode}
          title={label}
          onClick={() => onChange(mode)}
          className={cn(
            "grid size-7 place-items-center rounded-md transition-[background-color,color,box-shadow] duration-150",
            value === mode
              ? "bg-surface-2 text-foreground shadow-sm ring-1 ring-inset ring-border-strong"
              : "text-muted hover:text-foreground",
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}
