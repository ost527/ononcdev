import { ComponentShowcase } from "@/components/showcase/component-showcase";
import { componentHasDetailPage } from "@/registry";
import { isCustomizable } from "@/registry/customizable";
import type { RegistryItem } from "@/registry/types";

/**
 * Render a set of registry items as the showcase grid (cards) or, for blocks,
 * a full-width stacked list with inline Preview/Code tabs. Shared by the
 * sub-category listing page so the item presentation lives in one place.
 *
 * A detail page exists for every non-block component (so its code is always
 * viewable); the "Customizable" badge is shown only when the component actually
 * has live Customize controls.
 */
export function ComponentGrid({
  categoryId,
  items,
  code,
  isBlocks,
  headingLevel = "h3",
}: {
  categoryId: string;
  items: RegistryItem[];
  code: Record<string, string>;
  isBlocks: boolean;
  /** Heading tag for each card title; pass "h2" when the grid sits under a
   * page-level h1 so the heading order never skips a level. */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div
      className={
        isBlocks
          ? "space-y-16"
          : "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      }
    >
      {items.map((item) => {
        const detail = componentHasDetailPage(categoryId, item.id);
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
            customizable={isCustomizable(item.id)}
            headingLevel={headingLevel}
            previewClassName={item.previewClassName}
            previewPadding={item.previewPadding}
            previewBorder={item.previewBorder}
            href={detail ? `/${categoryId}/${item.id}` : undefined}
          />
        );
      })}
    </div>
  );
}
