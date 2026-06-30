import { cn } from "@/lib/utils";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Optional visible text shown beside the spinner. */
  label?: string;
  className?: string;
}

const SIZES: Record<SpinnerSize, string> = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-9 border-[3px]",
};

/**
 * Spinner — an accessible loading indicator (role="status"). The ring spins via
 * CSS (and freezes gracefully under prefers-reduced-motion). Without a visible
 * label it still announces "Loading…" to screen readers.
 */
export function Spinner({ size = "md", label, className }: SpinnerProps) {
  return (
    <span
      role="status"
      className={cn("inline-flex items-center gap-2.5 text-sm text-muted", className)}
    >
      <span
        aria-hidden
        className={cn(
          "animate-spin rounded-full border-border-strong border-t-brand",
          SIZES[size],
        )}
      />
      {label ? <span>{label}</span> : <span className="sr-only">Loading…</span>}
    </span>
  );
}
