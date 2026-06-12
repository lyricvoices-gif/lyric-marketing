"use client"

/* Opus visual — Direction mode as an animated AI chat that mirrors the
   real product canvas.

   Direction is free-text-first: brands answer the agent in their own
   words through a persistent input dock, the same interaction they know
   from Claude / ChatGPT / Gemini. Voice is an alternate way to answer
   (mic in the dock, transcript lands in the input), and suggestion
   chips appear only at tightly bounded moments, like locking the
   configuration. The animation walks those three beats in order:

   Round 1 — TYPE. The agent's question streams in character by
   character. The brand's reply then types into the dock, sends, and
   lands in the thread as a sage-bordered quote (the product's brand-turn
   treatment, replacing the old gold chip pills).

   Round 2 — VOICE. The mic in the dock goes live (breathing sage) while
   the brand "speaks," then the transcript types in fast and sends.

   Round 3 — LOCK. The agent proposes; a single gold "Lock this
   configuration" chip appears, lights, and a gold locked-configuration
   line lands as the payoff. The thread dwells, fades, and the cycle
   restarts.

   A 2px caret blinks at the end of partial text while either side is
   streaming. Reduced-motion users see the final locked state, fully
   typed, no caret, no streaming. */

import { useEffect, useRef, useState } from "react"

type AnswerMode = "type" | "voice" | "chip"

type Round = {
  agent: string
  reply: string
  mode: AnswerMode
  chipLabel?: string
}

const SCRIPT: readonly Round[] = [
  {
    agent:
      "I'm listening. Tell me where this voice will live and what it needs to make a customer feel.",
    reply: "Our banking app's support flow. Composed, reassuring under pressure.",
    mode: "type",
  },
  {
    agent: "Good. When a customer is angry, does the voice slow down or hold its pace?",
    reply: "Slow down, acknowledge directly, keep the warmth.",
    mode: "voice",
  },
  {
    agent: "Composed, direct, warmer under pressure. The configuration is ready to review.",
    reply: "Lock this configuration",
    mode: "chip",
    chipLabel: "Lock this configuration",
  },
] as const

/* Phase walk per round:
   agent      → streaming the agent message, then dwelling once typed
   listening  → voice rounds only: mic live in the dock
   answer     → reply text typing into the dock (or chip visible)
   lit        → chip rounds only: the chip highlighted gold
   sent       → reply lands in the thread as a brand turn / locked line
   reset      → whole thread fades before looping back to round 0 */
type Phase = "agent" | "listening" | "answer" | "lit" | "sent" | "reset"

const AGENT_CHAR_MS = 48
const PHASE_MS = {
  idleAfterAgent: 1500,
  idleAfterReply: 750,
  chipVisible: 1900,
  lit: 1200,
  sent: 1900,
  lockedDwell: 3200,
  reset: 2400,
}

/* Human typing is bursty, not metronomic: quick runs inside words, a
   breath at each space, a longer think at punctuation. The delay before
   typing the character at `index` keys off the character just typed,
   plus deterministic jitter (a Weyl-style hash, so the rhythm is stable
   across renders without Math.random re-rolling every effect pass).
   Net pace lands around 80 to 110 WPM with visible hesitations, which
   reads as a confident professional typist rather than a teleprompter. */
function humanTypeDelay(text: string, index: number): number {
  const prev = index > 0 ? text[index - 1] : ""
  let base = 82
  if (prev === " ") base = 170
  if (prev === "," || prev === ";") base = 340
  if (prev === "." || prev === "?") base = 420
  const jitter = (index * 2654435761) % 56
  return base + jitter
}

/* Speech runs about 150 words per minute, so the mic stays live for as
   long as actually saying the reply would take. */
function speakingDurationMs(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length
  return 900 + words * 400
}

/* Transcription lands in word chunks, not letters. Given the current
   character index, return the index just past the end of the next word
   (including its trailing space) so each tick reveals one whole word. */
function nextWordBoundary(text: string, index: number): number {
  let i = index
  while (i < text.length && text[i] !== " ") i++
  while (i < text.length && text[i] === " ") i++
  return i
}
const VOICE_WORD_MS = 110

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

