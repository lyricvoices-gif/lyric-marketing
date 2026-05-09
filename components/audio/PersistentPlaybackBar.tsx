"use client"

/* Persistent playback bar — fixed to the bottom of the viewport, full
   width, sits above all other content. Slides in when the AudioPlayer
   context has a track loaded; slides out when the user dismisses it
   (X) or stop() is called.

   This is shared infrastructure: every audio surface on the site (the
   Listen section now, Notes article pages later) routes through the
   same context, so the bar is the single place a visitor controls
   playback regardless of which surface started it. */

import { useAudioPlayer } from "./AudioPlayerProvider"

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00"
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export default function PersistentPlaybackBar() {
  const { track, isPlaying, currentTime, duration, toggle, stop, seek } =
    useAudioPlayer()

  const visible = track !== null
  const progress =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0

  return (
    <div
      className="lv-playback-bar"
      data-visible={visible}
      role="region"
      aria-label="Audio playback"
      aria-hidden={!visible}
    >
      {track && (
        <>
          {/* Voice attribution — colored dot in the voice's brand color
              + "Read by Voice · Title" in body type. */}
          <div className="lv-playback-meta">
            <span
              className="lv-playback-dot"
              style={{ background: track.voiceColor }}
              aria-hidden="true"
            />
            <span className="lv-playback-voice">{track.voiceName}</span>
            <span className="lv-playback-sep" aria-hidden="true">
              ·
            </span>
            <span className="lv-playback-title">{track.title}</span>
          </div>

          {/* Editorial-coded progress: thin olive line that fills with
              gold. Tappable for seek; keyboard accessible via the
              underlying button-like role. */}
          <button
            type="button"
            className="lv-playback-track"
            aria-label={`Audio progress, ${formatTime(currentTime)} of ${formatTime(duration)}. Click to seek.`}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pct = (e.clientX - rect.left) / rect.width
              if (duration > 0)
                seek(Math.max(0, Math.min(duration, pct * duration)))
            }}
          >
            <span
              className="lv-playback-track-fill"
              style={{ width: `${progress}%` }}
              aria-hidden="true"
            />
          </button>

          <span className="lv-playback-time">
            {formatTime(currentTime)}{" "}
            <span className="lv-playback-time-sep" aria-hidden="true">
              /
            </span>{" "}
            {formatTime(duration)}
          </span>

          <button
            type="button"
            className="lv-playback-toggle"
            onClick={() => toggle(track)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseGlyph /> : <PlayGlyph />}
          </button>

          <button
            type="button"
            className="lv-playback-close"
            onClick={stop}
            aria-label="Close player"
          >
            <CloseGlyph />
          </button>
        </>
      )}
    </div>
  )
}

function PlayGlyph() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <path d="M0 0L12 7L0 14V0Z" fill="currentColor" />
    </svg>
  )
}

function PauseGlyph() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="3" height="14" fill="currentColor" />
      <rect x="7" y="0" width="3" height="14" fill="currentColor" />
    </svg>
  )
}

function CloseGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}
