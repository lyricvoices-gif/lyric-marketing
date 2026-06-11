# Lyric Marketing Site — CLAUDE.md

## What This Is
The public marketing website for **Lyric** — an imprint of curated AI voice identities, built with real artists who retain their rights (consent, control, compensation — the NAVA framework). This is the only marketing site.

Stack: Next.js 15.3.x, App Router, TypeScript, React 19. Newer pages style through the `lv-*` class system in `app/globals.css`; some older pages (`/editions`, `/pricing`, legacy routes) still use inline styles. Smooth scrolling site-wide via Lenis (`components/SmoothScroll.tsx`).

**GitHub:** `github.com/lyricvoices-gif/lyric-marketing`
**Production:** Vercel, auto-deploys from `main` — domain target `lyricvoices.ai`
**Dev:** `npm run dev -- --port 3002` → `http://localhost:3002`
**Node:** 22.x · **Build:** `npm run build`

The previous (2026 v1) landing page is preserved in `archive/landing-page-v1-2026/` — do not edit it; it is not built.

---

## Design System

### Colors (CSS vars in `globals.css :root`)
```css
--bg-light:  #FFF8EC   /* warm off-white — primary ground */
--olive:     #5A5E43   /* dark olive — primary text on cream; products section bg */
--gold:      #F3D171   /* accent — use sparingly */
--sage:      #C1C17E   /* paired accent with gold */
--bg-dark:   #2b2a25   /* legacy dark — older sections (audiences, final CTA) */
--text-1/2/3, --border  /* legacy text + hairline tones */
```
Per-voice identity colors: Atlas `#7A9B82`, Hex `#E0834A`, Morgan `#F3D171`, Nova `#B5C19E`, Riven `#B5634D`.

### Fonts
- **Display:** GT Super Display → `--font-display` (headlines; italic = emotional emphasis)
- **Body/UI:** GT America → `--font-body`; GT America Mono → `--font-mono`
  - ⚠️ Both are **Grilli Type TRIAL fonts** loaded via `@font-face` from `/public/fonts/grilli-type/` — replace with licensed files before production launch (see notice at top of `globals.css`).
- **Accent italic:** Instrument Serif (italic 400 only) → `--font-accent` (pull-quote moments)
- **Signature:** Pinyon Script → `--font-signature` (About page signature)
- Google fonts load via `next/font/google` in `app/layout.tsx`; Grilli faces via `globals.css`.

### Recurring patterns
- **Eyebrow:** dot + 11px/700 uppercase label (`.lv-philosophy-eyebrow` + `.lv-eyebrow-dot`)
- **Editorial link CTA:** underlined text + arrow (`.lv-link-cta`, disabled variant `.lv-link-cta-disabled` for "Coming soon")
- **Pill CTA:** 54px rounded button (`CTA` helper in `app/page.tsx`, `lv-cta-*` classes)
- **ScrollReveal** (`components/ScrollReveal.tsx`): IntersectionObserver fade-up, stagger with `delay={i * 80}`
- **ScrollHighlightText**: per-word opacity lift tied to scroll — manifesto only
- All ambient/visual motion must respect `prefers-reduced-motion` (gates live in `globals.css`)

---

## Home Page (`app/page.tsx`) — section order
1. `HomeHero` — type-led cream hero, gradient ground
2. **Manifesto** — `ScrollHighlightText` movements on cream
3. `LogoCycler` — brand logos, vertical cycling lockup
4. `ProductsSection` — **scrollytelling pillars** (see below)
5. `ListenSection` — artist index with audio playback (persistent playback bar in layout)
6. **Audiences / Work with us** — dark interlude, 3 columns (artists / brands / researchers)
7. `NotesSection` — editorial notes teaser
8. **Final CTA** — dark, "The voice-first era is here."
9. `MobileStickyCTA` — mobile-only sticky bar

## Products Section (scrollytelling)
Olive chapter break with a hard cream→olive edge. Centered header ("Three pillars. One *imprint*."), then **one pinned frame, three movements**:

