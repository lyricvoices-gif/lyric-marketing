"use client"

/* Movement 2 — "Hear it." Two example rows, each an A/B toggle between an
   ungoverned and a governed take of the same answer. One shared <audio> drives
   all four clips, so starting any take stops whatever was playing (the
   one-at-a-time pattern used by the homepage / Voices "Hear it" controls). The
   active button carries a gold progress arc; resting buttons carry a quiet
   accent. Files are referenced by their exact in-repo names from /public.

   Wiring is deliberate and verifiable: every "Ungoverned" button points at a
   *ungoverned* mp3, every "Governed" button at a *governed* mp3. */

import { useEffect, useRef, useState } from "react"

type Take = { variant: "ungoverned" | "governed"; src: string }

type Example = {
  id: string
  question: string
  caption: string
  ungoverned: string
  governed: string
}

const EXAMPLES: Example[] = [
  {
    id: "ex1",
    question: "A customer asks about a credit card rate.",
    caption: "Listen to the pacing and the register. Same facts, said two ways.",
    ungoverned: "/VoiceAgent1ungoverned.mp3",
    governed: "/VoiceAgent1governed.mp3",
  },
  {
    id: "ex2",
    question: "A customer asks if a document was sent.",
    caption: "One wanders. One lands.",
    ungoverned: "/VoiceAgent2ungoverned.mp3",
    governed: "/VoiceAgent2governed.mp3",
  },
]

/* Ring geometry for the play controls. */
const R = 26
const C = 2 * Math.PI * R

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

function AbButton({
  variant,
  isOn,
  progress,
  onToggle,
  ariaLabel,
}: {
  variant: "ungoverned" | "governed"
  isOn: boolean
  progress: number
  onToggle: () => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      className={`lv-opus-ab-btn lv-opus-ab-${variant}${isOn ? " is-playing" : ""}`}
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-pressed={isOn}
    >
      <span className="lv-opus-ab-control" aria-hidden="true">
        <svg className="lv-opus-ab-ring" viewBox="0 0 60 60">
          <circle className="lv-opus-ab-ring-track" cx="30" cy="30" r={R} />
          <circle
            className="lv-opus-ab-ring-prog"
            cx="30"
            cy="30"
            r={R}
            style={{ strokeDasharray: C, strokeDashoffset: C * (1 - progress) }}
          />
        </svg>
        <span className="lv-opus-ab-glyph">{isOn ? <PauseGlyph /> : <PlayGlyph />}</span>
      </span>
      <span className="lv-opus-ab-text">
        <span className="lv-opus-ab-variant">
          {variant === "ungoverned" ? "Ungoverned" : "Governed"}
        </span>
        <span className="lv-opus-ab-state">{isOn ? "Playing" : "Play"}</span>
      </span>
    </button>
  )
}

export default function OpusHearIt() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => {
      if (a.duration > 0) setProgress(a.currentTime / a.duration)
    }
    const reset = () => {
      setPlaying(null)
      setProgress(0)
    }
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("ended", reset)
    a.addEventListener("error", reset)
    return () => {
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("ended", reset)
      a.removeEventListener("error", reset)
    }
  }, [])

  const toggle = (key: string, src: string) => {
    const a = audioRef.current
    if (!a) return
    if (playing === key) {
      a.pause()
      setPlaying(null)
      setProgress(0)
      return
    }
    a.src = src
    setProgress(0)
    setPlaying(key)
    a.play().catch(() => {
      setPlaying(null)
      setProgress(0)
    })
  }

  return (
    <div className="lv-opus-ab">
      {EXAMPLES.map((ex) => {
        const takes: Take[] = [
          { variant: "ungoverned", src: ex.ungoverned },
          { variant: "governed", src: ex.governed },
        ]
        return (
          <div className="lv-opus-ab-row" key={ex.id}>
            <p className="lv-opus-ab-q">{ex.question}</p>
            <div className="lv-opus-ab-controls">
              {takes.map((t) => {
                const key = `${ex.id}-${t.variant}`
                const isOn = playing === key
                return (
                  <AbButton
                    key={key}
                    variant={t.variant}
                    isOn={isOn}
                    progress={isOn ? progress : 0}
                    onToggle={() => toggle(key, t.src)}
                    ariaLabel={`${isOn ? "Pause" : "Play"} the ${t.variant} take: ${ex.question}`}
                  />
                )
              })}
            </div>
            <p className="lv-opus-ab-caption">{ex.caption}</p>
          </div>
        )
      })}

      {/* One shared element: starting any take stops the previous one. */}
      <audio ref={audioRef} preload="none" />
    </div>
  )
}
