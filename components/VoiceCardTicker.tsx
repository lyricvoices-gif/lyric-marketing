"use client"

import React from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface VoicePreset {
  pace: string
  energy: string
  emphasis: string
  affect: string
}

interface Voice {
  id: string
  title: string
  description: string
  edition: string
  gradientFrom: string
  gradientTo: string
  isAvailable: boolean
  sampleUrl: string | null
  intents?: string[]
  defaultIntent?: string
  placeholder?: string
  intentPresets?: Record<string, VoicePreset>
  intentPlaceholders?: Record<string, string>
}

interface QualityMetadata {
  attempts: number
  quality: string
  variance: number
  provider: string
}

// ─── Voice data ───────────────────────────────────────────────────────────────

const voices: Voice[] = [
  {
    id: "morgan-anchor",
    title: "Morgan · The Anchor",
    description:
      "Decisive authority for enterprise, finance, and high-trust brand narration.",
    edition: "Edition 01 · Morgan",
    gradientFrom: "#C4977F",
    gradientTo: "#E8D5C4",
    isAvailable: true,
    sampleUrl:
      "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Morgan%20(sample).wav",
    intents: ["Authoritative", "Warm", "Composed"],
    defaultIntent: "Authoritative",
    placeholder:
      "This decision isn't just strategic. It's the one that changes the trajectory of everything that follows.",
    intentPresets: {
      Authoritative: { pace: "steady", energy: "decisive", emphasis: "key statements", affect: "executive" },
      Warm: { pace: "measured", energy: "grounded", emphasis: "connection", affect: "approachable" },
      Composed: { pace: "controlled", energy: "neutral", emphasis: "precise", affect: "collected" },
    },
    intentPlaceholders: {
      Authoritative: "This decision isn't just strategic. It's the one that changes the trajectory of everything that follows.",
      Warm: "We've built something worth being proud of. The work your team has done — it shows.",
      Composed: "Here's what we know. The data is clear, the path is defined, and the next step is straightforward.",
    },
  },
  {
    id: "nova-intimist",
    title: "Nova · The Intimist",
    description:
      "Presence, emotional safety, and authentic care for wellness, coaching, and human-centered brands.",
    edition: "Edition 01 · Nova",
    gradientFrom: "#A8B59A",
    gradientTo: "#D9DECD",
    isAvailable: true,
    sampleUrl:
      "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Nova_calm%20(sample).wav",
    intents: ["Compassionate", "Encouraging", "Calm"],
    defaultIntent: "Compassionate",
    placeholder: "You are not alone in this. Whatever you are carrying right now — I hear you.",
    intentPresets: {
      Compassionate: { pace: "slow", energy: "soft", emphasis: "comforting", affect: "warm" },
      Encouraging: { pace: "steady", energy: "uplifting", emphasis: "affirmations", affect: "supportive" },
      Calm: { pace: "slow", energy: "low", emphasis: "even", affect: "settled" },
    },
    intentPlaceholders: {
      Compassionate: "You are not alone in this. Whatever you are carrying right now — I hear you.",
      Encouraging: "You have already done the hardest part. Keep going. I mean that.",
      Calm: "Breathe. There is nothing that needs your attention right now except this moment.",
    },
  },
  {
    id: "atlas-guide",
    title: "Atlas · The Guide",
    description:
      "Clarity, patience, and credibility for product walkthroughs, tutorials, and instructional content.",
    edition: "Edition 01 · Atlas",
    gradientFrom: "#9D9B92",
    gradientTo: "#CDC9BE",
    isAvailable: true,
    sampleUrl:
      "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Atlas_sample.wav",
    intents: ["Patient", "Clear", "Supportive"],
    defaultIntent: "Patient",
    placeholder: "Let us walk through this together, one step at a time. Nothing to rush.",
    intentPresets: {
      Patient: { pace: "steady", energy: "calm", emphasis: "step-by-step", affect: "reassuring" },
      Clear: { pace: "brisk", energy: "neutral", emphasis: "key terms", affect: "direct" },
      Supportive: { pace: "steady", energy: "warm", emphasis: "encouragement", affect: "helpful" },
    },
    intentPlaceholders: {
      Patient: "Let us walk through this together, one step at a time. Nothing to rush.",
      Clear: "Here is what matters: the input, the transform, the output. That is the whole picture.",
      Supportive: "You are figuring this out, and that is exactly what this is for. Ask anything.",
    },
  },
  {
    id: "riven-narrator",
    title: "Riven · The Narrator",
    description:
      "Depth, texture, and narrative weight for brand films, audiobooks, and documentary storytelling.",
    edition: "Edition 01 · Riven",
    gradientFrom: "#9C8275",
    gradientTo: "#C8B8AD",
    isAvailable: true,
    sampleUrl:
      "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Riven%20(sample).wav",
    intents: ["Intrigue", "Tension", "Wonder"],
    defaultIntent: "Intrigue",
    placeholder: "No one knew what had been buried there. Not yet.",
    intentPresets: {
      Intrigue: { pace: "measured", energy: "low", emphasis: "mystery beats", affect: "subtle" },
      Tension: { pace: "tight", energy: "rising", emphasis: "stakes", affect: "urgent" },
      Wonder: { pace: "flowing", energy: "open", emphasis: "imagery", affect: "awe" },
    },
    intentPlaceholders: {
      Intrigue: "No one knew what had been buried there. Not yet.",
      Tension: "The window was closing. Every second they waited, the odds shifted against them.",
      Wonder: "Above the valley, the light bent in ways no photograph had ever caught.",
    },
  },
  {
    id: "hex-wildcard",
    title: "Hex · The Wildcard",
    description:
      "Sharp wit for social campaigns, creator content, and bold brand voice.",
    edition: "Edition 01 · Hex",
    gradientFrom: "#B87A5C",
    gradientTo: "#E5C4B3",
    isAvailable: true,
    sampleUrl:
      "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Hex%20(sample).wav",
    intents: ["Playful", "Ironic", "Bold"],
    defaultIntent: "Playful",
    placeholder:
      "Welcome back, chaos agents. Today we're doing something incredibly questionable, for science.",
    intentPresets: {
      Playful: { pace: "quick", energy: "bright", emphasis: "punchlines", affect: "cheeky" },
      Ironic: { pace: "steady", energy: "dry", emphasis: "deadpan", affect: "sardonic" },
      Bold: { pace: "brisk", energy: "high", emphasis: "strong beats", affect: "confident" },
    },
    intentPlaceholders: {
      Playful: "Welcome back, chaos agents. Today we're doing something incredibly questionable, for science.",
      Ironic: "Sure. Let's trust the algorithm again. That's always worked out perfectly before.",
      Bold: "Here's the part where I'm supposed to soften the take. I'm not going to.",
    },
  },
  {
    id: "sage-wise",
    title: "Sage · The Wise",
    description: "Inspirational gravitas for legacy content and life wisdom.",
    edition: "Edition 02 · Sage",
    gradientFrom: "#8B9176",
    gradientTo: "#D1CDB7",
    isAvailable: false,
    sampleUrl: null,
  },
  {
    id: "echo-bright",
    title: "Echo · The Bright",
    description: "Youthful energy for children's content and family brands.",
    edition: "Edition 02 · Echo",
    gradientFrom: "#D4B5A0",
    gradientTo: "#F0E8DC",
    isAvailable: false,
    sampleUrl: null,
  },
]

