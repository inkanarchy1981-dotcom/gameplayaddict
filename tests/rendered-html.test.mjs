import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

async function fetchBuilt(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

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
