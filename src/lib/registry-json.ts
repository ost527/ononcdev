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

export interface RegistryItemJson {
  $schema: string;
  name: string;
  type: string;
  title: string;
  description: string;
  author: string;
  categories: string[];
  dependencies?: string[];
  files: RegistryFileJson[];
}

const AUTHOR = "ONONC <https://dev.ononc.com>";

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
  return json;
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
