import { describe, expect, it } from "vitest";
import { categories, detailPageParams } from "@/registry";
import {
  findSubcategory,
  isSubcategoryId,
  SUBCATEGORY_PREFIX,
  subcategoryParams,
} from "@/registry/subcategory-routing";
import { groupItems } from "@/registry/subcategories";

describe("sub-category routing helpers", () => {
  it("isSubcategoryId only matches the reserved prefix", () => {
    expect(isSubcategoryId("group-particles")).toBe(true);
    expect(isSubcategoryId(`${SUBCATEGORY_PREFIX}heroes`)).toBe(true);
    expect(isSubcategoryId("aurora-background")).toBe(false);
    expect(isSubcategoryId("badge")).toBe(false);
    expect(isSubcategoryId("")).toBe(false);
  });

  it("emits one param per rendered sub-group across every category", () => {
    const expected = categories.reduce(
      (sum, category) => sum + groupItems(category).length,
      0,
    );
    const params = subcategoryParams();
    expect(params).toHaveLength(expected);
    for (const p of params) {
      expect(isSubcategoryId(p.id)).toBe(true);
    }
  });

  it("includes block sub-groups (blocks are browsed by sub-group too)", () => {
    const blockParams = subcategoryParams().filter((p) => p.category === "blocks");
    expect(blockParams.length).toBeGreaterThan(0);
    expect(blockParams.some((p) => p.id === "group-heroes")).toBe(true);
  });

  it("never collides with a component detail param", () => {
    const subKeys = new Set(
      subcategoryParams().map((p) => `${p.category}/${p.id}`),
    );
    for (const p of detailPageParams()) {
      expect(subKeys.has(`${p.category}/${p.id}`)).toBe(false);
    }
    // The prefix is only safe because no real component id uses it.
    for (const category of categories) {
      for (const item of category.items) {
        expect(item.id.startsWith(SUBCATEGORY_PREFIX)).toBe(false);
      }
    }
  });

  it("resolves a real sub-group and rejects unknowns / detail ids", () => {
    const sub = findSubcategory("backgrounds", "group-particles");
    expect(sub).not.toBeNull();
    expect(sub?.category.id).toBe("backgrounds");
    expect(sub?.group.id).toBe("particles");
    expect(sub!.group.items.length).toBeGreaterThan(0);

    expect(findSubcategory("backgrounds", "group-nope")).toBeNull();
    expect(findSubcategory("nope", "group-particles")).toBeNull();
    expect(findSubcategory("backgrounds", "aurora-background")).toBeNull();
  });

  it("round-trips: every emitted param resolves back to a sub-group", () => {
    for (const p of subcategoryParams()) {
      const sub = findSubcategory(p.category, p.id);
      expect(sub).not.toBeNull();
      expect(`group-${sub!.group.id}`).toBe(p.id);
    }
  });
});
