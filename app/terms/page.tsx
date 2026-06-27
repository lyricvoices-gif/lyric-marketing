import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing access to and use of Lyric's products by brands, agencies, and AI labs.",
}

/* Terms of Use — enterprise B2B focus. Reflects the current three-
   product structure: Imprint (separate licensing contracts), Callio
   (subscription-based access to Composer and Direction), and Score
   (separate dataset agreements). Voice artist relationships are
   governed by the Artist Partnership at /imprint/agreement, which
   takes precedence for any matter specific to the artist
   relationship. Em dashes are avoided throughout per design.md
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
    note?: string
  }[]
}

const sections: Section[] = [
  {
    title: "1. Who Can Use Lyric",
    body: "These Terms apply to brands, agencies, businesses, and AI labs. Lyric's products are not intended for individual consumer use. Voice artists access Lyric through the Artist Partnership at /imprint/agreement; these Terms do not govern the artist relationship.\n\nBy using Lyric, you represent that you are authorized to enter into a binding agreement on behalf of the brand, agency, or organization you represent.",
  },
  {
    title: "2. Lyric's Products",
    body: "Lyric offers three products. Each is governed by these Terms together with the additional product-specific agreement noted below.",
    subsections: [
      {
        subtitle: "2.1 Imprint",
        body: "Imprint is Lyric's roster of curated voice identities. Voice licensing for commercial deployment is governed by separate negotiated agreements between Lyric and the licensee. These Terms cover access to and use of the platform pages that present the Imprint roster. They do not grant any license to deploy a Lyric imprint voice. Any commercial deployment requires a corresponding licensing agreement.",
      },
      {
        subtitle: "2.2 Callio",
        body: "Callio is Lyric's creative environment for working with voices from the Imprint. Callio includes two tools: Composer, which generates audio output from scripts and configurations, and Direction, which produces parameter configurations through a guided conversational process. Access to Callio is provided on a subscription basis. Subscription pricing and terms specific to an account are defined in the brand's individual subscription agreement, which incorporates these Terms by reference.",
      },
      {
        subtitle: "2.3 Score",
        body: "Score is Lyric's voice dataset product for AI labs and research organizations. Dataset access and licensing are governed by separate dataset licensing agreements negotiated between Lyric and the licensee. These Terms cover platform information about Score but do not grant any dataset license.",
      },
    ],
  },
  {
    title: "3. Callio Usage Rules",
    body: "By accessing Callio, the brand agrees to the following:",
    subsections: [
      {
        subtitle: "3.1 Commercial Deployment Requires Licensing",
        body: "Audio output from Composer and parameter configurations produced by Direction may only be deployed commercially through a corresponding voice licensing agreement with Lyric. Output produced in Callio is not, on its own, a license to deploy.",
      },
      {
        subtitle: "3.2 Direction Is Imprint-Only",
        body: "The Direction tool is available exclusively for voices on the Lyric imprint, including Edition 01 and forthcoming editions. Direction is not available for voices outside the imprint.",
      },
      {
        subtitle: "3.3 No Extraction or Reverse Engineering",
        body: "The brand may not extract, reverse-engineer, copy, or otherwise attempt to reconstruct the underlying voice models, embeddings, training data, or model infrastructure accessed through Callio. The brand may not use any output from Callio to train a third-party voice model or to develop a derivative voice.",
      },
      {
        subtitle: "3.4 Use Case Exclusions",
        body: "The brand may not use Callio to generate content that falls outside the pre-approved use case categories defined in the relevant artist partnership for the voice in question. Category-level exclusions commonly include political content, religious content, gambling, adult content, tobacco, firearms, and other categories that individual artists may exclude. The current exclusions for each licensed voice are documented in the brand's licensing agreement.",
      },
    ],
  },
  {
    title: "4. Ownership",
    subsections: [
      {
        subtitle: "4.1 Lyric Technology",
        body: "Lyric retains all right, title, and interest in the platform technology, voice model infrastructure, generation systems, parameter framework, and the Imprint, Callio, and Score products. Nothing in these Terms grants the brand any ownership of Lyric technology.",
      },
      {
        subtitle: "4.2 Voice Artists",
        body: "Voice artists retain ownership of their voice, vocal identity, name, likeness, performance, and underlying personal rights, as described in the Artist Partnership at /imprint/agreement. Nothing in these Terms or in any licensing arrangement transfers those rights from the artist.",
      },
      {
        subtitle: "4.3 Brand Content",
        body: "The brand retains ownership of scripts, content, and creative direction it provides to Composer or Direction. By submitting content to Callio, the brand grants Lyric a limited, non-exclusive license to process that content solely to deliver the requested service.",
      },
      {
        subtitle: "4.4 Parameter Configurations",
        body: "Parameter configurations produced by Direction are licensed to the brand for use with the corresponding licensed voice, subject to the active licensing agreement. The underlying voice model rights remain with Lyric and the relevant voice artist. The brand may not transfer, sublicense, or resell parameter configurations outside the scope of the licensing agreement.",
      },
    ],
  },
  {
    title: "5. Account Responsibilities",
    body: "Brands are responsible for:",
    list: [
      "The security of their account credentials, including credentials issued to authorized users",
      "All actions taken under the brand account, whether by an authorized user or by anyone using credentials issued to the brand",
      "Promptly notifying Lyric at info@lyricvoices.ai of any suspected unauthorized access",
    ],
  },
  {
    title: "6. Acceptable Use",
    body: "Brands may not use Lyric to:",
    list: [
      "Generate or distribute content that is misleading, fraudulent, defamatory, harassing, or unlawful",
      "Impersonate any real person, including the licensed voice artist, in a manner inconsistent with the licensing agreement",
      "Generate content that violates pre-approved use case categories defined in the relevant artist partnership",
      "Attempt unauthorized access to other accounts, infrastructure, or third-party systems",
      "Use Lyric in any way that infringes the rights of a voice artist on the imprint, including circumventing licensing terms, exclusivity tiers, or audit obligations",
      "Interfere with the platform's security, performance, or availability",
    ],
    note: "Lyric reserves the right to suspend or terminate accounts that violate these standards. See Section 9 (Termination).",
  },
  {
    title: "7. Service Availability",
    body: "Lyric does not guarantee uninterrupted access to its products. Planned and unplanned downtime may occur, including maintenance windows, infrastructure changes, and third-party service disruptions. Lyric makes commercially reasonable efforts to communicate planned downtime in advance to brand account contacts.\n\nLyric's products are not designed for safety-critical applications. Brands should not deploy Lyric-generated content in any system where a failure to deliver real-time audio or accurate output could cause physical harm, financial loss, or violation of regulatory obligations.",
  },
  {
    title: "8. Billing and Subscriptions",
    body: "Callio subscriptions are billed on a recurring basis through Stripe. The brand authorizes Lyric to charge its payment method at the rate defined in the subscription agreement. The brand may cancel a subscription at any time; cancellation takes effect at the end of the then-current billing period. Lyric does not offer prorated refunds for partial billing periods unless required by applicable law.\n\nEnterprise customers with negotiated pricing or annual agreements are governed by the terms of those individual agreements, which take precedence over the standard subscription terms for any matter specifically addressed in the negotiated agreement.",
  },
  {
    title: "9. Termination",
    body: "Lyric may suspend or terminate a brand's access to its products if:",
    list: [
      "The brand materially breaches these Terms or any related licensing or subscription agreement",
      "Payment is not received within the grace period defined in the subscription agreement",
      "The brand violates the rights of a voice artist on the imprint, including exclusivity terms, use case exclusions, or audit obligations",
      "Continued access creates legal or reputational risk for Lyric or the affected voice artist",
    ],
    note: "The brand may terminate its subscription at any time as described in Section 8. Provisions of these Terms that by their nature should survive termination, including Sections 4 (Ownership), 10 (Limitation of Liability), and 11 (Disputes), will survive.",
  },
  {
    title: "10. Limitation of Liability",
    body: "To the maximum extent permitted by law, Lyric and its affiliates, officers, employees, and agents will not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages arising from or related to the brand's use of Lyric's products, even if Lyric has been advised of the possibility of such damages.\n\nLyric's total aggregate liability to the brand for any claim arising from or related to these Terms or the use of its products will not exceed the amounts the brand has paid to Lyric in the twelve months immediately preceding the claim.\n\nThese limitations are essential to the agreement between Lyric and the brand and apply to all theories of liability, whether based in contract, tort, statute, or otherwise.",
  },
  {
    title: "11. Disputes",
    body: "These Terms are governed by the laws of the State of California, without regard to conflict of laws principles. Any dispute arising from or related to these Terms or the use of Lyric's products will be resolved through binding arbitration in Los Angeles County, California, subject to applicable law where it cannot be displaced by agreement. The brand waives any right to participate in a class action against Lyric.\n\nNotwithstanding the foregoing, either party may seek equitable relief in any court of competent jurisdiction to protect its intellectual property rights or confidential information.",
  },
  {
    title: "12. Modifications",
    body: "Lyric may update these Terms from time to time. The 'Last updated' date above will reflect the date of the most recent revision. For material changes, Lyric will notify brand account contacts by email and provide at least 30 days notice before the changes take effect. Continued use of Lyric's products after the effective date of the updated Terms constitutes acceptance.",
  },
  {
    title: "13. Privacy",
    body: "The brand's use of Lyric's products is also governed by the Privacy Policy at /privacy, which is incorporated into these Terms by reference. Voice artists are also governed by the Artist Partnership at /imprint/agreement for matters specific to the artist relationship.",
  },
  {
    title: "14. Contact",
    body: "Lyric Voices, Inc.\nEmail: info@lyricvoices.ai",
  },
]

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
            Last updated: May 25, 2026
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
            These Terms of Use govern access to and use of Lyric Voices, Inc. (&ldquo;Lyric&rdquo;)
            products and services by brands, agencies, and AI labs. Lyric is an enterprise voice AI
            imprint. Voice artists who partner with Lyric are governed by the separate{" "}
            <Link
              href="/imprint/agreement"
              style={{ color: C.text, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Artist Partnership
            </Link>
            , which takes precedence over these Terms for any matter specific to the artist
            relationship.
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
            <PolicyNavLink href="/imprint/agreement" label="Artist Partnership" />
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

      {/* When a section has BOTH lead body and subsections, render the lead first */}
      {s.body &&
        s.subsections &&
        s.body.split("\n\n").map((para, j) => (
          <p
            key={`lead-${j}`}
            style={{
              fontSize: "14px",
              color: C.textMuted,
              lineHeight: 1.75,
              margin: "0 0 16px",
              whiteSpace: "pre-line",
            }}
          >
            {para}
          </p>
        ))}

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
                  whiteSpace: "pre-line",
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
            {sub.note && (
              <p
                style={{
                  fontSize: "13px",
                  color: C.textMuted,
                  lineHeight: 1.7,
                  borderLeft: `2px solid ${C.border}`,
                  paddingLeft: "16px",
                  margin: "12px 0 0",
                }}
              >
                {sub.note}
              </p>
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
