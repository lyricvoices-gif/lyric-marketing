/* About — credibility surface, not conversion surface. No CTAs. The
   page closes editorially with "Composed, not cloned."

   Visual architecture varies section to section so the page reads as a
   designed editorial spread rather than eight repetitions of one
   template:
     1. Hero — page-cover typographic moment
     2. Origin — two-column editorial spread (head left, body right)
     3. Reference — full-bleed dark olive featured pull-quote
     4. The Work — two-column spread, JBL case-study micro-moment, logo strip
     5. The Team — masthead with structured founder card framed by rules
     6. The Products — restrained compact list with hairlines between rows
     7. Locations — sage accent ground for visual variation
     8. Closing — full-bleed dark olive, large italic. Bookends Section 3. */

import type { Metadata } from "next"
import LogoCycler from "@/components/LogoCycler"
import ScrollReveal from "@/components/ScrollReveal"
import SmoothAnchor from "@/components/SmoothAnchor"

export const metadata: Metadata = {
  title: "About",
  description:
    "Lyric is a voice AI company built on a stance: voice deserves craft, artists deserve what music artists fought for, and how brands implement voice AI shapes how the public perceives AI itself.",
}

const LOCATIONS = [
  {
    city: "Los Angeles",
    name: "Wilshire",
    image: "/images/location-la-wilshire.jpg",
    lines: ["915 Wilshire Blvd", "7th & 8th Floor", "Los Angeles, CA 90017"],
  },
  {
    city: "Atlanta",
    name: "Buckhead",
    image: "/images/location-atlanta-three-alliance.jpg",
    lines: ["3550 Lenox Rd NE", "21st Floor", "Atlanta, GA 30326"],
  },
]

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
    </svg>
  )
}

