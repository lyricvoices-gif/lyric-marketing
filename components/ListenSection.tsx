/* Listen section — an editorial index of the imprint's lead voices.
   Each row credits the real artist whose performance powers the AI
   voice, laid out as a contributor index from a literary journal.

   The left column carries the section's framing and a single italic
   closing line that frames what the reader has just seen and hands
   them off to the Three Ways to Partner section below. The two
   italic CTAs that used to sit here ("contact Lyric" / "partner with
   Lyric") were retired because they duplicated the conversion
   pathways handled cleanly by the Three Ways to Partner block. Each
   section now does one job: Voices shows the roster, Three Ways
   handles the offer. */

import ScrollReveal from "@/components/ScrollReveal"
import ArtistIndex from "@/components/listen/ArtistIndex"
import { artists } from "@/components/listen/data"

export default function ListenSection() {
  return (
    <section className="lv-listen">
      <div className="lv-listen-layout">
        <div className="lv-listen-header">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>The Voices</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <h2 className="lv-listen-headline">
              The voice <em>behind</em> the voice.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div className="lv-listen-supporting">
              <p>
                These five lead Edition 01 of the Lyric imprint. Each voice is
                a partnership with a real artist who directs the performance,
                retains their rights, and shapes how their voice carries
                forward in the age of AI.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={320}>
            <div className="lv-listen-redirects">
              <p className="lv-listen-redirect">
                <em>
                  Five voices in Edition 01. Edition 02 of the Lyric imprint
                  is scheduled for Q3 2026.
                </em>
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ArtistIndex artists={artists} />
      </div>
    </section>
  )
}
