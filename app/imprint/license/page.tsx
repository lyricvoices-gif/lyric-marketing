/* Imprint licensing page — transactional surface for brands inquiring
   about voice licensing. Routes from the /imprint "Two paths forward"
   CTA, the footer "For partners" column, and the /opus access section.
   Inquiry path uses an email contact per the brief's "optional form"
   note; a form can be wired in later when forms infrastructure lands. */

import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "License from the Imprint",
  description:
    "Build a sonic identity with a Lyric voice. Industry exclusivity, brand exclusivity, and non-exclusive licensing tiers available.",
}

const C = {
  bg: "var(--bg-light)",
  text: "var(--text-1)",
  olive: "var(--olive)",
  border: "var(--border)",
  gold: "var(--gold)",
  sage: "var(--sage)",
}

export default function ImprintLicensePage() {
  return (
    <main style={{ background: C.bg, color: C.text }}>
      {/* Section 1 — Hero */}
      <section
        style={{
          padding: "140px 24px 80px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="For brands" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: "-0.005em",
                color: C.olive,
                margin: "0 0 22px",
              }}
            >
              License from the <em>Imprint</em>.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "19px",
                lineHeight: 1.5,
                color: C.olive,
                opacity: 0.86,
                margin: "0 0 24px",
              }}
            >
              Build a sonic identity with a Lyric voice.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={320}>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: C.text,
                opacity: 0.78,
                margin: 0,
                maxWidth: "640px",
              }}
            >
              Lyric voices are licensed to brands across three tiers, each
              designed for different commercial needs. Every license comes
              with access to{" "}
              <Link
                href="/opus"
                style={{
                  color: C.olive,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Opus
              </Link>
              , our enterprise creative environment for directing
              performances and configuring voice parameters for deployment.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2 — The licensing tiers */}
      <section
        style={{
          padding: "96px 24px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="The tiers" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 500,
                lineHeight: 1.06,
                color: C.olive,
                margin: "0 0 48px",
                maxWidth: "640px",
              }}
            >
              Three ways to license a voice.
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
            }}
          >
            <TierCard
              label="Non-exclusive"
              points={[
                "Voice available to multiple non-competing brands",
                "Best for utility deployments, content production, audiobooks, and broad commercial use",
                "Pricing scales with deployment scope and duration",
              ]}
            />
            <TierCard
              label="Industry-exclusive"
              points={[
                "Voice exclusive within a specific industry vertical for the term of the agreement",
                "Best for brands seeking category differentiation in financial services, automotive, healthcare, and other competitive verticals",
                "Pricing scales with industry, term, and deployment scope",
              ]}
            />
            <TierCard
              label="Brand-exclusive"
              points={[
                "Voice used exclusively by one brand globally",
                "Premium tier for brands building a signature sonic identity across all customer touchpoints",
                "Multi-year commitment with custom pricing",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Section 3 — What comes with a license */}
      <PageSection
        eyebrow="What's included"
        headline="What comes with a license."
      >
        <List
          items={[
            "The licensed voice, available for commercial deployment within the agreed scope",
            "Access to Opus for the duration of the license (Composer for audio generation, Direction for parameter configuration)",
            "Use case examples and deployment guidance from Lyric's creative team",
            "Direct collaboration with Lyric's artist liaison for any per-deployment approvals",
            "Transparent reporting on usage and licensing activity",
          ]}
        />
      </PageSection>

      {/* Section 4 — Use case examples */}
      <PageSection eyebrow="Use cases" headline="Where brands deploy Lyric voices.">
        <List
          items={[
            "Brand voice for inbound call centers and customer service applications",
            "Conversational voice for mobile apps and digital products",
            "Narration for advertising campaigns, brand films, and audio content",
            "Voice for property management, hospitality, and customer-facing systems",
            "Educational content, training materials, and corporate communications",
            "Audiobook and long-form narration",
          ]}
        />
      </PageSection>

      {/* Section 5 — Inquiry path */}
      <PageSection eyebrow="Inquiry path" headline="How to start a conversation.">
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.75,
            color: C.text,
            opacity: 0.82,
            margin: "0 0 18px",
          }}
        >
          To inquire about licensing, contact{" "}
          <a
            href="mailto:info@lyricvoices.ai?subject=Licensing%20Inquiry"
            style={{
              color: C.olive,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            info@lyricvoices.ai
          </a>{" "}
          with the subject line &ldquo;Licensing Inquiry.&rdquo; Please
          include the voice or voices you are interested in, your intended
          use case, and any timing requirements.
        </p>
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: C.text,
            opacity: 0.78,
            margin: 0,
          }}
        >
          We respond within 2 business days.
        </p>
      </PageSection>

      {/* Section 6 — Closing */}
      <section style={{ padding: "120px 24px" }}>
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <ScrollReveal>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2.4vw, 26px)",
                fontWeight: 400,
                lineHeight: 1.45,
                color: C.olive,
                margin: 0,
              }}
            >
              Every licensing engagement is structured around the artist's
              consent and the brand's needs. We work with you to find the
              right voice, the right tier, and the right deployment for
              your business.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

function Eyebrow({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        margin: "0 0 22px",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: C.sage,
        }}
      />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: C.olive,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function PageSection({
  eyebrow,
  headline,
  children,
}: {
  eyebrow: string
  headline: string
  children: React.ReactNode
}) {
  return (
    <section
      style={{
        padding: "80px 24px",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <ScrollReveal>
          <Eyebrow label={eyebrow} />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3.4vw, 36px)",
              fontWeight: 500,
              lineHeight: 1.08,
              color: C.olive,
              margin: "0 0 28px",
            }}
          >
            {headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={220}>{children}</ScrollReveal>
      </div>
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontSize: "16px",
            lineHeight: 1.75,
            color: C.text,
            opacity: 0.82,
            marginBottom: "10px",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function TierCard({ label, points }: { label: string; points: string[] }) {
  return (
    <div
      style={{
        padding: "32px 28px",
        background: "rgba(90, 94, 67, 0.04)",
        border: `1px solid ${C.border}`,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.gold,
          margin: "0 0 14px",
        }}
      >
        {label}
      </p>
      <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
        {points.map((p, i) => (
          <li
            key={i}
            style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: C.text,
              opacity: 0.82,
              marginBottom: "10px",
            }}
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
