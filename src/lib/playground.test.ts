import { describe, expect, it } from "vitest";
import type { Control } from "@/registry/types";
import {
  buildUsage,
  countModified,
  decodePlaygroundState,
  diffValues,
  encodePlaygroundState,
  importPathFromSource,
  pascalCase,
  randomizeValues,
} from "./playground";

const badgeControls: readonly Control[] = [
  { type: "text", key: "text", label: "Label", default: "Badge", code: { children: true } },
  {
    type: "select",
    key: "variant",
    label: "Variant",
    default: "soft",
    options: [
      { label: "Solid", value: "solid" },
      { label: "Soft", value: "soft" },
    ],
  },
  { type: "boolean", key: "dot", label: "Status dot", default: false },
  { type: "number", key: "size", label: "Size", min: 8, max: 32, default: 16 },
];

describe("pascalCase / importPathFromSource", () => {
  it("converts kebab ids to component names", () => {
    expect(pascalCase("badge")).toBe("Badge");
    expect(pascalCase("particle-field")).toBe("ParticleField");
    expect(pascalCase("digi-clock-text")).toBe("DigiClockText");
  });

  it("maps source paths to @/ imports", () => {
    expect(importPathFromSource("components/ui/badge.tsx")).toBe(
      "@/components/ui/badge",
    );
  });
});

describe("buildUsage", () => {
  const input = {
    id: "badge",
    sourcePath: "components/ui/badge.tsx",
    controls: badgeControls,
  };
  const defaults = { text: "Badge", variant: "soft", dot: false, size: 16 };

  it("emits an import line plus the element with children and attributes", () => {
    const code = buildUsage(input, defaults);
    expect(code).toContain('import { Badge } from "@/components/ui/badge";');
    expect(code).toContain('variant="soft"');
    expect(code).toContain("dot={false}");
    expect(code).toContain("size={16}");
    expect(code).toContain(">\n  Badge\n</Badge>");
  });

  it("reflects the live values and emits bare attributes for true booleans", () => {
    const code = buildUsage(input, { ...defaults, dot: true, text: "New" });
    expect(code).toContain(" dot ");
    expect(code).not.toContain("dot={false}");
    expect(code).toContain(">\n  New\n</Badge>");
  });

  it("escapes strings that would break JSX literals", () => {
    const code = buildUsage(
      {
        id: "x",
        controls: [
          { type: "text", key: "title", label: "Title", default: "" },
        ] as const,
      },
      { title: 'say "hi"' },
    );
    expect(code).toContain('title={"say \\"hi\\""}');
  });

  it("omits empty strings, omitWhen matches and hidden controls", () => {
    const code = buildUsage(
      {
        id: "avatar",
        controls: [
          { type: "text", key: "name", label: "Name", default: "" },
          {
            type: "select",
            key: "status",
            label: "Status",
            default: "none",
            options: [
              { label: "None", value: "none" },
              { label: "Online", value: "online" },
            ],
            code: { omitWhen: "none" },
          },
          {
            type: "number",
            key: "internal",
            label: "Internal",
            min: 0,
            max: 1,
            default: 0,
            code: { hidden: true },
          },
        ] as const,
      },
      { name: "", status: "none", internal: 1 },
    );
    expect(code).toBe("<Avatar />");
  });

  it("supports prop renames, custom formats and raw list attributes", () => {
    const code = buildUsage(
      {
        id: "kbd",
        controls: [
          {
            type: "text",
            key: "keys",
            label: "Keys",
            default: "⌘, K",
            code: {
              prop: "keys",
              format: (value) => ({
                raw: `{[${String(value)
                  .split(",")
                  .map((part) => JSON.stringify(part.trim()))
                  .join(", ")}]}`,
              }),
            },
          },
          {
            type: "number",
            key: "value",
            label: "Value",
            min: 0,
            max: 10,
            default: 2,
            code: { prop: "defaultValue" },
          },
        ] as const,
      },
      { keys: "⌘, K", value: 4 },
    );
    expect(code).toContain('keys={["⌘", "K"]}');
    expect(code).toContain("defaultValue={4}");
  });

  it("appends extra attributes and auto-sizes bleed backgrounds", () => {
    const withExtra = buildUsage(
      { id: "alert", controls: [], usage: { extra: 'className="w-80"' } },
      {},
    );
    expect(withExtra).toBe('<Alert className="w-80" />');

    const bleed = buildUsage({ id: "waves", controls: [], bleed: true }, {});
    expect(bleed).toBe('<Waves className="h-full w-full" />');
  });

  it("prefers a spec-level element override but keeps the import", () => {
    const code = buildUsage(
      {
        id: "waves",
        sourcePath: "components/backgrounds/waves.tsx",
        controls: badgeControls,
        usage: { element: () => "<Waves custom />" },
      },
      defaults,
    );
    expect(code).toBe(
      'import { Waves } from "@/components/backgrounds/waves";\n\n<Waves custom />',
    );
  });
});

