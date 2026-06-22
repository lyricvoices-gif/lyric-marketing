"use client"

/* Voices list — the Edition 01 roster with on-brand audio playback, matching
   the homepage "Hear it" player conventions: a single shared <audio> element,
   play on click only, one clip at a time, and a gold progress arc on the
   play/pause control. Each voice also shows a "Built for" cluster of engine
   avatars (uniform circular frames) so portability reads per-voice: Morgan runs
   on ElevenLabs and Hume, the rest on Hume.

   Real assets only: the audio is the canonical Edition 01 sample the live site
   serves from Lyric's R2 CDN; the engine marks are the same in-repo logo files
   the homepage Integrations section uses. prefers-reduced-motion keeps the
   functional progress arc and drops only its smoothing transition (via CSS). */

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { VOICE_COLORS } from "@/components/listen/data"

const R2 = "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01"

type Engine = "elevenlabs" | "hume"

const ENGINES: Record<Engine, { name: string; src: string }> = {
  elevenlabs: { name: "ElevenLabs", src: "/images/logos/elevenlabs.svg" },
  hume: { name: "Hume", src: "/images/logos/hume.svg" },
}

type Voice = {
  id: string
  name: string
  archetype: string
  pronoun: string
  artist: string
  description: string
  intents: string[]
  sample: string
  engines: Engine[]
  color: string
}

/* Descriptions are the existing Edition 01 profiles, used verbatim. */
const VOICES: Voice[] = [
  {
    id: "morgan",
    name: "Morgan",
    archetype: "The Anchor",
    pronoun: "Her",
    artist: "Hana",
    description:
      "Morgan is designed for moments that require warmth, authority, and trust. Her voice maintains credibility across podcasts, brand storytelling, and service experiences, staying composed as context shifts and ensuring every interaction feels intentional rather than transactional.",
    intents: ["Authoritative", "Warm", "Composed"],
    sample: `${R2}/Morgan%20(sample).wav`,
    engines: ["elevenlabs", "hume"],
    color: VOICE_COLORS.morgan,
  },
  {
    id: "nova",
    name: "Nova",
    archetype: "The Intimist",
    pronoun: "His",
    artist: "Riot",
    description:
      "Nova is designed for moments that require presence, emotional safety, and authentic care. His voice creates space for reflection without rushing, holding intimacy across meditations, wellness guidance, and personal narratives while ensuring every word feels grounding rather than prescriptive.",
    intents: ["Compassionate", "Encouraging", "Calm"],
    sample: `${R2}/Nova_calm%20(sample).wav`,
    engines: ["hume"],
    color: VOICE_COLORS.nova,
  },
  {
    id: "atlas",
    name: "Atlas",
    archetype: "The Guide",
    pronoun: "His",
    artist: "Christian",
    description:
      "Atlas is designed for moments that require clarity, patience, and credibility. His voice maintains accessibility across tutorials, training modules, and educational content, staying composed as complexity increases and ensuring every explanation feels supportive rather than condescending.",
    intents: ["Patient", "Clear", "Supportive"],
    sample: `${R2}/Atlas_sample.wav`,
    engines: ["hume"],
    color: VOICE_COLORS.atlas,
  },
  {
    id: "riven",
    name: "Riven",
    archetype: "The Narrator",
    pronoun: "Her",
    artist: "Nora",
    description:
      "Riven is designed for moments that require depth, texture, and narrative weight. Her voice carries emotional arc across fiction, documentary, and character work, maintaining engagement as stories unfold and ensuring every scene feels transportive rather than performed.",
    intents: ["Intrigue", "Tension", "Wonder"],
    sample: `${R2}/Riven%20(sample).wav`,
    engines: ["hume"],
    color: VOICE_COLORS.riven,
  },
  {
    id: "hex",
    name: "Hex",
    archetype: "The Wildcard",
    pronoun: "Her",
    artist: "Tiff",
    description:
      "Hex is designed for moments that require edge, personality, and tonal agility. Her voice shifts seamlessly across brand content, gaming, and experimental work, maintaining authenticity as tone pivots and ensuring every word feels genuine rather than calculated.",
    intents: ["Playful", "Ironic", "Bold"],
    sample: `${R2}/Hex%20(sample).wav`,
    engines: ["hume"],
    color: VOICE_COLORS.hex,
  },
]

/* Progress ring circumference (r=22 in the 48-unit viewBox). */
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

function EngineAvatars({ engines }: { engines: Engine[] }) {
  return (
    <div className="lv-voices-engines">
      <span className="lv-voices-built">Built for</span>
      <span className="lv-voices-avatars">
        {engines.map((e) => (
          <span
            key={e}
            className="lv-voices-engine"
            title={ENGINES[e].name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ENGINES[e].src} alt={ENGINES[e].name} />
          </span>
        ))}
      </span>
    </div>
  )
}

export default function VoicesList() {
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

  const toggle = (v: Voice) => {
    const a = audioRef.current
    if (!a) return
    if (playing === v.id) {
      a.pause()
      setPlaying(null)
      setProgress(0)
      return
    }
    // Assigning src restarts from the beginning; one clip plays at a time.
    a.src = v.sample
    setProgress(0)
    setPlaying(v.id)
    a.play().catch(() => {
      setPlaying(null)
      setProgress(0)
    })
  }

  return (
    <div className="lv-voices-list-wrap">
      <ul className="lv-voices-list">
        {VOICES.map((v) => {
          const isOn = playing === v.id
          return (
            <li
              key={v.id}
              className={`lv-voices-row${isOn ? " is-playing" : ""}`}
              style={{ ["--voice" as string]: v.color } as CSSProperties}
            >
              <div className="lv-voices-left">
                <button
                  type="button"
                  className={`lv-voices-play${isOn ? " is-playing" : ""}`}
                  onClick={() => toggle(v)}
                  aria-label={isOn ? `Pause ${v.name} sample` : `Play ${v.name} sample`}
                  aria-pressed={isOn}
                >
                  <svg className="lv-voices-ring" viewBox="0 0 48 48" aria-hidden="true">
                    <circle className="lv-voices-ring-track" cx="24" cy="24" r={RING_R} />
                    <circle
                      className="lv-voices-ring-prog"
                      cx="24"
                      cy="24"
                      r={RING_R}
                      style={{
                        strokeDasharray: RING_C,
                        strokeDashoffset: RING_C * (1 - (isOn ? progress : 0)),
                      }}
                    />
                  </svg>
                  <span className="lv-voices-glyph">
                    {isOn ? <PauseGlyph /> : <PlayGlyph />}
                  </span>
                </button>

                <div className="lv-voices-id">
                  <div className="lv-voices-namerow">
                    <span className="lv-voices-dot" aria-hidden="true" />
                    <h3 className="lv-voices-name">{v.name}</h3>
                  </div>
                  <p className="lv-voices-meta">
                    {v.archetype} · {v.pronoun}
                  </p>
                  <p className="lv-voices-artist">Voiced by {v.artist}</p>
                  <EngineAvatars engines={v.engines} />
                </div>
              </div>

              <div className="lv-voices-body">
                <p className="lv-voices-desc">{v.description}</p>
                <ul className="lv-voices-intents">
                  {v.intents.map((i) => (
                    <li key={i} className="lv-voices-chip">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
      {/* One shared element: starting a voice stops any other. */}
      <audio ref={audioRef} preload="none" />
    </div>
  )
}
