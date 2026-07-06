import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Use — Callio (Draft)",
  description:
    "The terms governing access to and use of Callio, the brand-voice governance product from Lyric Voices, Inc., by enterprise brands, agencies, and organizations.",
}

/* Terms of Use — Callio only. Full replacement of the pre-pivot three-product
   Terms (Imprint / the old creative-environment "Callio" containing Composer
   and Direction / Score). The term "Callio" is redefined completely: it is now
   the brand-voice governance product itself, not a creative environment. No
   imprint/artist/Composer/Direction/Score references remain. Marked DRAFT: this
   is a binding legal document and must be reviewed by counsel before
   publishing. Where a specific legal determination is required, a [COUNSEL]
   placeholder is used rather than inventing it. Em dashes are avoided per
   design.md section 2.

   Border colors use token HEX values directly: in this render path a var()
   inside a `border` shorthand set via an inline style is dropped by the
   browser, so hex keeps every border/divider visible. Values mirror
   globals.css :root. */

const C = {
  bg: "var(--bg-light)",
  text: "var(--text-1)",
  textMuted: "var(--text-2)",
  textFaint: "var(--text-3)",
  border: "#E5DFD5", // --border
  gold: "var(--gold)",
  olive: "var(--olive)",
}

type Sub = {
  subtitle: string
  body?: string
  list?: string[]
  note?: string
}

type Section = {
  title: string
  body?: string
  list?: string[]
  note?: string
  subsections?: Sub[]
}

