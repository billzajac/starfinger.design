# Starfinger Design - Project Instructions

## Overview
Portfolio website for Selma Starfinger, an international award-winning fashion designer.
- **Domain**: starfinger.design
- **Hosting**: Cloudflare Pages
- **Framework**: Hugo v0.170.1 (standard edition is enough; the site uses no Sass) with hugo-profile theme
- **Config**: `config.yaml`
- **Audience**: most visitors use phones. Check every visual change at phone width first.

## Project Structure
- `content/` - Markdown pages: about, contact, portfolio, press
- `layouts/` - Custom Hugo templates overriding the theme
  - `layouts/index.html` - Homepage (hero + portfolio gallery)
  - `layouts/partials/portfolio.html` - Gallery collections, credits, Vimeo posters
  - `layouts/partials/image-gallery.html` - Image grid for one collection (srcset, lightbox data)
  - `layouts/partials/sections/header.html`, `sections/hero/index.html`, `sections/hero/social.html` - Local copies of theme files (CRLF line endings; keep them)
  - `layouts/partials/fa-icon.html`, `brand-1111.html` - Inline SVG icons and the 1111 BERLIN logo
  - `layouts/shortcodes/` - Custom shortcodes (about, contact, press)
- `assets/portfolio/` - Portfolio images, one folder per collection
- `assets/images/` - Hero, about, contact, and press images
- `assets/video-posters/` - Poster images for the Vimeo videos (`<vimeo id>.jpg`)
- `assets/brand/1111-berlin-logo.svg` - Copy of the 1111 BERLIN logo
- `assets/css/style.css`, `assets/css/lightbox.css`, `assets/js/` - Site CSS and JS (minified and fingerprinted by the templates)
- `static/` - Favicons, web manifest, logo (SVG), `_headers` (Cloudflare cache rules)
- `data/press.txt` + `data/build_press.py` - Helper only: the script opens each press link (from a file named `media`) in the browser for review. The press page reads its items from `content/press.md`.
- `themes/hugo-profile` - Git submodule. `.gitmodules` points to upstream `https://github.com/gurusabarish/hugo-profile.git`, which Cloudflare clones; the local clone's `origin` is the fork `git@github.com:billzajac/hugo-profile.git`. The pinned commit must exist upstream, or the Cloudflare build fails.

## Development
```bash
hugo server -D          # Local dev server with drafts
hugo                    # Build to /public/
hugo --gc               # Build and remove stale files from resources/_gen (run before committing)
```

## Editing Content
- **Gallery collection**: add a folder under `assets/portfolio/`, then add an item to `content/portfolio.md` with `title`, `gallery_dir`, and the credits (`photographer`, `model`, `makeup`, `hair`). Images show in file-name order, so prefix names with numbers (`01-...`).
- **Credits** show in uppercase (CSS). The template keeps "PhD" in mixed case. Add other exceptions in `layouts/partials/portfolio.html` (the `keep-case` span).
- **Vimeo videos**: list the ids in `vimeo:` (space-separated). Save a poster for each id as `assets/video-posters/<id>.jpg` (from `https://vimeo.com/api/oembed.json?url=https://vimeo.com/<id>`, field `thumbnail_url`). Without a poster, the play button shows on a black box.
- **Hero photo**: `params.hero.image` in `config.yaml` (a path under `assets/images/`). The same photo is the link-preview image (`og:image`).
- **Press**: add items to `content/press.md`. Remote press images are downloaded at build time.
- Goldmark renderer is `unsafe: false`, so raw HTML in Markdown is not rendered. Put markup in templates.

## Key Details
- Theme toggle disabled; light mode only
- Google Analytics: G-MGWB4RL908
- Social icons (hero): Instagram, TikTok (@1111berlin), LinkedIn. Add an icon in `params.hero.socialLinks.fontAwesomeIcons` with `icon`, `label` (screen-reader name), and `url`.
- 1111 BERLIN is Selma's brand and replaces Etsy. It is the hero button and the last menu item.
- Links to https://1111.berlin carry `?ref=starfinger.design`
- "Shop" links show the stacked 1111 BERLIN logo (`layouts/partials/brand-1111.html`; set `brandLogo: true` on the menu item or hero button). `assets/brand/1111-berlin-logo.svg` is a copy of `~/code/1111.berlin/public/logo-wide.svg`; update it when that logo changes. Do not set "1111" in the site fonts: Alata draws "1" like "I", and a one-line logo makes the 7-segment digits too small to read.
- Images are processed by Hugo's image pipeline (`resources/_gen/`)
- Gallery grid uses WebP srcset (480/800/1200w); the lightbox (`assets/js/lightbox.js`, `assets/css/lightbox.css`) loads the 1600px file from `data-full`
- Icons are inline Font Awesome 6 SVGs from the theme (`layouts/partials/fa-icon.html`); do not load the FA all.js (1.5 MB)
- Vimeo videos show a poster; the player loads on tap (`assets/js/vimeo-facade.js`)

## Caching
- Cloudflare lets browsers cache CSS and JS for 4 hours, but HTML for 0. An unversioned CSS or JS file therefore goes stale after a deploy (iPhone Safari showed new HTML with old CSS). Load all site CSS and JS through `resources.Get ... | resources.Minify | resources.Fingerprint`; never add an unversioned file to `static/`.
- `static/_headers` caches Hugo-processed images (`/portfolio/*`, `/images/*`, `/video-posters/*`) for one year. Their file names contain a content hash.

## Testing
- Test at phone width, and in WebKit as well as Chrome. A page that works in Chrome or Brave can still break in iPhone Safari.
- Playwright works for this: `chromium` with `channel: 'chrome'` and `webkit` (run `npx playwright install webkit` once), with `devices['iPhone 13']`. Serve `public/` with `python3 -m http.server` and check that `document.documentElement.scrollWidth` equals `innerWidth` (no horizontal overflow).

## Deployment
- A push to `main` starts the Cloudflare Pages build (project `starfinger-design`, build command `hugo`, output `public`).
- `HUGO_VERSION` is set in the Pages project settings for production and preview; keep it equal to the local Hugo version.
- The `public/` directory is gitignored.

## Git Notes
- Many `._*` macOS resource fork files in untracked state — these should stay gitignored
- `.wrangler/` (Wrangler CLI cache with account data) is gitignored
- `resources/_gen/` is checked in (not gitignored) for build caching; run `hugo --gc` before committing to remove stale files
- Unused images were moved out of the repo to `~/code/starfinger.design-archive/` (same folder structure)
