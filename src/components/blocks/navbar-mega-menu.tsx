"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  ChevronDown,
  Component,
  Gauge,
  LifeBuoy,
  Menu,
  Palette,
  Shield,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MegaLink {
  label: string;
  description: string;
  icon: ReactNode;
  href?: string;
}

export interface MegaFeatured {
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
}

export interface MegaMenu {
  links: MegaLink[];
  featured?: MegaFeatured;
}

export interface MegaNavItem {
  label: string;
  href?: string;
  menu?: MegaMenu;
}

export interface NavbarMegaMenuProps {
  brand?: string;
  items?: MegaNavItem[];
  ctaLabel?: string;
  signInLabel?: string;
  className?: string;
}

const DEFAULT_ITEMS: MegaNavItem[] = [
  {
    label: "Product",
    menu: {
      links: [
        { label: "Components", description: "35 interactive primitives", icon: <Component className="size-4" /> },
        { label: "Blocks", description: "Drop-in page sections", icon: <Blocks className="size-4" /> },
        { label: "Motion", description: "Spring & scroll effects", icon: <Zap className="size-4" /> },
        { label: "Theming", description: "Token-driven design system", icon: <Palette className="size-4" /> },
      ],
      featured: {
        title: "What's new in v1.1",
        description: "Six refined navigation blocks, built for production.",
        ctaLabel: "Read the changelog",
      },
    },
  },
  {
    label: "Solutions",
    menu: {
      links: [
        { label: "Startups", description: "Ship a polished UI fast", icon: <Zap className="size-4" /> },
        { label: "Enterprise", description: "Scale with confidence", icon: <Shield className="size-4" /> },
        { label: "Performance", description: "GPU-friendly by default", icon: <Gauge className="size-4" /> },
        { label: "Workflows", description: "Compose without friction", icon: <Workflow className="size-4" /> },
      ],
    },
  },
  {
    label: "Resources",
    menu: {
      links: [
        { label: "Documentation", description: "Guides and API reference", icon: <BookOpen className="size-4" /> },
        { label: "Support", description: "Get help from the team", icon: <LifeBuoy className="size-4" /> },
      ],
    },
  },
  { label: "Pricing", href: "#" },
];

/**
 * NavbarMegaMenu — a SaaS-grade navigation bar with rich mega-menu dropdowns.
 * Triggers open on hover-intent and on click/Enter, expose `aria-expanded`,
 * and close on Escape, outside click, or pointer-leave. On small screens the
 * bar collapses to a stacked menu that groups each section's links.
 */
export function NavbarMegaMenu({
  brand = "ONONC",
  items = DEFAULT_ITEMS,
  ctaLabel = "Get started",
  signInLabel = "Sign in",
  className,
}: NavbarMegaMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpenIndex(null), 140);
  };

  useEffect(() => () => clearClose(), []);

  useEffect(() => {
    if (openIndex === null) return;
    const idx = openIndex;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerRefs.current[idx]?.focus();
        setOpenIndex(null);
      }
    };
    const onClick = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenIndex(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [openIndex]);

  return (
    <nav
      ref={rootRef}
      aria-label="Primary"
      onPointerLeave={scheduleClose}
      onPointerEnter={clearClose}
      className={cn(
        "relative rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
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

        <div className="hidden items-center gap-0.5 lg:flex">
          {items.map((item, i) =>
            item.menu ? (
              <div key={item.label} onPointerEnter={() => { clearClose(); setOpenIndex(i); }}>
                <button
                  ref={(el) => {
                    triggerRefs.current[i] = el;
                  }}
                  type="button"
                  aria-expanded={openIndex === i}
                  aria-controls={`mega-panel-${i}`}
                  onClick={() => setOpenIndex((cur) => (cur === i ? null : i))}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors",
                    openIndex === i
                      ? "bg-background text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      openIndex === i && "rotate-180",
                    )}
                  />
                </button>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href ?? "#"}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {signInLabel}
          </a>
          <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90">
            {ctaLabel}
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="grid size-9 place-items-center rounded-lg border border-border text-foreground lg:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Desktop mega panel */}
      <AnimatePresence>
        {openIndex !== null && items[openIndex]?.menu && (
          <motion.div
            key={openIndex}
            id={`mega-panel-${openIndex}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-3 right-3 top-full z-50 mt-2 hidden lg:block"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-2xl shadow-black/20">
              <div
                className={cn(
                  "grid gap-2",
                  items[openIndex]!.menu!.featured
                    ? "md:grid-cols-[1fr_18rem]"
                    : "md:grid-cols-1",
                )}
              >
                <ul className="grid gap-1 sm:grid-cols-2">
                  {items[openIndex]!.menu!.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href ?? "#"}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-background"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-brand-ink transition-colors group-hover:border-border-strong">
                          {link.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground">
                            {link.label}
                          </span>
                          <span className="block truncate text-xs text-muted">
                            {link.description}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                {items[openIndex]!.menu!.featured && (
                  <a
                    href={items[openIndex]!.menu!.featured!.href ?? "#"}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-gradient-to-br from-brand/15 via-brand-2/10 to-transparent p-4"
                  >
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-2 py-0.5 text-[11px] font-medium text-brand-ink">
                        <Sparkles className="size-3" />
                        New
                      </span>
                      <h4 className="mt-3 text-sm font-semibold text-foreground">
                        {items[openIndex]!.menu!.featured!.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted">
                        {items[openIndex]!.menu!.featured!.description}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground">
                      {items[openIndex]!.menu!.featured!.ctaLabel}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile stacked menu */}
      {mobileOpen && (
        <div className="border-t border-border px-3 py-3 lg:hidden">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.label}>
                {item.menu ? (
                  <>
                    <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-2">
                      {item.label}
                    </p>
                    <ul className="mt-1.5 flex flex-col">
                      {item.menu.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href ?? "#"}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-background"
                          >
                            <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-brand-ink">
                              {link.icon}
                            </span>
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={item.href ?? "#"}
                    className="block rounded-lg px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 border-t border-border pt-3">
              <a
                href="#"
                className="rounded-full border border-border px-4 py-2 text-center text-sm font-medium text-foreground"
              >
                {signInLabel}
              </a>
              <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
