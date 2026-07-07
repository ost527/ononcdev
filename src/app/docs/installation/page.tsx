import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { CodeBlock } from "@/components/showcase/code-block";
import { Code, Table, Steps } from "@/components/docs/docs-prose";
import { DocsPageHeader } from "@/components/docs/docs-page-header";
import { componentCount } from "@/registry";

export const metadata: Metadata = {
  title: "Installation — ONONC Docs",
  description:
    "Add ONONC components with the shadcn CLI or by copying the source. What each command installs, and what to do with the copy-paste path.",
  alternates: { canonical: "/docs/installation" },
  openGraph: {
    title: "Installation — ONONC",
    description:
      "Add ONONC components with the shadcn CLI or by copying the source. What each command installs, and what to do with the copy-paste path.",
    url: absoluteUrl("/docs/installation"),
    type: "article",
  },
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Docs", item: absoluteUrl("/docs") },
    {
      "@type": "ListItem",
      position: 3,
      name: "Installation",
      item: absoluteUrl("/docs/installation"),
    },
  ],
};

const INIT_CMD = `npx shadcn@latest init`;

const ADD_CMD = `npx shadcn@latest add ${absoluteUrl("/r/aurora-background.json")}`;

export default function InstallationPage() {
  return (
    <article className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
      <DocsPageHeader
        title="Installation"
        description={
          <>
            Add any of the {componentCount} components two ways — the shadcn
            CLI or copy-paste — and both leave the code in your repo to own
            and edit.
          </>
        }
      />

      <div className="mt-10 space-y-12 text-pretty leading-relaxed text-muted">
        <section id="requirements" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Requirements
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            The CLI install needs a shadcn-configured project — a{" "}
            <Code>components.json</Code> at the root telling the CLI where
            your aliases and Tailwind config live. If you don&apos;t have one
            yet, create it once:
          </p>
          <CodeBlock code={INIT_CMD} language="bash" />
          <p className="mt-4 text-sm sm:text-base">
            This is only needed for the CLI path — copy-paste works in any
            project, no <Code>components.json</Code> required. For the rest of
            the setup (Tailwind v4, Next.js 16, React 19), see{" "}
            <Link
              href="/docs"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Getting Started
            </Link>
            .
          </p>
        </section>

        <section id="cli" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Install with the shadcn CLI (recommended)
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Every component is published to a shadcn-compatible registry, so
            one command installs it end to end — the source file, its
            internal imports, ONONC&apos;s design tokens, and its npm
            dependencies:
          </p>
          <CodeBlock code={ADD_CMD} language="bash" />
          <p className="mt-4 text-sm sm:text-base">
            Replace <Code>aurora-background</Code> with any other
            component&apos;s registry id. The fastest way to get the exact
            command for a specific component is the{" "}
            <span className="font-medium text-foreground">Copy for AI</span>{" "}
            button on that component&apos;s page — it&apos;s also listed
            against every entry in{" "}
            <a
              href="/llms.txt"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              llms.txt
            </a>
            , which is handy if you&apos;re scripting an install or handing
            it to a coding agent.
          </p>
        </section>

        <section id="whats-installed" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What gets installed
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            The CLI resolves the whole dependency graph before writing
            anything, so a component never renders unstyled or with a missing
            import. A single <Code>add</Code> brings in four things:
          </p>
          <Table
            head={["Item", "Where it goes"]}
            rows={[
              [
                <>
                  The component <Code>.tsx</Code> source
                </>,
                <>
                  Your <Code>@/components</Code> alias
                </>,
              ],
              [
                <>
                  Internal imports it needs — the <Code>cn</Code> helper and
                  any sibling components
                </>,
                <>
                  Your <Code>@/lib</Code> and <Code>@/components</Code>{" "}
                  aliases
                </>,
              ],
              [
                <>ONONC&apos;s design tokens + keyframes</>,
                <>
                  Appended to your <Code>globals.css</Code> (details in{" "}
                  <Link
                    href="/docs/theming"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Theming
                  </Link>
                  )
                </>,
              ],
              [
                <>
                  npm dependencies (<Code>clsx</Code>, <Code>tailwind-merge</Code>
                  , <Code>motion</Code>, <Code>lucide-react</Code>)
                </>,
                <>
                  Your <Code>package.json</Code> — react/react-dom/next are
                  peers and left alone
                </>,
              ],
            ]}
          />
        </section>

        <section id="copy-paste" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Copy &amp; paste
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Prefer to read the code first, or working somewhere the CLI
            can&apos;t reach? Every component ships its real source on the
            site — no registry round-trip required.
          </p>
          <Steps
            steps={[
              <>
                Open a component&apos;s page and switch to the{" "}
                <Code>Code</Code> tab.
              </>,
              <>
                Copy the source into your project (e.g.{" "}
                <Code>components/</Code>).
              </>,
              <>
                Set up the design tokens once so the classes resolve — see{" "}
                <Link
                  href="/docs/theming"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Theming
                </Link>
                .
              </>,
              <>
                Add any packages the file imports (<Code>motion</Code>,{" "}
                <Code>lucide-react</Code>, <Code>clsx</Code>,{" "}
                <Code>tailwind-merge</Code>).
              </>,
            ]}
          />
          <p className="mt-4 text-sm sm:text-base">
            That&apos;s the whole paste flow — the token details themselves
            belong to{" "}
            <Link
              href="/docs/theming"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Theming
            </Link>
            , not here.
          </p>
        </section>

        <section id="next" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Next
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Once a component is installed, head to{" "}
            <Link
              href="/docs/usage"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Usage
            </Link>{" "}
            to import it and start customizing.
          </p>
        </section>
      </div>
    </article>
  );
}
