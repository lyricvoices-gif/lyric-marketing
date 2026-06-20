"use client"

/* Audio samples — section 4's "hear it" player. Three short governance clips,
   each a playable row whose visible title + description are the governance
   claim. The claims are always visible, so the section reads fully without
   sound; the audio rewards a click. One clip plays at a time (a single shared
   <audio>); play on click only, the button toggles to pause. All playback
   feedback lives on the button: a gold progress arc rings the play/pause glyph
   and sweeps with real playback (no separate progress line). While a clip
   plays, its row's description lights.

   This is an audio player, deliberately unlike the eval/verticals cards.
   prefers-reduced-motion keeps the functional progress arc (it is feedback,
   not decoration) and drops only its smoothing transition. */

import { useEffect, useRef, useState } from "react"

type Clip = { src: string; title: string; desc: string }

/* "Greeting+Disclosure.wav" carries a literal "+"; reference it URL-encoded
   (%2B) so it loads reliably. The other two are plain names. Each row has a
   title (the governance category) over a "listen as..." description, the same
   hierarchy as the Edition 01 listen rows. */
const CLIPS: Clip[] = [
  {
    src: "/Greeting%2BDisclosure.wav",
    title: "Pronunciation + Disclosure",
    desc: "Listen as the agent pronounces “Caldera” on brand, and discloses the call may be recorded.",
  },
  {
    src: "/Register.wav",
    title: "Register",
    desc: "Listen as the agent holds a calm register under stress.",
  },
  {
    src: "/Terminology.wav",
    title: "Terminology",
    desc: "Listen as the agent says “provisional credit” on brand.",
  },
]

/* Progress ring circumference (r=22 in the 48x48 button). */
const RING_R = 22
const RING_C = 2 * Math.PI * RING_R

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  )
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="7" y="5" width="3.5" height="14" rx="1" />
      <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
    </svg>
  )
}

export default function AudioSamples() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => {
      if (a.duration > 0) setProgress(a.currentTime / a.duration)
    }
    const onEnd = () => {
      setPlaying(null)
      setProgress(0)
    }
    const onError = () => {
      setPlaying(null)
      setProgress(0)
    }
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("ended", onEnd)
    a.addEventListener("error", onError)
    return () => {
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("ended", onEnd)
      a.removeEventListener("error", onError)
    }
  }, [])

  const toggle = (i: number) => {
    const a = audioRef.current
    if (!a) return
    if (playing === i) {
      a.pause()
      setPlaying(null)
      setProgress(0)
      return
    }
    // Assigning src restarts from the beginning, including the same clip.
    a.src = CLIPS[i].src
    setProgress(0)
    setPlaying(i)
    a.play().catch(() => {
      setPlaying(null)
      setProgress(0)
    })
  }

  return (
    <div className="lv-aud">
      <p className="lv-aud-label">Hear it</p>
      <ul className="lv-aud-list">
        {CLIPS.map((c, i) => {
          const isOn = playing === i
          return (
            <li key={c.src} className={`lv-aud-row${isOn ? " is-playing" : ""}`}>
              <button
                type="button"
                className={`lv-aud-play${isOn ? " is-playing" : ""}`}
                onClick={() => toggle(i)}
                aria-label={isOn ? "Pause sample" : "Play sample"}
                aria-pressed={isOn}
              >
                {/* All playback feedback lives on the button: a play/pause
                    glyph plus a gold progress arc that fills as the clip
                    plays. */}
                <svg className="lv-aud-ring" viewBox="0 0 48 48" aria-hidden="true">
                  <circle className="lv-aud-ring-track" cx="24" cy="24" r={RING_R} />
                  <circle
                    className="lv-aud-ring-prog"
                    cx="24"
                    cy="24"
                    r={RING_R}
                    style={{
                      strokeDasharray: RING_C,
                      strokeDashoffset: RING_C * (1 - (isOn ? progress : 0)),
                    }}
                  />
                </svg>
                <span className="lv-aud-glyph">
                  {isOn ? <PauseGlyph /> : <PlayGlyph />}
                </span>
              </button>
              <div className="lv-aud-body">
                <h3 className="lv-aud-title">{c.title}</h3>
                <p className="lv-aud-desc">{c.desc}</p>
              </div>
            </li>
          )
        })}
      </ul>
      {/* One shared element: starting a clip stops any other. */}
      <audio ref={audioRef} preload="none" />
    </div>
  )
}
