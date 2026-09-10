/* Pricing — full-width stacked sections, top to bottom: the live phone demo
   (the actual governed agent on the hosted worker, unscripted), the prebuilt
   agent at one stated price, the custom governed agent (free intake, one-time
   spec), a short consulting band, and the FAQ. No card grid anywhere: there
   is one public price per path, so there is nothing to compare.

   Commercial model, settled 2026-07-31 and unchanged here: both paths are a
   single one-time purchase. No subscription, recurring license, annual fee,
   activation fee, platform fee, or agent-count billing. The eval layer is
   included on both paths, never an upsell. Consulting is optional, per
   engagement, with no printed rate.

   Copy rules for this page: no em dashes, no exclamation points, no hype, no
   reference to Callio's cost structure. Bullets describe what the customer
   receives. Amounts live in components/pricing/pricing-data.ts. */

import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import LiveCallDemo from "@/components/pricing/LiveCallDemo"
import PricingFaq from "@/components/agents/AgentsFaq"
import { PRICING } from "@/components/pricing/pricing-data"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Call the governed Financial Services agent live, then buy it once. One prebuilt agent at one price, or a custom governed agent authored for your vertical. Nothing recurring.",
}

const CONSULTING_INQUIRY =
  "mailto:info@lyricvoices.ai?subject=Callio%20consulting"

const CONTACT_INQUIRY =
  "mailto:hi@lyricvoices.ai?subject=Lyric%20AI%20agent%20governance"

/* Dark ground for the closing bookend, matching the home page final CTA. */
const DARK = "#2b2a25"

/* Split the prebuilt price into currency symbol and figure so the "$" can be
   optically reduced in the lockup, without changing the value in pricing-data. */
const PREBUILT_CUR = PRICING.prebuilt.amount.match(/^\D+/)?.[0] ?? ""
const PREBUILT_NUM = PRICING.prebuilt.amount.slice(PREBUILT_CUR.length)

const PREBUILT_RECEIVES = [
  "The finished financial services governance spec.",
  "The authored FS domain rules: register, disclosure, escalation, closing manner, lexicon and pronunciation.",
  "The produced phone voices.",
  "The eval layer, built in. Your team switches it on and runs it.",
  "Delivery by email or download after purchase.",
] as const

const FAQ = [
  {
    q: "Is anything recurring?",
    a: "No. Both paths are a single one-time purchase. There is no subscription, no annual fee, and no license to renew. What you buy is yours, and there is no charge to keep using it. Consulting is the only ongoing option, and only if you choose it.",
  },
  {
    q: "Is the agent on this page the product?",
    a: "Yes. The call at the top of this page runs the prebuilt financial services agent, built from the same spec you receive. It is live and unscripted, which is the point.",
  },
  {
    q: "What do we receive after purchase?",
    a: "The governance spec, the authored domain rules, the produced phone voices, and the eval layer. Delivery is by email or download after purchase. You deploy it on your own model and speech provider. Callio does not sit in the call path.",
  },
  {
    q: "What does the custom intake cost?",
    a: "Nothing. Complete the intake and see what the spec will cover at no charge. The $25,000 applies when you commission the custom spec.",
  },
  {
    q: "Why is there only one price?",
    a: "Because it is one finished product. The agent is complete when you buy it, so there is nothing to meter and nothing to tier. Larger institutions negotiate scope in contract.",
  },
  {
    q: "Is consulting required?",
    a: "No. Both paths are complete on their own, and the eval layer is included in each. Consulting is optional help with implementation, integration, configuration, or monitoring, added at purchase or at any point after.",
  },
]

/* Pill CTA mirroring the homepage Final CTA buttons. */
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

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`lv-philosophy-eyebrow${dark ? " lv-pr2-eyebrow-dark" : ""}`}>
      <span className="lv-eyebrow-dot" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

