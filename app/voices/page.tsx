/* Voices & Sounds (/voices) — the public home for Lyric's licensed voices (all
   signed to the Imprint) and, soon, its sound packs. Descending/role-based
   grounds, of-a-piece with the homepage and About: cream hero and roster, then a
   near-black sound-packs section. "Composed, not cloned." lives here now, as the
   hero's Instrument Serif italic signature.

   Real assets only: the voice samples are the canonical Edition 01 clips served
   from Lyric's R2 CDN (wired in VoicesShowcase), and the engine avatars reuse
   the in-repo ElevenLabs/Hume marks. Sound packs are a light coming-soon
   treatment until the audio assets exist. */

import type { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import VoicesShowcase from "@/components/voices/VoicesShowcase"

export const metadata: Metadata = {
  title: "Voices & Sounds",
  description:
    "Lyric's licensed voices, each built with a real artist signed to the Imprint and designed to be portable across speech engines, plus sound packs for a brand's sonic identity.",
}

export default function VoicesPage() {
  return (
    <main className="lv-voices">
      {/* Hero — cream */}
      <section className="lv-voices-hero">
        <div className="lv-voices-inner">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Voices &amp; Sounds</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="lv-voices-headline">
              A brand is <em>more than what it says</em>.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <p className="lv-voices-framing">
              It is how it sounds saying it. Lyric&rsquo;s voices and sound packs
              give your agents one voice and one sonic identity, consistent
              across every channel a customer reaches. The voices carry your
              brand&rsquo;s tone; the sound packs carry its cues, the small
              sounds an agent makes while it thinks, confirms, and resolves. Each
              voice is built with a real artist and designed to carry across
              engines. Morgan already runs on both ElevenLabs and Hume.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={260}>
            <p className="lv-voices-signature">Composed, not cloned.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Voices — featured spotlight stages (Morgan, Hex) then the gallery
          (Nova, Atlas, Riven). The showcase renders its own grounds. */}
      <VoicesShowcase />

      {/* Sound packs — near-black, light coming-soon */}
      <section className="lv-voices-sounds">
        <div className="lv-voices-inner">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Sound packs</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="lv-voices-sounds-headline">
              The sounds <em>around the words</em>.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <p className="lv-voices-sounds-framing">
              Every agent makes sounds beyond speech. Thinking, listening,
              confirmation, error, and completion. Sound packs give those cues
              one on-brand identity across your comms stack.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <p className="lv-voices-cues">
              Thinking · Listening · Confirmation · Error · Completion
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="lv-voices-soon">Coming soon</p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
