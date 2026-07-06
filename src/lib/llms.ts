import {
  categories,
  componentCount,
  componentHasDetailPage,
} from "@/registry";
import type { Category, RegistryItem } from "@/registry/types";
import { absoluteUrl } from "@/lib/site";
import { readSources } from "@/lib/source";

/**
 * Shared header for both llms files: identity, agent notes, and the fact that
 * this is a copy-paste (no-install) library. Kept in sync with the real stack.
 */
const HEADER = `# ONONC
> ONONC is an original, motion-first React component library for Next.js 16 (App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react). It is a copy-paste library: every component ships its real source, which you paste directly into your project — there is no package to install.

Notes for coding agents:
- Components are grouped into four categories: Backgrounds (ambient animated canvases), Text (typographic animations), Components (interactive UI primitives), and Blocks (composed page sections).
- Copy a component's source from its page on the site, or grab every source at once from ${absoluteUrl("/llms-full.txt")}.
- Or install any component with the shadcn CLI — \`npx shadcn@latest add ${absoluteUrl("/r/<id>.json")}\` — which bundles the component plus every internal file it imports (@/lib, sibling components) at your project's aliases. Each item is served at /r/<id>.json.
- Stack: React 19 + Next.js 16, TypeScript, Tailwind CSS v4 (CSS-first @theme tokens in src/app/globals.css — there is no tailwind.config), Framer Motion for interactive motion, lucide-react for icons.
- Shared helpers live in src/lib/utils.ts (cn, clamp, mapRange, seededRandom, prefersReducedMotion); canvas components use the lifecycle hook in src/lib/use-canvas.ts. The shadcn install bundles these automatically; when copying by hand, copy them too.
- Styling: components use ONONC's Tailwind v4 design tokens and keyframes from src/app/globals.css (@theme — e.g. surface/brand/muted colors, aurora/shimmer/marquee animations). The registry brings the .tsx files only, so copy those tokens into your globals.css for exact styling.
- All motion degrades under prefers-reduced-motion; canvas backgrounds pause when off-screen and when the tab is hidden.`;

/**
 * URL for a component: its detail page when one is generated, else the category
 * page. Only blocks lack a detail page — they are composed sections shown
 * inline on `/blocks` — so linking to `/blocks/{id}` would 404; this guards
 * against that while every other component links straight to its detail page.
 */
function itemUrl(category: Category, item: RegistryItem): string {
  return componentHasDetailPage(category.id, item.id)
    ? absoluteUrl(`/${category.id}/${item.id}`)
    : absoluteUrl(`/${category.id}`);
}

/** One compact index line: `- [Name](url): description — source: path — install: cmd [tags]`. */
function itemLine(category: Category, item: RegistryItem): string {
  const tags =
    item.tags && item.tags.length ? ` [${item.tags.join(", ")}]` : "";
  const install = `npx shadcn@latest add ${absoluteUrl(`/r/${item.id}.json`)}`;
  return `- [${item.name}](${itemUrl(category, item)}): ${item.description} — source: src/${item.sourcePath} — install: ${install}${tags}`;
}

/** The Docs links section, shared by both files. */
function docsSection(): string {
  return [
    "## Docs",
    `- [Home](${absoluteUrl("/")}): Landing page and category overview.`,
    `- [Introduction](${absoluteUrl("/introduction")}): What ONONC is and how to use the site.`,
    `- [For AI agents](${absoluteUrl("/ai-agents")}): How coding agents consume ONONC.`,
    `- [Full source dump](${absoluteUrl("/llms-full.txt")}): Every component's full source inlined in one file.`,
  ].join("\n");
}

/** The machine-readable index of the whole library (concise, one line each). */
export function buildLlmsTxt(): string {
  const sections = categories.map((category) => {
    const lines = category.items.map((item) => itemLine(category, item));
    return `## ${category.label}\n${category.blurb}\n\n${lines.join("\n")}`;
  });
  return [HEADER, docsSection(), ...sections].join("\n\n") + "\n";
}

/** The full dump: the same header plus every component's real source inlined. */
export async function buildLlmsFullTxt(): Promise<string> {
  const sources = await readSources(
    categories.flatMap((category) =>
      category.items.map((item) => ({
        id: `${category.id}/${item.id}`,
        sourcePath: item.sourcePath,
      })),
    ),
  );

  const parts: string[] = [
    HEADER,
    `> This file inlines the full source of all ${componentCount} components. Each fenced block is the exact contents of the file at the given path.`,
  ];

  for (const category of categories) {
    parts.push(`## ${category.label}\n${category.blurb}`);
    for (const item of category.items) {
      const key = `${category.id}/${item.id}`;
      const src = sources[key] ?? `// Source unavailable: ${item.sourcePath}`;
      parts.push(
        [
          `### ${item.name}`,
          item.description,
          `URL: ${itemUrl(category, item)}`,
          `Path: src/${item.sourcePath}`,
          "",
          "```tsx",
          src.replace(/\s+$/, ""),
          "```",
        ].join("\n"),
      );
    }
  }

  return parts.join("\n\n") + "\n";
}
