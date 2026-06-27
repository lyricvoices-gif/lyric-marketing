"use client"

/* The Direction session canvas, in action. This is the interactive
   counterpart to Composer's storyboard clips: instead of a static
   screenshot, the frame plays the real flow — the agent asks, the brand
   answers by keyboard and by voice, parameters take shape, the
   configuration locks — then loops.

   The composition is a full-scale recreation of the product canvas
   (ink interior, sage-quote brand turns, parameter snapshot, gold
   locked-config payoff, free-text dock with a voice-reply mic), styled
   by the lv-dirshow-* classes. Animation is IO-gated so it only runs
   once the section scrolls into view, and reduced-motion users see the
   settled locked state with no streaming. */

import { useEffect, useRef, useState } from "react"
import Isotype from "@/components/Isotype"

const Q1 = "Where will this voice live, and what does it need to make a customer feel?"
const A1 = "Our banking app's support flow. Composed, reassuring under pressure."
const Q2 = "When a customer is angry, does the voice slow down or hold its pace?"
const A2 = "Slow down, acknowledge directly, keep the warmth."
const Q3 = "Heard. Here is where the configuration stands."

const SNAPSHOT_ROWS: ReadonlyArray<[string, string]> = [
  ["Voice", "Morgan · The Anchor"],
  ["Emotional core", "Calm 0.72 · Confidence 0.64 · Warmth 0.56"],
  ["Pacing", "Measured, medium pause density"],
  ["Edge cases", "Slow down for escalations, acknowledge directly"],
]

/* Ordered phase walk. agentTyped drives the q* streams; replyTyped drives
   the a* dock entries. */
const ORDER = [
  "q1",
  "a1type",
  "a1sent",
  "q2",
  "a2listen",
  "a2type",
  "a2sent",
  "q3",
  "snapshot",
  "locked",
  "dwell",
  "reset",
] as const
type Phase = (typeof ORDER)[number]

const AGENT_CHAR_MS = 26
const VOICE_WORD_MS = 110
const IDLE = { afterAgent: 1100, afterReply: 750, afterSent: 650, afterSnapshot: 1200, dwell: 3600, reset: 1300 }

/* Human typing is bursty: quick runs inside words, a breath at spaces, a
   longer think at punctuation. Deterministic jitter keeps the rhythm
   stable across renders. */
function humanTypeDelay(text: string, index: number): number {
  const prev = index > 0 ? text[index - 1] : ""
  let base = 78
  if (prev === " ") base = 165
  if (prev === "," || prev === ";") base = 330
  if (prev === "." || prev === "?") base = 410
  return base + ((index * 2654435761) % 52)
}

/* Speech runs ~150 wpm, so the mic stays live for as long as saying the
   reply would take. */
function speakingDurationMs(text: string): number {
  return 900 + text.split(/\s+/).filter(Boolean).length * 400
}