const sections: Section[] = [
  {
    title: "1. Who Can Use Callio",
    body: "Callio is provided for use by enterprise brands, agencies, businesses, and organizations. It is not intended for, and may not be used for, individual consumer purposes. By accessing or using Callio, you represent and warrant that you are authorized to bind the organization you represent to these Terms, and that the organization accepts them. In these Terms, “brand” means that organization.",
  },
  {
    title: "2. The Product",
    body: "Callio is a single product: a vendor-agnostic brand-voice governance platform. It helps a brand define its brand voice as a governed specification, or spec, and keep the brand's AI voice agents consistent to that spec across channels. Customers use a guided intake to create and manage their voice specs, and the product governs how their deployed agents sound.\n\nCallio is provided on a subscription basis. Pricing and subscription specifics, including the applicable tier (Foundation, Governance subscription, or Enterprise), are defined in the brand's subscription agreement or enterprise agreement, which incorporates these Terms. These Terms do not restate prices.",
  },
  {
    title: "3. Ownership",
    subsections: [
      {
        subtitle: "3.1 What the Brand Owns",
        body: "The brand owns the content it provides to Callio, including its brand information, its scripts and brand-voice descriptions, its disclosure statements, and its acronyms, terms, and lexicon. The brand also owns the resulting voice spec: the brand's governed brand voice, codified. By submitting content to Callio, the brand grants Lyric a limited, non-exclusive license to host, process, and use that content solely to provide and operate the service for the brand.",
      },
      {
        subtitle: "3.2 What Lyric Owns",
        body: "Lyric owns the Callio platform and all related technology, including its generation and governance systems and its governance intellectual property. The governance intellectual property includes the curated voice library, the evaluation and drift-detection logic, and the tuning methodology. Nothing in these Terms grants the brand any ownership of, or right in, Lyric's technology, platform, or governance systems, other than the limited right to use Callio under these Terms and the applicable agreement.",
      },
      {
        subtitle: "3.3 Voice Rights",
        body: "Ownership of a voice spec does not convey ownership of, or a standalone right to, any voice. Voice usage rights are separate from the spec and run through the applicable licensing below.",
        list: [
          "Third-party-provided voices: Certain voices are made available through third-party engine providers. The brand's use of those voices is subject to the applicable terms of the relevant provider. [COUNSEL: reconcile this pass-through against the actual provider agreements]",
          "Lyric-created voices: Certain voices are created and licensed by Lyric. The brand's right to use those voices is granted through its subscription and licensing with Lyric and is defined by that agreement.",
        ],
        note: "The brand's ownership of its spec does not, in itself, grant any right to use a voice. The brand's spec is the brand's; voices are provided under the separate terms described here.",
      },
    ],
  },
  {
    title: "4. Usage Rules and Protection of Lyric's Intellectual Property",
    subsections: [
      {
        subtitle: "4.1 Protection of Lyric's Intellectual Property",
        body: "The brand agrees to the following restrictions, which protect Lyric's platform, governance systems, and intellectual property:",
        list: [
          "The brand may not reverse-engineer, decompile, disassemble, reconstruct, or otherwise attempt to derive the curation system, the evaluation or drift-detection logic, the governance methodology, or any underlying models or infrastructure.",
          "The brand may not use Callio, its outputs, or any information derived from it to build, train, or develop a competing brand-voice governance product or service, or to train any competing system.",
          "The brand may not resell, sublicense, rent, or otherwise transfer access to Callio or its governance systems outside the scope of its agreement.",
        ],
        note: "Lyric considers the protections in this Section essential to its business and will enforce them to the fullest extent permitted by law, including by seeking injunctive and other equitable relief in addition to any other available remedy. [COUNSEL: specify the enforceable remedies, including injunctive relief, any liquidated-damages provision, and the specific claims to be asserted]",
      },
      {
        subtitle: "4.2 Acceptable Use",
        body: "The brand may not:",
        list: [
          "Use Callio for any unlawful, infringing, fraudulent, defamatory, or harassing purpose",
          "Access, or attempt to access, other accounts, Lyric infrastructure, or third-party systems without authorization",
          "Interfere with the security, performance, or availability of the platform",
          "Misrepresent the source or nature of governed output",
        ],
      },
    ],
  },
  {
    title: "5. Account Responsibilities",
    body: "The brand is responsible for maintaining the security and confidentiality of its account credentials, including any credentials issued to its authorized users, and for all activity that occurs under its account. The brand must promptly notify Lyric at info@lyricvoices.ai of any suspected or actual unauthorized access to or use of its account.",
  },
  {
    title: "6. Service Availability",
    body: "Lyric does not guarantee that Callio will be uninterrupted or error-free. Access may be affected by scheduled maintenance, unplanned downtime, or disruptions in third-party services. Lyric will use commercially reasonable efforts to communicate planned downtime in advance.\n\nCallio is not intended for safety-critical applications. The brand must not deploy Callio in any system where a failure to deliver accurate or real-time output could cause physical harm, financial loss, or a regulatory violation.",
  },
  {
    title: "7. Billing and Subscriptions",
    body: "Callio is billed on a recurring basis through Stripe. The brand authorizes Lyric to charge the applicable fees at the agreed rate for each billing period. The brand may cancel at any time, effective at the end of the current billing period. Fees are non-refundable, and Lyric does not provide prorated refunds, except where required by law. Where an enterprise, negotiated, or annual agreement specifically addresses a matter, that agreement takes precedence over these standard subscription terms.",
  },
  {
    title: "8. Termination",
    body: "Lyric may suspend or terminate a brand's access to Callio if the brand materially breaches these Terms, fails to pay beyond any applicable grace period, violates the intellectual-property protections or usage rules in Section 4, or where continued access creates legal or reputational risk for Lyric. The brand may terminate as described in Section 7.\n\nThe following survive termination: Ownership (Section 3), the intellectual-property protections and usage rules (Section 4), Limitation of Liability (Section 9), and Disputes (Section 10).",
  },
  {
    title: "9. Limitation of Liability",
    body: "To the maximum extent permitted by law, neither party is liable to the other for any indirect, incidental, special, consequential, or punitive damages, or for lost profits or lost data, arising out of or relating to the use of Callio. Lyric's total aggregate liability arising out of or relating to these Terms or Callio will not exceed the amounts paid by the brand in the twelve months preceding the event giving rise to the claim. [COUNSEL: confirm the liability cap and any figures] These limitations apply across all theories of liability.",
  },
  {
    title: "10. Disputes",
    body: "These Terms are governed by the laws of the State of California, without regard to its conflict-of-laws rules. Any dispute arising out of or relating to these Terms or Callio will be resolved by binding arbitration in Los Angeles County, California. [COUNSEL: confirm the arbitration venue and rules, and the enforceability of any class-action waiver] Notwithstanding the foregoing, either party may seek equitable relief in a court of competent jurisdiction to protect its intellectual property or confidential information.",
  },
  {
    title: "11. Modifications",
    body: "Lyric may update these Terms from time to time. The 'Last updated' date above reflects the most recent revision. For material changes, Lyric will provide email notice to account contacts at least 30 days before the changes take effect. Continued use of Callio after the changes take effect constitutes acceptance of the updated Terms.",
  },
  {
    title: "12. Privacy",
    body: "The brand's use of Callio is also governed by the Privacy Policy at /privacy, which is incorporated into these Terms by reference.",
  },
  {
    title: "13. Contact",
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

export default function TermsPage() {
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
              This document is a working draft. It is a binding legal document and must be reviewed
              and approved by counsel before it is published or relied upon. Highlighted{" "}
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
            Terms of Use
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
            These Terms of Use (&ldquo;Terms&rdquo;) govern access to and use of Callio, the
            brand-voice governance product provided by Lyric Voices, Inc. (&ldquo;Lyric&rdquo;).
            Callio is for enterprise brands, agencies, and organizations; it is not for individual
            consumer use. By accessing or using Callio, you agree to these Terms on behalf of the
            organization you represent.
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
            <PolicyNavLink href="/privacy" label="Privacy Policy" />
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

function Note({ text }: { text: string }) {
  return (
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
      {withCounsel(text)}
    </p>
  )
}

function Bullets({ items, tight }: { items: string[]; tight?: boolean }) {
  return (
    <ul style={{ margin: tight ? 0 : "0 0 12px", padding: "0 0 0 18px" }}>
      {items.map((item, j) => (
        <li
          key={j}
          style={{
            fontSize: "14px",
            color: C.textMuted,
            lineHeight: 1.75,
            marginBottom: tight ? "4px" : "6px",
          }}
        >
          {withCounsel(item)}
        </li>
      ))}
    </ul>
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
            {sub.list && <Bullets items={sub.list} tight />}
            {sub.note && <Note text={sub.note} />}
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
          {s.list && <Bullets items={s.list} />}
          {s.note && <Note text={s.note} />}
        </>
      )}
    </div>
  )
}
