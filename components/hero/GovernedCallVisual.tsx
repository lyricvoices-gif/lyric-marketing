"use client"

/* Governed conversation — the home hero's animated mockup.

   A live customer call rendered as a clean, readable transcript, with one
   quiet layer on top that shows what Lyric governs. The conversation reads
   first; the product's work whispers in beside the agent's turns, a beat
   after each message lands, so it never competes with the line you are
   reading.

   On load the header and the first agent turn are already in their final
   position, as if the call is already in progress. The remaining turns
   settle in one at a time. Every turn is rendered from the start so its
   space is reserved: nothing reflows or re-centers as the call plays, so
   each turn can animate smoothly with opacity and transform alone.

   Three governed beats, from a real bank call: a brand term pronounced on
   brand (how it sounds), tone held under stress (how it sounds), and a
   required disclosure added (how it communicates).

   Plays once when the hero scrolls into view, then settles and holds.
   Mirrors the OpusVisual pattern: a useReducedMotion hook, a one-shot
   IntersectionObserver, and a small setTimeout step machine. Reduced-motion
   users get the full transcript and notes, static. */

import { useEffect, useRef, useState } from "react"

type Seg = { t: string; term?: boolean }
type Msg = { role: "agent" | "caller"; time: string; segs: Seg[]; note?: string }

const MESSAGES: readonly Msg[] = [
  {
    role: "agent",
    time: "2:14:00 AM",
    segs: [
      { t: "Thank you for calling " },
      { t: "Caldera Bank", term: true },
      { t: ". This is Avery. How can I help?" },
    ],
    note: "“Caldera” pronounced on brand",
  },
  {
    role: "caller",
    time: "2:14:03 AM",
    segs: [
      {
        t: "There’s a charge I don’t recognize. Five hundred dollars. I’m kind of panicking.",
      },
    ],
  },
  {
    role: "agent",
    time: "2:14:07 AM",
    segs: [
      {
        t: "I understand. We will sort this out together. I can see the charge and I am placing a hold on it now.",
      },
    ],
    note: "tone held within brand",
  },
  {
    role: "caller",
    time: "2:14:12 AM",
    segs: [{ t: "Okay. Thank you." }],
  },
  {
    role: "agent",
    time: "2:14:15 AM",
    segs: [
      {
        t: "Of course. For your security, this call is recorded and I will verify a few details before we go on.",
      },
    ],
    note: "disclosure added by spec",
  },
] as const

type Step = { kind: "msg" | "note"; index: number; delay: number }

/* The reveal order and cadence. `delay` is the pause before each step,
   measured from the previous one. Tuned to read at a calm, natural pace:
   longer turns get more dwell so nothing feels rushed, short turns move
   along so it never drags. The first agent turn is shown at load, so the
   machine starts after it (INITIAL_STEPS), beginning with its note. */
const STEPS: readonly Step[] = [
  { kind: "msg", index: 0, delay: 0 }, // present at load
  { kind: "note", index: 0, delay: 900 },
  { kind: "msg", index: 1, delay: 1800 },
  { kind: "msg", index: 2, delay: 2600 },
  { kind: "note", index: 2, delay: 800 },
  { kind: "msg", index: 3, delay: 2800 },
  { kind: "msg", index: 4, delay: 2200 },
  { kind: "note", index: 4, delay: 800 },
] as const

const INITIAL_STEPS = 1

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

export default function GovernedCallVisual() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [stepIdx, setStepIdx] = useState(INITIAL_STEPS)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (hasEntered) return
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasEntered])

  useEffect(() => {
    if (reduced) {
      setStepIdx(STEPS.length)
      return
    }
    if (!hasEntered || stepIdx >= STEPS.length) return
    const t = window.setTimeout(() => setStepIdx((s) => s + 1), STEPS[stepIdx].delay)
    return () => window.clearTimeout(t)
  }, [reduced, hasEntered, stepIdx])

  const done = stepIdx >= STEPS.length

  // Live call timer — runs while the call plays, stops once it settles.
  useEffect(() => {
    if (reduced) {
      setSeconds(12)
      return
    }
    if (!hasEntered || done) return
    const id = window.setInterval(() => setSeconds((x) => x + 1), 1000)
    return () => window.clearInterval(id)
  }, [reduced, hasEntered, done])

  const completed = STEPS.slice(0, stepIdx)
  const msgVisible = (i: number) =>
    completed.some((s) => s.kind === "msg" && s.index === i)
  const noteVisible = (i: number) =>
    completed.some((s) => s.kind === "note" && s.index === i)

  const mmss = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`

  return (
    <div ref={rootRef} className="lv-conv" aria-hidden="true">
      <div className="lv-conv-head">
        <span className="lv-conv-head-label">Governed by Lyric</span>
        <span className="lv-conv-head-live">
          <span className={`lv-conv-head-dot${done ? "" : " is-live"}`} />
          LIVE {mmss}
        </span>
      </div>

      {/* Every turn is rendered from the start so its space is reserved and
          nothing reflows as the call plays. The first turn is static; the
          rest fade and settle in when revealed. */}
      <div className="lv-conv-thread">
        {MESSAGES.map((m, i) => {
          const rowState =
            i === 0 ? " is-static" : msgVisible(i) ? " is-enter" : ""
          return (
            <div key={i} className={`lv-conv-row is-${m.role}${rowState}`}>
              <div className="lv-conv-bubble">
                <div className="lv-conv-meta">
                  <span className="lv-conv-role">
                    {m.role === "agent" ? "Agent" : "Caller"}
                  </span>
                  <span className="lv-conv-time">{m.time}</span>
                </div>
                <p className="lv-conv-text">
                  {m.segs.map((seg, j) =>
                    seg.term ? (
                      <span key={j} className="lv-conv-term">
                        {seg.t}
                      </span>
                    ) : (
                      <span key={j}>{seg.t}</span>
                    ),
                  )}
                </p>
              </div>
              {m.note && (
                <span className={`lv-conv-note${noteVisible(i) ? " is-shown" : ""}`}>
                  <span className="lv-conv-note-dot" />
                  {m.note}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
