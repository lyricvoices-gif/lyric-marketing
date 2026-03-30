"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

// ─── Design tokens ────────────────────────────────────────────────────────────
const DARK   = "#2b2a25"
const LIGHT  = "#f5f3ef"
const GOLD   = "#c9a96e"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

const display = { fontFamily: "var(--font-display)" } as const
const label = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: TEXT3,
}

// ─── Voice samples (from Edition 01) ──────────────────────────────────────────

const voiceSamples = [
  {
    name: "Morgan",
    archetype: "The Anchor",
    gradient: ["#C4977F", "#E8D5C4"],
    sampleUrl:
      "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Morgan%20(sample).wav",
    quote:
      "This decision isn't just strategic. It's the one that changes the trajectory of everything that follows.",
    use: "Enterprise, finance, and high-trust brand narration",
  },
  {
    name: "Nova",
    archetype: "The Intimist",
    gradient: ["#A8B59A", "#D9DECD"],
    sampleUrl:
      "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Nova_calm%20(sample).wav",
    quote:
      "You are not alone in this. Whatever you are carrying right now, I hear you.",
    use: "Wellness, coaching, and human-centered brands",
  },
  {
    name: "Riven",
    archetype: "The Narrator",
    gradient: ["#9C8275", "#C8B8AD"],
    sampleUrl:
      "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Riven%20(sample).wav",
    quote: "No one knew what had been buried there. Not yet.",
    use: "Brand films, audiobooks, and documentary storytelling",
  },
]

// ─── Inline audio player ──────────────────────────────────────────────────────

