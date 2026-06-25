"use client"

/* Movement 2 — "Hear it." The audible sibling of the "See it in text" section:
   editorial, typographic, two states that read as OPPOSITES at a glance, words
   doing the work. Each scenario is a row with two columns — UNGOVERNED (left)
   and GOVERNED (right). A short SNIPPET teases each spoken line and ENACTS the
   contrast in type (ungoverned wanders in loose italic and trails off; governed
   lands tight, upright, and resolved). The audio delivers what text can't
   (pacing, register, warmth), so it stays essential, not redundant.

   Each column is itself the understated play control ("hear this one"), with a
   thin gold progress underline while active. One shared <audio> drives all four
   clips, so starting any clip stops whatever was playing (one-at-a-time).

   Wiring is deliberate and verifiable: every UNGOVERNED column points at an
   *ungoverned* mp3, every GOVERNED column at a *governed* mp3. Snippets are
   teasers only — the full spoken line is never printed; the audio is the payoff. */

import { useEffect, useRef, useState, type CSSProperties } from "react"

type Side = { src: string; snippet: string }

type Scenario = {
  id: string
  label: string
  caption: string
  ungoverned: Side
  governed: Side
}

const SCENARIOS: Scenario[] = [
  {
    id: "ex1",
    label: "A customer asks about a credit card rate.",
    caption: "Same facts. Listen to the pacing and register that the words can’t show.",
    ungoverned: {
      src: "/VoiceAgent1ungoverned.mp3",
      snippet: "Yeah, so your APR’s twenty-four ninety-nine, and the Cascade card’s a really popular one…",
    },
    governed: {
      src: "/VoiceAgent1governed.mp3",
      snippet: "Your Annual Percentage Rate is 24.99%.",
    },
  },
  {
    id: "ex2",
    label: "A customer asks if a document was sent.",
    caption: "One wanders. One lands. The difference is in the delivery.",
    ungoverned: {
      src: "/VoiceAgent2ungoverned.mp3",
      snippet:
        "Um, okay, so let me just take a look here for you… it should’ve gone to the email we have on file, so maybe check your inbox, and if it’s not there…",
    },
    governed: {
      src: "/VoiceAgent2governed.mp3",
      snippet: "Your disclosure was sent to the email on file.",
    },
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

function Column({
  variant,
  snippet,
  isOn,
  progress,
  onToggle,
  ariaLabel,
}: {
  variant: "ungoverned" | "governed"
  snippet: string
  isOn: boolean
  progress: number
  onToggle: () => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      className={`lv-opus-hr-col lv-opus-hr-${variant}${isOn ? " is-playing" : ""}`}
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-pressed={isOn}
    >
      <span className="lv-opus-hr-label">{variant === "ungoverned" ? "Ungoverned" : "Governed"}</span>
      <p className="lv-opus-hr-snippet">{snippet}</p>
      <span className="lv-opus-hr-play">
        <span className="lv-opus-hr-glyph" aria-hidden="true">
          {isOn ? <PauseGlyph /> : <PlayGlyph />}
        </span>
        <span className="lv-opus-hr-playlabel">{isOn ? "Playing" : "Play"}</span>
        <span
          className="lv-opus-hr-progress"
          aria-hidden="true"
          style={{ ["--p" as string]: String(isOn ? progress : 0) } as CSSProperties}
        >
          <span className="lv-opus-hr-progress-fill" />
        </span>
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
    <div className="lv-opus-hr">
      {SCENARIOS.map((s) => {
        const sides: Array<{ variant: "ungoverned" | "governed"; side: Side }> = [
          { variant: "ungoverned", side: s.ungoverned },
          { variant: "governed", side: s.governed },
        ]
        return (
          <div className="lv-opus-hr-row" key={s.id}>
            <p className="lv-opus-hr-scenario">{s.label}</p>
            <div className="lv-opus-hr-pair">
              {sides.map(({ variant, side }) => {
                const key = `${s.id}-${variant}`
                const isOn = playing === key
                return (
                  <Column
                    key={key}
                    variant={variant}
                    snippet={side.snippet}
                    isOn={isOn}
                    progress={isOn ? progress : 0}
                    onToggle={() => toggle(key, side.src)}
                    ariaLabel={`${isOn ? "Pause" : "Play"} the ${variant} take. ${s.label}`}
                  />
                )
              })}
            </div>
            <p className="lv-opus-hr-caption">{s.caption}</p>
          </div>
        )
      })}

      {/* One shared element: starting any clip stops the previous one. */}
      <audio ref={audioRef} preload="none" />
    </div>
  )
}
