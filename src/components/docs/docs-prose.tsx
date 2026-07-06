import type { ReactNode } from "react";

/** Inline code token — filenames, commands, identifiers. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}

/**
 * A shell/source snippet block. `tabIndex={0}` keeps the horizontally
 * scrollable region keyboard-operable (WCAG 2.1.1).
 */
export function Snippet({
  children,
  label,
}: {
  children: string;
  label?: string;
}) {
  return (
    <pre
      tabIndex={0}
      aria-label={label}
      className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
    >
      <code className="font-mono">{children}</code>
    </pre>
  );
}
