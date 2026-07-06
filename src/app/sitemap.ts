import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { categories, detailPageParams } from "@/registry";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/",
    "/introduction",
    "/ai-agents",
    "/resources",
    "/changelog",
    "/llms.txt",
    ...categories.map((category) => `/${category.id}`),
    ...detailPageParams().map((p) => `/${p.category}/${p.id}`),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path), lastModified: now }));
}
