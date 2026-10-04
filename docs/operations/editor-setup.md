# Browser editor setup

The editor is separate from the public site. Public visitors cannot edit. Editing requires owner-authorized GitHub access through Pages CMS. No collaborator invitations are configured.

1. Push the prepared `9.0v` branch to this repository with publication disabled.
2. Open https://app.pagescms.org and sign in with your GitHub account.
3. Install/authorize the Pages CMS GitHub App for **only** `ani-poroorkara.github.io`.
4. Choose this repository and branch **9.0v**. It loads `.pages.yml`.
5. Open Projects, Blog posts, Site settings, or Résumé. New entries start as drafts.

The configuration uses JSON syntax, which is valid YAML. It defines four editors, stable creation-only filenames, nested résumé fields and two upload folders. No credentials belong in source.

Images must be <=2 MiB and JPG/PNG/WebP/AVIF. PDFs <=10 MiB. Upload paths are checked during builds. Saved changes are commits; publishing requires a successful workflow and the deployment gate.

Hosted setup and real save/upload round-trip are pending owner authentication. These have not been claimed as tested. Default branch/publishing settings have not been changed.
