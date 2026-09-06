# Lyric Design System

The single reference for any Lyric surface: marketing pages, product UIs (Composer, Timbre/Atlas), ads, podcast covers, social, OG images. If a token, rule, or pattern is not here, it does not exist yet — propose an addition before improvising.

This doc lives at `lyric-marketing/design.md` because marketing is the brand home. Composer and Timbre reference it.

---

## 1. How to use this doc

- **Building a marketing page**: §2 voice, §3 color (daylight set), §4 type, §6 motion, §7 components.
- **Building a product surface (Composer, Timbre)**: §2 voice, §3 color (studio set for Timbre, daylight for Composer), §8 surface-specific patterns.
- **Producing an asset (ad, OG, podcast cover, social)**: §2 voice, §3, §4, §9 asset production.
- **Writing copy of any kind**: §2 voice — non-negotiable.

When in doubt, the brand reads as **editorial, not promotional**. Lyric is a publication that happens to ship software.

---

## 2. Voice and editorial rules

**Non-negotiable.** These apply to every word that ships under the Lyric name — page copy, ad headlines, podcast titles, OG image text, button labels, error messages, system prompts.

- **No em dashes.** Use commas, periods, or restructure the sentence. Em dashes read as casual and break the editorial register.
- **No exclamation points.** Ever. They contradict the brand's calm.
- **Italics used with discipline.** Reserve italics for emotional accents: pull quotes, manifesto lines, a single word inside a poster. Never for emphasis on a verb in a sentence. If a sentence needs italics to land, rewrite the sentence.
- **Speak in declaratives, not pitches.** "The AI voice platform built for intentional sound." reads as a statement of fact. "Make incredible voices with AI!" is a different brand.
- **Atlas (Timbre's agent) speaks in first person.** Atlas is a named persona, not a chatbot. Welcome turns gear-shift: brief preamble, then one question. Role label reads `ATLAS · LIVE` for the active turn, `ATLAS` for past turns.
- **Composer tagline (locked):** *The AI voice platform built for intentional sound.*

### Tone register by surface

| Surface | Register | Example |
|---|---|---|
| Marketing pages | Editorial, declarative, sparse | "An archive of voices, kept honest." |
| Product UI (Composer) | Operational, calm, low ego | "Generate. Save to library." |
| Atlas (Timbre) | First-person, considered, never chipper | "I'm listening. Tell me the scene." |
| Ads / OG | Single line, italic display, no CTA verb spam | "Voices, not voiceovers." |
| Podcast covers | Editorial masthead, one phrase, one credit line | (see §9) |

---

## 3. Color

Lyric runs two registers — **daylight** (marketing, Composer) and **studio** (Timbre/Atlas). Sage and gold are the family signature and appear in both.

### 3.1 Signature accents (shared across all surfaces)

| Token | Hex | Use |
|---|---|---|
| `--sage` | `#C1C17E` | Primary accent. Eyebrow dot, active indicators, focus rings, Atlas live state. |
| `--gold` | `#F3D171` | Secondary accent. Pull quotes, hero gradients, dark-surface eyebrow dot swap. |

Sage is the workhorse. Gold is a guest — used sparingly for warmth or to swap the sage dot on dark backgrounds.

### 3.2 Daylight set (marketing, Composer marketing pages)

| Token | Hex | Use |
|---|---|---|
| `--bg-light` | `#FFF8EC` | Primary ground. Warm off-white, the "cream." |
| `--bg-card` | `#FFFFFF` | Cards, raised surfaces. |
| `--bg-dark` | `#2B2A25` | Legacy dark sections (avoid for new work — prefer studio set if going dark). |
| `--olive` | `#5A5E43` | Primary text on cream. Headings, body. The primary stop of the olive accent ramp. |
| `--olive-deep` | `#484B36` | Dark stop of the olive ramp: primary CTA ground, pressed states. Cream text on it ≈8.5:1. |
| `--surface-bright` | `#FFFDF7` | Warm-band ground: one deliberate tonal step lighter than `--bg-light`, never pure white. Hairline seam against cream. |
| `--ink-label` | `#61644C` | Quiet meta tier on cream: mono eyebrows, tags, captions. ≈5.8:1 on `--bg-light`; the floor, nothing lighter. |
| `--cream-body` | `rgba(255, 248, 236, 0.88)` | Body text on dark grounds (`--olive`, `--bg-dark`). ≈5.4:1 on olive; the floor, nothing dimmer. |
| `--text-1` | `#1C1A17` | Body text where olive feels too soft. |
| `--text-2` | `#6B6257` | Secondary text, captions. |
| `--text-3` | `#9C958F` | Muted labels, eyebrow text fallback. |
| `--border` | `#E5DFD5` | Hairlines, dividers. |

The olive accent is a three-stop ramp: `--sage` (light stop, for dark grounds where olive would be invisible) / `--olive` (primary) / `--olive-deep` (dark: CTA fills, pressed states).

**Hero gradient (vertical):** `#F4E8CE 0%` → `#FFF8EC 60%` → `#FFFEFA 100%`. Use on landing heroes only.

### 3.3 Studio set (Timbre / Atlas, dark-only product)

| Token | Hex / rgba | Use |
|---|---|---|
| `--ink` | `#14130F` | Background. Studio-booth-at-night. |
| `--ink-raised` | `#1B1915` | Cards, raised surfaces, modals. |
| `--parchment` | `#F0E8D5` | Primary foreground. |
| `--parchment-2` | `rgba(240, 232, 213, 0.62)` | Secondary text. |
| `--parchment-3` | `rgba(240, 232, 213, 0.38)` | Tertiary, role labels, footer credits. |
| `--rule` | `rgba(240, 232, 213, 0.10)` | Light dividers. |
| `--rule-strong` | `rgba(240, 232, 213, 0.18)` | Strong dividers, chip borders. |
| `--sage-dim` | `rgba(193, 193, 126, 0.55)` | User-message left border, dimmed sage. |

**Stage background (Timbre):** `--ink` base + two radial gradients + sage hint at 0.045 opacity at top + a noise texture pseudo-layer at 0.04 opacity with `mix-blend-mode: overlay`. Don't try to recreate this from scratch — copy from `timbre/app/globals.css` `.tmb-stage`.

### 3.4 Color rules

- Never use pure black (`#000`). The brand's black is `--ink` (#14130F) or `--text-1` (#1C1A17).
- Never use pure white as a marketing ground. Pure white is for cards only. Marketing ground is `--bg-light` (#FFF8EC).
- Sage and gold are accents, not body color. Headlines are olive or parchment, never sage.
- Daylight and studio do not mix on the same surface. A page is one or the other.

### 3.5 Voice-identity colors

Per-voice identity colors, distinct from the brand palette. They mark a voice (roster tiles, carousel accents, play rings), never a surface, and are tuned to sit on `--bg-light`.

| Voice | Hex |
|---|---|
| Atlas | `#7A9B82` |
| Hex | `#E0834A` |
| Morgan | `#F3D171` (coincides with `--gold`) |
| Nova | `#B5C19E` |
| Riven | `#B5634D` |

---

## 4. Typography

The Lyric type system is **GT Super Display + GT America + GT America Mono**, licensed from Grilli Type. Files live at `lyric-marketing/public/fonts/grilli-type/` and `timbre/public/fonts/grilli-type/`.

### 4.1 Families

| Family | Weights | Role | CSS var |
|---|---|---|---|
| GT Super Display | 400, 500, 700 + italics | Display, editorial headlines, italic accents | `--font-display` |
| GT America Standard | 400, 500, 700 + italics | Body, UI, paragraph, eyebrow labels (weight 700) | `--font-body` |
| GT America Mono | 400 | Role chips, footer credits, all-caps tracked mono labels | `--font-mono` |
| Pinyon Script | 400 | Signature accent (rare, ceremonial) | `--font-signature` |
| Instrument Serif | 400 italic | Marketing pull quotes (next/font/google) | `--font-accent` (wraps the next/font var `--font-instrument-serif`) |

Composer presently loads Geist Sans + Cormorant Garamond + Instrument Serif via `next/font/google`. **This is legacy and should migrate to the GT family** as Composer's marketing surfaces are reworked. New Composer marketing work should use the GT family from day one.

### 4.2 Scale

Type sizes are **fluid where they appear in heroes**, fixed elsewhere.

| Role | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| Hero H1 (marketing) | `clamp(28px, 5vw, 44px)` | 500 | 1.18 | default |
| Section H2 | 32px | 500 | 1.25 | default |
| Section H3 | 22px | 500 | 1.3 | default |
| Body | 16px | 400 | 1.55 | default |
| Small body / caption | 14px | 400 | 1.5 | default |
| Eyebrow label (GT America, `--font-body`) | 11px | 700 | 1 | uppercase, no tracking (`letter-spacing: 0`) |
| Mono label (Timbre) | 9.5px | 400 | 1 | uppercase, tracking 0.22em |
| Atlas live message | `clamp(20px, 1.8vw, 24px)` | 400 italic | 1.32 | -0.005em |
| Atlas past message | 15px | 400 italic | 1.45 | default |
| Reasoning word (Timbre) | `clamp(16px, 1.6vw, 20px)` | 400 italic | 1.2 | -0.005em |
| Timbre wordmark | 22px | 400 italic display | 1 | -0.01em |

### 4.3 Italics

Italic display serif carries emotional weight. Use it for:
- Pull quotes on marketing pages.
- The single phrase in a poster or OG image.
- Atlas's voice in Timbre (every Atlas message is italic display).
- User-quoted text in Timbre (rendered as `“…”` in italic display).
- The Timbre wordmark itself.

Do **not** italicize body paragraphs, button labels, nav links, or system messages.

---

## 5. Spacing, radius, and layout

### 5.1 Spacing rhythm

Marketing sections breathe. The rhythm is **80px between an eyebrow and its section content**, **140px top padding on heroes**, **40px gap between conversation turns in Timbre**.

| Context | Spacing |
|---|---|
| Hero padding | `140px 20px 80px` |
| Section vertical padding | 96px desktop, 64px mobile |
| Eyebrow → headline gap | 80px |
| Card grid gap | 24px |
| Timbre conversation turn gap | 40px (`2.5rem`) |
| Timbre column padding | `40px 24px 96px` |
| Nav height | 64px fixed |
| Suggestion chip gap | 8px |

### 5.2 Container widths

| Surface | Max width |
|---|---|
| Marketing prose | 720px |
| Marketing full-bleed sections | 1280px content cap |
| Timbre conversation column | 720px |
| Card grids | 1120px |

### 5.3 Radius

| Token | Value | Use |
|---|---|---|
| Pill | 999px / 100px | Buttons, chips, status dots' container |
| Card | 10px | Dropdowns, cards, modals (matches Timbre `--radius: 0.625rem`) |
| Inline | 6px | Inputs, code blocks |

No square corners. No 4px-radius button-shaped objects. Lyric buttons are pills.

---

## 6. Motion and easing

Motion is **slow, soft, and considered**. Nothing snaps.

### 6.1 Durations

| Use | Duration |
|---|---|
| Hover state on buttons / cards | 0.18s |
| Suggestion chip border / color | 0.2s |
| Reasoning word fade | 0.22s |
| Dropdown open / close | 0.22s opacity, 0.28s transform |
| Recessive turn fade (Timbre) | 0.4s |
| Nav background fade on scroll | 0.36s |
| Atlas message size/color crossfade | 0.36s |
| Page enter (blur + opacity) | 0.6s |

### 6.2 Easings

- Default: `ease` (CSS keyword) for state changes under 0.3s.
- Editorial transforms (dropdowns, page-enter): `cubic-bezier(0.22, 1, 0.36, 1)`.
- Recessive turn scale-out (Timbre): `ease-out`.

### 6.3 Motion patterns to use

- **Lift on hover**: `transform: translateY(-1px)` + soft shadow. Universal button hover.
- **Active depress**: `transform: translateY(1px)` on `:active`.
- **Nav fade**: background `rgba(255, 248, 236, 0)` → `rgba(255, 248, 236, 1)` once `scrollY > 24px`. Always animate alpha, never use the `transparent` keyword (it interpolates through gray).
- **Atlas live → past crossfade**: size shrinks, color softens from parchment to parchment-2, italic display weight stays put.
- **Breathing dot**: 2.4s ease-in-out infinite, opacity 0.6 ↔ 1 at 50%. Used on the Timbre `ATLAS · LIVE` chip.

### 6.4 Motion to avoid

- Bounce / spring overshoot.
- Anything faster than 0.15s (reads as jitter).
- Scroll-jacked animations that fight the user.
- Confetti, sparkles, anything celebratory.

---

## 7. Components (shared)

### 7.1 Sage dot eyebrow

The brand's most recognizable pattern. Above every section headline on marketing pages, and above Atlas role labels in Timbre.

```html
<div class="lv-philosophy-eyebrow">
  <span class="lv-eyebrow-dot" aria-hidden="true"></span>
  <span>SECTION LABEL</span>
</div>
```

- Dot: 8px × 8px, `border-radius: 50%`, `background: var(--sage)`.
- Label: GT America (`--font-body`), 11px, weight 700, uppercase, `letter-spacing: 0`, color `var(--olive)` on cream, `var(--bg-light)` on dark. (Not mono: GT America Mono ships only at weight 400.)
- On dark surfaces, swap the dot to `var(--gold)` for contrast.
- Gap dot ↔ label: 10px. Margin to next element: 80px.

### 7.2 Buttons

Lyric buttons are **pill-shaped, padding 13px 28px, font 14px / weight 500, transition 0.18s ease, lift -1px on hover with a soft shadow**.

Three variants:

| Variant | Surface | Background | Foreground | Hover |
|---|---|---|---|---|
| Primary dark | Light section | `#2B2A25` | `#F5F3EF` | `#1A1A18`, lift, shadow `0 6px 20px -8px rgba(0,0,0,0.35)` |
| Primary light | Dark section | `var(--bg-light)` (#FFF8EC) | `var(--olive)` (#5A5E43) | bg `#f0e9d8`, `transform: scale(1.02)`, no shadow (transform removed under `prefers-reduced-motion`) |
| Secondary ghost | Dark section | `rgba(245,243,239,0.10)` | `#F5F3EF` | bg `rgba(245,243,239,0.10)`, border `rgba(245,243,239,0.32)` |

The "Listen now" audio button on the home page is a special case: gold gradient sweep on play state. Do not reuse outside that context.

### 7.3 Navigation (marketing)

Fixed top, 64px tall, full width. Site-wide behavior:

- `scrollY === 0`: background `rgba(255, 248, 236, 0)`, border `transparent`. Hero image bleeds underneath.
- `scrollY > 24`: background `rgba(255, 248, 236, 1)`, border-bottom `1px solid rgba(90, 94, 67, 0.1)`.
- Transition: `background-color 0.36s ease, border-color 0.28s ease`.
- Links: 13px, weight 400. Active indicator: 4px sage dot centered below the link, `translateX(-50%)`.
- Page-load animation: opacity 0 → 1, blur 4px → 0 over 0.6s ease-out.
- Dropdown menus: radius 10px, padding 6px, shadow `0 12px 32px rgba(28, 26, 23, 0.08)`. Open: opacity 0.22s, transform `translateY(-4px) → 0` over 0.28s `cubic-bezier(0.22, 1, 0.36, 1)`.

### 7.4 Cards (pricing, feature)

- Background: `#FFFFFF`. Border: 1px `--border`. Radius: 10px.
- Base transition: `transform 0.22s ease, box-shadow 0.22s ease`.
- Hover (non-highlight): `translateY(-2px)`, shadow `0 14px 28px -16px rgba(0,0,0,0.22)`.
- Highlight (Studio tier pattern): permanent `translateY(-6px)`; hover deepens to `translateY(-8px)` with shadow `0 30px 50px -16px rgba(0,0,0,0.32)`.

### 7.5 Pull quote

- Font: Instrument Serif italic, 28–36px, line-height 1.3.
- Color: `--olive` on cream, `--parchment` on ink.
- No quotation marks rendered in CSS — they're part of the typeset content if used at all.
- Attribution: GT America Mono, 11px uppercase tracked 0.08em, color `--text-3`, 24px below quote.

---

## 8. Surface-specific patterns

### 8.1 Lyric Marketing (daylight)

- Ground: `--bg-light` (#FFF8EC). Warm band: `--surface-bright` (#FFFDF7).
- Type: olive headlines, `--text-1` body.
- Heroes: full vertical gradient, 100svh min-height, centered content, nav bleeds over the top.
- Recurring sections: Philosophy (long-form prose with sage-dot eyebrow), Editions (FLORET photography grid), Voices (audio sample players with the "Listen now" gold-sweep button), Pricing (three-card grid, Studio tier elevated).
- Imagery: FLORET photography is the house style — overcast, editorial, never stocky.

### 8.2 Composer (product, currently transitional)

- Composer is a paid SaaS for voice performance direction. Today it ships with Geist + Cormorant Garamond. **New marketing surfaces (landing, sign-up, upgrade) should use the GT family and daylight token set**; the in-app product UI can keep its current type stack until a dedicated migration.
- Tagline (locked): *The AI voice platform built for intentional sound.*
- CTA target from marketing: `https://composer.lyricvoices.com/sign-up`.
- Trial system messaging: never use "free trial" — use "7-day trial." Never use exclamation points in trial expiry copy.

### 8.3 Timbre / Atlas (studio)

Dark-only product. Inverts the daylight register on purpose: this is the studio booth at night.

- Shell class hierarchy: `.tmb-stage` → `.tmb-bar` (top nav) + `.tmb-column` (conversation) + `.tmb-foot` (film credits footer).
- Wordmark: italic display serif "Timbre" + mono tagline below, all uppercase tracked 0.22em.
- Status chip in top bar: pill, sage breathing dot, label like `LIVE SESSION`.
- Footer reads as **film credits**: mono 9.5px uppercase, 0.22em tracking, parchment-3 color, vertical 1×10px dividers between credits.

**Atlas conversation pattern:**

| State | Treatment |
|---|---|
| Live (current) turn | Italic display, `clamp(20px, 1.8vw, 24px)`, parchment, role label `ATLAS · LIVE` |
| Past turn | Italic display, 15px, parchment-2, opacity 0.3, `scale(0.85)`, role label `ATLAS` |
| Preamble (welcome) | 16px italic display, parchment-2, then a gear shift into one question |
| User turn | Italic display, 15px, parchment-2, left border 1px `--sage-dim`, padding `4px 0 4px 18px`, rendered as `“…”` |
| Reasoning word | Cycles "listening" → "considering" → "composing", 0.22s opacity fade |

**Input (PromptInput):** transparent background, no border-radius, bottom border `--rule-strong` that becomes `--sage` on focus. Caret color: sage. Placeholder: italic, parchment-3. Gated (disabled) state: opacity 0.3, pointer-events none.

**Suggestion chips:** pill 8px 14px, border 1px `--rule-strong`, background `rgba(240,232,213,0.02)`. Hover: border sage, text parchment, bg `rgba(193,193,126,0.06)`. On send, a Framer Motion AnimatePresence + LayoutGroup FLIP morphs the chip into the user message.

**Handoff CTA** (link out of a conversation, e.g. to Composer): underline-only button, bottom border sage, arrow gap animates from 12px to 16px on hover, color shifts to sage.

### 8.4 The shared register

Across all three surfaces, the constants are: sage + gold signature, italic display for emotion, mono uppercase tracked labels, pill buttons, soft motion, no exclamations, no em dashes.

---

## 9. Asset production

For ads, OG images, podcast covers, social posts, posters. These follow the same tokens; only the canvas and crop change.

### 9.1 Sizes

| Surface | Dimensions | Notes |
|---|---|---|
| OG image (universal) | 1200 × 630 | All Lyric pages. Italic display headline + sage dot + small mono attribution. |
| Podcast cover | 3000 × 3000 | Square. Centered italic display title, sage dot above, mono episode line below. |
| Square social | 1080 × 1080 | One phrase, italic display, 96px padding. |
| Story / vertical ad | 1080 × 1920 | Italic phrase upper-third, mono credits bottom. |
| Horizontal ad (web) | 1600 × 900 | Editorial composition, headline left, photography right, no CTA. |

### 9.2 Composition rules

- One phrase per asset. If you need a second sentence, use a smaller mono caption — never a second display line.
- The phrase goes upper-left or centered, never bottom-right.
- A sage dot above the phrase replaces any "by Lyric" lockup in 80% of cases. The lockup appears at most once per asset, in a corner, small.
- Audio assets (podcast covers, voice promos) get the gold accent on the sage dot. Everything else stays sage.
- Photography: FLORET catalog only, or a solid `--bg-light` / `--ink` ground. Never stock photography.

### 9.3 Asset typography

| Element | Font | Size on 1200×630 OG | Size on 3000×3000 cover |
|---|---|---|---|
| Headline phrase | GT Super Display Italic | 72px | 200px |
| Mono caption | GT America Mono | 14px tracked 0.18em | 36px tracked 0.18em |
| Sage dot | — | 14px | 36px |

### 9.4 Asset copy patterns

- **Editorial fragment** (preferred): *"Voices, not voiceovers."* / *"An archive, kept honest."* / *"The studio is open."*
- **Product line** (sparingly): *The AI voice platform built for intentional sound.* — Composer tagline, reserved for owned campaigns.
- **Episode card**: italic title line + mono `EP 03 · LYRIC NOTES`.

---

## 10. Anti-patterns

These are mistakes that have come up, or that the brand register rules out. Treat as hard nos.

- Em dashes in any copy. Use commas, periods, or rewrite.
- Exclamation points in any copy.
- Italicizing a verb mid-sentence for emphasis.
- Pure white as a marketing ground.
- Pure black as a text or background color.
- Sage used as body text color.
- Gold used as a button color.
- Confetti, sparkles, bouncy springs, or any celebratory motion.
- "Free trial" wording — use "7-day trial."
- Stock photography or generic gradient backgrounds in assets.
- A CTA button in OG images and podcast covers (these are editorial, not ads).
- Square-cornered buttons. Lyric buttons are pills.
- Animating to/from the `transparent` CSS keyword. Use `rgba(…, 0)` so the alpha interpolates cleanly.
- Letting the nav background be opaque on top of a hero. Nav is always transparent at `scrollY === 0`.
- Mixing daylight and studio tokens on the same surface.

---

## 11. Quick-reference token tables

### 11.1 Daylight (use on marketing, Composer marketing)

```css
--bg-light: #FFF8EC;
--surface-bright: #FFFDF7;
--bg-card: #FFFFFF;
--olive: #5A5E43;
--olive-deep: #484B36;
--ink-label: #61644C;
--cream-body: rgba(255, 248, 236, 0.88);
--text-1: #1C1A17;
--text-2: #6B6257;
--text-3: #9C958F;
--border: #E5DFD5;
--sage: #C1C17E;
--gold: #F3D171;
```

### 11.2 Studio (use on Timbre)

```css
--ink: #14130F;
--ink-raised: #1B1915;
--parchment: #F0E8D5;
--parchment-2: rgba(240, 232, 213, 0.62);
--parchment-3: rgba(240, 232, 213, 0.38);
--rule: rgba(240, 232, 213, 0.10);
--rule-strong: rgba(240, 232, 213, 0.18);
--sage: #C1C17E;
--sage-dim: rgba(193, 193, 126, 0.55);
--gold: #F3D171;
--radius: 0.625rem;
```

### 11.3 Motion

```css
--ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
--dur-hover: 0.18s;
--dur-dropdown-opacity: 0.22s;
--dur-dropdown-transform: 0.28s;
--dur-nav-fade: 0.36s;
--dur-recessive: 0.4s;
--dur-page-enter: 0.6s;
```

---

## 12. Maintaining this doc

- When a new token, component, or pattern lands in code, update the matching section here in the same PR. The doc lags code = the doc is wrong.
- When a surface migrates (e.g. Composer onto the GT family), update §4.1 and §8.2 the day the migration ships.
- This doc is descriptive of what's shipped, not aspirational. If a section describes something not in code, mark it `(planned)` so future readers know.
- Memory file references for the AI assistant: `lyric_design_and_voice.md`, `lyric_nav_hero_bleed.md`, `lyric_composer_tagline.md`, `timbre_ai_sdk_elements.md`, `timbre_atlas_agent_naming.md`. Keep memory and this doc in sync — if they disagree, update memory to point here.
