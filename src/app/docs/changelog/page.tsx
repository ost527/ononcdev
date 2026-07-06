import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, History } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog — ONONC",
  description:
    "What's new in ONONC — a reverse-chronological log of releases: new backgrounds, text effects, interactive components, section blocks, the component playground, and AI-agent support.",
  alternates: { canonical: "/docs/changelog" },
  openGraph: {
    title: "Changelog — ONONC",
    description:
      "Release history for the ONONC component library: new components, the detail playground, shadcn registry, and machine-readable llms.txt for AI agents.",
    url: absoluteUrl("/docs/changelog"),
    type: "article",
  },
};

/** Canonical copy of the changelog also lives at CHANGELOG.md in the repo root. */
const GITHUB_CHANGELOG_URL =
  "https://github.com/ost527/ononcdev/blob/main/CHANGELOG.md";

interface Release {
  version: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  tag: string;
  tone: BadgeTone;
  title: string;
  highlights: string[];
}

/**
 * Release history, newest first. This is the single source of truth for the
 * page; it is kept in sync with the repo-root CHANGELOG.md (rendered on GitHub).
 */
const RELEASES: Release[] = [
  {
    version: "1.14",
    date: "2026-07-07",
    tag: "Docs",
    tone: "brand",
    title: "Documentation section + footer refresh",
    highlights: [
      "New /docs documentation section with a collapsible left sidebar: Getting Started, Installation, Theming, and Usage.",
      "The footer's 'Contact' column is now 'Support' with a link to the docs, and the contact email moved to the footer's bottom bar.",
      "For AI agents, Resources, and Changelog moved under /docs (now /docs/ai-agents, /docs/resources, /docs/changelog) so they share the docs sidebar.",
    ],
  },
  {
    version: "1.13",
    date: "2026-07-06",
    tag: "Docs",
    tone: "neutral",
    title: "Friendlier design-token guidance + footer contact",
    highlights: [
      "Every component detail page now shows an always-visible design-tokens hint linking to the Design tokens guide, so styling setup is one click away.",
      "The Code/Usage tabs and the /blocks Code tab link 'design tokens' to that guide; the Copy-for-AI prompt now tells agents the install writes ONONC's tokens + keyframes into globals.css (with a hand-copy /r/ononc-theme.json fallback).",
      "Surfaced the contact email (ononc@ononc.com) in the footer.",
      "Brought the on-site changelog back in sync with CHANGELOG.md (v1.11 and v1.12 were missing).",
    ],
  },
  {
    version: "1.12",
    date: "2026-07-06",
    tag: "Registry",
    tone: "neutral",
    title: "Registry ships design tokens (consumer styling fix)",
    highlights: [
      "Every /r/<id>.json now carries ONONC's design tokens via shadcn cssVars (@theme / :root / .dark) and css (@keyframes + @utility), so npx shadcn add writes the tokens into your globals.css alongside the component — components render styled with no manual token copy.",
      "Fixes the gap where ~231/336 components compiled but rendered unstyled in consumer projects.",
      "New standalone /r/ononc-theme.json (registry:theme) installs just the design tokens.",
      "Verified on the real shadcn CLI in a Next.js + Tailwind v4 project; the consumer build stays green.",
    ],
  },
  {
    version: "1.11",
    date: "2026-07-06",
    tag: "Site",
    tone: "neutral",
    title: "All non-block components now have detail pages",
    highlights: [
      "Every non-block component (Backgrounds 72 + Text 58 + Components 87 = 217) now has its own /[category]/[id] detail page, so its full source is always viewable on the Code tab.",
      "The Customizable badge is decoupled from detail-page links — it now marks only components with live Customize controls.",
      "Sitemap now emits 227 URLs.",
    ],
  },
  {
    version: "1.10",
    date: "2026-07-06",
    tag: "Components",
    tone: "neutral",
    title: "8 premium interactive components (React Bits–inspired)",
    highlights: [
      "Added Profile Card, Scroll Stack, Card Stack, Magnet, Flowing Menu, Elastic Slider, Star Border, and Glare Hover.",
      "Each ships 4–6 grouped Customize controls, a Props table, a detail page, and a shadcn registry entry at /r/<id>.json.",
      "Full keyboard accessibility and prefers-reduced-motion support across all eight.",
      "Registry now totals 336 components — Backgrounds 72 · Text 58 · Components 87 · Blocks 119.",
    ],
  },
  {
    version: "1.9",
    date: "2026-07-05",
    tag: "Site",
    tone: "neutral",
    title: "Recommended resources board",
    highlights: [
      "New /resources page: a curated board of 10 third-party design systems and component libraries, each with a description, tags, and outbound link.",
      "BreadcrumbList + ItemList JSON-LD for SEO; linked from the footer and added to the sitemap.",
    ],
  },
  {
    version: "1.8",
    date: "2026-07-05",
    tag: "Backgrounds",
    tone: "neutral",
    title: "Strands, Liquid Chrome & Dither backgrounds",
    highlights: [
      "Strands — a luminous bundle of threads that flow like windblown hair and part around the cursor.",
      "Liquid Chrome — a sheet of molten, mirror-bright metal that folds and drags beneath the pointer.",
      "Dither — an animated plasma resolved into crisp retro bands through an ordered Bayer matrix.",
      "Each with grouped Customize + Props + detail page + shadcn registry JSON; reduced-motion single-frame and off-screen pause.",
    ],
  },
  {
    version: "1.7",
    date: "2026-07-04",
    tag: "Components",
    tone: "neutral",
    title: "Interactive showcase components",
    highlights: [
      "Added Circular Gallery, Rolling Gallery, Card Swap, Chroma Grid, and Pixel Card.",
      "Each with grouped Customize + Props + a live Usage playground; keyboard and reduced-motion aware, with rAF loops that pause off-screen.",
    ],
  },
  {
    version: "1.6",
    date: "2026-07-04",
    tag: "Backgrounds",
    tone: "neutral",
    title: "Silk, Squares, Letter Glitch & Ballpit backgrounds",
    highlights: [
      "Silk — flowing folds of satin catching the light as they drift.",
      "Squares — an endlessly drifting grid that lights up under the cursor.",
      "Letter Glitch — a dense grid of monospace glyphs flickering through letters and colors.",
      "Ballpit — colorful balls under gravity that collide and scatter away from the cursor.",
    ],
  },
  {
    version: "1.5",
    date: "2026-07-04",
    tag: "Backgrounds",
    tone: "neutral",
    title: "Ferrofluid background",
    highlights: [
      "A magnetic liquid-metal blob with metaball spikes that reaches a tendril toward the cursor.",
      "15 grouped Customize controls (Form, Motion, Magnet, Appearance) plus a Props table and detail page.",
    ],
  },
  {
    version: "1.4",
    date: "2026-07-04",
    tag: "AI agents",
    tone: "brand",
    title: "AI coding agents support — Phase 2",
    highlights: [
      "shadcn-compatible static registry: /r/<id>.json for every component, bundling full source plus every internal file it imports.",
      "One-command install — npx shadcn@latest add https://dev.ononc.com/r/<id>.json — verified against the real shadcn CLI.",
      "Per-component “Copy for AI” button, plus robots.txt and sitemap.xml.",
    ],
  },
  {
    version: "1.3",
    date: "2026-07-04",
    tag: "AI agents",
    tone: "brand",
    title: "AI coding agents support — Phase 1",
    highlights: [
      "Machine-readable /llms.txt and /llms-full.txt indexes generated at build time.",
      "New /ai-agents docs page explaining why ONONC suits coding agents.",
      "Site configuration (SITE_URL, absoluteUrl) and 404-safe component URLs.",
    ],
  },
  {
    version: "1.2",
    date: "2026-07-01",
    tag: "Feature",
    tone: "neutral",
    title: "Component detail playground",
    highlights: [
      "New /[category]/[id] detail routes with Preview/Code tabs, viewport presets, a draggable/keyboard-resizable handle, a live Customize panel, and a Props table.",
      "Blocks are listed inline (no detail page) with a shared ViewportToggle next to their Preview/Code tabs.",
    ],
  },
  {
    version: "1.1",
    date: "2026-06-30",
    tag: "Components",
    tone: "neutral",
    title: "12 new components",
    highlights: [
      "Backgrounds: Ripple, Matrix Rain. Text: Flip Text, Gradient Underline.",
      "Components: Combobox, Pagination, Toggle Group, Tag Input, File Dropzone, Progress Bar.",
      "Blocks: Banner, Team Grid — all with full ARIA and reduced-motion support.",
    ],
  },
  {
    version: "1.0",
    date: "2026-06-30",
    tag: "Release",
    tone: "brand",
    title: "Release candidate",
    highlights: [
      "First stable showcase: dark-first design tokens and motion-first components across Backgrounds, Text, Components, and Blocks.",
      "Resolved command-palette focus restoration, reduced-motion JS gaps, modal/drawer effect stability, tooltip Escape, progress-ring ARIA, showcase tabs ARIA, and segmented-control IDs.",
    ],
  },
];

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    {
      "@type": "ListItem",
      position: 2,
      name: "Docs",
      item: absoluteUrl("/docs"),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Changelog",
      item: absoluteUrl("/docs/changelog"),
    },
  ],
};

