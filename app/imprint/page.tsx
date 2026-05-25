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
                margin: "0 0 28px",
                maxWidth: "640px",
                fontWeight: 400,
              }}
            >
              Curated AI voice identities, built with real voice artists.
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
                <Link href="/imprint/agreement" className="lv-link-cta">
                  Read the full Artist Partnership{" "}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
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
          Dark olive ground (matches the home page Products section)
          gives the brand/licensing story commercial weight. Same
          two-column anchor + numbered list pattern as the artist
          section, mirrored visually by the inverted color register. */}
      <section
        style={{
          background: "#2b2a25",
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
                <DarkEyebrow label="For brands" />
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
                  How brands <em>license</em> voices.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={220}>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "rgba(255, 248, 236, 0.78)",
                    margin: "0 0 18px",
                  }}
                >
                  Three licensing tiers, each designed for a different
                  commercial need. Every licensed voice comes with access
                  to{" "}
                  <Link
                    href="/opus"
                    style={{
                      color: C.bg,
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    Opus
                  </Link>
                  , our enterprise creative environment for directing
                  performances and configuring voice parameters for
                  deployment.
                </p>
                <Link href="/opus" className="lv-link-cta">
                  Learn about Opus <span aria-hidden="true">&rarr;</span>
                </Link>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={320}>
              <NumberedList
                items={[
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
                ]}
                onDark={true}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 5 — Two paths forward.
          Cream ground sits between the dark sections above and the
          dark closing below, giving the conversion choice point room
          to breathe. The earlier PathCard treatment (card frames,
          body paragraphs, eyebrow + italic headline + body + CTA) read
          as SaaS and triple-stated content sections 3 and 4 already
          covered. New treatment is editorial two-column with just a
          label, an italic display headline, and a single arrow CTA.
          Hairline top borders on each column echo the numbered-list
          rule pattern from sections 3 and 4 without re-using cards. */}
      <section style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="Two paths forward" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.4vw, 52px)",
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: "-0.005em",
                color: C.olive,
                margin: "0 0 64px",
                maxWidth: "640px",
              }}
            >
              Pick the path that fits.
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "64px",
            }}
          >
            <ScrollReveal delay={220}>
              <PathLine
                label="For artists"
                headline={
                  <>
                    Apply to the <em>Imprint</em>.
                  </>
                }
                ctaHref="/imprint/apply"
                ctaLabel="Apply now"
              />
            </ScrollReveal>
            <ScrollReveal delay={320}>
              <PathLine
                label="For brands"
                headline={
                  <>
                    License from the <em>Imprint</em>.
                  </>
                }
                ctaHref="/imprint/license"
                ctaLabel="Inquire about licensing"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 6 — Closing.
          Dark olive ground as the editorial bookend, matching the home
          page's Final CTA chapter-break pattern. The closing line in
          italic display reads as the page's emotional close. */}
      <section
        style={{
          background: "#2b2a25",
          color: C.bg,
          padding: "144px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <ScrollReveal>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(24px, 3vw, 34px)",
                fontWeight: 400,
                lineHeight: 1.36,
                color: C.bg,
                margin: 0,
              }}
            >
              Voice is not a commodity. Voice is artistry. The Imprint
              exists because voice artists deserve what music artists
              fought for: attribution, rights, ongoing compensation. We
              built Lyric to be the model the industry needs.
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

/* Numbered list with hairline separators, layout-mirrored from the
   "Breaking down what we do" reference: item body left, index right.
   Used in /imprint's For artists and For brands sections as the right
   column of the two-column anchor grid. Color tokens flip between
   cream-on-sage (onDark=false) and cream-on-dark (onDark=true) so the
   pattern reads on both grounds. */
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
            gridTemplateColumns: "1fr auto",
            gap: "32px",
            alignItems: "start",
            padding: "26px 0",
            borderTop: i === 0 ? `1px solid ${ruleColor}` : "none",
            borderBottom: `1px solid ${ruleColor}`,
          }}
        >
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
function PathLine({
  label,
  headline,
  ctaHref,
  ctaLabel,
}: {
  label: string
  headline: React.ReactNode
  ctaHref: string
  ctaLabel: string
}) {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "32px" }}>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: C.olive,
          opacity: 0.7,
          margin: "0 0 16px",
        }}
      >
        {label}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(26px, 3vw, 36px)",
          fontWeight: 500,
          lineHeight: 1.08,
          color: C.olive,
          margin: "0 0 24px",
        }}
      >
        {headline}
      </h3>
      <Link href={ctaHref} className="lv-link-cta">
        {ctaLabel} <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  )
}
