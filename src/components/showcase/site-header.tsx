import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/showcase/theme-toggle";
import { categories, componentCount } from "@/registry";

/** Sticky top navigation: brand, per-category anchors, and component count. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
            <Sparkles className="size-4" />
          </span>
          <span className="font-semibold">Lumen UI</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {category.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted sm:block">
            {componentCount} components
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
