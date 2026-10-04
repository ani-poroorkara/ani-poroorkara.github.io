# Launch checklist

- [x] Build Home, Projects, Blog, Résumé and detail pages with one shared publication policy.
- [x] Configure browser forms and file uploads; local schema/configuration tests pass.
- [x] Add CI and gated publication; gate remains disabled.
- [ ] Confirm current résumé facts/PDF, contact details and final copy with owner.
- [ ] Owner sign-in and authorize Pages CMS for this repository only; select `9.0v`.
- [ ] Complete the [hosted editor exercise](editor-smoke-test.md), including upload/save/optional-field clearing and stable filename after title edit.
- [ ] Record authenticated current Pages settings and last successful live revision.
- [ ] Verify the pushed branch's GitHub checks and owner review of the complete preview.
- [ ] Deliberately select Actions publishing, allow the branch in Pages environment, enable `PAGES_DEPLOY_ENABLED`, and publish the reviewed commit.
- [ ] Record new deployment commit/run and verify live routes, refresh/Back, missing route/404, old Home anchors, metadata, feeds, media and PDF if provided.
- [ ] Prove a routine browser edit → successful checks → deployment → live update.

Local implementation and a passing build do not establish hosted editing or live deployment success.
