# Publishing

The public website remains on its previous deployment. The new branch is `9.0v`.

Every push to `9.0v` and every pull request runs **Verify website**: clean installation, type checks, unit checks, content validation, production build, generated-output checks, and local link verification. No editor credentials are needed by the site.

**Publish website** runs only for a `9.0v` push or manual run when repository Actions variable `PAGES_DEPLOY_ENABLED` equals `true`. It repeats the complete verified pipeline and uploads only `dist`. A separate deployment job needs that successful build. PRs and other branches cannot deploy. Draft previews are disabled.

Before enabling publication, finish [launch checks](launch-checklist.md) and record the existing [Pages settings](deployment-baseline.md). Select Settings → Pages → Source → GitHub Actions, allow `9.0v` in the `github-pages` environment, and set the variable in Settings → Secrets and variables → Actions → Variables. These settings are not changed by this implementation.

Saving content commits source; only successful publication changes the public site. A failed check leaves the previous successful deployment available. Open Actions → failed run → failing stage for the filename/field to correct, save the correction, and wait for a green deployment.

Scheduled dates are evaluated on each build using America/Toronto. A future post requires another push or manual publication run after its date; there is no automatic midnight publishing job. Manual runs on a non-default branch may require the workflow to exist on the default branch first.

Actions are pinned to verified official revisions of checkout/setup-node v6 and upload/deploy Pages v4. This uses the [documented GitHub static artifact workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), avoiding a second unverified build.
