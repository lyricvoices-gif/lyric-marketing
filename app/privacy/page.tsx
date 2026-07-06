import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — Callio (Draft)",
  description:
    "How Lyric Voices, Inc. collects, uses, and protects information for Callio, its brand-voice governance product for enterprise brands, agencies, and their teams.",
}

/* Privacy Policy — Callio only. This is a full replacement of the pre-pivot
   imprint/artist/Composer/Score policy; that business model is gone and none of
   its framing is carried over. The document is marked DRAFT: it is a legal
   document and must be reviewed by counsel before publishing. Where a specific
   legal determination is required, a [COUNSEL] placeholder is used rather than
   inventing it. Em dashes are avoided per design.md section 2, with one
   exception: the single forward-looking sentence is reproduced verbatim as
   provided. */

/* Text/background colors use CSS-variable tokens. Border colors use the token
   HEX values directly: in this render path a var() inside a `border` shorthand
   set via an inline style is dropped by the browser, so hex is used for every
   border/divider to keep them visible. Values mirror globals.css :root. */
const C = {
  bg: "var(--bg-light)",
  text: "var(--text-1)",
  textMuted: "var(--text-2)",
  textFaint: "var(--text-3)",
  border: "#E5DFD5", // --border
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
    title: "1. About Callio",
    body: "Callio is a vendor-agnostic brand-voice governance product. It helps a brand define its brand voice as a governed specification, or spec, and keep its AI voice agents consistent to that spec. Customers use a guided intake to create and manage their voice specs. Callio is built for enterprise brands, agencies, and their teams. It is not a consumer-facing product, and individual consumers are not its intended users.",
  },
  {
    title: "2. Information We Collect",
    subsections: [
      {
        subtitle: "2.1 Account and Authentication Data",
        body: "Account and authentication data, managed through Supabase, so that customers can sign in and create, view, and manage their voice specs.",
      },
      {
        subtitle: "2.2 Brand and Business Contact Information",
        body: "Name, role, business email address, and company name for authorized users and account contacts.",
      },
      {
        subtitle: "2.3 Billing Information",
        body: "The billing details necessary to process payment, handled by Stripe. Callio does not store full payment card numbers.",
      },
      {
        subtitle: "2.4 Intake Content",
        body: "The content a customer provides during the intake: the brand-voice description the customer writes in free text, the voice selections the customer makes, and the resulting voice spec.",
      },
      {
        subtitle: "2.5 Customer-Provided Configuration Content",
        body: "Configuration content a customer authors for its spec, including the customer's disclosure statements (compliance-sensitive text the customer writes), industry acronyms and terms, and brand-specific acronyms, terms, and lexicon. This content may include the customer's own regulated or compliance-sensitive language. Callio treats it as a distinct, sensitive category and applies the access controls described in Section 9.",
      },
      {
        subtitle: "2.6 Transactional Email Data",
        body: "The data necessary to send account and product emails, such as confirmation after signup and after a spec is created.",
      },
      {
        subtitle: "2.7 Technical and Usage Data",
        body: "IP address, browser type, device identifiers, standard server, performance, and error logs, and metadata about how product features are used.",
      },
    ],
  },
  {
    title: "3. What Callio Does Not Collect",
    body: "The following are current facts about Callio as of this policy's effective date:",
    list: [
      "Callio does not record the user's own voice. The intake is listen-and-pick; users make selections and do not speak.",
      "Callio does not capture or process recordings, transcripts, or audio from the calls handled by a customer's deployed agents.",
      "Callio does not run product analytics.",
    ],
    note: "As Callio's capabilities expand, we may process additional data — including audio input and audio from deployed agents to measure voice consistency — and may introduce product analytics; we will update this Privacy Policy and provide any applicable notices before any such change takes effect.",
  },
  {
    title: "4. How We Use Information",
    body: "Callio uses the information it collects to:",
    list: [
      "Operate, secure, and improve Callio",
      "Authenticate users and protect against unauthorized access",
      "Bill customers for the product",
      "Send account, security, and product communications to authorized users",
      "Meet our legal, regulatory, and contractual obligations",
    ],
  },
  {
    title: "5. What Callio Does Not Do",
    list: [
      "Callio does not sell customer data to advertisers, data brokers, or any third party.",
      "Callio does not use customer content to train AI models without the customer's explicit consent. [COUNSEL: confirm the consent mechanism]",
    ],
  },
  {
    title: "6. Third-Party Subprocessors",
    body: "Callio relies on the following third-party services to operate. Each service processes only the data necessary to perform its function, under its own privacy and security obligations.",
    list: [
      "Supabase: authentication and database",
      "Anthropic (Claude): reasoning",
      "ElevenLabs: voice generation and speech-to-text",
      "Cloudflare R2: audio asset storage",
      "Vercel: hosting and edge delivery",
      "Stripe: billing",
      "Resend: transactional email",
    ],
    note: "Callio maintains an up-to-date list of its subprocessors and will provide the current list on request, so that changes to our vendors do not require republishing this policy.",
  },
  {
    title: "7. Data Retention",
    body: "Callio retains personal information for the duration of the active customer relationship and for any additional period required to meet legal, tax, accounting, and regulatory obligations. Customers may request earlier deletion, subject to those obligations, as described in Section 8. [COUNSEL: specify the exact retention periods by data category]",
  },
  {
    title: "8. Your Data Rights",
    body: "Authorized users may request:",
    list: [
      "Access to the personal information Callio holds about them",
      "Correction of inaccurate or incomplete information",
      "Deletion of personal information, subject to legal and contractual retention requirements",
      "Portability of personal information in a structured, machine-readable format where applicable",
    ],
    note: "To exercise any of these rights, email info@lyricvoices.ai. [COUNSEL: confirm the response window and any jurisdiction-specific rights]",
  },
  {
    title: "9. Security",
    body: "Callio applies technical and organizational measures appropriate to the information it processes, including:",
    list: [
      "Encryption of data in transit and at rest",
      "Access controls that limit data and infrastructure access to personnel with a documented business need",
      "Audit logging of access to customer content, including the sensitive configuration content described in Section 2, such as customer-authored disclosure statements and lexicon",
      "Periodic review of security policies and controls",
    ],
    note: "No system can be guaranteed perfectly secure. Callio will notify affected customers of any unauthorized access to their data without undue delay and in accordance with applicable law. [COUNSEL: confirm breach-notification timing and obligations] If you believe an account has been compromised, contact info@lyricvoices.ai.",
  },
  {
    title: "10. International Data Handling",
    body: "Callio works with customers internationally. Information may be processed in the regions where the underlying service infrastructure operates, including the United States and the European Union. Where required by law, Callio applies appropriate safeguards for cross-border transfers of personal data. [COUNSEL: specify the transfer mechanisms and applicable jurisdictions]",
  },
  {
    title: "11. Changes to This Policy",
    body: "Callio may update this Privacy Policy from time to time. The 'Last updated' date above reflects the most recent revision. For material changes, Callio will notify account contacts by email and post a notice on this page before the change takes effect.",
  },
  {
    title: "12. Contact",
    body: "Lyric Voices, Inc.\nEmail: info@lyricvoices.ai",
  },
]

