import { readFile } from "node:fs/promises";
import path from "node:path";
import { categories } from "@/registry";
import type { Category, RegistryItem } from "@/registry/types";

/**
 * Generates shadcn-compatible registry items (registry-item.json) for every
 * ONONC component, so an agent can run:
 *   npx shadcn@latest add https://dev.ononc.com/r/<id>.json
 *
 * Each item bundles the component's own source plus every internal file it
 * transitively imports (@/lib/*, @/components/*), each with the correct
 * `type` and a `target` alias placeholder (@lib/ @ui/ @components/) so the
 * shadcn CLI drops them at the project's configured aliases and imports keep
 * resolving. NPM dependencies are listed in `dependencies` (react/react-dom/
 * next are peers of any Next.js app and are omitted; clsx + tailwind-merge are
 * pulled in transitively from the bundled lib/utils.ts).
 */

const SRC = path.join(process.cwd(), "src");

/** Packages present in every React/Next project — never listed as a dependency. */
const PEER = new Set(["react", "react-dom", "next"]);

/** Matches `... from "x"`, side-effect `import "x"`, and dynamic `import("x")`. */
const IMPORT_RE =
  /\bfrom\s*["']([^"']+)["']|^\s*import\s*["']([^"']+)["']|\bimport\(\s*["']([^"']+)["']\s*\)/gm;

/**
 * Remove comments and template literals before scanning for imports, so
 * example code embedded in a string (e.g. a component that renders
 * `import { ONONC } from "ononc"` as a demo snippet) is never mistaken for a
 * real dependency. Only used for import extraction — the emitted file content
 * is always the untouched source.
 */
