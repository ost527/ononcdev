"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Globe, Menu, Sparkles, Wallet, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LocaleOption {
  value: string;
  label: string;
  hint?: string;
}

interface RadioMenuProps {
  icon: ReactNode;
  srLabel: string;
  menuLabel: string;
  options: LocaleOption[];
  value: string;
  onChange: (v: string) => void;
}

/** A compact, accessible single-select menu (menuitemradio). */
function RadioMenu({ icon, srLabel, menuLabel, options, value, onChange }: RadioMenuProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = options.find((o) => o.value === value) ?? options[0];

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
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
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
        setActive((a) => (a + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => (a - 1 + options.length) % options.length);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
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
        aria-label={`${srLabel}: ${selected.label}`}
        onClick={() => (open ? close(false) : openMenu())}
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted outline-none transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
      >
        <span className="text-brand-ink">{icon}</span>
        <span className="font-medium text-foreground">{selected.label}</span>
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={menuLabel}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            onKeyDown={onMenuKey}
            className="absolute right-0 z-50 mt-2 min-w-44 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-2xl shadow-black/25"
          >
            {options.map((opt, i) => (
              <button
                key={opt.value}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                role="menuitemradio"
                aria-checked={opt.value === value}
                tabIndex={i === active ? 0 : -1}
                onClick={() => {
                  onChange(opt.value);
                  close();
                }}
                onPointerMove={() => setActive(i)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm outline-none",
                  i === active && "bg-brand/15",
                )}
              >
                <span className="flex-1 text-foreground">{opt.label}</span>
                {opt.hint && <span className="text-xs text-muted">{opt.hint}</span>}
                {opt.value === value && <Check className="size-4 text-brand-ink" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface LocaleNavItem {
  label: string;
  href?: string;
}

export interface NavbarLocaleProps {
  brand?: string;
  items?: LocaleNavItem[];
  languages?: LocaleOption[];
  currencies?: LocaleOption[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: LocaleNavItem[] = [
  { label: "Product" },
  { label: "Pricing" },
  { label: "Customers" },
  { label: "Docs" },
];
const DEFAULT_LANGUAGES: LocaleOption[] = [
  { value: "en", label: "English" },
  { value: "ko", label: "한국어" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
  { value: "ja", label: "日本語" },
];
const DEFAULT_CURRENCIES: LocaleOption[] = [
  { value: "usd", label: "USD", hint: "$" },
  { value: "eur", label: "EUR", hint: "€" },
  { value: "gbp", label: "GBP", hint: "£" },
  { value: "krw", label: "KRW", hint: "₩" },
];

/**
 * NavbarLocale — a marketing bar with accessible language and currency
 * switchers. Each switcher is a single-select menu (menuitemradio + aria-checked)
 * with full keyboard support (Arrow/Home/End/Tab/Escape), outside-click close,
 * and focus return to its trigger. Collapses to a toggle menu on mobile.
 */
export function NavbarLocale({
  brand = "Lumen",
  items = DEFAULT_ITEMS,
  languages = DEFAULT_LANGUAGES,
  currencies = DEFAULT_CURRENCIES,
  ctaLabel = "Get started",
  className,
}: NavbarLocaleProps) {
  const [lang, setLang] = useState(languages[0].value);
  const [currency, setCurrency] = useState(currencies[0].value);
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3">
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

        <div className="hidden items-center gap-1 md:flex">
          <RadioMenu
            icon={<Globe className="size-4" />}
            srLabel="Language"
            menuLabel="Select language"
            options={languages}
            value={lang}
            onChange={setLang}
          />
          <RadioMenu
            icon={<Wallet className="size-4" />}
            srLabel="Currency"
            menuLabel="Select currency"
            options={currencies}
            value={currency}
            onChange={setCurrency}
          />
          <button
            type="button"
            className="ml-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            {ctaLabel}
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid size-9 place-items-center rounded-lg border border-border text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
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
          <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
            <RadioMenu
              icon={<Globe className="size-4" />}
              srLabel="Language"
              menuLabel="Select language"
              options={languages}
              value={lang}
              onChange={setLang}
            />
            <RadioMenu
              icon={<Wallet className="size-4" />}
              srLabel="Currency"
              menuLabel="Select currency"
              options={currencies}
              value={currency}
              onChange={setCurrency}
            />
          </div>
          <button
            type="button"
            className="mt-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </nav>
  );
}
