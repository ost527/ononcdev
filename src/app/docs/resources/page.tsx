import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Bookmark, Code, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recommended resources — ONONC",
  description:
    "A curated board of design systems and component libraries worth bookmarking — from React Bits and Mantine UI to Cloudscape, Primer, Carbon, Material Web, and Fluent UI.",
  alternates: { canonical: "/docs/resources" },
  openGraph: {
    title: "Recommended resources — design systems & component libraries",
    description:
      "A hand-picked board of design systems and component libraries we like — the sites and repos worth keeping in your bookmarks.",
    url: absoluteUrl("/docs/resources"),
    type: "article",
  },
};

type SiteKind = "site" | "github";

interface Resource {
  name: string;
  url: string;
  /** Short host/repo label shown under the name. */
  source: string;
  kind: SiteKind;
  tags: string[];
  blurb: string;
}

/**
 * The recommendation board. Each entry is a third-party design system or
 * component library we think is worth a look. Edit freely — this is the single
 * source of truth for the page (and its ItemList structured data).
 */
const RESOURCES: Resource[] = [
  {
    name: "React Bits",
    url: "https://www.reactbits.dev/",
    source: "reactbits.dev",
    kind: "site",
    tags: ["React", "Copy-paste", "Animation", "Open source"],
    blurb:
      "Open-source, animated React components — backgrounds, text effects, and interactive bits you copy straight into your project. A key inspiration behind ONONC's own motion components.",
  },
  {
    name: "React Bits Pro",
    url: "https://pro.reactbits.dev/",
    source: "pro.reactbits.dev",
    kind: "site",
    tags: ["React", "Premium", "Templates"],
    blurb:
      "The premium tier of React Bits: production-ready templates, full page sections, and advanced animated components for teams shipping polished marketing sites.",
  },
  {
    name: "Mantine UI",
    url: "https://ui.mantine.dev/",
    source: "ui.mantine.dev",
    kind: "site",
    tags: ["React", "Copy-paste", "Sections"],
    blurb:
      "A large collection of responsive, copy-paste sections and layouts — heroes, navbars, tables, and forms — built on the Mantine React components library.",
  },
  {
    name: "21st.dev",
    url: "https://21st.dev/home",
    source: "21st.dev",
    kind: "site",
    tags: ["React", "Tailwind", "Registry", "Marketplace"],
    blurb:
      "A community marketplace and registry of shadcn-compatible React + Tailwind components — \u201cthe npm for design engineers\u201d — and the source behind AI tools that generate UI from a prompt.",
  },
  {
    name: "Cloudscape",
    url: "https://cloudscape.design/",
    source: "cloudscape.design",
    kind: "site",
    tags: ["React", "Design system", "AWS", "Open source"],
    blurb:
      "Amazon's open-source design system for building rich web applications, born out of the AWS Management Console. Ships React components, design tokens, patterns, and usage guidelines.",
  },
  {
    name: "Primer React",
    url: "https://github.com/primer/react",
    source: "github.com/primer/react",
    kind: "github",
    tags: ["React", "Design system", "GitHub"],
    blurb:
      "GitHub's Primer design system in React — the actual component library that powers GitHub's own interface, following the Primer guidelines.",
  },
  {
    name: "Carbon Design System",
    url: "https://github.com/carbon-design-system/carbon-website",
    source: "github.com/carbon-design-system",
    kind: "github",
    tags: ["Design system", "Docs", "IBM"],
    blurb:
      "IBM's open-source Carbon design system. This repository is the Carbon website — the guidelines, docs, and component reference for building consistent products.",
  },
  {
    name: "Material Web",
    url: "https://github.com/material-components/material-web",
    source: "github.com/material-components",
    kind: "github",
    tags: ["Web Components", "Material Design", "Google"],
    blurb:
      "Google's Material Design 3 delivered as framework-agnostic Web Components (built on Lit) that drop into any stack — React, Angular, or plain HTML.",
  },
  {
    name: "Fluent UI",
    url: "https://github.com/microsoft/fluentui",
    source: "github.com/microsoft/fluentui",
    kind: "github",
    tags: ["React", "Design system", "Microsoft"],
    blurb:
      "Microsoft's Fluent design system — the React components used across Microsoft 365, Office, and Windows web experiences.",
  },
  {
    name: "Astryx",
    url: "https://astryx.atmeta.com/",
    source: "astryx.atmeta.com",
    kind: "site",
    tags: ["Design system"],
    blurb:
      "A design-system and UI-component resource hosted on the atmeta.com domain — a newer entry worth a look; visit the site for the latest.",
  },
];

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Docs", item: absoluteUrl("/docs") },
    {
      "@type": "ListItem",
      position: 3,
      name: "Recommended resources",
      item: absoluteUrl("/docs/resources"),
    },
  ],
};

const ITEMLIST_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Recommended design systems & component libraries",
  itemListElement: RESOURCES.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: r.name,
    url: r.url,
  })),
};

const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-brand/60";

export default function ResourcesPage() {
  return (
    <article className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEMLIST_LD) }}
      />
      <div>
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted-2">
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
          <span className="mx-1.5 opacity-50">/</span>
          <span className="text-foreground">Recommended resources</span>
        </nav>

        <header className="border-b border-border pb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            <Bookmark className="size-3.5" aria-hidden />
            Resources
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Recommended <span className="text-gradient">resources</span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            A hand-picked board of design systems and component libraries worth
            bookmarking. Some are open-source, some are premium, and a few are
            the systems behind products you use every day — all great places to
            borrow patterns and ideas.
          </p>
          <div className="mt-8">
            <Link href="/" className={secondaryBtn}>
              Browse ONONC components
            </Link>
          </div>
        </header>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {RESOURCES.map((resource) => {
            const Icon = resource.kind === "github" ? Code : Globe;
            return (
              <li key={resource.url} className="flex">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full w-full flex-col rounded-2xl border border-border bg-surface p-5 outline-none transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-muted">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {resource.name}
                        </span>
                        <span className="block truncate text-xs text-muted-2">
                          {resource.source}
                        </span>
                      </span>
                    </div>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                      aria-hidden
                    />
                  </div>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    {resource.blurb}
                  </p>

                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="soft" tone="neutral">
                        {tag}
                      </Badge>
                    ))}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-xs leading-relaxed text-muted-2">
          These are third-party sites, not affiliated with ONONC; links open in
          a new tab. Spotted something great that belongs here? It is worth
          adding to the board.
        </p>
      </div>
    </article>
  );
}
