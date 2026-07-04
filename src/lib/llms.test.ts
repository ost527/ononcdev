import { describe, it, expect } from "vitest";
import { buildLlmsTxt, buildLlmsFullTxt } from "@/lib/llms";
import { categories, componentHasDetailPage } from "@/registry";
import { SITE_URL } from "@/lib/site";

describe("buildLlmsTxt", () => {
  const txt = buildLlmsTxt();

  it("starts with the ONONC header and points at the full dump", () => {
    expect(txt.startsWith("# ONONC")).toBe(true);
    expect(txt).toContain(`${SITE_URL}/llms-full.txt`);
    expect(txt).toContain(`${SITE_URL}/ai-agents`);
  });

  it("has a section for every category", () => {
    for (const category of categories) {
      expect(txt).toContain(`## ${category.label}`);
    }
  });

  it("lists every component with an absolute URL and its source path", () => {
    for (const category of categories) {
      for (const item of category.items) {
        expect(txt).toContain(`[${item.name}](${SITE_URL}/`);
        expect(txt).toContain(`src/${item.sourcePath}`);
      }
    }
  });

  it("includes a shadcn install command per component", () => {
    expect(txt).toContain(`npx shadcn@latest add ${SITE_URL}/r/`);
  });

  it("never emits a detail URL for a component that has no detail page (404 guard)", () => {
    for (const category of categories) {
      for (const item of category.items) {
        if (!componentHasDetailPage(category.id, item.id)) {
          // Match the whole markdown-link URL `](…/cat/id)` so an id that is a
          // prefix of another (e.g. `card` vs `card-swap`) isn't a false match.
          expect(txt).not.toContain(`${SITE_URL}/${category.id}/${item.id})`);
        }
      }
    }
  });

  it("has no missing fields", () => {
    expect(txt).not.toContain("undefined");
    expect(txt).not.toContain("](/"); // all links must be absolute
  });
});

describe("buildLlmsFullTxt", () => {
  it("inlines component source inside tsx code fences", async () => {
    const full = await buildLlmsFullTxt();
    expect(full.startsWith("# ONONC")).toBe(true);
    expect(full).toContain("```tsx");
    expect(full).not.toContain("Source unavailable");
    // Every component contributes a source block, so the dump is substantial.
    expect(full.length).toBeGreaterThan(20000);
  });
});
