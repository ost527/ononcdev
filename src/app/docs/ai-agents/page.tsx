import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, FileText, Sparkles } from "lucide-react";
import { categories, componentCount } from "@/registry";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "For AI agents — ONONC",
  description:
    "ONONC is built for AI coding agents: real copy-paste source, plain React + Tailwind, a predictable structure, and a machine-readable llms.txt index.",
  alternates: { canonical: "/docs/ai-agents" },
  openGraph: {
    title: "The React component library built for AI coding agents — ONONC",
    description:
      "Real copy-paste source, plain React + Tailwind + Framer Motion, and a machine-readable llms.txt so agents add components on the first try.",
    url: absoluteUrl("/docs/ai-agents"),
    type: "article",
  },
};

const WHY: { title: string; body: string }[] = [
  {
    title: "Real source, not a black box",
    body: "Every component's actual .tsx lives on its page and in llms-full.txt. Your agent reads, greps, and edits it like any other file in your repo.",
  },
  {
    title: "One-command install",
    body: "npx shadcn@latest add https://dev.ononc.com/r/<id>.json drops the component, every internal file it imports (helpers, sibling components), and ONONC's design tokens into your project via the shadcn registry protocol — so it renders correctly with no extra setup.",
  },
  {
    title: "Plain React + Tailwind + Framer Motion",
    body: "No bespoke DSL, no wrapper, no proprietary primitives — idiomatic code the agent already knows how to extend.",
  },
  {
    title: "Predictable structure",
    body: "Consistent naming and file layout across the registry, so the agent's pattern-matching works on the first try.",
  },
  {
    title: "A machine-readable index",
    body: "llms.txt lists every component with a description, URL, and source path; llms-full.txt inlines all of it in a single fetch.",
  },
  {
    title: "No install, no lock-in",
    body: "Copy what you need. There is no runtime package or version for the agent to reason about — what is in your repo is what runs.",
  },
  {
    title: "Reduced-motion & a11y by default",
    body: "Motion degrades under prefers-reduced-motion, canvases pause off-screen, and interactive parts stay keyboard-navigable.",
  },
];

const PRIOR_ART: { name: string; borrowed: string }[] = [
  {
    name: "shadcn/ui",
    borrowed:
      "the copy-paste registry protocol our /r/<id>.json install targets — an open standard any project can implement, not a dependency we pull in.",
  },
  {
    name: "React Bits · Aceternity · Magic UI",
    borrowed:
      "the motion-component lineage that inspired many background, text, and interactive concepts and names.",
  },
];

const DIFFERENT: string[] = [
  "No Radix, no UI dependencies — every interactive primitive (accordion, tabs, switch, modal, …) is implemented from scratch with its own ARIA, keyboard, and focus handling.",
  "Motion-first: a shared canvas lifecycle (off-screen pause, DPR cap) and Framer Motion polish across the whole library.",
  "Accessible and reduced-motion aware by default — including the eye-candy components.",
  "One dark-first design-token system spanning backgrounds, text, components, and blocks.",
  "Independently implemented — no source is vendored or copied from the projects above.",
];

const STEPS: string[] = [
  `Point the agent at the docs — e.g. "Read ${absoluteUrl("/llms.txt")}".`,
  "It picks the right component by name and description from the index.",
  `It installs with one command — npx shadcn@latest add ${absoluteUrl("/r/<id>.json")} — or copies the source straight from the component's page.`,
  "The install bundles the component, every internal file it imports (helpers, sibling components), and ONONC's design tokens + keyframes at your project's aliases and globals.css — so there are no missing imports and nothing renders unstyled.",
];

const AGENTS: string[] = [
  "Cursor",
  "Claude Code",
  "GitHub Copilot",
  "v0",
  "Windsurf",
  "Bolt.new",
  "Lovable",
  "Replit",
  "Kiro",
];

const PROMPT = `Read ${absoluteUrl("/llms.txt")} for the full ONONC component list.
Add the "Aurora" background to my hero — install it with the shadcn CLI:
npx shadcn@latest add ${absoluteUrl("/r/aurora-background.json")}
Then wire it into the page and keep the prefers-reduced-motion handling intact.`;

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
      name: "For AI agents",
      item: absoluteUrl("/docs/ai-agents"),
    },
  ],
};

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand/60";
const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-brand/60";

