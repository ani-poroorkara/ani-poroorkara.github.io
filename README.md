# Anirudh Poroorkara — website 9.0v

Fresh baseline: world-7.1v at e5bd23b0df82a124b67a342bac011570e0c16570.

An Astro portfolio, blog and résumé built from Markdown and JSON, with [Pages CMS](https://app.pagescms.org) browser forms and uploads. Visitors cannot edit; authorized repository access is required. The public site deploys verified output from `9.0v` through GitHub Actions.

Use Node24 and npm:

```sh
npm ci
npm run dev
npm run verify
npm run preview
```

`verify` runs type checks, unit tests, content/media validation, production build, generated-output tests and local link verification. `preview` serves the built result. This Windows machine's npm launcher requires the working invocation in [toolchain](docs/operations/toolchain.md).

Projects: `src/content/projects/*.md`. Posts: `src/content/blog/*.md`. Site settings: `src/data/site.json`. Résumé: `src/data/resume.json`. Uploads: `public/uploads`. Forms: `.pages.yml`.

Entries default to draft. Production excludes drafts and future dates; filenames determine stable URLs. Dates use the Toronto calendar day; scheduled content needs another build to publish. Uploaded images require alt text; Markdown supports no raw HTML or MDX.

Read the [browser guide](docs/content/editor-guide.md), [editor setup](docs/operations/editor-setup.md), [publishing instructions](docs/operations/publishing.md), [launch checklist](docs/operations/launch-checklist.md) and [recovery guide](docs/operations/rollback.md).

Deployment is enabled with `PAGES_DEPLOY_ENABLED=true`; GitHub Pages uses the Actions workflow. Checks run for pushes to `9.0v` and PRs. Only verified `dist` output can deploy from `9.0v`. Hosted editor authorization and current résumé facts still require owner validation for full editor acceptance. See [checkpoint](docs/operations/progress.md), [acceptance](docs/operations/acceptance.md) and [maintenance](docs/operations/maintenance.md).

- [Design brief](docs/superpowers/specs/2026-10-03-website-9-design.md)
- [Implementation plan: all phases](docs/superpowers/plans/2026-10-03-website-9.md)
- [Legacy content and recovery](docs/migration/legacy-inventory.md)
