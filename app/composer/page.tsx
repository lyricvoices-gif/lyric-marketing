import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import VoiceCardTicker from "@/components/VoiceCardTicker"
import AudioPlayButton from "@/components/AudioPlayButton"
import DirectionComparisons from "@/components/DirectionComparisons"

export const metadata: Metadata = {
  title: "Composer",
  description: "Give your voice a direction. Then write.",
}

const DARK   = "#2b2a25"
const LIGHT  = "#f5f3ef"
const GOLD   = "#c9a96e"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

const edition01 = [
  {
    id: "morgan",
    name: "Morgan",
    archetype: "The Anchor",
    description: "Built for the moments that need to be believed.",
    intents: ["Authoritative", "Warm", "Composed"],
    gradientFrom: "#C4977F",
    gradientTo: "#E8D5C4",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Morgan%20(sample).wav",
  },
  {
    id: "nova",
    name: "Nova",
    archetype: "The Intimist",
    description: "Built for the moments that need to be felt.",
    intents: ["Compassionate", "Encouraging", "Calm"],
    gradientFrom: "#A8B59A",
    gradientTo: "#D9DECD",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Nova_calm%20(sample).wav",
  },
  {
    id: "atlas",
    name: "Atlas",
    archetype: "The Guide",
    description: "Built for the moments that need to make sense.",
    intents: ["Patient", "Clear", "Supportive"],
    gradientFrom: "#9D9B92",
    gradientTo: "#CDC9BE",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Atlas_sample.wav",
  },
  {
    id: "riven",
    name: "Riven",
    archetype: "The Narrator",
    description: "Built for the moments that need to carry weight.",
    intents: ["Intrigue", "Tension", "Wonder"],
    gradientFrom: "#9C8275",
    gradientTo: "#C8B8AD",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Riven%20(sample).wav",
  },
  {
    id: "hex",
    name: "Hex",
    archetype: "The Wildcard",
    description: "Built for the moments that need an edge.",
    intents: ["Playful", "Ironic", "Bold"],
    gradientFrom: "#B87A5C",
    gradientTo: "#E5C4B3",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Hex%20(sample).wav",
  },
]

