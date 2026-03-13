import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import AudioPlayButton from "@/components/AudioPlayButton"
import FaqAccordion from "@/components/FaqAccordion"

export const metadata: Metadata = {
  title: "Editions",
  description: "A curated release of voices, composed with intention.",
}

const DARK   = "#2b2a25"
const LIGHT  = "#f5f3ef"
const GOLD   = "#c9a96e"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

const voices = [
  {
    id: "morgan",
    name: "Morgan",
    archetype: "The Anchor",
    gender: "Her",
    image: "/images/editions_1.jpg",
    description:
      "Morgan is designed for moments that require warmth, authority, and trust. Her voice maintains credibility across podcasts, brand storytelling, and service experiences, staying composed as context shifts and ensuring every interaction feels intentional rather than transactional.",
    useCases: ["Podcast & Content Hosting", "Professional Brand Voice", "Hospitality & Service"],
    intents: ["Authoritative", "Warm", "Composed"],
    sample: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Morgan%20(sample).wav",
  },
  {
    id: "nova",
    name: "Nova",
    archetype: "The Intimist",
    gender: "His",
    image: "/images/editions_2.webp",
    description:
      "Nova is designed for moments that require presence, emotional safety, and authentic care. His voice creates space for reflection without rushing, holding intimacy across meditations, wellness guidance, and personal narratives while ensuring every word feels grounding rather than prescriptive.",
    useCases: ["Meditation & Wellness", "Personal Brand Storytelling", "Therapeutic Content"],
    intents: ["Compassionate", "Encouraging", "Calm"],
    sample: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Nova_calm%20(sample).wav",
  },
  {
    id: "atlas",
    name: "Atlas",
    archetype: "The Guide",
    gender: "His",
    image: "/images/editions_3 (callout).webp",
    description:
      "Atlas is designed for moments that require clarity, patience, and credibility. His voice maintains accessibility across tutorials, training modules, and educational content, staying composed as complexity increases and ensuring every explanation feels supportive rather than condescending.",
    useCases: ["E-Learning & Training", "Tutorial Content", "Product Education"],
    intents: ["Patient", "Clear", "Supportive"],
    sample: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Atlas_sample.wav",
  },
  {
    id: "riven",
    name: "Riven",
    archetype: "The Narrator",
    gender: "Her",
    image: "/images/editions_4.avif",
    description:
      "Riven is designed for moments that require depth, texture, and narrative weight. Her voice carries emotional arc across fiction, documentary, and character work, maintaining engagement as stories unfold and ensuring every scene feels transportive rather than performed.",
    useCases: ["Fiction & Audiobooks", "Documentary Narration", "Character & Game Voice"],
    intents: ["Intrigue", "Tension", "Wonder"],
    sample: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Riven%20(sample).wav",
  },
  {
    id: "hex",
    name: "Hex",
    archetype: "The Wildcard",
    gender: "Her",
    image: "/images/editions_5.webp",
    description:
      "Hex is designed for moments that require edge, personality, and tonal agility. Her voice shifts seamlessly across brand content, gaming, and experimental work, maintaining authenticity as tone pivots and ensuring every word feels genuine rather than calculated.",
    useCases: ["Independent Content Creators", "Emerging Creator Brands", "Commentary & Analysis Content"],
    intents: ["Playful", "Ironic", "Bold"],
    sample: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Hex%20(sample).wav",
  },
]

const editionFaqs = [
  {
    q: "What is an Edition?",
    a: "An Edition is a curated, finite release of AI voices — each built with a defined purpose, performed by a professional actor, and shipped with direction built in. Rather than an overwhelming catalog, each Edition is a considered collection.",
  },
  {
    q: "How are the voices different from other AI voices?",
    a: "Most AI voices are optimized for realism. Lyric voices are optimized for performance. Each voice has a defined archetype, emotional range, and use-case clarity — so they behave consistently and intentionally, not just accurately.",
  },
  {
    q: "Can I try a voice before subscribing?",
    a: "Yes. The Lyric mini composer on our home page is free to use and lets you hear every Edition 01 voice in real moments before committing to a plan.",
  },
  {
    q: "What are tonal variants?",
    a: "Each Lyric voice ships with multiple tonal variants — preset emotional registers like warm, urgent, or measured — that let you shape how a voice performs without adjusting sliders. The intent comes first; the output follows.",
  },
  {
    q: "When will Edition 02 be available?",
    a: "Edition 02 is currently in development. If you'd like early access or want to be notified when it's ready, reach out at hi@lyricvoices.ai.",
  },
  {
    q: "Can I use Lyric voices commercially?",
    a: "Creator and Studio plans include commercial rights for podcasts, videos, ads, social media, education, and editorial content. For branded assistant or signature product voice use cases, reach out about licensing.",
  },
]

