import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const input = process.argv[2];
if (!input) {
  console.error("Usage: npm run news:process -- path/to/brief.json");
  process.exit(1);
}

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
try {
  const brief = JSON.parse(await readFile(resolve(process.cwd(), input), "utf8"));
  const { evaluateNewsBrief } = await vite.ssrLoadModule("/lib/news-intelligence.ts");
  const result = evaluateNewsBrief(brief);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} finally {
  await vite.close();
}
