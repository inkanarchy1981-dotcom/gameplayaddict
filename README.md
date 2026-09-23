# GameplayAddict production repository

This is the existing GameplayAddict site, prepared for Node.js 22 and Namecheap cPanel/Passenger. GitHub `main` is the production source of truth. No redesign or news-content changes are included in this deployment pass.

## Local commands

Use Node 22.13 or newer within the 22.x series.

```sh
npm ci --include=dev
npm run dev
npm run verify
npm start
```

`npm run verify` runs the production dependency security audit, lint, the existing copy/editorial/News Intelligence/indexing audits, a real Next.js production build, TypeScript, all tests, HTTP tests against `server.cjs`, and a deployment audit. Run it before publishing a commit. Tests require the built `.next` output; `npm test` alone does not build.

`npm run build` produces `.next`; `npm start` runs `node server.cjs`. Dependencies are installed separately; there is no implicit postinstall build. Source, `.next`, `public`, and installed dependencies must belong to the same release. Do not upload Windows node_modules to Linux. Do not use static export or Next standalone output with this custom Passenger server.

## Production connection

Follow [the exact GitHub and cPanel runbook](docs/PRODUCTION-SETUP.md). The cPanel app remains at `/home/gamehink/gameplayaddict`, with startup `server.cjs`. Its small launcher resolves `current` to a verified release. Each release contains the real application server, source, assets, dependencies and `.next`.

GitHub Actions validates every pull request and push to `main`. Deployment is disabled until the account connection is configured. After the first successful manual activation, set `NAMECHEAP_AUTO_DEPLOY=true` to deploy subsequent verified pushes automatically. Each deployment fetches the requested main commit, builds and tests it on Namecheap in a separate release directory, switches `current`, restarts Passenger, and verifies the public health endpoint reports that exact revision. Failed preparation does not change the live app. A failed activation restores the previous startup and release where available. Releases and backups are retained; there is no automatic deletion.

## Existing capabilities

All public pages, Pink Slip, News Intelligence, assets, metadata rules, redirects and indexing decisions are preserved. The canonical origin is now `https://gameplayaddict.com`. `npm run news:process -- path/to/brief.json` still evaluates the existing structured news brief; this pass does not add daily publication automation. The existing intel-alert API still returns 503 until an email service is connected.

Optional Sites/Vinext/D1 tooling remains in the repository under its explicit `*:sites` scripts. It is not required by production. Do not run `scripts/install-ci.sh` or `scripts/sites-env.sh` on Namecheap; `npm run install:ci` now uses ordinary npm. The unused Sites identity helper refuses untrusted proxy identity headers by default.
