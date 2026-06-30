"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Bell, ChevronRight, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavbarDashboardProps {
  brand?: string;
  breadcrumb?: string[];
  tabs?: string[];
  userName?: string;
  notificationCount?: number;
  className?: string;
}

const DEFAULT_BREADCRUMB = ["Projects", "Acme Inc.", "Website redesign"];
const DEFAULT_TABS = ["Overview", "Activity", "Members", "Settings"];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * NavbarDashboard — an application header with a breadcrumb trail, a search and
 * notification cluster, and a secondary tab row whose underline slides to the
 * active tab (shared-layout `layoutId`, scoped with `useId`, disabled under
 * reduced-motion). The breadcrumb marks its last crumb `aria-current="page"`;
 * tabs expose `aria-current` and the row scrolls horizontally on small screens.
 */
export function NavbarDashboard({
  brand = "ONONC",
  breadcrumb = DEFAULT_BREADCRUMB,
  tabs = DEFAULT_TABS,
  userName = "Avery Quinn",
  notificationCount = 2,
  className,
}: NavbarDashboardProps) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <header
      className={cn(
        "rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <a href="#" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          <span className="hidden sm:inline">{brand}</span>
        </a>

        <div className="hidden h-6 w-px bg-border sm:block" />

        <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
          <ol className="flex items-center gap-1 overflow-hidden">
            {breadcrumb.map((crumb, i) => {
              const isLast = i === breadcrumb.length - 1;
              return (
                <li key={crumb} className="flex min-w-0 items-center gap-1">
                  {i > 0 && (
                    <ChevronRight className="size-3.5 shrink-0 text-muted-2" aria-hidden />
                  )}
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="truncate text-sm font-medium text-foreground"
                    >
                      {crumb}
                    </span>
                  ) : (
                    <a
                      href="#"
                      className={cn(
                        "truncate text-sm text-muted transition-colors hover:text-foreground",
                        i === 0 ? "hidden sm:inline" : "",
                      )}
                    >
                      {crumb}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <label className="relative hidden md:block">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search…"
              className="h-9 w-40 rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus-visible:border-border-strong"
            />
          </label>
          <button
            type="button"
            aria-label={`Notifications, ${notificationCount} unread`}
            className="relative grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
          >
            <Bell className="size-4" />
            {notificationCount > 0 && (
              <span
                aria-hidden
                className="absolute right-1.5 top-1.5 size-2 rounded-full bg-brand-3 ring-2 ring-surface"
              />
            )}
          </button>
          <span
            role="img"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-xs font-semibold text-white"
            aria-label={userName}
            title={userName}
          >
            {initials(userName)}
          </span>
        </div>
      </div>

      <nav
        aria-label="Secondary"
        className="flex items-center gap-1 overflow-x-auto border-t border-border px-2"
      >
        {tabs.map((tab, i) => {
          const isActive = active === i;
          return (
            <button
              key={tab}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActive(i)}
              className={cn(
                "relative shrink-0 px-3 py-2.5 text-sm transition-colors",
                isActive ? "text-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {tab}
              {isActive && (
                <motion.span
                  layoutId={`${baseId}-dash-tab`}
                  aria-hidden
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-brand to-brand-2"
                  transition={
                    reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
