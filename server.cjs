// GameplayAddict — Namecheap/cPanel Passenger startup file.
// Uses the standard Next.js custom-server pattern, adapted to CommonJS because
// CloudLinux Passenger cannot load an ESM startup file when package.json uses
// "type": "module".
process.env.NODE_ENV = "production";
const { createServer } = require("node:http");
const { readFileSync, existsSync } = require("node:fs");
const { join } = require("node:path");
process.chdir(__dirname);
const { parse } = require("node:url");
const next = require("next");

const dev = false;
const hostname = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 3000); // Passenger intercepts listen().
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be between 1 and 65535");
if (!existsSync(join(__dirname, ".next/BUILD_ID"))) throw new Error("Production build missing: run npm run build first");
const revisionFile = join(__dirname, ".release-revision");
process.env.GAMEPLAYADDICT_REVISION = existsSync(revisionFile) ? readFileSync(revisionFile, "utf8").trim() : "local";

const app = next({ dev, dir: __dirname, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (error) {
        console.error("Error handling request", req.url, error);
        if (res.headersSent) { res.destroy(); return; }
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
        }
        res.end("Internal server error");
      }
    })
      .once("error", (error) => {
        console.error("GameplayAddict server error", error);
        process.exit(1);
      })
      .listen(port, hostname, () => {
        console.log(`GameplayAddict ready in ${process.env.NODE_ENV || "production"} mode`);
      });
    const shutdown = () => {
      server.close(() => { app.close().finally(() => process.exit(0)); });
      setTimeout(() => process.exit(1), 10000).unref();
    };
    process.once("SIGTERM", shutdown);
    process.once("SIGINT", shutdown);
  })
  .catch((error) => {
    console.error("GameplayAddict failed to prepare", error);
    process.exit(1);
  });
