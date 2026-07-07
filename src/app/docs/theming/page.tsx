import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { CodeBlock } from "@/components/showcase/code-block";
import { Code, Table, Steps } from "@/components/docs/docs-prose";
import { DocsPageHeader } from "@/components/docs/docs-page-header";

export const metadata: Metadata = {
  title: "Theming — ONONC Docs",
  description:
    "Understand ONONC's Tailwind v4 design tokens — install the theme with the shadcn CLI or copy it by hand, then customize colors, radius, and fonts.",
  alternates: { canonical: "/docs/theming" },
  openGraph: {
    title: "Theming — ONONC",
    description:
      "Install ONONC's Tailwind v4 design tokens with the shadcn CLI or by hand, then customize colors, radius, and fonts.",
    url: absoluteUrl("/docs/theming"),
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
      name: "Theming",
      item: absoluteUrl("/docs/theming"),
    },
  ],
};

const THEME_CMD = `npx shadcn@latest add ${absoluteUrl("/r/ononc-theme.json")}`;

const LIGHT_DARK_CSS = `@import "tailwindcss";

/* Dark mode turns on via a .dark class on <html> */
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #f6f7fb;   /* light */
  --surface: #ffffff;
  --foreground: #0c0e1a;
  --brand: #8b5cf6;
}

.dark {
  --background: #06070d;   /* dark override */
  --surface: #0b0d18;
  --foreground: #e9ebf5;
  --brand-ink: #c4b5fd;
}

@theme inline {
  /* expose the vars as Tailwind utilities: bg-surface, text-foreground, ... */
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-foreground: var(--foreground);
  --color-brand: var(--brand);
}`;

const CN_HELPER = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes, resolving conflicts (clsx + tailwind-merge). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const INSTALL_PKGS = "npm i clsx tailwind-merge";

const CUSTOMIZE_CSS = `.dark {
  --brand: #ec4899;        /* make the brand pink */
  --radius-4xl: 1.5rem;    /* tighter corners */
}`;

const TOKEN_ROWS: React.ReactNode[][] = [
  [
    <Code key="n">background</Code>,
    "Page background",
    <Code key="l">#f6f7fb</Code>,
    <Code key="d">#06070d</Code>,
  ],
  [
    <Code key="n">surface</Code>,
    "Cards & raised panels",
    <Code key="l">#ffffff</Code>,
    <Code key="d">#0b0d18</Code>,
  ],
  [
    <Code key="n">surface-2</Code>,
    "Secondary surface",
    <Code key="l">#eef0f7</Code>,
    <Code key="d">#11142370</Code>,
  ],
  [
    <Code key="n">foreground</Code>,
    "Primary text",
    <Code key="l">#0c0e1a</Code>,
    <Code key="d">#e9ebf5</Code>,
  ],
  [
    <Code key="n">muted</Code>,
    "Secondary text",
    <Code key="l">#545b70</Code>,
    <Code key="d">#8a91a8</Code>,
  ],
  [
    <Code key="n">muted-2</Code>,
    "Faint text / hints",
    <Code key="l">#8a91a8</Code>,
    <Code key="d">#5b6178</Code>,
  ],
  [
    <Code key="n">border</Code>,
    "Hairline borders",
    <Code key="l">rgba(12,14,26,.1)</Code>,
    <Code key="d">rgba(255,255,255,.08)</Code>,
  ],
  [
    <Code key="n">border-strong</Code>,
    "Stronger borders",
    <Code key="l">rgba(12,14,26,.16)</Code>,
    <Code key="d">rgba(255,255,255,.14)</Code>,
  ],
  [
    <Code key="n">brand</Code>,
    "Primary brand (violet)",
    <Code key="l">#8b5cf6</Code>,
    <Code key="d">#8b5cf6</Code>,
  ],
  [
    <Code key="n">brand-ink</Code>,
    "Brand text / ink",
    <Code key="l">#6d28d9</Code>,
    <Code key="d">#c4b5fd</Code>,
  ],
  [
    <Code key="n">brand-2</Code>,
    "Secondary brand (cyan)",
    <Code key="l">#0891b2</Code>,
    <Code key="d">#22d3ee</Code>,
  ],
  [
    <Code key="n">brand-3</Code>,
    "Accent (rose)",
    <Code key="l">#e11d62</Code>,
    <Code key="d">#fb7185</Code>,
  ],
  [
    <Code key="n">ring</Code>,
    "Focus-ring color",
    <Code key="l">rgba(139,92,246,.55)</Code>,
    <Code key="d">rgba(139,92,246,.55)</Code>,
  ],
];

const COPY_STEPS: React.ReactNode[] = [
  <>
    Copy the token layer — the <Code>@theme</Code> block, the{" "}
    <Code>:root</Code>/<Code>.dark</Code> variables, the <Code>@keyframes</Code>,
    and the <Code>@utility</Code> helpers — from <Code>src/app/globals.css</Code>{" "}
    into your own <Code>globals.css</Code>.
  </>,
  <>
    Add the <Code>cn</Code> helper shown above at <Code>src/lib/utils.ts</Code>.
  </>,
  <>
    Install the two small packages it depends on:
    <CodeBlock code={INSTALL_PKGS} language="bash" className="mt-3" />
  </>,
];

