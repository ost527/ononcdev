"use client";

import { type ReactNode, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  BarChart3,
  Folder,
  Inbox,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeft,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
  label: string;
  icon: ReactNode;
  badge?: number;
}

export interface NavbarSidebarProps {
  brand?: string;
  items?: SidebarNavItem[];
  userName?: string;
  userEmail?: string;
  className?: string;
}

const DEFAULT_ITEMS: SidebarNavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard className="size-4" /> },
  { label: "Projects", icon: <Folder className="size-4" /> },
  { label: "Inbox", icon: <Inbox className="size-4" />, badge: 5 },
  { label: "Analytics", icon: <BarChart3 className="size-4" /> },
  { label: "Settings", icon: <Settings className="size-4" /> },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * NavbarSidebar — a vertical navigation rail that collapses to an icon-only
 * strip. A single highlight slides between items (shared-layout `layoutId`,
 * disabled under reduced-motion); labels stay in the accessibility tree as
 * sr-only text when collapsed, and items expose aria-current. A user chip sits
 * at the foot. The surrounding content pane is demo scaffolding.
 */
export function NavbarSidebar({
  brand = "ONONC",
  items = DEFAULT_ITEMS,
  userName = "Avery Quinn",
  userEmail = "avery@ononc.dev",
  className,
}: NavbarSidebarProps) {
  const [active, setActive] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <div
      className={cn(
        "flex min-h-[24rem] overflow-hidden rounded-2xl border border-border bg-background",
        className,
      )}
    >
      <nav
        aria-label="Sidebar"
        className={cn(
          "flex flex-col border-r border-border bg-surface transition-[width] duration-300",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <div className="flex h-16 items-center gap-2 px-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-5" />
          </span>
          {!collapsed && <span className="truncate font-semibold">{brand}</span>}
        </div>

        <ul className="flex flex-1 flex-col gap-1 px-2 py-2">
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={isActive ? "page" : undefined}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/60",
                    collapsed && "justify-center",
                    isActive ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`${baseId}-active`}
                      aria-hidden
                      className="absolute inset-0 -z-0 rounded-lg border border-border bg-background"
                      transition={
                        reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative z-10 shrink-0 text-brand-ink">{item.icon}</span>
                  <span className={cn("relative z-10 flex-1 text-left", collapsed && "sr-only")}>
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <span
                      className={cn(
                        "relative z-10 grid min-w-5 place-items-center rounded-full bg-brand/15 px-1.5 text-[11px] font-medium text-brand-ink",
                        collapsed && "sr-only",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "mx-2 mb-2 flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-muted outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60",
            collapsed && "justify-center",
          )}
        >
          {collapsed ? (
            <PanelLeft className="size-4 shrink-0" />
          ) : (
            <PanelLeftClose className="size-4 shrink-0" />
          )}
          {!collapsed && <span>Collapse</span>}
        </button>

        <div className="flex items-center gap-2.5 border-t border-border p-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-[11px] font-semibold text-white">
            {initials(userName)}
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">
                {userName}
              </span>
              <span className="block truncate text-xs text-muted">{userEmail}</span>
            </span>
          )}
        </div>
      </nav>

      {/* Demo content pane */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>{brand}</span>
          <span aria-hidden>/</span>
          <span className="text-foreground">{items[active]?.label}</span>
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          {items[active]?.label}
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Collapse the rail with the toggle. The active highlight glides between
          items, and labels stay available to screen readers when collapsed.
        </p>
        <div className="mt-6 grid flex-1 grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-surface/60" />
          <div className="rounded-xl border border-border bg-surface/60" />
        </div>
      </div>
    </div>
  );
}
