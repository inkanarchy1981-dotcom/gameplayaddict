import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
const files = readdirSync("tests").filter((name) => name.endsWith(".test.mjs") && name !== "rendered-html.test.mjs");
const result = spawnSync(process.execPath, ["--test", "--test-concurrency=1", ...files.map((name) => `tests/${name}`)], { stdio: "inherit" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
