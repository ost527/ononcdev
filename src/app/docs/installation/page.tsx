import type { Metadata } from "next";
import Link from "next/link";
import { componentCount } from "@/registry";
import { absoluteUrl } from "@/lib/site";
import { Code, Snippet } from "@/components/docs/docs-prose";
import { DocsPageHeader } from "@/components/docs/docs-page-header";

export const metadata: Metadata = {
  title: "Installation — ONONC Docs",
  description:
    "Two ways to add ONONC components: the shadcn CLI (recommended) or copy-paste from the component's Code tab. Here's what each installs.",
  alternates: { canonical: "/docs/installation" },
  openGraph: {
    title: "Installation — ONONC",
    description:
      "Add ONONC components with the shadcn CLI or copy-paste, and what each brings into your project.",
    url: absoluteUrl("/docs/installation"),
    type: "article",
  },
};

const INSTALL_CMD = `npx shadcn@latest add ${absoluteUrl("/r/aurora-background.json")}`;

const COPY_STEPS: React.ReactNode[] = [
  <>
    Open a component&apos;s page and switch to the{" "}
    <span className="font-medium text-foreground">Code</span> tab.
  </>,
  <>
    Copy the source into your project (for example{" "}
    <Code>components/</Code>).
  </>,
  <>
    Install the design tokens once so the classes resolve — see{" "}
    <Link
      href="/docs/theming"
      className="font-medium text-foreground underline-offset-4 hover:underline"
    >
      Theming
    </Link>
    .
  </>,
  <>
    Add any missing packages the file imports (<Code>motion</Code>,{" "}
    <Code>lucide-react</Code>, <Code>clsx</Code>, <Code>tailwind-merge</Code>).
  </>,
];

const INCLUDED: string[] = [
  "The component's .tsx source.",
  "Every internal file it imports — helpers (the cn utility) and sibling components — at your project's configured aliases.",
  "ONONC's Tailwind v4 design tokens and keyframes, written into your globals.css.",
  "Its real npm dependencies (clsx, tailwind-merge, motion, lucide-react). react / react-dom / next are treated as peers and left alone.",
];

export default function InstallationPage() {
  return (
    <article className="max-w-3xl">
      <DocsPageHeader
        title="Installation"
        description={
          <>
            Add any of the {componentCount} components two ways — with the
            shadcn CLI, or by copying the source. Both leave the code in your
            repo for you to own and edit.
          </>
        }
      />

      <div className="mt-10 space-y-12 text-pretty leading-relaxed text-muted">
        <section id="cli" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            shadcn CLI (recommended)
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Every component is published to a shadcn-compatible registry, so one
            command installs it end to end:
          </p>
          <Snippet label="Install a component with the shadcn CLI">
            {INSTALL_CMD}
          </Snippet>
          <p className="mt-4 text-sm sm:text-base">
            Replace <Code>aurora-background</Code> with the registry id of any
            component. Each component&apos;s page has a{" "}
            <span className="font-medium text-foreground">Copy for AI</span>{" "}
            button with its exact command, and every entry in{" "}
            <a
              href="/llms.txt"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              llms.txt
            </a>{" "}
            carries one too.
          </p>
        </section>

        <section id="copy-paste" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Copy &amp; paste
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Prefer to read the code first? Every component ships its real source
            on the site.
          </p>
          <ol className="mt-5 space-y-4">
            {COPY_STEPS.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border bg-surface text-xs font-medium text-muted">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-muted">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section id="whats-included" className="scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What the install includes
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            The CLI resolves the whole dependency graph so nothing renders
            unstyled or with missing imports. A single{" "}
            <Code>add</Code> brings:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm marker:text-muted-2 sm:text-base">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm sm:text-base">
            To set the tokens up once, on their own, see{" "}
            <Link
              href="/docs/theming"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Theming
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
