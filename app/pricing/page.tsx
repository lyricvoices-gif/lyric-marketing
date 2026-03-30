import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import FaqAccordion from "@/components/FaqAccordion"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing. Every plan includes all Edition 01 voices.",
}

const DARK   = "#2b2a25"
const LIGHT  = "#f5f3ef"
const GOLD   = "#c9a96e"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

const plans = [
  {
    id: "creator",
    name: "Creator",
    price: "$29",
    period: "/mo",
    tagline: "For individuals and small teams.",
    dark: false,
    cta: "Start free trial",
    ctaSecondary: "Or subscribe directly",
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
    cta: "Start free trial",
    ctaSecondary: "Or subscribe directly",
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
    href: "mailto:info@lyricvoices.ai?subject=Enterprise inquiry",
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
  {
    q: "Can I use Lyric voices commercially?",
    a: "Creator and Studio plans include commercial rights for podcasts, videos, ads, social media, education, and editorial content. If you need a voice as a branded assistant, product voice, or signature experience, reach out about licensing.",
  },
]

export default function PricingPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: "104px 48px 80px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: TEXT3, marginBottom: "20px",
            }}>
              Pricing
            </p>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4vw, 58px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: LIGHT,
              margin: "0 0 24px",
              lineHeight: 0.95,
            }}>
              Voices that perform.
              <br />
              Pricing that works with <em style={{ fontStyle: "italic", color: GOLD }}>you.</em>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(245,243,239,0.5)", lineHeight: 1.6, maxWidth: "460px", margin: 0 }}>
              From indie creators to established studios, Lyric meets you where you are, and scales as your work evolves.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          PLANS
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: LIGHT, padding: "64px 48px 100px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            alignItems: "stretch",
          }}>
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.id} delay={i * 80}>
                <div style={{
                  background: plan.dark ? DARK : "#ffffff",
                  border: plan.dark ? "none" : `1px solid ${BORDER}`,
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  height: "100%",
                }}>
                  {plan.badge && (
                    <span style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: DARK,
                      background: GOLD,
                      padding: "4px 10px",
                      borderRadius: "100px",
                    }}>
                      {plan.badge}
                    </span>
                  )}

                  <p style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: plan.dark ? TEXT3 : TEXT3,
                    margin: "0 0 20px",
                  }}>
                    {plan.name}
                  </p>

                  <div style={{ marginBottom: "8px" }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "48px",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      color: plan.dark ? LIGHT : TEXT1,
                      lineHeight: 1,
                    }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span style={{
                        fontSize: "14px",
                        color: TEXT3,
                        marginLeft: "4px",
                      }}>
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <p style={{
                    fontSize: "13px",
                    color: TEXT2,
                    lineHeight: 1.5,
                    margin: "0 0 28px",
                  }}>
                    {plan.tagline}
                  </p>

                  {/* Primary CTA */}
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
                      background: plan.dark ? LIGHT : DARK,
                      color: plan.dark ? DARK : LIGHT,
                      marginBottom: plan.ctaSecondary ? "10px" : "28px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {plan.cta}
                  </a>

                  {/* Secondary CTA + trial note */}
                  {plan.ctaSecondary && (
                    <>
                      <a
                        href={plan.href}
                        style={{
                          display: "block",
                          textAlign: "center",
                          fontSize: "12px",
                          color: TEXT3,
                          marginBottom: "8px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {plan.ctaSecondary}
                      </a>
                      <p style={{
                        textAlign: "center",
                        fontSize: "11px",
                        color: TEXT3,
                        margin: "0 0 20px",
                        letterSpacing: "0.01em",
                      }}>
                        Credit card required. Cancel anytime.
                      </p>
                    </>
                  )}

                  <div style={{
                    borderTop: plan.dark
                      ? "1px solid rgba(229,223,213,0.1)"
                      : `1px solid ${BORDER}`,
                    paddingTop: "24px",
                    flex: 1,
                  }}>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {plan.features.map((f) => (
                        <li key={f} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          padding: "6px 0",
                          fontSize: "13px",
                          color: plan.dark ? "rgba(245,243,239,0.65)" : TEXT2,
                          lineHeight: 1.4,
                        }}>
                          <span style={{ color: GOLD, flexShrink: 0, fontSize: "12px", marginTop: "1px" }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          WHY CHOOSE LYRIC
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, padding: "72px 48px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: TEXT3, marginBottom: "44px",
            }}>Why choose lyric?</p>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "64px" }}>
            {[
              {
                n: "01",
                title: "Voices with a point of view",
                body: "Every voice ships with a defined archetype, emotional range, and use-case clarity. Not a voice model. A character. Captured by professional actors trained in emotional variation, not stitched from generic samples.",
              },
              {
                n: "02",
                title: "Direction before generation",
                body: "Direction is part of the product. Each voice includes intention presets and real examples. You set the intent before you write. Lyric treats direction as a constraint, not a suggestion. It performs consistently in context.",
              },
              {
                n: "03",
                title: "Built for how you work",
                body: "Creators, product teams, brands, and creatives who care about how they sound. If sound is part of how your product feels, not just what it says, Lyric fits naturally into your work.",
              },
            ].map((card, i) => (
              <ScrollReveal key={card.n} delay={i * 100}>
                <div>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "26px",
                    fontWeight: 400,
                    color: GOLD,
                    display: "block",
                    marginBottom: "20px",
                    lineHeight: 1,
                    fontStyle: "italic",
                  }}>
                    {card.n}
                  </span>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: TEXT1,
                    margin: "0 0 12px",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.5, margin: 0 }}>
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          FAQ
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, padding: "80px 48px 100px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "80px" }}>
            <ScrollReveal>
              <div>
                <p style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: TEXT3, marginBottom: "12px",
                }}>
                  Questions
                </p>
                <p style={{ fontSize: "13px", color: TEXT2, lineHeight: 1.6, margin: "0 0 24px" }}>
                  Everything else about how Lyric works and what&apos;s included.
                </p>
                <a href="mailto:info@lyricvoices.ai" style={{ fontSize: "13px", color: TEXT1, fontWeight: 500 }}>
                  info@lyricvoices.ai →
                </a>
              </div>
            </ScrollReveal>

            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FULL CTA — matches home and about page pattern
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "72px 24px 48px", textAlign: "center" }}>
        <ScrollReveal>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 4vw, 58px)",
            fontWeight: 600,
            color: LIGHT,
            margin: "0 auto 20px",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            maxWidth: "720px",
          }}>
            Ready to hear Lyric
            <br />
            in action?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p style={{ fontSize: "16px", color: "rgba(245,243,239,0.5)", lineHeight: 1.5, maxWidth: "380px", margin: "0 auto 36px" }}>
            Try the composer and experience how Lyric voices perform in real moments.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "40px" }}>
            <a
              href="https://composer.lyricvoices.ai"
              style={{
                padding: "13px 26px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 500,
                background: LIGHT,
                color: DARK,
                letterSpacing: "-0.01em",
              }}
            >
              Try the composer
            </a>
            <Link
              href="/editions"
              style={{
                padding: "13px 26px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 400,
                background: "rgba(245,243,239,0.07)",
                color: "rgba(245,243,239,0.6)",
                border: "1px solid rgba(245,243,239,0.12)",
                letterSpacing: "-0.01em",
              }}
            >
              Learn how Lyric works
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <div style={{ display: "flex" }}>
              {[
                                { src: "/images/brand_1.jpg", alt: "Brand photography" },
                                { src: "/images/brand_2.jpg", alt: "FLORET botanicals" },
                              ].map((img, i) => (
                              <div
                                key={img.src}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                  border: `2px solid ${DARK}`,
                                  marginLeft: i === 0 ? 0 : "-12px",
                                  background: "#d4c9bc",
                                  flexShrink: 0,
                                }}
                              >
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  width={40}
                                  height={40}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                              </div>
                            ))}
            </div>
            <p style={{ fontSize: "12px", color: "rgba(245,243,239,0.38)", margin: 0, letterSpacing: "0.01em" }}>
              ✦ Shaped by designers behind AI products at top brands.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
