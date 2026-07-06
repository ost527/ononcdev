import type { ReactNode } from "react";
import { DocsMobileNav, DocsSidebar } from "@/components/docs/docs-sidebar";

/**
 * Docs shell: collapsible left sidebar + content. Every page under /docs
 * shares this chrome; add pages via `src/components/docs/docs-nav.ts`.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell flex w-full gap-8 py-10">
      <DocsSidebar />
      <div className="min-w-0 flex-1">
        <DocsMobileNav />
        <main>{children}</main>
      </div>
    </div>
  );
}
