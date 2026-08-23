# Repository Guidelines

## The Invitation Suite

This repository is the wedding website for Eazan and Luyoona. It is a simple static site with no framework or build step.

- `index.html` holds the invitation wording, event details, and inline floral artwork.
- `style.css` sets the green-and-silver theme, layout, and animations.
- `script.js` runs the envelope reveal, navigation, scroll effects, and wedding countdown.

Place any future photos or artwork in `assets/` and use relative paths.

## Previewing the Celebration

Serve the site locally from the repository root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. No install or compilation is needed.

## Keeping the Style Consistent

The site should continue to feel elegant, calm, and easy to read. Reuse the colors, fonts, and spacing variables at the top of `style.css` before adding new ones. Keep decorative details subtle and make sure the wedding date, time, venue, and directions remain the clearest information on the page.

Use two-space indentation. CSS classes use kebab-case with modifiers such as `.floral--calla`; JavaScript names use camelCase. Follow the existing JavaScript style of single quotes and semicolons. Keep useful `aria-*` labels, keyboard controls, semantic HTML, and reduced-motion support intact.

## The Final Fitting

There are no automated tests, so preview every change in desktop and mobile widths. Check that the envelope opens, scrolling unlocks, the mobile menu works, the countdown updates, and the map and directions link open correctly. Test around the `760px` breakpoint, with a keyboard, and with reduced motion enabled.

Before committing, run:

```sh
git diff --check
git status --short
```

## Sending Changes Down the Aisle

Use short, specific commit messages, for example `Polish invitation spacing on mobile`. Keep unrelated edits separate. Pull requests should explain what guests will notice, describe how the change was checked, and include screenshots for visual updates or a short recording for animation changes.
