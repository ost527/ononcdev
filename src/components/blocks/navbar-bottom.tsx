"use client";

import { type ReactNode, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Bell, Home, Plus, Search, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BottomTab {
  label: string;
  icon: ReactNode;
}

export interface NavbarBottomProps {
  brand?: string;
  tabs?: BottomTab[];
  actionLabel?: string;
  className?: string;
}

const DEFAULT_TABS: BottomTab[] = [
  { label: "Home", icon: <Home className="size-5" /> },
  { label: "Search", icon: <Search className="size-5" /> },
  { label: "Activity", icon: <Bell className="size-5" /> },
  { label: "Profile", icon: <User className="size-5" /> },
];

/**
 * NavbarBottom — a mobile app-style bottom tab bar with a raised center action.
 * The active tab is colored and carries a sliding indicator bar (shared-layout
 * `layoutId`, scoped with `useId`, disabled under reduced-motion); tabs expose
 * aria-current. Shown inside a phone-style frame for preview.
 */
export function NavbarBottom({
  brand = "Lumen",
  tabs = DEFAULT_TABS,
  actionLabel = "Create",
  className,
}: NavbarBottomProps) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  const tabButton = (tab: BottomTab, i: number) => {
    const isActive = active === i;
    return (
      <button
        key={tab.label}
        type="button"
        aria-current={isActive ? "page" : undefined}
        onClick={() => setActive(i)}
        className={cn(
          "relative flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[11px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/60",
          isActive ? "text-brand-ink" : "text-muted hover:text-foreground",
        )}
      >
        {isActive && (
          <motion.span
            layoutId={`${baseId}-tab`}
            aria-hidden
            className="absolute -top-2 h-1 w-8 rounded-full bg-gradient-to-r from-brand to-brand-2"
            transition={
              reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
            }
          />
        )}
        {tab.icon}
        {tab.label}
      </button>
    );
  };

  return (
    <div
      className={cn(
        "mx-auto flex min-h-[24rem] max-w-sm flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl shadow-black/20",
        className,
      )}
    >
      {/* Faux app screen */}
      <div className="flex items-center justify-between px-5 pb-2 pt-4">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid size-6 place-items-center rounded-md bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-3.5" />
          </span>
          {brand}
        </span>
        <span className="size-7 rounded-full bg-gradient-to-br from-brand to-brand-2" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col px-5 py-4">
        <h2 className="text-2xl font-semibold tracking-tight">{tabs[active]?.label}</h2>
        <p className="mt-1 text-sm text-muted">
          Tap a tab — the indicator glides across and the center button stays put
          for the primary action.
        </p>
        <div className="mt-4 grid flex-1 gap-3">
          <div className="rounded-2xl border border-border bg-surface/60" />
          <div className="rounded-2xl border border-border bg-surface/60" />
        </div>
      </div>

      {/* Bottom tab bar */}
      <nav
        aria-label="Bottom navigation"
        className="relative flex items-center border-t border-border bg-surface/80 px-4 pb-3 pt-2 backdrop-blur-xl"
      >
        <div className="flex flex-1 justify-around">
          {tabs.slice(0, 2).map((tab, i) => tabButton(tab, i))}
        </div>
        <div className="w-16 shrink-0" aria-hidden />
        <div className="flex flex-1 justify-around">
          {tabs.slice(2).map((tab, i) => tabButton(tab, i + 2))}
        </div>

        <button
          type="button"
          aria-label={actionLabel}
          className="absolute -top-5 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg shadow-brand/30 outline-none transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-95"
        >
          <Plus className="size-6" />
        </button>
      </nav>
    </div>
  );
}
