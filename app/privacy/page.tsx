import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lyric Voices collects, uses, and protects your information.",
}

const DARK   = "#2b2a25"
const LIGHT  = "#f5f3ef"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

const sections = [
  {
    title: "1. Information We Collect",
    subsections: [
      {
        subtitle: "1.1 Information You Provide",
        body: null,
        list: [
          "Your name and email address",
          "Payment information (processed securely by our payment provider — we never store full card details)",
          "Text and scripts you input to generate voice content",
          "Any messages you send to our support team",
        ],
      },
      {
        subtitle: "1.2 Information Collected Automatically",
        body: "When you use the Platform, we automatically collect:",
        list: [
          "Usage data — which voices you use, generation counts, session duration, and feature interactions",
          "Technical data — IP address, browser type, operating system, and device identifiers",
          "Log data — server logs, error reports, and performance data",
        ],
      },
      {
        subtitle: "1.3 Information from Third Parties",
        body: "If you sign in with Google or another third-party provider, we receive basic profile information (name, email) from that provider, subject to their privacy policies.",
        list: null,
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the information we collect to:",
    list: [
      "Provide, maintain, and improve the Platform",
      "Process your subscription and payments",
      "Enforce plan limits and entitlements",
      "Send you account-related communications (receipts, security alerts, product updates)",
      "Analyze aggregate usage patterns to improve voice quality and platform features",
      "Respond to your support requests",
      "Comply with legal obligations",
    ],
    note: "We do not sell your personal information to third parties. We do not use your input scripts or generated audio to train third-party AI models without your explicit consent.",
  },
  {
    title: "3. Voice Generation Data",
    body: "Your input text and generated audio are processed to deliver the service. We may retain anonymized, aggregated usage metrics (e.g., character counts, voice selections, generation times) to improve platform performance. We do not use your specific scripts or audio output for model training purposes.\n\nIf you are on an Enterprise plan or have a licensing agreement, data handling terms may be further specified in your separate agreement.",
  },
  {
    title: "4. Sharing Your Information",
    body: "We share your information only in these limited circumstances:",
    list: [
      "Service providers — third-party vendors (payment processors, authentication providers, cloud infrastructure, voice API partners) who access your data only as needed, under confidentiality obligations.",
      "Legal requirements — disclosure if required by law, regulation, or valid legal process.",
      "Business transfers — if Lyric Voices is acquired or merged, your information may transfer to the new entity, subject to equivalent privacy protections.",
      "With your consent — for any other purpose, only with your explicit consent.",
    ],
  },
  {
    title: "5. Cookies & Tracking",
    body: "We use cookies and similar technologies to keep you logged in, remember your preferences, and understand how the Platform is used. We do not use third-party advertising trackers or sell your browsing data. You can control cookies through your browser settings; disabling cookies may affect some Platform functionality.",
  },
  {
    title: "6. Data Retention",
    body: "We retain your account information and usage data for as long as your account is active, and for a reasonable period afterward for legal and operational purposes. You may request deletion of your account and associated data at any time (see Section 8).",
  },
  {
    title: "7. Security",
    body: "We implement industry-standard technical and organizational measures to protect your information — including encryption in transit, access controls, and secure cloud infrastructure. No system is perfectly secure; if you believe your account has been compromised, contact us immediately at hi@lyricvoices.ai.",
  },
  {
    title: "8. Your Rights & Choices",
    body: "Depending on your location, you may have the following rights:",
    list: [
      "Access — Request a copy of the personal information we hold about you",
      "Correction — Ask us to correct inaccurate or incomplete information",
      "Deletion — Request that we delete your account and personal data",
      "Portability — Request your data in a structured, machine-readable format",
      "Objection — Object to certain uses of your data, such as analytics",
    ],
    note: "To exercise any of these rights, email hi@lyricvoices.ai. We will respond within 30 days.",
  },
  {
    title: "9. Children's Privacy",
    body: "The Platform is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If you believe a minor has provided us with their information, please contact us and we will delete it promptly.",
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. When we do, we will revise the Effective Date above. For significant changes, we will notify you by email or in-app notice. Your continued use of the Platform constitutes acceptance of the updated policy.",
  },
  {
    title: "11. Contact Us",
    body: "Lyric Voices\nEmail: hi@lyricvoices.ai",
  },
]

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section style={{ background: LIGHT, borderBottom: `1px solid ${BORDER}`, padding: "80px 48px 48px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p style={{
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: TEXT3, marginBottom: "16px",
          }}>
            Legal
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            color: TEXT1,
            margin: "0 0 20px",
          }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "13px", color: TEXT3, margin: "0 0 16px" }}>
            Effective Date: March 12, 2026
          </p>
          <p style={{ fontSize: "15px", color: TEXT2, lineHeight: 1.7, margin: 0, maxWidth: "600px" }}>
            At Lyric Voices, we take your privacy seriously. This Privacy Policy explains what information we collect, how we use it, and the choices you have. We&apos;ve written this to be read by actual humans — not just lawyers.
          </p>
        </div>
      </section>

      {/* Body */}
      <section style={{ background: LIGHT, padding: "64px 48px 100px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {sections.map((s, i) => (
            <div
              key={i}
              style={{
                paddingTop: "40px",
                marginTop: "40px",
                borderTop: `1px solid ${BORDER}`,
              }}
            >
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: 600,
                color: TEXT1,
                letterSpacing: "-0.01em",
                margin: "0 0 16px",
                lineHeight: 1.2,
              }}>
                {s.title}
              </h2>

              {"subsections" in s && s.subsections ? (
                s.subsections.map((sub, j) => (
                  <div key={j} style={{ marginBottom: "24px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: TEXT1, margin: "0 0 8px" }}>
                      {sub.subtitle}
                    </p>
                    {sub.body && (
                      <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.75, margin: "0 0 8px" }}>
                        {sub.body}
                      </p>
                    )}
                    {sub.list && (
                      <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
                        {sub.list.map((item, k) => (
                          <li key={k} style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.75, marginBottom: "4px" }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <>
                  {"body" in s && s.body && s.body.split("\n\n").map((para, j) => (
                    <p key={j} style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.75, margin: "0 0 12px" }}>
                      {para}
                    </p>
                  ))}
                  {"list" in s && s.list && (
                    <ul style={{ margin: "0 0 12px", padding: "0 0 0 18px" }}>
                      {s.list.map((item, j) => (
                        <li key={j} style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.75, marginBottom: "6px" }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {"note" in s && s.note && (
                    <p style={{
                      fontSize: "13px", color: TEXT2, lineHeight: 1.7,
                      borderLeft: `2px solid ${BORDER}`, paddingLeft: "16px", margin: "16px 0 0",
                    }}>
                      {s.note}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Footer nav */}
          <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: `1px solid ${BORDER}`, display: "flex", gap: "24px" }}>
            <Link href="/terms" style={{ fontSize: "13px", color: TEXT3 }}>Terms of Use →</Link>
            <Link href="/" style={{ fontSize: "13px", color: TEXT3 }}>Back to home →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
