import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A card on a category landing page (`/[category]`) that opens one sub-category
 * listing page (`/[category]/group-<subId>`). It teases the group with a live,
 * non-interactive preview of a representative component plus the component count
 * and the first few names.
 *
 * The preview can contain its own buttons/inputs, so it is NOT nested inside the
 * anchor (that would be invalid HTML). Instead the whole card is made clickable
 * with the "stretched link" pattern: the preview sits in an `inert`,
 * pointer-events-none region (removed from tab order + the a11y tree) and the
 * anchor's `::after` overlay covers the entire card.
 */
export function SubcategoryCard({
  href,
  label,
  count,
  names,
  preview,
  bleed,
}: {
  href: string;
  label: string;
  count: number;
  names: string[];
  preview?: ReactNode;
  bleed?: boolean;
}) {
  const shown = names.slice(0, 4);
  const remaining = count - shown.length;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong focus-within:border-border-strong focus-within:ring-2 focus-within:ring-brand/50">
      {preview ? (
        <div
          inert
          aria-hidden
          className={cn(
            "pointer-events-none relative flex h-40 items-center justify-center overflow-hidden border-b border-border bg-background",
            bleed && "dark",
          )}
        >
          <div className={bleed ? "absolute inset-0" : "contents"}>{preview}</div>
        </div>
      ) : null}

      <Link
        href={href}
        aria-label={`Browse ${label}`}
        className="flex flex-1 flex-col gap-2 p-6 outline-none after:absolute after:inset-0 after:content-['']"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">{label}</h2>
          <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs text-muted">
            {count}
          </span>
        </div>
        <p className="flex-1 text-sm text-muted">
          {shown.join(" · ")}
          {remaining > 0 ? (
            <span className="text-muted-2"> +{remaining} more</span>
          ) : null}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-ink">
          Browse
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </div>
  );
}
