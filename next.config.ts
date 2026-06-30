import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project lives next to other lockfiles; pin the workspace root so
  // Turbopack doesn't infer a parent directory.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
