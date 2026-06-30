import { backgrounds } from "@/registry/backgrounds";
import { blocks } from "@/registry/blocks";
import { text } from "@/registry/text";
import { ui } from "@/registry/ui";
import type { Category } from "@/registry/types";

/** All component categories, in showcase order. */
export const categories: Category[] = [backgrounds, text, ui, blocks];

/** Total number of components across all categories. */
export const componentCount = categories.reduce(
  (sum, category) => sum + category.items.length,
  0,
);
