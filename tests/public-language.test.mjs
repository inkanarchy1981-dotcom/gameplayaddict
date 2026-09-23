import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const files = ["components/PinkSlipHost.tsx", "components/ProductSurfaces.tsx", "components/Experience.tsx", "app/[...slug]/page.tsx"];

test("public templates do not print internal verification or Crew language", async () => {
  const source = (await Promise.all(files.map((file) => readFile(path.join(root, file), "utf8")))).join("\n");
  assert.doesNotMatch(source, /replaceAll\(["']_["']/);
  assert.doesNotMatch(source, /PRIMARY CLAIM|VERIFIED ANSWER|WHY THIS ANSWER HOLDS|VERIFIED SOURCE TRAIL|Confidence:/i);
  assert.match(source, /!isQuestion \? <FactStrip/);
  assert.doesNotMatch(source, />(?:\s*)(?:Cipher|Slick|Onyx|Crew routing|handoff|classifier|command center)(?:\s*)</i);
});

test("public evidence labels are natural language", async () => {
  const source = await readFile(path.join(root, "lib/public-language.ts"), "utf8");
  for (const label of ["Confirmed by Rockstar", "Shown in official footage", "Not confirmed yet"]) assert.match(source, new RegExp(label));
});
