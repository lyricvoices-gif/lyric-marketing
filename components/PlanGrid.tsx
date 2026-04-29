"use client"

import { useState } from "react"
import ScrollReveal from "@/components/ScrollReveal"

const DARK = "#2b2a25"
const LIGHT = "#f5f3ef"
const GOLD = "#c9a96e"
const TEXT1 = "#1a1a18"
const TEXT3 = "#9c958f"
const BORDER = "#e5dfd5"

type BillingPeriod = "monthly" | "annual"

interface Plan {
  id: "creator" | "studio" | "enterprise"
  name: string
  monthly: { display: string; period: string }
  annual: { display: string; period: string }
  tagline: string
  highlight: boolean
  badge?: string
  cta: string
  href: string
  isContact: boolean
  features: string[]
}

// Plan data must match the composer landing page's PricingSection.
const PLANS: Plan[] = [
  {
    id: "creator",
    name: "Creator",
    monthly: { display: "$29", period: "/mo" },
    annual: { display: "$278", period: "/yr" },
    tagline: "For creators getting started.",
    highlight: false,
    cta: "Start with Creator",
    href: "https://composer.lyricvoices.ai/sign-up?plan=creator",
    isContact: false,
    features: [
      "All 5 Edition 01 voices",
      "25 generations per day",
      "Scripts up to 500 characters",
      "Inline emotion marks",
      "MP3 download",
      "Commercial use rights",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    monthly: { display: "$99", period: "/mo" },
    annual: { display: "$950", period: "/yr" },
    tagline: "For working teams and brands.",
    highlight: true,
    badge: "Most popular",
    cta: "Try Studio free",
    href: "https://composer.lyricvoices.ai/sign-up?plan=studio",
    isContact: false,
    features: [
      "Everything in Creator",
      "100 generations per day",
      "Scripts up to 2,000 characters",
      "Premium quality rendering",
      "Priority queue",
      "Early access to new Editions",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: { display: "Custom", period: "" },
    annual: { display: "Custom", period: "" },
    tagline: "For agencies and product teams.",
    highlight: false,
    cta: "Contact us",
    href: "mailto:hi@lyricvoices.ai?subject=Enterprise%20inquiry",
    isContact: true,
    features: [
      "Everything in Studio",
      "Unlimited generations",
      "Scripts up to 10,000 characters",
      "Custom voice creation",
      "API access & SSO",
      "Dedicated support",
    ],
  },
]

export default function PlanGrid() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly")

  return (
    <div>
      {/* Billing-period toggle ------------------------------------------- */}
      <ScrollReveal>
        <div
          role="radiogroup"
          aria-label="Billing period"
          style={{
            display: "inline-flex",
            padding: "4px",
            background: "rgba(28,25,23,0.05)",
            border: "1px solid rgba(28,25,23,0.06)",
            borderRadius: "100px",
            marginBottom: "32px",
            gap: "2px",
          }}
        >
          <button
            type="button"
            role="radio"
            aria-checked={period === "monthly"}
            onClick={() => setPeriod("monthly")}
            style={{
              padding: "8px 18px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 500,
              background: period === "monthly" ? "#ffffff" : "transparent",
              color: period === "monthly" ? TEXT1 : TEXT3,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.01em",
              boxShadow: period === "monthly" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              transition: "background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
            }}
          >
            Monthly
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={period === "annual"}
            onClick={() => setPeriod("annual")}
            style={{
              padding: "8px 18px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 500,
              background: period === "annual" ? "#ffffff" : "transparent",
              color: period === "annual" ? TEXT1 : TEXT3,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.01em",
              boxShadow: period === "annual" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
            }}
          >
            Annual
            <span
              aria-hidden="true"
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              Save 20%
            </span>
          </button>
        </div>
      </ScrollReveal>

      {/* Plan grid -------------------------------------------------------- */}
      <div
        className="lyric-pricing-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          alignItems: "stretch",
        }}
      >
        {PLANS.map((plan, i) => {
          const price = period === "annual" ? plan.annual : plan.monthly
          return (
            <ScrollReveal key={plan.id} delay={i * 80}>
              <div
                className={`lyric-pricing-card lyric-pricing-card-${plan.id}`}
                data-highlight={plan.highlight}
                style={{
                  background: plan.highlight ? DARK : "#ffffff",
                  border: plan.highlight ? "none" : `1px solid ${BORDER}`,
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  height: "100%",
                  boxShadow: plan.highlight
                    ? "0 24px 40px -16px rgba(0,0,0,0.25)"
                    : "0 6px 20px -16px rgba(0,0,0,0.18)",
                  transform: plan.highlight ? "translateY(-6px)" : "none",
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
                      color: DARK,
                      background: GOLD,
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
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: TEXT3,
                    margin: "0 0 20px",
                  }}
                >
                  {plan.name}
                </p>

                <div style={{ marginBottom: "8px", display: "flex", alignItems: "baseline" }}>
                  {price.display !== "Custom" && (
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "26px",
                        fontWeight: 600,
                        color: plan.highlight ? LIGHT : TEXT1,
                        marginRight: "2px",
                        lineHeight: 1,
                      }}
                    >
                      $
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontVariantNumeric: "tabular-nums",
                      fontSize: "48px",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      color: plan.highlight ? LIGHT : TEXT1,
                      lineHeight: 1,
                    }}
                  >
                    {price.display === "Custom" ? "Custom" : price.display.replace("$", "")}
                  </span>
                  {price.period && (
                    <span
                      style={{
                        fontSize: "14px",
                        color: plan.highlight ? "rgba(245,243,239,0.55)" : TEXT3,
                        marginLeft: "6px",
                        alignSelf: "flex-end",
                        marginBottom: "4px",
                      }}
                    >
                      {price.period}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    color: plan.highlight ? "rgba(245,243,239,0.7)" : "#4a4a45",
                    lineHeight: 1.5,
                    margin: "0 0 28px",
                  }}
                >
                  {plan.tagline}
                </p>

                <a
                  href={plan.href}
                  target={plan.isContact ? undefined : "_blank"}
                  rel={plan.isContact ? undefined : "noopener noreferrer"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "11px 20px",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: 500,
                    background: plan.highlight ? LIGHT : DARK,
                    color: plan.highlight ? DARK : LIGHT,
                    marginBottom: "20px",
                    letterSpacing: "-0.01em",
                    textDecoration: "none",
                  }}
                >
                  {plan.cta}
                </a>

                <div
                  style={{
                    borderTop: plan.highlight
                      ? "1px solid rgba(229,223,213,0.1)"
                      : `1px solid ${BORDER}`,
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
                          color: plan.highlight ? "rgba(245,243,239,0.65)" : "#4a4a45",
                          lineHeight: 1.4,
                        }}
                      >
                        <span aria-hidden="true" style={{ color: GOLD, flexShrink: 0, fontSize: "12px", marginTop: "1px" }}>
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>

      {/* Risk reversal ---------------------------------------------------- */}
      <ScrollReveal delay={400}>
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#4a4a45",
            opacity: 0.7,
            marginTop: "32px",
            letterSpacing: "0.005em",
            maxWidth: "70ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Credit card required to start the trial. Cancel anytime before day 7 and you won&apos;t be charged.
        </p>
      </ScrollReveal>
    </div>
  )
}