export default function AiAgentsPage() {
  return (
    <article className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
      <div>
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted-2">
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
          <span className="mx-1.5 opacity-50">/</span>
          <span className="text-foreground">For AI agents</span>
        </nav>

        <header className="border-b border-border pb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            <Sparkles className="size-3.5" aria-hidden />
            For AI agents
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            The component library built for{" "}
            <span className="text-gradient">AI coding agents</span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Cursor, Claude Code, Copilot, v0, and Windsurf all work better when
            the library speaks their language. ONONC ships real, copy-paste
            source, plain React + Tailwind + Framer Motion, a predictable file
            structure, and a machine-readable{" "}
            <span className="font-medium text-foreground">llms.txt</span> — so
            an agent can find and add a component on the first try.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/llms.txt" className={primaryBtn}>
              Open llms.txt
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link href="/" className={secondaryBtn}>
              Browse {componentCount} components
            </Link>
          </div>
        </header>

        <div className="mt-12 space-y-14">
          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Why ONONC works well with agents
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {WHY.map((item) => (
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

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Original work, honest about its lineage
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              ONONC is not a reskin. It shares no code with — and takes no
              dependency on — the projects that inspired it, which is also why
              an agent can read and own it so easily. What it gratefully
              borrows:
            </p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {PRIOR_ART.map((item) => (
                <li
                  key={item.name}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.borrowed}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-medium text-foreground">
              How ONONC differs
            </p>
            <ul className="mt-3 space-y-2.5">
              {DIFFERENT.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-brand-ink"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              A full component-level breakdown lives in{" "}
              <span className="font-mono text-foreground">
                docs/originality-audit.md
              </span>
              , and the libraries we recommend are on{" "}
              <Link
                href="/docs/resources"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Resources
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              How an agent uses it
            </h2>
            <ol className="mt-5 space-y-4">
              {STEPS.map((step, i) => (
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

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Point your agent at the docs
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Two plain-text endpoints describe the whole library. Give either
              URL to your agent.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <a
                href="/llms.txt"
                className="group rounded-xl border border-border bg-surface p-5 outline-none transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-brand/60"
              >
                <span className="flex items-center gap-2 font-mono text-sm font-medium text-foreground">
                  <FileText className="size-4 text-muted" aria-hidden />
                  /llms.txt
                </span>
                <span className="mt-2 block text-sm text-muted">
                  Concise index — every component with a description, URL, and
                  source path.
                </span>
              </a>
              <a
                href="/llms-full.txt"
                className="group rounded-xl border border-border bg-surface p-5 outline-none transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-brand/60"
              >
                <span className="flex items-center gap-2 font-mono text-sm font-medium text-foreground">
                  <FileText className="size-4 text-muted" aria-hidden />
                  /llms-full.txt
                </span>
                <span className="mt-2 block text-sm text-muted">
                  Full dump — the same index plus every component&apos;s complete
                  source inlined.
                </span>
              </a>
            </div>
            <p className="mt-6 text-sm font-medium text-foreground">
              Example prompt
            </p>
            <pre className="mt-2 overflow-x-auto rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
              <code className="font-mono">{PROMPT}</code>
            </pre>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The install brings the component&apos;s{" "}
              <span className="font-medium text-foreground">.tsx</span> source,
              the internal files it imports, and ONONC&apos;s Tailwind v4 design
              tokens + keyframes (written into your{" "}
              <span className="font-mono text-foreground">globals.css</span>) —
              so it renders correctly with no extra setup. To set up the tokens
              on their own first, run{" "}
              <span className="font-mono text-foreground">
                npx shadcn@latest add {absoluteUrl("/r/ononc-theme.json")}
              </span>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Works with your agent
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The contract is plain text and copy-paste, so any agent that can
              read a URL and edit files works — nothing to install, nothing
              agent-specific to maintain.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {AGENTS.map((agent) => (
                <li
                  key={agent}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 text-sm text-muted"
                >
                  {agent}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">
              Build with ONONC
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Copy-paste source across {categories.length} categories. No
              install, no lock-in.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className={primaryBtn}>
                Browse components
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a href="/llms.txt" className={secondaryBtn}>
                Open llms.txt
              </a>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
