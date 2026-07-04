"use client"

/* Governance proof — section 4's demonstration area. Two full-width
   horizontal bands map to the section headline's two promises: an info
   cluster (kicker, dimension title, description) on the left, the proof on
   the right.

   "Hear it" is a single governed voice sample behind the Voices-page
   featured instrument (breathing gold glow at rest; gold progress ring and
   emanating pulses during playback — the .lv-vstage conventions, band-
   scoped). Play on click only; the button toggles to pause; all playback
   feedback lives on the control.

   "Read it" is a governed chat thread, rendered to be read, not played —
   voice drift is heard, text drift is read, so the two proofs are different
   types on purpose. The exchange is a travel-vertical example (Meridian Air
   is fictional, like the hero's Caldera Bank), kept to three turns so the
   band stays shallow. It mirrors the hero transcript's governance grammar:
   the recording disclosure, register held under stress, and one governed
   brand term, with the hero's annotation vocabulary. Governance notes sit
   beside the agent turns and are always visible, so the band reads fully
   without interaction. */

import { useEffect, useRef, useState } from "react"
import ScrollReveal from "@/components/ScrollReveal"

const SAMPLE_SRC = "/GovernedSample.mp3"

/* Featured-stage ring geometry (r=54 in the 116x116 control). */
const STAGE_R = 54
const STAGE_C = 2 * Math.PI * STAGE_R

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

type ChatSeg = { t: string; term?: boolean }
type ChatMsg = { role: "agent" | "customer"; segs: ChatSeg[]; notes?: string[] }

const THREAD: readonly ChatMsg[] = [
  {
    role: "agent",
    segs: [
      {
        t: "For quality and training purposes, this conversation may be recorded. Thanks for contacting Meridian Air. This is Riven. How can I help?",
      },
    ],
    notes: ["disclosure added by spec"],
  },
  {
    role: "customer",
    segs: [
      {
        t: "My flight to Lisbon was just cancelled and I’m still at the airport. I have a wedding tomorrow.",
      },
    ],
  },
  {
    role: "agent",
    segs: [
      { t: "I understand the timing. I’ve rebooked you on tonight’s 6:40 departure and applied a " },
      { t: "fare difference waiver", term: true },
      { t: ". Your new boarding pass is in your app." },
    ],
    notes: ["tone held within brand", "“fare difference waiver” on brand"],
  },
]

export default function GovernanceProof() {
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
    // Assigning src restarts the sample from the beginning.
    a.src = SAMPLE_SRC
    setProgress(0)
    setPlaying(true)
    a.play().catch(() => {
      setPlaying(false)
      setProgress(0)
    })
  }

  return (
    <div className="lv-govp-panels">
      <ScrollReveal delay={120}>
        <div className={`lv-govp-panel lv-govp-voice${playing ? " is-playing" : ""}`}>
          <div className="lv-govp-info">
            <p className="lv-govp-kicker">Hear it</p>
            <p className="lv-govp-caption-title">How it sounds</p>
            <p className="lv-govp-caption-body">
              Brand and industry terms, said right. Pacing, emphasis, and
              register held where they belong.
            </p>
          </div>
          <div className="lv-govp-stage">
            {/* Unpadded positioning context so the pulses stay concentric
                with the control (the .lv-vstage-instrument role). */}
            <div className="lv-govp-instrument">
              <span className="lv-govp-pulse lv-govp-pulse-1" aria-hidden="true" />
              <span className="lv-govp-pulse lv-govp-pulse-2" aria-hidden="true" />
              <span className="lv-govp-pulse lv-govp-pulse-3" aria-hidden="true" />
              <button
                type="button"
                className={`lv-govp-play${playing ? " is-playing" : ""}`}
                onClick={toggle}
                aria-label={
                  playing ? "Pause the governed voice sample" : "Play the governed voice sample"
                }
              >
                <svg className="lv-govp-ring" viewBox="0 0 116 116" aria-hidden="true">
                  <circle className="lv-govp-ring-track" cx="58" cy="58" r={STAGE_R} />
                  <circle
                    className="lv-govp-ring-prog"
                    cx="58"
                    cy="58"
                    r={STAGE_R}
                    style={{
                      strokeDasharray: STAGE_C,
                      strokeDashoffset: STAGE_C * (1 - (playing ? progress : 0)),
                    }}
                  />
                </svg>
                <span className="lv-govp-glyph">{playing ? <PauseGlyph /> : <PlayGlyph />}</span>
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="lv-govp-panel">
          <div className="lv-govp-info">
            <p className="lv-govp-kicker">Read it</p>
            <p className="lv-govp-caption-title">How it communicates</p>
            <p className="lv-govp-caption-body">
              Word choice, tone, and disclosure. What an agent says, and what
              it must not.
            </p>
          </div>
          <div className="lv-govp-stage lv-govp-stage-chat">
            <div className="lv-govchat">
              {THREAD.map((m, i) => (
                <div key={i} className={`lv-govchat-row is-${m.role}`}>
                  <span className="lv-govchat-meta">
                    {m.role === "agent" ? "Agent" : "Customer"}
                  </span>
                  <p className="lv-govchat-bubble">
                    {m.segs.map((seg, j) =>
                      seg.term ? (
                        <span key={j} className="lv-govchat-term">
                          {seg.t}
                        </span>
                      ) : (
                        <span key={j}>{seg.t}</span>
                      ),
                    )}
                  </p>
                  {m.notes?.map((note) => (
                    <span key={note} className="lv-govchat-note">
                      <span className="lv-govchat-note-dot" aria-hidden="true" />
                      {note}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* One shared element; play on click only. */}
      <audio ref={audioRef} preload="none" />
    </div>
  )
}
