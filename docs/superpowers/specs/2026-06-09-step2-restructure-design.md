# Step 2 — Site Restructure Design

**Date:** 2026-06-09

## Goal

Split the current single-scroll `index.html` into two distinct pages:
- `index.html` — fullscreen hero only, no scrollable content below
- `about.html` — bio + timeline, with minimal top nav

## index.html Changes

- Remove `about-me-section`, `content-showcase`, footer from DOM
- Remove `scroll-down-container` and its CSS
- Make `<h1>` ("Ananya Singhal") a link → `about.html`
- Remove Bootstrap 5 CSS/JS (not used on this page)
- Page is purely the fullscreen hero with particle canvas + hover arrows

## about.html (new file)

### Top Nav
- Left: `← ananya singhal` (links back to `index.html`), styled with Orbitron, green accent
- Right: `experience | publications | projects | awards` — plain text links, uppercase, 11px
- Sticky, dark background, subtle bottom border

### Layout
- Two-column, full viewport height below nav, no page scroll
- **Left col (420px fixed):** bio text, education box, social icons, resume button — scrollable independently
- **Right col (flex:1):** updates timeline — auto-scrolls at 1px/40ms, pauses on hover, restarts from top when end reached
- Vertical divider: `1px solid rgba(255,255,255,0.07)`

### Timeline cards
- Each item has a category badge: Publication / Award / Role / Conference / Research
- Dot + vertical line connector
- Card hover: brighter left border + slightly lighter background

### Content (from CV)
All timeline entries updated to reflect current CV including:
- EMBC 2026, ISBI 2026 publications
- GE HealthCare FSE project
- Grace Hopper 2024
- Teaching assistant roles

### Fonts
- Orbitron: nav back-link + section labels only
- Inter/system-sans: all body text (drop global Orbitron on `*`)

## Tech

- No Bootstrap on either page
- Plain HTML + CSS + vanilla JS
- Mobile: left col stacks above timeline col; top nav collapses to hamburger
