"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Blocks,
  BookOpen,
  Command,
  Component,
  CornerDownLeft,
  FileText,
  Menu,
  Search,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommandItem {
  label: string;
  icon: ReactNode;
  hint?: string;
}
export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

export interface NavbarCommandProps {
  brand?: string;
  items?: { label: string; href?: string }[];
  groups?: CommandGroup[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_LINKS = [
  { label: "Product" },
  { label: "Docs" },
  { label: "Pricing" },
  { label: "Blog" },
];

const DEFAULT_GROUPS: CommandGroup[] = [
  {
    label: "Pages",
    items: [
      { label: "Home", icon: <Sparkles className="size-4" />, hint: "G H" },
      { label: "Documentation", icon: <BookOpen className="size-4" />, hint: "G D" },
      { label: "Changelog", icon: <FileText className="size-4" /> },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Buttons", icon: <Component className="size-4" /> },
      { label: "Blocks", icon: <Blocks className="size-4" /> },
      { label: "Animations", icon: <Zap className="size-4" /> },
    ],
  },
];

/**
 * NavbarCommand — a navigation bar whose search opens an inline command
 * palette. The palette is an accessible combobox (input + listbox): ⌘K/Ctrl-K
 * or the search button opens it, ↑/↓ move the active option (aria-activedescendant),
 * Enter selects, Escape closes and restores focus to the trigger, and an outside
 * click dismisses it. Open/close fades respect reduced-motion.
 */
export function NavbarCommand({
  brand = "ONONC",
  items = DEFAULT_LINKS,
  groups = DEFAULT_GROUPS,
  ctaLabel = "Get started",
  className,
}: NavbarCommandProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter groups by the query; build a flat list for keyboard navigation.
  const q = query.trim().toLowerCase();
  const filteredGroups = groups
    .map((g) => ({
      ...g,
      items: g.items.filter((it) => it.label.toLowerCase().includes(q)),
    }))
    .filter((g) => g.items.length > 0);
  const flat = filteredGroups.flatMap((g) => g.items);
  const activeClamped = Math.min(active, Math.max(0, flat.length - 1));

  // Global ⌘K / Ctrl-K to open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // While open: outside-click closes; focus the input; restore focus on close.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      cancelAnimationFrame(id);
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  const onInputKey = (e: React.KeyboardEvent) => {    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, flat.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (flat[activeClamped]) close();
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  return (
    <nav
      ref={rootRef}
      aria-label="Primary"
      className={cn(
        "relative rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <a href="#" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          {brand}
        </a>

        <div className="hidden items-center gap-0.5 md:flex">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label="Search (Command or Control + K)"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background py-1.5 pl-3 pr-2 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Search…</span>
            <kbd
              aria-hidden
              className="ml-1 hidden items-center gap-0.5 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium sm:inline-flex"
            >
              <Command className="size-2.5" />K
            </kbd>
          </button>
          <button
            type="button"
            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:inline-block"
          >
            {ctaLabel}
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg border border-border text-foreground md:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            className="mt-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            {ctaLabel}
          </button>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            key="cmd-panel"
            role="dialog"
            aria-label="Search"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute inset-x-3 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/30"
          >
            <div className="flex items-center gap-2 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-muted" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded
                aria-controls="command-listbox"
                aria-activedescendant={
                  flat[activeClamped] ? `command-option-${activeClamped}` : undefined
                }
                aria-label="Search commands"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search…"
                className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-2"
              />
              <kbd
                aria-hidden
                className="hidden items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted sm:inline-flex"
              >
                Esc
              </kbd>
            </div>

            <ul
              id="command-listbox"
              role="listbox"
              aria-label="Results"
              className="max-h-72 overflow-y-auto p-2"
            >
              {filteredGroups.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">
                  No results for “{query}”.
                </li>
              )}
              {filteredGroups.map((group, gi) => {
                const offset = filteredGroups
                  .slice(0, gi)
                  .reduce((n, g) => n + g.items.length, 0);
                return (
                  <li key={group.label} role="presentation">
                    <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-2">
                      {group.label}
                    </p>
                    <ul role="presentation">
                      {group.items.map((item, ii) => {
                        const idx = offset + ii;
                        const isActive = idx === activeClamped;
                        return (
                          <li
                            key={item.label}
                            id={`command-option-${idx}`}
                            role="option"
                            aria-selected={isActive}
                            onPointerMove={() => setActive(idx)}
                            onClick={close}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm",
                              isActive ? "bg-brand/15 text-foreground" : "text-muted",
                            )}
                          >
                            <span className="grid size-7 shrink-0 place-items-center rounded-md border border-border text-brand-ink">
                              {item.icon}
                            </span>
                            <span className="flex-1 text-foreground">{item.label}</span>
                            {item.hint && (
                              <kbd
                                aria-hidden
                                className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted"
                              >
                                {item.hint}
                              </kbd>
                            )}
                            {isActive && (
                              <CornerDownLeft className="size-3.5 text-muted" aria-hidden />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
