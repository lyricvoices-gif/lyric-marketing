import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing. Every plan includes all Edition 01 voices.",
}

const plans = [
  {
    id: "creator",
    name: "Creator",
    price: "$29",
    period: "/mo",
    tagline: "For individuals and small teams.",
    dark: false,
    cta: "Get started",
    href: "https://composer.lyricvoices.ai/sign-up",
    features: [
      "All 5 Edition 01 voices",
      "50 generations per day",
      "3 variants per voice",
      "Standard quality rendering",
      "Scripts up to 500 characters",
      "Direction presets",
      "MP3 download",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    price: "$99",
    period: "/mo",
    tagline: "For creators and brands who need more.",
    dark: true,
    badge: "Most popular",
    cta: "Get started",
    href: "https://composer.lyricvoices.ai/sign-up",
    features: [
      "Everything in Creator",
      "Unlimited generations",
      "Premium quality rendering",
      "Scripts up to 2,000 characters",
      "Full direction control",
      "Inline emotion marks",
      "Early access to new Editions",
      "Priority queue",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "For product teams and agencies.",
    dark: false,
    cta: "Contact us",
    href: "mailto:hi@lyricvoices.ai?subject=Enterprise inquiry",
    features: [
      "Everything in Studio",
      "Custom voice creation",
      "API access",
      "SSO & advanced permissions",
      "Dedicated support",
      "SLA guarantee",
      "Volume licensing",
    ],
  },
]

const faqs = [
  {
    q: "What counts as a generation?",
    a: "Each script render to audio counts as one generation. Replaying a previously generated file does not.",
  },
  {
    q: "Can I change plans?",
    a: "Yes, upgrade or downgrade at any time. Upgrades take effect immediately and are prorated.",
  },
  {
    q: "Are all voices available on every plan?",
    a: "All Edition 01 voices are available to Creator, Studio, and Enterprise. New Edition releases may have plan-specific access windows.",
  },
  {
    q: "What's the difference in quality between Creator and Studio?",
    a: "Studio uses a higher-fidelity rendering pipeline with additional generation attempts to ensure the best take.",
  },
  {
    q: "What is a custom voice?",
    a: "Enterprise customers can commission a voice persona built for their brand, performed by a professional actor and owned exclusively by them.",
  },
  {
    q: "Do unused generations roll over?",
    a: "Generations reset daily at midnight UTC and don't roll over. Studio is unlimited, so this only applies to Creator.",
  },
]

export default function PricingPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          HEADER
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#2a2622", padding: "100px 32px 80px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4a4540",
              marginBottom: "20px",
            }}
          >
            Pricing
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 4.5vw, 60px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#faf9f7",
              margin: "0 0 20px",
              lineHeight: 1.05,
            }}
          >
            Simple pricing.
            <br />
            <span style={{ color: "#B8955A" }}>Every plan, every voice.</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#756d65", lineHeight: 1.6, maxWidth: "400px", margin: 0 }}>
            Start with Creator. All five Edition 01 voices included in every plan.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          PLANS
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#faf9f7", padding: "64px 32px 100px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              alignItems: "stretch",
            }}
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  background: plan.dark ? "#2a2622" : "#ffffff",
                  border: plan.dark ? "none" : "1px solid #eae4de",
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {plan.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#2a2622",
                      background: "#B8955A",
                      padding: "4px 10px",
                      borderRadius: "100px",
                    }}
                  >
                    {plan.badge}
                  </span>
                )}

                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: plan.dark ? "#4a4540" : "#b5aca3",
                    margin: "0 0 20px",
                  }}
                >
                  {plan.name}
                </p>

                <div style={{ marginBottom: "8px" }}>
                  <span
                    style={{
                      fontSize: "44px",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      color: plan.dark ? "#faf9f7" : "#2a2622",
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      style={{
                        fontSize: "14px",
                        color: plan.dark ? "#4a4540" : "#b5aca3",
                        marginLeft: "4px",
                      }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    color: plan.dark ? "#756d65" : "#756d65",
                    lineHeight: 1.5,
                    margin: "0 0 28px",
                  }}
                >
                  {plan.tagline}
                </p>

                <a
                  href={plan.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "11px 20px",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: 500,
                    background: plan.dark ? "#faf9f7" : "#2a2622",
                    color: plan.dark ? "#2a2622" : "#faf9f7",
                    marginBottom: "28px",
                  }}
                >
                  {plan.cta}
                </a>

                <div
                  style={{
                    borderTop: plan.dark
                      ? "1px solid rgba(234,228,222,0.08)"
                      : "1px solid #eae4de",
                    paddingTop: "24px",
                    flex: 1,
                  }}
                >
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          padding: "6px 0",
                          fontSize: "13px",
                          color: plan.dark ? "rgba(245,240,232,0.7)" : "#4a4540",
                          lineHeight: 1.4,
                        }}
                      >
                        <span
                          style={{
                            color: "#B8955A",
                            flexShrink: 0,
                            fontSize: "12px",
                            marginTop: "1px",
                          }}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          FAQ — clean list layout
      ───────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#faf9f7",
          borderTop: "1px solid #eae4de",
          padding: "80px 32px 100px",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "80px" }}>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#b5aca3",
                  marginBottom: "12px",
                }}
              >
                Questions
              </p>
              <p style={{ fontSize: "13px", color: "#756d65", lineHeight: 1.6, margin: "0 0 24px" }}>
                Everything else about how Lyric works and what&apos;s included.
              </p>
              <a
                href="mailto:hi@lyricvoices.ai"
                style={{ fontSize: "13px", color: "#2a2622", fontWeight: 500 }}
              >
                hi@lyricvoices.ai →
              </a>
            </div>

            <div>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    padding: "24px 0",
                    borderBottom: "1px solid #eae4de",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "40px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#2a2622",
                      margin: 0,
                      lineHeight: 1.5,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {faq.q}
                  </p>
                  <p style={{ fontSize: "13px", color: "#756d65", lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          BOTTOM CTA
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#2a2622", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "48px",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: "#faf9f7",
                  margin: "0 0 10px",
                  lineHeight: 1.1,
                }}
              >
                Start with Creator.
                <br />
                <span style={{ color: "#B8955A" }}>Upgrade when you&apos;re ready.</span>
              </h2>
              <p style={{ fontSize: "14px", color: "#756d65", margin: 0, lineHeight: 1.6 }}>
                All five Edition 01 voices, all three variants, ready to use today.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
              <a
                href="https://composer.lyricvoices.ai/sign-up"
                style={{
                  padding: "13px 28px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: "#faf9f7",
                  color: "#2a2622",
                  whiteSpace: "nowrap",
                }}
              >
                Get started
              </a>
              <a
                href="mailto:hi@lyricvoices.ai?subject=Pricing question"
                style={{
                  fontSize: "13px",
                  color: "#4a4540",
                  textAlign: "center",
                }}
              >
                Talk to us first →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
