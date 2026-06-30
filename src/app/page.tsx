import { FooterBlock } from "@/components/blocks/footer-block";
import { ComponentShowcase } from "@/components/showcase/component-showcase";
import { ShowcaseHero } from "@/components/showcase/showcase-hero";
import { SiteHeader } from "@/components/showcase/site-header";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "@/components/ui/toast";
import { readSources } from "@/lib/source";
import { categories, componentCount } from "@/registry";

export default async function Home() {
  const allItems = categories.flatMap((c) => c.items);
  const code = await readSources(allItems);

  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main id="top">
        <ShowcaseHero count={componentCount} />

        <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          {categories.map((category) => {
            const isBlocks = category.id === "blocks";
            return (
              <section
                key={category.id}
                id={category.id}
                className="scroll-mt-24 pt-20"
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {category.label}
                    </h2>
                    <p className="mt-2 max-w-2xl text-pretty text-muted">
                      {category.blurb}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border px-3 py-1 text-sm text-muted">
                    {category.items.length}
                  </span>
                </div>

                <div
                  className={cnGrid(isBlocks)}
                >
                  {category.items.map((item) => (
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
          })}
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <FooterBlock />
        </div>
      </main>
      <Toaster />
    </>
  );
}

function cnGrid(isBlocks: boolean) {
  return isBlocks
    ? "mt-10 space-y-16"
    : "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3";
}
