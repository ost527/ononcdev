import Link from "next/link";
import {
  ArrowRight,
  LayoutGrid,
  type LucideIcon,
  MousePointerClick,
  Sparkles,
  Type,
} from "lucide-react";
import { ShowcaseHero } from "@/components/showcase/showcase-hero";
import { categories, componentCount } from "@/registry";

const ICONS: Record<string, LucideIcon> = {
  backgrounds: Sparkles,
  text: Type,
  ui: MousePointerClick,
  blocks: LayoutGrid,
};

export default function Home() {
  return (
    <main>
      <ShowcaseHero count={componentCount} />

      <div className="site-shell pb-8">
        <section className="pt-16 sm:pt-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Browse by category
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-pretty text-muted">
              {componentCount} components across four categories. Open one to see
              live previews and copy the source.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {categories.map((category) => {
              const Icon = ICONS[category.id] ?? Sparkles;
              return (
                <Link
                  key={category.id}
                  href={`/${category.id}`}
                  className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-border bg-background text-brand-ink">
                      <Icon className="size-5" />
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
                      {category.items.length} components
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{category.label}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{category.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-ink">
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
