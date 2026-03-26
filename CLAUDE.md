# Lyric Marketing Site — CLAUDE.md

## What This Is
The public marketing website for **Lyric** — an AI voice platform built for intentional sound.
This is the **only** marketing site. There is no Framer site. The mini composer (free-tier voice preview) lives here on the home page.
Stack: Next.js 15.3.9, App Router, TypeScript, inline styles throughout (no Tailwind, no CSS modules).

**GitHub:** `github.com/lyricvoices-gif/lyric-marketing` (private)
**Production:** `https://lyric-marketing.vercel.app` (Vercel, auto-deploys from `main`) — domain will move to `lyricvoices.ai` at launch
**Dev:** `npm run dev -- --port 3002` → `http://localhost:3002`

---

## Design System

### Colors
```ts
DARK   = "#2b2a25"  // dark bg, nav, footer, location cards
LIGHT  = "#f5f3ef"  // warm off-white bg
GOLD   = "#c9a96e"  // accent
TEXT1  = "#1a1a18"  // primary text
TEXT2  = "#4a4a45"  // body text
TEXT3  = "#9c958f"  // muted / labels
BORDER = "#e5dfd5"  // dividers
```

### Fonts
- **Display (serif):** Cormorant Garamond → CSS var `--font-display`
  - Used for all headlines, large italic serif moments
  - Weights: 400, 500, 600, 700 — normal + italic
- **Wordmark:** Agrandir Regular (local, `/public/fonts/Agrandir-Regular.otf`) → used only for "lyric" logo in nav + footer
- **Signature:** Pinyon Script → CSS var `--font-signature`
  - Used only on About page for Michael Lang signature at 30px
- Both Google fonts loaded via `next/font/google` in `app/layout.tsx`

### Label style (shared helper)
```ts
const label = {
  fontSize: "11px", fontWeight: 600,
  letterSpacing: "0.08em", textTransform: "uppercase", color: TEXT3
}
```

### Spacing scale
- Section padding: `72px 48px` (standard), `104px 48px` (hero/top of page)
- Max content width: `1120px` centered with `margin: "0 auto"`
- Card gaps: `12px` tight, `64px` editorial column gap

### Scroll animations
Component: `components/ScrollReveal.tsx`
- `opacity 0→1` + `translateY(20px)→0`
- Duration: `0.7s cubic-bezier(0.25, 0.1, 0.25, 1)`
- Threshold: `0.08`
- Respects `prefers-reduced-motion`
- Stagger pattern: `delay={i * 80}` or `delay={i * 60}`

---

## File Structure

```
app/
  layout.tsx          — root layout: fonts, Nav, Footer, paddingTop 52px
  globals.css         — @font-face Agrandir, base resets, lyric-scroll keyframe (ticker)
  page.tsx            — Home page (~520 lines)
  about/page.tsx      — About page
  editions/page.tsx   — Editions page (stub — needs full rebuild)
  pricing/page.tsx    — Pricing page ✅ Built (see below)

components/
  Nav.tsx             — Fixed top nav, 52px height, dark bg, blur-in on load
  Footer.tsx          — Dark bg, brand block + social icons + nav columns + copyright
  ScrollReveal.tsx    — IntersectionObserver fade-up animation wrapper
  VideosInAction.tsx  — "Voices in Action" carousel (fixed 3-slot, width transition)
  VoiceCardTicker.tsx — Horizontal scrolling voice card ticker (mini composer)
  AudioPlayButton.tsx — Play/pause button for voice samples

public/
  fonts/Agrandir-Regular.otf
  images/
    founders_1–4.webp       — Founder portrait photos (used in home page social proof)
    floret-hex.jpg           — Voices in Action: HEX card bg (FLORET 01_1)
    floret-nova.jpg          — Voices in Action: NOVA card bg (FLORET 05_2)
    floret-morgan.jpg        — Voices in Action: MORGAN card bg (FLORET 03_1)
    about_1.jpg              — B&W portrait (flower over face) — brand story image row
    about_2.webp             — Soft blurred botanicals — brand story image row + briefing accent
    about_3.webp             — Two people at laptop — brand story image row
    about_5.jpg              — SF Bay Area open office — SF location card
    about_6.webp             — Atlanta colorful industrial office — Atlanta location card
    about_signature.webp     — Michael Lang handwritten signature (archived, replaced by font)
    home_1–9.*               — Reference screenshots (not rendered in pages)
```

