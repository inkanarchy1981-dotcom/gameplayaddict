import assert from "node:assert/strict";
import test, { before, after } from "node:test";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
let server;
let base;
let output = "";
before(async () => {
  const socket = createServer();
  socket.listen(0, "127.0.0.1");
  await once(socket, "listening");
  const port = socket.address().port;
  await new Promise((resolve) => socket.close(resolve));
  base = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, [fileURLToPath(new URL("../server.cjs", import.meta.url))], {
    env: { ...process.env, NODE_ENV: "production", PORT: String(port), HOST: "127.0.0.1" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (chunk) => { output += chunk; });
  server.stderr.on("data", (chunk) => { output += chunk; });
  for (let attempt = 0; attempt < 120; attempt++) {
    if (server.exitCode !== null) throw new Error(output);
    try { if ((await fetch(`${base}/api/health`, { signal: AbortSignal.timeout(1000) })).ok) return; } catch { /* starting */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server failed to start: ${output}`);
});
after(async () => {
  if (server && server.exitCode === null) {
    const stopped = once(server, "exit");
    server.kill();
    await stopped;
  }
});
async function fetchBuilt(path) {
  return fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(15000) });
}
test("renders GameplayAddict with production metadata and working CSS", async () => {
  const response = await fetchBuilt("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/html\b/i);
  const html = await response.text();
  assert.doesNotMatch(html, /name="codex-preview"/);
  assert.match(html, /GameplayAddict/);
  assert.match(html, /rel="canonical" href="https:\/\/gameplayaddict.com\/?"/);
  assert.doesNotMatch(html, /ink-a\.chatgpt\.site/);
  const css = html.match(/href="([^"]+\.css(?:\?[^"]*)?)"/);
  assert.ok(css, "built stylesheet is linked");
  assert.equal((await fetchBuilt(css[1].replaceAll("&amp;", "&"))).status, 200);
});
test("serves assets, sitemap, robots, health, assistant and existing API", async () => {
  for (const path of ["/brand/mark.svg", "/brand/wordmark.svg", "/og.png", "/crew/pink-slip.webp", "/robots.txt", "/sitemap.xml", "/cipher", "/gta-6/news", "/gta-6/map"]) {
    assert.equal((await fetchBuilt(path)).status, 200, path);
  }
  const sitemap = await (await fetchBuilt("/sitemap.xml")).text();
  assert.match(sitemap, /https:\/\/gameplayaddict.com/);
  assert.doesNotMatch(sitemap, /chatgpt.site/);
  const health = await (await fetchBuilt("/api/health")).json();
  assert.equal(health.application, "gameplayaddict");
  assert.equal(health.ok, true);
  assert.equal((await fetch(`${base}/api/intel-alerts`, { method: "POST" })).status, 503);
  assert.equal((await fetchBuilt("/not-a-real-gameplayaddict-page")).status, 404);
});

test("trust pages render without GTA evidence, ads, sources or recommendations", async () => {
  for (const path of ["/about", "/contact", "/editorial-policy", "/verification-policy", "/affiliate-disclosure", "/independent-fan-disclaimer", "/privacy", "/terms"]) {
    const response = await fetchBuilt(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /class="trust-page"/, path);
    assert.doesNotMatch(html, /class="source-panel"|class="related-panel"|class="ad-slot"|class="claim-state"|class="crew-read|class="pink-host/, path);
  }
});

test("merged question and utility URLs redirect permanently to stronger canonical pages", async () => {
  const response = await fetchBuilt("/gta-6/questions/who-is-lucia");
  assert.equal(response.status, 308);
  assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, "/gta-6/characters/lucia-caminos");
});

test("index and noindex decisions reach rendered metadata", async () => {
  const indexHtml = await (await fetchBuilt("/gta-6/characters/lucia-caminos")).text();
  const noindexHtml = await (await fetchBuilt("/privacy")).text();
  assert.doesNotMatch(indexHtml, /<meta[^>]+name="robots"[^>]+noindex/i);
  assert.match(noindexHtml, /<meta[^>]+name="robots"[^>]+noindex/i);
});
