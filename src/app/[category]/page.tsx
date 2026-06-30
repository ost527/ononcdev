import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentShowcase } from "@/components/showcase/component-showcase";
import { readSources } from "@/lib/source";
import { categories } from "@/registry";

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
    title: found ? `${found.label} — Lumen UI` : "Lumen UI",
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

  const code = await readSources(found.items);
  const isBlocks = found.id === "blocks";

  return (
    <section className="py-10">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {found.label}
      </h1>
      <p className="mt-2 max-w-2xl text-pretty text-muted">{found.blurb}</p>
      <div
        className={
          isBlocks
            ? "mt-10 space-y-16"
            : "mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        }
      >
        {found.items.map((item) => (
          <ComponentShowcase
            key={item.id}
            name={item.name}
            description={item.description}
            code={code[item.id] ?? ""}
            preview={item.preview}
            tags={item.tags}
            layout={isBlocks ? "block" : "card"}
            frameClassName={item.frameClassName}
            bleed={item.bleed}
          />
        ))}
      </div>
    </section>
  );
}
