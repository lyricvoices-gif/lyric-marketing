"use client"

/* The agent voices in the Voices-page gallery treatment (the lv-vtile
   conventions: accent-dotted tile, 60px play ring with real progress,
   hover-reveal description, one shared audio so a single voice plays at a
   time). No provider badges, no license CTA — the tiles are a choice of
   delivery, not a catalog.

   Sample sources: Sam and James point at the callio produced-audio
   convention ({AUDIO_BASE}/phone/{token}_default.mp3, unverified from the
   build sandbox). Sol has no static sample yet; her tile plays the demo
   call stand-in until the produced fs-demo assets land. */

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { VOICE_COLORS } from "@/components/listen/data"

const AUDIO_BASE = "https://pub-9142daf6eac140228b494c56e7b13b22.r2.dev/phone"

type AgentVoice = {
  id: string
  name: string
  credit: string
  character: string
  desc: string
  sample: string
  color: string
}

const VOICES: AgentVoice[] = [
  {
    id: "sol",
    name: "Sol",
    credit: "The senior professional",
    character: "Senior. Warm. Unhurried.",
    desc:
      "The voice of a senior client services professional at a financial institution. Someone who has been doing this for fifteen years and has time for you.",
    /* STAND-IN: plays the demo-call audio until Sol's produced sample ships. */
    sample: "/GovernedSample.mp3",
    color: VOICE_COLORS.morgan,
  },
  {
    id: "sam",
    name: "Sam",
    credit: "The efficient one",
    character: "Crisp. Conversational. Direct.",
    /* PLACEHOLDER COPY (2026-07-30): Lyric will do a copy pass. */
    desc:
      "A voice that respects the caller's time. Gets to the point without ever feeling rushed, and handles the routine so smoothly you barely notice the work.",
    sample: `${AUDIO_BASE}/sam_default.mp3`,
    color: VOICE_COLORS.atlas,
  },
  {
    id: "james",
    name: "James",
    credit: "The refined one",
    character: "British. Refined. Polished.",
    /* PLACEHOLDER COPY (2026-07-30): Lyric will do a copy pass. */
    desc:
      "A composed British voice with an unhurried polish. Measured, precise, and quietly reassuring on the calls that need a steady hand.",
    sample: `${AUDIO_BASE}/james_default.mp3`,
    color: VOICE_COLORS.riven,
  },
]

const TILE_R = 27
const TILE_C = 2 * Math.PI * TILE_R

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

export default function AgentsVoicesGallery() {
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

  const toggle = (v: AgentVoice) => {
    const a = audioRef.current
    if (!a) return
    if (playing === v.id) {
      a.pause()
      setPlaying(null)
      setProgress(0)
      return
    }
    a.src = v.sample
    setProgress(0)
    setPlaying(v.id)
    a.play().catch(() => {
      setPlaying(null)
      setProgress(0)
    })
  }

  return (
    <div className="lv-vgallery-grid">
      {VOICES.map((v) => {
        const isOn = playing === v.id
        const prog = isOn ? progress : 0
        return (
          <div
            key={v.id}
            className={`lv-vtile${isOn ? " is-playing" : ""}`}
            style={{ ["--voice" as string]: v.color } as CSSProperties}
          >
            <button
              type="button"
              className={`lv-vtile-play${isOn ? " is-playing" : ""}`}
              onClick={() => toggle(v)}
              aria-label={isOn ? `Pause ${v.name} sample` : `Play ${v.name} sample`}
              aria-pressed={isOn}
            >
              <svg className="lv-vtile-ring" viewBox="0 0 60 60" aria-hidden="true">
                <circle className="lv-vtile-ring-track" cx="30" cy="30" r={TILE_R} />
                <circle
                  className="lv-vtile-ring-prog"
                  cx="30"
                  cy="30"
                  r={TILE_R}
                  style={{
                    strokeDasharray: TILE_C,
                    strokeDashoffset: TILE_C * (1 - prog),
                  }}
                />
              </svg>
              <span className="lv-vtile-glyph">{isOn ? <PauseGlyph /> : <PlayGlyph />}</span>
            </button>

            <div className="lv-vtile-namerow">
              <span className="lv-vtile-dot" aria-hidden="true" />
              <h3 className="lv-vtile-name">{v.name}</h3>
            </div>
            <p className="lv-vtile-credit">{v.credit}</p>
            <p className="lv-vtile-character">{v.character}</p>
            <div className="lv-vtile-reveal">
              <div className="lv-vtile-reveal-inner">
                <p className="lv-vtile-desc">{v.desc}</p>
              </div>
            </div>
          </div>
        )
      })}

      {/* One shared element: starting a voice stops any other. */}
      <audio ref={audioRef} preload="none" />
    </div>
  )
}
