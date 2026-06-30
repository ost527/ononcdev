"use client";

import { type ReactNode, useState } from "react";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BannerBlockProps {
  message?: ReactNode;
  ctaLabel?: string;
  className?: string;
}

/**
 * BannerBlock — a dismissible announcement bar with a gradient wash and a CTA.
 */
export function BannerBlock({
  message = "Lumen UI just shipped a big batch of new components.",
  ctaLabel = "See what's new",
  className,
}: BannerBlockProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className={cn(
        "relative flex flex-wrap items-center justify-center gap-x-3 gap-y-1 overflow-hidden rounded-xl border border-border bg-gradient-to-r from-brand/15 via-brand-2/10 to-brand-3/15 px-10 py-3 text-sm",
        className,
      )}
    >
      <Sparkles className="size-4 shrink-0 text-brand-ink" aria-hidden />
      <p className="text-center text-foreground">{message}</p>
      <a
        href="#"
        className="inline-flex items-center gap-1 font-medium text-brand-ink hover:underline"
      >
        {ctaLabel}
        <ArrowRight className="size-3.5" />
      </a>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted transition-colors hover:bg-background hover:text-foreground"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
