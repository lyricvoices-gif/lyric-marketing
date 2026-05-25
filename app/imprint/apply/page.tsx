/* Imprint application page — transactional surface for voice artists
   who have decided to apply. Brief, focused, action-oriented. Routes
   from the /imprint "Two paths forward" CTA and the footer "For
   partners" column. The Edition 02 selection date is a concrete
   commitment (mid-June 2026) so the page is ship-ready without
   open placeholders. */

import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Apply to the Imprint",
  description:
    "Apply to join Edition 02 of the Lyric voice imprint. Sessions begin Q3 2026.",
}

const C = {
  bg: "var(--bg-light)",
  text: "var(--text-1)",
  olive: "var(--olive)",
  border: "var(--border)",
  gold: "var(--gold)",
  sage: "var(--sage)",
}

export default function ImprintApplyPage() {
  return (
    <main style={{ background: C.bg, color: C.text }}>
      {/* Section 1 — Hero */}
      <section
        style={{
          padding: "140px 24px 80px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="For artists" />
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
              Apply to the <em>Imprint</em>.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "19px",
                lineHeight: 1.5,
                color: C.olive,
                opacity: 0.86,
                margin: "0 0 28px",
              }}
            >
              Edition 02 is now recruiting internationally. Sessions begin
              Q3 2026.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={320}>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: C.text,
                opacity: 0.78,
                margin: "0 0 24px",
              }}
            >
              Lyric is recruiting two to three professional voice artists
              to join Edition 02. Before applying, we encourage you to
              read the full Artist Partnership and hear our Edition 01
              voices.
            </p>
            <p style={{ margin: "12px 0", display: "flex", flexWrap: "wrap", gap: "24px" }}>
              <Link href="/imprint/agreement" className="lv-link-cta">
                Read the Artist Partnership{" "}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/imprint#roster" className="lv-link-cta">
                Hear Edition 01 <span aria-hidden="true">&rarr;</span>
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2 — What we're looking for */}
      <PageSection eyebrow="The fit" headline="What we're looking for.">
        <List
          items={[
            "Professional voice talent with broadcast, narration, commercial, or audiobook experience",
            "Strong emotional range and the ability to take direction in a studio setting",
            "Distinctive vocal character. We are building voice identities, not generic readers.",
            "Comfort with the AI voice industry and an interest in shaping how it develops ethically",
            "Available for multiple studio sessions over a 4 to 6 week production window",
            "Voice artists from any country are welcome to apply",
          ]}
        />
      </PageSection>

      {/* Section 3 — What to submit */}
      <PageSection eyebrow="The submission" headline="What to submit.">
        <List
          items={[
            "A demo reel of 3 to 5 minutes",
            "A brief introduction about yourself and your voice work",
            "Any questions about the partnership structure or terms",
          ]}
        />
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: C.text,
            opacity: 0.82,
            margin: "28px 0 0",
          }}
        >
          Send applications to{" "}
          <a
            href="mailto:info@lyricvoices.ai?subject=Imprint%20Application%3A%20Edition%2002"
            style={{
              color: C.olive,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            info@lyricvoices.ai
          </a>{" "}
          with the subject line &ldquo;Imprint Application: Edition 02.&rdquo;
        </p>
      </PageSection>

      {/* Section 4 — What to expect */}
      <PageSection eyebrow="The process" headline="What to expect.">
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.75,
            color: C.text,
            opacity: 0.82,
            margin: 0,
          }}
        >
          We respond to every submission within 5 business days. Shortlisted
          applicants will be invited to an initial conversation, followed
          by a paid sample session if both parties want to move forward.
          Edition 02 final selections will be made by mid-June 2026, in
          time for the Q3 production window.
        </p>
      </PageSection>

      {/* Section 5 — Closing */}
      <section style={{ padding: "120px 24px" }}>
        <div
          style={{
            maxWidth: "640px",
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
              We are not a marketplace. We are a curated imprint, and we
              work with each artist as a creative partner. If our model
              speaks to you, we look forward to hearing from you.
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
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
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
