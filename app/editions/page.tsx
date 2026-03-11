import type { Metadata } from "next"
import Link from "next/link"
import AudioPlayButton from "@/components/AudioPlayButton"

export const metadata: Metadata = {
  title: "Editions",
  description: "A curated release of voices, composed with intention.",
}

const voices = [
  {
    id: "morgan-anchor",
    name: "Morgan",
    archetype: "The Anchor",
    edition: "Edition 01",
    blurb: "Decisive authority for enterprise, finance, and high-trust brand narration.",
    description:
      "Morgan is designed for moments that require warmth, authority, and trust. Her voice maintains credibility across podcasts, brand storytelling, and service experiences — staying composed as context shifts.",
    intents: ["Authoritative", "Warm", "Composed"],
    useCases: ["Enterprise & Finance", "Brand Narration", "Podcast Hosting", "Legal"],
    from: "#C4977F",
    to: "#E8D5C4",
    sample: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Morgan%20(sample).wav",
    available: true,
  },
  {
    id: "nova-intimist",
    name: "Nova",
    archetype: "The Intimist",
    edition: "Edition 01",
    blurb: "Grounding presence for wellness, meditation, and personal brand storytelling.",
    description:
      "Nova creates space for reflection without rushing. His voice holds intimacy across meditations, wellness guidance, and personal narratives — ensuring every word feels grounding rather than prescriptive.",
    intents: ["Compassionate", "Encouraging", "Calm"],
    useCases: ["Meditation & Wellness", "Personal Branding", "Therapeutic Content"],
    from: "#A8B59A",
    to: "#D9DECD",
    sample: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Nova_calm%20(sample).wav",
    available: true,
  },
  {
    id: "atlas-guide",
    name: "Atlas",
    archetype: "The Guide",
    edition: "Edition 01",
    blurb: "Patient clarity for e-learning, tutorials, and product education.",
    description:
      "Atlas maintains accessibility across tutorials, training modules, and educational content — staying composed as complexity increases and ensuring every explanation feels supportive rather than condescending.",
    intents: ["Patient", "Clear", "Supportive"],
    useCases: ["E-Learning & Training", "Tutorial Content", "Product Education"],
    from: "#9D9B92",
    to: "#CDC9BE",
    sample: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Atlas_sample.wav",
    available: true,
  },
  {
    id: "riven-narrator",
    name: "Riven",
    archetype: "The Narrator",
    edition: "Edition 01",
    blurb: "Depth and texture for brand films, documentaries, and long-form storytelling.",
    description:
      "Riven carries gravitas across documentaries, brand films, and long-form storytelling — building tension and wonder while keeping every word grounded in purpose.",
    intents: ["Intrigue", "Tension", "Wonder"],
    useCases: ["Documentary Narration", "Brand Films", "Long-form Storytelling"],
    from: "#9C8275",
    to: "#C8B8AD",
    sample: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Riven%20(sample).wav",
    available: true,
  },
  {
    id: "hex-wildcard",
    name: "Hex",
    archetype: "The Wildcard",
    edition: "Edition 01",
    blurb: "Edge and personality for social campaigns, creator content, and bold brand voice.",
    description:
      "Hex cuts through noise across social campaigns, creator content, and bold brand activations — staying sharp without feeling aggressive, always landing exactly where it needs to.",
    intents: ["Playful", "Ironic", "Bold"],
    useCases: ["Social Campaigns", "Creator Content", "Bold Brand Voice"],
    from: "#B87A5C",
    to: "#E5C4B3",
    sample: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Hex%20(sample).wav",
    available: true,
  },
]

const upcoming = [
  {
    name: "Sage",
    archetype: "The Wise",
    edition: "Edition 02",
    blurb: "Inspirational gravitas for legacy content and life wisdom.",
    intents: ["Measured", "Reflective", "Knowing"],
    from: "#8B9176",
    to: "#D1CDB7",
  },
  {
    name: "Echo",
    archetype: "The Bright",
    edition: "Edition 02",
    blurb: "Youthful energy for children's content and family brands.",
    intents: ["Playful", "Warm", "Energetic"],
    from: "#D4B5A0",
    to: "#F0E8DC",
  },
]

