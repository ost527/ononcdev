import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site to `out/` for static hosting (Cloudflare Pages).
  output: "export",
  // The default next/image loader needs a server; static export requires
  // either a custom loader or unoptimized images. This site has 1 image use.
  images: {
    unoptimized: true,
  },
  // This project lives next to other lockfiles; pin the workspace root so
  // Turbopack doesn't infer a parent directory.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
