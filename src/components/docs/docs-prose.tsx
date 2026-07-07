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

/** A reference table — header row + body rows. Cells accept any node. */
export function Table({
  head,
  rows,
}: {
  head: ReactNode[];
  rows: ReactNode[][];
}) {
  return (
    <div
      tabIndex={0}
      className="mt-5 overflow-x-auto rounded-xl border border-border outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
    >
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            {head.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2.5 font-semibold text-foreground"
                scope="col"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-border last:border-0">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className="px-4 py-2.5 align-top leading-relaxed text-muted"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A numbered how-to list; each item is any node. */
export function Steps({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="mt-5 space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border bg-surface text-xs font-medium text-muted">
            {i + 1}
          </span>
          <div className="text-sm leading-relaxed text-muted">{step}</div>
        </li>
      ))}
    </ol>
  );
}
