# Production validation and exact change list

Validated 2026-09-23 on Windows with Node 22.19.0 and npm 10.9.3. Production target remains Linux/Namecheap Node 22.x. No GitHub push, SSH connection to the hosting account, production activation, or deletion of production files was performed.

## Results

- Clean `npm ci --include=dev`: passed with the updated lockfile.
- Production dependency tree validation: passed.
- `npm audit --omit=dev`: 0 vulnerabilities after updating Next to 16.3.3, matching eslint-config-next, and affected transitive dependency resolutions.
- `npm run verify`: passed, exit 0.
- ESLint: passed.
- Copy/editorial audit: 144 pages audited, no failures.
- News Intelligence audit: 7 records / 7 public feed records, no failures.
- Indexing audit: 98 sitemap URLs; existing index/noindex/redirect decisions preserved.
- Next 16.3.3 production build: passed; 149 generated pages, plus dynamic health and existing alert routes.
- TypeScript and generated Next route types: passed.
- Existing unit/regression/UI tests: 64 passed; none skipped.
- Production HTTP tests against `node server.cjs`: 5 passed; none skipped. Covers home/canonical origin/CSS, public assets, assistant, news, map, health, sitemap, robots, existing API response, 404, trust-page rendering, permanent redirects and robots metadata.
- Deployment configuration audit: passed.
- Installed launcher smoke test: passed from a separate application directory through current (a Windows junction); health endpoint served the correct application. This does not simulate Passenger itself.
- Bash syntax checks for deployment and rollback: passed.
- ShellCheck 0.11.0 for both scripts: passed.
- actionlint 1.7.12 for the GitHub Actions workflow: passed.
- Git whitespace check: passed.

Passenger socket interception, Namecheap resource limits and public-domain activation can only be tested after the account connection. The deployment script repeats the full verification on Namecheap before switching releases and then checks the public revision endpoint. The local tests are not represented as a live Passenger deployment test.

The original ZIP's public content, styles, components, media and News Intelligence data are preserved. Pink Slip changed only by adding the explicit RichEntity return type needed for the production TypeScript build. Public metadata changed only to remove development preview metadata and use gameplayaddict.com as the canonical origin.

The ZIP had no Git history. A baseline import commit preserves it (excluding generated tsconfig.tsbuildinfo). A separate production commit contains the changes below. Dependencies, builds, runtime files, caches and secret files are excluded from Git.

## Modified files

- `.gitignore` — exclude additional generated files and keys; permit the credential-free environment example.
- `NAMECHEAP-DEPLOY.txt` — replace obsolete upload instructions with the production entry point and runbook.
- `README.md` — document this project and its actual Next/Namecheap commands.
- `app/chatgpt-auth.ts` — refuse Sites identity headers outside an explicitly trusted Sites proxy.
- `app/layout.tsx` — remove development-preview metadata from production.
- `eslint.config.mjs` — allow required CommonJS imports only in the two Passenger entry files.
- `lib/pink-slip.ts` — explicit return type to fix the existing build error; no wording or behavior changes.
- `next.config.ts` — limit build workers to two for shared hosting; retain Namecheap TypeScript scope and regular Next output.
- `package-lock.json` — synchronized reproducible dependencies and security fixes.
- `package.json` — real Next development/runtime commands, explicit verification stages, Node 22 constraint, patched Next; no implicit postinstall build.
- `server.cjs` — explicit production mode, release-relative working directory, port validation, build check, revision identification, error handling and shutdown.
- `site.config.ts` — canonical production origin https://gameplayaddict.com.
- `tests/rendered-html.test.mjs` — run the actual production Node server and retain/extend rendered-site assertions.
- `tests/ui-components.test.mjs` — inspect built Next CSS instead of Sites dist output; assertions preserved.

## Created files

- `.env.example`
- `.gitattributes`
- `.github/workflows/production.yml`
- `app/api/health/route.ts`
- `docs/PRODUCTION-SETUP.md`
- `docs/VALIDATION.md`
- `scripts/audit-deployment.mjs`
- `scripts/deploy-namecheap.sh`
- `scripts/passenger-launcher.cjs`
- `scripts/rollback-namecheap.sh`
- `scripts/test-unit.mjs`

## Runtime and release layout

- Existing cPanel application root: `/home/gamehink/gameplayaddict`.
- Startup file: `server.cjs`; startup command: `node server.cjs`.
- After activation, app-root server.cjs is the tiny launcher from scripts/passenger-launcher.cjs. It resolves current to an immutable release and requires that release's real server.cjs.
- Source checkout: `/home/gamehink/gameplayaddict-source`.
- Complete releases: `/home/gamehink/gameplayaddict-releases/<sha>-<timestamp>-<pid>`.
- Backups and deployment state: `/home/gamehink/gameplayaddict-deploy`.
- Restart marker: `/home/gamehink/gameplayaddict/tmp/restart.txt`.
- Health check: `https://gameplayaddict.com/api/health`; expected application gameplayaddict, ok true, exact Git revision.

Security patch reference: [Next.js advisory and patched version](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4). Platform references and exact account setup commands are in PRODUCTION-SETUP.md.
