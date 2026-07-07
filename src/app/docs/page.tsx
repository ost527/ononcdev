import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Palette, Terminal, Wrench } from "lucide-react";
import { componentCount, categories } from "@/registry";
import { absoluteUrl } from "@/lib/site";
import { Code, Table } from "@/components/docs/docs-prose";
import { DocsPageHeader } from "@/components/docs/docs-page-header";

export const metadata: Metadata = {
  title: "Getting Started — ONONC Docs",
  description:
    "How ONONC works, the prerequisites, and a map of the docs — installation, theming, and usage — for the motion-first React component library.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Getting Started with ONONC",
    description:
      "How ONONC works, prerequisites, and where to go next: installation, theming, and usage.",
    url: absoluteUrl("/docs"),
    type: "article",
  },
};

const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "Real source, in your repo",
    body: "Adding a component drops its actual .tsx into your project. You read it, edit it, and own it — there is no black box and no version to upgrade.",
  },
  {
    title: "No lock-in",
    body: "Because it is just your code, you can change anything. Nothing is package-locked, so teammates and AI agents extend it like any other file.",
  },
  {
    title: "Motion-first & accessible",
    body: "Every component is built from scratch with keyboard support and prefers-reduced-motion handling — the eye-candy is accessible too.",
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
    body: "Add a component with the shadcn CLI or by copying its source — and exactly what lands in your project.",
  },
  {
    href: "/docs/theming",
    icon: Palette,
    title: "Theming",
    body: "Install the design tokens so components render correctly, then customize colors, radius, and fonts.",
  },
  {
    href: "/docs/usage",
    icon: Wrench,
    title: "Usage",
    body: "Import a component, customize its props on the playground, and browse the full library.",
  },
];

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
            components across {categories.length} categories, built from scratch
            with no package to depend on. This page explains how it works and
            what you need; the guides that follow take you from an empty project
            to a component on the page.
          </>
        }
      />

      <div className="mt-10 space-y-12 text-pretty leading-relaxed text-muted">
        <section id="how-it-works" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How ONONC works
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            ONONC is not an npm package you install and import. Every component
            is real source code you bring into your project — with the{" "}
            <span className="font-medium text-foreground">shadcn CLI</span> or by
            copying it from the site — after which the file lives in{" "}
            <span className="font-medium text-foreground">your</span> repo.
            Getting productive is three short steps:{" "}
            <Link
              href="/docs/installation"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              install
            </Link>{" "}
            a component,{" "}
            <Link
              href="/docs/theming"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              set up the tokens
            </Link>
            , then{" "}
            <Link
              href="/docs/usage"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              use
            </Link>{" "}
            it.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {PRINCIPLES.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="prerequisites" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Prerequisites
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            ONONC components are idiomatic React + Tailwind — no bespoke runtime
            and no UI-kit dependency. You need:
          </p>
          <Table
            head={["Requirement", "Notes"]}
            rows={[
              [
                <span key="t" className="font-medium text-foreground">
                  React 19
                </span>,
                <>
                  Components are plain <Code>.tsx</Code> files, so any React 19
                  app works. Next.js (App Router) is what ONONC is built and
                  tested on.
                </>,
              ],
              [
                <span key="t" className="font-medium text-foreground">
                  Tailwind CSS v4
                </span>,
                <>
                  Styling uses Tailwind v4 utilities and CSS-first{" "}
                  <Code>@theme</Code> tokens. Set the tokens up once — see{" "}
                  <Link
                    href="/docs/theming"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Theming
                  </Link>
                  .
                </>,
              ],
              [
                <span key="t" className="font-medium text-foreground">
                  A shadcn setup
                </span>,
                <>
                  The one-command install uses the shadcn CLI, which needs a{" "}
                  <Code>components.json</Code> (run{" "}
                  <Code>npx shadcn@latest init</Code> once). Not required if you
                  copy-paste instead.
                </>,
              ],
              [
                <span key="t" className="font-medium text-foreground">
                  A few peer packages
                </span>,
                <>
                  <Code>motion</Code> (Framer Motion) for animation,{" "}
                  <Code>lucide-react</Code> for icons, and{" "}
                  <Code>clsx</Code> + <Code>tailwind-merge</Code> for the{" "}
                  <Code>cn</Code> helper. The CLI installs these for you.
                </>,
              ],
            ]}
          />
        </section>

        <section id="next-steps" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Next steps
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Three short guides take you from an empty project to a component on
            the page:
          </p>
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
