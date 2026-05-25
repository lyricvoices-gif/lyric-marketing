import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Lyric collects, uses, and protects information for brands, voice artists, and AI labs working with the Lyric imprint.",
}

/* Privacy Policy — enterprise-focused. Draft pending legal review.
   Reflects the current three-product structure (Imprint, Opus, Score),
   the artist partnership at /imprint/agreement, and the production
   third-party stack. Em dashes are avoided throughout per design.md
   section 2 voice rules. */

const C = {
  bg: "var(--bg-light)",
  text: "var(--text-1)",
  textMuted: "var(--text-2)",
  textFaint: "var(--text-3)",
  border: "var(--border)",
  gold: "var(--gold)",
  olive: "var(--olive)",
}

type Section = {
  title: string
  body?: string
  list?: string[]
  note?: string
  subsections?: {
    subtitle: string
    body?: string
    list?: string[]
  }[]
}

const sections: Section[] = [
  {
    title: "1. Who Lyric Serves",
    body: "Lyric serves enterprise brands, agencies, and AI labs. Brands license voices from the Lyric imprint and use Opus tools, including Composer and Direction, to produce voice content for their products and services. AI labs access voice datasets through Score. Lyric is not a consumer-facing platform. Individual creators are not the intended audience for Lyric's products.",
  },
  {
    title: "2. Information We Collect",
    subsections: [
      {
        subtitle: "2.1 Brand and Account Information",
        list: [
          "Name, role, business email, and company name for brand contacts and authorized users",
          "Billing address and payment method details, processed by Stripe; Lyric does not store full payment card numbers",
          "Tax and invoice information as required for billing and compliance",
        ],
      },
      {
        subtitle: "2.2 Opus Usage Data",
        body: "When a brand uses Opus, Lyric collects:",
        list: [
          "Generation counts, session metadata, and feature interactions across Composer and Direction",
          "Scripts, text content, and other materials uploaded to Composer for voice generation",
          "Conversational input submitted to Direction during voice configuration sessions",
          "Parameter configurations produced by Direction",
          "Server, performance, and error logs",
        ],
      },
      {
        subtitle: "2.3 Voice Artist Materials",
        body: "For voice artists who partner with Lyric, the following materials are collected and stored:",
        list: [
          "Voice recordings supplied by the artist for model training and reference",
          "Voice model files, embeddings, and other derivatives produced from those recordings",
          "Performance metadata, including take counts, emotional ranges, session notes, and consent records",
          "Audit logs documenting usage of the artist's voice across the platform",
        ],
      },
      {
        subtitle: "2.4 Technical Data",
        body: "Lyric automatically collects IP address, browser type, operating system, device identifiers, and standard server logs when users interact with its products.",
      },
      {
        subtitle: "2.5 Information from Third-Party Services",
        body: "If a brand authenticates through a third-party identity provider, Lyric receives basic profile information from that provider, subject to its own privacy policy.",
      },
    ],
  },
  {
    title: "3. Voice Artist Data Protection",
    body: "Voice artist materials, including recordings, model files, training metadata, embeddings, and performance data, are stored on infrastructure with restricted access controls. Lyric does not share voice artist materials with any third party without the corresponding artist's documented consent. Artists retain access to their own materials at any time and may request audit logs or deletion of their materials in accordance with the Artist Partnership.",
  },
  {
    title: "4. Third-Party Services Lyric Uses",
    body: "Lyric relies on the following third-party services to deliver Imprint, Opus, and Score. Each service processes data under its own privacy and security obligations. Lyric provides each service only the data necessary to perform its function.",
    list: [
      "Hume AI: voice model hosting and emotional voice generation for Edition 01 voices",
      "OpenAI: GPT-Realtime-2 for the Direction tool's conversational layer",
      "ElevenLabs: voice generation for The Lyric Briefing and select deployments",
      "Clerk: authentication and account management",
      "Neon: managed PostgreSQL database",
      "Stripe: billing and subscription management",
      "Vercel: web hosting and edge delivery",
      "Cloudflare Workers: voice model routing and edge compute",
      "Resend: transactional email",
    ],
  },
  {
    title: "5. How Lyric Uses Information",
    list: [
      "Operate, secure, and improve Imprint, Opus, and Score",
      "Authenticate users and protect against unauthorized access",
      "Bill brands for subscription and licensing fees, and calculate artist compensation",
      "Generate usage reports for brand accounts and statements for partnered artists",
      "Support audit requests from artists and brands under their respective agreements",
      "Communicate with brand contacts about account status, security, and product updates",
      "Meet legal, regulatory, and contractual obligations",
    ],
  },
  {
    title: "6. What Lyric Does Not Do",
    list: [
      "Lyric does not sell brand data or voice artist materials to advertisers, data brokers, or any third party.",
      "Lyric does not use voice artist materials to train third-party AI models without the corresponding artist's explicit consent.",
      "Lyric does not use brand-uploaded content to train AI models without the brand's explicit consent.",
    ],
  },
  {
    title: "7. Data Retention",
    subsections: [
      {
        subtitle: "7.1 Brand Data",
        body: "Brand account and billing data are retained for the duration of the active relationship plus the period required by tax, accounting, and regulatory obligations.",
      },
      {
        subtitle: "7.2 Opus Usage Data",
        body: "Opus usage data, including scripts, conversational input, and parameter configurations, is retained for the duration of the active relationship plus a reasonable period for audit and dispute resolution. Brands may request earlier deletion in accordance with Section 8.",
      },
      {
        subtitle: "7.3 Voice Artist Materials",
        body: "Voice artist materials are retained for the duration of the Artist Partnership plus the audit period defined in that partnership. Artist deletion rights upon withdrawal are described in Section 9.",
      },
    ],
  },
  {
    title: "8. Brand Data Rights",
    body: "Brand contacts and authorized users may request:",
    list: [
      "Access to the personal information Lyric holds about them",
      "Correction of inaccurate or incomplete information",
      "Deletion of personal information, subject to legal and contractual retention requirements",
      "Portability of personal information in a structured, machine-readable format where applicable",
    ],
    note: "To exercise any of these rights, email info@lyricvoices.ai. Lyric will respond within 30 days.",
  },
  {
    title: "9. Voice Artist Data Rights",
    body: "Voice artists who partner with Lyric have rights specifically defined in the Artist Partnership at /imprint/agreement, including:",
    list: [
      "Access to their own voice materials and performance metadata at any time",
      "Audit rights covering usage of their voice across the platform",
      "Deletion rights upon withdrawal from the partnership, subject to the wind-down period described in that document",
      "Compensation transparency for licensed deployments of their voice",
    ],
    note: "For matters specific to artist data, please reference the Artist Partnership or contact info@lyricvoices.ai.",
  },
  {
    title: "10. Security",
    body: "Lyric implements technical and organizational measures appropriate to the nature of the information processed, including:",
    list: [
      "Encryption of data in transit and at rest",
      "Access controls limiting infrastructure and data access to personnel with a documented business need",
      "Audit logging for access to voice artist materials",
      "Documented security policies reviewed periodically",
    ],
    note: "No system can be guaranteed perfectly secure. Lyric will notify affected brands or artists of any unauthorized access to their data without undue delay and in accordance with applicable law. If you believe an account or asset has been compromised, contact info@lyricvoices.ai immediately.",
  },
  {
    title: "11. International Data Handling",
    body: "Lyric works with brands and voice artists internationally. Information may be processed in the regions where the underlying service infrastructure operates, including the United States and the European Union. Where required by law, Lyric implements appropriate safeguards for cross-border data transfers.",
  },
  {
    title: "12. Changes to This Policy",
    body: "Lyric may update this Privacy Policy from time to time. The 'Last updated' date above will reflect the date of the most recent revision. For material changes, Lyric will notify brand account contacts by email and post a notice on this page. Voice artists will be notified through the notification channel defined in the Artist Partnership.",
  },
  {
    title: "13. Contact",
    body: "Lyric Voices, Inc.\nEmail: info@lyricvoices.ai\n\nFor matters specific to voice artist rights and protections, please reference the Artist Partnership at /imprint/agreement.",
  },
]

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          background: C.bg,
          borderBottom: `1px solid ${C.border}`,
          padding: "80px 48px 48px",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <DraftBadge />

          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: C.textFaint,
              margin: "0 0 16px",
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 500,
              letterSpacing: "0",
              lineHeight: 1.02,
              color: C.text,
              margin: "0 0 20px",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: C.textFaint,
              margin: "0 0 24px",
              letterSpacing: "0.04em",
            }}
          >
            Last updated: [TBD before publication]
          </p>
          <p
            style={{
              fontSize: "15px",
              color: C.textMuted,
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "640px",
            }}
          >
            This Privacy Policy explains how Lyric Voices, Inc. (&ldquo;Lyric&rdquo;) collects, uses,
            and protects information when brands, agencies, and AI labs use our products, and when
            voice artists partner with our imprint. Lyric is an enterprise voice AI imprint. This
            policy reflects that focus. Voice artists should also read the{" "}
            <Link
              href="/imprint/agreement"
              style={{ color: C.text, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Artist Partnership
            </Link>{" "}
            for rights and protections specific to the artist relationship.
          </p>
        </div>
      </section>

      {/* Body */}
      <section style={{ background: C.bg, padding: "64px 48px 100px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {sections.map((s, i) => (
            <SectionBlock key={i} section={s} index={i} />
          ))}

          {/* Cross-policy nav */}
          <div
            style={{
              marginTop: "64px",
              paddingTop: "32px",
              borderTop: `1px solid ${C.border}`,
              display: "flex",
              flexWrap: "wrap",
              gap: "28px",
            }}
          >
            <PolicyNavLink href="/terms" label="Terms of Use" />
            <PolicyNavLink href="/imprint/agreement" label="Artist Partnership" />
            <PolicyNavLink href="/" label="Back to home" />
          </div>
        </div>
      </section>
    </>
  )
}

