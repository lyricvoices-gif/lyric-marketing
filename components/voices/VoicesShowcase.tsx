"use client"

/* Voices showcase — a hierarchy, not a list. Morgan and Hex take the stage as
   two immersive dark-spotlight moments (the Anchor and the Wildcard); Nova,
   Atlas, and Riven sit below as a lighter, playable gallery. One shared <audio>
   orchestrates all five, so only one plays at a time and the gold progress ring
   on each control reflects real playback, matching the homepage "Hear it"
   conventions (play-on-click, one at a time).

   The on-play "presence" is deliberately ABSTRACT and ambient — a breathing
   accent aura plus emanating rings around the play control, not a literal
   spectrum of the audio (the motion is generative, gated by
   prefers-reduced-motion in CSS). Real assets only: the samples are the
   canonical Edition 01 clips from Lyric's R2 CDN; the engine marks are the same
   in-repo ElevenLabs/Hume files the homepage Integrations section uses. */

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { VOICE_COLORS } from "@/components/listen/data"
import ScrollReveal from "@/components/ScrollReveal"

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
const MORGAN: Voice = {
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
}

const HEX: Voice = {
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
}

const FEATURED: Voice[] = [MORGAN, HEX]

const GALLERY: Voice[] = [
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
]

/* Two ring geometries: the large featured control and the gallery control. */
const STAGE_R = 54
const STAGE_C = 2 * Math.PI * STAGE_R
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

function EngineRow({ engines }: { engines: Engine[] }) {
  return (
    <span className="lv-eng-row">
      <span className="lv-eng-label">Built for</span>
      <span className="lv-eng-avatars">
        {engines.map((e) => (
          <span key={e} className={`lv-eng lv-eng-${e}`} title={ENGINES[e].name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ENGINES[e].src} alt={ENGINES[e].name} />
          </span>
        ))}
      </span>
    </span>
  )
}

function FeaturedStage({
  voice,
  reversed,
  isOn,
  progress,
  onToggle,
}: {
  voice: Voice
  reversed: boolean
  isOn: boolean
  progress: number
  onToggle: () => void
}) {
  return (
    <section
      className={`lv-vstage${isOn ? " is-playing" : ""}`}
      data-reversed={reversed ? "" : undefined}
      style={{ ["--stage-accent" as string]: voice.color } as CSSProperties}
    >
      <div className="lv-vstage-inner">
        <div className="lv-vstage-marquee">
          <ScrollReveal>
            <p className="lv-vstage-kicker">Featured · Edition 01</p>
            <h2 className="lv-vstage-name">{voice.name}</h2>
            <p className="lv-vstage-character">{voice.intents.join(". ")}.</p>
            <div className="lv-vstage-credit">
              <span className="lv-vstage-credit-text">
                {voice.archetype} · Voiced by {voice.artist}
              </span>
              <EngineRow engines={voice.engines} />
            </div>
            <p className="lv-vstage-desc">{voice.description}</p>
          </ScrollReveal>
        </div>

        <div className="lv-vstage-instrument">
          <span className="lv-vstage-pulse lv-vstage-pulse-1" aria-hidden="true" />
          <span className="lv-vstage-pulse lv-vstage-pulse-2" aria-hidden="true" />
          <span className="lv-vstage-pulse lv-vstage-pulse-3" aria-hidden="true" />
          <button
            type="button"
            className={`lv-vstage-play${isOn ? " is-playing" : ""}`}
            onClick={onToggle}
            aria-label={isOn ? `Pause ${voice.name} sample` : `Play ${voice.name} sample`}
            aria-pressed={isOn}
          >
            <svg className="lv-vstage-ring" viewBox="0 0 116 116" aria-hidden="true">
              <circle className="lv-vstage-ring-track" cx="58" cy="58" r={STAGE_R} />
              <circle
                className="lv-vstage-ring-prog"
                cx="58"
                cy="58"
                r={STAGE_R}
                style={{
                  strokeDasharray: STAGE_C,
                  strokeDashoffset: STAGE_C * (1 - progress),
                }}
              />
            </svg>
            <span className="lv-vstage-glyph">{isOn ? <PauseGlyph /> : <PlayGlyph />}</span>
          </button>
        </div>
      </div>
    </section>
  )
}

function GalleryTile({
  voice,
  isOn,
  progress,
  onToggle,
}: {
  voice: Voice
  isOn: boolean
  progress: number
  onToggle: () => void
}) {
  return (
    <div
      className={`lv-vtile${isOn ? " is-playing" : ""}`}
      style={{ ["--voice" as string]: voice.color } as CSSProperties}
    >
      <button
        type="button"
        className={`lv-vtile-play${isOn ? " is-playing" : ""}`}
        onClick={onToggle}
        aria-label={isOn ? `Pause ${voice.name} sample` : `Play ${voice.name} sample`}
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
              strokeDashoffset: TILE_C * (1 - progress),
            }}
          />
        </svg>
        <span className="lv-vtile-glyph">{isOn ? <PauseGlyph /> : <PlayGlyph />}</span>
      </button>

      <div className="lv-vtile-namerow">
        <span className="lv-vtile-dot" aria-hidden="true" />
        <h3 className="lv-vtile-name">{voice.name}</h3>
      </div>
      <p className="lv-vtile-credit">
        {voice.archetype} · Voiced by {voice.artist}
      </p>
      <p className="lv-vtile-character">{voice.intents.join(". ")}.</p>
      {/* Hidden at rest; revealed on hover/play (always visible on touch). */}
      <div className="lv-vtile-reveal">
        <div className="lv-vtile-reveal-inner">
          <p className="lv-vtile-desc">{voice.description}</p>
          <div className="lv-vtile-engines">
            <EngineRow engines={voice.engines} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VoicesShowcase() {
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
    a.src = v.sample
    setProgress(0)
    setPlaying(v.id)
    a.play().catch(() => {
      setPlaying(null)
      setProgress(0)
    })
  }

  return (
    <>
      {FEATURED.map((v, i) => (
        <FeaturedStage
          key={v.id}
          voice={v}
          reversed={i % 2 === 1}
          isOn={playing === v.id}
          progress={playing === v.id ? progress : 0}
          onToggle={() => toggle(v)}
        />
      ))}

      <section className="lv-voices-gallery">
        <div className="lv-voices-inner">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Edition 01 · The roster</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="lv-vgallery-grid">
              {GALLERY.map((v) => (
                <GalleryTile
                  key={v.id}
                  voice={v}
                  isOn={playing === v.id}
                  progress={playing === v.id ? progress : 0}
                  onToggle={() => toggle(v)}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* One shared element: starting a voice stops any other. */}
      <audio ref={audioRef} preload="none" />
    </>
  )
}
