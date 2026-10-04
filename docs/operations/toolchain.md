# Local toolchain

Use Node 24 (`.nvmrc`) and npm. Install with `npm ci`; run `npm run dev`, `npm run check`, `npm run build`, and `npm run preview`.

On this machine the system npm launcher pointed to a missing roaming installation. Implementation uses bundled Node 24.19.0 and the official npm CLI at `C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js`, with the bundled Node directory first on PATH. No system installation was changed. Standard commands work after selecting Node24 in a normal Node version manager.

Versions are pinned in package.json and package-lock.json. The Angular lockfile was not reused.

Audit: initial installation reported http-cache-semantics (GHSA-ch52-4w7c-c8xp). After the documented Markdown processor update, npm offered a compatible transitive fix; it was applied without changing framework major version. The subsequent audit reported zero vulnerabilities. Keep checking dependency updates. Local preview binds to loopback.
