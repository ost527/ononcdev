/**
 * Central docs navigation. Add pages here and they appear in the sidebar,
 * the mobile menu, and the sitemap automatically. Groups render as collapsible
 * dropdowns in the docs sidebar (the group holding the current page opens by
 * default). Keep the first group's first item at `/docs` (the section landing).
 */
export interface DocsNavItem {
  title: string;
  href: string;
}

export interface DocsNavGroup {
  label: string;
  items: DocsNavItem[];
}

export const DOCS_NAV: DocsNavGroup[] = [
  {
    label: "Get started",
    items: [
      { title: "Getting Started", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Usage", href: "/docs/usage" },
    ],
  },
  {
    label: "Guides",
    items: [
      { title: "For AI agents", href: "/docs/ai-agents" },
      { title: "Resources", href: "/docs/resources" },
      { title: "Changelog", href: "/docs/changelog" },
    ],
  },
];

/** Unique internal `/docs…` routes, for the sitemap. */
export function docsInternalPaths(): string[] {
  const seen = new Set<string>();
  for (const group of DOCS_NAV) {
    for (const item of group.items) {
      if (item.href.startsWith("/docs")) seen.add(item.href);
    }
  }
  return [...seen];
}
