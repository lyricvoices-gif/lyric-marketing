"use client"

import Image from "next/image"
import { useRef, useState } from "react"

type Props = {
  /** The voice persona — the role being performed (e.g., "Morgan"). */
  voiceName: string
  /** The real artist behind the performance (e.g., "Mara Vale").
      Renders as the dominant element in the card. */
  artistName: string
  descriptor: string
  image?: string
  imageAlt?: string
  sampleUrl?: string
}

const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"
const GOLD   = "#c9a96e"

export default function VoiceRosterCard({
  voiceName,
  artistName,
  descriptor,
  image,
  imageAlt,
  sampleUrl,
}: Props) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function togglePlay() {
    if (!sampleUrl) return
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
    <article
      className="lyric-voice-card"
      style={{
        background: "#ffffff",
        border: `1px solid ${BORDER}`,
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TODO: Replace floral imagery with editorial artist portraits when
          production photography is complete. Reference UnitedMasters' artist
          portrait treatment — clean editorial portraiture, not stock. */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3 / 2",
          background: image ? "#d4c9bc" : "#2b2a25",
          overflow: "hidden",
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? `${artistName}, performing as ${voiceName}`}
            fill
            sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(40px, 10vw, 72px)",
                fontWeight: 500,
                color: GOLD,
                lineHeight: 1,
                letterSpacing: "0",
                textAlign: "center",
              }}
            >
              {artistName}
            </span>
          </div>
        )}
      </div>

      {/* Body — artist name dominant, voice persona as a smaller connector
          line beneath. Mirrors how film and theater credits read: the human
          first, the role they're playing second. */}
      <div
        style={{
          padding: "24px 22px 22px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          flex: 1,
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "30px",
              fontWeight: 600,
              color: TEXT1,
              margin: "0 0 4px",
              letterSpacing: "0",
              lineHeight: 1.05,
            }}
          >
            {artistName}
          </h3>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: TEXT3,
              margin: "0 0 14px",
              letterSpacing: "0",
            }}
          >
            performing as {voiceName}
          </p>
          <p
            style={{
              fontSize: "14px",
              color: TEXT2,
              lineHeight: 1.5,
              margin: 0,
              letterSpacing: "0",
            }}
          >
            {descriptor}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: "12px",
          }}
        >
          <button
            type="button"
            onClick={togglePlay}
            disabled={!sampleUrl}
            aria-label={
              !sampleUrl
                ? `${voiceName} sample coming soon`
                : playing
                ? `Pause ${voiceName} sample`
                : `Play ${voiceName} sample`
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              minHeight: "44px",
              padding: "0 22px",
              borderRadius: "100px",
              border: "1px solid transparent",
              background: sampleUrl
                ? playing
                  ? TEXT1
                  : TEXT1
                : "transparent",
              color: sampleUrl ? "#f5f3ef" : TEXT3,
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0",
              cursor: sampleUrl ? "pointer" : "default",
              transition: "background 0.18s ease, color 0.18s ease",
            }}
          >
            {!sampleUrl ? (
              "Sample coming soon"
            ) : (
              <>
                <span aria-hidden="true" style={{ fontSize: "10px" }}>
                  {playing ? "■" : "▶"}
                </span>
                {playing ? "Playing" : "Listen"}
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
