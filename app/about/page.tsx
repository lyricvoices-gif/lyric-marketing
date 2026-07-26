/* About — one continuous brand story on the home page's grounds.

   The hero drops the floret photograph for the home hero's gradient ground
   (the shared .lv-floret-ground wrapper paints it once; the hero and the
   origin section sit transparent on top, so the image row and the prose
   blend up from the gradient exactly as the home page's sections do). Below
   the origin triptych, the entire narrative — the problem, where we come
   from, the creed, and what we built — reads as one synthesized story in
   the original About page's two-column prose grid. The locations band uses
   the home page's bright surface (map left, company facts and the two city
   cards with addresses right), and the page ends with the home page's full
   dark treatment: the resolve as the final callout over the Callio CTA and
   the quiet careers line, flowing into the dark footer.

   Copy is the existing narrative, stitched into continuous prose; the only
   new lines are the eyebrows and the address placeholders (marked, pending
   the real addresses). Animation is ScrollReveal only. */

import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import AboutMapUS from "@/components/about/AboutMapUS"

export const metadata: Metadata = {
  title: "About",
  description:
    "We spent years building voice and conversational AI and watched the same pattern repeat: the systems worked, and still the brand came through differently on every agent and every call. So we built Lyric, a governance layer that holds every agent to one brand voice.",
}

const DARK = "#2b2a25"

/* Placeholder destinations — real URLs to be supplied. */
const CALLIO_CTA_HREF = "/callio"
const CAREERS_HREF = "/careers"

const CITIES = [
  {
    name: "San Francisco",
    org: "Lyric HQ",
    src: "/images/about_5.jpg",
    street: "95 3rd St 2nd Floor",
    region: "San Francisco, CA 94103",
  },
  {
    name: "Atlanta",
    org: "Lyric East",
    src: "/images/about_6.webp",
    street: "3565 Piedmont Rd NE",
    region: "Atlanta, GA 30305",
  },
] as const

