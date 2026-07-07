import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ComponentGrid } from "@/components/showcase/component-grid";
import { readSources } from "@/lib/source";
import { findSubcategory } from "@/registry/subcategory-routing";

/**
 * A sub-category listing page (`/[category]/group-<subId>`): the components of a
 * single sub-group, rendered with the shared `ComponentGrid`. Reached from the
 * category landing page's sub-category cards and the sidebar sub-nav.
 */
export async function SubcategoryView({
  categoryId,
  subId,
}: {
  categoryId: string;
  subId: string;
}) {
  const found = findSubcategory(categoryId, subId);
  if (!found) notFound();

  const { category, group } = found;
  const code = await readSources(group.items);
  const isBlocks = category.id === "blocks";

  return (
    <section className="py-10">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-muted"
      >
        <Link
          href={`/${category.id}`}
          className="transition-colors hover:text-foreground"
        >
          {category.label}
        </Link>
        <ChevronRight className="size-3.5 text-muted-2" aria-hidden />
        <span className="text-foreground">{group.label}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {group.label}
      </h1>
      <p className="mt-2 max-w-2xl text-pretty text-muted">
        {group.items.length}{" "}
        {group.items.length === 1 ? "component" : "components"} in{" "}
        {category.label}.
      </p>

      <div className="mt-10">
        <ComponentGrid
          categoryId={category.id}
          items={group.items}
          code={code}
          isBlocks={isBlocks}
          headingLevel="h2"
        />
      </div>
    </section>
  );
}
