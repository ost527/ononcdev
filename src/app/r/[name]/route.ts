import {
  allRegistryIds,
  buildRegistryItem,
  findRegistryItem,
} from "@/lib/registry-json";

// Emitted as static files (out/r/<id>.json) during `next build` (output: export).
export const dynamic = "force-static";
export const dynamicParams = false;

/** One param per component id, with the `.json` extension in the segment. */
export function generateStaticParams(): { name: string }[] {
  return allRegistryIds().map((id) => ({ name: `${id}.json` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const id = name.replace(/\.json$/, "");
  const found = findRegistryItem(id);
  if (!found) {
    return new Response("Not found", { status: 404 });
  }
  const item = await buildRegistryItem(found.category, found.item);
  return new Response(JSON.stringify(item, null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
