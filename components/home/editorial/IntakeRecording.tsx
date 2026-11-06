"use client"

import { useRef, useState } from "react"

export default function IntakeRecording() {
  const video = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState(false)
  return (
    <details
      className="le-intake"
      onToggle={(event) => {
        if (!event.currentTarget.open) video.current?.pause()
      }}
    >
      <summary>
        <span>Watch the Callio intake</span>
        <span className="le-caption">Recorded in the product</span>
        <span className="le-disclosure-icon" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="le-intake-content">
        <video
          ref={video}
          controls
          playsInline
          preload="none"
          poster="/images/callio/01-begin-intake.png"
          aria-label="Recorded Callio intake showing industry, company, and channel selection"
          onError={() => setError(true)}
        >
          <source src="/videos/callio-intake.webm" type="video/webm" />
          <source src="/videos/callio-intake.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>
        {error ? (
          <p role="status">
            The recording is unavailable.{" "}
            <a href="/callio" className="le-text-link">
              Explore the Callio walkthrough →
            </a>
          </p>
        ) : null}
        <p className="le-caption">
          Select an industry, add company context, and choose your channels.
          Product recording · 10 seconds · No audio.
        </p>
      </div>
    </details>
  )
}
