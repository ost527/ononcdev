"use client";

import { type ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Boxes,
  ChevronRight,
  Component,
  Layers,
  LifeBuoy,
  Menu,
  Rocket,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiLevelItem {
  label: string;
  icon?: ReactNode;
  href?: string;
  children?: MultiLevelItem[];
}

export interface NavbarMultiLevelProps {
  brand?: string;
  items?: MultiLevelItem[];
  ctaLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: MultiLevelItem[] = [
  {
    label: "Products",
    icon: <Boxes className="size-4" />,
    children: [
      { label: "Components", icon: <Component className="size-4" />, href: "#" },
      { label: "Blocks", icon: <Layers className="size-4" />, href: "#" },
      { label: "Templates", icon: <Rocket className="size-4" />, href: "#" },
    ],
  },
  {
    label: "Solutions",
    icon: <Zap className="size-4" />,
    children: [
      { label: "For startups", href: "#" },
      {
        label: "For enterprise",
        icon: <ShieldCheck className="size-4" />,
        children: [
          { label: "Security", href: "#" },
          { label: "SSO & SAML", href: "#" },
          { label: "Audit logs", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    icon: <BookOpen className="size-4" />,
    children: [
      { label: "Documentation", href: "#" },
      { label: "Support", icon: <LifeBuoy className="size-4" />, href: "#" },
    ],
  },
  { label: "Pricing", href: "#" },
];

/**
 * NavbarMultiLevel — a navigation menu with drill-down submenus. Items with
 * children push a new level that slides in (with a back button + current title);
 * Escape steps back one level, then closes; an outside click closes. Focus moves
 * into the panel on open and to the first item on each level change, and returns
 * to the trigger on close. Level transitions collapse to a fade under reduced-motion.
 */
export function NavbarMultiLevel({
  brand = "ONONC",
  items = DEFAULT_ITEMS,
  ctaLabel = "Get started",
  className,
}: NavbarMultiLevelProps) {
  const [open, setOpen] = useState(false);
  const [stack, setStack] = useState<{ title: string; items: MultiLevelItem[] }[]>([
    { title: "Menu", items },
  ]);
  const [dir, setDir] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const depthRef = useRef(0);
  const reduce = useReducedMotion();
  const panelId = useId();

  useEffect(() => {
    depthRef.current = stack.length - 1;
  });

  const back = () => {
    setDir(-1);
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  };

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (depthRef.current > 0) back();
        else setOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      trigger?.focus();
    };
  }, [open]);

  // Move focus to the first item of whichever level just mounted (entering node).
  const focusLevel = useCallback((node: HTMLUListElement | null) => {
    if (!node) return;
    requestAnimationFrame(() =>
      node.querySelector<HTMLElement>("[data-item]")?.focus(),
    );
  }, []);

  const openMenu = () => {
    setStack([{ title: "Menu", items }]);
    setDir(1);
    setOpen(true);
  };
  const drill = (item: MultiLevelItem) => {
    setDir(1);
    setStack((s) => [...s, { title: item.label, items: item.children! }]);
  };

  const level = stack[stack.length - 1];
  const depth = stack.length - 1;

  const variants: Variants = reduce
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (d: number) => ({ x: d > 0 ? 28 : -28, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -28 : 28, opacity: 0 }),
      };

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

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:inline-block"
          >
            {ctaLabel}
          </button>

          <div ref={rootRef} className="relative">
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => (open ? setOpen(false) : openMenu())}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
              Menu
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  id={panelId}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/30"
                >
                  <div className="flex items-center gap-2 border-b border-border px-2 py-2">
                    {depth > 0 ? (
                      <button
                        type="button"
                        onClick={back}
                        aria-label={`Back to ${stack[stack.length - 2].title}`}
                        className="grid size-7 place-items-center rounded-md text-muted outline-none transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
                      >
                        <ArrowLeft className="size-4" />
                      </button>
                    ) : (
                      <span className="grid size-7 place-items-center text-brand-ink">
                        <Sparkles className="size-4" />
                      </span>
                    )}
                    <span className="text-sm font-semibold">{level.title}</span>
                  </div>

                  <div className="relative overflow-hidden">
                    <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                      <motion.ul
                        ref={focusLevel}
                        key={stack.length}
                        custom={dir}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="p-1.5"
                      >
                        {level.items.map((item) =>
                          item.children ? (
                            <li key={item.label}>
                              <button
                                type="button"
                                data-item
                                onClick={() => drill(item)}
                                aria-label={`${item.label}, open submenu`}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-foreground outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-brand/60"
                              >
                                {item.icon && (
                                  <span className="grid size-7 shrink-0 place-items-center rounded-md border border-border text-brand-ink">
                                    {item.icon}
                                  </span>
                                )}
                                <span className="flex-1">{item.label}</span>
                                <ChevronRight className="size-4 text-muted" />
                              </button>
                            </li>
                          ) : (
                            <li key={item.label}>
                              <a
                                href={item.href ?? "#"}
                                data-item
                                onClick={() => setOpen(false)}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-brand/60"
                              >
                                {item.icon ? (
                                  <span className="grid size-7 shrink-0 place-items-center rounded-md border border-border text-brand-ink">
                                    {item.icon}
                                  </span>
                                ) : (
                                  <span className="size-7 shrink-0" aria-hidden />
                                )}
                                <span className="flex-1">{item.label}</span>
                              </a>
                            </li>
                          ),
                        )}
                      </motion.ul>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}
