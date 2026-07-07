import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubcategoryCard } from "@/components/showcase/subcategory-card";
import { categories } from "@/registry";
import { groupItems } from "@/registry/subcategories";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const found = categories.find((c) => c.id === category);
  return {
    title: found ? `${found.label} — ONONC` : "ONONC",
    description: found?.blurb,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const found = categories.find((c) => c.id === category);
  if (!found) notFound();

  const groups = groupItems(found);

  return (
    <section className="py-10">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {found.label}
      </h1>
      <p className="mt-2 max-w-2xl text-pretty text-muted">{found.blurb}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => {
          const lead = group.items[0];
          return (
            <SubcategoryCard
              key={group.id}
              href={`/${found.id}/group-${group.id}`}
              label={group.label}
              count={group.items.length}
              names={group.items.map((item) => item.name)}
              preview={lead?.preview}
              bleed={lead?.bleed}
            />
          );
        })}
      </div>
    </section>
  );
}
