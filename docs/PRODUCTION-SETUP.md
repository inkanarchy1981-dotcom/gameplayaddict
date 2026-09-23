# GitHub to Namecheap: exact connection runbook

## 1. Create and push the canonical repository

Create a private GitHub repository named `gameplayaddict`. Leave README, license and .gitignore unchecked (this project supplies them). Replace `YOUR_GITHUB_OWNER` below with your actual user or organization. In Windows PowerShell:

```powershell
cd 'C:\Users\mygre\Documents\Codex\2026-09-20\files-mentioned-by-the-user-gameplayaddict\outputs\GameplayAddict'
git remote add origin git@github.com:YOUR_GITHUB_OWNER/gameplayaddict.git
git push -u origin main
```

Authenticate Git with your own GitHub account/SSH key. No remote is fabricated or configured in this deliverable. If Git reports dubious ownership because the sandbox created the repository, run this narrow local exception once:

```powershell
git config --global --add safe.directory 'C:/Users/mygre/Documents/Codex/2026-09-20/files-mentioned-by-the-user-gameplayaddict/outputs/GameplayAddict'
```

In GitHub Settings > Environments, create `production`. In Settings > Rules > Rulesets, protect `main` with pull requests and the `verify` status check after its first run. Keep deployment disabled until the manual first activation below succeeds. No scheduled news publishing is introduced in this task.

## 2. Enable the account's SSH connection and GitHub read access

In cPanel > Manage Shell, enable SSH. Use the actual hosting server hostname/IP from Namecheap's hosting welcome email (not an assumed address). Namecheap shared-hosting SSH normally uses port 21098; use the port shown for your account.

```sh
ssh -p 21098 gamehink@YOUR_NAMECHEAP_SERVER
mkdir -p /home/gamehink/.ssh
chmod 700 /home/gamehink/.ssh
ssh-keygen -t ed25519 -N '' -C gameplayaddict-github-read -f /home/gamehink/.ssh/gameplayaddict_github
cat /home/gamehink/.ssh/gameplayaddict_github.pub
```

Do not overwrite an existing key if prompted. Add that public key to GitHub repository Settings > Deploy keys, with write access OFF. Verify GitHub's SSH fingerprint against its official documentation when connecting. Clone using the dedicated key; this does not modify the existing app root:

```sh
GIT_SSH_COMMAND='ssh -i /home/gamehink/.ssh/gameplayaddict_github -o IdentitiesOnly=yes' git clone git@github.com:YOUR_GITHUB_OWNER/gameplayaddict.git /home/gamehink/gameplayaddict-source
git -C /home/gamehink/gameplayaddict-source config core.sshCommand 'ssh -i /home/gamehink/.ssh/gameplayaddict_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes'
```

The first authenticated clone records GitHub's verified host key in known_hosts. Leave strict checking enabled for automation.

## 3. Verify cPanel runtime settings and prepare without switching traffic

Open cPanel > Setup Node.js App > the existing gameplayaddict.com application. Do not create a second app.

