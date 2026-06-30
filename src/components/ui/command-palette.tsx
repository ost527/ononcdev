"use client";

import {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export interface CommandItem {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;
  icon?: ReactNode;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
}

/**
 * CommandPalette — a ⌘K-style launcher. Filters items as you type, moves the
 * active row with ↑/↓, runs it with Enter, and closes on Escape. The active
 * option is tracked with aria-activedescendant for assistive tech.
 */
export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = "Type a command or search…",
}: CommandPaletteProps) {
  const mounted = useHydrated();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const id = requestAnimationFrame(() => {
      setQuery("");
      setActive(0);
      inputRef.current?.focus();
    });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
  }, [open]);

  const run = (item: CommandItem | undefined) => {
    if (!item) return;
    item.onSelect?.();
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[active]);
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center p-4 pt-[12vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onKeyDown={onKeyDown}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder={placeholder}
                role="combobox"
                aria-expanded
                aria-controls="command-list"
                aria-activedescendant={
                  filtered[active] ? `command-${filtered[active].id}` : undefined
                }
                className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-2"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted sm:block">
                ESC
              </kbd>
            </div>
            <div
              id="command-list"
              ref={listRef}
              role="listbox"
              className="max-h-72 overflow-auto p-2"
            >
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted">
                  No results for “{query}”.
                </p>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.id}
                    id={`command-${item.id}`}
                    role="option"
                    aria-selected={i === active}
                    data-active={i === active}
                    onClick={() => run(item)}
                    onMouseMove={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm",
                      i === active
                        ? "bg-brand/15 text-foreground"
                        : "text-muted",
                    )}
                  >
                    {item.icon && (
                      <span className="grid size-5 shrink-0 place-items-center text-brand-ink">
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && (
                      <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
