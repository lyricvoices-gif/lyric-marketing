/* Who it's for — verticals carousel (section 5). The only section about
   specific industries: multiple agents in different contexts that must sound
   like one brand, plus the industry's own terminology and disclosures.

   The cards live in a horizontal carousel (VerticalsCarousel); each card
   carries one accent color from the brand palette as its pop. Off-white
   ground; the header uses the shared ScrollReveal.

   The agents page reuses this section with overridden header copy (the
   prebuilt-agents framing), Financial Services excluded, every card marked
   coming soon, and the pagination dots off (its three cards fit one view). */

import type React from "react"
import ScrollReveal from "@/components/ScrollReveal"
import VerticalsCarousel from "@/components/verticals/VerticalsCarousel"

export default function VerticalsSection({
  exclude,
  eyebrow = "Who it's for",
  headline = "One brand, every context.",
  supporting = "Your agents span many contexts and channels, each with a different job. Callio holds them to one brand, in the terminology and disclosures your industry requires.",
  allComingSoon = false,
  showDots = true,
  fit = false,
}: {
  exclude?: string[]
  eyebrow?: React.ReactNode
  headline?: React.ReactNode
  supporting?: React.ReactNode
  allComingSoon?: boolean
  showDots?: boolean
  fit?: boolean
}) {
  return (
    <section className="lv-vert-section">
      <div className="lv-vert-inner">
        <div className="lv-vert-header">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-vert-headline">{headline}</h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="lv-vert-supporting">{supporting}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={140}>
          <VerticalsCarousel
            exclude={exclude}
            allComingSoon={allComingSoon}
            showDots={showDots}
            fit={fit}
          />
        </ScrollReveal>
      </div>
    </section>
  )
}
