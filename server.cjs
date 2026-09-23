// GameplayAddict — Namecheap/cPanel Passenger startup file.
// Uses the standard Next.js custom-server pattern, adapted to CommonJS because
// CloudLinux Passenger cannot load an ESM startup file when package.json uses
// "type": "module".
const { createServer } = require("node:http");
const { parse } = require("node:url");
const next = require("next");

const dev = false;
const hostname = "127.0.0.1";
const port = 3000; // Passenger overrides this dynamically inside cPanel.

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (error) {
        console.error("Error handling request", req.url, error);
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
  })
  .catch((error) => {
    console.error("GameplayAddict failed to prepare", error);
    process.exit(1);
  });
