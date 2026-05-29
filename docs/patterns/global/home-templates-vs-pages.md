# Home: templates vs pages

The index page separates the two — never mixed:

- **Templates** — one card per layout template in `src/templates/`, each shown
  once via a representative preview page.
- **Pages** — standalone screens in `src/pages/` that reuse a template, listed
  separately.

If a template has a representative page, show it once (under Templates); a page
with no template of its own goes under Pages.