const duplicatedVoices = [...voices, ...voices, ...voices]

// ─── Main component ───────────────────────────────────────────────────────────

export default function VoiceCardTicker() {
  const [isMounted, setIsMounted] = React.useState(false)
  const [activeVoice, setActiveVoice] = React.useState<Voice | null>(null)
  const [playingSampleVoiceId, setPlayingSampleVoiceId] = React.useState<string | null>(null)

  const sampleAudioRef   = React.useRef<HTMLAudioElement | null>(null)
  const tickerRef        = React.useRef<HTMLDivElement | null>(null)
  const isPausedByModal  = React.useRef(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const playSample = (voiceId: string, url: string | null) => {
    if (!url) return
    const current = sampleAudioRef.current
    if (current && playingSampleVoiceId === voiceId && !current.paused) {
      current.pause()
      setPlayingSampleVoiceId(null)
      return
    }
    if (current) current.pause()
    const a = new Audio(url)
    sampleAudioRef.current = a
    setPlayingSampleVoiceId(voiceId)
    a.onended = () => setPlayingSampleVoiceId(null)
    a.play().catch(() => setPlayingSampleVoiceId(null))
  }

  // Freeze the ticker at its current pixel position (no snap jerk)
  const pauseTicker = () => {
    const el = tickerRef.current
    if (!el) return
    const x = new DOMMatrix(window.getComputedStyle(el).transform).m41
    el.style.animation = "none"
    el.style.transform = `translateX(${x}px)`
  }

  // Resume from the exact frozen position using a negative delay
  const resumeTicker = () => {
    const el = tickerRef.current
    if (!el || isPausedByModal.current) return
    const x    = new DOMMatrix(window.getComputedStyle(el).transform).m41
    const dist = 360 * 7                          // matches keyframe distance
    const pct  = Math.abs(x) / dist
    el.style.transform = ""
    el.style.animation = `lyric-scroll 70s linear ${-(pct * 70).toFixed(3)}s infinite`
  }

  const openVoice = (voice: Voice) => {
    const current = sampleAudioRef.current
    if (current) { current.pause(); setPlayingSampleVoiceId(null) }
    isPausedByModal.current = true
    pauseTicker()
    setActiveVoice(voice)
  }

  React.useEffect(() => {
    return () => { sampleAudioRef.current?.pause() }
  }, [])

  return (
    <div style={{ width: "100%", overflow: "hidden", background: "#2b2a25", padding: "32px 0 80px" }}>
      {isMounted && (
        <>
          {/* Hover wrapper: single enter/leave for the whole strip prevents per-card jitter */}
          <div
            onMouseEnter={pauseTicker}
            onMouseLeave={resumeTicker}
            style={{ width: "100%", overflow: "hidden" }}
          >
          <div
            ref={tickerRef}
            style={{
              display: "flex",
              gap: "20px",
              animation: "lyric-scroll 70s linear infinite",
              width: "fit-content",
              willChange: "transform",
              backfaceVisibility: "hidden",
              padding: "8px 0 12px",
            }}
          >
            {duplicatedVoices.map((voice, index) => (
              <VoiceCard
                key={`${voice.id}-${index}`}
                voice={voice}
                isPlayingSample={playingSampleVoiceId === voice.id}
                onOpen={() => voice.isAvailable && openVoice(voice)}
                onPlaySample={() => playSample(voice.id, voice.sampleUrl)}
              />
            ))}
          </div>
          </div>

          {activeVoice && (
            <ComposerModal
              voice={activeVoice}
              onClose={() => {
                setActiveVoice(null)
                isPausedByModal.current = false
                resumeTicker()
              }}
            />
          )}

          <style>{`
            @keyframes lyric-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(calc(-360px * 7)); }
            }
            @keyframes lyric-fadeInBackdrop {
              from { background-color: rgba(0,0,0,0); }
              to   { background-color: rgba(0,0,0,0.65); }
            }
            @keyframes lyric-modalIn {
              from { transform: scale(0.96) translateY(16px); opacity: 0; }
              to   { transform: scale(1) translateY(0); opacity: 1; }
            }
            @keyframes lyric-spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            .lyric-voice-card {
              transition: box-shadow 0.3s ease;
            }
            .lyric-voice-card.lyric-voice-card--available:hover {
              box-shadow: 0 12px 36px rgba(0,0,0,0.18) !important;
            }
          `}</style>
        </>
      )}
    </div>
  )
}

// ─── Voice card ───────────────────────────────────────────────────────────────

function VoiceCard({
  voice,
  isPlayingSample,
  onOpen,
  onPlaySample,
}: {
  voice: Voice
  isPlayingSample: boolean
  onOpen: () => void
  onPlaySample: () => void
}) {
  return (
    <div
      className={`lyric-voice-card${voice.isAvailable ? " lyric-voice-card--available" : ""}`}
      style={{
        flex: "0 0 320px",
        height: "400px",
        borderRadius: "20px",
        background: `linear-gradient(135deg, ${voice.gradientFrom}, ${voice.gradientTo})`,
        position: "relative",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: voice.isAvailable ? "pointer" : "default",
        opacity: voice.isAvailable ? 1 : 0.82,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
      onClick={onOpen}
      onMouseLeave={() => { if (isPlayingSample) onPlaySample() }}
    >
      {/* Edition pill */}
      <div
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          padding: "5px 11px",
          borderRadius: "100px",
          fontSize: "10px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          backgroundColor: "rgba(0,0,0,0.1)",
          color: "rgba(0,0,0,0.6)",
          fontWeight: 600,
        }}
      >
        {voice.edition}
      </div>

      {/* Bottom content */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            lineHeight: 1.15,
            fontWeight: 400,
            color: "rgba(0,0,0,0.85)",
            marginBottom: "10px",
          }}
        >
          {voice.title}
        </div>

        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.5,
            color: "rgba(0,0,0,0.6)",
            margin: "0 0 16px",
          }}
        >
          {voice.description}
        </p>

        {voice.isAvailable ? (
          voice.sampleUrl ? (
            <button
              onClick={(e) => { e.stopPropagation(); onPlaySample() }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "100px",
                border: "none",
                backgroundColor: "rgba(0,0,0,0.22)",
                color: "rgba(0,0,0,0.8)",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <span>{isPlayingSample ? "⏸" : "▶"}</span>
              <span>Play sample</span>
            </button>
          ) : (
            <div style={{ display: "inline-flex", padding: "8px 16px", borderRadius: "100px", backgroundColor: "rgba(0,0,0,0.12)", color: "rgba(0,0,0,0.5)", fontSize: "12px", fontWeight: 500 }}>
              Sample coming soon
            </div>
          )
        ) : (
          <div style={{ display: "inline-flex", padding: "8px 16px", borderRadius: "100px", backgroundColor: "rgba(0,0,0,0.12)", color: "rgba(0,0,0,0.5)", fontSize: "12px", fontWeight: 500 }}>
            Coming soon
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Composer modal ───────────────────────────────────────────────────────────

function ComposerModal({ voice, onClose }: { voice: Voice; onClose: () => void }) {
  const [script, setScript] = React.useState("")
  const [selectedIntent, setSelectedIntent] = React.useState(
    voice.defaultIntent ?? (voice.intents?.[0] ?? "")
  )
  const [error, setError] = React.useState<string | null>(null)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [composerState, setComposerState] = React.useState<"composing" | "generated" | "playing">("composing")
  const [qualityMetadata, setQualityMetadata] = React.useState<QualityMetadata | null>(null)
  const [generationCount, setGenerationCount] = React.useState(0)

  const generatedAudioRef = React.useRef<HTMLAudioElement | null>(null)
  const generatedUrlRef = React.useRef<string | null>(null)

  const activePlaceholder =
    (voice.intentPlaceholders && selectedIntent && voice.intentPlaceholders[selectedIntent]) ||
    voice.placeholder ||
    "Write a line to preview."

  const getActivePreset = React.useCallback(() => {
    return (selectedIntent && voice.intentPresets?.[selectedIntent]) ?? null
  }, [voice.intentPresets, selectedIntent])

  React.useEffect(() => {
    return () => {
      generatedAudioRef.current?.pause()
      if (generatedUrlRef.current) URL.revokeObjectURL(generatedUrlRef.current)
    }
  }, [])

  const generateVoice = async () => {
    if (!script.trim() || isGenerating) return
    setIsGenerating(true)
    setError(null)
    setQualityMetadata(null)

    try {
      const res = await fetch("https://lyric-voice-api.sparknfable.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voiceId: voice.id,
          script: script.trim(),
          emotionalIntent: selectedIntent,
          variant: selectedIntent,
          direction: { mode: "inline", intent: selectedIntent },
          segments: [{ text: script.trim(), intent: selectedIntent }],
        }),
      })

      if (!res.ok) {
        let msg = "Failed to generate voice"
        try { const d = await res.json(); msg = d.message || msg } catch {}
        throw new Error(msg)
      }

      setQualityMetadata({
        attempts: parseInt(res.headers.get("X-Generation-Attempts") ?? "1", 10),
        quality: res.headers.get("X-Generation-Quality") ?? "unknown",
        variance: parseFloat(res.headers.get("X-Generation-Variance") ?? "0"),
        provider: res.headers.get("X-Voice-Provider") ?? "unknown",
      })

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      generatedAudioRef.current?.pause()
      if (generatedUrlRef.current) URL.revokeObjectURL(generatedUrlRef.current)

      generatedUrlRef.current = url
      const a = new Audio(url)
      generatedAudioRef.current = a
      setComposerState("generated")
      a.onplay = () => setComposerState("playing")
      a.onpause = () => setComposerState("generated")
      a.onended = () => setComposerState("generated")
      a.play()
      setGenerationCount((n) => n + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate voice. Please try again.")
      setComposerState("composing")
    } finally {
      setIsGenerating(false)
    }
  }

  const togglePlayPause = () => {
    const a = generatedAudioRef.current
    if (!a) return
    a.paused ? a.play() : a.pause()
  }


  const resetComposer = () => {
    setScript("")
    setComposerState("composing")
    setError(null)
    setQualityMetadata(null)
    generatedAudioRef.current?.pause()
    if (generatedUrlRef.current) URL.revokeObjectURL(generatedUrlRef.current)
  }

  const canGenerate = script.trim().length > 0 && !isGenerating

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
        animation: "lyric-fadeInBackdrop 0.3s ease-out forwards",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "680px",
          maxWidth: "100%",
          maxHeight: "90vh",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "#1c1a17",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          display: "flex",
          flexDirection: "column",
          animation: "lyric-modalIn 0.35s ease-out 0.05s both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — gradient */}
        <div
          style={{
            padding: "24px 28px",
            background: `linear-gradient(135deg, ${voice.gradientFrom}, ${voice.gradientTo})`,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "5px 11px",
              borderRadius: "100px",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              backgroundColor: "rgba(0,0,0,0.12)",
              color: "rgba(0,0,0,0.6)",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            {voice.edition}
          </div>

          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              lineHeight: 1.15,
              fontWeight: 400,
              color: "rgba(0,0,0,0.88)",
              marginBottom: "6px",
            }}
          >
            {voice.title}
          </div>
          <p style={{ fontSize: "13px", lineHeight: 1.5, color: "rgba(0,0,0,0.6)", margin: 0, maxWidth: "400px" }}>
            {voice.description}
          </p>

          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "20px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "18px",
              color: "rgba(0,0,0,0.65)",
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "24px 28px",
            background: "#1c1a17",
            color: "#e8e3dc",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {composerState === "composing" && (
            <>
              {/* Intent selector */}
              {voice.intents && voice.intents.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,227,220,0.5)", fontWeight: 600 }}>
                    Voice Direction
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {voice.intents.map((intent) => {
                      const active = intent === selectedIntent
                      return (
                        <button
                          key={intent}
                          onClick={() => setSelectedIntent(intent)}
                          disabled={isGenerating}
                          style={{
                            fontSize: "12px",
                            padding: "7px 14px",
                            borderRadius: "100px",
                            border: active ? "1px solid rgba(232,227,220,0.7)" : "1px solid rgba(232,227,220,0.2)",
                            backgroundColor: active ? "rgba(232,227,220,0.1)" : "transparent",
                            color: "#e8e3dc",
                            cursor: isGenerating ? "not-allowed" : "pointer",
                            opacity: isGenerating ? 0.6 : 1,
                          }}
                        >
                          {intent}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Script textarea */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,227,220,0.5)", fontWeight: 600 }}>
                  Script
                </span>
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder={activePlaceholder}
                  disabled={isGenerating}
                  rows={5}
                  style={{
                    width: "100%",
                    borderRadius: "14px",
                    border: "1px solid rgba(232,227,220,0.15)",
                    backgroundColor: "rgba(0,0,0,0.3)",
                    color: "#e8e3dc",
                    padding: "12px 14px",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    resize: "vertical",
                    outline: "none",
                    opacity: isGenerating ? 0.6 : 1,
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              {error && (
                <div style={{ padding: "12px 16px", borderRadius: "12px", backgroundColor: "rgba(255,100,100,0.1)", border: "1px solid rgba(255,100,100,0.3)", color: "#ff8888", fontSize: "12px", lineHeight: 1.5 }}>
                  {error}
                </div>
              )}

              <button
                onClick={generateVoice}
                disabled={!canGenerate}
                style={{
                  border: "none",
                  borderRadius: "100px",
                  padding: "13px 20px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: canGenerate ? "pointer" : "not-allowed",
                  background: canGenerate
                    ? "linear-gradient(120deg, rgba(232,227,220,0.95), rgba(215,210,200,0.95))"
                    : "rgba(232,227,220,0.25)",
                  color: canGenerate ? "#1c1a17" : "rgba(232,227,220,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontFamily: "inherit",
                }}
              >
                {isGenerating ? (
                  <>
                    <span style={{ display: "inline-block", animation: "lyric-spin 1s linear infinite" }}>⟳</span>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>▶</span>
                    <span>Compose and play</span>
                  </>
                )}
              </button>

              <span style={{ fontSize: "11px", color: "rgba(232,227,220,0.4)", textAlign: "center" }}>
                Preview your voice with emotional direction — no account required
              </span>
            </>
          )}

          {(composerState === "generated" || composerState === "playing") && (
            <>
              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(232,227,220,0.04)",
                  border: "1px solid rgba(232,227,220,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Play/pause + script preview */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <button
                    onClick={togglePlayPause}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: "none",
                      background: "linear-gradient(120deg, rgba(232,227,220,0.95), rgba(215,210,200,0.95))",
                      color: "#1c1a17",
                      fontSize: "16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {composerState === "playing" ? "⏸" : "▶"}
                  </button>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "11px", color: "rgba(232,227,220,0.5)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {selectedIntent || "Preview"}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "15px",
                        color: "#e8e3dc",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {script}
                    </div>
                  </div>
                </div>

                {/* Quality notice */}
                {qualityMetadata?.quality === "degraded" && (
                  <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(232,227,220,0.08)", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span>⚠️</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "12px", fontWeight: 500, marginBottom: "2px" }}>Voice consistency notice</div>
                      <div style={{ fontSize: "11px", opacity: 0.6 }}>This generation may have slight variations.</div>
                    </div>
                    <button
                      onClick={() => { resetComposer(); setTimeout(generateVoice, 100) }}
                      style={{ padding: "6px 12px", borderRadius: "100px", border: "1px solid rgba(255,200,100,0.3)", background: "rgba(255,200,100,0.08)", color: "#ffcc66", fontSize: "11px", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}
                    >
                      Regenerate
                    </button>
                  </div>
                )}

                {/* CTA row */}
                <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(232,227,220,0.08)", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "rgba(232,227,220,0.55)", flex: 1 }}>
                    {generationCount === 1
                      ? "Sign up to download and use commercially"
                      : generationCount >= 3
                      ? "Sign up to save all your takes"
                      : "Sign up to direct every word"}
                  </span>
                  <a
                    href="https://composer.lyricvoices.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: "8px 16px", borderRadius: "100px", border: "none", background: "linear-gradient(120deg, rgba(232,227,220,0.95), rgba(215,210,200,0.95))", color: "#1c1a17", fontSize: "12px", fontWeight: 500, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap" }}
                  >
                    Sign up free
                  </a>
                  <a
                    href="https://composer.lyricvoices.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: "8px 16px", borderRadius: "100px", border: "1px solid rgba(232,227,220,0.2)", background: "transparent", color: "#e8e3dc", fontSize: "12px", fontWeight: 500, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap" }}
                  >
                    Log in
                  </a>
                </div>
              </div>

              <button
                onClick={resetComposer}
                style={{ background: "none", border: "none", color: "rgba(232,227,220,0.45)", fontSize: "12px", cursor: "pointer", padding: "8px 0", textAlign: "center", fontFamily: "inherit" }}
              >
                ← Compose new audio
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
