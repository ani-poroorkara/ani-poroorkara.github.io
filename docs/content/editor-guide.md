# Editing your site

Sign in at https://app.pagescms.org, choose this repository and **9.0v**. Only GitHub accounts you authorize can edit; visitors cannot write to the website. Installation is in [editor setup](../operations/editor-setup.md).

## Projects and blog posts

Choose Projects or Blog posts → create an entry. Give it a title, short summary, publication date and Markdown body. New entries default to draft. Project entries also have status, featured flag and optional HTTPS repository/demo links. Choose a concise creation filename: the filename determines the public URL and remains stable when the title changes. Renaming/deletion is intentionally disabled in the editor.

Upload a JPG, PNG, WebP or AVIF cover through the image field (maximum 2 MiB). Compress large pictures first; describe meaningful images in alt text. The body supports headings, links, lists, fenced code and uploaded images. Raw HTML and executable embeds are rejected. Images belong in `public/uploads/images`; the editor supplies `/uploads/images/...` URLs.

Save as a draft while writing. **Drafts are still files in a public repository**, so use no private information. When ready, clear Draft and use a date no later than today in Toronto. A future date keeps the entry unpublished until a new production build on/after that date; it is not an automatic publishing timer.

## Site settings and résumé

Site settings controls your bio, headline, contact, social links and sharing description/image. Résumé controls summary, roles, education and skills. Use `YYYY-MM` dates; omit an end date for a current role. Empty fields/arrays are supported. Career claims must be your own verified facts.

Upload a PDF separately through the résumé document field (maximum 10 MiB); update its date when replaced. The website does not generate a PDF from the résumé form. No PDF means no download link. Check text and PDF agree before publishing. The résumé page has a print-friendly style.

## Save and publish

Saving creates a GitHub commit. Check [Actions](https://github.com/ani-poroorkara/ani-poroorkara.github.io/actions) for green validation and deployment; saving alone does not guarantee a live change. Publication is disabled during setup. After launch, a successful update publishes automatically from `9.0v`.

If checks fail, open the failed stage, correct the named file/field and save again. For mistakes, restore the earlier file through GitHub history as a new commit; see [recovery](../operations/rollback.md).

First exercise: create a draft post, upload a small image with alt text, save, change its title, clear an optional field, and confirm its filename stays the same and all checks pass. Publish a meaningful finished post after owner review and confirm its public URL and feed entry. Hosted completion of this exercise is still pending.
