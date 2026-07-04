/**
 * Public origin of the deployed site. Absolute URLs (llms.txt, canonical, OG)
 * are built from this. Override at build time with NEXT_PUBLIC_SITE_URL; the
 * default is the production domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev.ononc.com"
).replace(/\/+$/, "");

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
