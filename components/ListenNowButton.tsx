"use client"

import React from "react"

const DARK = "#2b2a25"
const LIGHT = "#f5f3ef"

export default function ListenNowButton({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
      audioRef.current.onended = () => setIsPlaying(false)
    }
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      <style>{`
        @keyframes edition-sweep {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
      <button
        onClick={toggle}
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
          border: "none",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isPlaying && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #2b2a25 0%, #c9a96e 40%, #a8864e 60%, #2b2a25 100%)",
              backgroundSize: "200% 100%",
              animation: "edition-sweep 2s ease-in-out infinite",
              borderRadius: "100px",
              opacity: 0.9,
            }}
          />
        )}
        <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: "8px" }}>
          {isPlaying ? (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
              <rect x="0" y="0" width="3.5" height="12" rx="1" />
              <rect x="6.5" y="0" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
              <path d="M0 0L10 6L0 12V0Z" />
            </svg>
          )}
          {isPlaying ? "Listening…" : "Listen now"}
        </span>
      </button>
    </>
  )
}
