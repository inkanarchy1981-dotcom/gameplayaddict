#!/usr/bin/env bash
set -euo pipefail
APP=/home/gamehink/gameplayaddict
STATE=/home/gamehink/gameplayaddict-deploy
backup=${1:-}
[[ "$backup" == "$STATE/backups/"* && "$backup" != *'..'* && -d "$backup" ]] || {
  echo 'Pass the exact backup path printed by the deployment.' >&2; exit 64;
}
exec 9>"$STATE/deploy.lock"
flock -n 9 || exit 75
[[ -f "$backup/server.cjs" ]] || { echo 'No previous startup file in this backup.' >&2; exit 65; }
previous=$(cat "$backup/previous")
if [[ -n "$previous" ]]; then
  [[ "$previous" == /home/gamehink/gameplayaddict-releases/* && -f "$previous/.verified" ]] || exit 65
  ln -s "$previous" "$APP/current.rollback.$$"
  mv -Tf "$APP/current.rollback.$$" "$APP/current"
fi
cp -p "$backup/server.cjs" "$APP/server.cjs"
touch "$APP/tmp/restart.txt"
echo 'Previous startup restored. Verify https://gameplayaddict.com/ and the cPanel startup setting.'
