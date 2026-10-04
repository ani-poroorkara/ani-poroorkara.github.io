# Legacy inventory and recovery

## Baseline and cleanup

Fresh source: `origin/world-7.1v`, commit `e5bd23b0df82a124b67a342bac011570e0c16570`. New local branch: `9.0v`, without an upstream until explicitly pushed to `origin/9.0v`. This baseline is Angular 15; `angular.json` built into `docs/`. Actual Pages settings still need inspection.

Removed legacy `src/`, generated website `docs/`, Angular configuration, old package manifest/lockfile, TypeScript configuration and Angular-specific VS Code tasks/extensions/debugging. These remain recoverable from the source commit. Retained generic EditorConfig. Cleanup initially left no application; subsequent verified Astro implementation is now pushed to `9.0v`. Original branches, Pages settings and live deployment remain unchanged.

## Existing work preserved

Staged App edit, unstaged Home edit, and first proposal: stash named `Preserve world-8.0v edits and proposal before 9.0v reset`, commit `cedb1cebd93f4204e7b0b27070394b14d2ea4b56`. Initially `stash@{0}`; use the commit ID if numbering changes. Restore only on a clean `world-8.0v` checkout using `git stash apply --index cedb1cebd93f4204e7b0b27070394b14d2ea4b56`.

Ignored React dependencies/build output: `C:/Users/aniru/AppData/Local/Temp/aniWebWorld-before-9.0v-0dae1ae57a5843f38dea13745ffefd6e`. Temporary backup, not durable source storage. Source edits are saved separately in Git.

## Migration sources at baseline commit

Read with `git show <commit>:<path>` or export selected assets with `git archive`. Never restore old application code over new source.

| Path | Material |
| --- | --- |
| `src/assets/data/projects/projects-featured.json` | Playlist Generation; Hand Gesture Recognition |
| `src/assets/data/projects/projects.json` | GradBot; Predicting Hatred Tweets; Decision Tree Classifier; Random Forest Classifier |
| `src/assets/data/projects/img/playlist-generation.svg` | Legacy project illustration |
| `src/assets/data/projects/img/hand-gesture.svg` | Legacy project illustration |
| `src/assets/brand logo.svg` | AP mark; evaluate before reuse |
| `src/assets/landing/computer-img.svg` | Landing illustration |
| `src/app/landing/landing.component.html` | Name and old intro |
| `src/app/about/about.component.html` | Interests, older technology list |
| `src/app/contact/contact.component.html` | Contact/social URLs; confirm availability |
| `src/app/app.component.html` | Navigation/footer |
| `docs/index.html`, `docs/assets/` | Old generated deployment |

Missing referenced images: `chatbot.svg`, `twitter.svg`, `tree.svg`, `forest.svg`. Use no cover or a verified replacement.

## Launch inventory requirements

Verify six repositories and their featured/listed/archived/omitted state. Retain historical project dates; separate rewrite dates. Obtain current resume facts/PDF, contact preferences, availability and audience emphasis. Never import unverified career claims from the abandoned React draft. Preserve Home anchors `landing`, `about`, `projects`, `contact`; inventory other incoming links. Record actual Pages source, publishing branch, deployed revision, and rollback settings before cutover.
