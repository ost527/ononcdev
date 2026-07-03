import Link from "next/link";
import { ThemeToggle } from "@/components/showcase/theme-toggle";
import { categories, componentCount } from "@/registry";

/** Sticky top navigation: brand, per-category route links, count, theme toggle. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="site-shell flex h-16 items-center justify-between gap-4 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)_auto]">
        <Link
          href="/"
          className="flex items-center text-lg font-bold tracking-tight transition-opacity hover:opacity-80 lg:pl-3"
        >
          ONONC
        </Link>
        <nav className="hidden items-center gap-1 md:flex lg:justify-center">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {category.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 lg:justify-end">
          <span className="hidden text-sm text-muted sm:block">
            {componentCount} components
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
