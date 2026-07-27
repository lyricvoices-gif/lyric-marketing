"use client"

/* Small produced-sample player for the roster cards (Sam / James). One
   audio element per instance; play-on-click toggles, resets on end or
   error (so an unreachable sample fails quiet, not broken).

   Sample URLs follow the callio produced-audio convention
   ({AUDIO_BASE}/phone/{token}_default.mp3) — unverifiable from the build
   sandbox, marked in the page's placeholder list. */

import { useEffect, useRef, useState } from "react"

export default function RosterSamplePlay({ name, src }: { name: string; src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const reset = () => setPlaying(false)
    a.addEventListener("ended", reset)
    a.addEventListener("error", reset)
    return () => {
      a.removeEventListener("ended", reset)
      a.removeEventListener("error", reset)
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
      return
    }
    a.src = src
    setPlaying(true)
    a.play().catch(() => setPlaying(false))
  }

  return (
    <>
      <button
        type="button"
        className={`lv-agents-voice-sample${playing ? " is-playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? `Pause ${name} sample` : `Play ${name} sample`}
        aria-pressed={playing}
      >
        <span className="lv-agents-voice-sample-glyph" aria-hidden="true">
          {playing ? "■" : "▶"}
        </span>
        {playing ? "Playing" : `Hear ${name}`}
      </button>
      <audio ref={audioRef} preload="none" />
    </>
  )
}
