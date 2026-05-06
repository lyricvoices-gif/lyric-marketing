import Image from "next/image"
import Link from "next/link"
import VoiceCardTicker from "@/components/VoiceCardTicker"
import VideosInAction from "@/components/VideosInAction"
import ScrollReveal from "@/components/ScrollReveal"
import SmoothAnchor from "@/components/SmoothAnchor"

// ─── Design tokens ────────────────────────────────────────────────────────────
const DARK   = "#2b2a25"
const LIGHT  = "#f5f3ef"
const GOLD   = "#c9a96e"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

// AI-native palette (hero + philosophy)
const CREAM = "#FFF8EC" // warm off-white, primary ground
const SAGE  = "#C1C17E" // sage / warm green accent
const GOLD2 = "#F3D171" // gold accent (paired with sage)
const OLIVE = "#5A5E43" // dark olive — primary text on cream

// ─── Shared style helpers ─────────────────────────────────────────────────────
const display = { fontFamily: "var(--font-display)" } as const
const accent  = { fontFamily: "var(--font-accent)" } as const
const label   = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: TEXT3,
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          1 · HERO — type-led, AI-native posture, warm off-white ground
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="lyric-hero"
        style={{
          background: CREAM,
          padding: "120px 48px 96px",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          {/* Eyebrow */}
          <ScrollReveal delay={0} display="inline-flex">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "40px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: SAGE,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  ...label,
                  color: OLIVE,
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                }}
              >
                Lyric · A point of view on voice
              </span>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={80}>
            <h1
              style={{
                ...display,
                fontSize: "clamp(48px, 6.4vw, 104px)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: OLIVE,
                margin: "0 0 40px",
                maxWidth: "1040px",
              }}
            >
              Voice{" "}
              <span
                style={{
                  ...accent,
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: OLIVE,
                }}
              >
                artistry
              </span>{" "}
              in the age of AI.
            </h1>
          </ScrollReveal>

          {/* Supporting line */}
          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: "clamp(17px, 1.4vw, 20px)",
                color: OLIVE,
                lineHeight: 1.5,
                maxWidth: "560px",
                margin: "0 0 48px",
                opacity: 0.82,
              }}
            >
              Over 75% of brands are searching for a better approach to voice AI.
              We are building it.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={240}>
            <div
              className="lyric-button-row"
              style={{ display: "flex", gap: "12px", marginBottom: "32px" }}
            >
              <SmoothAnchor
                targetId="philosophy"
                offset={32}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 26px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: OLIVE,
                  color: CREAM,
                  letterSpacing: "-0.01em",
                }}
              >
                See how we compose
                <span aria-hidden style={{ fontSize: "16px", lineHeight: 1, marginTop: "-1px" }}>
                  ↓
                </span>
              </SmoothAnchor>
              <SmoothAnchor
                targetId="philosophy"
                offset={32}
                style={{
                  padding: "14px 26px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: "transparent",
                  color: OLIVE,
                  border: `1px solid ${OLIVE}`,
                  letterSpacing: "-0.01em",
                }}
              >
                Read our point of view
              </SmoothAnchor>
            </div>
          </ScrollReveal>

          {/* Source line */}
          <ScrollReveal delay={320}>
            <p
              style={{
                ...label,
                color: OLIVE,
                opacity: 0.5,
                fontSize: "10px",
                letterSpacing: "0.14em",
                margin: 0,
              }}
            >
              Source · Voices.com / Amplify, 2024
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2 · PHILOSOPHY — manifesto / point of view
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="philosophy"
        className="lyric-section lyric-philosophy"
        style={{
          background: CREAM,
          borderTop: `1px solid rgba(90, 94, 67, 0.14)`,
          padding: "120px 48px 128px",
        }}
      >
        <div
          className="lyric-philosophy-grid"
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(180px, 1fr) minmax(0, 3fr)",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left rail: section label + accent dot */}
          <ScrollReveal>
            <div
              className="lyric-philosophy-rail"
              style={{ position: "sticky", top: "96px" }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: GOLD2,
                    flexShrink: 0,
                  }}
                />
                <span style={{ ...label, color: OLIVE, fontSize: "11px", letterSpacing: "0.14em" }}>
                  Our position
                </span>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: OLIVE,
                  opacity: 0.6,
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: "200px",
                }}
              >
                A stance on what voice AI should be.
              </p>
            </div>
          </ScrollReveal>

          {/* Editorial column */}
          <div
            className="lyric-philosophy-column"
            style={{ maxWidth: "720px" }}
          >
            {/* Manifesto pull line */}
            <ScrollReveal delay={80}>
              <p
                style={{
                  ...accent,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 4.4vw, 64px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.015em",
                  color: OLIVE,
                  margin: "0 0 56px",
                }}
              >
                Composed, not cloned.
              </p>
            </ScrollReveal>

            {/* Prose */}
            <div
              style={{
                fontSize: "clamp(17px, 1.25vw, 19px)",
                lineHeight: 1.65,
                color: OLIVE,
                letterSpacing: "-0.005em",
              }}
            >
              <ScrollReveal delay={140}>
                <p style={{ margin: "0 0 28px" }}>
                  The voice layer of AI is being treated as a commodity. We disagree.
                  Voice is craft. Voice carries intention, posture, restraint. Stripped
                  of those things, it becomes another flat surface that makes AI feel
                  cheap.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p style={{ margin: "0 0 28px" }}>
                  Lyric is built by people who have designed voices for two decades,
                  before LLMs and now alongside them. We know the difference between a
                  voice that performs and a voice that fills space. The artists we work
                  with bring the performance. They are not raw material. They own their
                  voices. They are credited for their work. They share in the revenue
                  those voices generate. That model is overdue. Music had to fight for
                  it. Voice should not have to.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={260}>
                <p style={{ margin: "0 0 28px" }}>
                  How a brand implements voice AI shapes how the public understands AI
                  itself. Done badly, it reinforces the idea that AI exists to flatten
                  and replace. Done with care, it shows the opposite. AI can carry
                  human craft rather than erase it. So we set the bar for
                  implementation. We publish how voices should be directed,
                  configured, and deployed. We hold ourselves to that standard, and we
                  share it openly, because better implementation lifts the whole
                  field.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={320}>
                <p style={{ margin: "0 0 48px" }}>
                  This is not a marketing position. It is a stance on what voice AI
                  should be. Considered. Credited. Composed.
                </p>
              </ScrollReveal>
            </div>

            {/* Closing rule + signature */}
            <ScrollReveal delay={380}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  paddingTop: "32px",
                  borderTop: `1px solid rgba(90, 94, 67, 0.18)`,
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: SAGE,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    ...label,
                    color: OLIVE,
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                  }}
                >
                  Voice artists build the voices. You compose with them.
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2 · VOICE TICKER
      ══════════════════════════════════════════════════════════════════════ */}
      <div id="mini-composer">
        <VoiceCardTicker />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          3 · WHY CHOOSE LYRIC
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="lyric-section" style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, padding: "72px 48px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ ...label, marginBottom: "44px" }}>Why choose lyric?</p>
          </ScrollReveal>

          <div
            className="lyric-grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "64px",
            }}
          >
            {[
              {
                n: "01",
                title: "Voices with a point of view",
                body: "Every voice ships with a defined archetype, emotional range, and use-case clarity. Not a voice model. A character. Captured by professional actors trained in emotional variation, not stitched from generic samples.",
              },
              {
                n: "02",
                title: "Direction before generation",
                body: "Direction is part of the product. Each voice includes intention presets and real examples. You set the intent before you write. Lyric treats direction as a constraint, not a suggestion. It performs consistently in context.",
              },
              {
                n: "03",
                title: "Built for how you work",
                body: "Creators, product teams, brands, and creatives who care about how they sound. If sound is part of how your product feels, not just what it says, Lyric fits naturally into your work.",
              },
            ].map((card, i) => (
              <ScrollReveal key={card.n} delay={i * 100}>
                <div>
                  <span
                    style={{
                      ...display,
                      fontSize: "26px",
                      fontWeight: 400,
                      color: GOLD,
                      display: "block",
                      marginBottom: "20px",
                      lineHeight: 1,
                      fontStyle: "italic",
                    }}
                  >
                    {card.n}
                  </span>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: TEXT1,
                      margin: "0 0 12px",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.5, margin: 0 }}>
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4 · EDITION 01 — transition row
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="lyric-section-tight" style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, padding: "28px 48px" }}>
        <ScrollReveal>
          <div
            className="lyric-edition-row"
            style={{
              maxWidth: "1120px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: GOLD,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "14px", color: TEXT1, letterSpacing: "-0.01em" }}>
                <strong>Edition 01</strong>
                <span style={{ color: "rgba(28,26,23,0.25)", margin: "0 10px" }}>·</span>
                <span style={{ color: TEXT2 }}>Five voices, available now</span>
              </span>
            </div>
            <Link
              href="/editions"
              style={{
                fontSize: "13px",
                color: TEXT2,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
              }}
            >
              Browse editions →
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5 · HOW IT WORKS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="lyric-section" style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, padding: "72px 48px" }}>
        <div
          className="lyric-grid-2-3"
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <ScrollReveal from="left">
            <div>
              <p style={{ ...label, marginBottom: "24px" }}>
                How it works
              </p>
              <h2
                style={{
                  ...display,
                  fontSize: "clamp(32px, 3vw, 46px)",
                  fontWeight: 600,
                  color: TEXT1,
                  margin: "0 0 20px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Choose the voice.
                <br />
                Set the intent.
                <br />
                <span style={{ color: GOLD }}>Write the line.</span>
              </h2>
              <p style={{ fontSize: "15px", color: TEXT2, lineHeight: 1.5, margin: "0 0 32px", maxWidth: "340px" }}>
                Lyric is built around direction, not prompting. Pick a voice,
                select how it should behave, and write your script. The voice
                performs consistently, in character, every time.
              </p>
              <a
                href="https://composer.lyricvoices.ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "11px 22px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: "transparent",
                  color: TEXT1,
                  border: `1px solid ${TEXT1}`,
                  letterSpacing: "-0.01em",
                }}
              >
                Try the composer
              </a>
            </div>
          </ScrollReveal>

          {/* Right: numbered steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "36px", paddingTop: "8px" }}>
            {[
              {
                n: "01",
                title: "Pick a voice",
                body: "Browse Edition 01. Five voices, each with a defined character, blurb, and sample you can play before you commit.",
              },
              {
                n: "02",
                title: "Select a variant",
                body: "Each voice has three tonal variants: Authoritative, Warm, Composed. The variant shapes how every line is performed.",
              },
              {
                n: "03",
                title: "Write and direct",
                body: "Write your script in the composer. Add inline direction marks. Generate, preview, and download in one place.",
              },
            ].map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 100}>
                <div>
                  <span
                    style={{
                      ...display,
                      fontSize: "18px",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: GOLD,
                      display: "block",
                      marginBottom: "8px",
                      lineHeight: 1,
                    }}
                  >
                    {step.n}
                  </span>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: TEXT1, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                    {step.title}
                  </p>
                  <p style={{ fontSize: "13px", color: TEXT2, lineHeight: 1.5, margin: 0 }}>
                    {step.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6 · VOICES IN ACTION
      ══════════════════════════════════════════════════════════════════════ */}
      <VideosInAction />

      {/* ══════════════════════════════════════════════════════════════════════
          7 · FULL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="lyric-cta-section"
        style={{
          background: DARK,
          padding: "72px 24px 48px",
          textAlign: "center",
        }}
      >
        <ScrollReveal>
          <h2
            style={{
              ...display,
              fontSize: "clamp(36px, 4vw, 58px)",
              fontWeight: 600,
              color: "#f5f3ef",
              margin: "0 auto 20px",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              maxWidth: "720px",
            }}
          >
            Ready to hear Lyric
            <br />
            in action?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p style={{ fontSize: "16px", color: "rgba(245,243,239,0.5)", lineHeight: 1.5, maxWidth: "380px", margin: "0 auto 36px" }}>
            Try the composer and experience how Lyric voices perform in real moments.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div className="lyric-button-row" style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap" }}>
            <a
              href="https://composer.lyricvoices.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "13px 26px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 500,
                background: "#f5f3ef",
                color: DARK,
                letterSpacing: "-0.01em",
              }}
            >
              Try the composer
            </a>
            <Link
              href="/composer"
              style={{
                padding: "13px 26px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 400,
                background: "rgba(245,243,239,0.07)",
                color: "rgba(245,243,239,0.6)",
                border: "1px solid rgba(245,243,239,0.12)",
                letterSpacing: "-0.01em",
              }}
            >
              Learn more
            </Link>
          </div>
        </ScrollReveal>

        {/* Founder row */}
        <ScrollReveal delay={240}>
          <div className="lyric-proof-row" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <div style={{ display: "flex" }}>
              {[
                                { src: "/images/brand_1.jpg", alt: "Brand photography" },
                                { src: "/images/brand_2.jpg", alt: "FLORET botanicals" },
                              ].map((img, i) => (
                              <div
                                key={img.src}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                  border: `2px solid ${DARK}`,
                                  marginLeft: i === 0 ? 0 : "-12px",
                                  background: "#d4c9bc",
                                  flexShrink: 0,
                                }}
                              >
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  width={40}
                                  height={40}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                              </div>
                            ))}
            </div>
            <p style={{ fontSize: "12px", color: "rgba(245,243,239,0.38)", margin: 0, letterSpacing: "0.01em" }}>
              ✦ Shaped by designers behind AI products at top brands.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
