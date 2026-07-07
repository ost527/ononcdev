import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";
import { absoluteUrl } from "@/lib/site";
import { CodeBlock } from "@/components/showcase/code-block";
import { Code, Table } from "@/components/docs/docs-prose";
import { DocsPageHeader } from "@/components/docs/docs-page-header";
import { categories, componentCount } from "@/registry";

export const metadata: Metadata = {
  title: "Usage — ONONC Docs",
  description:
    "Import an installed ONONC component, pass typed props, try it live on its playground, and rely on reduced-motion and a11y defaults out of the box.",
  alternates: { canonical: "/docs/usage" },
  openGraph: {
    title: "Usage — ONONC",
    description:
      "Import an installed ONONC component, pass typed props, and try it live on its playground before you ship.",
    url: absoluteUrl("/docs/usage"),
    type: "article",
  },
};

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
      name: "Usage",
      item: absoluteUrl("/docs/usage"),
    },
  ],
};

const USAGE_EXAMPLE = `// The CLI writes the file to your configured components alias.
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
      <DocsPageHeader
        title="Usage"
        description={
          <>
            Once a component is in your project, using it is ordinary React —
            import it, pass props, and compose it like any other component.
          </>
        }
      />

      <div className="mt-10 space-y-12 text-pretty leading-relaxed text-muted">
        <section id="import" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Import and render
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Import the component from wherever the CLI wrote it — your
            configured components alias — and drop it into your JSX like you
            would any other React component. No providers, no context, no
            runtime package to register: the file in your repo is the whole
            component.
          </p>
          <CodeBlock code={USAGE_EXAMPLE} language="tsx" />
          <p className="mt-4 text-sm sm:text-base">
            Haven&apos;t installed anything yet? See{" "}
            <Link
              href="/docs/installation"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Installation
            </Link>{" "}
            for the CLI command and the copy-paste path.
          </p>
        </section>

        <section id="props" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Props &amp; customization
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Every component takes a <Code>className</Code> and a set of
            sensible, typed props for the things you&apos;d actually want to
            change — colors, speed, size, copy. The <Code>className</Code>{" "}
            you pass merges with the component&apos;s own classes (via the{" "}
            <Code>cn</Code> helper — see{" "}
            <Link
              href="/docs/theming"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Theming
            </Link>
            ), so you can override layout, spacing, or color without fighting
            specificity or forking the file.
          </p>
          <p className="mt-3 text-sm sm:text-base">
            The exact prop list differs per component, so read the{" "}
            <span className="font-medium text-foreground">Props table</span>{" "}
            on its detail page before wiring it up — it documents every prop,
            its type, and its default.
          </p>
        </section>

        <section id="playground" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            The component playground
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Every non-block component has a detail page where you can try it
            before you copy it. It&apos;s a small playground, not just a static
            preview:
          </p>
          <Table
            head={["Feature", "What it does"]}
            rows={[
              [
                "Preview / Code tabs",
                "Flip between the live component and its syntax-highlighted source.",
              ],
              [
                "Viewport presets",
                "Preview at Desktop, Tablet (768px), or Mobile (390px).",
              ],
              [
                "Resize handle",
                "Drag or use the arrow keys to resize the preview.",
              ],
              [
                "Customize panel",
                "Tweak props live, for components that expose controls.",
              ],
              [
                "Props table",
                "The full typed prop reference for that component.",
              ],
            ]}
          />
          <p className="mt-4 text-sm sm:text-base">
            Browse to any component and open its page to try this yourself.
          </p>
        </section>

        <section id="accessibility" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Accessibility &amp; reduced motion
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            None of this is opt-in. Every component in the library is built
            with the same accessibility and motion defaults, so you don&apos;t
            have to remember to wire them up yourself:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm marker:text-muted-2 sm:text-base">
            <li>
              Animations collapse to near-zero under{" "}
              <Code>prefers-reduced-motion: reduce</Code>.
            </li>
            <li>
              Canvas backgrounds pause when off-screen and when the tab is
              hidden.
            </li>
            <li>
              Interactive components are keyboard-navigable with full ARIA.
            </li>
            <li>
              Text effects keep semantic HTML so screen readers read the real
              content.
            </li>
          </ul>
          <p className="mt-4 text-sm sm:text-base">
            So the defaults are production-safe — you can ship a component as
            installed and trust it behaves for every user.
          </p>
        </section>

        <section id="browse" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Browse the library
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            {componentCount} components across {categories.length}{" "}
            categories, each with live previews and copy-paste source.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/${c.id}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 outline-none transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {c.label}
                    </span>
                    <span className="rounded-full border border-border px-1.5 text-[11px] text-muted">
                      {c.items.length}
                    </span>
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">
                    {c.blurb}
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
            Coding agents can add components for you — point them at{" "}
            <a
              href="/llms.txt"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              /llms.txt
            </a>{" "}
            or{" "}
            <a
              href="/llms-full.txt"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              /llms-full.txt
            </a>
            .
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
