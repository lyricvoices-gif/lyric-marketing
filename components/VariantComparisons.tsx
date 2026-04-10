"use client"

import { useState, useRef, useCallback } from "react"

const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"
const GOLD   = "#c9a96e"

const SAMPLE_LINE = "This decision changes the trajectory of everything that follows."

const variants = [
  {
    intent: "Warm",
    voice: "Morgan",
    sampleUrl: "/morgan-warm.wav",
  },
  {
    intent: "Encouraging",
    voice: "Nova",
    sampleUrl: "/nova-encouraging.wav",
  },
  {
    intent: "Supportive",
    voice: "Atlas",
    sampleUrl: "/atlas-supportive.wav",
  },
]

export default function VariantComparisons() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([null, null, null])

  const toggle = useCallback((index: number) => {
    if (playingIndex === index) {
      audioRefs.current[index]?.pause()
      if (audioRefs.current[index]) audioRefs.current[index]!.currentTime = 0
      setPlayingIndex(null)
      return
    }
    if (playingIndex !== null && audioRefs.current[playingIndex]) {
      audioRefs.current[playingIndex]!.pause()
      audioRefs.current[playingIndex]!.currentTime = 0
    }
    if (!audioRefs.current[index]) {
      audioRefs.current[index] = new Audio(variants[index].sampleUrl)
    }
    audioRefs.current[index]!.onended = () => setPlayingIndex(null)
    audioRefs.current[index]!.play().catch(() => setPlayingIndex(null))
    setPlayingIndex(index)
  }, [playingIndex])

  return (
    <div>
      {variants.map((v, i) => {
        const isPlaying = playingIndex === i
        return (
          <div key={v.intent}>
            <div style={{
              borderTop: `1px solid ${BORDER}`,
              paddingTop: "36px",
              marginTop: i === 0 ? 0 : "36px",
            }}>
              {/* Variant label */}
              <p style={{
                fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: isPlaying ? GOLD : TEXT3,
                margin: "0 0 18px",
                transition: "color 0.25s",
              }}>
                {v.intent}
              </p>

              {/* Play button + line */}
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>

                {/* Minimal circular play button */}
                <button
                  onClick={() => toggle(i)}
                  aria-label={isPlaying ? "Pause" : `Play ${v.intent} sample`}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: `1px solid ${isPlaying ? TEXT1 : BORDER}`,
                    background: isPlaying ? TEXT1 : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "background 0.25s, border-color 0.25s",
                    fontFamily: "inherit",
                  }}
                >
                  {isPlaying ? (
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="#f5f3ef">
                      <rect x="0" y="0" width="3" height="10" />
                      <rect x="5" y="0" width="3" height="10" />
                    </svg>
                  ) : (
                    <svg width="8" height="10" viewBox="0 0 8 10" fill={TEXT2}>
                      <path d="M0 0L8 5L0 10V0Z" />
                    </svg>
                  )}
                </button>

                {/* Sample text */}
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 2.2vw, 26px)",
                  fontStyle: "italic",
                  color: isPlaying ? TEXT1 : "rgba(26,26,24,0.38)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  transition: "color 0.3s",
                }}>
                  &ldquo;{SAMPLE_LINE}&rdquo;
                </p>
              </div>

              {/* Voice attribution */}
              <p style={{
                fontSize: "12px",
                color: isPlaying ? TEXT3 : "rgba(156,149,143,0.45)",
                margin: "12px 0 0 62px",
                transition: "color 0.25s",
              }}>
                {v.voice}
              </p>
            </div>
          </div>
        )
      })}
      <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: "36px" }} />
    </div>
  )
}
