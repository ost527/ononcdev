"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  Check,
  ChevronDown,
  CreditCard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AppMenuItem {
  label: string;
  icon?: ReactNode;
  onSelect?: () => void;
  danger?: boolean;
  selected?: boolean;
  separatorBefore?: boolean;
}

interface MenuProps {
  triggerContent: ReactNode;
  triggerClassName?: string;
  triggerLabel: string;
  menuLabel: string;
  items: AppMenuItem[];
  align?: "start" | "end";
}

/**
 * MenuButton — a self-contained, accessible menu button. Opens on click/Enter,
 * moves focus with ↑/↓/Home/End, selects with Enter, closes on Escape
 * (returning focus to the trigger) or outside click.
 */
function MenuButton({
  triggerContent,
  triggerClassName,
  triggerLabel,
  menuLabel,
  items,
  align = "end",
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onClick);
    return () => document.removeEventListener("pointerdown", onClick);
  }, [open]);

  useEffect(() => {
    if (open) itemRefs.current[active]?.focus();
  }, [open, active]);

  const openMenu = () => {
    const selected = items.findIndex((it) => it.selected);
    setActive(selected >= 0 ? selected : 0);
    setOpen(true);
  };
  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const onMenuKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => (a + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => (a - 1 + items.length) % items.length);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(items.length - 1);
        break;
      case "Tab":
        // APG: Tab closes the menu and lets focus move on naturally.
        close(false);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={triggerLabel}
        onClick={() => (open ? close(false) : openMenu())}
        className={triggerClassName}
      >
        {triggerContent}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={menuLabel}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            onKeyDown={onMenuKey}
            className={cn(
              "absolute top-full z-50 mt-2 min-w-56 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-2xl shadow-black/25",
              align === "end" ? "right-0" : "left-0",
            )}
          >
            {items.map((item, i) => (
              <div key={item.label}>
                {item.separatorBefore && (
                  <div className="my-1 h-px bg-border" role="separator" />
                )}
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  role={item.selected !== undefined ? "menuitemradio" : "menuitem"}
                  aria-checked={item.selected}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => {
                    item.onSelect?.();
                    close();
                  }}
                  onPointerMove={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors",
                    i === active && "bg-brand/15",
                    item.danger ? "text-brand-3" : "text-foreground",
                  )}
                >
                  {item.icon && <span className="grid size-4 shrink-0 place-items-center">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                  {item.selected && <Check className="size-4 text-brand-ink" />}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface AppNavItem {
  label: string;
  href?: string;
}

export interface NavbarAppProps {
  brand?: string;
  items?: AppNavItem[];
  workspaces?: string[];
  userName?: string;
  notificationCount?: number;
  className?: string;
}

const DEFAULT_ITEMS: AppNavItem[] = [
  { label: "Overview" },
  { label: "Projects" },
  { label: "Analytics" },
  { label: "Settings" },
];
const DEFAULT_WORKSPACES = ["Acme Inc.", "ONONC Labs", "Personal"];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * NavbarApp — a product/dashboard top bar: brand, a workspace switcher menu, a
 * keyboard-hinted search field, primary navigation, a notification button with
 * an unread badge, and an avatar profile menu. Both menus are fully accessible;
 * navigation collapses behind a toggle on small screens.
 */
export function NavbarApp({
  brand = "ONONC",
  items = DEFAULT_ITEMS,
  workspaces = DEFAULT_WORKSPACES,
  userName = "Avery Quinn",
  notificationCount = 3,
  className,
}: NavbarAppProps) {
  const [activeNav, setActiveNav] = useState(0);
  const [workspace, setWorkspace] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const workspaceItems: AppMenuItem[] = [
    ...workspaces.map((w, i) => ({
      label: w,
      selected: i === workspace,
      onSelect: () => setWorkspace(i),
    })),
    {
      label: "Create workspace",
      icon: <Plus className="size-4" />,
      separatorBefore: true,
    },
  ];

  const avatarItems: AppMenuItem[] = [
    { label: "Profile", icon: <User className="size-4" /> },
    { label: "Settings", icon: <Settings className="size-4" /> },
    { label: "Billing", icon: <CreditCard className="size-4" /> },
    { label: "Sign out", icon: <LogOut className="size-4" />, danger: true, separatorBefore: true },
  ];

  return (
    <header
      className={cn(
        "rounded-2xl border border-border bg-surface/70 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
        <a href="#" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          <span className="hidden sm:inline">{brand}</span>
        </a>

        <div className="hidden h-6 w-px bg-border sm:block" />

        <div className="hidden sm:block">
          <MenuButton
            menuLabel="Switch workspace"
            triggerLabel={`Current workspace: ${workspaces[workspace]}. Switch workspace`}
            align="start"
            triggerClassName="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-background"
            triggerContent={
              <>
                {workspaces[workspace]}
                <ChevronDown className="size-3.5 text-muted" />
              </>
            }
            items={workspaceItems}
          />
        </div>

        <nav aria-label="Primary" className="ml-1 hidden items-center gap-0.5 lg:flex">
          {items.map((item, i) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              aria-current={activeNav === i ? "page" : undefined}
              onClick={() => setActiveNav(i)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm transition-colors",
                activeNav === i
                  ? "bg-background font-medium text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* Search: full field on md+, icon button below */}
          <label className="relative hidden md:block">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search…"
              className="h-9 w-44 rounded-lg border border-border bg-background pl-9 pr-12 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus-visible:border-border-strong lg:w-56"
            />
            <kbd
              aria-hidden
              className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted lg:inline-flex"
            >
              ⌘K
            </kbd>
          </label>
          <button
            type="button"
            aria-label="Search"
            className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground md:hidden"
          >
            <Search className="size-4" />
          </button>

          <button
            type="button"
            aria-label={`Notifications, ${notificationCount} unread`}
            className="relative grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
          >
            <Bell className="size-4" />
            {notificationCount > 0 && (
              <span
                aria-hidden
                className="absolute right-1.5 top-1.5 grid min-w-4 place-items-center rounded-full bg-brand-3 px-1 text-[10px] font-semibold leading-4 text-white"
              >
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>

          <MenuButton
            menuLabel="Account"
            triggerLabel={`Account menu for ${userName}`}
            triggerClassName="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-xs font-semibold text-white outline-none ring-brand/60 transition-shadow hover:ring-2 focus-visible:ring-2"
            triggerContent={initials(userName)}
            items={avatarItems}
          />

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg border border-border text-foreground lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Primary"
          className="flex flex-col gap-1 border-t border-border px-3 py-3 lg:hidden"
        >
          {items.map((item, i) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              aria-current={activeNav === i ? "page" : undefined}
              onClick={() => {
                setActiveNav(i);
                setMobileOpen(false);
              }}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors",
                activeNav === i
                  ? "bg-background font-medium text-foreground"
                  : "text-muted hover:bg-background hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