const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-brand/60";

export default function ChangelogPage() {
  return (
    <article className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
      <div>
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted-2">
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
          <span className="mx-1.5 opacity-50">/</span>
          <span className="text-foreground">Changelog</span>
        </nav>

        <header className="border-b border-border pb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            <History className="size-3.5" aria-hidden />
            Changelog
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            What&apos;s new in <span className="text-gradient">ONONC</span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            A reverse-chronological log of releases — new backgrounds, text
            effects, interactive components, section blocks, the component
            playground, and machine-readable support for AI coding agents. The
            same history is kept in{" "}
            <span className="font-mono text-foreground">CHANGELOG.md</span> at
            the repository root.
          </p>
          <div className="mt-8">
            <a
              href={GITHUB_CHANGELOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryBtn}
            >
              View on GitHub
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </header>

        <ol className="mt-12 space-y-12 border-l border-border pl-8">
          {RELEASES.map((release) => (
            <li key={release.version} className="relative">
              <span
                aria-hidden
                className="absolute -left-[41px] top-1 grid size-5 place-items-center rounded-full border border-border-strong bg-background"
              >
                <span className="size-1.5 rounded-full bg-brand" />
              </span>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  v{release.version}
                </h2>
                <Badge variant="soft" tone={release.tone}>
                  {release.tag}
                </Badge>
                <time dateTime={release.date} className="text-xs text-muted-2">
                  {release.date}
                </time>
              </div>

              <p className="mt-1.5 text-sm font-medium text-foreground">
                {release.title}
              </p>

              <ul className="mt-3 space-y-2">
                {release.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-brand-ink"
                      aria-hidden
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-xs leading-relaxed text-muted-2">
          Versions are date-stamped development batches; each entry summarizes
          the notable changes shipped to the registry and showcase.
        </p>
      </div>
    </article>
  );
}