function DraftBadge() {
  return (
    <p
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: C.gold,
        color: C.olive,
        padding: "6px 14px",
        borderRadius: "999px",
        fontFamily: "var(--font-body)",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        margin: "0 0 28px",
      }}
    >
      <span>Draft. Pending legal review.</span>
    </p>
  )
}

function PolicyNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: "13px",
        color: C.textMuted,
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        textDecorationColor: C.border,
      }}
    >
      {label} →
    </Link>
  )
}

function SectionBlock({ section: s, index }: { section: Section; index: number }) {
  return (
    <div
      style={{
        paddingTop: index === 0 ? "0" : "40px",
        marginTop: index === 0 ? "0" : "40px",
        borderTop: index === 0 ? "none" : `1px solid ${C.border}`,
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          fontWeight: 500,
          color: C.text,
          letterSpacing: "0",
          margin: "0 0 16px",
          lineHeight: 1.2,
        }}
      >
        {s.title}
      </h2>

      {s.subsections ? (
        s.subsections.map((sub, j) => (
          <div key={j} style={{ marginBottom: "24px" }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: C.text,
                margin: "0 0 8px",
                letterSpacing: "0.01em",
              }}
            >
              {sub.subtitle}
            </p>
            {sub.body && (
              <p
                style={{
                  fontSize: "14px",
                  color: C.textMuted,
                  lineHeight: 1.75,
                  margin: "0 0 8px",
                }}
              >
                {sub.body}
              </p>
            )}
            {sub.list && (
              <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
                {sub.list.map((item, k) => (
                  <li
                    key={k}
                    style={{
                      fontSize: "14px",
                      color: C.textMuted,
                      lineHeight: 1.75,
                      marginBottom: "4px",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <>
          {s.body &&
            s.body.split("\n\n").map((para, j) => (
              <p
                key={j}
                style={{
                  fontSize: "14px",
                  color: C.textMuted,
                  lineHeight: 1.75,
                  margin: "0 0 12px",
                  whiteSpace: "pre-line",
                }}
              >
                {para}
              </p>
            ))}
          {s.list && (
            <ul style={{ margin: "0 0 12px", padding: "0 0 0 18px" }}>
              {s.list.map((item, j) => (
                <li
                  key={j}
                  style={{
                    fontSize: "14px",
                    color: C.textMuted,
                    lineHeight: 1.75,
                    marginBottom: "6px",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          {s.note && (
            <p
              style={{
                fontSize: "13px",
                color: C.textMuted,
                lineHeight: 1.7,
                borderLeft: `2px solid ${C.border}`,
                paddingLeft: "16px",
                margin: "16px 0 0",
              }}
            >
              {s.note}
            </p>
          )}
        </>
      )}
    </div>
  )
}
