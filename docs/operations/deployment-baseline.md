# Existing deployment baseline

Public site: https://ani-poroorkara.github.io/. Repository: https://github.com/ani-poroorkara/ani-poroorkara.github.io.

Requested source is `world-7.1v`, revision `e5bd23b0df82a124b67a342bac011570e0c16570`. Its Angular configuration generated `docs/`. This is source evidence, **not confirmation of the active Pages settings or deployed revision**.

Before cutover, the owner must record Settings → Pages source, branch/folder or workflow, custom domain (if any), environment branch restrictions, and the last successful deployment revision/run from Actions/Deployments. Authenticated settings have not been accessed. Do not assume `/docs` is the live source or enable the gate before recording recovery settings.

Original branches/history remain preserved. New source cleanup is confined to `9.0v`; staged and unstaged prior work was saved separately as described in [legacy recovery](../migration/legacy-inventory.md).

## Authenticated baseline before the 2026-11-02 cutover

Confirmed through the GitHub API before publishing the owner-requested `9.0v` update:

- Pages build type: `legacy`; source: `world-7.1v`, `/docs`.
- Public URL: https://ani-poroorkara.github.io/; no custom domain; HTTPS enforced.
- Last successful deployment: `852223816`, commit `e5bd23b0df82a124b67a342bac011570e0c16570`.
- Successful run: https://github.com/ani-poroorkara/ani-poroorkara.github.io/actions/runs/4577634635.
- `github-pages` environment uses custom branch policies allowing `master-code` and `world-7.1v`.
- `PAGES_DEPLOY_ENABLED` was absent; the latest `9.0v` publication run was skipped.

Cutover uses GitHub Actions, adds only `9.0v` to the existing environment policies, and enables `PAGES_DEPLOY_ENABLED`. To restore the prior publication source, disable that variable and restore Pages build type `legacy` with branch `world-7.1v`, path `/docs`. Preserve the old branches and policies.

The initial cutover succeeded with commit `781db17ff249a758cac3043878649ba61f63a0d9`. Both verification and publication completed successfully; publication run: https://github.com/ani-poroorkara/ani-poroorkara.github.io/actions/runs/41566926272. The public homepage was confirmed to serve the new heading, revised section order, and corrected Sun Tzu quotation.
