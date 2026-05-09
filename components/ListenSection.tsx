/* Listen section — an editorial index of the imprint's lead voices.
   Each row credits the real artist whose performance powers the AI
   voice, laid out as a contributor index from a literary journal.

   The left column carries the section's framing and two italic
   redirects pointing brand-side and artist-side visitors to the
   Imprint product page. The right column holds the artist index
   with progressive disclosure (first three voices visible by
   default, a toggle reveals the rest). */

import Link from "next/link"
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
              <p>
                Edition 02 of the Lyric imprint is scheduled for Q3 2026.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={320}>
            <div className="lv-listen-redirects">
              <p className="lv-listen-redirect">
                <em>
                  For brands ready to license a voice from the imprint,{" "}
                  <Link href="/imprint" className="lv-listen-redirect-link">
                    contact Lyric <span aria-hidden="true">&rarr;</span>
                  </Link>
                </em>
              </p>
              <p className="lv-listen-redirect">
                <em>
                  For voice artists interested in joining the imprint,
                  <br />
                  <Link href="/imprint" className="lv-listen-redirect-link">
                    partner with Lyric <span aria-hidden="true">&rarr;</span>
                  </Link>
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
