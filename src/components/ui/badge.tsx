import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeTone = "brand" | "neutral" | "success" | "warning" | "danger";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  tone?: BadgeTone;
  /** Show a small leading status dot tinted to the tone. */
  dot?: boolean;
  className?: string;
}

const TONES: Record<BadgeTone, Record<BadgeVariant, string>> = {
  brand: {
    solid: "bg-brand text-white",
    soft: "bg-brand/15 text-brand-ink",
    outline: "border border-brand/45 text-brand-ink",
  },
  neutral: {
    solid: "bg-foreground text-background",
    soft: "bg-surface-2 text-foreground",
    outline: "border border-border-strong text-foreground",
  },
  success: {
    solid: "bg-emerald-500 text-white",
    soft: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    outline: "border border-emerald-500/45 text-emerald-600 dark:text-emerald-300",
  },
  warning: {
    solid: "bg-amber-500 text-white",
    soft: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
    outline: "border border-amber-500/45 text-amber-600 dark:text-amber-300",
  },
  danger: {
    solid: "bg-rose-500 text-white",
    soft: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
    outline: "border border-rose-500/45 text-rose-600 dark:text-rose-300",
  },
};

/**
 * Badge — a compact status label. Mix a `variant` (solid / soft / outline) with
 * a semantic `tone`, and optionally show a leading dot. Purely presentational
 * and theme-aware via design tokens.
 */
export function Badge({
  children,
  variant = "soft",
  tone = "brand",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium",
        TONES[tone][variant],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            variant === "solid" ? "bg-current opacity-80" : "bg-current",
          )}
        />
      )}
      {children}
    </span>
  );
}
