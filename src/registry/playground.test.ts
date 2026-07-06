import { describe, expect, it } from "vitest";
import {
  allComponentParams,
  categories,
  componentCount,
  componentHasDetailPage,
  detailPageParams,
  findComponent,
  hasDetailPage,
} from "./index";
import { customizableIds } from "./customizable";
import { playgrounds } from "./playground";
import type { PlaygroundValues } from "./types";

const allIds = new Set(categories.flatMap((c) => c.items.map((i) => i.id)));

describe("allComponentParams", () => {
  const params = allComponentParams();

  it("returns one param per component", () => {
    expect(params).toHaveLength(componentCount);
  });

  it("uses unique category/id pairs that all resolve", () => {
    const keys = params.map((p) => `${p.category}/${p.id}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const p of params) {
      expect(findComponent(p.category, p.id), `${p.category}/${p.id}`).not.toBeNull();
    }
  });

  it("findComponent returns null for unknown category/id", () => {
    expect(findComponent("nope", "nope")).toBeNull();
    expect(findComponent(params[0].category, "nope")).toBeNull();
  });
});

describe("detail page scope", () => {
  it("excludes blocks but includes the other categories", () => {
    expect(hasDetailPage("blocks")).toBe(false);
    expect(hasDetailPage("ui")).toBe(true);
    expect(hasDetailPage("text")).toBe(true);
    expect(hasDetailPage("backgrounds")).toBe(true);
  });

  it("detailPageParams omits blocks and includes every non-block component", () => {
    const detail = detailPageParams();
    expect(detail.some((p) => p.category === "blocks")).toBe(false);
    expect(detail.length).toBeGreaterThan(0);
    // Blocks exist, so the detail set is a strict subset of all components.
    expect(detail.length).toBeLessThan(allComponentParams().length);
    for (const p of detail) {
      expect(findComponent(p.category, p.id), `${p.category}/${p.id}`).not.toBeNull();
      expect(
        hasDetailPage(p.category),
        `${p.category}/${p.id} in a detail-page category`,
      ).toBe(true);
    }
  });

  it("detail pages cover every component in a detail-page category", () => {
    const expected = categories
      .filter((c) => hasDetailPage(c.id))
      .flatMap((c) => c.items);
    expect(detailPageParams().length).toBe(expected.length);
  });

  it("componentHasDetailPage covers any component in a detail-page category, never blocks", () => {
    // Every real component in a detail-page category has a page — whether or
    // not it exposes live Customize controls — so its source is always viewable.
    for (const c of categories.filter((c) => hasDetailPage(c.id))) {
      for (const item of c.items) {
        expect(componentHasDetailPage(c.id, item.id), `${c.id}/${item.id}`).toBe(
          true,
        );
      }
    }

    // Blocks never get a detail page.
    const block = categories.find((c) => c.id === "blocks")!.items[0];
    expect(componentHasDetailPage("blocks", block.id)).toBe(false);

    // An unknown id has no page even in a detail-page category.
    expect(componentHasDetailPage("ui", "does-not-exist")).toBe(false);
  });
});

describe("playground specs", () => {
  it("only reference real component ids", () => {
    for (const id of Object.keys(playgrounds)) {
      expect(allIds.has(id), id).toBe(true);
    }
  });

  it("have a valid render and well-formed controls", () => {
    for (const [id, spec] of Object.entries(playgrounds)) {
      expect(typeof spec.render, id).toBe("function");

      const keys = (spec.controls ?? []).map((c) => c.key);
      expect(new Set(keys).size, `${id} duplicate control keys`).toBe(keys.length);

      for (const c of spec.controls ?? []) {
        expect(c.label, `${id}.${c.key} label`).toBeTruthy();
        if (c.type === "number") {
          expect(c.min, `${id}.${c.key} min<=default`).toBeLessThanOrEqual(c.default);
          expect(c.default, `${id}.${c.key} default<=max`).toBeLessThanOrEqual(c.max);
        }
        if (c.type === "select") {
          expect(
            c.options.some((o) => o.value === c.default),
            `${id}.${c.key} default in options`,
          ).toBe(true);
          expect(c.options.length, `${id}.${c.key} has options`).toBeGreaterThan(0);
        }
        if (c.type === "color") {
          expect(c.default, `${id}.${c.key} hex`).toMatch(/^#[0-9a-f]{6}$/i);
        }
      }

      for (const p of spec.props ?? []) {
        expect(p.name, `${id} prop name`).toBeTruthy();
        expect(p.type, `${id} prop type`).toBeTruthy();
        expect(p.description, `${id} prop description`).toBeTruthy();
      }
    }
  });

  it("render returns a node for the default values of every spec", () => {
    for (const [id, spec] of Object.entries(playgrounds)) {
      const values: PlaygroundValues = {};
      for (const c of spec.controls ?? []) values[c.key] = c.default;
      expect(spec.render(values), id).toBeTruthy();
    }
  });
});

describe("customizable ids stay in sync with playground controls", () => {
  // The component cards badge "Customizable" from the server-safe
  // `customizableIds` set, which mirrors the client-only `playgrounds`. This
  // guards the two against drift: a spec that gains/loses controls must be
  // reflected in `customizableIds`.
  const expected = new Set(
    Object.entries(playgrounds)
      .filter(([, spec]) => (spec.controls?.length ?? 0) > 0)
      .map(([id]) => id),
  );

  it("customizableIds exactly matches specs that have controls", () => {
    const missing = [...expected].filter((id) => !customizableIds.has(id));
    const extra = [...customizableIds].filter((id) => !expected.has(id));
    expect(missing, "ids with controls missing from customizableIds").toEqual([]);
    expect(extra, "ids in customizableIds without controls").toEqual([]);
  });

  it("every customizable id is a real component id", () => {
    for (const id of customizableIds) {
      expect(allIds.has(id), id).toBe(true);
    }
  });
});