function stripNonCode(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, " ") // block comments
    .replace(/(^|[^:"'`])\/\/[^\n]*/g, "$1") // line comments (spare "http://")
    .replace(/`(?:\\[\s\S]|[^\\`])*`/g, "``"); // template literals
}

/** Import/export/dynamic-import specifiers in a source file (real code only). */
function extractSpecifiers(source: string): string[] {
  const specs: string[] = [];
  for (const m of stripNonCode(source).matchAll(IMPORT_RE)) {
    const spec = m[1] ?? m[2] ?? m[3];
    if (spec) specs.push(spec);
  }
  return specs;
}

/** The npm package name from a specifier (handles scopes + subpaths). */
function pkgName(spec: string): string {
  if (spec.startsWith("@")) {
    const [scope, name] = spec.split("/");
    return name ? `${scope}/${name}` : scope;
  }
  return spec.split("/")[0];
}

/** Resolve an internal import (`@/…` or relative) to a src-relative file path. */
async function resolveInternal(
  fromSrcRel: string,
  spec: string,
): Promise<string | null> {
  let base: string;
  if (spec.startsWith("@/")) {
    base = path.posix.normalize(spec.slice(2));
  } else if (spec.startsWith(".")) {
    base = path.posix.normalize(
      path.posix.join(path.posix.dirname(fromSrcRel), spec),
    );
  } else {
    return null;
  }
  if (base.startsWith("..")) return null; // never escape src/
  const candidates = [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    `${base}/index.tsx`,
    `${base}/index.ts`,
  ];
  for (const candidate of candidates) {
    if (candidate.endsWith(".tsx") || candidate.endsWith(".ts")) {
      try {
        await readFile(path.join(SRC, candidate), "utf8");
        return candidate;
      } catch {
        // try next candidate
      }
    }
  }
  return null;
}

/** registry file `type` + `target` alias placeholder for a src-relative path. */
function fileTypeAndTarget(srcRel: string): { type: string; target: string } {
  if (srcRel.startsWith("lib/")) {
    return { type: "registry:lib", target: `@lib/${srcRel.slice(4)}` };
  }
  if (srcRel.startsWith("components/ui/")) {
    return { type: "registry:ui", target: `@ui/${srcRel.slice(14)}` };
  }
  if (srcRel.startsWith("components/")) {
    return {
      type: "registry:component",
      target: `@components/${srcRel.slice(11)}`,
    };
  }
  return { type: "registry:file", target: srcRel };
}

interface Collected {
  /** src-relative files in dependency-first order (imports before importers). */
  order: string[];
  contents: Map<string, string>;
  deps: Set<string>;
}

/** Recursively collect a component's internal files + external npm deps. */
async function collect(entrySrcRel: string): Promise<Collected> {
  const order: string[] = [];
  const contents = new Map<string, string>();
  const deps = new Set<string>();
  const seen = new Set<string>();

  async function visit(srcRel: string): Promise<void> {
    if (seen.has(srcRel)) return;
    seen.add(srcRel);

    let content: string;
    try {
      content = await readFile(path.join(SRC, srcRel), "utf8");
    } catch {
      return;
    }
    contents.set(srcRel, content.replace(/\s+$/, "") + "\n");

    for (const spec of extractSpecifiers(content)) {
      if (spec.startsWith("@/") || spec.startsWith(".")) {
        const resolved = await resolveInternal(srcRel, spec);
        if (resolved) await visit(resolved);
      } else {
        const name = pkgName(spec);
        if (!PEER.has(name)) deps.add(name);
      }
    }
    order.push(srcRel); // post-order → dependencies precede dependents
  }

  await visit(entrySrcRel);
  return { order, contents, deps };
}

/** Overall registry-item type for a category. */
function overallType(categoryId: string): string {
  if (categoryId === "ui") return "registry:ui";
  if (categoryId === "blocks") return "registry:block";
  return "registry:component";
}

export interface RegistryFileJson {
  path: string;
  content: string;
  type: string;
  target: string;
}

/** shadcn cssVars: theme → @theme, light → :root, dark → .dark (keys have no leading `--`). */
export interface RegistryCssVars {
  theme?: Record<string, string>;
  light?: Record<string, string>;
  dark?: Record<string, string>;
}

/** shadcn css: raw at-rules/selectors as nested CSS-in-JSON (@keyframes, @utility, @layer, …). */
export interface RegistryCssNode {
  [key: string]: string | RegistryCssNode;
}
export type RegistryCss = Record<string, RegistryCssNode>;

export interface RegistryItemJson {
  $schema: string;
  name: string;
  type: string;
  title: string;
  description: string;
  author: string;
  categories: string[];
  dependencies?: string[];
  cssVars?: RegistryCssVars;
  css?: RegistryCss;
  files: RegistryFileJson[];
}

const AUTHOR = "ONONC <https://dev.ononc.com>";

/**
 * ONONC design tokens, shipped with EVERY registry item so a single
 * `npx shadcn@latest add …/r/<id>.json` injects them into the consumer's
 * globals.css (Tailwind v4). Mirrors src/app/globals.css: cssVars.theme →
 * @theme, cssVars.light → :root, cssVars.dark → .dark, and css → raw
 * @keyframes / @utility rules. Without these, ONONC's surface/brand/muted
 * utility classes, custom animations, and keyframes emit no CSS in a consumer
 * project (the components compile but render unstyled). Fonts and the
 * class-based dark @custom-variant are intentionally omitted so the install
 * never clobbers a consumer's typography or dark-mode strategy.
 */
const THEME_CSSVARS: RegistryCssVars = {
  theme: {
    "color-background": "var(--background)",
    "color-surface": "var(--surface)",
    "color-surface-2": "var(--surface-2)",
    "color-foreground": "var(--foreground)",
    "color-muted": "var(--muted)",
    "color-muted-2": "var(--muted-2)",
    "color-border": "var(--border)",
    "color-border-strong": "var(--border-strong)",
    "color-brand": "var(--brand)",
    "color-brand-ink": "var(--brand-ink)",
    "color-brand-2": "var(--brand-2)",
    "color-brand-3": "var(--brand-3)",
    "radius-4xl": "2rem",
    "animate-marquee": "marquee var(--marquee-duration, 28s) linear infinite",
    "animate-marquee-y":
      "marquee-y var(--marquee-duration, 28s) linear infinite",
    "animate-shimmer": "shimmer 2.4s linear infinite",
    "animate-aurora": "aurora 16s ease-in-out infinite alternate",
    "animate-grid-pan": "grid-pan 24s linear infinite",
    "animate-float": "float 7s ease-in-out infinite",
    "animate-gradient": "gradient-pan 8s ease infinite",
    "animate-spin-slow": "spin 18s linear infinite",
    "animate-pulse-ring": "pulse-ring 2.8s ease-out infinite",
    "animate-blink": "blink 1.05s steps(1, end) infinite",
  },
  light: {
    background: "#f6f7fb",
    surface: "#ffffff",
    "surface-2": "#eef0f7",
    foreground: "#0c0e1a",
    muted: "#545b70",
    "muted-2": "#8a91a8",
    border: "rgba(12, 14, 26, 0.1)",
    "border-strong": "rgba(12, 14, 26, 0.16)",
    brand: "#8b5cf6",
    "brand-ink": "#6d28d9",
    "brand-2": "#0891b2",
    "brand-3": "#e11d62",
    ring: "rgba(139, 92, 246, 0.55)",
    "site-shell-width": "80rem",
    "site-shell-gutter": "1.5rem",
  },
  dark: {
    background: "#06070d",
    surface: "#0b0d18",
    "surface-2": "#11142370",
    foreground: "#e9ebf5",
    muted: "#8a91a8",
    "muted-2": "#5b6178",
    border: "rgba(255, 255, 255, 0.08)",
    "border-strong": "rgba(255, 255, 255, 0.14)",
    brand: "#8b5cf6",
    "brand-ink": "#c4b5fd",
    "brand-2": "#22d3ee",
    "brand-3": "#fb7185",
    ring: "rgba(139, 92, 246, 0.55)",
  },
};

const THEME_CSS: RegistryCss = {
  // Keyframes live in @layer base (always emitted) — NOT @theme, where Tailwind
  // v4 tree-shakes any keyframe not referenced by a *used* animate-* utility.
  // Several ONONC components animate via an inline `animation: <name>` string
  // (star-spin, meteor, hue, wave, ripple, glitch-a/b) that Tailwind's class
  // scanner cannot see, so their keyframes must be emitted unconditionally.
  "@layer base": {
    "@keyframes marquee": {
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(-100%)" },
  },
  "@keyframes marquee-y": {
    from: { transform: "translateY(0)" },
    to: { transform: "translateY(-100%)" },
  },
  "@keyframes shimmer": {
    from: { "background-position": "-200% 0" },
    to: { "background-position": "200% 0" },
  },
  "@keyframes star-spin": { to: { transform: "rotate(360deg)" } },
  // Tailwind only emits @keyframes spin when animate-spin is used; ship it so
  // animate-spin-slow (and any raw `spin` reference) always animates.
  "@keyframes spin": { to: { transform: "rotate(360deg)" } },
  "@keyframes aurora": {
    "0%": { transform: "translate3d(-8%, -4%, 0) rotate(-6deg) scale(1.1)" },
    "50%": { transform: "translate3d(6%, 3%, 0) rotate(4deg) scale(1.25)" },
    "100%": { transform: "translate3d(-4%, 6%, 0) rotate(8deg) scale(1.15)" },
  },
  "@keyframes grid-pan": {
    from: { "background-position": "0 0" },
    to: {
      "background-position": "var(--grid-size, 44px) var(--grid-size, 44px)",
    },
  },
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-12px)" },
  },
  "@keyframes gradient-pan": {
    "0%, 100%": { "background-position": "0% 50%" },
    "50%": { "background-position": "100% 50%" },
  },
  "@keyframes pulse-ring": {
    "0%": { transform: "scale(0.85)", opacity: "0.7" },
    "100%": { transform: "scale(2.2)", opacity: "0" },
  },
  "@keyframes ring": {
    from: { transform: "scale(0)", opacity: "0.5" },
    to: { transform: "scale(1)", opacity: "0" },
  },
  "@keyframes blink": {
    "0%, 50%": { opacity: "1" },
    "50.01%, 100%": { opacity: "0" },
  },
  "@keyframes meteor": {
    "0%": {
      transform: "translate3d(0, 0, 0) rotate(var(--meteor-angle, 215deg))",
      opacity: "0",
    },
    "8%": { opacity: "1" },
    "100%": {
      transform:
        "translate3d(var(--meteor-x, -700px), var(--meteor-y, 700px), 0) rotate(var(--meteor-angle, 215deg))",
      opacity: "0",
    },
  },
  "@keyframes hue": { to: { filter: "hue-rotate(360deg)" } },
  "@keyframes wave": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-0.34em)" },
  },
  "@keyframes ripple": { to: { transform: "scale(4)", opacity: "0" } },
  "@keyframes glitch-a": {
    "0%, 100%": { "clip-path": "inset(0 0 82% 0)", transform: "translate(0, 0)" },
    "20%": { "clip-path": "inset(22% 0 48% 0)", transform: "translate(-2px, -1px)" },
    "40%": { "clip-path": "inset(58% 0 18% 0)", transform: "translate(2px, 1px)" },
    "60%": { "clip-path": "inset(40% 0 40% 0)", transform: "translate(-1px, 1px)" },
    "80%": { "clip-path": "inset(8% 0 70% 0)", transform: "translate(1px, -1px)" },
  },
  "@keyframes glitch-b": {
    "0%, 100%": { "clip-path": "inset(70% 0 8% 0)", transform: "translate(0, 0)" },
    "25%": { "clip-path": "inset(30% 0 44% 0)", transform: "translate(2px, 1px)" },
    "50%": { "clip-path": "inset(50% 0 28% 0)", transform: "translate(-2px, -1px)" },
    "75%": { "clip-path": "inset(14% 0 58% 0)", transform: "translate(1px, 1px)" },
  },
  },
  "@utility text-gradient": {
    "background-image":
      "linear-gradient(100deg, var(--brand-ink), var(--brand-2) 55%, var(--brand-3))",
    "background-clip": "text",
    "-webkit-background-clip": "text",
    color: "transparent",
  },
  "@utility glass": {
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))",
    "backdrop-filter": "blur(12px)",
    "-webkit-backdrop-filter": "blur(12px)",
    border: "1px solid var(--border)",
  },
  "@utility site-shell": {
    "margin-inline": "auto",
    width: "100%",
    "max-width": "var(--site-shell-width)",
    "padding-inline": "var(--site-shell-gutter)",
  },
};

/** Build the shadcn registry-item JSON for a single component. */
export async function buildRegistryItem(
  category: Category,
  item: RegistryItem,
): Promise<RegistryItemJson> {
  const { order, contents, deps } = await collect(item.sourcePath);

  const files: RegistryFileJson[] = order.map((srcRel) => {
    const { type, target } = fileTypeAndTarget(srcRel);
    return { path: srcRel, content: contents.get(srcRel) ?? "", type, target };
  });

  const json: RegistryItemJson = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.id,
    type: overallType(category.id),
    title: item.name,
    description: item.description,
    author: AUTHOR,
    categories: [category.id],
    files,
  };
  if (deps.size > 0) json.dependencies = [...deps].sort();
  // Ship ONONC's design tokens with every item so `shadcn add` alone makes the
  // component render correctly (no separate globals.css copy step required).
  json.cssVars = THEME_CSSVARS;
  json.css = THEME_CSS;
  return json;
}

/** Id of the standalone theme item served at /r/ononc-theme.json. */
export const THEME_ITEM_ID = "ononc-theme";

/**
 * A standalone shadcn `registry:theme` item that installs ONLY ONONC's design
 * tokens (no component files). `npx shadcn@latest add …/r/ononc-theme.json`
 * sets up the whole token layer once; every component item also carries it, so
 * this is a convenience for theming a project up front.
 */
export function buildThemeItem(): RegistryItemJson {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: THEME_ITEM_ID,
    type: "registry:theme",
    title: "ONONC design tokens",
    description:
      "ONONC's Tailwind v4 design tokens, animations, and keyframes — install once so every ONONC component renders correctly.",
    author: AUTHOR,
    categories: ["theme"],
    cssVars: THEME_CSSVARS,
    css: THEME_CSS,
    files: [],
  };
}

/** `{ category, item }` for a registry id, or null. */
export function findRegistryItem(
  id: string,
): { category: Category; item: RegistryItem } | null {
  for (const category of categories) {
    const item = category.items.find((i) => i.id === id);
    if (item) return { category, item };
  }
  return null;
}

/** Every registry id, for generateStaticParams on the /r/[name] route. */
export function allRegistryIds(): string[] {
  return categories.flatMap((c) => c.items.map((i) => i.id));
}
