"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export interface ContextMenuItem {
  label?: string;
  icon?: ReactNode;
  shortcut?: string;
  onSelect?: () => void;
  danger?: boolean;
  disabled?: boolean;
  /** Render a divider instead of an actionable item. */
  separator?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  children: ReactNode;
  className?: string;
}

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * ContextMenu — a right-click menu, portaled to the body and positioned at the
 * pointer (clamped to the viewport). Opens focused on the first item; ↑/↓ and
 * Home/End move, Enter/click selects, Escape closes. Also closes on outside
 * click, scroll, or resize.
 */
export function ContextMenu({ items, children, className }: ContextMenuProps) {
  const mounted = useHydrated();
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastFocused = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(-1);

  const focusable = items
    .map((item, i) => (item.separator || item.disabled ? -1 : i))
    .filter((i) => i >= 0);

  const onContextMenu = (e: ReactMouseEvent) => {
    e.preventDefault();
    lastFocused.current = document.activeElement as HTMLElement | null;
    setPos({ x: e.clientX, y: e.clientY });
    setActive(focusable[0] ?? -1);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        lastFocused.current?.focus?.();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  // Move DOM focus to the active item.
  useEffect(() => {
    if (open && active >= 0) itemRefs.current[active]?.focus();
  }, [open, active]);

  // Position + clamp via direct style writes (left/top are not React-managed, so
  // they survive re-renders without needing extra state).
  useIsoLayoutEffect(() => {
    if (!open) return;
    const el = menuRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pad = 8;
    const x =
      pos.x + rect.width > window.innerWidth - pad
        ? Math.max(pad, window.innerWidth - rect.width - pad)
        : pos.x;
    const y =
      pos.y + rect.height > window.innerHeight - pad
        ? Math.max(pad, window.innerHeight - rect.height - pad)
        : pos.y;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }, [open, pos]);

  const move = (dir: 1 | -1) => {
    if (focusable.length === 0) return;
    const cur = focusable.indexOf(active);
    const next = cur < 0 ? 0 : (cur + dir + focusable.length) % focusable.length;
    setActive(focusable[next]);
  };

  const onMenuKey = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(focusable[0] ?? -1);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(focusable[focusable.length - 1] ?? -1);
    }
  };

  const select = (item: ContextMenuItem) => {
    if (item.disabled || item.separator) return;
    item.onSelect?.();
    setOpen(false);
    lastFocused.current?.focus?.();
  };

  return (
    <>
      <div onContextMenu={onContextMenu} className={className}>
        {children}
      </div>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={menuRef}
                role="menu"
                aria-label="Context menu"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.12 }}
                onKeyDown={onMenuKey}
                style={{ transformOrigin: "top left" }}
                className="fixed left-0 top-0 z-[120] min-w-52 rounded-xl border border-border bg-surface p-1.5 shadow-2xl"
              >
                {items.map((item, i) =>
                  item.separator ? (
                    <div
                      key={`sep-${i}`}
                      role="separator"
                      className="my-1 h-px bg-border"
                    />
                  ) : (
                    <button
                      key={item.label ?? i}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      role="menuitem"
                      type="button"
                      tabIndex={i === active ? 0 : -1}
                      disabled={item.disabled}
                      onClick={() => select(item)}
                      onMouseMove={() => !item.disabled && setActive(i)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-left text-sm outline-none disabled:cursor-not-allowed disabled:opacity-40",
                        i === active && "bg-brand/15",
                        item.danger ? "text-brand-3" : "text-foreground",
                      )}
                    >
                      {item.icon && (
                        <span className="grid size-4 shrink-0 place-items-center">
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1">{item.label}</span>
                      {item.shortcut && (
                        <span className="text-xs tracking-wide text-muted-2">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  ),
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
