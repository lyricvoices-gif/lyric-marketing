import type { Metadata } from "next"
import Link from "next/link"

/* Artist Partnership — public plain-language summary of the agreement
   every Lyric voice artist signs. Linked from the Imprint product page
   ("Read the full Artist Partnership") and the global footer, plus the
   Privacy and Terms pages. Fully static, no client components.

   Editorial register over legal: warm off-white ground, single
   readable column at a 65-72 character measure, typographic hierarchy
   carried by GT Super display + small-caps GT America section labels
   with gold accent dots. The one Instrument Serif Italic accent is the
   closing "Composed, not cloned." line, matching the footer signature.

   Voice rules per design.md: no em dashes, no exclamation points, no
   marketing language. Framing is always that the artist performed the
   voice and earns from it, and Lyric owns the voice models. */

export const metadata: Metadata = {
  title: "Artist Partnership | Lyric Voices",
  description:
    "A plain language summary of the agreement every Lyric voice artist signs, built on the NAVA principles of consent, control, and compensation.",
}

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
  label: string
  paragraphs: string[]
}

const sections: Section[] = [
  {
    label: "What the partnership is",
    paragraphs: [
      "Lyric builds voice models from recorded performances. The artist performs the voice and earns from it for as long as it is deployed. Lyric owns the voice models and manages licensing, deployment, and protection. The artist holds ongoing rights to consent, compensation, and withdrawal.",
      "The framework follows the NAVA principles of consent, control, and compensation. Each one is a contractual term, not a value statement.",
    ],
  },
  {
    label: "Consent",
    paragraphs: [
      "No voice is recorded, modeled, or deployed without a signed agreement. Artists see how their voice will be used before it is used. New categories of use require new consent. Consent given once is not consent given forever.",
    ],
  },
  {
    label: "Control",
    paragraphs: [
      "Forward withdrawal is the default. An artist can withdraw their voice from future licensing at any time. Existing deployments run to the end of their license terms, and no new licenses are issued after withdrawal. The artist does not need to give a reason.",
    ],
  },
  {
    label: "Compensation",
    paragraphs: [
      "Artists earn a royalty on net licensing revenue, starting at 15 percent and increasing through usage tiers. Royalties are separate from session fees. Recording sessions are paid at a minimum of 1,000 USD or the local union scale, whichever is higher. No artist records on spec.",
    ],
  },
  {
    label: "Term",
    paragraphs: [
      "The initial term is two years. Renewal is a decision, not a rollover. At renewal, terms are reviewed together, and either party can decline.",
    ],
  },
  {
    label: "What we do not do",
    paragraphs: [
      "We do not clone voices from found audio. We do not train on performances we have not licensed. We do not bury withdrawal behind support tickets. We do not pay in exposure.",
    ],
  },
]

export default function ArtistPartnershipPage() {
  return (
    <main style={{ background: C.bg, color: C.text }}>
      {/* Hero */}
      <section style={{ padding: "120px 24px 56px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <Eyebrow label="Imprint" />
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 68px)",
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: "-0.005em",
              color: C.olive,
              margin: "0 0 28px",
            }}
          >
            The Artist Partnership
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "18px",
              lineHeight: 1.7,
              color: C.textMuted,
              margin: 0,
              maxWidth: "640px",
            }}
          >
            This is a plain language summary of the agreement every Lyric
            voice artist signs. The full contract is longer and more
            precise. Nothing here replaces it. We publish this summary
            because most platforms do not, and we think that says
            something.
          </p>
        </div>
      </section>

      {/* Body sections */}
      <section
        style={{
          padding: "32px 24px 96px",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          {sections.map((s) => (
            <div key={s.label} style={{ marginTop: "56px" }}>
              <Eyebrow label={s.label} small />
              {s.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "17px",
                    lineHeight: 1.75,
                    color: C.text,
                    margin: i === 0 ? "0" : "18px 0 0",
                    maxWidth: "640px",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* Closing */}
          <div
            style={{
              marginTop: "88px",
              paddingTop: "56px",
              borderTop: `1px solid ${C.border}`,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-accent)",
                fontStyle: "italic",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: C.olive,
                margin: "0 0 28px",
              }}
            >
              Composed, not cloned.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "17px",
                lineHeight: 1.75,
                color: C.text,
                margin: "0 0 28px",
                maxWidth: "640px",
              }}
            >
              Artists who want the full agreement before auditioning can
              request it at{" "}
              <a
                href="mailto:hi@lyricvoices.ai"
                style={{
                  color: C.olive,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                hi@lyricvoices.ai
              </a>
              . We send the complete contract, not a teaser.
            </p>
            <a
              href="mailto:hi@lyricvoices.ai"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: C.textMuted,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationColor: C.border,
              }}
            >
              Questions about the partnership &rarr; hi@lyricvoices.ai
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

/* Small-caps section label with a gold accent dot. The hero eyebrow
   uses the same component without `small`, giving it slightly more
   presence above the page title. */
function Eyebrow({ label, small = false }: { label: string; small?: boolean }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        margin: small ? "0 0 16px" : "0 0 22px",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: C.gold,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-body)",
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