function VoiceSamplePlayer({
  voice,
}: {
  voice: (typeof voiceSamples)[number]
}) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const frameRef = React.useRef<number>(0)

  const toggle = () => {
    if (!audioRef.current) {
      const a = new Audio(voice.sampleUrl)
      audioRef.current = a
      a.onended = () => {
        setIsPlaying(false)
        setProgress(0)
      }
    }
    const a = audioRef.current
    if (a.paused) {
      a.play()
      setIsPlaying(true)
      const tick = () => {
        if (!a.paused && a.duration) {
          setProgress(a.currentTime / a.duration)
        }
        frameRef.current = requestAnimationFrame(tick)
      }
      tick()
    } else {
      a.pause()
      setIsPlaying(false)
      cancelAnimationFrame(frameRef.current)
    }
  }

  React.useEffect(() => {
    return () => {
      audioRef.current?.pause()
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${voice.gradient[0]}, ${voice.gradient[1]})`,
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Top: archetype + name */}
      <div>
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.45)",
            margin: "0 0 6px",
          }}
        >
          Edition 01 · {voice.name}
        </p>
        <p
          style={{
            ...display,
            fontSize: "22px",
            fontWeight: 400,
            color: "rgba(0,0,0,0.85)",
            margin: "0 0 4px",
            lineHeight: 1.2,
          }}
        >
          {voice.name} · {voice.archetype}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "rgba(0,0,0,0.5)",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {voice.use}
        </p>
      </div>

      {/* Quote */}
      <p
        style={{
          ...display,
          fontSize: "16px",
          fontStyle: "italic",
          color: "rgba(0,0,0,0.7)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        &ldquo;{voice.quote}&rdquo;
      </p>

      {/* Player controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={toggle}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "rgba(0,0,0,0.22)",
            color: "rgba(0,0,0,0.8)",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        {/* Progress bar */}
        <div
          style={{
            flex: 1,
            height: "3px",
            backgroundColor: "rgba(0,0,0,0.12)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              backgroundColor: "rgba(0,0,0,0.45)",
              borderRadius: "2px",
              transition: isPlaying ? "none" : "width 0.3s ease",
            }}
          />
        </div>

        <span
          style={{
            fontSize: "11px",
            color: "rgba(0,0,0,0.4)",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          Sample
        </span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArtistStory() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: "104px 48px 72px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ marginBottom: "32px" }}>
              <Link
                href="/stories"
                style={{
                  fontSize: "13px",
                  color: TEXT3,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                ← Stories
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={40}>
            <p style={{ ...label, color: GOLD, marginBottom: "20px" }}>
              Voice & Craft
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              style={{
                ...display,
                fontSize: "clamp(36px, 5vw, 58px)",
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: TEXT1,
                margin: "0 0 24px",
              }}
            >
              The artists behind
              <br />
              <em style={{ fontStyle: "italic" }}>the voice.</em>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: "17px",
                color: TEXT2,
                lineHeight: 1.7,
                margin: "0 0 24px",
                maxWidth: "520px",
              }}
            >
              Every Lyric voice begins with a real performance. Not a dataset.
              Not a clone. A professional actor, in a studio, making choices
              about how a line should feel.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p style={{ fontSize: "13px", color: TEXT3 }}>March 2026</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          THE DIFFERENCE — opening statement
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: LIGHT,
          borderTop: `1px solid ${BORDER}`,
          padding: "72px 48px",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <ScrollReveal>
            <h2
              style={{
                ...display,
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: TEXT1,
                margin: "0 0 32px",
              }}
            >
              Not a voice model.{" "}
              <span style={{ color: GOLD }}>A character.</span>
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
            }}
          >
            <ScrollReveal delay={60}>
              <p
                style={{
                  fontSize: "15px",
                  color: TEXT2,
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                Most AI voice platforms start with data. They collect recordings,
                feed them into a model, and generate output that sounds close
                enough. The voice becomes a file. The actor becomes a sample.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p
                style={{
                  fontSize: "15px",
                  color: TEXT2,
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                Lyric starts differently. We begin with a character: an
                archetype with emotional range, tonal intent, and use-case
                clarity. Then we find the actor who can bring that character to
                life. The performance comes first. The technology follows.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PULL QUOTE
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "72px 48px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal>
            <p
              style={{
                ...display,
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.3,
                color: "#f5f3ef",
                margin: "0 0 20px",
                letterSpacing: "-0.01em",
              }}
            >
              &ldquo;We don&apos;t cast voices. We cast performers. There&apos;s
              a difference between someone who can read a line and someone who
              can inhabit it.&rdquo;
            </p>
            <p style={{ fontSize: "13px", color: "rgba(245,243,239,0.4)", margin: 0 }}>
              Lyric Creative Team
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          THE PROCESS
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: "72px 48px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ ...label, marginBottom: "24px" }}>The process</p>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <h2
              style={{
                ...display,
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: TEXT1,
                margin: "0 0 48px",
              }}
            >
              Designed, not generated.
            </h2>
          </ScrollReveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {[
              {
                n: "01",
                title: "Character design",
                body: "Every Edition starts with a character brief. Before anyone enters a studio, Lyric defines the archetype, its emotional range, tonal boundaries, and the contexts it was designed for. Morgan isn't just a 'confident male voice.' Morgan is The Anchor: decisive authority for enterprise, finance, and high-trust narration.",
              },
              {
                n: "02",
                title: "Casting with intent",
                body: "We work with professional voice actors, not data contributors. These are performers with training in emotional variation, pacing, and restraint. We cast for the character, not just the sound. The actor needs to understand not only how the voice should feel, but why.",
              },
              {
                n: "03",
                title: "Directed recording sessions",
                body: "Recording sessions are directed, not scripted-and-read. Each actor performs across the full emotional range of their character: multiple variants, multiple intentions, multiple contexts. The result is a performance library, not a dataset.",
              },
              {
                n: "04",
                title: "Voice as a system",
                body: "The recordings become a voice system. Each voice ships with defined variants (Authoritative, Warm, Composed) that shape how every line is performed. The direction is built in. When you choose a variant, you're not tweaking a slider. You're selecting a performance mode.",
              },
            ].map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 80}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr",
                    gap: "24px",
                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      ...display,
                      fontSize: "24px",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: GOLD,
                      lineHeight: 1,
                      paddingTop: "2px",
                    }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: TEXT1,
                        margin: "0 0 10px",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        color: TEXT2,
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HEAR THE DIFFERENCE — voice samples
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: LIGHT,
          borderTop: `1px solid ${BORDER}`,
          padding: "72px 48px",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ ...label, marginBottom: "24px" }}>
              Hear the difference
            </p>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <h2
              style={{
                ...display,
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: TEXT1,
                margin: "0 0 16px",
              }}
            >
              Three characters.{" "}
              <span style={{ color: GOLD }}>Three intentions.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p
              style={{
                fontSize: "15px",
                color: TEXT2,
                lineHeight: 1.7,
                margin: "0 0 48px",
                maxWidth: "520px",
              }}
            >
              Each voice in Edition 01 was performed by a professional actor and
              designed for specific creative contexts. Press play and hear what
              intention sounds like.
            </p>
          </ScrollReveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {voiceSamples.map((voice, i) => (
              <ScrollReveal key={voice.name} delay={i * 80}>
                <VoiceSamplePlayer voice={voice} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WHY IT MATTERS — philosophy
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "72px 48px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <ScrollReveal>
            <p
              style={{
                ...label,
                color: "rgba(245,243,239,0.3)",
                marginBottom: "24px",
              }}
            >
              Why it matters
            </p>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <h2
              style={{
                ...display,
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#f5f3ef",
                margin: "0 0 40px",
              }}
            >
              Respect for the craft.
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
            }}
          >
            <ScrollReveal delay={80}>
              <div>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(245,243,239,0.6)",
                    lineHeight: 1.8,
                    margin: "0 0 24px",
                  }}
                >
                  The voice industry is at an inflection point. AI has made it
                  possible to generate speech that sounds human. But sounding
                  human and performing like one are not the same thing.
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(245,243,239,0.6)",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  A generated voice can deliver a line. A performed voice can
                  carry a moment. That distinction matters when the voice is
                  representing your brand, guiding your user, or telling your
                  story.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(245,243,239,0.6)",
                    lineHeight: 1.8,
                    margin: "0 0 24px",
                  }}
                >
                  Lyric compensates its voice artists fairly and transparently.
                  Every actor receives direct payment for their recorded
                  performance. There is no data scraping. No unauthorized
                  cloning. No ambiguity about how their work is used.
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(245,243,239,0.6)",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  We believe AI voice technology should create new opportunities
                  for actors, not eliminate them. When a Lyric voice performs
                  well, the artist behind it benefits directly.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CLOSING — what's different
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: LIGHT,
          padding: "72px 48px",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <ScrollReveal>
            <h2
              style={{
                ...display,
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: TEXT1,
                margin: "0 0 32px",
              }}
            >
              What makes this different.
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {[
              {
                point: "Professional actors, not data contributors",
                detail:
                  "Every Lyric voice is performed by a trained actor with experience in emotional variation, pacing, and intent.",
              },
              {
                point: "Character-first design",
                detail:
                  "Voices are designed as characters with defined archetypes, emotional ranges, and use-case clarity before any recording begins.",
              },
              {
                point: "Direction built in",
                detail:
                  "Each voice includes performance variants, not sliders. You choose a mode, not a number.",
              },
              {
                point: "Fair, transparent compensation",
                detail:
                  "Artists are paid directly for their performances. Their work is used with full consent and clear terms.",
              },
              {
                point: "Performance, not replication",
                detail:
                  "Lyric doesn't clone voices. It captures performances and builds systems that respect the craft behind them.",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div
                  style={{
                    padding: "24px 0",
                    borderBottom: `1px solid ${BORDER}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: TEXT1,
                      margin: "0 0 6px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.point}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: TEXT2,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
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
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 600,
              color: "#f5f3ef",
              margin: "0 auto 20px",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              maxWidth: "600px",
            }}
          >
            Hear the voices
            <br />
            for yourself.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(245,243,239,0.5)",
              lineHeight: 1.5,
              maxWidth: "380px",
              margin: "0 auto 36px",
            }}
          >
            Try the composer. Pick a voice. Set the intent. Write a line and
            hear what intentional sound feels like.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <a
              href="https://composer.lyricvoices.ai"
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
              href="/editions"
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
              Browse Edition 01
            </Link>
          </div>
        </ScrollReveal>

        {/* Founder row */}
        <ScrollReveal delay={240}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "40px" }}>
            <div style={{ display: "flex" }}>
              {[
                                { src: "/images/brand_1.jpg", alt: "Brand photography" },
                                { src: "/images/brand_2.jpg", alt: "FLORET botanicals" },
                              ].map((img, i) => (
                              <div
                                key={img.src}
                                style={{
                                  width: "48px",
                                  height: "48px",
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
                                  width={48}
                                  height={48}
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
