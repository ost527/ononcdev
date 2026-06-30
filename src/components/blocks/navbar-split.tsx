"use client";

import { useState } from "react";
import { Menu, Search, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SplitNavItem {
  label: string;
  href?: string;
}

export interface NavbarSplitProps {
  brand?: string;
  /** Links shown to the left of the centered wordmark. */
  leftItems?: SplitNavItem[];
  /** Links shown to the right of the centered wordmark. */
  rightItems?: SplitNavItem[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_LEFT: SplitNavItem[] = [
  { label: "Collections" },
  { label: "Studio" },
  { label: "Stories" },
];
const DEFAULT_RIGHT: SplitNavItem[] = [
  { label: "About" },
  { label: "Journal" },
  { label: "Contact" },
];

function UnderlineLink({ label, href }: SplitNavItem) {
  return (
    <a
      href={href ?? "#"}
      className="group relative py-1 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground focus-visible:text-foreground"
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand-ink via-brand-2 to-brand-3 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
    </a>
  );
}

/**
 * NavbarSplit — an editorial header with the wordmark centered and navigation
 * split evenly to either side. Links carry an animated gradient underline on
 * hover and keyboard focus. Collapses to a centered brand with a toggle menu.
 */
export function NavbarSplit({
  brand = "ONONC",
  leftItems = DEFAULT_LEFT,
  rightItems = DEFAULT_RIGHT,
  ctaLabel = "Get started",
  className,
}: NavbarSplitProps) {
  const [open, setOpen] = useState(false);
  const allItems = [...leftItems, ...rightItems];

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      {/* Desktop: three balanced columns */}
      <div className="hidden items-center px-6 py-4 md:grid md:grid-cols-3">
        <div className="flex items-center gap-6">
          {leftItems.map((item) => (
            <UnderlineLink key={item.label} {...item} />
          ))}
        </div>

        <a
          href="#"
          className="flex items-center justify-center gap-2 justify-self-center text-base font-semibold tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          {brand}
        </a>

        <div className="flex items-center justify-end gap-6">
          {rightItems.map((item) => (
            <UnderlineLink key={item.label} {...item} />
          ))}
          <div className="flex items-center gap-2 border-l border-border pl-5">
            <button
              type="button"
              aria-label="Search"
              className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              <Search className="size-4" />
            </button>
            <button className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-background">
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: centered brand + toggle */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid size-9 place-items-center rounded-lg border border-border text-foreground"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          {brand}
        </a>
        <button
          type="button"
          aria-label="Search"
          className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
        >
          <Search className="size-4" />
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {allItems.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              className="rounded-lg px-3 py-2 text-sm uppercase tracking-widest text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <button className="mt-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground">
            {ctaLabel}
          </button>
        </div>
      )}
    </nav>
  );
}
