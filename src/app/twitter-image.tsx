import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

// Required for `output: export` — the image is baked once at build time.
export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = OG_ALT;

export default function TwitterImage() {
  return renderOgImage();
}