- Node.js: **22.x, at least 22.13**.
- Application mode: **Production**.
- Application root: **gameplayaddict**, resolving to **/home/gamehink/gameplayaddict**.
- Application URL: **gameplayaddict.com**, path **/**.
- Final application startup file: **server.cjs**. Keep the current placeholder startup until preparation has passed.
- Environment variables: **NODE_ENV=production**, **NEXT_TELEMETRY_DISABLED=1**.
- Do not set PORT; Passenger intercepts the first Node listen call.
- Do not set SITES_TRUST_AUTH_HEADERS. No database, OpenAI or email credentials are needed for existing page rendering.

Copy cPanel's displayed virtual-environment activation command. The deployment script expects the Node 22 path below. If cPanel shows a different path, change the ACTIVATE constant in `scripts/deploy-namecheap.sh`, commit it, push it, and use that revision.

```sh
source /home/gamehink/nodevenv/gameplayaddict/22/bin/activate
node --version
cd /home/gamehink/gameplayaddict-source
git fetch origin main
git merge --ff-only origin/main
REVISION=$(git rev-parse origin/main)
bash scripts/deploy-namecheap.sh prepare "$REVISION"
```

Preparation installs from the lockfile, validates dependencies, runs all audits, builds and tests the real server in a new `/home/gamehink/gameplayaddict-releases/<sha>-<timestamp>-<pid>` directory. It never replaces the live app's node_modules or .next. No cPanel “Run NPM Install” action is needed for this release layout. The script requires git, tar, flock, curl and working Node/npm; it reports a missing tool before activation. Shared-hosting quotas and Passenger itself must be verified on the actual account, not inferred from a local Windows build.

## 4. First activation: replace the placeholder

Only proceed after `prepare` prints VERIFIED. Record the current cPanel startup filename (often app.js). If it is not server.cjs and server.cjs does not exist, copy the existing placeholder startup file to server.cjs with cPanel File Manager before changing the setting; keep the original file. This provides a rollback startup for the first release.

Set the existing app's startup file to **server.cjs**, save it, then run:

```sh
cd /home/gamehink/gameplayaddict-source
REVISION=$(git rev-parse origin/main)
bash scripts/deploy-namecheap.sh activate "$REVISION"
```

What activation changes, exactly: backs up the app-root server.cjs; saves the previous current target; atomically switches `/home/gamehink/gameplayaddict/current` to the verified release; installs the CommonJS Passenger launcher as app-root server.cjs; touches `/home/gamehink/gameplayaddict/tmp/restart.txt`; checks `https://gameplayaddict.com/api/health` for this commit SHA. Apache/cPanel domain configuration, .htaccess, the original placeholder file and all prior releases are retained. No public-content rewrite occurs.

If the first activation fails, the script restores a backed-up server.cjs where available. If no previous server.cjs existed, restore the original startup filename in cPanel. Open the site and verify the real home page, Pink Slip, news, map and images. If the app was stopped in cPanel, use Start App; Passenger's restart marker does not start a disabled application. A restart alone can also be requested with cPanel's Restart button.

## 5. Connect GitHub Actions for future deployments

Generate a separate inbound deployment key in your local terminal (outside the repository):

```sh
ssh-keygen -t ed25519 -N '' -C gameplayaddict-actions -f gameplayaddict_actions
```

Import its public key through cPanel > SSH Access > Manage SSH Keys > Import Key, then **Authorize** it. Put the private key only in GitHub's `production` environment secret named `NAMECHEAP_SSH_KEY`. Do not commit either key.

Add these GitHub repository Actions variables (Settings > Secrets and variables > Actions > Variables):

| Variable | Value |
| --- | --- |
| NAMECHEAP_HOST | Actual hosting server hostname/IP used successfully for SSH |
| NAMECHEAP_PORT | 21098, or the account's confirmed SSH port |
| NAMECHEAP_AUTO_DEPLOY | true only after the first successful manual activation |

Add `NAMECHEAP_KNOWN_HOSTS` as a `production` environment secret: the verified known_hosts line for `[YOUR_NAMECHEAP_SERVER]:21098`. Obtain it from your successful, fingerprint-verified SSH connection; confirm the server fingerprint with Namecheap/cPanel before trusting it. Do not disable StrictHostKeyChecking or blindly trust a newly scanned key.

The workflow uses user `gamehink`. GitHub Actions now checks every PR and main push. With NAMECHEAP_AUTO_DEPLOY=true, successful main pushes also trigger SSH deployment. Alternatively run Actions > Production > Run workflow > branch main > deploy checked. That is an actual production activation, so run it only when ready.

Future server-side manual deployment (equivalent to the workflow):

```sh
source /home/gamehink/nodevenv/gameplayaddict/22/bin/activate
cd /home/gamehink/gameplayaddict-source
git fetch origin main
git merge --ff-only origin/main
bash scripts/deploy-namecheap.sh deploy "$(git rev-parse origin/main)"
```

Restart current release without building or switching:

```sh
touch /home/gamehink/gameplayaddict/tmp/restart.txt
```

Rollback using the exact backup path printed by the successful deployment:

```sh
bash /home/gamehink/gameplayaddict-source/scripts/rollback-namecheap.sh /home/gamehink/gameplayaddict-deploy/backups/REPLACE_WITH_PRINTED_BACKUP_NAME
```

Build/test failures leave the current release running. Post-activation health failures restore the previous startup/release where available and fail the workflow. Successful rollback still needs a public site check. Nothing prunes old releases automatically; inspect storage usage before removing any known-inactive release. No production files have been changed by preparing this repository.

## Verified platform references

- [Namecheap Node app settings and virtual environment](https://www.namecheap.com/support/knowledgebase/article.aspx/10047/2182/how-to-work-with-nodejs-app/)
- [Namecheap shared-hosting SSH](https://www.namecheap.com/support/knowledgebase/article.aspx/1016/89/how-to-access-a-hosting-account-via-ssh/)
- [Passenger reverse port binding](https://www.phusionpassenger.com/docs/advanced_guides/in_depth/node/reverse_port_binding.html)
- [Next.js custom server and standalone limitation](https://nextjs.org/docs/app/guides/custom-server)
- [GitHub SSH fingerprints](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)
