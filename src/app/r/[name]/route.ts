import {
  allRegistryIds,
  buildRegistryItem,
  buildThemeItem,
  findRegistryItem,
  THEME_ITEM_ID,
} from "@/lib/registry-json";

// Emitted as static files (out/r/<id>.json) during `next build` (output: export).
export const dynamic = "force-static";
export const dynamicParams = false;

/** One param per component id (plus the standalone theme), with `.json`. */
export function generateStaticParams(): { name: string }[] {
  return [...allRegistryIds(), THEME_ITEM_ID].map((id) => ({
    name: `${id}.json`,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const id = name.replace(/\.json$/, "");
  if (id === THEME_ITEM_ID) {
    return new Response(JSON.stringify(buildThemeItem(), null, 2), {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
  const found = findRegistryItem(id);
  if (!found) {
    return new Response("Not found", { status: 404 });
  }
  const item = await buildRegistryItem(found.category, found.item);
  return new Response(JSON.stringify(item, null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
