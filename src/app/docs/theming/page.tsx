import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { Code, Snippet } from "@/components/docs/docs-prose";
import { DocsPageHeader } from "@/components/docs/docs-page-header";

export const metadata: Metadata = {
  title: "Theming — ONONC Docs",
  description:
    "ONONC components are styled with Tailwind v4 design tokens. Install them with the CLI, or copy the token layer by hand, so components render correctly.",
  alternates: { canonical: "/docs/theming" },
  openGraph: {
    title: "Theming — ONONC",
    description:
      "Install ONONC's Tailwind v4 design tokens with the CLI or copy them by hand.",
    url: absoluteUrl("/docs/theming"),
    type: "article",
  },
};

const THEME_CMD = `npx shadcn@latest add ${absoluteUrl("/r/ononc-theme.json")}`;

export default function ThemingPage() {
  return (
    <article className="max-w-3xl">
      <DocsPageHeader
        title="Theming"
        description={
          <>
            ONONC is styled with Tailwind v4 design tokens. A component needs
            those tokens present to render correctly — here is how to install
            them.
          </>
        }
      />

      <div className="mt-10 space-y-12 text-pretty leading-relaxed text-muted">
        <section id="design-tokens" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Design tokens
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Components reference Tailwind v4 tokens — colors like{" "}
            <Code>surface</Code>, <Code>brand</Code>, and <Code>muted</Code> —
            plus custom animations and keyframes. These live in your{" "}
            <Code>globals.css</Code> as CSS-first <Code>@theme</Code> variables.
            Without them, the utility classes on a copied component won&apos;t
            resolve.
          </p>
        </section>

        <section id="install-theme" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Install the theme
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Installing any component with the CLI brings the tokens
            automatically. To set them up on their own — for example before you
            copy-paste — install the theme registry item once:
          </p>
          <Snippet label="Install the ONONC design tokens">{THEME_CMD}</Snippet>
          <p className="mt-4 text-sm sm:text-base">
            This writes the <Code>@theme</Code> tokens, the{" "}
            <Code>:root</Code>/<Code>.dark</Code> variables, keyframes, and
            utilities into your <Code>globals.css</Code> without adding any
            component files.
          </p>
        </section>

        <section id="by-hand" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Copy the tokens by hand
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Not using the CLI? Copy the token layer — the <Code>@theme</Code>,{" "}
            <Code>:root</Code>/<Code>.dark</Code> variables, keyframes, and
            utilities — from <Code>src/app/globals.css</Code>, and the{" "}
            <Code>cn</Code> helper from <Code>src/lib/utils.ts</Code>. The full
            breakdown, with the exact token list, is in the{" "}
            <Link
              href="/introduction#design-tokens"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              design tokens guide
            </Link>
            .
          </p>
        </section>

        <section id="naming" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            A note on token names
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            The tokens include generic names (<Code>background</Code>,{" "}
            <Code>foreground</Code>, <Code>border</Code>, <Code>muted</Code>,{" "}
            <Code>ring</Code>). Installing into a project that already defines
            them — an existing shadcn theme, say — overrides those with
            ONONC&apos;s values. Reconcile or scope them to your design system as
            needed.
          </p>
        </section>
      </div>
    </article>
  );
}
