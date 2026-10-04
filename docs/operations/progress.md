# Implementation checkpoint

Plan: `docs/superpowers/plans/2026-10-03-website-9.md`. Branch `9.0v`.

Resume by reading this file, the plan/spec, and git log/status. Do not redo committed tasks. Detailed scratch ledger: `.superpowers/sdd/2026-10-03-website-9/progress.md`.

## Current status

- Task 0: legacy cleanup and recovery completed; authenticated Pages settings inventory pending.
- Tasks 1–5: root foundation, validated data/publication, pages, content/media/Markdown checks and CMS forms implemented. 42 unit checks and 13 generated-output checks pass; hosted editor round-trip remains unverified.
- Task 6: pending owner sign-in/App authorization and remote setup.
- Task 7: design implemented; desktop visual review completed; mobile/print review in progress.
- Task 8: historical projects migrated, sharing metadata/RSS/sitemap implemented; final copy/resume facts pending.
- Task 9: output link checker implemented; deployment workflows in progress.
- Tasks 10–12: pending live cutover, handover and independent review.

## Rulings and access

- Use bundled Node24/official npm CLI; do not alter system runtime.
- Windows-native bookkeeping replaces Bash-only skill helpers.
- Browser editing limited to owner-authorized GitHub access; no anonymous writing.
- Owner authentication/App authorization, current resume facts/PDF and publication remain external prerequisites. Complete local tasks while awaiting these.
- Deployment must stay gated off. Resume after any usage reset from last tested commit.
- Astro7 uses `markdown.processor: unified(...)` from its documented Markdown package; legacy plugin configuration was replaced to avoid deprecated APIs.
- CMS default social image now accepts upload paths as well as trusted brand assets so the editor image field works.
- Initial audit issue resolved by compatible transitive dependency update; latest audit reports zero vulnerabilities.
- Dependent foundation/data/page/design/editor work is being committed as a coherent verified milestone rather than partially runnable intermediate scaffolds.

## Continuation schedule

Paused heartbeat `continue-website-9-0v-implementation`, every five hours. Owner can enable it at the first usage exhaustion. It resumes from this checkpoint and does not override account limits.