export default function ComposerPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          1 · HERO — dark, quiet invite, mini composer
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, paddingTop: "96px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 48px 56px", textAlign: "center" }}>
          <ScrollReveal>
            <p style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em",
              textTransform: "uppercase", color: TEXT3, marginBottom: "28px",
            }}>
              ✦ Composer
            </p>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 64px)",
              fontWeight: 500,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: LIGHT,
              margin: "0 auto",
              maxWidth: "620px",
            }}>
              Before you write the line,<br />
              set the direction.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p style={{
              fontSize: "16px",
              color: "rgba(245,243,239,0.45)",
              lineHeight: 1.7,
              marginTop: "24px",
              marginBottom: 0,
              maxWidth: "420px",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              Pick a voice. Choose an intent. Then write.
            </p>
          </ScrollReveal>
        </div>

        {/* Mini composer — full width, no padding */}
        <VoiceCardTicker />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2 · DIRECTION — the differentiator
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: "96px 48px 80px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

          {/* Header */}
          <ScrollReveal>
            <div style={{ marginBottom: "56px" }}>
              <p style={{
                fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: TEXT3, marginBottom: "20px",
              }}>
                What makes Lyric different
              </p>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                color: TEXT1,
                margin: "0 0 0",
                maxWidth: "620px",
              }}>
                Output is not the same as{" "}
                <em style={{ fontStyle: "italic", color: GOLD }}>performance.</em>
              </h2>
            </div>
          </ScrollReveal>

          {/* Three-way audio comparison */}
          <ScrollReveal delay={80}>
            <DirectionComparisons />
          </ScrollReveal>

          {/* Explanation */}
          <ScrollReveal delay={160}>
            <div style={{
              marginTop: "48px",
              paddingTop: "40px",
              borderTop: `1px solid ${BORDER}`,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}>
              <p style={{
                fontSize: "15px",
                color: TEXT2,
                lineHeight: 1.75,
                margin: 0,
              }}>
                Direction isn&apos;t a prompt modifier. It&apos;s the first decision you make. Before you
                write, you choose how the voice should carry the moment. The intent shapes the output
                in ways no amount of prompt engineering can replicate.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "Each voice ships with multiple tonal directions",
                  "Intent is set before you write, not after",
                  "The same line performs differently under each intent",
                ].map((point, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: GOLD, flexShrink: 0, marginTop: "8px",
                    }} />
                    <p style={{ fontSize: "14px", color: TEXT2, margin: 0, lineHeight: 1.6 }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3 · FIVE VOICES — dark, horizontal editorial scroll
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "80px 0 96px" }}>

        {/* Section header */}
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 48px 44px" }}>
          <ScrollReveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div>
                <p style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: TEXT3, marginBottom: "12px",
                }}>
                  Edition 01
                </p>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  color: LIGHT,
                  margin: 0,
                }}>
                  Five voices.{" "}
                  <em style={{ fontStyle: "italic", color: "rgba(245,243,239,0.4)" }}>
                    Fifteen directions.
                  </em>
                </h2>
              </div>
              <Link
                href="/editions"
                style={{
                  fontSize: "13px",
                  color: TEXT3,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                View Editions →
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Horizontal scroll */}
        <div
          className="no-scrollbar"
          style={{ overflowX: "auto", padding: "0 48px", cursor: "default" }}
        >
          <div style={{ display: "flex", gap: "12px", width: "fit-content", paddingBottom: "4px" }}>
            {edition01.map((voice, i) => (
              <ScrollReveal key={voice.id} delay={i * 60}>
                <div style={{
                  width: "280px",
                  flexShrink: 0,
                  borderRadius: "20px",
                  background: `linear-gradient(150deg, ${voice.gradientFrom}, ${voice.gradientTo})`,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "340px",
                }}>
                  {/* Top: archetype + name */}
                  <div style={{ marginBottom: "auto" }}>
                    <p style={{
                      fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "rgba(0,0,0,0.45)",
                      margin: "0 0 10px",
                    }}>
                      {voice.archetype}
                    </p>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(40px, 5vw, 56px)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.9,
                      color: "rgba(0,0,0,0.82)",
                      margin: "0 0 20px",
                    }}>
                      {voice.name}
                    </h3>
                    <p style={{
                      fontSize: "14px",
                      color: "rgba(0,0,0,0.6)",
                      lineHeight: 1.55,
                      margin: "0 0 24px",
                    }}>
                      {voice.description}
                    </p>
                  </div>

                  {/* Intent tags */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px" }}>
                    {voice.intents.map((intent) => (
                      <span key={intent} style={{
                        fontSize: "11px",
                        color: "rgba(0,0,0,0.6)",
                        background: "rgba(0,0,0,0.08)",
                        borderRadius: "100px",
                        padding: "4px 11px",
                      }}>
                        {intent}
                      </span>
                    ))}
                  </div>

                  {/* Play button */}
                  <AudioPlayButton sampleUrl={voice.sampleUrl} voiceName={voice.name} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4 · HOW DIRECTING WORKS — light, 3-step editorial with UI glimpses
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: "96px 48px 0" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

          <ScrollReveal>
            <p style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: TEXT3, marginBottom: "20px",
            }}>
              How it works
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 3.5vw, 46px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.0,
              color: TEXT1,
              margin: "0 0 64px",
              maxWidth: "540px",
            }}>
              Direction happens before<br />
              <em style={{ fontStyle: "italic" }}>you write a single word.</em>
            </h2>
          </ScrollReveal>

          {/* Three steps */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: BORDER,
            borderTop: `1px solid ${BORDER}`,
          }}>
            {/* Step 1 — Pick a voice */}
            <ScrollReveal delay={0}>
              <div style={{ background: LIGHT, padding: "48px 40px 52px" }}>
                <p style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: TEXT3, margin: "0 0 20px",
                }}>
                  Begin here
                </p>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: TEXT1,
                  margin: "0 0 12px",
                  lineHeight: 1.2,
                }}>
                  Choose the character.
                </h3>
                <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.7, margin: "0 0 40px" }}>
                  Five voices, each built for a different kind of moment. The one you choose shapes everything that follows.
                </p>

                {/* UI glimpse: voice selector */}
                <div style={{
                  background: "#1c1a17",
                  borderRadius: "16px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}>
                  <p style={{
                    fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em",
                    color: "rgba(232,227,220,0.4)", fontWeight: 600, margin: 0,
                  }}>
                    Voice
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {["Morgan", "Nova", "Atlas", "Riven", "Hex"].map((v, i) => (
                      <span key={v} style={{
                        fontSize: "12px",
                        padding: "6px 14px",
                        borderRadius: "100px",
                        border: i === 0
                          ? "1px solid rgba(232,227,220,0.7)"
                          : "1px solid rgba(232,227,220,0.18)",
                        background: i === 0 ? "rgba(232,227,220,0.1)" : "transparent",
                        color: i === 0 ? "#e8e3dc" : "rgba(232,227,220,0.4)",
                      }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 2 — Set the intent */}
            <ScrollReveal delay={80}>
              <div style={{ background: LIGHT, padding: "48px 40px 52px" }}>
                <p style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: TEXT3, margin: "0 0 20px",
                }}>
                  Then this
                </p>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: TEXT1,
                  margin: "0 0 12px",
                  lineHeight: 1.2,
                }}>
                  Set the intent.
                </h3>
                <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.7, margin: "0 0 40px" }}>
                  Each voice ships with tonal variants. Pick the emotional register before the first word.
                </p>

                {/* UI glimpse: intent selector */}
                <div style={{
                  background: "#1c1a17",
                  borderRadius: "16px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}>
                  <p style={{
                    fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em",
                    color: "rgba(232,227,220,0.4)", fontWeight: 600, margin: 0,
                  }}>
                    Voice Direction
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {["Authoritative", "Warm", "Composed"].map((intent, i) => (
                      <span key={intent} style={{
                        fontSize: "12px",
                        padding: "7px 14px",
                        borderRadius: "100px",
                        border: i === 0
                          ? "1px solid rgba(232,227,220,0.7)"
                          : "1px solid rgba(232,227,220,0.18)",
                        background: i === 0 ? "rgba(232,227,220,0.1)" : "transparent",
                        color: i === 0 ? "#e8e3dc" : "rgba(232,227,220,0.4)",
                      }}>
                        {intent}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 3 — Write */}
            <ScrollReveal delay={160}>
              <div style={{ background: LIGHT, padding: "48px 40px 52px" }}>
                <p style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: TEXT3, margin: "0 0 20px",
                }}>
                  Now write
                </p>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: TEXT1,
                  margin: "0 0 12px",
                  lineHeight: 1.2,
                }}>
                  Direct as you compose.
                </h3>
                <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.7, margin: "0 0 40px" }}>
                  Inline marks let you shift the tone mid-script. A single take can move from quiet to urgent without switching voices.
                </p>

                {/* UI glimpse: script with direction mark */}
                <div style={{
                  background: "#1c1a17",
                  borderRadius: "16px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}>
                  <p style={{
                    fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em",
                    color: "rgba(232,227,220,0.4)", fontWeight: 600, margin: 0,
                  }}>
                    Script
                  </p>
                  <div style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(232,227,220,0.15)",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "#e8e3dc",
                  }}>
                    <span style={{ color: "rgba(201,169,110,0.6)" }}>[warm]</span>{" "}
                    The work your team has done{" "}
                    <span style={{ color: "rgba(201,169,110,0.6)" }}>[/warm]</span>{" "}
                    <span style={{ color: "rgba(232,227,220,0.5)" }}>speaks for itself.</span>
                    <span
                      className="cursor-blink"
                      style={{
                        display: "inline-block",
                        width: "1.5px",
                        height: "14px",
                        background: GOLD,
                        verticalAlign: "middle",
                        marginLeft: "2px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5 · WHO LYRIC IS BUILT FOR — light, continues from step 4
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: "0 48px 96px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "64px" }}>
            <ScrollReveal>
              <p style={{
                fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: TEXT3, marginBottom: "40px",
              }}>
                Built for
              </p>
            </ScrollReveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
              {[
                {
                  audience: "Brands",
                  positioning: "For brands who know their voice is a design decision, not a setting.",
                },
                {
                  audience: "Creators",
                  positioning: "For creators who want their work to have presence, not just output.",
                },
                {
                  audience: "Product Teams",
                  positioning: "For teams building products where the voice is part of how it works.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.audience} delay={i * 80}>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "26px",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: TEXT1,
                      margin: "0 0 12px",
                    }}>
                      {item.audience}
                    </h3>
                    <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.7, margin: 0 }}>
                      {item.positioning}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6 · SECOND MINI COMPOSER — dark CTA with full product
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, paddingTop: "80px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 48px 56px", textAlign: "center" }}>
          <ScrollReveal>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 46px)",
              fontWeight: 600,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: LIGHT,
              margin: "0 auto 20px",
              maxWidth: "560px",
            }}>
              The only way to understand direction is to use it.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <p style={{
              fontSize: "15px",
              color: "rgba(245,243,239,0.4)",
              lineHeight: 1.6,
              margin: 0,
            }}>
              Pick a voice below. Set the intent. Write something real.
            </p>
          </ScrollReveal>
        </div>

        {/* Second mini composer — full width */}
        <VoiceCardTicker />

        {/* Pricing nudge */}
        <div style={{ textAlign: "center", padding: "24px 48px 48px" }}>
          <p style={{ fontSize: "13px", color: "rgba(245,243,239,0.3)", margin: 0 }}>
            Want unlimited generations and downloads?{" "}
            <Link
              href="/pricing"
              style={{ color: GOLD, fontWeight: 500 }}
            >
              View pricing →
            </Link>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7 · PRE-FOOTER CTA — matches home / about / pricing / editions
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "72px 24px 48px", textAlign: "center" }}>
        <ScrollReveal>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 4vw, 58px)",
            fontWeight: 600,
            color: LIGHT,
            margin: "0 auto 20px",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            maxWidth: "720px",
          }}>
            Ready to hear Lyric
            <br />in action?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p style={{
            fontSize: "16px", color: "rgba(245,243,239,0.5)",
            lineHeight: 1.5, maxWidth: "380px", margin: "0 auto 36px",
          }}>
            Try the composer and experience how Lyric voices perform in real moments.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "40px" }}>
            <a
              href="https://composer.lyricvoices.ai"
              style={{
                padding: "13px 26px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 500,
                background: LIGHT,
                color: DARK,
                letterSpacing: "-0.01em",
              }}
            >
              Try the composer
            </a>
            <Link
              href="/pricing"
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
              View pricing
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    overflow: "hidden", border: `2px solid ${DARK}`,
                    marginLeft: n === 1 ? 0 : "-10px",
                    background: "#d4c9bc", flexShrink: 0,
                  }}
                >
                  <Image
                    src={`/images/founders_${n}.webp`}
                    alt=""
                    width={36}
                    height={36}
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
