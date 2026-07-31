/* Pricing — the settled commercial model: two purchase paths, both one-time
   (Prebuilt Financial Services Agent $40,000; Govern Your Existing Agent
   $25,000), plus consulting as an optional per-engagement add-on on either
   path. No subscription, no recurring license, no annual fee, no activation
   fee, no platform fee, no agent-count billing. The evaluation and monitoring
   layer is included on both paths, never an upsell.

   Copy rules for this page: no em dashes, no exclamation points, no hype, no
   reference to Callio's cost structure. Bullets describe what the customer
   receives. Cream ground, restrained editorial register, of-a-piece with the
   rest of the site. Amounts live in components/pricing/pricing-data.ts. */

import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import PricingTiers from "@/components/pricing/PricingTiers"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Two one-time purchase paths: the prebuilt Financial Services agent, or governance built around your existing agent. Consulting available per engagement.",
}

const FAQ = [
  {
    q: "Is there anything recurring?",
    a: "No. Both paths are a single one-time purchase. There is no subscription, no annual fee, and nothing billed by agent count. The governance you license is yours, and there is no charge to keep using it.",
  },
  {
    q: "Which path is right for us?",
    a: "If you are a financial institution and want a governed agent in service quickly, the prebuilt agent is complete and requires no intake. If you already run an agent you want held to a governed spec, the custom intake builds the governance around it.",
  },
  {
    q: "Is consulting required?",
    a: "No. Both paths are complete on their own, and the evaluation and monitoring layer is included in each. Consulting is there if you want hands-on help with implementation, integration, or the evaluation layer, at purchase or at any point after.",
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
              Buy it once. <em>Own it.</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <p className="lv-pricing-supporting">
              Two ways to bring a governed agent into service, each a single
              one-time purchase. The governance you license is yours, and
              Callio does not charge you to keep using it.
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
            <CTA href="/callio" variant="outline">
              See how it works
            </CTA>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