/* Transcription lands in whole-word chunks, not letters. */
function nextWordBoundary(text: string, index: number): number {
  let i = index
  while (i < text.length && text[i] !== " ") i++
  while (i < text.length && text[i] === " ") i++
  return i
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

export default function DirectionCanvas() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>("q1")
  const [agentTyped, setAgentTyped] = useState(0)
  const [replyTyped, setReplyTyped] = useState(0)

  const rootRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (entered) return
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [entered])

  const idx = ORDER.indexOf(phase)
  const at = (p: Phase) => idx >= ORDER.indexOf(p)

  useEffect(() => {
    if (reduced) {
      setPhase("dwell")
      setAgentTyped(Q3.length)
      setReplyTyped(A2.length)
      return
    }
    if (!entered) return

    let t: number

    switch (phase) {
      case "q1":
        if (agentTyped < Q1.length) t = window.setTimeout(() => setAgentTyped((c) => c + 1), AGENT_CHAR_MS)
        else t = window.setTimeout(() => { setPhase("a1type"); setReplyTyped(0) }, IDLE.afterAgent)
        break
      case "a1type":
        if (replyTyped < A1.length) t = window.setTimeout(() => setReplyTyped((c) => c + 1), humanTypeDelay(A1, replyTyped))
        else t = window.setTimeout(() => setPhase("a1sent"), IDLE.afterReply)
        break
      case "a1sent":
        t = window.setTimeout(() => { setPhase("q2"); setAgentTyped(0) }, IDLE.afterSent)
        break
      case "q2":
        if (agentTyped < Q2.length) t = window.setTimeout(() => setAgentTyped((c) => c + 1), AGENT_CHAR_MS)
        else t = window.setTimeout(() => { setPhase("a2listen"); setReplyTyped(0) }, IDLE.afterAgent)
        break
      case "a2listen":
        t = window.setTimeout(() => { setPhase("a2type"); setReplyTyped(0) }, speakingDurationMs(A2))
        break
      case "a2type":
        if (replyTyped < A2.length) t = window.setTimeout(() => setReplyTyped((c) => nextWordBoundary(A2, c)), VOICE_WORD_MS)
        else t = window.setTimeout(() => setPhase("a2sent"), IDLE.afterReply)
        break
      case "a2sent":
        t = window.setTimeout(() => { setPhase("q3"); setAgentTyped(0) }, IDLE.afterSent)
        break
      case "q3":
        if (agentTyped < Q3.length) t = window.setTimeout(() => setAgentTyped((c) => c + 1), AGENT_CHAR_MS)
        else t = window.setTimeout(() => setPhase("snapshot"), IDLE.afterAgent)
        break
      case "snapshot":
        t = window.setTimeout(() => setPhase("locked"), IDLE.afterSnapshot)
        break
      case "locked":
        t = window.setTimeout(() => setPhase("dwell"), IDLE.dwell)
        break
      case "dwell":
        t = window.setTimeout(() => setPhase("reset"), 400)
        break
      case "reset":
        t = window.setTimeout(() => { setPhase("q1"); setAgentTyped(0); setReplyTyped(0) }, IDLE.reset)
        break
    }

    return () => window.clearTimeout(t)
  }, [phase, agentTyped, replyTyped, entered, reduced])

  const resetting = phase === "reset"
  const agent1 = phase === "q1" ? Q1.slice(0, agentTyped) : Q1
  const agent1Caret = phase === "q1" && agentTyped < Q1.length
  const agent2 = phase === "q2" ? Q2.slice(0, agentTyped) : Q2
  const agent2Caret = phase === "q2" && agentTyped < Q2.length
  const agent3 = phase === "q3" ? Q3.slice(0, agentTyped) : Q3
  const agent3Caret = phase === "q3" && agentTyped < Q3.length

  const dockReply =
    phase === "a1type" ? A1.slice(0, replyTyped) : phase === "a2type" ? A2.slice(0, replyTyped) : ""
  const dockCaret = (phase === "a1type" && replyTyped < A1.length) || (phase === "a2type" && replyTyped < A2.length)
  const dockReady =
    (phase === "a1type" && replyTyped >= A1.length) || (phase === "a2type" && replyTyped >= A2.length)
  const micLive = phase === "a2listen"

  return (
    <div ref={rootRef} className={`lv-dirshow-frame lv-dirshow-frame-live${resetting ? " is-resetting" : ""}`} aria-hidden="true">
      <div className="lv-dirshow-bar">
        <span className="lv-dirshow-brand">
          <Isotype size={18} color="#F0E8D5" />
          <span className="lv-dirshow-brand-name">Callio</span>
          <span className="lv-dirshow-brand-product">Direction</span>
        </span>
        <span className="lv-dirshow-session">
          <span className="lv-dirshow-session-dot" />
          In progress
        </span>
      </div>

      <div className="lv-dirshow-thread">
        <div className="lv-dirshow-turn lv-dirshow-turn-agent">
          <Isotype size={14} color="rgba(240, 232, 213, 0.85)" style={{ marginTop: 4 }} />
          <p>
            {agent1}
            {agent1Caret && <span className="lv-dirshow-caret" />}
          </p>
        </div>

        {at("a1sent") && (
          <div className="lv-dirshow-turn lv-dirshow-turn-brand lv-dirshow-in">
            <p>{A1}</p>
          </div>
        )}

        {at("q2") && (
          <div className="lv-dirshow-turn lv-dirshow-turn-agent lv-dirshow-in">
            <Isotype size={14} color="rgba(240, 232, 213, 0.85)" style={{ marginTop: 4 }} />
            <p>
              {agent2}
              {agent2Caret && <span className="lv-dirshow-caret" />}
            </p>
          </div>
        )}

        {at("a2sent") && (
          <div className="lv-dirshow-turn lv-dirshow-turn-brand lv-dirshow-in">
            <p>{A2}</p>
          </div>
        )}

        {at("q3") && (
          <div className="lv-dirshow-turn lv-dirshow-turn-agent lv-dirshow-in">
            <Isotype size={14} color="rgba(240, 232, 213, 0.85)" style={{ marginTop: 4 }} />
            <div className="lv-dirshow-turn-body">
              <p>
                {agent3}
                {agent3Caret && <span className="lv-dirshow-caret" />}
              </p>
              {at("snapshot") && (
                <dl className="lv-dirshow-snapshot lv-dirshow-in">
                  {SNAPSHOT_ROWS.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {at("locked") && (
                <div className="lv-dirshow-locked lv-dirshow-in">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <span className="lv-dirshow-locked-title">Configuration locked</span>
                  <span className="lv-dirshow-locked-meta">JSON spec · ready for engineering</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="lv-dirshow-dock">
        <span className="lv-dirshow-dock-glyph">+</span>
        <span className="lv-dirshow-dock-field">
          {dockReply ? (
            <span className="lv-dirshow-dock-text">
              {dockReply}
              {dockCaret && <span className="lv-dirshow-caret" />}
            </span>
          ) : micLive ? (
            <span className="lv-dirshow-dock-listening">Listening</span>
          ) : (
            <span className="lv-dirshow-dock-placeholder">
              Describe the deployment, tone, edge cases, or constraints.
            </span>
          )}
        </span>
        <span className={`lv-dirshow-dock-icon${micLive ? " is-live" : ""}`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
          </svg>
        </span>
        <span className={`lv-dirshow-dock-send${dockReady ? " is-ready" : ""}`}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </span>
      </div>
    </div>
  )
}