export default function ThemingPage() {
  return (
    <article className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
      <DocsPageHeader
        title="Theming"
        description={
          <>
            ONONC components style themselves with a small, shared set of
            Tailwind v4 design tokens. Set them up once — with the CLI or by
            hand — and every component renders correctly, in both light and dark
            mode.
          </>
        }
      />

      <div className="mt-10 space-y-12 text-pretty leading-relaxed text-muted">
        <section id="install-theme" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Install the theme
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Here is the good news: you usually don&apos;t have to think about
            this at all. Installing{" "}
            <span className="font-medium text-foreground">any</span> component
            with the{" "}
            <Link
              href="/docs/installation"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              shadcn CLI
            </Link>{" "}
            writes the tokens into your project automatically. But if you want
            the tokens on their own — for example before you copy-paste a
            component by hand, or to share one theme across a design system —
            install the standalone theme item once:
          </p>
          <CodeBlock code={THEME_CMD} language="bash" className="mt-4" />
          <p className="mt-4 text-sm sm:text-base">
            This writes the <Code>@theme</Code> tokens, the <Code>:root</Code>/
            <Code>.dark</Code> variables, keyframes, and utilities into your{" "}
            <Code>globals.css</Code> — with no component files added.
          </p>
        </section>

        <section id="design-tokens" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Design tokens
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Rather than hard-coding colors, ONONC components paint themselves
            with a small set of Tailwind v4 tokens. In your markup they show up
            as ordinary utility classes — <Code>bg-surface</Code>,{" "}
            <Code>text-foreground</Code>, <Code>border-border</Code>,{" "}
            <Code>bg-brand</Code> — so a component always adopts the theme it is
            dropped into. Here is the full set, with the value each takes in
            light and dark mode:
          </p>
          <Table
            head={["Token", "Purpose", "Light", "Dark"]}
            rows={TOKEN_ROWS}
          />
          <p className="mt-4 text-sm sm:text-base">
            Each token maps to a Tailwind color utility through{" "}
            <Code>@theme</Code>, so <Code>surface</Code> becomes{" "}
            <Code>bg-surface</Code>, <Code>text-surface</Code>,{" "}
            <Code>border-surface</Code>, and so on. The one exception in feel is{" "}
            <Code>ring</Code>: it is the color of the <Code>:focus-visible</Code>{" "}
            outline that every interactive component draws.
          </p>
        </section>

        <section id="light-dark" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Light &amp; dark mode
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            ONONC is dark-first, but every token is defined twice.{" "}
            <Code>:root</Code> holds the default (light) values, and{" "}
            <Code>.dark</Code> overrides the ones that change for dark mode. Dark
            mode itself switches on the moment the <Code>.dark</Code> class is
            present on the <Code>&lt;html&gt;</Code> element — toggle that class
            with your theme switcher of choice and every token flips at once.
            Here is the shape of it, abbreviated:
          </p>
          <CodeBlock code={LIGHT_DARK_CSS} language="css" className="mt-4" />
        </section>

        <section id="cn-helper" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            The cn helper
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Nearly every ONONC component imports a tiny helper called{" "}
            <Code>cn</Code> to merge Tailwind class names, so a caller&apos;s{" "}
            <Code>className</Code> cleanly overrides the component&apos;s
            defaults instead of fighting them. It lives at{" "}
            <Code>src/lib/utils.ts</Code> and leans on two small packages,{" "}
            <Code>clsx</Code> and <Code>tailwind-merge</Code>. The CLI adds it
            for you; if you copy a component by hand, add this file too or its
            import will break:
          </p>
          <CodeBlock code={CN_HELPER} language="tsx" className="mt-4" />
        </section>

        <section id="copy-by-hand" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Copying tokens by hand
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Not using the CLI? No problem — do these three things once, and every
            component you copy afterward will render correctly:
          </p>
          <Steps steps={COPY_STEPS} />
          <p className="mt-4 text-sm sm:text-base">
            Want the complete, annotated list of tokens to copy? See the{" "}
            <Link
              href="/introduction#design-tokens"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              design tokens guide
            </Link>
            .
          </p>
        </section>

        <section id="customizing" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Customizing your theme
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Because everything routes through CSS variables, restyling ONONC is
            mostly a matter of editing values — no component changes required. To
            recolor, change a token&apos;s value in both <Code>:root</Code> and{" "}
            <Code>.dark</Code> so it holds in either mode. Corner rounding lives
            in the <Code>--radius-4xl</Code> token (the <Code>rounded-4xl</Code>{" "}
            utility), and typography is driven by <Code>--font-sans</Code> and{" "}
            <Code>--font-mono</Code>. For example:
          </p>
          <CodeBlock code={CUSTOMIZE_CSS} language="css" className="mt-4" />
        </section>

        <section id="token-names" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            A note on token names
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            A few tokens use deliberately generic names — <Code>background</Code>
            , <Code>foreground</Code>, <Code>border</Code>, <Code>muted</Code>,{" "}
            <Code>ring</Code>. If you install ONONC into a project that already
            defines those — an existing shadcn theme, say — the incoming values
            will override yours. That is easy to live with: reconcile the
            overlapping tokens, or scope ONONC&apos;s under a wrapper class, so
            the two themes can coexist.
          </p>
        </section>
      </div>
    </article>
  );
}
