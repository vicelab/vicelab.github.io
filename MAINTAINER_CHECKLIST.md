# VICE Lab Website Maintainer Checklist

## Photos requiring human follow-up

Before adding a portrait, confirm the subject approves its use and that VICE Lab has permission to publish it. Use a square or portrait-oriented JPEG, crop consistently with existing headshots, optimize it for the web, and use the exact filename shown.

- [ ] Obtain an approved portrait for Erin Hestir and save it as `images/people/erin-hestir.jpg`.
- [ ] Obtain an approved portrait for Aditya Sood and save it as `images/people/aditya-sood.jpg` (used by the Sierra HP and CERC-WET projects).
- [ ] Obtain an approved portrait for Megan Mayzelle and save it as `images/people/megan-mayzelle.jpg`.
- [ ] Confirm that `images/people/josue-medellin-azuara.jpg` is the intended current portrait for the Water Systems Management collaborator card.
- [ ] Review collaborator names and affiliations against their official lab pages at least annually.

Until these photographs are supplied, the site displays `images/people/no-picture.jpg` instead of a broken image.

## Content decisions

- [ ] Decide whether the 2021 Community Survey page should be updated, archived, or removed; it still promises a June 2021 report.
- [ ] Update the footer's “Updated October 2020” wording or replace it with an automatically maintained copyright year.
- [ ] Review and update remaining plain-HTTP external links.
- [ ] Confirm whether the archived PPIC site snapshot should remain publicly deployed under `archived-sites/`.
- [ ] Review people referenced by projects, news, and publications but absent from `people.csv`; either add profiles or intentionally render their names without profile links.

## Technical follow-up

- [ ] Upgrade the bundled jQuery 3.3.1 to a supported release and regression-test CSV rendering, menus, filters, and modals.
- [ ] Compress `images/news/casa-ele-2022-launched.jpg` (currently about 21.7 MB) and other multi-megabyte images; target less than 500 KB where practical.
- [ ] Confirm whether the unused `images/news/IMG_0383.png` can be removed.
- [ ] Add a periodic external-link checker after redirects and intentionally archived links are documented.
- [ ] Run `python scripts/validate_site.py` before every content pull request and resolve all errors; review warnings explicitly.