export default function OpusVisual() {
  const reduced = useReducedMotion()
  const [round, setRound] = useState(0)
  const [phase, setPhase] = useState<Phase>("agent")
  const [typedAgent, setTypedAgent] = useState(0)
  const [typedReply, setTypedReply] = useState(0)

  /* The animation does not run until the Opus pillar scrolls into view —
     one-shot intersection trigger, matching the site's ScrollReveal
     pattern. */
  const rootRef = useRef<HTMLDivElement>(null)
  const [hasEntered, setHasEntered] = useState(false)

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
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasEntered])

  const current = SCRIPT[round]
  const agentDone = typedAgent >= current.agent.length
  const replyDone = typedReply >= current.reply.length
  const isLockRound = current.mode === "chip"

  useEffect(() => {
    if (reduced) {
      // Static fallback: park at the locked final state.
      setRound(SCRIPT.length - 1)
      setPhase("sent")
      setTypedAgent(SCRIPT[SCRIPT.length - 1].agent.length)
      setTypedReply(SCRIPT[SCRIPT.length - 1].reply.length)
      return
    }

    if (!hasEntered) return

    if (phase === "agent" && !agentDone) {
      const t = window.setTimeout(() => setTypedAgent((c) => c + 1), AGENT_CHAR_MS)
      return () => window.clearTimeout(t)
    }

    if (phase === "agent" && agentDone) {
      const t = window.setTimeout(() => {
        if (current.mode === "voice") setPhase("listening")
        else setPhase("answer")
      }, PHASE_MS.idleAfterAgent)
      return () => window.clearTimeout(t)
    }

    if (phase === "listening") {
      const t = window.setTimeout(() => setPhase("answer"), speakingDurationMs(current.reply))
      return () => window.clearTimeout(t)
    }

    if (phase === "answer" && current.mode === "chip") {
      // The chip is mounted and visible; after a beat the pick registers.
      const t = window.setTimeout(() => setPhase("lit"), PHASE_MS.chipVisible)
      return () => window.clearTimeout(t)
    }

    if (phase === "answer" && !replyDone) {
      // Voice replies land as whole-word transcription chunks; typed
      // replies advance a character at a time on the human-burst clock.
      const t =
        current.mode === "voice"
          ? window.setTimeout(
              () => setTypedReply((c) => nextWordBoundary(current.reply, c)),
              VOICE_WORD_MS,
            )
          : window.setTimeout(
              () => setTypedReply((c) => c + 1),
              humanTypeDelay(current.reply, typedReply),
            )
      return () => window.clearTimeout(t)
    }

    if (phase === "answer" && replyDone) {
      const t = window.setTimeout(() => setPhase("sent"), PHASE_MS.idleAfterReply)
      return () => window.clearTimeout(t)
    }

    if (phase === "lit") {
      const t = window.setTimeout(() => setPhase("sent"), PHASE_MS.lit)
      return () => window.clearTimeout(t)
    }

    if (phase === "sent") {
      const t = window.setTimeout(() => {
        if (round < SCRIPT.length - 1) {
          setRound(round + 1)
          setTypedAgent(0)
          setTypedReply(0)
          setPhase("agent")
        } else {
          setPhase("reset")
        }
      }, isLockRound ? PHASE_MS.lockedDwell : PHASE_MS.sent)
      return () => window.clearTimeout(t)
    }

    if (phase === "reset") {
      const t = window.setTimeout(() => {
        setRound(0)
        setTypedAgent(0)
        setTypedReply(0)
        setPhase("agent")
      }, PHASE_MS.reset)
      return () => window.clearTimeout(t)
    }
  }, [round, phase, typedAgent, typedReply, agentDone, replyDone, current, isLockRound, reduced, hasEntered])

  const isResetting = phase === "reset"
  const dockTyping = phase === "answer" && current.mode !== "chip"
  const dockText = dockTyping ? current.reply.slice(0, typedReply) : ""
  const micLive = phase === "listening"

  /* Chip rounds keep the row mounted through lit/sent so the fade-out
     transitions smoothly when the locked line takes over. */
  const chipsMounted =
    isLockRound && !isResetting && (phase === "answer" || phase === "lit" || phase === "sent")
  const chipsVisible = isLockRound && (phase === "answer" || phase === "lit")
  const chipLit = phase === "lit"

  /* Each rendered round bundles its agent message and (if reached) its
     brand reply into one wrapper so the turn recedes as a unit once it
     becomes history. During the reset interlude all rounds stay marked
     history so the composition fades together. */
  type RoundRender = {
    index: number
    agentText: string
    agentCaret: boolean
    replyText: string | null
    locked: boolean
    isHistory: boolean
  }
  const rounds: RoundRender[] = []
  const lastIndex = isResetting ? SCRIPT.length - 1 : round

  for (let i = 0; i <= lastIndex; i++) {
    const isCurrent = i === round && !isResetting
    const streaming = isCurrent && phase === "agent" && typedAgent < SCRIPT[i].agent.length
    const answered = isResetting || i < round || (isCurrent && phase === "sent")
    const chipRound = SCRIPT[i].mode === "chip"
    rounds.push({
      index: i,
      agentText: streaming ? SCRIPT[i].agent.slice(0, typedAgent) : SCRIPT[i].agent,
      agentCaret: streaming,
      replyText: answered && !chipRound ? SCRIPT[i].reply : null,
      locked: answered && chipRound,
      isHistory: i < lastIndex,
    })
  }

  return (
    <div ref={rootRef} className="lv-pillar-visual lv-pillar-visual-opus">
      <div className="lv-pillar-bg lv-pillar-bg-opus" aria-hidden="true" />
      <div className="lv-opus-panel" aria-hidden="true">
        <div className="lv-opus-panel-head">
          <span className="lv-opus-chip">
            <span className="lv-opus-chip-dot" />
            <span className="lv-opus-chip-label">Direction · Live</span>
          </span>
        </div>

        <div className="lv-opus-modes">
          <span className="lv-opus-mode is-active">Direction</span>
          <span className="lv-opus-mode-divider" aria-hidden="true" />
          <span className="lv-opus-mode">Composer</span>
        </div>

        <div className={`lv-opus-conversation${isResetting ? " is-resetting" : ""}`}>
          {rounds.map((r) => (
            <div key={r.index} className={`lv-opus-round${r.isHistory ? " is-history" : ""}`}>
              <div className="lv-opus-msg lv-opus-msg-agent">
                <span className="lv-opus-msg-text">
                  {r.agentText}
                  {r.agentCaret && <span className="lv-opus-typing-caret" aria-hidden="true" />}
                </span>
              </div>
              {r.replyText !== null && (
                <div className="lv-opus-msg lv-opus-msg-user">
                  <span className="lv-opus-msg-text">{r.replyText}</span>
                </div>
              )}
              {r.locked && (
                <div className="lv-opus-msg lv-opus-locked">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <span>Configuration locked · JSON spec ready</span>
                </div>
              )}
            </div>
          ))}

          {chipsMounted && (
            <div key={`chips-${round}`} className={`lv-opus-chips${chipsVisible ? "" : " is-hidden"}`}>
              <span className={`lv-opus-chip-suggestion is-accent${chipLit ? " is-selected" : ""}`}>
                {current.chipLabel}
              </span>
            </div>
          )}
        </div>

        {/* Persistent mini dock — the product's free-text-first input.
            Replies type here before they send; the mic breathes sage
            during the voice beat. */}
        <div className="lv-opus-dock">
          <span className="lv-opus-dock-glyph" aria-hidden="true">
            +
          </span>
          <span className="lv-opus-dock-field">
            {dockText ? (
              <span className="lv-opus-dock-text">
                {dockText}
                {!replyDone && <span className="lv-opus-typing-caret" aria-hidden="true" />}
              </span>
            ) : micLive ? (
              <span className="lv-opus-dock-listening">Listening</span>
            ) : (
              <span className="lv-opus-dock-placeholder">Describe the deployment, tone, or constraints.</span>
            )}
          </span>
          <span className={`lv-opus-dock-mic${micLive ? " is-live" : ""}`} aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
          </span>
          <span className={`lv-opus-dock-send${dockText && replyDone ? " is-ready" : ""}`} aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
