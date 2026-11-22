# Starfinger Design - Project Instructions

## Overview
Portfolio website for Selma Starfinger, an international award-winning fashion designer.
- **Domain**: starfinger.design
- **Hosting**: Cloudflare Pages
- **Framework**: Hugo v0.170.1 (standard edition is enough; the site uses no Sass) with hugo-profile theme
- **Config**: `config.yaml`

## Project Structure
- `content/` - Markdown pages: about, contact, portfolio, press
- `layouts/` - Custom Hugo templates overriding the theme
  - `layouts/index.html` - Homepage (hero + portfolio gallery)
  - `layouts/partials/portfolio.html` - Portfolio image gallery
  - `layouts/shortcodes/` - Custom shortcodes (about, contact, press, image-gallery)
- `assets/portfolio/` - Portfolio images organized by collection/shoot
- `assets/images/` - Hero and general site images
- `assets/video-posters/` - Poster images for the Vimeo videos (`<vimeo id>.jpg`)
- `assets/css/lightbox.css` - Lightbox styles (plain CSS, minified and fingerprinted by Hugo)
- `assets/css/style.css`, `assets/js/` - Site CSS and JS; templates minify and fingerprint them, so each change gets a new URL (Cloudflare lets browsers cache CSS/JS for 4 hours, and unversioned files went stale in Safari)
- `static/` - Favicons, logo (SVG), `_headers` (Cloudflare cache rules)
- `data/press.txt` - Press links (date + URL format), processed by `data/build_press.py`
- `themes/hugo-profile` - Git submodule from `git@github.com:billzajac/hugo-profile.git`

## Development
```bash
hugo server -D          # Local dev server with drafts
hugo                    # Build to /public/
```

## Key Details
- Theme toggle disabled; light mode only
- Google Analytics: G-MGWB4RL908
- Social links: Instagram, TikTok (@1111berlin), LinkedIn; 1111 BERLIN (replaces Etsy) is the hero button and menu item
- Links to https://1111.berlin carry `?ref=starfinger.design`
- "Shop" links show the stacked 1111 BERLIN logo (`layouts/partials/brand-1111.html`, set `brandLogo: true` on the menu item or hero button). `assets/brand/1111-berlin-logo.svg` is a copy of `~/code/1111.berlin/public/logo-wide.svg`; update it when that logo changes
- Images are processed by Hugo's image pipeline (resources/_gen/)
- Goldmark renderer is `unsafe: false` (raw HTML in markdown is not rendered)
- Custom lightbox implementation (`assets/js/lightbox.js`, `assets/css/lightbox.css`)
- Gallery grid uses WebP srcset (480/800/1200w); the lightbox loads the 1600px file from `data-full`
- Icons are inline Font Awesome 6 SVGs from the theme (`layouts/partials/fa-icon.html`); do not load the FA all.js
- Vimeo videos show a poster; the player loads on tap (`assets/js/vimeo-facade.js`)

## Deployment
Built and deployed via Cloudflare Pages (project `starfinger-design`, build command `hugo`, output `public`). `HUGO_VERSION` is set in the Pages project settings for production and preview; keep it equal to the local Hugo version. The `public/` directory is gitignored.

## Git Notes
- Many `._*` macOS resource fork files in untracked state — these should stay gitignored
- `resources/_gen/` is checked in (not gitignored) for build caching; run `hugo --gc` before committing to remove stale files
- Unused images were moved out of the repo to `~/code/starfinger.design-archive/` (same folder structure)
