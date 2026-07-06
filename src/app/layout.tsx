import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { FooterBlock, type FooterColumn } from "@/components/blocks/footer-block";
import { SiteHeader } from "@/components/showcase/site-header";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "@/components/ui/toast";
import { categories } from "@/registry";
import { SITE_URL } from "@/lib/site";

const CONTACT_EMAIL = "ononc@ononc.com";

/** Real, registry-synced footer navigation — every link resolves to a route. */
const footerColumns: FooterColumn[] = [
  {
    heading: "Library",
    links: categories.map((category) => ({
      label: category.label,
      href: `/${category.id}`,
    })),
  },
  {
    // Getting-started content (Introduction, AI agents, Resources, Changelog)
    // is consolidated on /docs, which links out to each of those pages.
    heading: "Support",
    links: [{ label: "Docs", href: "/docs" }],
  },
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_TITLE = "ONONC — Original animated component library";
const SITE_DESCRIPTION =
  "An original, motion-first React component library for Next.js: animated backgrounds, text effects, interactive components, and section blocks.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "ONONC",
  keywords: [
    "React component library",
    "Next.js components",
    "Tailwind CSS",
    "animated backgrounds",
    "text animations",
    "UI components",
    "section blocks",
    "Framer Motion",
    "shadcn registry",
    "ONONC",
  ],
  authors: [{ name: "ONONC" }],
  creator: "ONONC",
  openGraph: {
    type: "website",
    siteName: "ONONC",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark');}catch(e){}})();",
          }}
        />
        <ScrollProgress />
        <SiteHeader />
        {children}
        <div className="site-shell mt-auto pb-20 pt-24">
          <FooterBlock
            brand="ONONC"
            columns={footerColumns}
            note={
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="rounded-sm underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60"
              >
                {CONTACT_EMAIL}
              </a>
            }
          />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
