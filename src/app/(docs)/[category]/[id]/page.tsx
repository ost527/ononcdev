import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ComponentPlayground } from "@/components/showcase/component-playground";
import { readSource } from "@/lib/source";
import { detailPageParams, findComponent } from "@/registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return detailPageParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}): Promise<Metadata> {
  const { category, id } = await params;
  const found = findComponent(category, id);
  if (!found) return { title: "ONONC" };
  return {
    title: `${found.item.name} — ONONC`,
    description: found.item.description,
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const found = findComponent(category, id);
  if (!found) notFound();

  const { category: cat, item } = found;
  const code = await readSource(item.sourcePath);

  return (
    <section className="py-10">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-muted"
      >
        <Link
          href={`/${cat.id}`}
          className="transition-colors hover:text-foreground"
        >
          {cat.label}
        </Link>
        <ChevronRight className="size-3.5 text-muted-2" aria-hidden />
        <span className="text-foreground">{item.name}</span>
      </nav>

      <div className="mt-4 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {item.name}
        </h1>
        <p className="max-w-2xl text-pretty text-muted">{item.description}</p>
        {item.tags?.length ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-8">
        <ComponentPlayground
          key={`${cat.id}/${item.id}`}
          meta={{
            id: item.id,
            category: cat.id,
            categoryLabel: cat.label,
            name: item.name,
            description: item.description,
            tags: item.tags,
            bleed: item.bleed,
          }}
          code={code}
          fallbackPreview={item.preview}
        />
      </div>
    </section>
  );
}
