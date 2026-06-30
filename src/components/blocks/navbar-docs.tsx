"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Sparkles,
  Star,
  Sun,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DocsNavItem {
  label: string;
  href?: string;
}

export interface NavbarDocsProps {
  brand?: string;
  items?: DocsNavItem[];
  versions?: string[];
  stars?: string;
  className?: string;
}

const DEFAULT_ITEMS: DocsNavItem[] = [
  { label: "Docs" },
  { label: "Guides" },
  { label: "API" },
  { label: "Community" },
];
const DEFAULT_VERSIONS = ["v3.0", "v2.4", "v1.9"];

/** Accessible single-select version switcher (menuitemradio). */
function VersionSwitcher({
  versions,
  value,
  onChange,
}: {
  versions: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => {
    if (open) itemRefs.current[active]?.focus();
  }, [open, active]);

  const openMenu = () => {
    setActive(Math.max(0, versions.indexOf(value)));
    setOpen(true);
  };
  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };
  const onMenuKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => (a + 1) % versions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => (a - 1 + versions.length) % versions.length);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(versions.length - 1);
        break;
      case "Tab":
        close(false);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Version ${value}. Change version`}
        onClick={() => (open ? close(false) : openMenu())}
        className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-muted outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
      >
        {value}
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Version"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            onKeyDown={onMenuKey}
            className="absolute left-0 z-50 mt-1.5 min-w-32 overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-xl"
          >
            {versions.map((v, i) => (
              <button
                key={v}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                role="menuitemradio"
                aria-checked={v === value}
                tabIndex={i === active ? 0 : -1}
                onClick={() => {
                  onChange(v);
                  close();
                }}
                onPointerMove={() => setActive(i)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm outline-none",
                  i === active && "bg-brand/15",
                )}
              >
                <span className="flex-1">{v}</span>
                {v === value && <Check className="size-3.5 text-brand-ink" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * NavbarDocs — a documentation header: brand with an accessible version switcher
 * (menuitemradio), primary nav, a search field, a self-contained theme toggle
 * (aria-pressed), and a "Star" count. Collapses to a toggle menu on mobile. The
 * theme toggle is a local demo control and does not change the page theme.
 */
export function NavbarDocs({
  brand = "ONONC",
  items = DEFAULT_ITEMS,
  versions = DEFAULT_VERSIONS,
  stars = "2.4k",
  className,
}: NavbarDocsProps) {
  const [version, setVersion] = useState(versions[0]);
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <a href="#" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          {brand}
        </a>
        <VersionSwitcher versions={versions} value={version} onChange={setVersion} />

        <div className="ml-2 hidden items-center gap-0.5 lg:flex">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              className="rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <label className="relative hidden md:block">
            <span className="sr-only">Search docs</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search docs…"
              className="h-9 w-44 rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus-visible:border-border-strong"
            />
          </label>

          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-pressed={dark}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="grid size-9 place-items-center rounded-lg text-muted outline-none transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
          >
            {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>

          <button
            type="button"
            aria-label={`Star the project — ${stars} stars`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-background"
          >
            <Star className="size-4 text-brand-3" />
            <span className="tabular-nums">{stars}</span>
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-border px-4 py-3 lg:hidden">
          <label className="relative mb-2">
            <span className="sr-only">Search docs</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search docs…"
              className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-2 focus-visible:border-border-strong"
            />
          </label>
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
