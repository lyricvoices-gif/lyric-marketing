# Lyric homepage — local editorial redesign

## Direction

The approved cool-paper, ink, burgundy, and Timeless editorial system now supports a shorter enterprise buying journey: hear the difference, inspect Callio, verify behavior in a recorded call, and choose a starting point. Product evidence carries more of the explanation.

The homepage is a review surface, not a site-wide rollout. Existing product, pricing, editorial, legal, and case-study pages retain their layouts.

## GitHub handoff — November 6, 2026

The redesign is tracked on `codex/landing-page-redesign` in [lyricvoices-gif/lyric-marketing](https://github.com/lyricvoices-gif/lyric-marketing/tree/codex/landing-page-redesign). The branch preserves the reviewed local `pricing-rebuild` baseline, with the homepage redesign in its own commit. It has not been merged into the current `main`; integration with that branch is a separate step.

The commit includes the homepage, editorial components and styles, audio transcript data, supplied logo, intake recordings and poster, scroll behavior, and this setup guide. Timeless binaries and their accompanying license remain installed locally and Git-ignored; use the installer below with the supplied archive on another checkout. Local review screenshots and environment files are excluded.

## Enterprise iteration — October 7, 2026

- Replaced the opening channel comparison with two real before/after audio examples from the existing Callio page. A compact introduction sits to the left of one rounded comparison panel. The example tabs are centered directly above the full panel, with a 24px gap and an underline limited to the tab group, making it clear that they change both recordings. The panel splits into equal ungoverned/governed halves, with centered Play controls before playback, matching the supplied layout reference. On phones the halves stack beneath the tabs.
- Replaced the static specification and four long capability disclosures with a three-stage Callio tour: set the standard, shape behavior, review and implement. The latest review uses the existing intake recording inline in every tab.
- Initially added disclosure, verification, and resolution chapter controls to the longer Financial Services recording. The October 8 simplification below removes these shortcuts from the homepage; the synchronized transcript and full transcript remain available.
- Removed the supplementary intake disclosure, deployment row, and channel comparison from section 02 in the latest review. Section 03 follows the main workflow row.
- Removed the separate problem manifesto and long industry section. Industry availability is summarized beside the launch choices; the Financial Services foundation remains prominent in the demo.
- Made enterprise contact a consistent header, hero, and final CTA, with direct specification and pre-built-agent paths at the end.
- Applied the supplied `Lyric_Logo_Imagotype-2-Black.svg` in the homepage header and footer. Removed the 19 vector paths spelling “Composed, not cloned.” from the working copy, retained the original icon and five wordmark paths, and cropped the SVG viewBox to the artwork. The source file in Downloads is unchanged. Removed the adjacent header descriptor and footer tagline.
- Preserved the existing color and Timeless type system. The logo now uses the supplied vector lettering rather than typeset Timeless lettering.

## Recorded comparison transcripts

- Clicking Play reveals Caller and Agent turns below that player, in 17px body text. The agent response appears word by word using timestamps transcribed locally from the four original MP3 files. The media clock drives the words, so pause, seek, replay, and buffering stay aligned.
- The supplied clips contain agent speech only. The existing caller questions are clearly marked as contextual prompts, including a note below the panel. No caller audio was fabricated.
- Removed the old oversized static excerpts and annotation lists. Full transcripts remain available in an accessible disclosure without playing the recordings.
- Each transcript scrolls internally as the response grows. Manual reading interrupts following; starting a new recording pauses the previous one. Selecting another example stops playback and resets the two players.
- The transcription utility was temporary and local. No application dependency, lockfile, or original audio changed.

### Transcript accordion motion — October 8, 2026

“Read transcripts” now animates its measured height and opacity over 640ms when opening and 480ms when closing, using the shared editorial easing curve. The plus icon rotates smoothly, and repeated clicks reverse from the current frame. The panel returns to its natural height after the transition, so longer transcripts and mobile layouts are not clipped. Native details/summary behavior remains available without JavaScript; reduced-motion preferences skip the animation. Closed content is inert and hidden from assistive technology. Verified desktop and 390px mobile, both examples, keyboard opening/closing, rapid reversal, full-height settlement, and scenario reset. TypeScript and whitespace checks pass.

## Editorial spacing and player motion refinements

- Hero and numbered section eyebrows share an explicit size token: 11px on desktop, 10px on phones, with identical weight, tracking, and line height. The section 01 description rule now excludes its eyebrow. All numbered eyebrows use a shared 12px number-to-label gap at every viewport width.
- Increased the transition from the hero anchor row to section 01 using responsive 112–216px top padding (approximately 202px at a 1440px viewport).
- Idle Play buttons have a fine orbiting accent ring, completing one lap in 3.8 seconds. It fades and stops when playback begins.
- Controls glide upward over 640ms. The timeline follows after 220ms, and the transcript fades upward after 300ms. Each newly spoken word receives a short opacity entrance while retaining audio-clock timing.
- Hidden playback controls and transcripts are inert before activation. Reduced-motion preferences remove the ring animation, control motion, and text fades.
- Verified matching computed eyebrow sizes at 1440px and 390px, the increased section gap, intermediate and completed transition states, and playback. No horizontal overflow at either width.

## Hero refinements

- The main CTA now reads “Explore Callio” and retains its smooth anchor to the product section.
- Eyebrow and headline share the same left edge at desktop and mobile widths. Removed the secondary “Voice & text / One standard” hero label.
- Removed the floating “Hear the difference.” / “See how it’s built.” links and their arrow. The three numbered buyer-path anchors remain.
- Reduced the supplied logo from 126×50px to 100×40px in header and footer, retaining a 44px click target.
- Homepage anchors use the global Lenis controller to ease in and out over approximately 1.1–1.6 seconds, allow manual wheel/touch/keyboard interruption, and account for the sticky header. Reduced-motion users get an immediate transition. Section targets receive focus after arrival; native hrefs remain available without JavaScript.
- Confirmed progressive scrolling and accurate landing in the browser; desktop and mobile eyebrow/headline x-coordinates match, with no horizontal overflow.

## Callio workflow review — October 7, 2026

- Main section eyebrows now match the hero anchors: “Hear the difference,” “Build your standard,” and “See it in action.” The global 12px number-to-label gap and shared eyebrow typography remain. Workflow tabs and “In Callio” no longer repeat the page's step numbers.
- The intro is left-aligned directly beneath the section headline, with a 24px gap. Exact copy: “From guided intake to an implementation-ready specification with Callio, our intake agent. Explore the actual workflow.” An editorial “Explore Callio” link to `/callio` sits directly below the intro, followed by 64px before the tabs on desktop and 48px on phones.
- Desktop workflow copy ends at the same vertical position as the framed video; the caption sits below that baseline. The row begins 48px below the tabs, up from 36px. Phones use a normal stacked sequence with 32px below the tabs and 24px between copy and media.
- Adapted the existing Callio browser-window treatment to the editorial palette: a slim 42px toolbar (36px on phones), three muted window dots, decorative Callio address, subtle shadow, and rounded outer corners. There is no outer border or white outline. The original 16:9 video stays fully visible inside the frame and retains native playback controls, with an inset accent focus indicator for keyboard users.
- All three tabs temporarily use the same existing 0:00–0:09.7 Callio intake recording, as explicitly requested. The inspected footage shows industry foundation, company-name entry, and channel selection only. It does not show voice shaping or final review. The visible caption identifies the shared business/channel setup preview; stage-specific footage is deferred until the original longer source is available.
- The inline player uses native play/pause, seeking, fullscreen, and inline mobile playback. It begins on user action. Changing tabs or using the Next links pauses the current video and mounts a fresh player at time zero. The original MP4 and WebM files are unchanged; the poster is an extracted frame from that recording.
- Removed all supplementary content below the workflow row in section 02. The video source is retained within the tabs, and the numbered section 03 remains intact.
- The shared editorial text-link style now draws one continuous rule under the label, gap, and arrow. Its hover color follows the link color; the original focus outline and minimum 44px hit target remain. Filled buttons are unchanged.
- Verified desktop at 1440px and mobile at 390px: headline/intro alignment, matching eyebrow styles, no duplicate workflow numerals, no horizontal overflow, all three videos, native seeking, keyboard tab navigation, playback reset on tab change, and the removed supplementary blocks. TypeScript and whitespace checks pass.

## Conversation simplification — October 8, 2026

- Matched the live homepage's reading sequence: one left-aligned introduction, a wide centered conversation player below, and the existing source-linked CFPB quote afterward. The section keeps the approved editorial colors, Timeless typography, numbered eyebrow, and entrance animation.
- Consolidated the headline and sidebar into “The foundation is already built,” a two-sentence introduction, and one “Explore pre-built agents” link. Removed the secondary heading, inspection header, and three chapter shortcuts from this homepage instance.
- The player is at most 900px wide, with a 420px transcript viewport on desktop and 360px on phones. Agent and customer turns use readable sans-serif text, distinct role labels, and staggered left/right alignment. Previous turns fade while the current turn stays prominent.
- Playback remains user-initiated. The original recording, synchronized governance cues, play/pause, mute, seek, replay, and full transcript remain. A compact caption identifies the recorded scenario. The quote, historical attribution, and source link are unchanged.
- Verified 1440px desktop and 390px mobile layouts, audible media playback and pause, current-turn synchronization, mute, keyboard seeking to the end and beginning, and all 11 full-transcript turns. No horizontal overflow on mobile. TypeScript and whitespace checks pass.

## Scroll and entrance motion

- Enabled the existing Lenis dependency on the homepage through one global React controller, shared by wheel/trackpad scrolling and anchor navigation. Wheel movement eases out over 1.1 seconds; touch retains native momentum. Route changes recreate the controller, and nested product dialogs/transcripts retain their own scrolling.
- Added upward entrances to the approved hero and every homepage section. The October 8 motion fix increases the rise to 44px over 1000ms with a gentler easing curve; the 90ms stagger between hero groups and between section headings and demonstrations remains.
- The original one-time trigger started 40px before the viewport, so entrances could finish before the user noticed them and never replayed after anchor navigation. Groups now wait until they are 80px inside the viewport. A separate observer resets them only after they move completely below the screen, so scrolling back above a section prepares it for another downward pass without flickering while visible.
- Web Animations uses opacity and transforms without moving section anchors or layout. Pending styles are applied only after JavaScript confirms animation support; server-rendered content stays visible otherwise. Cleanup removes pending styles.
- Reduced-motion preferences disable entrances and smooth movement, including live preference changes. Focusing a control immediately reveals its group and focused groups are never hidden. Manual input interrupts anchor navigation.
- Verified in the browser at 1440px desktop and 390px mobile: pending sections wait offscreen, intermediate frames show rising transforms and increasing opacity, and all 16 content groups finish visible. A second downward pass replays the entrances. The Callio anchor still lands at 97px beneath the header and focuses its section. TypeScript and whitespace checks pass.

## Audit and content sources

Reviewed the live homepage at https://www.lyricvoices.ai/ and the existing Next.js 15 / React 19 implementation before editing. The working tree was clean. The live homepage includes a CFPB quote and a 9.7-second intake recording absent from the local homepage; both are retained here. The local implementation also contains two launch paths, which are retained.

The old visual system combines warm cream/olive/gold gradients, several unrelated font families, pill CTAs, an animated channel-card stack, large screenshot chrome, equal-weight feature entries, and an industry carousel. The manifesto delays the strongest product evidence. The first editorial pass moved the channel comparison forward. The October 7 iteration replaces that lead with recorded audio evidence and removes the separate manifesto without changing product positioning.

Source of the preserved quote: CFPB, June 6, 2023, “CFPB Issue Spotlight Analyzes ‘Artificial Intelligence’ Chatbots in Banking.” The quote links to the original release and identifies Rohit Chopra as director at the time, not as the current director:
https://www.consumerfinance.gov/archive/newsroom/cfpb-issue-spotlight-analyzes-artificial-intelligence-chatbots-in-banking/

## Design tokens

`app/editorial.css` centralizes the homepage system under `.lyric-editorial`:

- Typography: display/H1, H2, H3, body-large, body, small, label, metadata; separate Timeless serif and grotesk family tokens.
- Spacing: micro 6px, component 16px, content 32px, responsive section 64–112px, major section 80–136px; responsive 22–72px gutters and a 1440px reading grid (1540px on very wide screens).
- Colors: paper #F4F5F2, ink #202922, secondary #4C5750, muted #626B64, rule #CDD2CA, accent #962D3E, hover #732031, dark chapter #222E27, light-on-dark #F4F5F2, muted-on-dark #BDC8BE. Semantic success and warning tokens are separate from branding.
- Geometry: 2px button corners; recordings and product captures have only the controls they need. Other information sits directly on the page.
- Motion: 180ms evidence transitions; 1000ms, 44px upward section reveals; 90ms content stagger. One Lenis controller handles smooth page and anchor scrolling. Reduced motion removes animated movement; no automatic carousel.

## Timeless package and license

Inspected `~/Downloads/Timeless-Type-Family-1.094.zip` (the brief's `/mnt/data` path does not exist on this Mac), its README, LICENSE.pdf, and font metadata. Also reviewed https://www.timeless.co/type.

Package inventory:

- Sans/Grotesk: Light, Regular, Medium, Semibold, Bold, Black, with corresponding italics in both Sans and Grotesk cuts.
- Serif/Text: Thin, Light, Book, Regular, Medium, Semibold, Bold in serif and text cuts; serif italics from Light through Bold.
- Static OTF, TTF, and WOFF2 files.
- Sans variable font: wght 300–800, ital 0–100, STYL 0–100.
- Serif variable font: wght 200–700, STYL 0–100.
- Serif Italic variable font: wght 300–700.
- All three variable fonts supplied as TTF, WOFF, and WOFF2.

Actually used, unchanged from the archive:

| Face                          | Weight | Role                                             |
| ----------------------------- | ------ | ------------------------------------------------ |
| Timeless Sans Grotesk Regular | 400    | Body, navigation, controls, metadata             |
| Timeless Sans Grotesk Medium  | 500    | Labels, limited emphasis                         |
| Timeless Serif Regular        | 400    | Hero, section headings, quote                    |
| Timeless Serif Regular Italic | 400    | Selected brand statements and editorial emphasis |

Four static WOFF2 files avoid shipping unused variable axes/styles. File hashes match the originals. No other family is used for homepage brand typography; generic fallbacks apply only while fonts load. Other routes retain their existing typography, including legacy trial-font notices.

The supplied **Timeless Free Font License 1.2, September 18, 2026** permits personal/commercial work, web embedding, and AI-assisted creation of a work. It is not an open-source font license: it restricts reselling, standalone redistribution/public repositories, renaming, modifications outside the specified exceptions, and model training. Attribution is not required. The full license and README accompany the local fonts. Font binaries and those supplied documents are Git-ignored so they cannot accidentally enter a public repository. Consult the supplied license for its complete terms.

## Functionality preserved and changed

Preserved: product, pricing, editorial, legal, contact, and social destinations; both launch paths; Financial Services audio and exact synchronized script; play/pause, mute, seek, replay, silent transcript fallback for the long call, and full transcripts; founder credits; source-linked CFPB quote; actual intake recording; global audio provider and playback bar. Product captures and the prior channel component remain in the repository but are no longer mounted in this homepage section.

The page now starts all recordings on explicit action. Playing a new recording pauses another homepage recording. Switching workflow tabs pauses and resets the video. Cached audio metadata is read on hydration so scrubbers remain usable on reload. The long player also responds to external pause events so its control stays accurate when another demo begins.

Content reductions are intentional: repeated capability prose and industry explanations yielded to recorded examples, the Callio workflow, a focused conversation player, and a compact availability statement. No live inference, backend evaluation, certification, or integration claims have been added. Recorded demonstrations are labeled for what they are.

## Main files

- `app/page.tsx`: shorter buyer narrative, metadata, source-linked quote, industry availability and launch paths.
- `app/editorial.css`: all scoped design tokens, typography, layout, controls, responsive rules, reduced motion.
- `components/home/editorial/EditorialShell.tsx`: homepage navigation, mobile menu, footer and skip link.
- `components/home/editorial/AudioCompare.tsx`: reference-based split comparison, timed Caller/Agent display, accessible playback, scrubbing, full transcripts, and exclusive media playback.
- `components/home/editorial/audio-comparison-data.ts`: complete agent transcripts with word timing from the four existing recordings and contextual caller prompts.
- `components/home/editorial/CallioTour.tsx`: three workflow steps with inline intake video, native controls, and pause/reset on navigation.
- `components/home/editorial/useEditorialAnchors.ts`: interruptible Lenis anchor navigation, sticky-header offset, history and focus handling, and reduced-motion support.
- `components/home/editorial/useSectionReveals.ts`: progressive viewport-triggered upward entrances, with reduced-motion and focus safeguards.
- `components/home/editorial/DemoTabs.tsx`: shared controlled tabs with arrow/Home/End keyboard behavior.
- `public/images/lyric-logo-imagotype-2-black.svg`: supplied logo, with requested tagline removal.
- `components/home/editorial/ChannelProof.tsx`: prior channel comparison, retained but not mounted on the homepage.
- `components/home/editorial/IntakeRecording.tsx`: prior recording disclosure, retained but not mounted on the homepage.
- `components/home/governed-demo.ts`: shared transcript data, separated from the client component so server-rendered full transcript works correctly.
- `components/home/AgentsScenario.tsx`: preserved player with optional recorded chapter jumps, homepage autoplay option, and playback/accessibility corrections.
- `components/SiteChrome.tsx`: selects the new shell only on `/`.
- `components/SmoothScroll.tsx`: global ReactLenis controller, native touch scrolling, nested scrolling and reactive reduced-motion support.
- `components/SmoothAnchor.tsx`: existing product-page anchors share the global controller.
- `scripts/install-timeless.py`: exact-file local font setup without arbitrary ZIP extraction.
- `.gitignore`: excludes font redistribution.
- `public/videos/callio-intake.{webm,mp4}`: retained production recording, approximately 386KB combined.

## Validation

- Production build: all 35 static pages generated; TypeScript check passed.
- Homepage review at 1440px desktop, 768px tablet, 390px phone, and 320px narrow phone. The latest split-comparison iteration was verified at 1440px and 390px, including 17px transcript text, progressive words, playback exclusivity, pause, seeking, and scenario reset. No horizontal overflow at these widths.
- Reviewed hero, audio comparison, product tour, conversation, regulatory quote, launch and footer.
- Confirmed before/after recording playback for both scenarios, mutually exclusive audio, keyboard seeking and scenario changes, tour step controls and keyboard navigation, native enlarged-screen dialog and Escape, channel switching, mobile menu and Escape, video playback and pause-on-close, and synchronized call chapter jumps and pause. Prior seek-to-end and replay behavior remains intact.
- Observed live section transforms and opacity progressing as content enters the viewport. Anchors land 12px beneath the 85px desktop header and transfer focus to their destination.
- Native headings, navigation/main/footer landmarks, skip link, labeled controls, visible focus, full transcripts, and responsive control layouts.
- Checked text contrast: ink 13.69:1, secondary 6.89:1, muted 5.04:1, accent 7.00:1, semantic success 6.99:1 on paper; muted-on-dark 8.18:1.
- Reduced-motion behavior implemented in scoped CSS, section reveals, and the global scroll controller. No OS preference was changed to test it.
- Font binaries are byte-for-byte unchanged; four intended faces are configured; primary regular faces preload.
- Build still needs network access for legacy Google Fonts in the shared layout. Timeless itself is local. No dependencies or lockfile changed.

## Local review and setup

The local font files are already installed. To restore them on another checkout:

```sh
python3 scripts/install-timeless.py "$HOME/Downloads/Timeless-Type-Family-1.094.zip"
```

For iterative development:

```sh
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open http://127.0.0.1:3000. Stop a running preview first if the port is occupied.

For an optimized local preview:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

Do not run build and dev simultaneously against the same `.next` output directory.

## Human review

Review the revised buyer sequence, the prominence of the recorded examples, and the actual product tour. The supplied logo and tagline removal are implemented. The homepage intentionally introduces a new visual system while linked pages still use the prior design. Broader rollout is a separate decision; this handoff publishes a review branch without merging it into `main` or opening a PR.
