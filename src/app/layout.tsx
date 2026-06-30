import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FooterBlock } from "@/components/blocks/footer-block";
import { SiteHeader } from "@/components/showcase/site-header";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumen UI — Original animated component library",
  description:
    "An original, motion-first React component library for Next.js: animated backgrounds, text effects, interactive components, and section blocks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark');}catch(e){}})();",
          }}
        />
        <ScrollProgress />
        <SiteHeader />
        {children}
        <div className="mx-auto mt-auto w-full max-w-6xl px-4 pb-20 pt-24 sm:px-6">
          <FooterBlock />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
