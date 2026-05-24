"use client"

/* Opus visual — Direction mode as an animated AI chat with character-
   by-character streaming.

   Opus has two modes. Direction (upstream) is a directorial conversation
   where the AI plays producer and asks shaping questions; the user
   answers by tapping suggestion chips. Composer (downstream) produces
   the directed performance.

   The animation mirrors the streaming behavior of Gemini / ChatGPT /
   Claude. Each agent message types out one character at a time. While
   the message is still typing, no chips are visible — the same way real
   AI chat surfaces wait for a response to finish before offering
   follow-up suggestions. Once typing completes, the chips fade in. The
   user "picks" a chip (it lights gold), the chip row fades out, the
   user's selection lands as a gold pill in the thread, and the next
   agent message starts typing in a new bubble below it. After three
   rounds the whole thread fades together for a brief interlude and the
   cycle restarts.

   A 2px caret blinks at the end of the partial text while a message is
   streaming. Reduced-motion users see the final state of the third
   round, fully typed, no caret, no streaming. */

import { useEffect, useRef, useState } from "react"

type Round = {
  agent: string
  chips: readonly string[]
  pick: number
}

const SCRIPT: readonly Round[] = [
  {
    agent:
      "Hi. I help shape how your AI voice performs. How can I help you direct?",
    chips: ["Direct a scene", "Build a brand voice", "Shape an emotional take"],
    pick: 0,
  },
  {
    agent: "Good. What's the emotional core of the scene?",
    chips: ["Reassuring", "Urgent", "Considered"],
    pick: 2,
  },
  {
    agent: "Considered. Who is on the other end?",
    chips: ["A first-time listener", "An expert", "A friend"],
    pick: 0,
  },
] as const

/* Phase covers both typing and the chip-visible state under 'agent':
   - agent + typedCount < length: streaming the message
   - agent + typedCount === length: message done, chips visible
   - lit: user has "picked" one chip (highlighted gold)
   - user: chips fade away, user pill appears in the thread
   - reset: whole thread fades out before looping back to round 0 */
type Phase = "agent" | "lit" | "user" | "reset"

/* Premium editorial pacing — 20 chars/sec typing, with surrounding
   phases lengthened by ~20–30% from the first cut. Lyric's register is
   considered, not chatty: each beat should land cleanly. At 50ms/char
   the longest agent message takes ~3.7s to type, the shortest ~1.8s. */
