/* Imprint overview — the integrated story for both artists and brands.
   Anchor section #roster matches the /imprint/apply page's deep link.
   Visual treatment follows the home page and About page register:
   warm cream ground, olive headlines, sage-dot eyebrows, generous
   section breath. Reuses the ArtistIndex component from the home page
   Voices section to keep the roster presentation canonical. */

import type { Metadata } from "next"
import Link from "next/link"
import ArtistIndex from "@/components/listen/ArtistIndex"
import ScrollReveal from "@/components/ScrollReveal"
import ScrollHighlightText from "@/components/ScrollHighlightText"
import TwoPathsForward from "@/components/TwoPathsForward"
import { artists } from "@/components/listen/data"

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Lyric is an imprint of curated AI voice identities, built with real voice artists who direct the performance, retain their rights, and earn for every deployment.",
}

const C = {
  bg: "var(--bg-light)",
  text: "var(--text-1)",
  textMuted: "var(--text-2)",
  olive: "var(--olive)",
  border: "var(--border)",
  gold: "var(--gold)",
  sage: "var(--sage)",
}

export default function ImprintPage() {
  return (
    <main style={{ background: C.bg, color: C.text }}>
      {/* Section 1 — Hero */}
      <section
        style={{
          padding: "140px 24px 96px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="The Imprint" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 6vw, 72px)",
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: "-0.005em",
                color: C.olive,
                margin: "0 0 22px",
              }}
            >
              The voice <em>imprint</em>.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "20px",
                lineHeight: 1.5,
                color: C.olive,
                opacity: 0.86,
                margin: "0 0 20px",
                maxWidth: "640px",
                fontWeight: 400,
              }}
            >
              Curated AI voice identities, built with real voice artists.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={290}>
            {/* Brand signature line — relocated here from the global footer,
                where the tagline changed. Set in the page's display italic
                olive, the same emphasis treatment as the hero headline and
                the closing quote, so it fits the existing type and color. */}
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.4vw, 28px)",
                fontWeight: 500,
                lineHeight: 1.2,
                color: C.olive,
                margin: "0 0 28px",
              }}
            >
              Composed, not cloned.
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
              Lyric is an imprint of voices. Each one is a creative
              identity, built with a professional voice artist who directed
              the performance, retained their rights, and shaped how the
              voice carries forward in the age of AI. This is not a
              marketplace. This is a curated roster.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2 — Roster */}
      <section
        id="roster"
        style={{
          padding: "96px 24px",
          borderBottom: `1px solid ${C.border}`,
          scrollMarginTop: "80px",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="Edition 01" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 500,
                lineHeight: 1.06,
                color: C.olive,
                margin: "0 0 18px",
                maxWidth: "640px",
              }}
            >
              Five voices. Real artists behind every one.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: C.text,
                opacity: 0.78,
                margin: "0 0 48px",
                maxWidth: "640px",
              }}
            >
              Each voice on the imprint is a partnership with a working
              voice artist who directs the performance, retains their
              rights, and earns as the voice carries forward.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={320}>
            <ArtistIndex artists={artists} />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3 — How we work with artists.
          Warm brand olive (var(--olive) = #5A5E43, the same ground
          the home page Products section uses) gives the artist side
          its own register: warm, considered, distinct from the colder
          #2b2a25 used on the brands section that follows. Layout is
          the screenshot reference's two-column anchor + numbered list
          with hairline separators. */}
      <section
        style={{
          background: "var(--olive)",
          color: C.bg,
          padding: "120px 24px",
          borderTop: "1px solid rgba(255, 248, 236, 0.08)",
          borderBottom: "1px solid rgba(255, 248, 236, 0.08)",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div className="lv-imprint-anchor-grid">
            <div>
              <ScrollReveal>
                <DarkEyebrow label="For artists" />
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 4.4vw, 52px)",
                    fontWeight: 500,
                    lineHeight: 1.02,
                    letterSpacing: "-0.005em",
                    color: C.bg,
                    margin: "0 0 22px",
                  }}
                >
                  How we work with <em>artists</em>.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={220}>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "rgba(255, 248, 236, 0.82)",
                    margin: "0 0 28px",
                  }}
                >
                  The partnership is built on the NAVA framework. Consent,
                  control, compensation. The full agreement lives at the
                  Artist Partnership.
                </p>
                <a
                  href="/lyric-artist-partnership-agreement.pdf"
                  download
                  className="lv-link-cta"
                >
                  Read the full Artist Partnership{" "}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={320}>
              <NumberedList
                items={[
                  {
                    n: "01",
                    label: "Consent",
                    body: "Voice artists join the Imprint as creative partners. Every aspect of the partnership requires informed, documented consent. Artists review the full agreement before any session begins.",
                  },
                  {
                    n: "02",
                    label: "Control",
                    body: "The voice belongs to the artist. Lyric stewards the technical implementation under license, with the artist retaining rights to their voice, identity, name, likeness, and performance throughout the partnership and beyond it.",
                  },
                  {
                    n: "03",
                    label: "Compensation",
                    body: "Artists receive studio session rates plus ongoing royalties on every commercial deployment of their voice. Royalties are not capped. Compensation continues for the lifetime of the voice's commercial use.",
                  },
                ]}
                onDark={true}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 4 — How brands license voices.
          Dark olive ground. Centered Final-CTA-style header (eyebrow,
          large display headline with italic completion, two pill
          buttons) mirrors the home page's voice-first-era bookend.
          The three-up licensing tier row sits beneath a hairline rule
          so the licensing detail still has its own moment. */}
      <section
        style={{
          background: "#2b2a25",
          color: C.bg,
          padding: "128px 24px",
          borderTop: "1px solid rgba(255, 248, 236, 0.08)",
          borderBottom: "1px solid rgba(255, 248, 236, 0.08)",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div className="lv-imprint-brands-cta">
            <ScrollReveal>
              <DarkEyebrow label="For brands" />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <h2 className="lv-imprint-brands-headline">
                Build a sonic identity. <em>License a Lyric voice.</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <div className="lv-cta-row lv-cta-row-center lv-imprint-brands-ctas">
                <Link
                  href="/imprint/license"
                  className="lv-cta lv-cta-light"
                  style={pillStyle("light")}
                >
                  Inquire about licensing
                </Link>
                <Link
                  href="/opus"
                  className="lv-cta lv-cta-outline"
                  style={pillStyle("outline")}
                >
                  Learn about Opus
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Hairline divider then 3-up licensing tier row */}
          <div
            style={{
              borderTop: "1px solid rgba(255, 248, 236, 0.14)",
              marginTop: "104px",
              paddingTop: "56px",
            }}
          >
            <div className="lv-imprint-tiers-grid">
              {[
                {
                  n: "01",
                  label: "Non-exclusive",
                  body: "The voice can be licensed to multiple non-competing brands simultaneously. Best for utility deployments, content production, and broad commercial use.",
                },
                {
                  n: "02",
                  label: "Industry-exclusive",
                  body: "The voice is exclusive within a specific industry vertical for the term of the agreement. Best for brands seeking differentiation within their category.",
                },
                {
                  n: "03",
                  label: "Brand-exclusive",
                  body: "The voice is used exclusively by one brand globally. Premium tier for brands building a signature sonic identity.",
                },
              ].map((tier, i) => (
                <ScrollReveal key={tier.n} delay={i * 80}>
                  <div className="lv-imprint-tier">
                    <p className="lv-imprint-tier-index">{tier.n}</p>
                    <h4 className="lv-imprint-tier-label">{tier.label}</h4>
                    <p className="lv-imprint-tier-body">{tier.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Closing quote.
          Cream ground breaks up the dark wall between For brands above
          and Two paths forward below. Italic display quote in
          ScrollHighlightText reads as the page's emotional close
          before the conversion bookend. */}
      <section style={{ padding: "144px 24px" }}>
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <ScrollHighlightText
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(24px, 3vw, 34px)",
              fontWeight: 400,
              lineHeight: 1.36,
              color: C.olive,
              margin: 0,
            }}
          >
            Voice is not a commodity. Voice is artistry. The Imprint
            exists because voice artists deserve what music artists
            fought for: attribution, rights, ongoing compensation. We
            built Lyric to be the model the industry needs.
          </ScrollHighlightText>
        </div>
      </section>

      {/* Section 6 — Two paths forward.
          Final dark bookend — the conversion moment, in the same
          register as the home page's Final CTA (pill buttons on dark
          olive). Shared component, also used at the bottom of /opus. */}
      <TwoPathsForward />
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

/* Dark-ground variant of the canonical eyebrow. The sage dot stays
   visible on dark per design.md §7.1; the label color flips to cream.
   Used in the imprint section grounds that go dark (For brands, Two
   paths, Closing) so the eyebrow reads through the contrast change. */
function DarkEyebrow({ label }: { label: string }) {
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
          background: C.gold,
        }}
      />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: C.bg,
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* Numbered list with hairline separators. The index sits on the LEFT
   of the body copy — the number leads the reader into the item rather
   than terminating it. Used in /imprint's For artists section as the
   right column of the two-column anchor grid. Color tokens flip
   between cream-on-sage (onDark=false) and cream-on-dark (onDark=true)
   so the pattern reads on both grounds. */
function NumberedList({
  items,
  onDark,
}: {
  items: { n: string; label: string; body: string }[]
  onDark: boolean
}) {
  const ruleColor = onDark
    ? "rgba(255, 248, 236, 0.14)"
    : "rgba(90, 94, 67, 0.22)"
  const bodyColor = onDark ? "rgba(255, 248, 236, 0.92)" : C.text
  const numberColor = onDark ? "rgba(255, 248, 236, 0.45)" : C.olive
  return (
    <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li
          key={item.n}
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "32px",
            alignItems: "start",
            padding: "26px 0",
            borderTop: i === 0 ? `1px solid ${ruleColor}` : "none",
            borderBottom: `1px solid ${ruleColor}`,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 500,
              color: numberColor,
              letterSpacing: "0.04em",
              alignSelf: "start",
              paddingTop: "2px",
            }}
          >
            {item.n}
          </span>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: 1.7,
              color: bodyColor,
            }}
          >
            <strong
              style={{
                fontWeight: 600,
                color: onDark ? C.bg : C.olive,
              }}
            >
              {item.label}.
            </strong>{" "}
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  )
}

/* Replaces the older PathCard. Editorial two-column treatment for the
   conversion choice point: top hairline, small uppercase label, italic
   display headline, single arrow CTA. No card frame, no body
   paragraphs. Echoes the numbered-list hairline pattern used in
   sections 3 and 4 without re-using the list itself. */
/* Pill button style helper for the For brands centered CTA pair.
   Mirrors the home page Final CTA's CTA component (light = filled
   cream pill, outline = transparent with hairline border). Inlined
   here rather than imported because /imprint doesn't otherwise need
   the home page page.tsx's CTA component. */
function pillStyle(variant: "light" | "outline"): React.CSSProperties {
  return {
    minHeight: "54px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 28px",
    borderRadius: "100px",
    fontSize: "15px",
    fontWeight: 500,
    letterSpacing: "0",
    background: variant === "light" ? "var(--bg-light)" : "transparent",
    color: variant === "light" ? "var(--olive)" : "var(--bg-light)",
    border: variant === "outline" ? "1px solid rgba(255, 248, 236, 0.6)" : "1px solid transparent",
    transition: "background 0.22s ease, color 0.22s ease",
  }
}
