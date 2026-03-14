"use client"

import { useState, useEffect, useRef } from "react"

const DARK  = "#2b2a25"
const LIGHT = "#f5f3ef"
const GOLD  = "#c9a96e"
const TEXT3 = "#9c958f"

const voices = [
  {
    id: "morgan",
    name: "Morgan",
    archetype: "The Anchor",
    description: "Built for the moments that need to be believed.",
    intents: ["Authoritative", "Warm", "Composed"],
    ambientRgb: "196,151,127",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Morgan%20(sample).wav",
  },
  {
    id: "nova",
    name: "Nova",
    archetype: "The Intimist",
    description: "Built for the moments that need to be felt.",
    intents: ["Compassionate", "Encouraging", "Calm"],
    ambientRgb: "168,181,154",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Nova_calm%20(sample).wav",
  },
  {
    id: "atlas",
    name: "Atlas",
    archetype: "The Guide",
    description: "Built for the moments that need to make sense.",
    intents: ["Patient", "Clear", "Supportive"],
    ambientRgb: "157,155,146",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Atlas_sample.wav",
  },
  {
    id: "riven",
    name: "Riven",
    archetype: "The Narrator",
    description: "Built for the moments that need to carry weight.",
    intents: ["Intrigue", "Tension", "Wonder"],
    ambientRgb: "156,130,117",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Riven%20(sample).wav",
  },
  {
    id: "hex",
    name: "Hex",
    archetype: "The Wildcard",
    description: "Built for the moments that need an edge.",
    intents: ["Playful", "Ironic", "Bold"],
    ambientRgb: "184,122,92",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Hex%20(sample).wav",
  },
]

export default function VoiceCarousel() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const transitioning = useRef(false)

  const goTo = (next: number) => {
    if (transitioning.current || next === current) return
    transitioning.current = true
    // Stop audio if playing
    audioRef.current?.pause()
    setPlayingId(null)
    setVisible(false)
    setTimeout(() => {
      setCurrent(next)
      setVisible(true)
      setTimeout(() => { transitioning.current = false }, 100)
    }, 550)
  }

  // Auto-advance
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!transitioning.current) goTo((current + 1) % voices.length)
    }, 4500)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const voice = voices[current]

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(voice.sampleUrl)
      audioRef.current.onended = () => setPlayingId(null)
    }
    if (playingId === voice.id) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlayingId(null)
    } else {
      audioRef.current.src = voice.sampleUrl
      audioRef.current.onended = () => setPlayingId(null)
      audioRef.current.play().catch(() => setPlayingId(null))
      setPlayingId(voice.id)
    }
  }

  const isPlaying = playingId === voice.id

  return (
    <div style={{
      background: DARK,
      position: "relative",
      overflow: "hidden",
      minHeight: "520px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Ambient background wash */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(${voice.ambientRgb},0.13) 0%, transparent 70%)`,
        transition: "background 1.2s ease",
        pointerEvents: "none",
      }} />

      {/* Voice content */}
      <div style={{
        position: "relative",
        maxWidth: "640px",
        width: "100%",
        padding: "80px 48px 48px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}>
        {/* Archetype */}
        <p style={{
          fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em",
          textTransform: "uppercase", color: TEXT3,
          margin: "0 0 20px",
        }}>
          {voice.archetype}
        </p>

        {/* Name */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(72px, 9vw, 120px)",
          fontWeight: 400,
          letterSpacing: "-0.03em",
          lineHeight: 0.9,
          color: LIGHT,
          margin: "0 0 32px",
        }}>
          {voice.name}
        </h2>

        {/* Description */}
        <p style={{
          fontSize: "16px",
          color: "rgba(245,243,239,0.5)",
          lineHeight: 1.6,
          margin: "0 0 32px",
          letterSpacing: "-0.01em",
        }}>
          {voice.description}
        </p>

        {/* Intent tags */}
        <div style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}>
          {voice.intents.map((intent) => (
            <span key={intent} style={{
              fontSize: "12px",
              color: "rgba(245,243,239,0.45)",
              border: "1px solid rgba(245,243,239,0.1)",
              borderRadius: "100px",
              padding: "5px 14px",
            }}>
              {intent}
            </span>
          ))}
        </div>

        {/* Play button */}
        <button
          onClick={togglePlay}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 22px",
            borderRadius: "100px",
            border: "1px solid rgba(245,243,239,0.18)",
            background: isPlaying ? "rgba(245,243,239,0.1)" : "transparent",
            color: "rgba(245,243,239,0.75)",
            fontSize: "13px",
            fontWeight: 400,
            cursor: "pointer",
            transition: "all 0.2s",
            fontFamily: "inherit",
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ fontSize: "9px" }}>{isPlaying ? "⏸" : "▶"}</span>
          <span>{isPlaying ? "Playing" : "Hear this voice"}</span>
        </button>
      </div>

      {/* Navigation dots */}
      <div style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        paddingBottom: "48px",
        position: "relative",
      }}>
        {voices.map((v, i) => (
          <button
            key={v.id}
            onClick={() => goTo(i)}
            aria-label={v.name}
            style={{
              width: i === current ? "24px" : "6px",
              height: "6px",
              borderRadius: "100px",
              border: "none",
              background: i === current ? GOLD : "rgba(245,243,239,0.2)",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.5s ease",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
