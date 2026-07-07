"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

/** Left rail category navigation (desktop). */
export function Sidebar({ nav }: { nav: NavCategory[] }) {
  const pathname = usePathname();
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
          // The category landing page (cards) is the exact match; anything
          // deeper (`/cat/group-*` sub-category pages, `/cat/<id>` detail
          // pages) keeps the parent lit as the current-section trail.
          const onCategory = pathname === href;
          const underCategory = onCategory || pathname.startsWith(`${href}/`);
          const groups = category.groups ?? [];
          return (
            <div key={category.id}>
              <Link
                href={href}
                aria-current={onCategory ? "page" : undefined}
                className={cn(
                  linkBase,
                  "font-semibold",
                  underCategory ? "text-foreground" : linkIdle,
                  onCategory && "bg-surface",
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
                    const groupHref = `${href}/group-${group.id}`;
                    const groupActive = pathname === groupHref;
                    return (
                      <li key={group.id}>
                        <Link
                          href={groupHref}
                          aria-current={groupActive ? "page" : undefined}
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
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={category.id}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
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
