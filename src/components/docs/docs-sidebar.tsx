"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOCS_NAV, type DocsNavGroup } from "./docs-nav";

/** One collapsible group. Opens by default when it holds the current page. */
function GroupSection({ group }: { group: DocsNavGroup }) {
  const pathname = usePathname();
  const containsActive = group.items.some((item) => item.href === pathname);
  // null = follow the active route; true/false = user override for this page.
  const [override, setOverride] = useState<boolean | null>(null);
  // Reset the manual override on navigation (render-phase adjust-on-change) so
  // the group holding the current page always reopens and its active link is
  // never left hidden.
  const [seenPath, setSeenPath] = useState(pathname);
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    setOverride(null);
  }
  const open = override ?? containsActive;
  const listId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOverride(!open)}
        className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-brand/60"
      >
        <span>{group.label}</span>
        <ChevronDown
          className={cn(
            "size-4 text-muted transition-transform duration-200",
            open ? "rotate-0" : "-rotate-90",
          )}
          aria-hidden
        />
      </button>
      <ul
        id={listId}
        hidden={!open}
        className="mt-1 space-y-0.5 pl-3"
      >
        {group.items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block rounded-md px-3 py-1.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/60",
                  active
                    ? "bg-surface font-medium text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Left docs rail (desktop). */
export function DocsSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 md:block">
      <nav
        aria-label="Docs"
        className="no-scrollbar sticky top-20 max-h-[calc(100dvh-5rem)] space-y-1 overflow-y-auto py-8 pr-4"
      >
        {DOCS_NAV.map((group) => (
          <GroupSection key={group.label} group={group} />
        ))}
      </nav>
    </aside>
  );
}

/** Docs navigation as a disclosure (mobile). */
export function DocsMobileNav() {
  const pathname = usePathname();
  const current = DOCS_NAV.flatMap((g) => g.items).find(
    (item) => item.href === pathname,
  );

  return (
    <details className="mb-6 rounded-lg border border-border bg-surface md:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brand/60">
        <span>{current ? current.title : "Documentation"}</span>
        <ChevronDown className="size-4 text-muted" aria-hidden />
      </summary>
      <nav aria-label="Docs" className="border-t border-border px-2 pb-2">
        {DOCS_NAV.map((group) => (
          <div key={group.label} className="py-1">
            <p className="px-2 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted-2">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/60",
                        active
                          ? "bg-background font-medium text-foreground"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </details>
  );
}
