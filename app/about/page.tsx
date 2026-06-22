/* About — a three-movement narrative on a descending ground: cream (the
   problem) into olive (what we believe) into near-black (what we built),
   resolving on "all your agents, one brand voice." The grounds are the
   dividers, reusing the homepage's role-based palette so About reads as part
   of the same system.

   The founders' collective experience is woven in as proof-in-context inside
   Movement 2 (the reused LogoCycler strip), framed as where the pattern was
   seen and Lyric began, rather than a headshot/title/LinkedIn team section. The
   Locations block is kept as a quiet factual coda after the resolution. No CTA
   (About stays a credibility surface). Animation is ScrollReveal only. */

import type { Metadata } from "next"
import LogoCycler from "@/components/LogoCycler"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "About",
  description:
    "We spent years building voice and conversational AI and watched the same pattern repeat: the systems worked, and still the brand came through differently on every agent and every call. So we built Lyric, a governance layer that holds every agent to one brand voice.",
}

const LOCATIONS = [
  {
    city: "Los Angeles",
    name: "Wilshire",
    lines: ["915 Wilshire Blvd", "7th & 8th Floor", "Los Angeles, CA 90017"],
  },
  {
    city: "Atlanta",
    name: "Buckhead",
    lines: ["3550 Lenox Rd NE", "21st Floor", "Atlanta, GA 30326"],
  },
]

export default function AboutPage() {
  return (
    <main className="lv-about">
      {/* Movement 1 — the problem. Cream ground, olive text. The opening hook
          is the page's display moment. */}
      <section className="lv-about-m1">
        <div className="lv-about-col">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>01 / Dead air</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <span className="lv-about-deadair" aria-hidden="true" />
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

      {/* Movement 2 — what we believe. Olive ground, cream text, gold accents.
          The collective experience is the proof: the LogoCycler strip framed as
          where the pattern was seen and Lyric began. The conviction line is
          pulled out as an Instrument Serif italic creed. */}
      <section className="lv-about-m2">
        <div className="lv-about-col">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>02 / The pattern</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="lv-about-lead-cream">
              We come from this work. We have spent years designing and building
              AI agents across a brand&rsquo;s communication stack, voice most of
              all. That is where we watched the pattern repeat: the systems
              worked, and still the brand came through differently on every
              channel, in every agent, on every call.
            </p>
          </ScrollReveal>
        </div>

        {/* Proof in context — the collective experience as substantiation, tied
            to the origin of the idea, not a logo flex. */}
        <div className="lv-about-proof">
          <ScrollReveal delay={160}>
            <p className="lv-about-proof-line">
              The pattern became undeniable across this work, and that is where
              Lyric began.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <LogoCycler className="lv-about-cred" />
          </ScrollReveal>
        </div>

        <div className="lv-about-col">
          <ScrollReveal delay={120}>
            <p className="lv-about-prose-cream">
              Our background is in voice. Production, performance, and the work
              of making a voice feel like it belongs to someone. That taught us
              what the current wave of AI voice keeps missing:
            </p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="lv-about-creed">
              a voice is not just audio. It is a brand keeping a promise about
              how it will behave.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="lv-about-prose-cream">
              When every agent keeps that promise differently, the brand erodes,
              one call at a time.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <p className="lv-about-prose-cream lv-about-prose-gap">
              Generating speech has become cheap and good. Anyone can ship a
              fluent voice in an afternoon. The hard part, the part that did not
              get easier, is making every agent across every channel sound like
              one company, say the right words, and handle the sensitive moments
              the same way every time.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Movement 3 — what we built. Near-black ground; resolves on the brand
          line, echoing the homepage close. */}
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
            <p className="lv-about-resolve">
              all your agents, <em>one brand voice</em>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Coda — Locations. Quiet factual grounding after the resolution, kept on
          the near-black so it reads as a downshift, not a second climax. */}
      <section className="lv-about-coda">
        <div className="lv-about-coda-inner">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Locations</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="lv-about-coda-grid">
              {LOCATIONS.map((loc) => (
                <div key={loc.city} className="lv-about-loc">
                  <h2 className="lv-about-loc-city">{loc.city}</h2>
                  <p className="lv-about-loc-name">{loc.name}</p>
                  {loc.lines.map((line) => (
                    <p key={line} className="lv-about-loc-line">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
