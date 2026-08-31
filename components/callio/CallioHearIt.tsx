"use client"

/* One flagship proof scenario, heard two ways. The caller clips are identical
   in both generated tracks; the agent response is the only variable. */

import { useEffect, useRef, useState } from "react"

type TrackId = "ungoverned" | "governed"
type TranscriptLine = {
  who: "caller" | "agent"
  start: number
  end: number
  display: string
}
type Track = {
  id: TrackId
  label: string
  src: string
  duration: number
  signal: string
  transcript: TranscriptLine[]
}

const SHARED_CALLER = {
  first: {
    who: "caller" as const,
    start: 0,
    end: 8.406,
    display:
      "Hi. I’m comparing the Cascade Rewards card, and I want to be clear about the purchase rate. What APR would apply if I carried a balance?",
  },
  second: {
    who: "caller" as const,
    display: "So the purchase APR is 24.99%?",
  },
  third: {
    who: "caller" as const,
    display: "And where would I find the full rate and fee details?",
  },
}

const TRACKS: Track[] = [
  {
    id: "ungoverned",
    label: "Ungoverned",
    src: "/audio/callio-proof-ungoverned.mp3",
    duration: 41.578,
    signal: "Drift: the exact rate becomes “roughly 25%.”",
    transcript: [
      SHARED_CALLER.first,
      {
        who: "agent",
        start: 9.156,
        end: 20.627,
        display:
          "Yeah, of course. It’s basically 24.99% right now. That’s pretty typical for a rewards card, and it may move around a little, so I’d just think of it as roughly 25%.",
      },
      { ...SHARED_CALLER.second, start: 21.477, end: 25.553 },
      {
        who: "agent",
        start: 26.303,
        end: 31.706,
        display:
          "Right, about that. If you pay the balance off quickly, the interest usually isn’t a big deal.",
      },
      { ...SHARED_CALLER.third, start: 32.556, end: 35.32 },
      {
        who: "agent",
        start: 36.07,
        end: 41.578,
        display:
          "It should all be in the card paperwork or somewhere in your account. I can point you in the right direction.",
      },
    ],
  },
  {
    id: "governed",
    label: "Governed by Callio",
    src: "/audio/callio-proof-governed.mp3",
    duration: 42.376,
    signal: "Standard held: exact term, exact rate, clear source.",
    transcript: [
      SHARED_CALLER.first,
      {
        who: "agent",
        start: 9.156,
        end: 18.073,
        display:
          "The purchase Annual Percentage Rate is 24.99%. Please review the card’s pricing and terms for complete rate and fee information.",
      },
      { ...SHARED_CALLER.second, start: 18.923, end: 22.999 },
      {
        who: "agent",
        start: 23.749,
        end: 28.748,
        display: "Yes. The purchase Annual Percentage Rate is 24.99%.",
      },
      { ...SHARED_CALLER.third, start: 29.598, end: 32.362 },
      {
        who: "agent",
        start: 33.112,
        end: 42.376,
        display:
          "You can find the full rate and fee details in the card’s Pricing & Terms document. It’s available on the card’s page under Disclosures. Let me know what you’d like to review next.",
      },
    ],
  },
]

