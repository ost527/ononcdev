import { backgrounds } from "@/registry/backgrounds";
import { blocks } from "@/registry/blocks";
import { text } from "@/registry/text";
import { ui } from "@/registry/ui";
import { isCustomizable } from "@/registry/customizable";
import type { Category, RegistryItem } from "@/registry/types";

/** All component categories, in showcase order. */
export const categories: Category[] = [backgrounds, text, ui, blocks];

/** Total number of components across all categories. */
export const componentCount = categories.reduce(
  (sum, category) => sum + category.items.length,
  0,
);

/** A static route param for a single component detail page. */
export interface ComponentParam {
  category: string;
  id: string;
}

/** Categories whose components do NOT get a standalone detail page. */
const NO_DETAIL_CATEGORIES = new Set<string>(["blocks"]);

/**
 * Whether a category's components get a standalone `/[category]/[id]` detail
 * (playground) page. Block sections are composed page sections and are
 * showcased inline only — they have no detail page.
 */
export function hasDetailPage(categoryId: string): boolean {
  return !NO_DETAIL_CATEGORIES.has(categoryId);
}

/**
 * Every `{ category, id }` pair, for `generateStaticParams` on the
 * `/[category]/[id]` detail route. One entry per component.
 */
export function allComponentParams(): ComponentParam[] {
  return categories.flatMap((category) =>
    category.items.map((item) => ({ category: category.id, id: item.id })),
  );
}

/**
 * Whether a specific component gets a standalone `/[category]/[id]` detail
 * (playground) page. A detail page only exists when the component has live
 * Customize controls — components with nothing to customize are shown inline on
 * the category grid only. Categories with no detail page at all (blocks) are
 * excluded regardless.
 */
export function componentHasDetailPage(
  categoryId: string,
  id: string,
): boolean {
  return hasDetailPage(categoryId) && isCustomizable(id);
}

/**
 * The `{ category, id }` pairs that actually get a detail page: every
 * customizable component in a detail-page category. Powers
 * `generateStaticParams` on the `/[category]/[id]` route.
 */
export function detailPageParams(): ComponentParam[] {
  return allComponentParams().filter((p) =>
    componentHasDetailPage(p.category, p.id),
  );
}

/**
 * Resolve a category id + component id to its `Category` and `RegistryItem`,
 * or `null` if either is unknown. Used by the detail route + its metadata.
 */
export function findComponent(
  categoryId: string,
  id: string,
): { category: Category; item: RegistryItem } | null {
  const category = categories.find((c) => c.id === categoryId);
  const item = category?.items.find((i) => i.id === id);
  return category && item ? { category, item } : null;
}
