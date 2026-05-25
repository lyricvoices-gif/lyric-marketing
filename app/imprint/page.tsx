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

      {/* Section 3 — How we work with artists */}
      <section
        style={{
          padding: "96px 24px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="For artists" />
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
              How we work with <em>artists</em>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: C.text,
                opacity: 0.78,
                margin: "0 0 56px",
                maxWidth: "640px",
              }}
            >
              The partnership is built on the NAVA framework. Consent,
              control, compensation. The full agreement lives at the
              Artist Partnership.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            <PrincipleBlock
              label="Consent"
              body="Voice artists join the Imprint as creative partners. Every aspect of the partnership requires informed, documented consent. Artists review the full agreement before any session begins."
            />
            <PrincipleBlock
              label="Control"
              body="The voice belongs to the artist. Lyric stewards the technical implementation under license, with the artist retaining rights to their voice, identity, name, likeness, and performance throughout the partnership and beyond it."
            />
            <PrincipleBlock
              label="Compensation"
              body="Artists receive studio session rates plus ongoing royalties on every commercial deployment of their voice. Royalties are not capped. Compensation continues for the lifetime of the voice's commercial use."
            />
          </div>

          <ScrollReveal delay={420}>
            <Link href="/imprint/agreement" className="lv-link-cta">
              Read the full Artist Partnership{" "}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4 — How brands license voices */}
      <section
        style={{
          padding: "96px 24px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="For brands" />
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
              How brands <em>license</em> voices.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: C.text,
                opacity: 0.78,
                margin: "0 0 56px",
                maxWidth: "640px",
              }}
            >
              Three licensing tiers, each designed for a different
              commercial need.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            <PrincipleBlock
              label="Non-exclusive"
              body="The voice can be licensed to multiple non-competing brands simultaneously. Best for utility deployments, content production, and broad commercial use."
            />
            <PrincipleBlock
              label="Industry-exclusive"
              body="The voice is exclusive within a specific industry vertical for the term of the agreement. Best for brands seeking differentiation within their category."
            />
            <PrincipleBlock
              label="Brand-exclusive"
              body="The voice is used exclusively by one brand globally. Premium tier for brands building a signature sonic identity."
            />
          </div>

          <ScrollReveal delay={420}>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: C.text,
                opacity: 0.78,
                margin: "0 0 18px",
                maxWidth: "640px",
              }}
            >
              Every licensed voice comes with access to{" "}
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
            <Link href="/opus" className="lv-link-cta">
              Learn about Opus <span aria-hidden="true">&rarr;</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 5 — Two paths forward */}
      <section
        style={{
          padding: "96px 24px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="Two paths forward" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 500,
                lineHeight: 1.06,
                color: C.olive,
                margin: "0 0 56px",
                maxWidth: "640px",
              }}
            >
              Pick the path that fits.
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            <PathCard
              label="For artists"
              headline="Apply to the Imprint."
              body="We are currently recruiting Edition 02 voice artists internationally. Sessions begin Q3 2026."
              ctaHref="/imprint/apply"
              ctaLabel="Apply now"
            />
            <PathCard
              label="For brands"
              headline="License from the Imprint."
              body="Build a sonic identity with a Lyric voice. Industry exclusivity, brand exclusivity, and non-exclusive licensing tiers available."
              ctaHref="/imprint/license"
              ctaLabel="Inquire about licensing"
            />
          </div>
        </div>
      </section>

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
                fontSize: "clamp(22px, 2.8vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.4,
                color: C.olive,
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

function PrincipleBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
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
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.7,
          color: C.text,
          opacity: 0.82,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  )
}

function PathCard({
  label,
  headline,
  body,
  ctaHref,
  ctaLabel,
}: {
  label: string
  headline: string
  body: string
  ctaHref: string
  ctaLabel: string
}) {
  return (
    <div
      style={{
        padding: "40px 36px 36px",
        background: "rgba(90, 94, 67, 0.04)",
        border: `1px solid ${C.border}`,
        borderRadius: "10px",
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
          margin: "0 0 18px",
        }}
      >
        {label}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(24px, 2.6vw, 30px)",
          fontWeight: 500,
          lineHeight: 1.1,
          color: C.olive,
          margin: "0 0 18px",
        }}
      >
        {headline}
      </h3>
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.65,
          color: C.text,
          opacity: 0.82,
          margin: "0 0 28px",
        }}
      >
        {body}
      </p>
      <Link href={ctaHref} className="lv-link-cta">
        {ctaLabel} <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  )
}
