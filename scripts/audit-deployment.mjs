import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
const read = (file) => readFileSync(file, "utf8");
const pkg = JSON.parse(read("package.json"));
const lock = JSON.parse(read("package-lock.json"));
assert.equal(pkg.scripts.start, "node server.cjs");
assert.equal(pkg.scripts.build, "next build");
assert.equal(pkg.scripts.postinstall, undefined, "install must not silently build");
assert.deepEqual(lock.packages[""].dependencies, pkg.dependencies);
assert.deepEqual(lock.packages[""].devDependencies, pkg.devDependencies);
assert.deepEqual(lock.packages[""].engines, pkg.engines);
assert.match(read("site.config.ts"), /domain: "https:\/\/gameplayaddict.com"/);
assert.doesNotMatch(read("app/layout.tsx"), /codex-preview/);
assert.match(read("server.cjs"), /dir: __dirname/);
assert.doesNotMatch(read("next.config.ts"), /output:\s*["'](?:export|standalone)["']/);
for (const file of [".next/BUILD_ID", ".next/server/app/index.html", "public/og.png", "public/brand/mark.svg", "scripts/deploy-namecheap.sh", "scripts/passenger-launcher.cjs", ".github/workflows/production.yml"]) {
  assert.ok(existsSync(file), `Missing production file: ${file}`);
}
console.log("Deployment audit passed: lockfile, canonical domain, build, assets and Passenger entry point");
