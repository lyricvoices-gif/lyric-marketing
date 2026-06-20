"use client"

/* Audio samples — section 4's "hear it" player. Three short governance clips,
   each a playable row whose visible annotation(s) are the governance claim.
   The claims are always visible, so the section reads fully without sound; the
   audio rewards a click. One clip plays at a time (a single shared <audio>);
   play on click only, the button toggles to pause, and a thin progress line
   fills with real playback. While a clip plays, its row's annotation(s) light.

   This is an audio player, deliberately unlike the eval/verticals cards.
   prefers-reduced-motion keeps the functional progress fill (it is feedback,
   not decoration) and drops only its smoothing transition. */

import { useEffect, useRef, useState } from "react"

type Clip = { src: string; annotations: string[] }

/* "Greeting+Disclosure.wav" carries a literal "+"; reference it URL-encoded
   (%2B) so it loads reliably. The other two are plain names. */
const CLIPS: Clip[] = [
  {
    src: "/Greeting%2BDisclosure.wav",
    annotations: ["“Caldera” pronounced on brand", "Required disclosure, delivered to spec"],
  },
  {
    src: "/Register.wav",
    annotations: ["Register held calm under stress"],
  },
  {
    src: "/Terminology.wav",
    annotations: ["“provisional credit” said on brand"],
  },
]

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
                className="lv-aud-play"
                onClick={() => toggle(i)}
                aria-label={isOn ? "Pause sample" : "Play sample"}
                aria-pressed={isOn}
              >
                {isOn ? <PauseGlyph /> : <PlayGlyph />}
              </button>
              <div className="lv-aud-body">
                <div className="lv-aud-claims">
                  {c.annotations.map((a) => (
                    <p key={a} className="lv-aud-claim">
                      <span className="lv-aud-dot" aria-hidden="true" />
                      {a}
                    </p>
                  ))}
                </div>
                <div className="lv-aud-track" aria-hidden="true">
                  <span
                    className="lv-aud-fill"
                    style={{ transform: `scaleX(${isOn ? progress : 0})` }}
                  />
                </div>
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