export default function AboutPage() {
  return (
    <main className="lv-about">
      {/* One gradient ground spans the hero and the origin section, the same
          way the home page paints its hero through the founders strip. */}
      <div className="lv-floret-ground">
        {/* ── Hero — the hook as the statement on the gradient. ── */}
        <section className="lv-hero lv-about-hero lv-on-floret">
          <div className="lv-hero-statement">
            <ScrollReveal>
              <div className="lv-philosophy-eyebrow lv-about-hero-eyebrow">
                <span className="lv-eyebrow-dot" aria-hidden="true" />
                <span>About Lyric</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="lv-about-hook">
                Three seconds of silence on a call, and the caller assumes the
                worst. The system broke. The agent is gone. They say{" "}
                <em>&ldquo;hello?&rdquo;</em> into the quiet.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="lv-about-hero-supporting">
                The engine was working fine. What was missing was anyone paying
                attention to how the brand actually showed up in the voice.
              </p>
            </ScrollReveal>
          </div>
          <div className="lv-scroll-cue" aria-hidden="true">
            <span className="lv-scroll-cue-mouse">
              <span className="lv-scroll-cue-wheel" />
            </span>
          </div>
        </section>

        {/* ── Origin — the triptych, then the whole story in the original
              two-column prose grid. ── */}
        <section className="lv-about-section lv-about-origin lv-on-floret">
          <div className="lv-about-inner">
            <ScrollReveal>
              <div className="lv-about-origin-images">
                {/* eslint-disable @next/next/no-img-element */}
                <div className="lv-about-origin-image">
                  <img src="/images/about_1.jpg" alt="" loading="lazy" />
                </div>
                <div className="lv-about-origin-image">
                  <img src="/images/about_2.webp" alt="" loading="lazy" />
                </div>
                <div className="lv-about-origin-image">
                  <img src="/images/about_3.webp" alt="" loading="lazy" />
                </div>
                {/* eslint-enable @next/next/no-img-element */}
              </div>
            </ScrollReveal>

            <div className="lv-about-origin-prose">
              <div className="lv-about-origin-prose-col">
                <ScrollReveal>
                  <p>
                    We have seen this happen for years. A voice that sounds
                    capable until it mispronounces the company&rsquo;s own
                    name. An agent that is warm in one place and cold in
                    another, so customers feel like they are talking to
                    different companies. The dead air, the robotic delivery,
                    the term said wrong for the hundredth time. None of it was
                    a synthesis problem. The synthesis got good.{" "}
                    <span className="lv-about-prose-emph">
                      What never got solved was the governance of how a brand
                      sounds and speaks when a machine is doing the talking.
                    </span>
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <p>
                    We come from this work. We have spent years designing and
                    building AI agents across a brand&rsquo;s communication
                    stack, voice most of all. That is where we watched the
                    pattern repeat: the systems worked, and still the brand
                    came through differently on every channel, in every agent,
                    on every call. The pattern became undeniable, and that is
                    where Lyric began.
                  </p>
                </ScrollReveal>
              </div>
              <div className="lv-about-origin-prose-col">
                <ScrollReveal delay={160}>
                  <p>
                    Our background is in voice. Production, performance, and
                    the work of making a voice feel like it belongs to someone.
                    That taught us what the current wave of AI voice keeps
                    missing: a voice is not just audio. It is a brand keeping a
                    promise about how it will behave. When every agent keeps
                    that promise differently, the brand erodes, one call at a
                    time.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={220}>
                  <p>
                    Generating speech has become cheap and good. Anyone can
                    ship a fluent voice in an afternoon. The hard part, the
                    part that did not get easier, is making every agent across
                    every channel sound like one company, say the right words,
                    and handle the sensitive moments the same way every time.
                    So we built Lyric. It sits above the language model and the
                    speech engine and does not replace either.{" "}
                    <span className="lv-about-prose-emph">
                      It codifies a brand into a portable specification and
                      holds every agent to it, whatever engine is underneath.
                    </span>{" "}
                    The result is the thing we spent years watching teams fail
                    to achieve by hand.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Locations — the home page's bright surface: map left, company
            facts and the city cards with addresses right. ── */}
      <section className="lv-about-section lv-about-locations-section">
        <div className="lv-about-inner">
          <div className="lv-about-locations-layout">
            <ScrollReveal>
              {/* Dotted US map in the original band's arrangement (map as
                  the left column). Inline SVG so the two office markers
                  carry hover states: gold dot lifts, labeled pill appears. */}
              <AboutMapUS />
            </ScrollReveal>

            <div>
              <ScrollReveal>
                <div className="lv-philosophy-eyebrow">
                  <span className="lv-eyebrow-dot" aria-hidden="true" />
                  <span>The company</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="lv-about-section-headline lv-about-locations-headline">
                  Team across <em>two cities</em>.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <p className="lv-about-section-supporting">
                  Founded in 2026 and self-funded, Lyric is built by a team
                  working from San Francisco and Atlanta.
                </p>
              </ScrollReveal>
              <div className="lv-about-locations">
                {CITIES.map((c, i) => (
                  <ScrollReveal key={c.name} delay={i * 90}>
                    <div className="lv-about-location">
                      <div className="lv-about-location-image">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.src} alt={c.name} loading="lazy" />
                      </div>
                      <h3 className="lv-about-location-city">{c.name}</h3>
                      <p className="lv-about-location-org">{c.org}</p>
                      <p className="lv-about-location-line">
                        {c.street}
                        <br />
                        {c.region}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final callout — the home page's full dark treatment; the resolve
            is the callout, over the Callio CTA and the quiet careers line.
            The dark footer follows and completes the treatment. ── */}
      <section className="lv-final" style={{ background: DARK }}>
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow lv-final-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>What we built</span>
          </div>
          <h2>
            <span className="lv-final-line">All your agents,</span>
            <br />
            <span className="lv-final-line">
              one <em>brand voice</em>.
            </span>
          </h2>
          <div className="lv-cta-row lv-cta-row-center">
            <Link href={CALLIO_CTA_HREF} className="lv-cta lv-about-close-cta">
              See how Callio works
            </Link>
          </div>
          <p className="lv-about-hiring">
            Currently hiring{" "}
            <Link href={CAREERS_HREF} className="lv-about-hiring-link">
              Machine Learning Engineers and Technical Sales
            </Link>
            .
          </p>
        </ScrollReveal>
      </section>
    </main>
  )
}
