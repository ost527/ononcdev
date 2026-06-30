"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  onSelect?: () => void;
  danger?: boolean;
}

export interface DropdownMenuProps {
  label: string;
  items: MenuItem[];
  className?: string;
}

/**
 * DropdownMenu — an accessible menu button. Opens with click/Enter, moves focus
 * with ↑/↓ (Home/End), selects with Enter, and closes on Escape or outside
 * click — returning focus to the trigger.
 */
export function DropdownMenu({ label, items, className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onClick);
    return () => document.removeEventListener("pointerdown", onClick);
  }, [open]);

  useEffect(() => {
    if (open) itemRefs.current[active]?.focus();
  }, [open, active]);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const onMenuKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => (a + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => (a - 1 + items.length) % items.length);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(items.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          setActive(0);
          setOpen((o) => !o);
        }}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-background"
      >
        {label}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            onKeyDown={onMenuKey}
            className="absolute left-0 z-50 mt-2 min-w-48 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-xl"
          >
            {items.map((item, i) => (
              <button
                key={item.label}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                role="menuitem"
                tabIndex={i === active ? 0 : -1}
                onClick={() => {
                  item.onSelect?.();
                  close();
                }}
                onMouseMove={() => setActive(i)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm outline-none",
                  i === active && "bg-brand/15",
                  item.danger ? "text-brand-3" : "text-foreground",
                )}
              >
                {item.icon && <span className="size-4 shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
