/* About — one continuous argument on two surfaces. Acts 01 and 02 sit on
   cream as a single problem statement; the founder follows on cream, so the
   pedigree answers the "we come from this work" claim the moment Act 02
   raises it. Near-black arrives at Act 03 and holds to the end of the page:
   the surface shift IS the turn from problem to answer (the page's one act
   break, a hard cut, same as the home page's bright-to-charcoal seam).
   After the resolve, the company facts read as facts (mono labels, hairline
   rows, no prose), and the page closes on the Callio CTA with a quiet
   careers line beneath it.

   Pull-quotes are structural, not just typographic: a <blockquote> off the
   prose flow with a short gold rule above, a narrower measure, and roughly
   double the vertical room a paragraph gets (.lv-about-pull). Both quotes
   ("a voice is not just audio..." and "all your agents, one brand voice.")
   share the treatment and serve as each act's rest point.

   Animation is ScrollReveal only. Narrative copy is unchanged from the
   three-movement version; the founder and facts sections are new. */

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

export default function AboutPage() {
  return (
    <main className="lv-about">
      {/* ── Act 01 — Dead air. Cream. The opening hook is the page's display
            moment. ── */}
      <section className="lv-about-m1">
        <div className="lv-about-col">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>01 / Dead air</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="lv-about-hook">
              Three seconds of silence on a call, and the caller assumes the
              worst. The system broke. The agent is gone. They say{" "}
              <em>&ldquo;hello?&rdquo;</em> into the quiet.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="lv-about-sublead">
              The engine was working fine. What was missing was anyone paying
              attention to how the brand actually showed up in the voice.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={280}>
            <p className="lv-about-prose">
              We have seen this happen for years. A voice that sounds capable
              until it mispronounces the company&rsquo;s own name. An agent that
              is warm in one place and cold in another, so customers feel like
              they are talking to different companies. The dead air, the robotic
              delivery, the term said wrong for the hundredth time. None of it
              was a synthesis problem. The synthesis got good.{" "}
              <span className="lv-about-prose-emph">
                What never got solved was the governance of how a brand sounds
                and speaks when a machine is doing the talking.
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Act 02 — The pattern. Cream, continuous with Act 01: the two acts
            are one problem statement, so no seam between them. ── */}
      <section className="lv-about-m2">
        <div className="lv-about-col">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>02 / The pattern</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="lv-about-sublead">
              We come from this work. We have spent years designing and building
              AI agents across a brand&rsquo;s communication stack, voice most of
              all. That is where we watched the pattern repeat: the systems
              worked, and still the brand came through differently on every
              channel, in every agent, on every call.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="lv-about-prose lv-about-prose-gap">
              The pattern became undeniable across this work, and that is where
              Lyric began.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="lv-about-prose lv-about-prose-gap">
              Our background is in voice. Production, performance, and the work
              of making a voice feel like it belongs to someone. That taught us
              what the current wave of AI voice keeps missing:
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <blockquote className="lv-about-pull">
              a voice is not just audio. It is a brand keeping a promise about
              how it will behave.
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={280}>
            <p className="lv-about-prose">
              When every agent keeps that promise differently, the brand erodes,
              one call at a time.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={320}>
            <p className="lv-about-prose lv-about-prose-gap">
              Generating speech has become cheap and good. Anyone can ship a
              fluent voice in an afternoon. The hard part, the part that did not
              get easier, is making every agent across every channel sound like
              one company, say the right words, and handle the sensitive moments
              the same way every time.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Founder — cream. Act 02 says "we come from this work"; this
            answers who, immediately, before the Act 03 payoff. A deliberate
            single-person spotlight, single-column editorial, no photo. ── */}
      <section className="lv-about-founder">
        <div className="lv-about-col">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Founder</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="lv-about-founder-name">Michael Lang</h2>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="lv-about-founder-role">
              Founder, Principal Intelligence Designer
            </p>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className="lv-about-founder-bio">
              At Amazon&rsquo;s Alexa Enterprise group, led strategy, design,
              and implementation of the brand AI governance and comms stack
              behind enterprise voice agents, working on the ground with
              partners including Virgin, JBL, and Verizon. Fifteen years in
              voice, spanning production, voice artist direction, and
              conversational agent design. Lyric is the product version of the
              problem I spent those years solving by hand.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Act 03 — Lyric. Near-black from here to the end of the page: the
            surface shift is the act break, problem into answer. ── */}
      <section className="lv-about-m3">
        <div className="lv-about-col">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>03 / Lyric</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="lv-about-built">
              So we built Lyric. It sits above the language model and the speech
              engine and does not replace either. It codifies a brand into a
              portable specification and holds every agent to it, whatever engine
              is underneath. The result is the thing we spent years watching
              teams fail to achieve by hand:
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <blockquote className="lv-about-pull lv-about-pull-resolve">
              all your agents, <em>one brand voice</em>.
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Company facts — near-black. Facts, not story: mono labels, short
            values, hairline rows. The contrast with the prose is the point. ── */}
      <section className="lv-about-facts">
        <div className="lv-about-col">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>The company</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <dl className="lv-about-facts-rows">
              <div className="lv-about-fact">
                <dt className="lv-about-fact-label">Founded</dt>
                <dd className="lv-about-fact-value">2026</dd>
              </div>
              <div className="lv-about-fact">
                <dt className="lv-about-fact-label">Funding</dt>
                <dd className="lv-about-fact-value">Self-funded</dd>
              </div>
              <div className="lv-about-fact">
                <dt className="lv-about-fact-label">Team</dt>
                <dd className="lv-about-fact-value">
                  San Francisco &middot; Los Angeles &middot; Atlanta
                </dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Close — near-black. The Callio CTA is the page's one action; the
            careers line stays deliberately quiet beneath it. ── */}
      <section className="lv-about-close">
        <div className="lv-about-col">
          <ScrollReveal>
            <Link href={CALLIO_CTA_HREF} className="lv-cta lv-about-close-cta">
              See how Callio works
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <p className="lv-about-hiring">
              Currently hiring{" "}
              <Link href={CAREERS_HREF} className="lv-about-hiring-link">
                Machine Learning Engineers and Technical Sales
              </Link>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
