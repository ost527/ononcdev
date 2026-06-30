"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComboboxProps {
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * Combobox — an accessible autocomplete. Type to filter, ↑/↓ to move, Enter to
 * select, Escape to close; closes on outside click. Wired with combobox/listbox
 * roles and aria-activedescendant.
 */
export function Combobox({
  options,
  placeholder = "Select…",
  defaultValue = "",
  onChange,
  className,
}: ComboboxProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(defaultValue);
  const [active, setActive] = useState(0);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const choose = (value: string) => {
    setSelected(value);
    setQuery("");
    setOpen(false);
    onChange?.(value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && filtered[active]) choose(filtered[active]);
      else setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative w-64", className)}>
      <div className="relative">
        <input
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={
            open && filtered[active] ? `${id}-opt-${active}` : undefined
          }
          value={open ? query : selected}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 pr-9 text-sm outline-none focus-visible:border-brand"
        />
        <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </div>
      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-border bg-surface p-1 shadow-xl"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted">No matches</li>
          ) : (
            filtered.map((option, i) => (
              <li
                key={option}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={option === selected}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(option);
                }}
                onMouseMove={() => setActive(i)}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                  i === active && "bg-brand/15",
                )}
              >
                {option}
                {option === selected && <Check className="size-4 text-brand-2" />}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
