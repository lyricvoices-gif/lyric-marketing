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
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
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

const DARK = "#2b2a25"

/* Pill CTA mirroring the homepage Final CTA buttons, so the closing bookend on
   this page matches the home page exactly. */
function CTA({
  href,
  children,
  variant = "dark",
}: {
  href: string
  children: ReactNode
  variant?: "dark" | "light" | "outline"
}) {
  const isMail = href.startsWith("mailto:")
  const isExternal = href.startsWith("http")
  const style: CSSProperties = {
    minHeight: "54px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
    borderRadius: "100px",
    fontSize: "15px",
    fontWeight: 500,
    letterSpacing: "0",
    background:
      variant === "light"
        ? "var(--bg-light)"
        : variant === "dark"
          ? "var(--olive)"
          : "transparent",
    color:
      variant === "light"
        ? "var(--olive)"
        : variant === "dark"
          ? "var(--bg-light)"
          : "inherit",
    border: variant === "outline" ? "1px solid currentColor" : "1px solid transparent",
    transition: "background 0.22s ease, color 0.22s ease, transform 0.22s ease",
  }
  const className = `lv-cta lv-cta-${variant}`

  if (isMail || isExternal) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  )
}

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

      {/* Closing CTA bookend — mirrors the homepage Final CTA, sitting just
          above the global footer so the page closes like the home page. */}
      <section className="lv-final" style={{ background: DARK }}>
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow lv-final-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>The brand-governance layer for AI agents</span>
          </div>
          <h2>
            <span className="lv-final-line">The engines</span>
            <br />
            <span className="lv-final-line">are commoditized.</span>
            <br />
            <span className="lv-final-line">The <em>brand</em> is not.</span>
          </h2>
          <div className="lv-cta-row lv-cta-row-center">
            <CTA href="mailto:info@lyricvoices.ai?subject=Lyric%20access" variant="light">
              Request access
            </CTA>
            <CTA href="/opus" variant="outline">
              See how it works
            </CTA>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
