#!/usr/bin/env bash
# Usage: bash scripts/deploy-namecheap.sh prepare|activate|deploy <40-char-main-sha>
set -Eeuo pipefail
umask 077
APP=/home/gamehink/gameplayaddict
SOURCE=/home/gamehink/gameplayaddict-source
RELEASES=/home/gamehink/gameplayaddict-releases
STATE=/home/gamehink/gameplayaddict-deploy
ACTIVATE=/home/gamehink/nodevenv/gameplayaddict/22/bin/activate
mode=${1:-}
revision=${2:-}
[[ "$mode" =~ ^(prepare|activate|deploy)$ && "$revision" =~ ^[0-9a-f]{40}$ ]] || {
  echo 'Usage: deploy-namecheap.sh prepare|activate|deploy <40-character-main-commit>' >&2; exit 64;
}
for tool in git tar flock curl; do command -v "$tool" >/dev/null || { echo "Missing $tool" >&2; exit 69; }; done
[[ -d "$APP" && -d "$SOURCE/.git" && -f "$ACTIVATE" ]] || {
  echo "Check application root, source checkout and cPanel Node 22 activation path." >&2; exit 78;
}
# shellcheck disable=SC1090
source "$ACTIVATE"
node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if(major!==22 || minor<13) process.exit(1)'
export NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
unset SITES_TRUST_AUTH_HEADERS PORT HOST || true
mkdir -p "$RELEASES" "$STATE/backups" "$STATE/candidates" "$APP/tmp"
exec 9>"$STATE/deploy.lock"
flock -n 9 || { echo 'Another deployment is running.' >&2; exit 75; }
git -C "$SOURCE" fetch --prune origin main
git -C "$SOURCE" merge-base --is-ancestor "$revision" origin/main || {
  echo 'Only commits reachable from origin/main can be deployed.' >&2; exit 65;
}

if [[ "$mode" == prepare || "$mode" == deploy ]]; then
  release="$RELEASES/${revision}-$(date -u +%Y%m%dT%H%M%S)-$$"
  mkdir "$release"
  git -C "$SOURCE" archive "$revision" | tar -x -C "$release"
  printf '%s\n' "$revision" > "$release/.release-revision"
  (
    cd "$release"
    # Isolated dependencies: never replace the live app's node_modules or .next.
    npm ci --include=dev --no-audit --no-fund
    npm ls --omit=dev --depth=0
    npm run verify
  )
  printf '%s\n' "$revision" > "$release/.verified"
  printf '%s\n' "$release" > "$STATE/candidates/$revision.tmp"
  mv -f "$STATE/candidates/$revision.tmp" "$STATE/candidates/$revision"
  echo "VERIFIED $release"
  if [[ "$mode" == prepare ]]; then
    echo "Ready for activation. cPanel startup must be server.cjs. Then run activate $revision."
    exit 0
  fi
fi

release=$(cat "$STATE/candidates/$revision")
[[ "$release" == "$RELEASES/$revision-"* && -d "$release" ]] || exit 65
[[ "$(cat "$release/.verified")" == "$revision" && "$(cat "$release/.release-revision")" == "$revision" && -s "$release/.next/BUILD_ID" ]] || exit 65
[[ ! -e "$APP/current" || -L "$APP/current" ]] || { echo 'current must be a symlink, refusing to replace a directory.' >&2; exit 65; }
[[ ! -L "$APP/server.cjs" && ! -d "$APP/server.cjs" ]] || { echo 'server.cjs must be a regular file or absent.' >&2; exit 65; }
previous=$(readlink "$APP/current" || true)
backup="$STATE/backups/$(date -u +%Y%m%dT%H%M%S)-$$"
mkdir "$backup"
if [[ -f "$APP/server.cjs" ]]; then cp -p "$APP/server.cjs" "$backup/server.cjs"; fi
printf '%s\n' "$previous" > "$backup/previous"
printf '%s\n' "$release" > "$backup/release"
activated=0
rollback_on_error() {
  result=$?
  trap - EXIT
  if [[ "$result" != 0 && "$activated" == 1 ]]; then
    set +e
    if [[ -n "$previous" ]]; then
      ln -s "$previous" "$APP/current.rollback.$$"
      mv -Tf "$APP/current.rollback.$$" "$APP/current"
    fi
    if [[ -f "$backup/server.cjs" ]]; then cp -p "$backup/server.cjs" "$APP/server.cjs"; fi
    touch "$APP/tmp/restart.txt"
    echo "Activation failed. Previous startup restored where available; backup: $backup" >&2
  fi
  exit "$result"
}
trap rollback_on_error EXIT
activated=1
ln -s "$release" "$APP/current.new.$$"
mv -Tf "$APP/current.new.$$" "$APP/current"
cp "$release/scripts/passenger-launcher.cjs" "$APP/server.cjs.new.$$"
mv -f "$APP/server.cjs.new.$$" "$APP/server.cjs"
touch "$APP/tmp/restart.txt"
# Check the public Passenger route, not only a spare local Node process.
healthy=0
for attempt in {1..24}; do
  if curl --fail --silent --show-error --max-time 10 "https://gameplayaddict.com/api/health?deploy=$revision&attempt=$attempt" > "$STATE/health.json" &&
    node -e 'const fs=require("fs");const h=JSON.parse(fs.readFileSync(process.argv[1],"utf8"));if(h.ok!==true||h.application!=="gameplayaddict"||h.revision!==process.argv[2])process.exit(1)' "$STATE/health.json" "$revision"; then
    healthy=1; break
  fi
  sleep 5
done
[[ "$healthy" == 1 ]] || { echo 'Public revision health check failed.' >&2; exit 1; }
printf '%s\n' "$backup" > "$STATE/last-success"
trap - EXIT
echo "DEPLOYED $revision; previous startup and release retained at $backup"
