/* About — the classic editorial layout (floret hero, origin image row,
   magazine spread, olive pull-quote band, founder masthead, product row,
   locations, olive closing), carrying the current governance narrative.

   The structure is the pre-pivot About page's layout system, resurrected
   from its CSS (lv-about-section / origin / spread / reference / masthead /
   locations / closing) and refitted with the present copy: the three acts
   (dead air, the pattern, Lyric), the founder spotlight, the company facts,
   and the Callio close. Section headlines are promoted first sentences of
   the existing copy, not new writing.

   Images are the original about assets: the hero floret, the origin
   triptych (about_1/2/3), the city shots (about_5 SF, about_6 LA, brand_2
   standing in for Atlanta until a real shot exists), and the dotted
   locations map (about_4.svg). Animation is ScrollReveal only. */

import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "About",
  description:
    "We spent years building voice and conversational AI and watched the same pattern repeat: the systems worked, and still the brand came through differently on every agent and every call. So we built Lyric, a governance layer that holds every agent to one brand voice.",
}

/* Placeholder destinations — real URLs to be supplied. */
const CALLIO_CTA_HREF = "/callio"
const CAREERS_HREF = "/careers"

const CITIES = [
  { name: "San Francisco", src: "/images/about_5.jpg" },
  { name: "Los Angeles", src: "/images/about_6.webp" },
  { name: "Atlanta", src: "/images/brand_2.jpg" },
] as const

export default function AboutPage() {
  return (
    <main className="lv-about">
      {/* ── Hero — floret behind a cream scrim; the hook is the statement. ── */}
      <section className="lv-hero lv-about-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="lv-hero-floret"
          src="/images/floret-about-hero.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className="lv-hero-statement">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow lv-about-hero-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>01 / Dead air</span>
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
      </section>

      {/* ── Origin — the image row, then the rest of Act 01. ── */}
      <section className="lv-about-section lv-about-origin">
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
                  capable until it mispronounces the company&rsquo;s own name.
                  An agent that is warm in one place and cold in another, so
                  customers feel like they are talking to different companies.
                  The dead air, the robotic delivery, the term said wrong for
                  the hundredth time. None of it was a synthesis problem. The
                  synthesis got good.{" "}
                  <span className="lv-about-prose-emph">
                    What never got solved was the governance of how a brand
                    sounds and speaks when a machine is doing the talking.
                  </span>
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Act 02 — magazine spread: headline left, body right. ── */}
      <section className="lv-about-section lv-about-pattern">
        <div className="lv-about-inner">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>02 / The pattern</span>
            </div>
          </ScrollReveal>

          <div className="lv-about-spread">
            <ScrollReveal>
              <h2 className="lv-about-spread-headline">
                We come from <em>this work</em>.
              </h2>
            </ScrollReveal>
            <div className="lv-about-spread-body">
              <ScrollReveal delay={120}>
                <p>
                  We have spent years designing and building AI agents across a
                  brand&rsquo;s communication stack, voice most of all. That is
                  where we watched the pattern repeat: the systems worked, and
                  still the brand came through differently on every channel, in
                  every agent, on every call.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={180}>
                <p>
                  The pattern became undeniable across this work, and that is
                  where Lyric began.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={240}>
                <p>
                  Our background is in voice. Production, performance, and the
                  work of making a voice feel like it belongs to someone. That
                  taught us what the current wave of AI voice keeps missing:
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── The creed — olive band, display pull-quote. ── */}
      <section className="lv-about-reference">
        <div className="lv-about-inner">
          <ScrollReveal>
            <p className="lv-about-pullquote">
              A voice is not just audio. It is a brand keeping a{" "}
              <em>promise</em> about how it will behave.
            </p>
          </ScrollReveal>
          <div className="lv-about-reference-body">
            <ScrollReveal delay={140}>
              <p>
                When every agent keeps that promise differently, the brand
                erodes, one call at a time.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p>
                Generating speech has become cheap and good. Anyone can ship a
                fluent voice in an afternoon. The hard part, the part that did
                not get easier, is making every agent across every channel
                sound like one company, say the right words, and handle the
                sensitive moments the same way every time.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Founder masthead — hairline-framed editorial card. ── */}
      <section className="lv-about-section lv-about-masthead">
        <div className="lv-about-inner">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Founder</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="lv-about-founder">
              <h2 className="lv-about-founder-name">Michael Lang</h2>
              <p className="lv-about-founder-role">
                Founder, Principal Intelligence Designer
              </p>
              <p className="lv-about-founder-bio">
                At Amazon&rsquo;s Alexa Enterprise group, led strategy, design,
                and implementation of the brand AI governance and comms stack
                behind enterprise voice agents, working on the ground with
                partners including Virgin, JBL, and Verizon. Fifteen years in
                voice, spanning production, voice artist direction, and
                conversational agent design. Lyric is the product version of
                the problem I spent those years solving by hand.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Act 03 — what we built, with the product row. ── */}
      <section className="lv-about-section lv-about-lyric">
        <div className="lv-about-inner">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>03 / Lyric</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="lv-about-section-headline">
              So we <em>built</em> Lyric.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <p className="lv-about-section-supporting">
              It sits above the language model and the speech engine and does
              not replace either. It codifies a brand into a portable
              specification and holds every agent to it, whatever engine is
              underneath. The result is the thing we spent years watching teams
              fail to achieve by hand.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <ul className="lv-about-products">
              <li className="lv-about-product">
                <span className="lv-about-product-name">Callio</span>
                <span className="lv-about-product-desc">
                  The governance layer. Your brand, codified into a portable
                  spec and held across every agent.
                </span>
                <Link href={CALLIO_CTA_HREF} className="lv-link-cta lv-about-product-cta">
                  See how Callio works <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Locations — sage band: facts left, cities right. ── */}
      <section className="lv-about-section lv-about-locations-section">
        <div className="lv-about-inner">
          <div className="lv-about-locations-layout">
            <div>
              <ScrollReveal>
                <div className="lv-philosophy-eyebrow">
                  <span className="lv-eyebrow-dot" aria-hidden="true" />
                  <span>The company</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="lv-about-section-headline lv-about-locations-headline">
                  Team across <em>three cities</em>.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <dl className="lv-about-facts-rows">
                  <div className="lv-about-fact">
                    <dt className="lv-about-fact-label">Founded</dt>
                    <dd className="lv-about-fact-value">2026</dd>
                  </div>
                  <div className="lv-about-fact">
                    <dt className="lv-about-fact-label">Funding</dt>
                    <dd className="lv-about-fact-value">Self-funded</dd>
                  </div>
                </dl>
              </ScrollReveal>
            </div>

            <div className="lv-about-locations is-three">
              {CITIES.map((c, i) => (
                <ScrollReveal key={c.name} delay={i * 90}>
                  <div className="lv-about-location">
                    <div className="lv-about-location-image">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.src} alt={c.name} loading="lazy" />
                    </div>
                    <h3 className="lv-about-location-city">{c.name}</h3>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing — olive, centered; the resolve, the CTA, the quiet
            careers line. ── */}
      <section className="lv-about-closing">
        <ScrollReveal>
          <p className="lv-about-closing-line">
            all your agents,
            <br />
            one brand voice.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <Link href={CALLIO_CTA_HREF} className="lv-cta lv-about-close-cta">
            See how Callio works
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={240}>
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
