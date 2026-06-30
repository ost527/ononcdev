"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavCategory {
  id: string;
  label: string;
  count: number;
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
        className="sticky top-20 space-y-1 py-8 pr-4"
      >
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className={cn(linkBase, pathname === "/" ? linkActive : linkIdle)}
        >
          Overview
        </Link>
        <p className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-2">
          Components
        </p>
        {nav.map((category) => {
          const href = `/${category.id}`;
          const active = pathname === href;
          return (
            <Link
              key={category.id}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(linkBase, active ? linkActive : linkIdle)}
            >
              <span>{category.label}</span>
              <span className="rounded-full border border-border px-1.5 text-[11px] text-muted">
                {category.count}
              </span>
            </Link>
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
        href="/"
        className={cn(
          "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors",
          pathname === "/" ? "bg-brand text-white" : "text-muted hover:text-foreground",
        )}
      >
        Overview
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
