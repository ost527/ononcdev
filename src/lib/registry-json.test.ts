import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { categories } from "@/registry";
import {
  allRegistryIds,
  buildRegistryItem,
  findRegistryItem,
} from "@/lib/registry-json";

describe("registry-json", () => {
  it("exposes one unique registry id per component", () => {
    const ids = allRegistryIds();
    const total = categories.reduce((n, c) => n + c.items.length, 0);
    expect(ids.length).toBe(total);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("builds a self-contained item for a cross-importing block", async () => {
    const found = findRegistryItem("hero-block");
    expect(found).not.toBeNull();
    const item = await buildRegistryItem(found!.category, found!.item);

    expect(item.$schema).toContain("registry-item.json");
    expect(item.name).toBe("hero-block");
    expect(item.type).toBe("registry:block");

    const targets = item.files.map((f) => f.target);
    // utils + the three cross-imported components + the block itself, bundled
    expect(targets).toContain("@lib/utils.ts");
    expect(targets).toContain("@components/backgrounds/aurora-background.tsx");
    expect(targets).toContain("@components/text/gradient-text.tsx");
    expect(targets).toContain("@ui/magnetic-button.tsx");
    expect(targets).toContain("@components/blocks/hero-block.tsx");

    expect(item.dependencies).toContain("motion");
    expect(item.dependencies).toContain("lucide-react");
    for (const dep of item.dependencies ?? []) {
      expect(["react", "react-dom", "next"]).not.toContain(dep);
    }
  });

  it("emits schema-valid items across every category", async () => {
    // sample a few per category to keep the fs reads fast but representative
    const samples = categories.flatMap((c) =>
      c.items.slice(0, 3).map((item) => ({ c, item })),
    );
    for (const { c, item } of samples) {
      const json = await buildRegistryItem(c, item);

      expect(json.name).toBe(item.id);
      expect(json.type.startsWith("registry:")).toBe(true);
      expect(json.files.length).toBeGreaterThan(0);

      // dependency-first order → the component's own file is last
      const own = json.files[json.files.length - 1];
      expect(own.path).toBe(item.sourcePath);

      for (const f of json.files) {
        expect(typeof f.path).toBe("string");
        expect(f.content.length).toBeGreaterThan(0);
        expect(f.type.startsWith("registry:")).toBe(true);
        expect(f.target.startsWith("@")).toBe(true); // alias placeholder
      }
      // metadata fields are populated (source content may legitimately contain
      // the word "undefined", e.g. `typeof window === "undefined"`, so only the
      // metadata is checked here)
      expect(json.title).not.toBe("undefined");
      expect(json.description).not.toBe("undefined");
      expect(json.name).not.toBe("undefined");
    }
  });

  it("lists only real npm dependencies across ALL components (⊆ package.json)", async () => {
    const pkg = JSON.parse(
      readFileSync(join(process.cwd(), "package.json"), "utf8"),
    ) as { dependencies?: Record<string, string> };
    const allowed = new Set(Object.keys(pkg.dependencies ?? {}));

    for (const category of categories) {
      for (const item of category.items) {
        const json = await buildRegistryItem(category, item);
        for (const dep of json.dependencies ?? []) {
          expect(
            allowed.has(dep),
            `${item.id} lists non-dependency "${dep}" (example code leaking into imports?)`,
          ).toBe(true);
        }
      }
    }
  });

  it("ships ONONC design tokens (cssVars + css) so `shadcn add` renders correctly", async () => {
    const found = findRegistryItem("badge");
    expect(found).not.toBeNull();
    const item = await buildRegistryItem(found!.category, found!.item);

    // cssVars → consumer globals.css @theme / :root / .dark
    expect(item.cssVars?.theme?.["color-surface"]).toBe("var(--surface)");
    expect(item.cssVars?.theme?.["color-brand"]).toBe("var(--brand)");
    expect(item.cssVars?.theme?.["animate-marquee"]).toContain("marquee");
    expect(item.cssVars?.light?.brand).toBeTruthy();
    expect(item.cssVars?.dark?.surface).toBeTruthy();

    // css → keyframes (in @layer base, always emitted) + utilities
    expect(item.css?.["@layer base"]?.["@keyframes star-spin"]).toBeDefined();
    expect(item.css?.["@layer base"]?.["@keyframes spin"]).toBeDefined();
    expect(item.css?.["@utility text-gradient"]).toBeDefined();
  });

  it("attaches the design-token theme to EVERY registry item", async () => {
    for (const category of categories) {
      for (const item of category.items) {
        const json = await buildRegistryItem(category, item);
        expect(json.cssVars, `${item.id} missing cssVars`).toBeDefined();
        expect(json.css, `${item.id} missing css`).toBeDefined();
      }
    }
  });
});
