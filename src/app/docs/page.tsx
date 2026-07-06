import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Palette, Terminal, Wrench } from "lucide-react";
import { componentCount, categories } from "@/registry";
import { absoluteUrl } from "@/lib/site";
import { Code, Snippet } from "@/components/docs/docs-prose";
import { DocsPageHeader } from "@/components/docs/docs-page-header";

export const metadata: Metadata = {
  title: "Getting Started — ONONC Docs",
  description:
    "Install ONONC components with the shadcn CLI or copy-paste them into your Next.js + Tailwind v4 app. Prerequisites and a first install in two minutes.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Getting Started with ONONC",
    description:
      "Prerequisites and your first component install — with the shadcn CLI or copy-paste.",
    url: absoluteUrl("/docs"),
    type: "article",
  },
};

const PREREQS: { title: string; body: string }[] = [
  {
    title: "React 19",
    body: "Components are plain .tsx files, so any React 19 app works — Next.js (App Router) is what ONONC is built and tested on.",
  },
  {
    title: "Tailwind CSS v4",
    body: "Styling uses Tailwind v4 utilities and CSS-first @theme tokens. The design tokens live in your globals.css — see Theming.",
  },
  {
    title: "A few peer packages",
    body: "motion (Framer Motion) for animated components, lucide-react for icons, plus clsx + tailwind-merge for the cn helper. The CLI adds these for you.",
  },
];

const NEXT_STEPS: {
  href: string;
  icon: typeof Terminal;
  title: string;
  body: string;
}[] = [
  {
    href: "/docs/installation",
    icon: Terminal,
    title: "Installation",
    body: "The shadcn CLI in depth, the copy-paste path, and exactly what lands in your project.",
  },
  {
    href: "/docs/theming",
    icon: Palette,
    title: "Theming",
    body: "Install the design tokens so components render correctly — with the CLI or by hand.",
  },
  {
    href: "/docs/usage",
    icon: Wrench,
    title: "Usage",
    body: "Import a component, customize its props, and browse the full library.",
  },
];

const INSTALL_CMD = `npx shadcn@latest add ${absoluteUrl("/r/aurora-background.json")}`;

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Docs", item: absoluteUrl("/docs") },
  ],
};

export default function GettingStartedPage() {
  return (
    <article className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
      <DocsPageHeader
        title="Getting Started"
        description={
          <>
            ONONC is a motion-first React component library — {componentCount}{" "}
            components across {categories.length} categories. There is no
            package to depend on: install a component with the shadcn CLI or
            copy its source straight from the site. This guide gets you from
            zero to a rendered component.
          </>
        }
      />

      <div className="mt-10 space-y-12 text-pretty leading-relaxed text-muted">
        <section id="prerequisites" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Prerequisites
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            ONONC components are idiomatic React + Tailwind — no bespoke
            runtime, no UI-kit dependency. You need:
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {PREREQS.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Check className="size-4 text-brand-ink" aria-hidden />
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="quick-start" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Install your first component
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Every component is published to a shadcn-compatible registry. One
            command drops the component, every internal file it imports, and
            ONONC&apos;s design tokens into your project — so it renders
            correctly with no extra setup:
          </p>
          <Snippet label="Install a component with the shadcn CLI">
            {INSTALL_CMD}
          </Snippet>
          <p className="mt-4 text-sm sm:text-base">
            Swap <Code>aurora-background</Code> for any component&apos;s
            registry id — you&apos;ll find the exact command on each
            component&apos;s page and in{" "}
            <a
              href="/llms.txt"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              llms.txt
            </a>
            . Prefer to read the code first? The{" "}
            <Link
              href="/docs/installation"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              copy-paste path
            </Link>{" "}
            works too.
          </p>
        </section>

        <section id="next-steps" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Next steps
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {NEXT_STEPS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 outline-none transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <item.icon className="size-4 text-muted" aria-hidden />
                    {item.title}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-ink">
                    Read more
                    <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
