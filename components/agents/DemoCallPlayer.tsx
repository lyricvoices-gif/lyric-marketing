"use client"

/* The FS Agents page's lead instrument: the governed dispute call, playable,
   with its transcript laid out as the site's governed-chat grammar and a
   "what to listen for" rail naming the governed behaviors the call
   demonstrates. Play-on-click, one shared audio element, gold progress ring
   (the site's featured-stage conventions).

   The transcript is static in v1 (all turns visible). The produced per-line
   clips are kept in the pipeline output so a transcript-synced player can
   follow once line timings exist.

   DEMO_CALL_SRC: STAND-IN. The produced two-voice call (Sol + caller,
   scripts/generate-fs-demo-call.mjs) replaces this with its R2 URL, path
   pattern {AUDIO_BASE}/phone/fs-demo-call.mp3. Until then the player runs
   on the existing governed FS sample so the instrument is real. */

import { useEffect, useRef, useState } from "react"

const DEMO_CALL_SRC = "/GovernedSample.mp3"

const STAGE_R = 54
const STAGE_C = 2 * Math.PI * STAGE_R

type Turn = { who: "caller" | "agent"; text: string; note?: string }

/* The locked call script, written form (the audio speaks the normalized
   form: "three hundred twelve dollars", spelled digits). */
const TRANSCRIPT: readonly Turn[] = [
  {
    who: "caller",
    text:
      "Hi, um, I'm looking at my account and there's a charge here I definitely didn't make. Three hundred and twelve dollars. I have no idea what this is.",
  },
  {
    who: "agent",
    text:
      "I understand, and I'll help you get to the bottom of it. An unexpected charge like that is unsettling. Before I pull up any account details, I need to verify your identity. Can you confirm the phone number or email on the account?",
    note: "acknowledges, then verifies before any account detail",
  },
  { who: "caller", text: "Yeah, it's the phone ending in 4-7-1-2." },
  { who: "agent", text: "Thank you. I'll verify that now." },
  {
    who: "agent",
    text:
      "I've confirmed your identity. I can see the $312 charge you mentioned. I can't say yet whether it's fraud until we look closer, so let's review it together. Do you recognize the merchant name, or is it completely unfamiliar?",
    note: "careful before reassuring: not “fraud” until confirmed",
  },
  { who: "caller", text: "Completely unfamiliar. I've never heard of them." },
  {
    who: "agent",
    text:
      "Understood. I'm going to open a dispute on that transaction and place a temporary hold so nothing else moves on it while we investigate. You won't be held responsible for a charge you didn't authorize. I'll walk you through what happens next.",
    note: "resolves with next steps, register held throughout",
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

export default function DemoCallPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => {
      if (a.duration > 0) setProgress(a.currentTime / a.duration)
    }
    const reset = () => {
      setPlaying(false)
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

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
      setProgress(0)
      return
    }
    a.src = DEMO_CALL_SRC
    setProgress(0)
    setPlaying(true)
    a.play().catch(() => {
      setPlaying(false)
      setProgress(0)
    })
  }

  return (
    <div className={`lv-agdemo${playing ? " is-playing" : ""}`}>
      <div className="lv-agdemo-bar">
        <span className="lv-agdemo-bar-label">Governed call &middot; Financial Services</span>
        <span className="lv-agdemo-bar-agent">Sol &middot; FS agent</span>
      </div>

      <div className="lv-agdemo-stage">
        <div className="lv-agdemo-instrument">
          <span className="lv-agdemo-pulse lv-agdemo-pulse-1" aria-hidden="true" />
          <span className="lv-agdemo-pulse lv-agdemo-pulse-2" aria-hidden="true" />
          <button
            type="button"
            className={`lv-agdemo-play${playing ? " is-playing" : ""}`}
            onClick={toggle}
            aria-label={playing ? "Pause the governed call" : "Play the governed call"}
            aria-pressed={playing}
          >
            <svg className="lv-agdemo-ring" viewBox="0 0 116 116" aria-hidden="true">
              <circle className="lv-agdemo-ring-track" cx="58" cy="58" r={STAGE_R} />
              <circle
                className="lv-agdemo-ring-prog"
                cx="58"
                cy="58"
                r={STAGE_R}
                style={{
                  strokeDasharray: STAGE_C,
                  strokeDashoffset: STAGE_C * (1 - progress),
                }}
              />
            </svg>
            <span className="lv-agdemo-glyph">{playing ? <PauseGlyph /> : <PlayGlyph />}</span>
          </button>
        </div>
        <p className="lv-agdemo-listen-hint">
          A caller disputes a charge. Sol answers. Press play.
        </p>
      </div>

      <div className="lv-agdemo-thread">
        {TRANSCRIPT.map((t, i) => (
          <div key={i} className={`lv-agdemo-row is-${t.who}`}>
            <span className="lv-agdemo-meta">{t.who === "agent" ? "Sol" : "Caller"}</span>
            <p className="lv-agdemo-bubble">{t.text}</p>
            {t.note && (
              <span className="lv-agdemo-note">
                <span className="lv-agdemo-note-dot" aria-hidden="true" />
                {t.note}
              </span>
            )}
          </div>
        ))}
      </div>

      <audio ref={audioRef} preload="none" />
    </div>
  )
}
