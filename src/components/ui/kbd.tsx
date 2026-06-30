import { cn } from "@/lib/utils";

export interface KbdProps {
  /** Keys to render, e.g. ["⌘", "K"] or ["Ctrl", "Shift", "P"]. */
  keys: string[];
  className?: string;
}

/**
 * Kbd — renders keyboard keys as styled <kbd> elements. Presentational and
 * server-safe; pass the keys of a shortcut and they render as individual caps.
 */
export function Kbd({ keys, className }: KbdProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key, i) => (
        <kbd
          key={`${key}-${i}`}
          className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-border bg-surface px-1.5 font-mono text-[11px] font-medium text-muted shadow-[0_1px_0_var(--border-strong)]"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}