const BARS = Array.from({ length: 72 }, (_, index) =>
  Math.round(7 + 24 * Math.abs(Math.sin(index * 1.19) * Math.cos(index * 0.37 + 0.8))),
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

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${minutes}:${String(remainder).padStart(2, "0")}`
}

function activeLine(track: Track, elapsed: number, current: boolean) {
  if (!current || elapsed <= 0) return track.transcript[1]
  let line = track.transcript[0]
  for (const candidate of track.transcript) {
    if (candidate.start <= elapsed) line = candidate
    else break
  }
  return line
}

function Waveform({ progress }: { progress: number }) {
  return (
    <span className="lv-proof-wave" aria-hidden="true">
      {BARS.map((height, index) => (
        <span
          key={index}
          className={`lv-proof-wave-bar${index / BARS.length <= progress ? " is-played" : ""}`}
          style={{ height }}
        />
      ))}
    </span>
  )
}

export default function CallioHearIt() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [current, setCurrent] = useState<TrackId | null>(null)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState<Record<TrackId, number>>({
    ungoverned: 0,
    governed: 0,
  })

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => {
      if (!current) return
      setElapsed((previous) => ({ ...previous, [current]: audio.currentTime }))
    }
    const onEnded = () => setPlaying(false)
    const onError = () => setPlaying(false)

    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("ended", onEnded)
    audio.addEventListener("error", onError)
    return () => {
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("ended", onEnded)
      audio.removeEventListener("error", onError)
    }
  }, [current])

  const toggle = (track: Track) => {
    const audio = audioRef.current
    if (!audio) return

    if (current !== track.id) {
      audio.pause()
      audio.src = track.src
      audio.currentTime = 0
      setCurrent(track.id)
      setElapsed((previous) => ({ ...previous, [track.id]: 0 }))
      setPlaying(true)
      audio.play().catch(() => setPlaying(false))
      return
    }

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      if (audio.currentTime >= track.duration - 0.1) {
        audio.currentTime = 0
        setElapsed((previous) => ({ ...previous, [track.id]: 0 }))
      }
      setPlaying(true)
      audio.play().catch(() => setPlaying(false))
    }
  }

  const seek = (track: Track, nextTime: number) => {
    const audio = audioRef.current
    if (!audio) return

    const applyTime = () => {
      audio.currentTime = nextTime
      setElapsed((previous) => ({ ...previous, [track.id]: nextTime }))
    }

    if (current !== track.id) {
      audio.pause()
      audio.src = track.src
      audio.load()
      setCurrent(track.id)
      setPlaying(false)
      if (audio.readyState >= 1) applyTime()
      else audio.addEventListener("loadedmetadata", applyTime, { once: true })
      return
    }

    applyTime()
  }

  return (
    <section className="lv-proof-pair" aria-label="Paired governed and ungoverned call recordings">
      {TRACKS.map((track) => {
        const isCurrent = current === track.id
        const isPlaying = isCurrent && playing
        const trackElapsed = elapsed[track.id]
        const progress = trackElapsed / track.duration
        const line = activeLine(track, trackElapsed, isCurrent)

        return (
          <article
            className={`lv-proof-track is-${track.id}${isPlaying ? " is-playing" : ""}`}
            key={track.id}
          >
            <header className="lv-proof-track-head">
              <p className="lv-proof-track-label">{track.label}</p>
              <p className="lv-proof-track-signal">{track.signal}</p>
            </header>

            <div className="lv-proof-listening">
              <div className="lv-proof-player">
                <button
                  type="button"
                  className="lv-proof-play"
                  onClick={() => toggle(track)}
                  aria-label={`${isPlaying ? "Pause" : "Play"} ${track.label} recording`}
                  aria-pressed={isPlaying}
                >
                  {isPlaying ? <PauseGlyph /> : <PlayGlyph />}
                </button>

                <div className="lv-proof-wave-wrap">
                  <Waveform progress={progress} />
                  <input
                    className="lv-proof-scrubber"
                    type="range"
                    min="0"
                    max={track.duration}
                    step="0.05"
                    value={trackElapsed}
                    onChange={(event) => seek(track, Number(event.currentTarget.value))}
                    aria-label={`Seek ${track.label} recording`}
                  />
                </div>

                <span className="lv-proof-time">
                  {isCurrent && trackElapsed > 0
                    ? `${formatTime(trackElapsed)} / ${formatTime(track.duration)}`
                    : formatTime(track.duration)}
                </span>
              </div>

              <div className="lv-proof-transcript" aria-live={isCurrent ? "polite" : "off"}>
                <span>{line.who === "caller" ? "Caller" : "Agent"}</span>
                <p>
                  {track.id === "governed" && line.who === "agent" ? (
                    <mark>{line.display}</mark>
                  ) : (
                    line.display
                  )}
                </p>
              </div>
            </div>
          </article>
        )
      })}

      <audio ref={audioRef} preload="metadata" />
    </section>
  )
}
