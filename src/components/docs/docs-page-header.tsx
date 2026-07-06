import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Consistent docs page header: a "Docs / <title>" breadcrumb, the H1, and a
 * short description. The <h1> is the only one on the page; section headings
 * below it are <h2>.
 */
export function DocsPageHeader({
  title,
  description,
}: {
  title: string;
  description: ReactNode;
}) {
  return (
    <header className="border-b border-border pb-8">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-2">
        <Link href="/docs" className="transition-colors hover:text-foreground">
          Docs
        </Link>
        <span className="mx-1.5 opacity-50">/</span>
        <span className="text-foreground">{title}</span>
      </nav>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted">
        {description}
      </p>
    </header>
  );
}
