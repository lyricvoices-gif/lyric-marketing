"use client"

import { useState, useRef } from "react"

export default function AudioPlayButton({
  sampleUrl,
  voiceName,
}: {
  sampleUrl: string
  voiceName: string
}) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function toggle() {
    if (!audioRef.current) {
      audioRef.current = new Audio(sampleUrl)
      audioRef.current.onended = () => setPlaying(false)
    }
    if (playing) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? `Pause ${voiceName} sample` : `Play ${voiceName} sample`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "7px 14px",
        background: playing ? "rgba(28, 25, 23, 0.2)" : "rgba(28, 25, 23, 0.12)",
        color: "#1c1917",
        borderRadius: "100px",
        border: "none",
        fontSize: "12px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      {playing ? "⏸ Playing..." : "▶ Play sample"}
    </button>
  )
}
