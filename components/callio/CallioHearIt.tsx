"use client"

/* Section 2 — Before / after. The one audio-grade module on the page, and the
   most differentiated asset: the same customer question answered two ways, so
   voice drift is audible. This is for a risk, compliance, and operations buyer,
   not only a brand-aware one.

   Reuses the site's audio playback mechanics (a single shared <audio>, one clip
   at a time, play/pause, real timeupdate progress, the gold accent) from the
   voices and sounds player, and composes a large play affordance, a visible
   waveform, and a duration readout on top — the serious listening treatment that
   appears once on the page.

   The persuasion lives in the annotations: "governed" is not an assertion, it
   names the rule. Each row carries one outcome tag mapped to the buyer who cares.

   Wiring is verifiable: every Ungoverned control points at an *ungoverned* mp3,
   every Governed control at a *governed* mp3. Snippets are teasers; the audio is
   the payoff. */

import { useEffect, useRef, useState, type CSSProperties } from "react"

type Annotation = string

type Side = { src: string; snippet: string; annotations: Annotation[] }

type Scenario = {
  id: string
  question: string
  outcome: { buyer: string; line: string }
  ungoverned: Side
  governed: Side
}

const SCENARIOS: Scenario[] = [
  {
    id: "ex1",
    question:
      "A customer asks about a credit-card rate. The answers shouldn’t sound like two different companies.",
    outcome: { buyer: "Compliance", line: "the required disclosure, said the same way every time" },
    ungoverned: {
      src: "/VoiceAgent1ungoverned.mp3",
      snippet: "Yeah, so your APR’s twenty-four ninety-nine, and the Cascade card’s a really popular one…",
      annotations: ["filler, fails concision standard", "casual register, not approved"],
    },
    governed: {
      src: "/VoiceAgent1governed.mp3",
      snippet: "Your Annual Percentage Rate is 24.99%.",
      annotations: ["exact disclosure language, required", "approved term, on brand"],
    },
  },
  {
    id: "ex2",
    question: "A customer asks if a document was sent.",
    outcome: { buyer: "CX", line: "consistent customer experience across agents" },
    ungoverned: {
      src: "/VoiceAgent2ungoverned.mp3",
      snippet:
        "Um, okay, so let me just take a look here for you… it should’ve gone to the email we have on file, so maybe check your inbox…",
      annotations: ["vague phrasing, not approved language", "hedging, fails clarity standard"],
    },
    governed: {
      src: "/VoiceAgent2governed.mp3",
      snippet: "Your disclosure was sent to the email on file.",
      annotations: ["plain confirmation, approved", "approved closing"],
    },
  },
]

/* Deterministic pseudo-waveform — same on server and client (no Math.random),
   so it hydrates cleanly. Heights read like a voice envelope, not a bar chart. */
const BARS = Array.from({ length: 56 }, (_, i) =>
  Math.round(5 + 17 * Math.abs(Math.sin(i * 1.27) * Math.cos(i * 0.43 + 1))),
)

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

function fmt(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00"
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, "0")}`
}

function Waveform({ progress }: { progress: number }) {
  return (
    <span className="lv-hear-wave" aria-hidden="true">
      {BARS.map((h, i) => (
        <span
          key={i}
          className={`lv-hear-wave-bar${i / BARS.length <= progress ? " is-played" : ""}`}
          style={{ height: `${h}px` }}
        />
      ))}
    </span>
  )
}

function Clip({
  variant,
  side,
  isOn,
  progress,
  elapsed,
  duration,
  onToggle,
  question,
}: {
  variant: "ungoverned" | "governed"
  side: Side
  isOn: boolean
  progress: number
  elapsed: number
  duration: number
  onToggle: () => void
  question: string
}) {
  const title = variant === "ungoverned" ? "Ungoverned Agent" : "Governed by Callio"
  return (
    <div className={`lv-hear-clip lv-hear-${variant}${isOn ? " is-playing" : ""}`}>
      <p className="lv-hear-clip-label">{title}</p>

      <div className="lv-hear-player">
        <button
          type="button"
          className="lv-hear-play"
          onClick={onToggle}
          aria-label={`${isOn ? "Pause" : "Play"} the ${variant} take. ${question}`}
          aria-pressed={isOn}
        >
          <span className="lv-hear-play-glow" aria-hidden="true" />
          <svg className="lv-hear-ring" viewBox="0 0 60 60" aria-hidden="true">
            <circle className="lv-hear-ring-track" cx="30" cy="30" r="28" />
          </svg>
          <span className="lv-hear-glyph">{isOn ? <PauseGlyph /> : <PlayGlyph />}</span>
        </button>
        <Waveform progress={isOn ? progress : 0} />
        <span className="lv-hear-time">
          {isOn ? `${fmt(elapsed)} / ${fmt(duration)}` : fmt(duration)}
        </span>
      </div>

      <p className="lv-hear-snippet">{side.snippet}</p>

      <ul className="lv-hear-notes">
        {side.annotations.map((a) => (
          <li key={a} className="lv-hear-note">
            {a}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CallioHearIt() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [durations, setDurations] = useState<Record<string, number>>({})

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => {
      setElapsed(a.currentTime)
      if (a.duration > 0) setProgress(a.currentTime / a.duration)
    }
    const reset = () => {
      setPlaying(null)
      setProgress(0)
      setElapsed(0)
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
      setElapsed(0)
      return
    }
    a.src = src
    setProgress(0)
    setElapsed(0)
    setPlaying(key)
    a.play().catch(() => {
      setPlaying(null)
      setProgress(0)
    })
  }

  const noteDuration = (key: string, d: number) => {
    if (d > 0) setDurations((prev) => (prev[key] ? prev : { ...prev, [key]: d }))
  }

  return (
    <div className="lv-hear">
      {SCENARIOS.map((s) => {
        const sides: Array<{ variant: "ungoverned" | "governed"; side: Side }> = [
          { variant: "ungoverned", side: s.ungoverned },
          { variant: "governed", side: s.governed },
        ]
        return (
          <div className="lv-hear-scenario" key={s.id}>
            <div className="lv-hear-scenario-head">
              <p className="lv-hear-question">{s.question}</p>
              <span className="lv-hear-outcome">
                <span className="lv-hear-outcome-buyer">{s.outcome.buyer}</span>
                {s.outcome.line}
              </span>
            </div>

            <div className="lv-hear-ab">
              {sides.map(({ variant, side }) => {
                const key = `${s.id}-${variant}`
                const isOn = playing === key
                return (
                  <Clip
                    key={key}
                    variant={variant}
                    side={side}
                    isOn={isOn}
                    progress={isOn ? progress : 0}
                    elapsed={isOn ? elapsed : 0}
                    duration={durations[key] ?? 0}
                    onToggle={() => toggle(key, side.src)}
                    question={s.question}
                  />
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Hidden metadata loaders give each clip an honest duration readout
          without fetching full audio; playback runs through the shared element. */}
      {SCENARIOS.flatMap((s) => [
        { key: `${s.id}-ungoverned`, src: s.ungoverned.src },
        { key: `${s.id}-governed`, src: s.governed.src },
      ]).map((c) => (
        <audio
          key={c.key}
          src={c.src}
          preload="metadata"
          aria-hidden="true"
          onLoadedMetadata={(e) => noteDuration(c.key, e.currentTarget.duration)}
        />
      ))}

      {/* One shared element for playback: starting any clip stops the previous. */}
      <audio ref={audioRef} preload="none" />
    </div>
  )
}