export default function PricingPage() {
  return (
    <main className="lv-pricing lv-pr2">
      {/* 1 · Live phone demo. The hosted production agent on an unscripted
          call, distinct from the produced scenario players elsewhere on the
          site. No gate: the call starts from the page. */}
      <section className="lv-pr2-hero">
        <div className="lv-pr2-hero-left lv-floret-ground">
          <div className="lv-pr2-hero-copy">
            <ScrollReveal>
              <Eyebrow>Pricing</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="lv-pricing-headline">
                Talk to the <em>agent</em>.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <p className="lv-pricing-supporting">
                Callio built this agent from its governed financial services
                spec. The call is live and unscripted, and it runs the same
                behaviors your institution would receive.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <p className="lv-pricing-supporting lv-pr2-hero-try">
                Ask it to confirm an account. It will decline until identity is
                verified on every call and in every text interaction because
                the spec requires it.
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="lv-pr2-hero-right">
          <ScrollReveal delay={160} className="lv-pr2-stage-reveal">
            <LiveCallDemo />
          </ScrollReveal>
        </div>
      </section>

      {/* 2 · Prebuilt agent — one authored offer module: the product narrative
          and price on the left, the deliverables ledger on the right, held in a
          single paper-toned editorial frame divided by a fine vertical rule. */}
      <section className="lv-pr2-band lv-pr2-prebuilt">
        <ScrollReveal distance={20}>
          <div className="lv-offer">
            <div className="lv-offer-grid">
              <div className="lv-offer-lead">
                <div className="lv-philosophy-eyebrow">
                  <span className="lv-eyebrow-dot" aria-hidden="true" />
                  <span>Prebuilt agent</span>
                </div>
                <h2 className="lv-offer-head">
                  The financial services agent, <em>finished</em>.
                </h2>
                <p className="lv-offer-price">
                  <span className="lv-offer-figure">
                    <span className="lv-offer-cur">{PREBUILT_CUR}</span>
                    {PREBUILT_NUM}
                  </span>
                  <span className="lv-offer-term">one time</span>
                </p>
                <div className="lv-offer-note">
                  <p>
                    Nothing recurring. No license to renew, no platform fee, no
                    tiers by company size.
                  </p>
                  <p>
                    One price, because it is one finished product. Larger
                    institutions negotiate scope in contract.
                  </p>
                </div>
                <div className="lv-offer-cta">
                  <CTA href="/agents/get-started">Get started with this agent</CTA>
                </div>
              </div>

              <div className="lv-offer-ledger">
                <p className="lv-offer-ledger-kicker">What you receive</p>
                <ol className="lv-offer-ledger-list">
                  {PREBUILT_RECEIVES.map((item) => (
                    <li key={item}>
                      <span className="lv-offer-ledger-desc">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3 · Custom governed agent. A commission, not a wrapper: the same
          mechanism heard above, authored for the buyer's vertical. */}
      <section className="lv-pr2-band lv-pr2-custom">
        <div className="lv-pr2-inner lv-pr2-split">
          <div className="lv-pr2-lead">
            <ScrollReveal>
              <Eyebrow>Custom governed agent</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="lv-pr2-head">
                The same mechanism, pointed at <em>your vertical</em>.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="lv-pr2-body">
                The agent you just heard was built from a financial services
                spec. A custom governed agent is authored the same way for
                your business: your domain rules, your scenarios, your
                vocabulary, your voices.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="lv-pr2-intake-line">The intake is free.</p>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <p className="lv-pr2-amount">
                {PRICING.custom.amount}
                <span className="lv-pr2-amount-period">one time, for the spec</span>
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="lv-pr2-quiet">
                Nothing recurring here either. The eval layer is included,
                same as the prebuilt agent.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={360}>
              <div className="lv-pr2-cta-row">
                <CTA href="/start">Generate your governed spec</CTA>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={180} className="lv-pr2-receives-reveal">
            <div className="lv-pr2-receives">
              <p className="lv-pr2-receives-kicker">How it runs</p>
              <ul className="lv-pr2-receives-list">
                <li>A guided intake captures your industry, context, use case, and channels, at no charge.</li>
                <li>Callio authors the governed spec: rules, scenarios, escalation, lexicon.</li>
                <li>You review every decision before you commission the build.</li>
                <li>The spec arrives with the eval layer built in, ready for your stack.</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4 · Consulting. A short band, not a card and not a third path. */}
      <section className="lv-pr2-consulting">
        <ScrollReveal>
          <div className="lv-pr2-inner lv-pr2-consulting-row">
            <div>
              <Eyebrow dark>Services</Eyebrow>
              <h2 className="lv-pr2-consulting-head">
                Hands-on help, when you
                <br />
                want it.
              </h2>
              <p className="lv-pr2-consulting-copy">
                Optional on either path: implementation, integration,
                configuration, and ongoing monitoring using the eval layer.
                Add it at purchase or at any time after.
              </p>
            </div>
            <CTA href={CONSULTING_INQUIRY} variant="light">
              Schedule a call
            </CTA>
          </div>
        </ScrollReveal>
      </section>

      {/* 5 · FAQ. Every answer matches the one-time model above. */}
      <section className="lv-pricing-faq">
        <ScrollReveal distance={28}>
          <div className="lv-pricing-inner-narrow">
            <Eyebrow>Questions</Eyebrow>
            <div className="lv-pricing-faq-list">
              <PricingFaq items={FAQ} />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Closing bookend above the global footer, matching the home page
          final CTA pattern. */}
      <section className="lv-final" style={{ background: DARK }}>
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow lv-final-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>The brand-governance layer for AI agents</span>
          </div>
          <h2>
            <span className="lv-final-line">All your agents,</span>
            <br />
            <span className="lv-final-line">
              one <em>brand voice</em>.
            </span>
          </h2>
          <div className="lv-cta-row lv-cta-row-center">
            <CTA href={CONTACT_INQUIRY} variant="light">
              Contact us
            </CTA>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
