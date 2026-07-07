import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Optional action slot (e.g. a button). */
  action?: ReactNode;
  className?: string;
}

/**
 * EmptyState — a centered placeholder for empty content: an optional icon, a
 * title, a description, and an optional action. Presentational and server-safe.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border-strong p-10 text-center",
        className,
      )}
    >
      {icon && (
        <div className="grid size-12 place-items-center rounded-full bg-surface-2 text-muted">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description && (
          <p className="mx-auto max-w-xs text-sm text-muted">{description}</p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
