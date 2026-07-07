import { categories, type ComponentParam } from "@/registry";
import { groupItems, type SubGroup } from "@/registry/subcategories";
import type { Category } from "@/registry/types";

/**
 * Sub-category listing routes.
 *
 * A category page (`/[category]`) shows a card per sub-group; each card opens a
 * sub-category listing page that reuses the shared `/[category]/[id]` route with
 * a reserved `group-` id prefix (e.g. `/backgrounds/group-particles`). The
 * prefix is collision-free: no real component id starts with `group-` (asserted
 * in the tests), so the detail route can branch on it without clashing with a
 * component slug. Sub-group membership itself is defined by `groupItems()` in
 * `subcategories.ts`; this module only maps sub-groups to/from route params.
 *
 * This module imports from `@/registry` (index) but the index never imports it,
 * so there is no cycle.
 */

/** URL prefix that marks a `/[category]/[id]` `id` as a sub-category listing. */
export const SUBCATEGORY_PREFIX = "group-";

/** Whether a `/[category]/[id]` `id` segment addresses a sub-category page. */
export function isSubcategoryId(id: string): boolean {
  return id.startsWith(SUBCATEGORY_PREFIX);
}

/**
 * Every `{ category, id }` pair for a sub-category listing page, where `id` is
 * `group-<subId>`. One entry per rendered sub-group in every category (blocks
 * included, since blocks are browsed by sub-group too). Feeds
 * `generateStaticParams` on the `/[category]/[id]` route alongside
 * `detailPageParams()`; the two sets are disjoint by the `group-` prefix.
 */
export function subcategoryParams(): ComponentParam[] {
  return categories.flatMap((category) =>
    groupItems(category).map((group) => ({
      category: category.id,
      id: `${SUBCATEGORY_PREFIX}${group.id}`,
    })),
  );
}

/**
 * Resolve a category id + a `group-<subId>` id to its `Category` and `SubGroup`,
 * or `null` when the id is not a sub-category id or either lookup fails. Used by
 * the `/[category]/[id]` route + its metadata to render a sub-category listing.
 */
export function findSubcategory(
  categoryId: string,
  id: string,
): { category: Category; group: SubGroup } | null {
  if (!isSubcategoryId(id)) return null;
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return null;
  const subId = id.slice(SUBCATEGORY_PREFIX.length);
  const group = groupItems(category).find((g) => g.id === subId);
  return group ? { category, group } : null;
}
