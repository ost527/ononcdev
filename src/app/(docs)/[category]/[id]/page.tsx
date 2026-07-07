import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ComponentPlayground } from "@/components/showcase/component-playground";
import { CopyForAi } from "@/components/showcase/copy-for-ai";
import { SubcategoryView } from "./subcategory-view";
import { readSource } from "@/lib/source";
import { absoluteUrl } from "@/lib/site";
import { detailPageParams, findComponent } from "@/registry";
import {
  findSubcategory,
  isSubcategoryId,
  subcategoryParams,
} from "@/registry/subcategory-routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...subcategoryParams(), ...detailPageParams()];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}): Promise<Metadata> {
  const { category, id } = await params;

  if (isSubcategoryId(id)) {
    const sub = findSubcategory(category, id);
    if (!sub) return { title: "ONONC" };
    return {
      title: `${sub.group.label} — ${sub.category.label} — ONONC`,
      description: `${sub.group.label} — ${sub.group.items.length} ${sub.category.label} components with live previews and copy-paste source.`,
    };
  }

  const found = findComponent(category, id);
  if (!found) return { title: "ONONC" };
  return {
    title: `${found.item.name} — ONONC`,
    description: found.item.description,
  };
}

export default async function CategoryItemPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;

  // A `group-*` id addresses a sub-category listing; anything else is a
  // component detail page (or a 404 under dynamicParams=false).
  if (isSubcategoryId(id)) {
    return <SubcategoryView categoryId={category} subId={id} />;
  }

  const found = findComponent(category, id);
  if (!found) notFound();

  const { category: cat, item } = found;
  const code = await readSource(item.sourcePath);

  const aiPrompt = [
    `Add the ONONC "${item.name}" component to my project.`,
    "",
    "Install with the shadcn CLI:",
    `npx shadcn@latest add ${absoluteUrl(`/r/${item.id}.json`)}`,
    "",
    "This installs the component, its internal imports (including the cn helper), and ONONC's Tailwind v4 design tokens + keyframes (written into your globals.css) — so it renders styled with no extra setup.",
    `If you paste the source by hand instead, install the tokens once too: npx shadcn@latest add ${absoluteUrl("/r/ononc-theme.json")}`,
    "",
    `Docs: ${absoluteUrl(`/${cat.id}/${item.id}`)}`,
    `All components: ${absoluteUrl("/llms.txt")}`,
    "",
    `Source — src/${item.sourcePath}:`,
    "```tsx",
    code.trimEnd(),
    "```",
  ].join("\n");

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
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
          <CopyForAi prompt={aiPrompt} />
          <p className="text-xs text-muted">
            Styled with ONONC&apos;s{" "}
            <Link
              href="/introduction#design-tokens"
              className="text-brand-ink underline-offset-2 hover:underline"
            >
              design tokens
            </Link>{" "}
            — <code className="font-mono">shadcn add</code> installs them for
            you.
          </p>
        </div>
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
            sourcePath: item.sourcePath,
            bleed: item.bleed,
          }}
          code={code}
          fallbackPreview={item.preview}
        />
      </div>
    </section>
  );
}
