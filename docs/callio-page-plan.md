# /callio rebuild plan (approved section structure, Phase 1 figures stand)

Status: PLAN. No implementation in this commit.
Prior pass: rejected 2026-08-12 for the twelve failures in the brief.
Skills read in full before this plan: /mnt/skills/public/frontend-design/SKILL.md
and the dataviz skill (chart-worthiness; the only other design skills available
are artifact-scoped).

## What the skills say about the failures

Presentation.
1. Boxes doing hierarchy: "Structure is information. Structural devices ...
   should encode something true about the content, not decorate it." The skill
   also names the exact look the first pass fell into (warm cream + serif
   display) as one of three AI-default looks that "appear regardless of
   subject." Hierarchy must come from scale, weight, and whitespace.
2. The 2/2/1 orphan: the skill's process is plan, critique, build, critique
   again, with screenshots ("a picture is worth 1000 tokens"). The orphan is
   what ships when the critique pass is skipped.
3. The bar chart: dataviz says pick the form from the data's job, and
   "sometimes the answer is not a chart." Three values are a sentence, and a
   mark whose geometry argues against the copy fails the form choice outright.
4. Thumbnails: "the hero is a thesis. Open with the most characteristic thing
   in the subject's world ... a live demo." The real recording is that thing;
   shrinking it to a side thumbnail throws the thesis away.
5. Placeholder bars for the spec: "Build with the brief's real content and
   subject matter throughout." The subject's own artifact is the material;
   gray bars are the opposite.

Copy.
6. Meta-copy hero: the hero is a thesis, not a table of contents. Words exist
   "to make it easier to understand," not to describe the page.
7. Defensiveness: the writing guidance is plain verbs, no filler, no
   apologizing register. State the claim; do not annotate it.
8. Internal vocabulary: "Name things by what people control and recognize,
   never by how the system is built." Axes, emitted empty, inventory, keyed
   into are system-side words.
9. Spec-dump bodies: "Let each element do exactly one job." One idea per
   sentence; density is not depth.
10. Leading with "8 fields": the skill calls the big-number-with-small-label
    opening "the template answer." Numbers support sentences.
11. Self-praise: "Describe what something does in plain terms rather than
    selling it." Assertion is not earning.
12. "Start where you are": controls "say exactly what happens when used."
    The CTA headline must name the actual choice.

## Design plan

Subject: the Callio intake, a short conversation that hands an institution a
governed specification whose substance was authored in advance. Audience: the
institution evaluating whether to start one. The page's single job: make
starting the free intake feel obviously safe and obviously worth it.

Tokens (all existing site values; nothing new invented):
- cream #FFF8EC (hero + light bands), charcoal #2b2a25 (two dark bands),
  surface-bright #FFFDF7 (capture frames), olive #5A5E43 (reserved), gold
  #F3D171 (hairline emphasis only), ink-label #61644C (quiet meta).
- Type: GT Super Display for display, GT America body, GT America Mono for
  eyebrows and figures. Site scale, set larger than pass one: hero
  clamp(40px, 5vw, 64px); section heads clamp(30px, 3.6vw, 44px).

Rhythm: alternating full-bleed bands, matching the home register.
cream (hero) -> charcoal (already authored, PRIMARY) -> cream (what we ask)
-> bright (what you hold) -> charcoal (forked CTA).
No rounded containers anywhere. Separation by hairline rules and margins.

Wireframe (desktop):

  [1 HERO, cream]
    eyebrow
    claim headline (2 lines max)
    one supporting sentence (shape-claim duration)
    +--------------------------------------------------+
    |   intake recording, near full width, legible     |
    +--------------------------------------------------+

  [2 ALREADY AUTHORED, charcoal, PRIMARY]
    "What exists before you type a word."  (kept line, cream display)
    one framing sentence
    ruled rows, typography only (no cards), figure column right-aligned mono:
      The governance ................................  26 rules
      The industry foundation .......................  24 items
      Written for each channel  SMS EMAIL CHAT ......   3 channels
      Voice and text, stated separately .............  (sentence, no figure)
      [EXEMPLAR SLOT - marked comment, renders nothing]
      The adapters ..................................   4
      The evaluation layer ..........................  included
    Figures are a quiet aligned column, not marks. No chart.

  [3 WHAT WE ASK, cream, short]
    head + four numbered lines (real sequence: the intake is ordered)
    single closing sentence (decisions, clicks, one typed field)
    [EXEMPLAR SLOT - marked comment]
    +--------------------------------------------------+
    |   persona-question capture, near full width      |
    +--------------------------------------------------+

  [4 WHAT YOU HOLD, bright]
    head leads with what the specification GOVERNS (not field count)
    THE SIGNATURE: a real rendered specification excerpt, generated from
    the adapters in the callio repo, set as a typographic document panel
    (selectable text, zero image weight). Its empty slots appear exactly
    as rendered, each with its owner named. Real artifact, not a mockup.
    [EXEMPLAR SLOT - marked comment]
    kept line set as the one olive emphasis moment:
    "An empty slot with a named owner is the difference between a
    governance instrument and a generated document."
    obligations by owner as a small aligned table (counsel / your team /
    shared / the intake).

  [5 FORKED CTA, charcoal]
    headline names the choice (two named paths, one sentence)
    primary: filled light pill "Generate your governed spec" (free)
    secondary: quiet text link "See the prebuilt agent"

Signature element (the one memorable thing): the real rendered specification
with its empty, owner-named slots, printed as a document on the page. The
aesthetic risk: long-form monospace governance text on a marketing surface,
trusted to carry the section without decoration.

Default-check (per the skill): pass one WAS the cream-and-cards default. This
plan spends its one bold move on the real document, keeps bands and rules
quiet, uses no numbered markers except where order is real (the intake
sequence), and reserves olive for a single emphasis moment.

## Visuals

- Hero: RE-RECORD the intake at 1600x1000 so the interface is legible at
  near-full-width display; webm + mp4, autoplay muted loop playsinline,
  poster, reduced-motion still. Weight reported after encode.
- Section 3: re-capture the persona question at 2x for crispness, lazy.
- Section 4: real adapter render (text, no image). No SVG mockups anywhere.
- No GIF. Lazy-load below the fold. Total page weight reported at the end.

## Copy plan (standard applies: short declarative, buyer's words, numbers
support sentences; the two kept lines used verbatim)

- Hero claim direction: the governance is already written; the intake is the
  short part. Something like "The governance is already written." /
  "You arrive to finished work." Exact lines drafted in the copy commit.
- Section 2 rows: one sentence each, buyer-facing ("Rules your agent follows
  on every call", "What it says when a number must be spoken", ...).
- Section 3: the four things in the customer's words; close with the measured
  counts in one sentence.
- Section 4: lead with what the spec governs on a call and in a message; then
  the honest empties with owners.
- CTA head names the choice: begin a spec now, or take the prebuilt agent.

## Figures

components/callio/intake-facts.ts stands as the single source (Phase 1
derivations recorded in the file). Duration stays the shape claim until a
human run is timed. No new numbers.

## Commits

1. this plan
2. constants (verify intake-facts against this plan; no new figures)
3. structure (bands, rules, layout; no copy yet)
4. copy
5. visuals (re-recorded captures, adapter render, weight report)
Suite at each commit: tsc + production build (repo has 0 tests; count
reported each time).
