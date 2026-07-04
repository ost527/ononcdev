import { buildLlmsFullTxt } from "@/lib/llms";

// Emitted as a static file (out/llms-full.txt) during `next build` (output: export).
export const dynamic = "force-static";

export async function GET() {
  return new Response(await buildLlmsFullTxt(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
