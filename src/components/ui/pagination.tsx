"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  count: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblingCount?: number;
  className?: string;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Pagination — numbered pages with prev/next and ellipsis collapsing for long
 * ranges. Works controlled (`page`) or uncontrolled (`defaultPage`).
 */
export function Pagination({
  count,
  page,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const [internal, setInternal] = useState(defaultPage);
  const current = page ?? internal;

  const go = (p: number) => {
    const next = Math.max(1, Math.min(count, p));
    if (page === undefined) setInternal(next);
    onPageChange?.(next);
  };

  const left = Math.max(2, current - siblingCount);
  const right = Math.min(count - 1, current + siblingCount);
  const items: (number | "…")[] = [1];
  if (left > 2) items.push("…");
  items.push(...range(left, right));
  if (right < count - 1) items.push("…");
  if (count > 1) items.push(count);

  const navBtn =
    "grid size-9 place-items-center rounded-lg border border-border text-sm transition-colors disabled:opacity-40";

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1.5", className)}>
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => go(current - 1)}
        disabled={current === 1}
        className={cn(navBtn, "hover:bg-surface")}
      >
        <ChevronLeft className="size-4" />
      </button>
      {items.map((item, i) =>
        item === "…" ? (
          <span key={`e${i}`} className="px-1 text-muted">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === current ? "page" : undefined}
            onClick={() => go(item)}
            className={cn(
              navBtn,
              item === current
                ? "border-brand bg-brand text-white"
                : "hover:bg-surface",
            )}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        onClick={() => go(current + 1)}
        disabled={current === count}
        className={cn(navBtn, "hover:bg-surface")}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
