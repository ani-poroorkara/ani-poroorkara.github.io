# Acceptance evidence — 2026-10-04

Implementation is reviewable on `9.0v`. Full launch acceptance is pending the owner prerequisites below.

Verified revision: `5ecdc50ba03000ef00665ee392d53d093ee49c24`. [GitHub verification](https://github.com/ani-poroorkara/ani-poroorkara.github.io/actions/runs/37176797504) succeeded; [publication](https://github.com/ani-poroorkara/ani-poroorkara.github.io/actions/runs/37176797496) was skipped. Original live site remains unchanged.

## Verified locally

- Clean Node24 installation from lockfile succeeded; npm audit reported zero vulnerabilities.
- All six original project repositories return a Git HEAD; checked2026-10-04.
- Full verification passes: type checks, 44 unit tests, 28 generated-output checks, media/Markdown validation, production build and link/feed/style checks.
- Isolated production builds cover published article rendering, drafts/future exclusion even with preview flags, RSS/sitemap exclusion, stable URL after a title edit, empty collections, no PDF and adding a résumé PDF. Output checks also pass with a published article and all historical projects drafted.
- Browser production preview: Home/projects/article/resume; mobile360px and tablet768px have no page overflow; project direct refresh and Back work; keyboard skip link focuses `main`. Previous desktop visual review passed. Mobile long-URL/inline-code fixture overflow reproduced at1600px and fixed to345px page width within360px viewport; fenced code scrolls inside its box.
- Print and reduced-motion styles are implemented. Printed résumé output, real200% zoom and a completed career-data page still need owner/live acceptance; no claim of a comprehensive accessibility audit.
- Independent read-only review: no Critical findings; two Important findings fixed with failing regression tests first. Content tests no longer freeze blog/PDF/project state, and link validation accepts encoded query parameters while retaining local path checks. The long-link concern was reproduced and fixed in browser.

## Deferred minor

The editor's résumé start-date inputs lack `required: true` although content validation requires them. Missing dates receive build errors; adding matching form flags is a small follow-up. No invalid résumé can deploy.

## Pending hosted evidence

Owner must authorize the Pages CMS GitHub App for this repository and select `9.0v`; actual saves/uploads/optional serialization/creation filename behavior are unverified. GitHub Pages settings, last deployed revision and recovery settings need authenticated inspection. Current career facts/PDF and final copy need owner input. Live cutover and editor-to-live update are unperformed. Deployment gate remains disabled.

## Implementation decisions

Use the available Node24/official npm CLI without changing the system launcher; risk is a special local invocation. Use PowerShell bookkeeping in place of Bash-only helpers; no product effect. Astro7 uses its documented Markdown processor package; cost is one build dependency. Commit dependent data/page/editor/design work as a coherent verified milestone. Use official pinned GitHub build/upload/deploy primitives to verify the same artifact before publication, rather than an extra framework-action build.

Reviewer-set-aside hosted behaviors stay explicit launch gates. External links are checked separately rather than fetched by deterministic CI. Recovery settings must be recorded rather than inferred from old `/docs` configuration.