export default function AboutPage() {
  return (
    <main className="lv-about">
      {/* Section 1 — Hero. Same treatment as the home page hero:
          gold-amber gradient ground, centered statement at restrained
          display scale. No CTA — About is a credibility surface, not a
          conversion surface. The .lv-hero shell is reused rather than
          reimplemented so the visual register is identical on both pages. */}
      <section className="lv-hero">
        <img
          className="lv-hero-floret"
          src="/images/floret-about-hero.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className="lv-hero-statement">
          <h1>
            A voice AI company built on a <em>stance</em>.
          </h1>
          <p className="lv-hero-supporting">
            Voice deserves craft. Artists deserve what music artists fought
            for. And how brands implement voice AI shapes how the public
            perceives AI itself.
          </p>
          <SmoothAnchor targetId="origin" offset={64} className="lv-link-cta">
            Read the origin <span aria-hidden="true">&rarr;</span>
          </SmoothAnchor>
        </div>
      </section>

      {/* Section 2 — The Origin.
          Layout adapted from the previous /about page (lyricvoices.ai/about
          before this rebuild): centered intro (eyebrow + headline +
          opening paragraph), three-image row at 3:4, then a two-column
          prose grid for the remaining paragraphs. The visual richness of
          the photographs paired with editorial multi-column prose makes
          this section the page's most substantial beat after the hero. */}
      <section id="origin" className="lv-about-section">
        <div className="lv-about-inner">
          <ScrollReveal>
            <div className="lv-about-origin-intro">
              <div className="lv-philosophy-eyebrow">
                <span className="lv-eyebrow-dot" aria-hidden="true" />
                <span>Origin</span>
              </div>
              <h2 className="lv-about-origin-headline">
                Lyric started{" "}
                <span className="lv-about-origin-headline-pair">
                  with <em>frustration</em>.
                </span>
              </h2>
              <p className="lv-about-origin-supporting">
                AI voices were getting more realistic, but less considered.
                Voices cloned from data without consent. Voices stripped from
                artists who never agreed to the deployment. Voices dropped
                into products without context, responsibility, or care.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="lv-about-origin-images">
              <div className="lv-about-origin-image">
                <img src="/images/about_1.jpg" alt="" loading="lazy" />
              </div>
              <div className="lv-about-origin-image">
                <img src="/images/about_2.webp" alt="" loading="lazy" />
              </div>
              <div className="lv-about-origin-image">
                <img src="/images/about_3.webp" alt="" loading="lazy" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div className="lv-about-origin-prose">
              <div className="lv-about-origin-prose-col">
                <p>
                  The problems were stacking. Voice artists were watching
                  their craft get scraped, cloned, and rebranded by platforms
                  that gave them no credit, no rights, and no revenue. Brands
                  were implementing voice AI in ways that flattened the
                  medium and reinforced the public sense that AI was here to
                  replace human creative work. The companies building voice
                  models treated voice as output. Tuned for novelty.
                  Optimized for speed. Disconnected from intent.
                </p>
                <p>
                  It wasn&apos;t a technology problem. It was an artist
                  problem. An implementation problem. A design problem.
                  Three problems, all reinforcing each other.
                </p>
                <p>Lyric was built to refuse all three.</p>
              </div>
              <div className="lv-about-origin-prose-col">
                <p>
                  Voices on the Lyric imprint are partnerships. Real voice
                  artists shape them, direct the performance, retain their
                  rights, and earn as their voice carries forward. The AI
                  carries their craft, with their consent, in the directions
                  they sanction.
                </p>
                <p>
                  Brands using Lyric voices implement them with care. The
                  standard isn&apos;t speed or scale. It&apos;s how the voice
                  lands with the people who hear it, because how brands
                  implement voice AI shapes how the public understands AI
                  itself.
                </p>
                <p>
                  And every product Lyric makes, from Composer for content
                  to Imprint for licensing, from Score for research to Opus
                  for direction, alongside the daily Briefing that proves
                  the voices in real editorial work, stems from the same
                  belief. Voice deserves craft. Artists deserve what music
                  artists fought for. Implementation matters.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3 — The Reference (Steve Stoute).
          Full-bleed dark olive ground. The page's editorial statement of
          conviction; the visual contrast against the surrounding warm
          off-white sections is the whole point. Bookends with Section 8. */}
      <section className="lv-about-reference">
        <div className="lv-about-inner">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow lv-about-reference-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>The Blueprint</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <h2 className="lv-about-pullquote">
              What Steve Stoute did for <em>music</em>, we&apos;re doing
              for <em>voice</em>.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div className="lv-about-reference-body">
              <p>
                Lyric&apos;s founders are fans of Steve Stoute and United
                Masters. We&apos;ve watched him fight to give music artists
                ownership, attribution, and revenue participation in an
                industry that had stopped offering any of those things.
                We&apos;re doing the same for voice artists in the age of
                conversational AI.
              </p>
              <p>
                Voice artists deserve what music artists fought for. Their
                work powers the AI voices reshaping how brands speak to the
                world. They should be credited. They should be paid. They
                should retain their rights. The Lyric imprint exists to make
                that the standard, not the exception.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4 — The Team.
          Editorial narrative. Decades of industry work, anchored mid-stream
          by the JBL Authentics vignette, closing on the co-founder framing.
          Founder masthead with LinkedIn icon link sits below. Logo strip
          beneath repeats the credentials visually. */}
      <section className="lv-about-section">
        <div className="lv-about-inner lv-about-spread">
          <div className="lv-about-spread-head">
            <ScrollReveal>
              <div className="lv-philosophy-eyebrow">
                <span className="lv-eyebrow-dot" aria-hidden="true" />
                <span>The Team</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <h2 className="lv-about-spread-headline">
                The team behind lyric voices
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={320}>
              <p className="lv-about-team-redirect">
                <em>
                  Founded by Michael &ldquo;Mike&rdquo; Lang.
                  <a
                    href="https://www.linkedin.com/in/mikeybucks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lv-about-team-redirect-link"
                    aria-label="Mike Lang on LinkedIn (opens in new tab)"
                  >
                    <LinkedInIcon />
                    LinkedIn <span aria-hidden="true">&rarr;</span>
                  </a>
                </em>
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={220}>
            <div className="lv-about-spread-body">
              <p>
                Lyric&apos;s founders have spent more than a decade designing
                voice and conversational AI for the world&apos;s most
                considered consumer brands. The work runs through Amazon and
                Google, and partnerships across automotive, travel,
                telecommunications, consumer electronics, and enterprise
                software. Some of it shipped. Much of it informed the
                products that did. All of it shaped how we think about voice
                AI now.
              </p>

              <p>
                Here&apos;s one example. In 2024, Mike led the consumer voice
                experience design for JBL Authentics, the first consumer
                speaker to host Alexa and Google Assistant simultaneously.
                The product and its companion app earned a CES Innovation
                Award. The onboarding flow he designed achieved over ninety
                percent opt-in for voice setup. That result didn&apos;t come
                from model performance. It came from treating voice as a
                craft problem: how the system speaks, when it speaks, what
                it asks for, and how it earns the user&apos;s permission to
                keep speaking.
              </p>

              <p>
                Mike&apos;s co-founders bring complementary backgrounds in
                AI engineering, voice product design, and the creative
                industries. Those are the disciplines required to build
                voice AI the way we believe it should be built. As a craft,
                not a benchmark.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Logo strip — repeats the credentials anchor under the narrative. */}
      <LogoCycler />

      {/* Section 5 — Locations.
          Sage accent ground. Each location leads with a photograph of the
          building, followed by city heading, building name, and address —
          editorial dossier register, inspired by the legacy lyricvoices.ai
          /about layout. */}
      <section className="lv-about-section lv-about-locations-section">
        <div className="lv-about-inner">
          <div className="lv-about-locations-layout">
            <div className="lv-about-locations-map" aria-hidden="true">
              <img src="/images/about_4.svg" alt="" loading="lazy" />
            </div>

            <div className="lv-about-locations-content">
              <ScrollReveal>
                <div className="lv-philosophy-eyebrow">
                  <span className="lv-eyebrow-dot" aria-hidden="true" />
                  <span>Locations</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <h2 className="lv-about-section-headline">
                  From LA to the world
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={220}>
                <p className="lv-about-section-supporting">
                  We are committed to being present wherever conversations
                  matter, shaped by place, culture, and purpose.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={320}>
                <div className="lv-about-locations">
                  {LOCATIONS.map(loc => (
                    <div key={loc.city} className="lv-about-location">
                      <div className="lv-about-location-image">
                        <img
                          src={loc.image}
                          alt={`${loc.name}, ${loc.city}`}
                          loading="lazy"
                        />
                      </div>
                      <h3 className="lv-about-location-city">{loc.city}</h3>
                      <p className="lv-about-location-name">{loc.name}</p>
                      {loc.lines.map(line => (
                        <p key={line} className="lv-about-location-line">
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
