import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { categories, componentCount } from "@/registry";
import { groupItems } from "@/registry/subcategories";

export const metadata: Metadata = {
  title: "Introduction — ONONC",
  description:
    "Introduction to ONONC, an original, motion-first React component library for Next.js.",
};

const STACK = [
  "Next.js 16 (App Router)",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Framer Motion",
  "Lucide React",
  "Prism React Renderer",
];

/** Inline code token — filenames, commands, identifiers. */
function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}

export default function IntroductionPage() {
  return (
    <article className="py-10">
      <header className="border-b border-border pb-6">
        <p className="text-sm font-medium text-muted-2">Getting started</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Introduction
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          ONONC is an original, motion-first React component library for
          Next.js. {" "}
          {componentCount} components across {categories.length} categories,
          covering animated backgrounds, text effects, interactive primitives,
          and ready-made section blocks. Everything is built from scratch with
          dark-first design tokens and screen-reader friendly interactions.
        </p>
      </header>

      <div className="mt-8 max-w-2xl space-y-10 text-pretty leading-relaxed text-muted">
        <section id="what-is-ononc" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            What is ONONC?
          </h2>
          <p className="mt-3">
            Every component is written from scratch. No third-party UI kit is
            wrapped or re-exported. The focus is on motion that feels
            intentional: ambient canvases that pause when off-screen,
            typographic reveals that stay semantic, and interactive primitives
            with full keyboard support. Each component ships its real source so
            you can read it, tweak it, and paste it straight into your own
            project.
          </p>
        </section>

        <section id="categories" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Categories
          </h2>
          <p className="mt-3">
            The library is organized into {categories.length} categories. Each
            one has its own page with live previews and copy-paste source.
          </p>
          <dl className="mt-5 space-y-5">
            {categories.map((category) => {
              const groups = groupItems(category);
              return (
                <div key={category.id} className="border-l border-border pl-4">
                  <dt className="flex flex-wrap items-baseline gap-2">
                    <Link
                      href={`/${category.id}`}
                      className="font-medium text-foreground transition-colors hover:text-brand-ink"
                    >
                      {category.label}
                    </Link>
                    <span className="text-xs text-muted-2">
                      {category.items.length} components
                      {groups.length > 0
                        ? ` · ${groups.length} sub-categories`
                        : ""}
                    </span>
                  </dt>
                  <dd className="mt-1.5">{category.blurb}</dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section id="using-this-site" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Using this site
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 marker:text-muted-2">
            <li>
              <span className="font-medium text-foreground">Browse</span> a
              category from the sidebar to see every component it contains,
              grouped by sub-category.
            </li>
            <li>
              <span className="font-medium text-foreground">Preview</span> each
              component live in its frame, then switch to the{" "}
              <span className="font-medium text-foreground">Code</span> tab to
              read the source and copy it.
            </li>
            <li>
              <span className="font-medium text-foreground">Customize</span>{" "}
              interactively on a component&apos;s detail page. Tweak props live,
              resize the viewport, and inspect the Props table.
            </li>
          </ol>
          <p className="mt-4">
            Component sources are read at build time via{" "}
            <Code>src/lib/source.ts</Code> and embedded directly in the Code
            tab. There is no backend, no API, and no runtime data fetching.
          </p>
        </section>

        <section id="design-tokens" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Design tokens
          </h2>
          <p className="mt-3">
            ONONC components are styled with Tailwind v4 design tokens (colors
            like <Code>surface</Code>, <Code>brand</Code>, <Code>muted</Code>),
            custom animations, and keyframes that live in{" "}
            <Code>src/app/globals.css</Code>. A component needs those tokens
            present to render correctly.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-muted-2">
            <li>
              <span className="font-medium text-foreground">
                Installing with the CLI
              </span>{" "}
              brings them automatically —{" "}
              <Code>{"npx shadcn@latest add https://dev.ononc.com/r/<id>.json"}</Code>{" "}
              writes the tokens and keyframes into your <Code>globals.css</Code>{" "}
              alongside the component.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Want just the theme?
              </span>{" "}
              Run{" "}
              <Code>
                npx shadcn@latest add https://dev.ononc.com/r/ononc-theme.json
              </Code>{" "}
              to set up the tokens once, up front.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Copying by hand?
              </span>{" "}
              Also copy the token layer (the <Code>@theme</Code>,{" "}
              <Code>:root</Code>/<Code>.dark</Code> variables, keyframes, and
              utilities) from <Code>src/app/globals.css</Code>, plus the{" "}
              <Code>cn</Code> helper from <Code>src/lib/utils.ts</Code>.
            </li>
          </ul>
          <p className="mt-4">
            Heads-up: the tokens include generic names (<Code>background</Code>,{" "}
            <Code>foreground</Code>, <Code>border</Code>, <Code>muted</Code>,{" "}
            <Code>ring</Code>). Installing into a project that already defines
            them (for example an existing shadcn theme) overrides those with
            ONONC&apos;s values — reconcile or scope them as needed.
          </p>
        </section>

        <section id="built-with" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Built with
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {STACK.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-surface px-2.5 py-1 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="accessibility" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Accessibility &amp; performance
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-muted-2">
            <li>
              All animations collapse to near-zero under{" "}
              <Code>prefers-reduced-motion: reduce</Code>.
            </li>
            <li>
              Canvas backgrounds pause when off-screen and when the tab is
              hidden, with device pixel ratio capped at 2.
            </li>
            <li>
              Interactive components are keyboard-navigable with full ARIA roles
              and properties.
            </li>
            <li>
              Text animations preserve semantic HTML so screen readers always
              read the intended content.
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
