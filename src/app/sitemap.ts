import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { categories, detailPageParams } from "@/registry";
import { subcategoryParams } from "@/registry/subcategory-routing";
import { docsInternalPaths } from "@/components/docs/docs-nav";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/",
    "/introduction",
    ...docsInternalPaths(),
    "/llms.txt",
    ...categories.map((category) => `/${category.id}`),
    ...subcategoryParams().map((p) => `/${p.category}/${p.id}`),
    ...detailPageParams().map((p) => `/${p.category}/${p.id}`),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path), lastModified: now }));
}
