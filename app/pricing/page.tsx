/* Pricing — the hybrid model: a one-time Output purchase and a recurring
   Governance subscription, plus an Enterprise talk-to-us path. The one-time
   Output is the on-ramp; the Governance subscription is the business, so the
   page steers toward subscribing (Governance is the hero tier) while keeping
   Output a real, standalone paid option (there is no free output).

   Cream ground, restrained editorial register, of-a-piece with the rest of the
   site. All prices live in components/pricing/pricing-data.ts (placeholders).
   The previous generation-count pricing page (PlanGrid / FaqAccordion) is
   retired here; those components remain in the repo, just unused by this route. */

import type { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import PricingTiers from "@/components/pricing/PricingTiers"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Buy a governed voice output once, or subscribe to keep every agent on brand over time. Enterprise engagements available.",
}

const FAQ = [
  {
    q: "What is the difference between Output and Governance?",
    a: "Output is a one-time deliverable: the guided intake and a governed voice spec for one agent. Governance is a subscription that includes that output and then keeps every agent on brand over time, with evals, drift monitoring, and re-tuning as models and engines change.",
  },
  {
    q: "How does agent-based pricing work?",
    a: "Governance is priced by the number of agents you govern. Pick the tier that covers your fleet, from a single agent up, and move up as you add more.",
  },
  {
    q: "Is there a free output?",
    a: "No. The free trial leads into the paid output flow, so you can try Lyric before you commit, but the governed output itself is a paid deliverable.",
  },
]

export default function PricingPage() {
  return (
    <main className="lv-pricing">
      {/* Framing intro */}
      <section className="lv-pricing-intro">
        <div className="lv-pricing-inner">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Pricing</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="lv-pricing-headline">
              Buy it once, or <em>keep it on brand</em>.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <p className="lv-pricing-supporting">
              Run the intake and get a governed voice spec for one agent, as a
              one-time output. Or subscribe, and Lyric keeps every agent on brand
              as your models and engines change.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tiers */}
      <section className="lv-pricing-tiers-section">
        <div className="lv-pricing-inner">
          <ScrollReveal delay={120}>
            <PricingTiers />
          </ScrollReveal>
        </div>
      </section>

      {/* Light FAQ */}
      <section className="lv-pricing-faq">
        <div className="lv-pricing-inner-narrow">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Questions</span>
            </div>
          </ScrollReveal>
          <dl className="lv-pricing-faq-list">
            {FAQ.map((item, i) => (
              <ScrollReveal key={item.q} delay={100 + i * 80}>
                <div className="lv-pricing-faq-item">
                  <dt className="lv-pricing-faq-q">{item.q}</dt>
                  <dd className="lv-pricing-faq-a">{item.a}</dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </section>
    </main>
  )
}
