/* Who it's for — verticals carousel (section 5). The only section about
   specific industries: multiple agents in different contexts that must sound
   like one brand, plus the industry's own terminology and disclosures.

   The cards live in a horizontal carousel (VerticalsCarousel); each card
   carries one accent color from the brand palette as its pop. Off-white
   ground; the header uses the shared ScrollReveal. */

import ScrollReveal from "@/components/ScrollReveal"
import VerticalsCarousel from "@/components/verticals/VerticalsCarousel"

export default function VerticalsSection({ exclude }: { exclude?: string[] }) {
  return (
    <section className="lv-vert-section">
      <div className="lv-vert-inner">
        <div className="lv-vert-header">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Who it&apos;s for</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-vert-headline">One brand, every context.</h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="lv-vert-supporting">
              Your agents span many contexts and channels, each with a different
              job. Callio holds them to one brand, in the terminology and
              disclosures your industry requires.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={140}>
          <VerticalsCarousel exclude={exclude} />
        </ScrollReveal>
      </div>
    </section>
  )
}