describe("share state encode/decode", () => {
  const values = { text: "Hello", variant: "solid", dot: false, size: 16 };

  it("diffs only non-default values and counts them", () => {
    expect(diffValues(badgeControls, values)).toEqual({
      text: "Hello",
      variant: "solid",
    });
    expect(countModified(badgeControls, values)).toBe(2);
  });

  it("round-trips through encode/decode", () => {
    const encoded = encodePlaygroundState(badgeControls, values);
    expect(encoded).not.toBeNull();
    expect(decodePlaygroundState(badgeControls, encoded!)).toEqual(values);
  });

  it("returns null when nothing differs from the defaults", () => {
    expect(
      encodePlaygroundState(badgeControls, {
        text: "Badge",
        variant: "soft",
        dot: false,
        size: 16,
      }),
    ).toBeNull();
  });

  it("rejects garbage and out-of-schema values", () => {
    expect(decodePlaygroundState(badgeControls, "not-json")).toBeNull();
    expect(decodePlaygroundState(badgeControls, "%7B%22variant%22%3A%22nope%22%7D")).toBeNull();
  });

  it("clamps numbers and ignores unknown keys", () => {
    const raw = encodeURIComponent(
      JSON.stringify({ size: 9999, bogus: true }),
    );
    expect(decodePlaygroundState(badgeControls, raw)).toEqual({
      text: "Badge",
      variant: "soft",
      dot: false,
      size: 32,
    });
  });

  it("validates colors and truncates long text", () => {
    const controls: readonly Control[] = [
      { type: "color", key: "color", label: "Color", default: "#8b5cf6" },
      { type: "text", key: "text", label: "Text", default: "" },
    ];
    const bad = encodeURIComponent(JSON.stringify({ color: "red" }));
    expect(decodePlaygroundState(controls, bad)).toBeNull();

    const long = encodeURIComponent(
      JSON.stringify({ color: "#22D3EE", text: "x".repeat(500) }),
    );
    const decoded = decodePlaygroundState(controls, long)!;
    expect(decoded.color).toBe("#22d3ee");
    expect(String(decoded.text)).toHaveLength(300);
  });
});

describe("randomizeValues", () => {
  it("keeps text, snaps numbers to step and picks valid options", () => {
    const controls: readonly Control[] = [
      ...badgeControls,
      {
        type: "number",
        key: "stagger",
        label: "Stagger",
        min: 0.02,
        max: 0.2,
        step: 0.01,
        default: 0.05,
      },
      { type: "color", key: "color", label: "Color", default: "#8b5cf6" },
    ];
    let tick = 0;
    const seeded = () => {
      tick = (tick + 1) % 10;
      return tick / 10;
    };
    const next = randomizeValues(controls, { text: "Keep me" }, seeded);

    expect(next.text).toBe("Keep me");
    expect(controls.find((c) => c.key === "variant")).toBeTruthy();
    expect(["solid", "soft"]).toContain(next.variant);
    expect(typeof next.dot).toBe("boolean");

    const size = Number(next.size);
    expect(size).toBeGreaterThanOrEqual(8);
    expect(size).toBeLessThanOrEqual(32);
    expect(Number.isInteger(size)).toBe(true);

    const stagger = Number(next.stagger);
    expect(stagger).toBeGreaterThanOrEqual(0.02);
    expect(stagger).toBeLessThanOrEqual(0.2);
    expect(String(next.color)).toMatch(/^#[0-9a-f]{6}$/);
  });
});
