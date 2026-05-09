# Landing Page v1 — Archive (May 2026)

**Date archived:** 2026-05-09
**Last commit before archive:** `725294a` — *Wrap pricing headline so 'how you work.' sits on its own line*

## What this is

This directory contains the source for the previous `lyricvoices.ai` landing page, captured immediately before the May 2026 home page rebuild was committed to `main`. The new editorial direction (Imprint, SCOR, Timbre, the Voices section, Work With Us, Notes) replaces the Composer-and-Edition-01-centric framing this page carried.

## Why it's here

Content from this page may be referenced for future product page migrations — particularly the Composer product page rebuild — since the previous landing page contained substantial Composer and Edition 01 detail that doesn't yet have a permanent home elsewhere. The page is also useful as a brand-evolution reference: how the marketing voice and visual direction looked before the rebuild.

This is reference material only. It is not deployed and is not built by Vercel. The archive is excluded from the production build — see `next.config.ts` (`outputFileTracingExcludes`) and `.vercelignore`.

## What's included

```
archive/landing-page-v1-2026/
├── README.md                            ← this file
├── app/
│   ├── page.tsx                         ← home page source (pre-rebuild)
│   └── globals.css                      ← global stylesheet (pre-rebuild)
└── components/
    ├── VoiceCardTicker.tsx              ← mini composer ticker (used on old home)
    ├── VideosInAction.tsx               ← FLORET carousel (used on old home)
    ├── ScrollReveal.tsx                 ← scroll-fade animation wrapper
    └── SmoothAnchor.tsx                 ← editorial-pace anchor scroll
```

`ScrollReveal.tsx` and `SmoothAnchor.tsx` are still in active use on the new site; their archive copies are the *pre-rebuild* versions captured at HEAD. If a future migration needs to compare behavior, diff against the live versions in `/components/`.

## What's not included

- **Static HTML snapshot.** Skipped — Next.js dev/build doesn't trivially produce a single-file HTML rendering, and screenshots + source serve the same documentation purpose. To render, check out commit `725294a` in a clean clone and run `npm run dev`.
- **Screenshots.** Could not be captured automatically during the archive run — Chrome MCP and headless capture tooling were unavailable in the deploy session. If you want them, capture from the deployed `lyricvoices.ai` URL **before** the new home page rolls out, or roll back via git and capture locally. Save into `screenshots/desktop.png` and `screenshots/mobile.png`.
- **Other pages** (`/about`, `/composer`, `/pricing`, etc.). Those weren't touched in the home page rebuild, so they're still live in their original form via the main repo — no archive copy needed.

## How to render this archive locally

The archive isn't wired into the build (intentionally). To inspect the page in a browser, the simplest path is:

```bash
git checkout 725294a -- app/page.tsx app/globals.css \
  components/VoiceCardTicker.tsx components/VideosInAction.tsx
npm run dev
# visit http://localhost:3002
# when finished:
git restore --source=main --staged --worktree app/page.tsx app/globals.css \
  components/VoiceCardTicker.tsx components/VideosInAction.tsx
```

Or in a worktree to avoid touching `main`:

```bash
git worktree add ../lyric-marketing-archive 725294a
cd ../lyric-marketing-archive
npm install && npm run dev
```
