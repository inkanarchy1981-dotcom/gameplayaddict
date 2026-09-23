// Installed as /home/gamehink/gameplayaddict/server.cjs by deploy-namecheap.sh.
// Resolve current before require so each Passenger process stays on one release.
const { realpathSync } = require("node:fs");
const { join } = require("node:path");
const release = realpathSync(join(__dirname, "current"));
process.chdir(release);
require(join(release, "server.cjs"));
