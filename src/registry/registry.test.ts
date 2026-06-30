import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { categories, componentCount } from "./index";

const items = categories.flatMap((c) => c.items);

describe("registry", () => {
  it("componentCount matches the total number of items", () => {
    expect(componentCount).toBe(items.length);
  });

  it("has a healthy number of components", () => {
    expect(items.length).toBeGreaterThanOrEqual(50);
  });

  it("uses unique ids across all categories", () => {
    const ids = items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every item a name, description, preview and .tsx sourcePath", () => {
    for (const item of items) {
      expect(item.name, item.id).toBeTruthy();
      expect(item.description, item.id).toBeTruthy();
      expect(item.preview, item.id).toBeTruthy();
      expect(item.sourcePath, item.id).toMatch(/\.tsx?$/);
    }
  });

  it("points every sourcePath at a file that exists", () => {
    for (const item of items) {
      const full = path.join(process.cwd(), "src", item.sourcePath);
      expect(existsSync(full), `${item.id} -> ${item.sourcePath}`).toBe(true);
    }
  });
});
