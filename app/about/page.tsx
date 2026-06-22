/* About — a three-movement narrative on a descending ground: cream (the
   problem) into olive (what we believe) into near-black (what we built),
   resolving on "all your agents, one brand voice." The grounds are the
   dividers, reusing the homepage's role-based palette so About reads as part
   of the same system.

   The founders' collective experience is carried in the prose itself, not as a
   logo module: the homepage founders strip already does the visual-logo
   credential job, so About keeps Movement 2 a continuous reading passage. No
   CTA (About stays a credibility surface). Animation is ScrollReveal only. */

import type { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "About",
  description:
    "We spent years building voice and conversational AI and watched the same pattern repeat: the systems worked, and still the brand came through differently on every agent and every call. So we built Lyric, a governance layer that holds every agent to one brand voice.",
}

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
          One continuous reading passage: the credential is carried in the prose
          (the founders strip lives on the homepage, not here). The conviction
          line is pulled out as an Instrument Serif italic creed. */}
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

          <ScrollReveal delay={160}>
            <p className="lv-about-prose-cream lv-about-prose-gap">
              The pattern became undeniable across this work, and that is where
              Lyric began.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="lv-about-prose-cream lv-about-prose-gap">
              Our background is in voice. Production, performance, and the work
              of making a voice feel like it belongs to someone. That taught us
              what the current wave of AI voice keeps missing:
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <p className="lv-about-creed">
              a voice is not just audio. It is a brand keeping a promise about
              how it will behave.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={280}>
            <p className="lv-about-prose-cream">
              When every agent keeps that promise differently, the brand erodes,
              one call at a time.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={320}>
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
              all your agents,<br /> <em>one brand voice</em>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
