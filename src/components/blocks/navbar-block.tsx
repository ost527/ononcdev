"use client";

import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href?: string;
}

export interface NavbarBlockProps {
  brand?: string;
  items?: NavItem[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: "Features" },
  { label: "Pricing" },
  { label: "Docs" },
  { label: "Blog" },
];

/**
 * NavbarBlock — a responsive navigation bar that collapses to a toggle menu on
 * small screens. The toggle exposes aria-expanded.
 */
export function NavbarBlock({
  brand = "Lumen",
  items = DEFAULT_ITEMS,
  ctaLabel = "Get started",
  className,
}: NavbarBlockProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        "relative rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          {brand}
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href ?? "#"}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90">
            {ctaLabel}
          </button>
        </div>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid size-9 place-items-center rounded-lg border border-border text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href ?? "#"}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <button className="mt-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
            {ctaLabel}
          </button>
        </div>
      )}
    </nav>
  );
}
