import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentShowcase } from "@/components/showcase/component-showcase";
import { readSources } from "@/lib/source";
import { categories, componentHasDetailPage } from "@/registry";
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

  const code = await readSources(found.items);
  const isBlocks = found.id === "blocks";
  const groups = groupItems(found);

  return (
    <section className="py-10">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {found.label}
      </h1>
      <p className="mt-2 max-w-2xl text-pretty text-muted">{found.blurb}</p>

      <div className="mt-10 space-y-16">
        {groups.map((group) => (
          <section
            key={group.id}
            id={`group-${group.id}`}
            aria-labelledby={`group-${group.id}-label`}
            className="scroll-mt-24"
          >
            <div className="flex items-center gap-2.5 border-b border-border pb-2">
              <h2
                id={`group-${group.id}-label`}
                className="text-2xl font-semibold tracking-tight"
              >
                {group.label}
              </h2>
              <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium tabular-nums text-muted">
                {group.items.length}
              </span>
            </div>
            <div
              className={
                isBlocks
                  ? "mt-6 space-y-16"
                  : "mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              }
            >
              {group.items.map((item) => {
                const detail = componentHasDetailPage(found.id, item.id);
                return (
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
                    customizable={detail}
                    previewClassName={item.previewClassName}
                    href={detail ? `/${found.id}/${item.id}` : undefined}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
