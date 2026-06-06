/* Score product page — performance-grade voice datasets for AI labs
   and researchers. Positioned for a fundamentally different audience
   than Imprint/Opus (engineers, ML researchers, procurement teams),
   but the visual register stays the same: warm editorial cream ground,
   sage-dot eyebrows, Cormorant Garamond display, restrained section
   pacing. The defensible-sourcing section is the strategic anchor. */

import type { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import ScrollHighlightText from "@/components/ScrollHighlightText"

export const metadata: Metadata = {
  title: "Score",
  description:
    "Score is Lyric's voice dataset product. Performance-grade, defensibly sourced, built from real artist sessions on the imprint.",
}

const C = {
  bg: "var(--bg-light)",
  text: "var(--text-1)",
  olive: "var(--olive)",
  border: "var(--border)",
  gold: "var(--gold)",
  sage: "var(--sage)",
}

export default function ScorePage() {
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
            <Eyebrow label="Score" />
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
              <em>Score</em>.
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
              }}
            >
              Performance-grade voice datasets.
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
              Score is Lyric's voice dataset product, built from real
              voice artist sessions on the imprint. Every dataset is
              defensibly sourced, with full consent documentation,
              performance metadata, and the directed emotional range that
              frontier voice models need.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2 — What's in a dataset */}
      <PageSection eyebrow="The dataset" headline="What's in a Score dataset.">
        <List
          items={[
            "Anchor passages recorded with consistent direction and acoustic conditions",
            "Directed emotional range across a defined taxonomy",
            "Full performance metadata: voice, take, emotion, duration, consent provenance",
            "Clean, studio-quality audio with documented technical specifications",
            "Complete consent chain from voice artist to dataset license",
            "Optional supplementary recordings for specific use cases (multilingual, edge cases, prosodic variations)",
          ]}
        />
      </PageSection>

      {/* Section 3 — Defensibly sourced */}
      <section
        style={{
          padding: "96px 24px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="Why provenance matters" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 500,
                lineHeight: 1.06,
                color: C.olive,
                margin: "0 0 28px",
                maxWidth: "720px",
              }}
            >
              Every voice is defensibly sourced.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: C.text,
                opacity: 0.82,
                margin: 0,
                maxWidth: "720px",
              }}
            >
              Every voice in Score comes from a Lyric imprint artist who
              consented to dataset licensing as part of their partnership.
              Artists are compensated for dataset use separately from
              voice licensing. No scraped audio. No unattributed
              performances. No legally ambiguous training data. Every
              dataset is built to withstand the procurement, legal, and
              ethical scrutiny that frontier AI labs increasingly require.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4 — Use cases */}
      <PageSection eyebrow="Use cases" headline="Where Score datasets are used.">
        <List
          items={[
            "Training and fine-tuning voice models with consented performance data",
            "Benchmarking voice model performance against directed human references",
            "Building emotion-aware voice systems with structured emotional taxonomy",
            "Research on voice quality, prosody, and emotional expression",
            "Multilingual and accented voice model development",
          ]}
        />
      </PageSection>

      {/* Section 5 — Licensing */}
      <PageSection eyebrow="Licensing" headline="How Score is licensed.">
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.75,
            color: C.text,
            opacity: 0.82,
            margin: 0,
          }}
        >
          Score datasets are licensed under custom agreements based on
          scope, exclusivity, and intended use. Lyric works directly with
          AI labs and research institutions to structure dataset licenses
          that meet both technical requirements and ethical standards.
        </p>
      </PageSection>

      {/* Section 6 — Inquiry path */}
      <PageSection eyebrow="Inquiry path" headline="How to start a conversation.">
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.75,
            color: C.text,
            opacity: 0.82,
            margin: "0 0 18px",
          }}
        >
          To inquire about Score, contact{" "}
          <a
            href="mailto:info@lyricvoices.ai?subject=Score%20Inquiry"
            style={{
              color: C.olive,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            info@lyricvoices.ai
          </a>{" "}
          with the subject line &ldquo;Score Inquiry.&rdquo; Please
          include your organization, intended use case, and any technical
          specifications.
        </p>
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: C.text,
            opacity: 0.78,
            margin: 0,
          }}
        >
          We respond within 2 business days.
        </p>
      </PageSection>

      {/* Section 7 — Closing */}
      <section style={{ padding: "120px 24px" }}>
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
              fontSize: "clamp(22px, 2.8vw, 30px)",
              fontWeight: 400,
              lineHeight: 1.4,
              color: C.olive,
              margin: 0,
            }}
          >
            The voice AI industry runs on training data. Lyric believes
            that data should come from real performances by real
            artists, with real consent and real compensation. Score is
            the result.
          </ScrollHighlightText>
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
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
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
