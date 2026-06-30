import { describe, expect, it } from "vitest";
import { categories } from "@/registry";
import { groupItems } from "@/registry/subcategories";

describe("subcategory grouping", () => {
  for (const category of categories) {
    describe(category.id, () => {
      const groups = groupItems(category);

      it("partitions every item exactly once", () => {
        const grouped = groups.flatMap((g) => g.items);
        expect(grouped).toHaveLength(category.items.length);

        const groupedIds = new Set(grouped.map((i) => i.id));
        expect(groupedIds.size).toBe(category.items.length);
        for (const item of category.items) {
          expect(groupedIds.has(item.id)).toBe(true);
        }
      });

      it("classifies every current item (no 'More' fallback)", () => {
        expect(groups.find((g) => g.id === "more")).toBeUndefined();
      });

      it("uses unique ids and non-empty labels / groups", () => {
        const ids = groups.map((g) => g.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const g of groups) {
          expect(g.id).toBeTruthy();
          expect(g.label).toBeTruthy();
          expect(g.items.length).toBeGreaterThan(0);
        }
      });
    });
  }
});

describe("subcategory mapping rules", () => {
  const groupOf = (catId: string, slug: string) => {
    const category = categories.find((c) => c.id === catId);
    if (!category) throw new Error(`unknown category ${catId}`);
    return groupItems(category).find((g) =>
      g.items.some((i) => i.sourcePath.endsWith(`/${slug}.tsx`)),
    )?.id;
  };

  it("groups blocks by family prefix", () => {
    expect(groupOf("blocks", "hero-split")).toBe("heroes");
    expect(groupOf("blocks", "navbar-floating")).toBe("navbars");
    expect(groupOf("blocks", "pricing")).toBe("pricing");
    expect(groupOf("blocks", "footer-block")).toBe("sections");
  });

  it("groups curated items into their sub-group", () => {
    expect(groupOf("backgrounds", "particle-field")).toBe("particles");
    expect(groupOf("ui", "modal")).toBe("overlays");
    expect(groupOf("text", "count-up")).toBe("numbers");
  });
});
