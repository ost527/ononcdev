import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  /** Optional centered label (horizontal only), e.g. "OR". */
  label?: ReactNode;
  className?: string;
}

/**
 * Separator — a thin divider. Horizontal or vertical, with an optional centered
 * label for the horizontal variant (useful for "OR" dividers). Plain variants
 * expose role="separator".
 */
export function Separator({
  orientation = "horizontal",
  label,
  className,
}: SeparatorProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("w-px self-stretch bg-border", className)}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wide text-muted-2">
          {label}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
    );
  }

  return (
    <div
      role="separator"
      className={cn("h-px w-full bg-border", className)}
    />
  );
}
