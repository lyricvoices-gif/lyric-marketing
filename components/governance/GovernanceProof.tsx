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
   brand term, with the hero's annotation vocabulary.

   The thread animates once on scroll-into-view (the GovernedCallVisual /
   DirectionCanvas machinery: a one-shot IntersectionObserver plus a small
   setTimeout step machine). Each turn transitions in, shows a brief typing
   indicator, streams its text with a caret, then reveals its governance
   notes. A visibility:hidden ghost of the finished thread reserves the
   band's height so nothing below reflows while it plays. Reduced-motion
   users get the finished thread, static — the band reads fully without
   the animation, and without sound. */

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
      { t: "I understand the timing. I can get you to Lisbon tonight. There’s a 6:40 nonstop or an 8:15 with one stop, and either one comes with a " },
      { t: "fare difference waiver", term: true },
      { t: ", so there’s no added cost. Which would you prefer?" },
    ],
    notes: ["tone held within brand", "“fare difference waiver” on brand"],
  },
]

/* Total plain-text length of a turn, for the streaming cursor. */
const msgLen = (m: ChatMsg) => m.segs.reduce((n, s) => n + s.t.length, 0)

/* Render a turn's segments up to `limit` characters, preserving the term
   underline on whatever portion is revealed. Pass Infinity for a settled
   turn. */
function renderSegs(segs: readonly ChatSeg[], limit: number) {
  let remaining = limit
  return segs.map((seg, j) => {
    const take = Math.max(0, Math.min(seg.t.length, remaining))
    remaining -= seg.t.length
    if (take <= 0) return null
    const text = seg.t.slice(0, take)
    return seg.term ? (
      <span key={j} className="lv-govchat-term">
        {text}
      </span>
    ) : (
      <span key={j}>{text}</span>
    )
  })
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return reduced
}

/* Reveal cadence. Two streaming speeds, so each turn reads realistically:
   the agent streams at a steady, measured pace (AI tokens arriving); the
   customer types like a person, with quick runs inside words and a breath
   at spaces and punctuation (the DirectionCanvas human-typing model). */
const DOTS_MS = 480 // typing indicator before a turn streams
const AGENT_CHAR_MS = 26 // steady agent stream, per character
const NOTE_MS = 240 // pause after a turn finishes before its notes fade in
const GAP_MS = 400 // pause before the next turn begins

/* Human typing is bursty: a quick cadence inside words, a longer beat after
   spaces, and a think at punctuation. Deterministic jitter keeps the rhythm
   stable across renders. */
function humanCharDelay(text: string, index: number): number {
  const prev = index > 0 ? text[index - 1] : ""
  let base = 36
  if (prev === " ") base = 85
  if (prev === "," || prev === ";") base = 180
  if (prev === "." || prev === "?" || prev === "!") base = 230
  return base + ((index * 2654435761) % 30)
}

/* Delay before the next character of the active turn. */
function charDelay(role: ChatMsg["role"], text: string, index: number): number {
  return role === "agent" ? AGENT_CHAR_MS : humanCharDelay(text, index)
}

type ChatPhase = "dots" | "type" | "done"

/* One turn, given its animation state. `state` is "done" for settled turns
   (full text, notes shown), or the active turn's phase; omit for the ghost. */
function ChatRow({
  msg,
  phase,
  typed,
}: {
  msg: ChatMsg
  phase: ChatPhase
  typed: number
}) {
  const full = phase === "done"
  const streaming = phase === "type"
  const showText = phase !== "dots"
  const caret = streaming && typed < msgLen(msg)
  return (
    <div className={`lv-govchat-row is-${msg.role}`}>
      <span className="lv-govchat-meta">{msg.role === "agent" ? "Agent" : "Customer"}</span>
      <p className="lv-govchat-bubble">
        {showText ? (
          <>
            {renderSegs(msg.segs, full ? Infinity : typed)}
            {caret && <span className="lv-govchat-caret" aria-hidden="true" />}
          </>
        ) : (
          <span className="lv-govchat-typing" aria-label="Typing">
            <span />
            <span />
            <span />
          </span>
        )}
      </p>
      {msg.notes?.map((note) => (
        <span key={note} className={`lv-govchat-note${full ? " is-shown" : ""}`}>
          <span className="lv-govchat-note-dot" aria-hidden="true" />
          {note}
        </span>
      ))}
    </div>
  )
}

/* The finished thread, all turns settled — used both as the layout-reserving
   ghost and as the reduced-motion render. */
function SettledThread() {
  return (
    <div className="lv-govchat-track">
      {THREAD.map((m, i) => (
        <ChatRow key={i} msg={m} phase="done" typed={Infinity} />
      ))}
    </div>
  )
}

function AnimatedThread() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState<ChatPhase>("dots")
  const [typed, setTyped] = useState(0)

  // One-shot: begin when the thread scrolls into view.
  useEffect(() => {
    if (entered) return
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [entered])

  // Step machine: dots -> stream -> notes -> next turn.
  useEffect(() => {
    if (!entered || active >= THREAD.length) return
    const msg = THREAD[active]
    const len = msgLen(msg)
    const fullText = msg.segs.map((s) => s.t).join("")
    let t: number
    if (phase === "dots") {
      t = window.setTimeout(() => {
        setTyped(0)
        setPhase("type")
      }, DOTS_MS)
    } else if (phase === "type") {
      if (typed < len) {
        t = window.setTimeout(() => setTyped((c) => c + 1), charDelay(msg.role, fullText, typed))
      } else {
        t = window.setTimeout(() => setPhase("done"), NOTE_MS)
      }
    } else {
      t = window.setTimeout(() => {
        setActive((a) => a + 1)
        setPhase("dots")
        setTyped(0)
      }, GAP_MS)
    }
    return () => window.clearTimeout(t)
  }, [entered, active, phase, typed])

  return (
    <div className="lv-govchat" ref={rootRef}>
      {/* Ghost reserves the finished height so nothing below reflows. */}
      <div className="lv-govchat-ghost" aria-hidden="true">
        <SettledThread />
      </div>
      {/* Live overlay: turns that have arrived, animating in. */}
      <div className="lv-govchat-live lv-govchat-track">
        {entered &&
          THREAD.slice(0, active + 1).map((m, i) => (
            <ChatRow
              key={i}
              msg={m}
              phase={i < active ? "done" : phase}
              typed={i < active ? Infinity : typed}
            />
          ))}
      </div>
    </div>
  )
}

export default function GovernanceProof() {
  const reduced = useReducedMotion()
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
            {reduced ? <SettledThread /> : <AnimatedThread />}
          </div>
        </div>
      </ScrollReveal>

      {/* One shared element; play on click only. */}
      <audio ref={audioRef} preload="none" />
    </div>
  )
}
