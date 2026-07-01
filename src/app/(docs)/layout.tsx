import type { ReactNode } from "react";
import { MobileNav, Sidebar } from "@/components/showcase/sidebar";
import { categories } from "@/registry";
import { groupItems } from "@/registry/subcategories";

export default function CategoryLayout({ children }: { children: ReactNode }) {
  const nav = categories.map((c) => ({
    id: c.id,
    label: c.label,
    count: c.items.length,
    groups: groupItems(c).map((g) => ({
      id: g.id,
      label: g.label,
      count: g.items.length,
    })),
  }));

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 sm:px-6">
      <Sidebar nav={nav} />
      <div className="min-w-0 flex-1">
        <MobileNav nav={nav} />
        <main>{children}</main>
      </div>
    </div>
  );
}