/* Renders text, highlighting any [COUNSEL ...] placeholder so a reviewer can
   find every open legal question at a glance. */
function withCounsel(text: string): ReactNode {
  const parts = text.split(/(\[COUNSEL[^\]]*\])/g)
  return parts.map((part, i) =>
    part.startsWith("[COUNSEL") ? (
      <span
        key={i}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85em",
          background: "color-mix(in srgb, var(--gold) 26%, transparent)",
          color: C.olive,
          padding: "1px 6px",
          borderRadius: "4px",
          whiteSpace: "normal",
        }}
      >
        {part}
      </span>
    ) : (
      part
    ),
  )
}

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
          {/* DRAFT notice — this document is not published; counsel must review. */}
          <div
            style={{
              borderTop: "1px solid #5A5E43",
              borderRight: "1px solid #5A5E43",
              borderBottom: "1px solid #5A5E43",
              borderLeft: "4px solid #F3D171",
              backgroundColor: "rgba(243, 209, 113, 0.16)",
              borderRadius: "12px",
              padding: "18px 22px",
              margin: "0 0 40px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.olive,
                margin: "0 0 8px",
              }}
            >
              Draft · Pending counsel review
            </p>
            <p
              style={{
                fontSize: "13.5px",
                lineHeight: 1.6,
                color: C.textMuted,
                margin: 0,
              }}
            >
              This document is a working draft. It is a legal document and must be reviewed and
              approved by counsel before it is published or relied upon. Highlighted{" "}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85em",
                  background: "color-mix(in srgb, var(--gold) 26%, transparent)",
                  color: C.olive,
                  padding: "1px 6px",
                  borderRadius: "4px",
                }}
              >
                [COUNSEL]
              </span>{" "}
              markers flag the specific determinations that require counsel input.
            </p>
          </div>

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
            Legal · Callio
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
            {withCounsel("Last updated: [COUNSEL: set the effective date on publication]")}
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
            and protects information in connection with Callio, its brand-voice governance product.
            It is written for the enterprise brands, agencies, and teams that use Callio. Callio is
            not a consumer-facing product.
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
            <PolicyNavLink href="/" label="Back to home" />
          </div>
        </div>
      </section>
    </>
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
                {withCounsel(sub.body)}
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
                    {withCounsel(item)}
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
                {withCounsel(para)}
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
                  {withCounsel(item)}
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
              {withCounsel(s.note)}
            </p>
          )}
        </>
      )}
    </div>
  )
}
