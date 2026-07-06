"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export interface MobileMenuItem {
  id: string;
  label: string;
}

/**
 * MobileMenu — a hamburger button (shown only below the `md` breakpoint, where
 * the header's inline category nav is hidden) that opens a right-side Drawer
 * mirroring that nav. Reuses the library's own {@link Drawer} for Escape /
 * backdrop close, body-scroll lock, and focus management. Each link closes the
 * drawer on navigation and reflects the active route.
 */
export function MobileMenu({ items }: { items: MobileMenuItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground md:hidden"
      >
        <Menu className="size-4" />
      </button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        side="right"
        title="Menu"
      >
        <nav aria-label="Primary" className="flex flex-col gap-1">
          {items.map((item) => {
            const href = `/${item.id}`;
            const active = pathname === href;
            return (
              <Link
                key={item.id}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-base transition-colors",
                  active
                    ? "bg-background font-medium text-foreground"
                    : "text-muted hover:bg-background hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Drawer>
    </>
  );
}
