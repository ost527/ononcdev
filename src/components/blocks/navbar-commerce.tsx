"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface NavbarCommerceProps {
  brand?: string;
  categories?: string[];
  initialCart?: CartLine[];
  className?: string;
}

const DEFAULT_CATEGORIES = ["New", "Women", "Men", "Collections", "Sale"];
const DEFAULT_CART: CartLine[] = [
  { id: "a", name: "Merino Crew Knit", price: 128, qty: 1 },
  { id: "b", name: "Tailored Wool Trouser", price: 165, qty: 2 },
];

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/**
 * NavbarCommerce — a two-row storefront header: brand, product search, account,
 * and a cart button whose unread badge reflects total quantity. The cart button
 * opens a mini-cart popover with quantity steppers and remove controls; it moves
 * focus to its close button on open, restores focus to the trigger on close, and
 * dismisses on Escape or outside click. The category bar collapses on mobile.
 */
export function NavbarCommerce({
  brand = "ONONC",
  categories = DEFAULT_CATEGORIES,
  initialCart = DEFAULT_CART,
  className,
}: NavbarCommerceProps) {
  const [cart, setCart] = useState<CartLine[]>(initialCart);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();
  const cartWrapRef = useRef<HTMLDivElement>(null);
  const cartBtnRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const count = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.reduce((n, l) => n + l.price * l.qty, 0);

  useEffect(() => {
    if (!open) return;
    const trigger = cartBtnRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!cartWrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      cancelAnimationFrame(id);
      trigger?.focus();
    };
  }, [open]);

  const updateQty = (id: string, delta: number) =>
    setCart((c) =>
      c.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l)),
    );
  const removeLine = (id: string) => {
    setCart((c) => c.filter((l) => l.id !== id));
    // Keep focus inside the dialog after the focused row unmounts.
    requestAnimationFrame(() => closeRef.current?.focus());
  };

  return (
    <header
      className={cn(
        "rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="grid size-9 place-items-center rounded-lg border border-border text-foreground md:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <a href="#" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          <span className="hidden sm:inline">{brand}</span>
        </a>

        <label className="relative mx-auto hidden w-full max-w-md md:block">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search products…"
            className="h-9 w-full rounded-full border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus-visible:border-border-strong"
          />
        </label>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            type="button"
            aria-label="Search"
            className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground md:hidden"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
          >
            <User className="size-4" />
          </button>

          <div ref={cartWrapRef} className="relative">
            <button
              ref={cartBtnRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
              onClick={() => setOpen((o) => !o)}
              className="relative grid size-9 place-items-center rounded-lg text-muted outline-none transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
            >
              <ShoppingBag className="size-4" />
              {count > 0 && (
                <span
                  aria-hidden
                  className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-semibold leading-4 text-white"
                >
                  {count}
                </span>
              )}
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  key="mini-cart"
                  role="dialog"
                  aria-label="Shopping cart"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/30"
                >
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <h3 className="text-sm font-semibold">Your cart ({count})</h3>
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close cart"
                      className="grid size-7 place-items-center rounded-md text-muted outline-none transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  {cart.length === 0 ? (
                    <p className="px-4 py-8 text-center text-sm text-muted">
                      Your cart is empty.
                    </p>
                  ) : (
                    <ul className="max-h-64 divide-y divide-border overflow-y-auto">
                      {cart.map((line) => (
                        <li key={line.id} className="flex items-center gap-3 px-4 py-3">
                          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand/20 to-brand-2/20 text-brand-ink">
                            <ShoppingBag className="size-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">
                              {line.name}
                            </p>
                            <p className="text-xs text-muted">{money(line.price)}</p>
                            <div className="mt-1.5 inline-flex items-center rounded-md border border-border">
                              <button
                                type="button"
                                onClick={() => updateQty(line.id, -1)}
                                aria-label={`Decrease quantity of ${line.name}`}
                                className="grid size-6 place-items-center text-muted outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60 disabled:opacity-40"
                                disabled={line.qty <= 1}
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="min-w-7 text-center text-xs tabular-nums">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQty(line.id, 1)}
                                aria-label={`Increase quantity of ${line.name}`}
                                className="grid size-6 place-items-center text-muted outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLine(line.id)}
                            aria-label={`Remove ${line.name}`}
                            className="grid size-7 shrink-0 place-items-center rounded-md text-muted outline-none transition-colors hover:bg-background hover:text-brand-3 focus-visible:ring-2 focus-visible:ring-brand/60"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="border-t border-border p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Subtotal</span>
                      <span className="font-semibold tabular-nums">{money(subtotal)}</span>
                    </div>
                    <button
                      type="button"
                      disabled={cart.length === 0}
                      className="mt-3 w-full rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-40"
                    >
                      Checkout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <nav
        aria-label="Categories"
        className="hidden items-center gap-1 border-t border-border px-4 py-2 md:flex"
      >
        {categories.map((cat, i) => (
          <a
            key={cat}
            href="#"
            className={cn(
              "rounded-full px-3 py-1 text-sm transition-colors",
              i === 0
                ? "font-medium text-brand-ink"
                : "text-muted hover:text-foreground",
            )}
          >
            {cat}
          </a>
        ))}
      </nav>

      {mobileOpen && (
        <nav
          aria-label="Categories"
          className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden"
        >
          <label className="relative mb-2">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search products…"
              className="h-9 w-full rounded-full border border-border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-2"
            />
          </label>
          {categories.map((cat) => (
            <a
              key={cat}
              href="#"
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              {cat}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
