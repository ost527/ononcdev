import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";
import { categories, componentCount } from "@/registry";
import { absoluteUrl } from "@/lib/site";
import { Code, Snippet } from "@/components/docs/docs-prose";
import { DocsPageHeader } from "@/components/docs/docs-page-header";

export const metadata: Metadata = {
  title: "Usage — ONONC Docs",
  description:
    "Import an ONONC component, customize its props on the detail page, and browse the full library across four categories.",
  alternates: { canonical: "/docs/usage" },
  openGraph: {
    title: "Usage — ONONC",
    description:
      "Import a component, customize its props, and browse the ONONC library.",
    url: absoluteUrl("/docs/usage"),
    type: "article",
  },
};

const USAGE = `// The CLI writes the file to your configured components alias.
import { AuroraBackground } from "@/components/backgrounds/aurora-background";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl">
      <AuroraBackground className="absolute inset-0 -z-10" />
      <div className="px-8 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Ship something beautiful
        </h1>
      </div>
    </section>
  );
}`;

export default function UsagePage() {
  return (
    <article className="max-w-3xl">
      <DocsPageHeader
        title="Usage"
        description={
          <>
            Once a component is in your project, using it is ordinary React.
            Import it, pass props, and compose it like any other component.
          </>
        }
      />

      <div className="mt-10 space-y-12 text-pretty leading-relaxed text-muted">
        <section id="import" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Import and render
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Import the component from wherever the CLI wrote it (your configured
            components alias) and drop it into your JSX:
          </p>
          <Snippet label="Example usage of a component">{USAGE}</Snippet>
        </section>

        <section id="props" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Props &amp; customization
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Every component accepts a <Code>className</Code> and sensible,
            typed props. Open a component&apos;s detail page to tweak props
            live, resize the viewport, and read its full Props table — then copy
            the configured source. Motion respects{" "}
            <Code>prefers-reduced-motion</Code>, and canvas backgrounds pause
            when off-screen, so the defaults are production-safe.
          </p>
        </section>

        <section id="browse" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Browse the library
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            {componentCount} components, grouped into {categories.length}{" "}
            categories. Each has live previews and copy-paste source.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/${category.id}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 outline-none transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {category.label}
                    </span>
                    <span className="rounded-full border border-border px-1.5 text-[11px] text-muted">
                      {category.items.length}
                    </span>
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">
                    {category.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="ai-agents" className="scroll-mt-24">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            <Bot className="size-5 text-muted" aria-hidden />
            For AI agents
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Coding agents can add components for you. Point them at{" "}
            <a
              href="/llms.txt"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              /llms.txt
            </a>{" "}
            (concise index) or{" "}
            <a
              href="/llms-full.txt"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              /llms-full.txt
            </a>{" "}
            (every source inlined), then let them install with the CLI.
          </p>
          <div className="mt-5">
            <Link
              href="/docs/ai-agents"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-brand/60"
            >
              Read the AI agents guide
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
