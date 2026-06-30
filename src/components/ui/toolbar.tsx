"use client";

import { type KeyboardEvent, type ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ToolbarItem =
  | { type?: "button"; id: string; label: string; icon: ReactNode; onClick?: () => void }
  | {
      type: "toggle";
      id: string;
      label: string;
      icon: ReactNode;
      defaultPressed?: boolean;
      onPressedChange?: (pressed: boolean) => void;
    }
  | { type: "separator"; id: string };

export interface ToolbarProps {
  items: ToolbarItem[];
  orientation?: "horizontal" | "vertical";
  className?: string;
  "aria-label": string;
}

/**
 * Toolbar — a WAI-ARIA toolbar (role="toolbar") that is a single tab stop and
 * roves focus across its controls with the arrow keys (Home/End jump to the
 * ends). Mix actionable buttons, `aria-pressed` toggles, and separators.
 */
export function Toolbar({
  items,
  orientation = "horizontal",
  className,
  ...aria
}: ToolbarProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusable = items
    .map((item, i) => (item.type === "separator" ? -1 : i))
    .filter((i) => i >= 0);
  const [active, setActive] = useState(focusable[0] ?? 0);
  const [pressed, setPressed] = useState<Set<string>>(
    () =>
      new Set(
        items
          .filter((i) => i.type === "toggle" && i.defaultPressed)
          .map((i) => i.id),
      ),
  );
  const isH = orientation === "horizontal";

  const focusAt = (index: number) => {
    setActive(index);
    refs.current[index]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const prevKey = isH ? "ArrowLeft" : "ArrowUp";
    const nextKey = isH ? "ArrowRight" : "ArrowDown";
    const pos = focusable.indexOf(active);
    if (pos < 0) return;
    if (e.key === nextKey) {
      e.preventDefault();
      focusAt(focusable[(pos + 1) % focusable.length]);
    } else if (e.key === prevKey) {
      e.preventDefault();
      focusAt(focusable[(pos - 1 + focusable.length) % focusable.length]);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusAt(focusable[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      focusAt(focusable[focusable.length - 1]);
    }
  };

  return (
    <div
      role="toolbar"
      aria-label={aria["aria-label"]}
      aria-orientation={orientation}
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex gap-1 rounded-xl border border-border bg-surface p-1",
        isH ? "flex-row items-center" : "flex-col items-stretch",
        className,
      )}
    >
      {items.map((item, i) => {
        if (item.type === "separator") {
          return (
            <div
              key={item.id}
              role="separator"
              aria-orientation={isH ? "vertical" : "horizontal"}
              className={cn(
                "shrink-0 bg-border",
                isH ? "mx-0.5 h-6 w-px" : "my-0.5 h-px w-full",
              )}
            />
          );
        }
        const isToggle = item.type === "toggle";
        const isPressed = isToggle && pressed.has(item.id);
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            aria-label={item.label}
            aria-pressed={isToggle ? isPressed : undefined}
            title={item.label}
            tabIndex={active === i ? 0 : -1}
            onClick={() => {
              setActive(i);
              if (item.type === "toggle") {
                const willPress = !pressed.has(item.id);
                setPressed((prev) => {
                  const next = new Set(prev);
                  if (willPress) next.add(item.id);
                  else next.delete(item.id);
                  return next;
                });
                item.onPressedChange?.(willPress);
              } else {
                item.onClick?.();
              }
            }}
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/50",
              isPressed
                ? "bg-brand/20 text-foreground"
                : "text-muted hover:bg-background hover:text-foreground",
            )}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );
}
