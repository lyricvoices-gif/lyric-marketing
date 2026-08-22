import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import PricingTiers from "@/components/pricing/PricingTiers"
import PricingFaq from "@/components/agents/AgentsFaq"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Two one-time paths to an owned, portable governance standard for AI agents across voice and text.",
}

const FAQ = [
  {
    q: "Is there anything recurring?",
    a: "No. Both paths are a one-time purchase. There is no subscription, annual platform fee, or agent-count billing. Optional professional services are scoped separately only when you choose them.",
  },
  {
    q: "What do we receive?",
    a: "You receive the approved GovernSpec and an implementation adapter. The GovernSpec defines the standard for behavior, terminology, disclosures, workflows, escalation, and evaluation. The adapter maps that standard into the prompts, orchestration, skills, APIs, channels, and evaluation tooling in your environment.",
  },
  {
    q: "What makes the deliverable architecture-agnostic?",
    a: "The governed standard is separate from the runtime that executes it. It can be implemented across models, speech providers, orchestration layers, channels, and infrastructure without re-authoring the standard. Architecture-agnostic does not mean implementation-free: your team still integrates the adapter into its environment.",
  },
  {
    q: "Does the same standard apply to voice and text?",
    a: "Yes. Brand behavior, terminology, policies, disclosures, workflows, escalation, and evaluation remain shared. The adapter then expresses that standard appropriately for voice, chat, SMS, email, and in-app experiences.",
  },
  {
    q: "Does Lyric sit in the runtime path?",
    a: "No. Your models, speech providers, orchestration, channels, and infrastructure remain yours. You own the GovernSpec and adapter and deploy them in your own architecture.",
  },
  {
    q: "What does it cost to use Callio?",
    a: "You can complete the guided intake and review what it captures at no charge. The $25,000 one-time price applies when you commission the GovernSpec and implementation adapter.",
  },
  {
    q: "Can our team implement this without Lyric?",
    a: "Yes. The adapter is delivered with the implementation mapping your team needs. If you want hands-on help with implementation, integration, or evaluation, Lyric professional services are available as an optional engagement.",
  },
]

export default function PricingPage() {
  return (
    <main className="lv-pricing">
      <section className="lv-pricing-intro">
        <div className="lv-pricing-inner">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Pricing</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={90}>
            <h1 className="lv-pricing-headline">
              Choose the path. <em>Own the standard.</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="lv-pricing-supporting">
              Start with an industry foundation or author a GovernSpec through
              Callio. Either way, you receive a portable standard for how AI
              agents behave across voice and text, with no ongoing Lyric fee.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="lv-pricing-hero-proof">
              One-time purchase <span aria-hidden="true">·</span> Permanent
              ownership <span aria-hidden="true">·</span> Your architecture
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="lv-pricing-tiers-section">
        <div className="lv-pricing-inner">
          <PricingTiers />
        </div>
      </section>

      <section className="lv-pricing-faq">
        <ScrollReveal distance={28}>
          <div className="lv-pricing-inner-narrow">
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Buying questions</span>
            </div>
            <h2 className="lv-pricing-faq-title">What enterprise teams ask before they begin.</h2>
            <div className="lv-pricing-faq-list">
              <PricingFaq items={FAQ} />
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="lv-pricing-close">
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow lv-pricing-close-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>Choose how you begin</span>
          </div>
          <h2>
            <span>One governed standard.</span>
            <span>Two ways to get there.</span>
          </h2>
          <div className="lv-pricing-close-actions">
            <a href="mailto:info@lyricvoices.ai?subject=Financial%20Services%20foundation&body=We%20would%20like%20to%20start%20with%20the%20Financial%20Services%20foundation.">
              Start with Financial Services
            </a>
            <Link href="/callio">Build through Callio</Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
