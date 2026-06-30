"use client";

import {
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * Select — an accessible listbox-style picker. Open with Enter/Space/↑/↓,
 * navigate with arrows + Home/End, type to jump to a match, Enter selects and
 * Escape closes. Closes on outside click and restores focus to the trigger.
 * Wired with listbox/option roles and aria-activedescendant.
 */
export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  disabled = false,
  className,
  ...aria
}: SelectProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ query: "", at: 0 });

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const selected = isControlled ? value : internal;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const selectedOption = options.find((o) => o.value === selected);
  const enabledIndexes = options
    .map((o, i) => (o.disabled ? -1 : i))
    .filter((i) => i >= 0);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`#${CSS.escape(`${id}-opt-${active}`)}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);

  const openList = () => {
    if (disabled) return;
    const start = options.findIndex((o) => o.value === selected && !o.disabled);
    setActive(start >= 0 ? start : (enabledIndexes[0] ?? 0));
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const choose = (index: number) => {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    if (!isControlled) setInternal(opt.value);
    onValueChange?.(opt.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const step = (dir: 1 | -1) => {
    const pos = enabledIndexes.indexOf(active);
    const nextPos =
      pos < 0
        ? 0
        : (pos + dir + enabledIndexes.length) % enabledIndexes.length;
    setActive(enabledIndexes[nextPos]);
  };

  const onType = (key: string) => {
    const now = Date.now();
    const t = typeahead.current;
    t.query = now - t.at > 600 ? key : t.query + key;
    t.at = now;
    const match = options.findIndex(
      (o) => !o.disabled && o.label.toLowerCase().startsWith(t.query.toLowerCase()),
    );
    if (match >= 0) {
      if (open) setActive(match);
      else choose(match);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      } else if (e.key.length === 1) {
        onType(e.key);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        step(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        step(-1);
        break;
      case "Home":
        e.preventDefault();
        setActive(enabledIndexes[0] ?? 0);
        break;
      case "End":
        e.preventDefault();
        setActive(enabledIndexes[enabledIndexes.length - 1] ?? 0);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        if (e.key.length === 1) onType(e.key);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative w-64", className)}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        aria-label={aria["aria-label"]}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={cn(!selectedOption && "text-muted")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronsUpDown className="size-4 shrink-0 text-muted" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={`${id}-list`}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-border bg-surface p-1 shadow-xl"
          >
            {options.map((option, i) => {
              const isSelected = option.value === selected;
              return (
                <li
                  key={option.value}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    choose(i);
                  }}
                  onMouseMove={() => !option.disabled && setActive(i)}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm",
                    option.disabled
                      ? "cursor-not-allowed text-muted-2"
                      : "cursor-pointer text-foreground",
                    i === active && !option.disabled && "bg-brand/15",
                  )}
                >
                  {option.label}
                  {isSelected && <Check className="size-4 text-brand-2" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
