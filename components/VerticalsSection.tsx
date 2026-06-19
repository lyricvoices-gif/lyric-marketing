/* Who it's for — verticals card grid (section 5). The only section about
   specific industries and their specific pain: multiple agents in different
   contexts that must sound like one brand, plus the industry's own
   terminology and disclosure requirements.

   Starts with two cards while we validate the style; the grid and the data
   array are built so more verticals drop in without restructuring. Each card
   carries an illustrative, clearly-labeled mockup specific to its vertical.
   Off-white ground; reveals use the shared ScrollReveal. */

import ScrollReveal from "@/components/ScrollReveal"
import VerticalCard from "@/components/verticals/VerticalCard"
import { ComplianceMockup, RegisterMockup } from "@/components/verticals/mockups"

const VERTICALS = [
  {
    label: "Consistency at Every Touchpoint",
    headline: "Property Management",
    body: "A property manager runs agents for leasing, maintenance, and collections, across phone, portal, SMS, and email. Each needs its own register: warm in leasing, calm in maintenance, firm but fair in collections, while sounding like one brand. Lease and property terms are said correctly, and required disclosures are handled the same way on every channel.",
    Mockup: RegisterMockup,
  },
  {
    label: "Consistency in Every Account Moment",
    headline: "Financial Services",
    body: "Support, fraud and disputes, and account servicing are different jobs with different stakes. Lyric keeps one brand across all of them, stays firm and calm when a customer is under stress, says financial terms correctly, and holds compliance-sensitive disclosures to the spec every time.",
    Mockup: ComplianceMockup,
  },
]

export default function VerticalsSection() {
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
              job. Lyric holds them to one brand, in the terminology and
              disclosures your industry requires.
            </p>
          </ScrollReveal>
        </div>

        <div className="lv-vert-grid">
          {VERTICALS.map((v, i) => {
            const Mockup = v.Mockup
            return (
              <ScrollReveal key={v.label} delay={120 + i * 90}>
                <VerticalCard label={v.label} headline={v.headline} body={v.body}>
                  <Mockup />
                </VerticalCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
