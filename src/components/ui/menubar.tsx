"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MenubarMenuItem {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  shortcut?: string;
}

export interface MenubarMenu {
  label: string;
  items: MenubarMenuItem[];
}

export interface MenubarProps {
  menus: MenubarMenu[];
  className?: string;
  "aria-label"?: string;
}

/**
 * Menubar — an application menu bar (role="menubar"). ←/→ move between top-level
 * menus (and switch the open one), ↓ / Enter opens a menu and focuses its first
 * item, ↑/↓ move within it, Home/End jump, Escape closes back to the bar, and an
 * outside click dismisses it. One tab stop; focus is managed throughout.
 */
export function Menubar({ menus, className, ...aria }: MenubarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const topRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [activeTop, setActiveTop] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    if (open === null) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Move focus to the active item whenever the open menu or active item changes.
  useEffect(() => {
    if (open !== null) itemRefs.current.get(`${open}-${activeItem}`)?.focus();
  }, [open, activeItem]);

  const enabledItems = (menuIndex: number) =>
    menus[menuIndex].items
      .map((item, i) => (item.disabled ? -1 : i))
      .filter((i) => i >= 0);

  const openMenu = (index: number) => {
    setActiveTop(index);
    setActiveItem(enabledItems(index)[0] ?? 0);
    setOpen(index);
  };

  const closeMenu = (focusTop = true) => {
    const i = open;
    setOpen(null);
    if (focusTop && i !== null) topRefs.current[i]?.focus();
  };

  const onTopKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next =
        e.key === "ArrowRight"
          ? (index + 1) % menus.length
          : (index - 1 + menus.length) % menus.length;
      setActiveTop(next);
      if (open !== null) openMenu(next);
      else topRefs.current[next]?.focus();
    } else if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu(index);
    } else if (e.key === "Escape") {
      setOpen(null);
    }
  };

  const onMenuKeyDown = (e: KeyboardEvent, menuIndex: number) => {
    const enabled = enabledItems(menuIndex);
    const pos = enabled.indexOf(activeItem);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveItem(enabled[(pos + 1) % enabled.length]);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveItem(enabled[(pos - 1 + enabled.length) % enabled.length]);
        break;
      case "Home":
        e.preventDefault();
        setActiveItem(enabled[0]);
        break;
      case "End":
        e.preventDefault();
        setActiveItem(enabled[enabled.length - 1]);
        break;
      case "ArrowRight":
        e.preventDefault();
        openMenu((menuIndex + 1) % menus.length);
        break;
      case "ArrowLeft":
        e.preventDefault();
        openMenu((menuIndex - 1 + menus.length) % menus.length);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        setOpen(null);
        break;
      case "Enter":
      case " ": {
        e.preventDefault();
        const item = menus[menuIndex].items[activeItem];
        if (item && !item.disabled) {
          item.onSelect?.();
          closeMenu();
        }
        break;
      }
    }
  };

  return (
    <div
      ref={rootRef}
      role="menubar"
      aria-label={aria["aria-label"] ?? "Menubar"}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-xl border border-border bg-surface p-1",
        className,
      )}
    >
      {menus.map((menu, mi) => (
        <div key={menu.label} className="relative">
          <button
            ref={(el) => {
              topRefs.current[mi] = el;
            }}
            type="button"
            role="menuitem"
            aria-haspopup="menu"
            aria-expanded={open === mi}
            tabIndex={activeTop === mi ? 0 : -1}
            onClick={() => (open === mi ? closeMenu() : openMenu(mi))}
            onKeyDown={(e) => onTopKeyDown(e, mi)}
            onMouseEnter={() => open !== null && open !== mi && openMenu(mi)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/50",
              open === mi
                ? "bg-brand/15 text-foreground"
                : "text-muted hover:text-foreground",
            )}
          >
            {menu.label}
          </button>
          {open === mi && (
            <motion.div
              role="menu"
              aria-label={menu.label}
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.12 }}
              onKeyDown={(e) => onMenuKeyDown(e, mi)}
              className="absolute left-0 top-full z-50 mt-1 min-w-44 rounded-xl border border-border bg-surface p-1.5 shadow-xl"
            >
              {menu.items.map((item, ii) => (
                <button
                  key={item.label}
                  ref={(el) => {
                    const key = `${mi}-${ii}`;
                    if (el) itemRefs.current.set(key, el);
                    else itemRefs.current.delete(key);
                  }}
                  type="button"
                  role="menuitem"
                  tabIndex={activeItem === ii ? 0 : -1}
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) return;
                    item.onSelect?.();
                    closeMenu();
                  }}
                  onMouseMove={() => !item.disabled && setActiveItem(ii)}
                  className={cn(
                    "flex w-full items-center justify-between gap-6 rounded-lg px-3 py-1.5 text-left text-sm text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-40",
                    activeItem === ii && !item.disabled && "bg-brand/15",
                  )}
                >
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span className="text-xs text-muted-2">{item.shortcut}</span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