---

## Pages: Status

### Home (`/`) ✅ Complete
Sections in order:
1. **Hero** — dark, eyebrow + large italic serif h1 + subhead + CTA buttons + founder avatars
2. **Why Choose Lyric** — light, 3 feature cards
3. **Edition 01 row** — light, transition strip linking to /editions
4. **How It Works** — light, 3-step left/right layout, outlined CTA button
5. **VoiceCardTicker** — mini composer, horizontal scrolling voice cards with modal + audio sample
6. **Voices in Action** — carousel (3 fixed slots, width transition, FLORET photography, lightbox)
7. **Full CTA** — dark, centered headline + buttons + social proof row
- Footer appended via layout

### About (`/about`) ✅ Complete
Sections in order:
1. **Hero + Brand Story** — single continuous light section:
   - Centered eyebrow → headline → intro paragraph
   - 3-image row (about_1, about_2, about_3) at `aspectRatio: 3/4`
   - Two-column prose (4 paras left, 3 paras right)
   - Signature block: Pinyon Script 30px + "Michael Lang" + "Founder"
2. **Locations** — dark, two full-bleed photo cards (SF + Atlanta) with gradient overlay + italic serif city names
3. **The Lyric Briefing promo** — light, text left + soft botanical image right, links to `https://thelyricbriefing.substack.com`

### Editions (`/editions`) ⚠️ Stub — needs full rebuild
Currently has a basic voice grid. Needs redesign to match design system.

### Pricing (`/pricing`) ✅ Built
3-column plan grid (Creator / Studio / Enterprise).
- Creator: "Start free trial" CTA → `https://composer.lyricvoices.com/sign-up`
- Studio: "Start free trial" primary CTA + "Or subscribe directly" secondary
- Enterprise: "Contact us" CTA → `mailto:hi@lyricvoices.ai`
- All trial CTAs link to the composer sign-up flow (Clerk-powered)

---

## CTA Link Targets

| Action | Destination |
|---|---|
| Start free trial | `https://composer.lyricvoices.com/sign-up` |
| Sign in | `https://composer.lyricvoices.com/sign-in` |
| Contact | `mailto:hi@lyricvoices.ai` |
| The Lyric Briefing | `https://thelyricbriefing.substack.com` |

**Update all `composer.lyricvoices.com` references to `composer.lyricvoices.ai` when domain goes live.**

---

## Decisions Made

| Decision | Reason |
|---|---|
| No `/contact` page | Contact handled via `mailto:hi@lyricvoices.ai` in footer |
| Email in footer left column, not bottom bar | Cleaner hierarchy; bottom bar = copyright only |
| Social icons in footer left column | 6 icons: Substack, Instagram, X, Threads, Spotify, YouTube |
| Pricing tiers: creator / studio / enterprise | Set in Clerk `publicMetadata.plan` on the composer app |
| No free tier on Next.js composer | Mini composer on this site = free-tier experience |
| FLORET photography in carousel | 7200×5400 originals in `/assets/7200 x 5400/`; resized copies in `public/images/` |
| `images: { unoptimized: true }` in next.config.ts | Required for Vercel static export compatibility |
| Pinyon Script for signature | Replaced signature image — better alignment control, loads as font |
| "Contact" removed from footer Company column | Redundant with mailto link in brand block |
| How It Works CTA = outlined button | `background: transparent`, `border: 1px solid TEXT1` |
| Carousel uses fixed 3 DOM slots | CSS `order` is not animatable; fixed slots + width transition = fluid |
| Voices in Action card images have hover zoom | Scale transform on image on card hover (not the card itself) |

---

## Environment Variables
No `.env` file required for the marketing site. All content is static.

---

## Deploy

- **Platform:** Vercel (connected to GitHub repo, auto-deploy on push to `main`)
- **Domain target:** `lyricvoices.ai` (not yet connected — currently on `.vercel.app`)
- **Build command:** `npm run build` (Next.js default)
- **Node version:** 22.x

To deploy manually: `vercel --prod`

---

## Reference Assets
Original high-res assets live at:
`/Users/lyricvoices/Documents/lyricvoices-marketing-reference/assets/`

Screenshots/reference designs at:
`/Users/lyricvoices/Documents/lyricvoices-marketing-reference/screenshots/`
