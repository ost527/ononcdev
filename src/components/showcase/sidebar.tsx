"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface NavSubGroup {
  id: string;
  label: string;
  count: number;
}

export interface NavCategory {
  id: string;
  label: string;
  count: number;
  groups?: NavSubGroup[];
}

const linkBase =
  "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors";
const linkIdle = "text-muted hover:bg-surface hover:text-foreground";
const linkActive = "bg-surface font-medium text-foreground";

/**
 * Scroll-spy: report which top-level category's `#group-<id>` section currently
 * sits in the upper viewport band, so the sidebar can spotlight the exact
 * sub-category the reader is on (not just the parent). Returns null when no
 * group is tracked (other pages) or before the first observer callback.
 */
function useActiveGroup(groupIds: string[]): string | null {
  const key = groupIds.join("|");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [trackedKey, setTrackedKey] = useState(key);

  // Reset the spotlight when the tracked category changes (render-phase reset,
  // per React's "adjust state on prop change" pattern) so a previous category's
  // group id never bleeds into the next page before the observer re-fires.
  if (key !== trackedKey) {
    setTrackedKey(key);
    setActiveId(null);
  }

  useEffect(() => {
    if (groupIds.length === 0) return;

    const tracked = groupIds
      .map((id) => ({ id, el: document.getElementById(`group-${id}`) }))
      .filter((x): x is { id: string; el: HTMLElement } => x.el !== null);
    if (tracked.length === 0) return;

    const order = new Map(tracked.map((t, i) => [t.id, i]));
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id.replace(/^group-/, "");
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        let topId: string | null = null;
        let topIdx = Infinity;
        for (const id of visible) {
          const idx = order.get(id) ?? Infinity;
          if (idx < topIdx) {
            topIdx = idx;
            topId = id;
          }
        }
        if (topId) setActiveId(topId);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );
    tracked.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return activeId;
}

/** Left rail category navigation (desktop). */
export function Sidebar({ nav }: { nav: NavCategory[] }) {
  const pathname = usePathname();
  const activeCategory = nav.find((c) => pathname === `/${c.id}`);
  const activeGroup = useActiveGroup(
    activeCategory?.groups?.map((g) => g.id) ?? [],
  );
  return (
    <aside className="hidden w-60 shrink-0 md:block">
      <nav
        aria-label="Categories"
        className="no-scrollbar sticky top-20 max-h-[calc(100dvh-5rem)] space-y-1 overflow-y-auto py-8 pr-4"
      >
        <Link
          href="/introduction"
          aria-current={pathname === "/introduction" ? "page" : undefined}
          className={cn(linkBase, pathname === "/introduction" ? linkActive : linkIdle)}
        >
          Introduction
        </Link>
        <p className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-2">
          Components
        </p>
        {nav.map((category) => {
          const href = `/${category.id}`;
          const active = pathname === href;
          const groups = category.groups ?? [];
          // On the active category, the spotlight moves to the sub-category in
          // view; the parent stays bold + foreground as the current-section
          // trail. Only the parent carries the spotlight when nothing (no
          // groups, or before the first scroll-spy hit) is tracked.
          const parentSpotlight = active && (groups.length === 0 || !activeGroup);
          return (
            <div key={category.id}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  linkBase,
                  "font-semibold",
                  active ? "text-foreground" : linkIdle,
                  parentSpotlight && "bg-surface",
                )}
              >
                <span>{category.label}</span>
                <span className="rounded-full border border-border px-1.5 text-[11px] text-muted">
                  {category.count}
                </span>
              </Link>
              {groups.length > 0 ? (
                <ul
                  aria-label={`${category.label} sub-categories`}
                  className="mb-1 ml-4 mt-0.5 space-y-0.5 border-l border-border pl-2"
                >
                  {groups.map((group) => {
                    const groupActive = active && activeGroup === group.id;
                    return (
                      <li key={group.id}>
                        <Link
                          href={`${href}#group-${group.id}`}
                          aria-current={groupActive ? "true" : undefined}
                          className={cn(
                            "flex items-center justify-between gap-2 rounded-md px-2 py-1 text-[13px] transition-colors",
                            groupActive
                              ? "bg-surface font-medium text-foreground"
                              : "text-muted hover:bg-surface hover:text-foreground",
                          )}
                        >
                          <span className="truncate">{group.label}</span>
                          <span className="shrink-0 text-[11px] text-muted-2">
                            {group.count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

/** Horizontal category pills (mobile). */
export function MobileNav({ nav }: { nav: NavCategory[] }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Categories"
      className="sticky top-16 z-30 -mx-4 mb-2 flex gap-1.5 overflow-x-auto border-b border-border bg-background/80 px-4 py-2 backdrop-blur md:hidden"
    >
      <Link
        href="/introduction"
        className={cn(
          "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors",
          pathname === "/introduction" ? "bg-brand text-white" : "text-muted hover:text-foreground",
        )}
      >
        Introduction
      </Link>
      {nav.map((category) => {
        const href = `/${category.id}`;
        const active = pathname === href;
        return (
          <Link
            key={category.id}
            href={href}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors",
              active ? "bg-brand text-white" : "text-muted hover:text-foreground",
            )}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
