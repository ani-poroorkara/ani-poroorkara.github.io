# Recovery

For a bad content edit, use GitHub's file history to restore the previous content in a new commit on `9.0v`. Wait for checks and publication; never rewrite branch history. For an application regression, revert the offending change with a new commit and run the full verification pipeline.

To stop publication, set `PAGES_DEPLOY_ENABLED` to `false` and cancel any pending publish run. This does not undo an already published artifact. Rebuild/deploy the last known good new-site revision, or restore the exact old source settings recorded in [deployment baseline](deployment-baseline.md) and redeploy its preserved revision.

The old `world-7.1v` source and its generated `docs/` remain in history at `e5bd23b0df82a124b67a342bac011570e0c16570`. Do not change the old branch, delete the repository, or guess old publishing settings. Recovery of the unrelated `world-8.0v` edits is documented separately in [legacy inventory](../migration/legacy-inventory.md).
