/* Pricing — two one-time purchase paths, followed by one shared-inclusions
   inventory. Consulting remains an optional per-engagement note, never a
   third bundle. No subscription, recurring charge, annual fee, activation
   fee, platform fee, or agent-count billing. The evaluation and monitoring
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
import PricingFaq from "@/components/agents/AgentsFaq"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Two one-time purchase paths: the prebuilt Financial Services agent, or a custom governed agent authored for your business and your vertical. Consulting available per engagement.",
}

const FAQ = [
  {
    q: "Is there anything recurring?",
    a: "No. Both paths are a single one-time purchase. There is no subscription, no annual fee, and nothing billed by agent count. The governance you buy is yours, and there is no charge to keep using it. The only thing that can be ongoing is consulting, and only if you choose it.",
  },
  {
    q: "What do we actually receive?",
    a: "A complete governance specification for your agent, delivered after purchase. It defines how the agent behaves, what it is permitted to say, and how it handles the situations it will encounter, along with the evaluation layer for observing adherence over time. You deploy it on your own model and speech provider. Callio does not sit in the call path.",
  },
  {
    q: "What does it cost to generate a spec?",
    a: "Nothing. You can complete the intake and see the governance specification it produces at no charge. The $25,000 applies when you commission the build.",
  },
  {
    q: "Which path is right for us?",
    a: "If you are a financial institution and want a governed agent in service quickly, the prebuilt agent is complete and ready to deploy. If your business or vertical calls for its own agent, the custom path authors one for you to the same standard, from discovery through to a governed specification you own.",
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
              There are two ways to bring a governed agent into service, and
              both are a single one-time purchase. The governance you buy
              is yours permanently, and Callio does not charge for ongoing
              use.
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
        <ScrollReveal distance={28}>
          <div className="lv-pricing-inner-narrow">
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Questions</span>
            </div>
            <div className="lv-pricing-faq-list">
              <PricingFaq items={FAQ} />
            </div>
          </div>
        </ScrollReveal>
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
