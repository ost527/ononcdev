import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Read a component's source file (relative to `src/`) so the Code tab shows the
 * real, current source — no duplicated strings to drift. Runs at build time on
 * the server during static generation.
 */
export async function readSource(relativePath: string): Promise<string> {
  try {
    const full = path.join(process.cwd(), "src", relativePath);
    const contents = await readFile(full, "utf8");
    return contents.replace(/\s+$/, "") + "\n";
  } catch {
    return `// Source unavailable: ${relativePath}`;
  }
}

/** Read sources for many paths in parallel, keyed by an id. */
export async function readSources(
  entries: { id: string; sourcePath: string }[],
): Promise<Record<string, string>> {
  const pairs = await Promise.all(
    entries.map(async ({ id, sourcePath }) => {
      return [id, await readSource(sourcePath)] as const;
    }),
  );
  return Object.fromEntries(pairs);
}
