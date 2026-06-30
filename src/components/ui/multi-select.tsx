"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiSelectProps {
  options: string[];
  defaultValue?: string[];
  placeholder?: string;
  onChange?: (values: string[]) => void;
  className?: string;
  "aria-label"?: string;
}

/**
 * MultiSelect — a searchable multi-select. Selected values appear as removable
 * chips; type to filter, ↑/↓ to move, Enter to toggle, Backspace (on an empty
 * query) removes the last chip, Escape closes. Wired as a combobox over an
 * aria-multiselectable listbox; closes on outside click.
 */
export function MultiSelect({
  options,
  defaultValue = [],
  placeholder = "Select…",
  onChange,
  className,
  ...aria
}: MultiSelectProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState<string[]>(defaultValue);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
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

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`#${CSS.escape(`${id}-opt-${active}`)}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);

  const emit = (next: string[]) => {
    setSelected(next);
    onChange?.(next);
  };
  const toggle = (value: string) => {
    emit(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
    setQuery("");
  };
  const remove = (value: string) => emit(selected.filter((v) => v !== value));

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
      if (open && filtered[active]) toggle(filtered[active]);
      else setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Backspace" && query === "" && selected.length) {
      remove(selected[selected.length - 1]);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative w-72", className)}>
      <div className="flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-lg border border-border bg-surface px-2 py-1.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/40">
        {selected.map((v) => (
          <span
            key={v}
            className="inline-flex items-center gap-1 rounded-md bg-brand/15 py-0.5 pl-2 pr-1 text-xs font-medium text-brand-ink"
          >
            {v}
            <button
              type="button"
              aria-label={`Remove ${v}`}
              onClick={() => remove(v)}
              className="grid size-4 place-items-center rounded outline-none transition-colors hover:bg-brand/25 focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={
            open && filtered[active] ? `${id}-opt-${active}` : undefined
          }
          aria-label={aria["aria-label"]}
          value={query}
          placeholder={selected.length ? "" : placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="min-w-16 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-2"
        />
        <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted" />
      </div>
      {open && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-multiselectable="true"
          aria-label={aria["aria-label"]}
          className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-border bg-surface p-1 shadow-xl"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted">No matches</li>
          ) : (
            filtered.map((option, i) => {
              const isSel = selected.includes(option);
              return (
                <li
                  key={option}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={isSel}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggle(option);
                  }}
                  onMouseMove={() => setActive(i)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm",
                    i === active && "bg-brand/15",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-4 shrink-0 place-items-center rounded border",
                      isSel
                        ? "border-brand bg-brand text-white"
                        : "border-border-strong",
                    )}
                  >
                    {isSel && <Check className="size-3" strokeWidth={3} />}
                  </span>
                  {option}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