export default function EditionsPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          HEADER
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#2a2622", padding: "100px 32px 80px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4a4540",
              marginBottom: "20px",
            }}
          >
            Editions
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 4.5vw, 60px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#faf9f7",
              margin: "0 0 20px",
              lineHeight: 1.05,
              maxWidth: "680px",
            }}
          >
            Not a catalog.
            <br />
            <span style={{ color: "#B8955A" }}>A curated collection.</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#756d65", lineHeight: 1.65, maxWidth: "500px", margin: 0 }}>
            Each Edition is a finite set of AI voices — each built for a clear purpose, performed
            by a professional actor, and shipped with direction built in.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          EDITION 01 — voice list, composer-style
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#faf9f7", padding: "0 32px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "40px 0 24px",
              borderBottom: "1px solid #eae4de",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#B8955A",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#2a2622",
                  letterSpacing: "-0.01em",
                }}
              >
                Edition 01
              </span>
              <span style={{ fontSize: "12px", color: "#b5aca3" }}>· 5 voices · Available now</span>
            </div>
          </div>

          {/* Voice rows */}
          {voices.map((voice) => (
            <div
              key={voice.id}
              style={{
                display: "grid",
                gridTemplateColumns: "260px 1fr auto",
                gap: "40px",
                alignItems: "start",
                padding: "36px 0",
                borderBottom: "1px solid #eae4de",
              }}
            >
              {/* Left: swatch + name */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: `linear-gradient(135deg, ${voice.from}, ${voice.to})`,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#2a2622",
                        margin: "0 0 1px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {voice.name}
                    </p>
                    <p style={{ fontSize: "12px", color: "#b5aca3", margin: 0 }}>{voice.archetype}</p>
                  </div>
                </div>
                {/* Variants */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {voice.intents.map((intent) => (
                    <div
                      key={intent}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 10px 4px 8px",
                        borderRadius: "100px",
                        border: "1px solid #eae4de",
                        background: "#ffffff",
                        width: "fit-content",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${voice.from}, ${voice.to})`,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: "11px", color: "#756d65" }}>{intent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center: description + use cases */}
              <div>
                <p style={{ fontSize: "14px", color: "#4a4540", lineHeight: 1.7, margin: "0 0 20px" }}>
                  {voice.description}
                </p>
                <div
                  style={{
                    padding: "14px 16px",
                    background: "#faf9f7",
                    border: "1px solid #eae4de",
                    borderRadius: "10px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#b5aca3",
                      margin: "0 0 8px",
                    }}
                  >
                    Built for
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {voice.useCases.map((uc) => (
                      <span
                        key={uc}
                        style={{
                          fontSize: "11px",
                          color: "#756d65",
                          background: "#eae4de",
                          padding: "3px 8px",
                          borderRadius: "100px",
                        }}
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: play */}
              <div style={{ paddingTop: "4px" }}>
                <AudioPlayButton sampleUrl={voice.sample} voiceName={voice.name} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          EDITION 02 — coming soon, dark
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#2a2622", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#4a4540",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#756d65" }}>
                Edition 02
              </span>
              <span style={{ fontSize: "12px", color: "#4a4540" }}>· In development</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {upcoming.map((voice) => (
              <div
                key={voice.name}
                style={{
                  padding: "24px",
                  borderRadius: "12px",
                  border: "1px solid rgba(234,228,222,0.08)",
                  background: "rgba(234,228,222,0.03)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: `linear-gradient(135deg, ${voice.from}, ${voice.to})`,
                      opacity: 0.5,
                    }}
                  />
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#756d65", margin: 0 }}>
                    {voice.name}{" "}
                    <span style={{ fontWeight: 400, color: "#4a4540" }}>· {voice.archetype}</span>
                  </p>
                </div>
                <p style={{ fontSize: "13px", color: "#4a4540", lineHeight: 1.6, margin: "0 0 14px" }}>
                  {voice.blurb}
                </p>
                <div style={{ display: "flex", gap: "6px" }}>
                  {voice.intents.map((i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "11px",
                        color: "#4a4540",
                        background: "rgba(234,228,222,0.06)",
                        border: "1px solid rgba(234,228,222,0.08)",
                        padding: "3px 8px",
                        borderRadius: "100px",
                      }}
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          CTA
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#faf9f7", padding: "80px 32px 100px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "32px 40px",
              background: "#ffffff",
              border: "1px solid #eae4de",
              borderRadius: "16px",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#2a2622",
                  margin: "0 0 4px",
                  letterSpacing: "-0.01em",
                }}
              >
                All five Edition 01 voices are ready.
              </p>
              <p style={{ fontSize: "13px", color: "#756d65", margin: 0 }}>
                Open the composer and hear them perform in real moments.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href="https://composer.lyricvoices.ai"
                style={{
                  padding: "11px 22px",
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 500,
                  background: "#2a2622",
                  color: "#faf9f7",
                  whiteSpace: "nowrap",
                }}
              >
                Open the composer
              </a>
              <Link
                href="/pricing"
                style={{
                  padding: "11px 22px",
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 400,
                  background: "#eae4de",
                  color: "#756d65",
                  whiteSpace: "nowrap",
                }}
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