export default function EditionsPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          1 · HERO — dark, centered, no CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "104px 48px 96px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em",
              textTransform: "uppercase", color: TEXT3, marginBottom: "28px",
            }}>
              · Editions ·
            </p>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 5vw, 72px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: LIGHT,
              margin: "0 0 32px",
            }}>
              A{" "}
              <em style={{ fontStyle: "italic", color: GOLD }}>curated</em>
              {" "}release of voices,
              <br />composed with intention.
            </h1>
            <p style={{
              fontSize: "17px",
              color: "rgba(245,243,239,0.5)",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto",
            }}>
              Lyric Editions present focused collections of AI voices, each crafted with a defined purpose and expressive range. Drawn from professional actors and refined for real‑world performance, every voice is released as part of a cohesive, intentional series rather than an overwhelming catalog.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2 · EDITION 01 — editorial voice profiles
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT }}>
        {/* Edition header strip */}
        <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "20px 48px" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: GOLD, flexShrink: 0,
            }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: TEXT1, letterSpacing: "-0.01em" }}>
              Edition 01
            </span>
            <span style={{ fontSize: "12px", color: TEXT3 }}>· 5 voices · Available now</span>
          </div>
        </div>

        {/* Voice profiles — alternating */}
        {voices.map((voice, i) => {
          const imageLeft = i % 2 === 0
          return (
            <div
              key={voice.id}
              style={{
                borderBottom: `1px solid ${BORDER}`,
                padding: "0 48px",
              }}
            >
              <div style={{
                maxWidth: "1120px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0",
                minHeight: "520px",
                direction: imageLeft ? "ltr" : "rtl",
              }}>

                {/* Image */}
                <ScrollReveal delay={0}>
                  <div style={{
                    direction: "ltr",
                    overflow: "hidden",
                    height: "100%",
                    minHeight: "480px",
                    padding: imageLeft ? "48px 48px 48px 0" : "48px 0 48px 48px",
                  }}>
                    <div style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      minHeight: "384px",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}>
                      <Image
                        src={voice.image}
                        alt={voice.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 1120px) 50vw, 560px"
                      />
                    </div>
                  </div>
                </ScrollReveal>

                {/* Text */}
                <ScrollReveal delay={80}>
                  <div style={{
                    direction: "ltr",
                    padding: "64px 0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}>
                    <p style={{
                      fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                      textTransform: "uppercase", color: TEXT3, margin: "0 0 16px",
                    }}>
                      {voice.archetype}
                    </p>
                    <h2 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(52px, 6vw, 84px)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.9,
                      color: TEXT1,
                      margin: "0 0 28px",
                    }}>
                      {voice.name}
                    </h2>
                    <p style={{
                      fontSize: "15px", color: TEXT2, lineHeight: 1.75,
                      margin: "0 0 32px", maxWidth: "440px",
                    }}>
                      {voice.description}
                    </p>

                    <div style={{ marginBottom: "32px" }}>
                      <p style={{
                        fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: TEXT3, margin: "0 0 12px",
                      }}>
                        Use Cases
                      </p>
                      <ul style={{ margin: 0, padding: "0 0 0 14px" }}>
                        {voice.useCases.map((uc) => (
                          <li key={uc} style={{
                            fontSize: "14px", color: TEXT2,
                            lineHeight: 1.8, listStyle: "disc",
                          }}>
                            {uc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Intent tags */}
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "28px" }}>
                      {voice.intents.map((intent) => (
                        <span key={intent} style={{
                          fontSize: "11px", color: TEXT2,
                          border: `1px solid ${BORDER}`,
                          borderRadius: "100px",
                          padding: "4px 12px",
                          background: "rgba(255,255,255,0.6)",
                        }}>
                          {intent}
                        </span>
                      ))}
                    </div>

                    <div>
                      <AudioPlayButton sampleUrl={voice.sample} voiceName={voice.name} />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          )
        })}
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3 · CALLOUT — stats + play sample + pull quote
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, padding: "80px 48px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

          {/* Stats row */}
          <ScrollReveal>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "48px",
              marginBottom: "64px",
            }}>
              {[
                { n: "5", label: "Composed\nvoices." },
                { n: "10+", label: "Emotional tones per voice\n(warm, urgent, playful, authoritative, and more)" },
                { n: "3", label: "Context styles\nper voice" },
              ].map((stat, i) => (
                <ScrollReveal key={stat.n} delay={i * 80}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(64px, 7vw, 100px)",
                      fontWeight: 400,
                      color: TEXT1,
                      lineHeight: 0.9,
                      letterSpacing: "-0.03em",
                      flexShrink: 0,
                    }}>
                      {stat.n}
                    </span>
                    <p style={{
                      fontSize: "14px", color: TEXT2,
                      lineHeight: 1.5, margin: 0,
                      whiteSpace: "pre-line",
                    }}>
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${BORDER}`, marginBottom: "48px" }} />

          {/* Play row + pull quote */}
          <ScrollReveal>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}>
              {/* Left: play sample */}
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <AudioPlayButton
                  sampleUrl="https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Morgan%20(sample).wav"
                  voiceName="Morgan"
                />
                <div>
                  <p style={{
                    fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                    textTransform: "uppercase", color: TEXT3, margin: "0 0 4px",
                  }}>
                    Morgan · Warm
                  </p>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px", fontStyle: "italic",
                    color: TEXT2, margin: 0, lineHeight: 1.5,
                  }}>
                    Here is what I&apos;ve learned after doing this for a while...
                  </p>
                </div>
              </div>

              {/* Right: portrait + pull quote */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{
                  width: "56px", height: "56px",
                  borderRadius: "50%", overflow: "hidden",
                  flexShrink: 0, background: BORDER,
                }}>
                  <Image
                    src="/images/about_1.jpg"
                    alt=""
                    width={56}
                    height={56}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 2vw, 24px)",
                  fontStyle: "italic",
                  color: TEXT1,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}>
                  &ldquo;How a voice behaves matters more than how it sounds.&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4 · EDITION 02 — coming soon, intent → voice treatment
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "80px 48px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

          {/* Section header */}
          <ScrollReveal>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "48px" }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "rgba(245,243,239,0.2)", flexShrink: 0,
              }} />
              <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(245,243,239,0.35)", letterSpacing: "-0.01em" }}>
                Edition 02
              </span>
              <span style={{ fontSize: "12px", color: "rgba(245,243,239,0.2)" }}>· In development</span>
            </div>
          </ScrollReveal>

          {/* Two-panel intent → voice concept */}
          <ScrollReveal delay={80}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "40px",
            }}>

              {/* Left panel — From emotional intent */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(245,243,239,0.07)",
                borderRight: "none",
                borderRadius: "8px 0 0 8px",
                padding: "48px 40px",
              }}>
                <p style={{
                  fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "rgba(245,243,239,0.25)",
                  margin: "0 0 32px",
                }}>
                  From emotional intent
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
                  {[
                    "Measured wisdom", "Reflective depth", "Quiet knowing",
                    "Grounded warmth", "Youthful energy", "Bright curiosity",
                    "Playful presence", "Open-hearted care",
                  ].map((tag, i) => (
                    <span key={tag} style={{
                      fontSize: "12px",
                      color: `rgba(245,243,239,${i < 3 ? "0.55" : "0.3"})`,
                      border: `1px solid rgba(245,243,239,${i < 3 ? "0.15" : "0.07"})`,
                      background: `rgba(245,243,239,${i < 3 ? "0.05" : "0.02"})`,
                      borderRadius: "100px",
                      padding: "6px 14px",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p style={{
                  fontSize: "12px", color: "rgba(245,243,239,0.25)",
                  margin: 0, letterSpacing: "0.01em",
                }}>
                  Set the intent before you write
                </p>
              </div>

              {/* Right panel — To composed voice */}
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(245,243,239,0.07)",
                borderLeft: "none",
                borderRadius: "0 8px 8px 0",
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}>
                <p style={{
                  fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "rgba(245,243,239,0.25)",
                  margin: "0 0 32px",
                }}>
                  To composed voice
                </p>

                {/* Glowing orb */}
                <div style={{
                  width: "100px", height: "100px", borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 35%, rgba(201,169,110,0.35), rgba(43,42,37,0.8) 70%)",
                  boxShadow: "0 0 48px rgba(201,169,110,0.12), inset 0 0 32px rgba(201,169,110,0.08)",
                  margin: "0 auto 28px",
                  flexShrink: 0,
                }} />

                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(16px, 2vw, 20px)",
                  fontStyle: "italic",
                  color: "rgba(245,243,239,0.4)",
                  lineHeight: 1.4,
                  margin: "0 0 24px",
                  maxWidth: "280px",
                }}>
                  Sage and Echo are being composed.
                </p>

                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  border: "1px solid rgba(245,243,239,0.12)",
                  borderRadius: "100px",
                }}>
                  <span style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: GOLD, opacity: 0.6, flexShrink: 0,
                  }} />
                  <span style={{ fontSize: "11px", color: "rgba(245,243,239,0.35)", letterSpacing: "0.03em" }}>
                    Edition 02 — Coming soon
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Voice name reveals */}
          <ScrollReveal delay={160}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
              {[
                { name: "Sage", archetype: "The Wise", intents: ["Measured", "Reflective", "Knowing"] },
                { name: "Echo", archetype: "The Bright", intents: ["Playful", "Warm", "Energetic"] },
              ].map((v, i) => (
                <div key={v.name} style={{
                  padding: "28px 32px",
                  border: "1px solid rgba(245,243,239,0.06)",
                  borderRadius: i === 0 ? "6px 0 0 6px" : "0 6px 6px 0",
                  borderRight: i === 0 ? "none" : "1px solid rgba(245,243,239,0.06)",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "10px" }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "28px", fontWeight: 500,
                      color: "rgba(245,243,239,0.3)", letterSpacing: "-0.02em",
                    }}>
                      {v.name}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(245,243,239,0.2)" }}>{v.archetype}</span>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {v.intents.map((intent) => (
                      <span key={intent} style={{
                        fontSize: "11px",
                        color: "rgba(245,243,239,0.25)",
                        border: "1px solid rgba(245,243,239,0.08)",
                        borderRadius: "100px",
                        padding: "3px 10px",
                      }}>
                        {intent}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5 · CALLOUT — editions_4 / editions_8 style editorial strip
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, padding: "72px 48px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "64px",
              alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                {/* Dual portraits */}
                <div style={{ display: "flex", flexShrink: 0 }}>
                  {["/images/about_1.jpg", "/images/about_2.webp"].map((src, i) => (
                    <div key={src} style={{
                      width: "48px", height: "48px",
                      borderRadius: "50%", overflow: "hidden",
                      border: `2px solid ${LIGHT}`,
                      marginLeft: i === 0 ? 0 : "-12px",
                      background: BORDER,
                    }}>
                      <Image
                        src={src}
                        alt=""
                        width={48}
                        height={48}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{
                    fontSize: "16px", fontWeight: 600, color: TEXT1,
                    margin: "0 0 4px", letterSpacing: "-0.01em",
                  }}>
                    Ready to hear Lyric in action?
                  </p>
                  <p style={{ fontSize: "14px", color: TEXT2, margin: 0, lineHeight: 1.5 }}>
                    Try the composer and experience how Lyric voices perform in real moments.
                  </p>
                </div>
              </div>
              <a
                href="https://composer.lyricvoices.ai"
                style={{
                  padding: "13px 28px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: DARK,
                  color: LIGHT,
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.01em",
                  flexShrink: 0,
                }}
              >
                Try the composer
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6 · FAQ — editions_10 style with large serif headline
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, padding: "80px 48px 100px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "80px" }}>

            {/* Left: large serif headline */}
            <ScrollReveal>
              <div>
                <p style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: TEXT3, marginBottom: "20px",
                }}>
                  Frequently Asked Questions
                </p>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 3.5vw, 48px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  color: TEXT1,
                  margin: "0 0 20px",
                }}>
                  We&apos;re here to answer your questions.
                </h2>
                <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.7, margin: "0 0 28px" }}>
                  Clear answers, no noise. Lyric is designed to feel intuitive from the start. These are the questions we hear most, answered with care.
                </p>
                <a href="mailto:hi@lyricvoices.ai" style={{ fontSize: "13px", color: TEXT1, fontWeight: 500 }}>
                  hi@lyricvoices.ai →
                </a>
              </div>
            </ScrollReveal>

            {/* Right: accordion */}
            <FaqAccordion faqs={editionFaqs} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7 · PRE-FOOTER CTA — matches home / about / pricing
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
