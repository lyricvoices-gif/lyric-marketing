"use client"

import { useState, useRef, useCallback } from "react"

const LIGHT  = "#f5f3ef"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"
const DARK   = "#2b2a25"
const GOLD   = "#c9a96e"

const comparisons = [
  {
    intent: "Authoritative",
    voice: "Morgan · The Anchor",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Morgan%20(sample).wav",
    barHeights: [55, 70, 42, 80, 60, 75, 50, 85, 45, 72, 65, 50, 78, 55, 68, 45, 82, 58, 70, 48],
  },
  {
    intent: "Warm",
    voice: "Nova · The Intimist",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Nova_calm%20(sample).wav",
    barHeights: [38, 52, 60, 45, 58, 48, 65, 40, 62, 50, 68, 42, 58, 48, 60, 44, 65, 50, 58, 45],
  },
  {
    intent: "Composed",
    voice: "Atlas · The Guide",
    sampleUrl: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Atlas_sample.wav",
    barHeights: [42, 55, 42, 58, 45, 60, 40, 55, 45, 58, 42, 60, 44, 55, 48, 42, 58, 46, 55, 44],
  },
]

export default function DirectionComparisons() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([null, null, null])

  const toggle = useCallback((index: number) => {
    const url = comparisons[index].sampleUrl

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
      audioRefs.current[index] = new Audio(url)
    }
    audioRefs.current[index]!.onended = () => setPlayingIndex(null)
    audioRefs.current[index]!.play().catch(() => setPlayingIndex(null))
    setPlayingIndex(index)
  }, [playingIndex])

  return (
    <>
      <style>{`
        @keyframes bar-pulse {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        {comparisons.map((c, i) => {
          const isPlaying = playingIndex === i
          return (
            <div
              key={c.intent}
              style={{
                border: `1px solid ${isPlaying ? "rgba(43,42,37,0.6)" : BORDER}`,
                borderRadius: "16px",
                padding: "28px 24px",
                background: isPlaying ? DARK : "#fff",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                transition: "background 0.35s ease, border-color 0.35s ease",
              }}
            >
              {/* Intent + voice */}
              <div>
                <p style={{
                  fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isPlaying ? `rgba(201,169,110,0.85)` : TEXT3,
                  margin: "0 0 6px",
                  transition: "color 0.35s ease",
                }}>
                  {c.intent}
                </p>
                <p style={{
                  fontSize: "13px",
                  color: isPlaying ? "rgba(245,243,239,0.6)" : TEXT2,
                  margin: 0,
                  transition: "color 0.35s ease",
                }}>
                  {c.voice}
                </p>
              </div>

              {/* Waveform bars */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                height: "44px",
                overflow: "hidden",
              }}>
                {c.barHeights.map((h, j) => (
                  <div
                    key={j}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      background: isPlaying ? GOLD : BORDER,
                      borderRadius: "2px",
                      transformOrigin: "center",
                      transition: "background 0.35s ease",
                      ...(isPlaying ? {
                        animation: `bar-pulse ${0.48 + (j % 7) * 0.06}s ease-in-out ${(j * 0.035).toFixed(3)}s infinite`,
                      } : {}),
                    }}
                  />
                ))}
              </div>

              {/* Play button */}
              <button
                onClick={() => toggle(i)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "9px 18px",
                  borderRadius: "100px",
                  border: `1px solid ${isPlaying ? "rgba(245,243,239,0.15)" : BORDER}`,
                  background: isPlaying ? "rgba(245,243,239,0.07)" : LIGHT,
                  color: isPlaying ? "rgba(245,243,239,0.85)" : TEXT1,
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  transition: "all 0.35s ease",
                  fontFamily: "inherit",
                }}
              >
                <span style={{ fontSize: "9px" }}>{isPlaying ? "⏸" : "▶"}</span>
                <span>{isPlaying ? "Playing" : "Play sample"}</span>
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
