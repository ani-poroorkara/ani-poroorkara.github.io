# Website 9.0v design brief

October 3, 2026. Architecture approved in conversation; detailed decisions proposed for review with the implementation plan.

## Intent and architecture

An AI-first personal website expressing simple answers to complex problems. Public site: `https://ani-poroorkara.github.io`. Owner edits projects, posts, resume and media through browser forms/uploads. Audience assumption: peers, collaborators, potential employers.

Astro builds static HTML from repository files; external hosted Pages CMS writes those files via its GitHub App; GitHub Actions validates/builds/deploys successful output. Root-level Astro components/CSS, no React unless later needed. No database, newsletter, chatbot, or automatic importer at launch. Editor is separate from GitHub Pages hosting.

Static output, trailing-slash page URLs, canonical site `https://ani-poroorkara.github.io`, no repository base prefix. Node 24 locally/CI, with package/action compatibility checked at installation. Exact direct dependency versions and committed lockfile; CI uses `npm ci`. Branch exactly `9.0v`.

## Routes and content contract

Routes: `/`, `/projects/`, `/projects/<slug>/`, `/blog/`, `/blog/<slug>/`, `/resume/`, `/404.html`, `/rss.xml`, sitemap and robots. Home contains positioning, at most three featured projects, three latest posts, About, resume/contact links. Preserve anchors `landing`, `about`, `projects`, `contact`.

Markdown in `src/content/projects/` and `src/content/blog/`. File basename is stable slug matching `^[a-z0-9]+(?:-[a-z0-9]+)*$`. Derive CMS filename from title on creation only; disable rename. Reject frontmatter slug overrides. Changing published slugs requires a redirect/migration decision.

Common metadata: nonempty `title`, `summary`; valid calendar date `published` (`YYYY-MM-DD`); optional `updated` >= published; `tags` unique nonempty strings (default []); optional `cover` root-relative upload image; `coverAlt` required with cover; `draft` default true; Markdown body.

Projects add `featured` default false; `status` enum `active|archived|experiment`; optional HTTPS `repository`, `demo`. Case studies explain problem, approach, AI contribution where relevant, results, learning. No invented claims.

`src/data/site.json`: `name`, `headline`, `bio`, `contactEmail`, `availability`, `socials` array `{label,url}` with HTTPS URLs, `seoDescription`, optional root-relative `socialImage`. Name: Anirudh Poroorkara. Proposed headline: “AI-first thinking. Simple solutions to complex problems.”

`src/data/resume.json`: `summary`, `experience` array `{organization,role,start,end?,location?,highlights[]}`, `education` array `{institution,qualification,start,end?}`, `skills` array `{category,items[]}`, optional `pdf` upload path and `pdfUpdated` date. Start/end are `YYYY-MM`; omitted end means current. Empty arrays valid during authoring; hide unavailable PDF links. HTML edits do not regenerate the separately uploaded PDF.

Uploads: `public/uploads/images/` maps to `/uploads/images/`; `public/uploads/documents/` to `/uploads/documents/`. Images JPG/PNG/WebP/AVIF <=2 MiB; documents PDF <=10 MiB. Check actual format, safe paths, existence and alt text in CI. Trusted SVG design assets in `public/brand/`, not CMS upload fields. Configure CMS format restrictions; enforce sizes in CI if editor cannot.

## Publication rules

Central rules for routes, lists, RSS, sitemap: exclude drafts/future dates in production; sort published descending, slug ascending. Evaluate dates against America/Toronto build date; avoid UTC display shifts. Future posts require another build; automatic scheduling deferred. Empty lists show truthful empty states. `SHOW_DRAFTS=true` is local preview only; never deploy such output. Draft source in a public repository remains public.

CMS targets `9.0v`; deployment disabled during development. After cutover `9.0v` is publishing branch; explicitly decide default branch. Publication requires push/manual dispatch on `9.0v` AND repository variable `PAGES_DEPLOY_ENABLED=true`. PRs validate only. Enable after checking Pages settings and reviewing full preview. Failed checks/build leave prior live deployment intact.

## Visual and accessibility contract

Initial palette: background `#FAF9F6`, text `#172021`, accent `#0F766E`, muted `#52615E`, border `#DEE5E1`. System sans-serif, sparing monospace metadata; maximum page width 1120px, article width 720px, spacing multiples of 4px. Tokens subject to visual review. Real screenshots/diagrams, restrained decoration, short About with interests.

Actual navigation links, one h1/page, landmarks/skip link, visible focus, descriptive labels, keyboard controls, accessible contrast. Motion under 200ms and disabled with reduced-motion preference. No rotating headline/theme toggle at launch. Print hides navigation/controls and preserves readable content/page breaks.

## Acceptance and launch

Unique titles/descriptions, absolute canonicals, Open Graph/Twitter cards, verified default social image, article dates. RSS/sitemap exclude unpublished content. Validate internal output links/media, CSS references and metadata URLs. Verify external project links separately.

Meaningful tests: invalid dates/slugs, duplicate IDs, missing assets, empty published collections, draft/future filtering, executable/raw HTML Markdown and unsafe URLs, mobile navigation, direct refresh, resume without PDF. No CMS MDX. Reject raw HTML/executable content and unsafe URL schemes.

Launch requires verified resume facts, no placeholders, checked repositories, successful CMS edit-to-deploy test and documented rollback. Owner completes GitHub sign-in/App authorization; no source secrets. Exact source baseline: `e5bd23b0df82a124b67a342bac011570e0c16570`; migration inputs and recovery recorded in `docs/migration/legacy-inventory.md`.