- `components/ProductsSection.tsx` — server shell: header + `<ProductsScrolly />`
- `components/products/ProductsScrolly.tsx` — client. Owns the pillar copy (Imprint / Score / Opus), the tall scroll container (`.lv-sp`, 340vh desktop), and scroll progress. Desktop ≥769px: sticky 100vh panel; left copy rail lists all three pillars (inactive ones dim, active body+CTA expands via 0fr→1fr grid rows; gold progress hairline driven by `--sp-progress`); right stage cross-fades the three visuals. Mobile: no pinning — stage hidden, each rail item renders its own visual above its copy (duplicate visuals are `display:none` on the other breakpoint; OpusVisual's animation is IO-gated so hidden copies never run).
- Visuals (all CSS + inline SVG, no image assets, shared dark stage so they read as a family):
  - `products/ImprintVisual.tsx` — **two CSS-built mobile-app phone mockups** (front: Edition 01 roster screen; back: Atlas session screen with breathing waveform). Screens are CSS recreations of the mobile app; real app screenshots can drop into `.lv-phone-screen` later without changing the composition.
  - `products/ScoreVisual.tsx` — breathing gold orb + museum-placard metadata strip
  - `products/OpusVisual.tsx` — animated Direction-mode chat (character streaming, suggestion chips, 3-round loop; starts on scroll-into-view)
- CSS lives in `globals.css` under "Scrollytelling pillars" (base + `min-width: 769px` block + reduced-motion gate).

### ⚠️ position:sticky gotcha
`html`/`body` use `overflow-x: clip` (with `hidden` fallback). **Do not change this back to plain `overflow-x: hidden`** — hidden turns body into a scroll container and silently kills `position: sticky` everywhere, which the products scrollytelling depends on.

---

## Pages
| Route | Notes |
|---|---|
| `/` | Home — see section order above |
| `/about` | Brand story, locations, briefing promo |
| `/imprint` (+ `/apply`, `/license`, `/agreement`) | Pillar 01 — roster, for-artists/for-brands sections |
| `/opus` | Pillar 03 — Direction + Composer modes |
| `/score` | Pillar 02 — datasets (nav marks it "coming soon") |
| `/notes` (+ `[slug]`) | Editorial notes |
| `/for-artists`, `/for-brands` | Audience routing pages (linked from home) |
| `/stories/...` | Editorial features |
| `/case-studies/*` | **Standalone** — `SiteChrome` suppresses nav/footer on these |
| `/briefing` | The Lyric Briefing (Substack front door) |
| `/editions`, `/pricing`, `/composer`, `/timbre`, `/preview/gradient` | Legacy / unlinked from nav — older inline-style code; `/timbre` superseded by Opus Direction mode |

Nav (`components/Nav.tsx`): About · Products ▾ (Imprint / Opus / Score-coming-soon) · Notes.

---

## Link Targets
| Action | Destination |
|---|---|
| Composer app / sign-up | `https://composer.lyricvoices.ai` (+ `/sign-up?plan=…` on pricing) |
| General contact | `mailto:hi@lyricvoices.ai` |
| Licensing / Score / Imprint applications | `mailto:info@lyricvoices.ai?subject=…` |
| The Lyric Briefing | `https://thelyricbriefing.substack.com` |

---

## Decisions Made
| Decision | Reason |
|---|---|
| Products = scrollytelling (one pinned frame, 3 movements) | Layout literally expresses "three pillars, one imprint"; replaced alternating two-column blocks that read as three disconnected sections over ~4 viewports |
| All three pillar visuals share the dark stage | They read as one family; the old cream Imprint panel was the low-contrast outlier |
| Imprint visual = CSS phone mockups of the mobile app | Asset-light, color-true; frames accept real screenshots later |
| Pillar visuals are CSS/SVG, no images | Lightweight; motion tunable next to markup |
| `overflow-x: clip` on html/body | Plain `hidden` breaks `position: sticky` (see gotcha above) |
| Composer + Direction are modes inside Opus; Briefing lives under the Imprint | They are no longer top-level pillars/products |
| Case studies render without site chrome | Self-contained editorial pieces (`SiteChrome` standalone prefixes) |
| Manifesto uses per-word scroll highlight | Editorial pacing — used nowhere else on the page |
| Cream→olive hard edge into Products | Restraint reads as conviction; soft fades read as hesitation |
| Old landing page kept in `archive/` | Reference only — never edit or build |

---

## Deploy
- **Platform:** Vercel, auto-deploy on push to `main`; manual: `vercel --prod`
- **Domain:** `lyricvoices.ai` target
- **Before production launch:** replace Grilli Type trial fonts with licensed files

## Reference Assets
High-res originals + reference screenshots live outside the repo at
`/Users/lyricvoices/Documents/lyricvoices-marketing-reference/`.
