import { buildLlmsTxt } from "@/lib/llms";

// Emitted as a static file (out/llms.txt) during `next build` (output: export).
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