const TYPE_CHAR_MS = 50
const PHASE_MS = {
  idleAfterTyping: 2200,
  lit: 1300,
  user: 2000,
  reset: 2400,
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

export default function OpusVisual() {
  const reduced = useReducedMotion()
  const [round, setRound] = useState(0)
  const [phase, setPhase] = useState<Phase>("agent")
  const [typedCount, setTypedCount] = useState(0)

  /* The animation does not run until the Opus pillar scrolls into view —
     one-shot intersection trigger, matching the site's ScrollReveal
     pattern. Until hasEntered is true, the state machine sits parked at
     step 0 with the first agent message not yet typed. */
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

  const currentAgentLen = SCRIPT[round]?.agent.length ?? 0
  const messageFullyTyped = typedCount >= currentAgentLen

  useEffect(() => {
    if (reduced) {
      // Static fallback: park at the final state with everything typed
      // and the last user pick visible.
      setRound(SCRIPT.length - 1)
      setPhase("user")
      setTypedCount(SCRIPT[SCRIPT.length - 1].agent.length)
      return
    }

    // Don't advance the conversation until the pillar has entered view.
    if (!hasEntered) return

    if (phase === "agent" && typedCount < currentAgentLen) {
      // Type one character at a time. Each tick re-runs the effect via
      // the typedCount dependency, scheduling the next character.
      const t = window.setTimeout(
        () => setTypedCount((c) => c + 1),
        TYPE_CHAR_MS,
      )
      return () => window.clearTimeout(t)
    }

    if (phase === "agent" && typedCount >= currentAgentLen) {
      // Streaming complete — dwell with the chips visible before the
      // simulated chip pick.
      const t = window.setTimeout(
        () => setPhase("lit"),
        PHASE_MS.idleAfterTyping,
      )
      return () => window.clearTimeout(t)
    }

    if (phase === "lit") {
      const t = window.setTimeout(() => setPhase("user"), PHASE_MS.lit)
      return () => window.clearTimeout(t)
    }

    if (phase === "user") {
      const t = window.setTimeout(() => {
        if (round < SCRIPT.length - 1) {
          setRound(round + 1)
          setTypedCount(0)
          setPhase("agent")
        } else {
          setPhase("reset")
        }
      }, PHASE_MS.user)
      return () => window.clearTimeout(t)
    }

    if (phase === "reset") {
      const t = window.setTimeout(() => {
        setRound(0)
        setTypedCount(0)
        setPhase("agent")
      }, PHASE_MS.reset)
      return () => window.clearTimeout(t)
    }
  }, [round, phase, typedCount, currentAgentLen, reduced, hasEntered])

  const isResetting = phase === "reset"
  const isTyping = phase === "agent" && !messageFullyTyped

  /* Chips only mount once the agent message has fully streamed. They
     stay mounted through the lit and user phases so the .is-hidden
     fade-out can transition smoothly when the user pill takes over. */
  const shouldMountChips = !isResetting && !isTyping
  const chipsVisible =
    (phase === "agent" && messageFullyTyped) || phase === "lit"
  const chipsLit = phase === "lit"

  /* Each rendered round bundles its agent message and (if reached) its
     user pick into a single .lv-opus-round wrapper so the whole turn
     scales down and dims as a unit when it becomes history. During the
     reset interlude all three rounds stay marked history, so the small-
     and-faded composition fades out together rather than briefly
     popping back to full size before the reset transition begins. */
  type RoundRender = {
    index: number
    agentText: string
    showCaret: boolean
    userText: string | null
    isHistory: boolean
  }
  const rounds: RoundRender[] = []
  const lastIndex = isResetting ? SCRIPT.length - 1 : round

  for (let i = 0; i <= lastIndex; i++) {
    const isCurrentRound = i === round && !isResetting
    const isStreaming =
      isCurrentRound && phase === "agent" && typedCount < SCRIPT[i].agent.length
    const userShown =
      isResetting || i < round || (i === round && phase === "user")
    rounds.push({
      index: i,
      agentText: isStreaming
        ? SCRIPT[i].agent.slice(0, typedCount)
        : SCRIPT[i].agent,
      showCaret: isStreaming,
      userText: userShown ? SCRIPT[i].chips[SCRIPT[i].pick] : null,
      isHistory: i < lastIndex,
    })
  }

  return (
    <div
      ref={rootRef}
      className="lv-pillar-visual lv-pillar-visual-opus"
    >
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

        <div
          className={`lv-opus-conversation${
            isResetting ? " is-resetting" : ""
          }`}
        >
          {rounds.map((r) => (
            <div
              key={r.index}
              className={`lv-opus-round${r.isHistory ? " is-history" : ""}`}
            >
              <div className="lv-opus-msg lv-opus-msg-agent">
                <span className="lv-opus-msg-text">
                  {r.agentText}
                  {r.showCaret && (
                    <span
                      className="lv-opus-typing-caret"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </div>
              {r.userText !== null && (
                <div className="lv-opus-msg lv-opus-msg-user">
                  <span className="lv-opus-msg-text">{r.userText}</span>
                </div>
              )}
            </div>
          ))}

          {shouldMountChips && (
            <div
              key={`chips-${round}`}
              className={`lv-opus-chips${chipsVisible ? "" : " is-hidden"}`}
            >
              {SCRIPT[round].chips.map((chip, j) => (
                <span
                  key={chip}
                  className={`lv-opus-chip-suggestion${
                    chipsLit && j === SCRIPT[round].pick ? " is-selected" : ""
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
