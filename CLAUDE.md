# Starfinger Design - Project Instructions

## Overview
Portfolio website for Selma Starfinger, an international award-winning fashion designer.
- **Domain**: starfinger.design
- **Hosting**: Cloudflare Pages
- **Framework**: Hugo (v0.151.0+ extended) with hugo-profile theme
- **Config**: `config.yaml`

## Project Structure
- `content/` - Markdown pages: about, contact, portfolio, press
- `layouts/` - Custom Hugo templates overriding the theme
  - `layouts/index.html` - Homepage (hero + portfolio gallery)
  - `layouts/partials/portfolio.html` - Portfolio image gallery
  - `layouts/shortcodes/` - Custom shortcodes (about, contact, press, image-gallery)
- `assets/portfolio/` - Portfolio images organized by collection/shoot
- `assets/images/` - Hero and general site images
- `static/` - Favicons, logos (SVG), lightbox.js, style.css
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
- Social links: Instagram, Etsy, Not Just A Label, LinkedIn
- Images are processed by Hugo's image pipeline (resources/_gen/)
- Goldmark renderer set to `unsafe: true` for raw HTML in markdown
- Custom lightbox implementation (`static/lightbox.js`, `assets/sass/lightbox.scss`)

## Deployment
Built and deployed via Cloudflare Pages. The `public/` directory is gitignored.

## Git Notes
- Many `._*` macOS resource fork files in untracked state — these should stay gitignored
- `resources/_gen/` is checked in (not gitignored) for build caching
