"use client"

/* Home hero visual — one brand voice across channels, animated as a live
   conversation.

   Three agent instances answer the same customer question, one per channel,
   and each one sounds like the same company: the same governed voice, lightly
   adapted to the channel's norms. The exchange plays, it doesn't just appear:
   the customer types the question (bursty human cadence), then each channel
   card lands in sequence — call, then chat, then SMS — shows a brief typing
   indicator, and streams its reply at the steady agent pace. The breadth
   proof beside the home hero's breadth claim (one brand voice across every
   agent), behaving like the governed chat thread in the home page's
   "What it governs" band (GovernanceProof) so the two read as one system.

   Built on the same machinery as GovernanceProof / GovernedCallVisual: a
   useReducedMotion hook, a one-shot IntersectionObserver, and a small
   setTimeout step machine. Every card is rendered from the start and each
   reply keeps a visibility:hidden ghost of its full text, so all space is
   reserved and nothing reflows while the sequence plays. Reduced-motion
   users get the settled conversation, static. */

import { useEffect, useRef, useState } from "react"

type Channel = "call" | "chat" | "sms"
type Card = { channel: Channel; label: string; agent: string; reply: string }

const QUESTION = "When is my payment due?"

const CARDS: readonly Card[] = [
  {
    channel: "call",
    label: "Phone",
    agent: "Agent 01",
    reply:
      "Your payment is due on the fifteenth. I’m here if you need help with anything else.",
  },
  {
    channel: "chat",
    label: "Chat",
    agent: "Agent 02",
    reply:
      "Your payment is due on the fifteenth. I’m here to help with anything else you need.",
  },
  {
    channel: "sms",
    label: "SMS",
    agent: "Agent 03",
    reply: "Your payment is due on the 15th. I’m here if you need anything else.",
  },
] as const

/* Conversation cadence — the GovernanceProof rhythm: a beat of typing dots
   before a turn streams, a steady agent stream, a breath between turns. */
const DOTS_MS = 480
const AGENT_CHAR_MS = 26
const GAP_MS = 420

/* Human typing is bursty: a quick cadence inside words, a longer beat after
   spaces, and a think at punctuation. Deterministic jitter keeps the rhythm
   stable across renders (the DirectionCanvas human-typing model). */
function humanCharDelay(text: string, index: number): number {
  const prev = index > 0 ? text[index - 1] : ""
  let base = 36
  if (prev === " ") base = 85
  if (prev === "," || prev === ";") base = 180
  if (prev === "." || prev === "?" || prev === "!") base = 230
  return base + ((index * 2654435761) % 30)
}

function ChannelIcon({ channel }: { channel: Channel }) {
  if (channel === "call") {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M5.2 2.5 6.4 5l-1.3 1.3a8 8 0 0 0 3.6 3.6L10 8.6l2.5 1.2v2.4a1 1 0 0 1-1.1 1A10.5 10.5 0 0 1 2.8 4.6a1 1 0 0 1 1-1.1z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (channel === "chat") {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="12" height="8.5" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5.5 13.5 8 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="6" cy="7.2" r="0.7" fill="currentColor" />
        <circle cx="8" cy="7.2" r="0.7" fill="currentColor" />
        <circle cx="10" cy="7.2" r="0.7" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 4.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7l-3 2.5V10.5h-.5a2 2 0 0 1-2-2z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
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

/* Turn order: the customer question, then the three channel replies. */
const TURNS: readonly string[] = [QUESTION, ...CARDS.map((c) => c.reply)]
const FINAL = TURNS.length

type Phase = "dots" | "type" | "done"

/* A streaming text body: a hidden ghost of the full text reserves the space;
   the live portion overlays it, with the typing dots or the streamed
   characters and caret. `state` is "done" for settled turns. */
function StreamText({
  text,
  phase,
  typed,
  className,
}: {
  text: string
  phase: Phase
  typed: number
  className: string
}) {
  const settled = phase === "done"
  return (
    <span className="lv-opus-drift-stream">
      <span className={`${className} lv-opus-drift-stream-ghost`} aria-hidden="true">
        {text}
      </span>
      <span className={`${className} lv-opus-drift-stream-live`}>
        {phase === "dots" ? (
          <span className="lv-opus-drift-typing" aria-label="Typing">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <>
            {settled ? text : text.slice(0, typed)}
            {!settled && typed < text.length && (
              <span className="lv-opus-drift-caret" aria-hidden="true" />
            )}
          </>
        )}
      </span>
    </span>
  )
}

export default function CallioDriftVisual() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [entered, setEntered] = useState(false)
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState<Phase>("dots")
  const [typed, setTyped] = useState(0)

  useEffect(() => setMounted(true), [])

  // Animate only once mounted with motion allowed; otherwise render the
  // settled conversation (matching SSR — no hydration flip).
  const anim = mounted && !reduced

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
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [entered])

  // Step machine: dots -> stream -> pause -> next turn. The customer types at
  // the bursty human cadence; agents stream at the steady pace.
  useEffect(() => {
    if (!anim || !entered || active >= FINAL) return
    const text = TURNS[active]
    const isCustomer = active === 0
    let t: number
    if (phase === "dots") {
      t = window.setTimeout(() => {
        setTyped(0)
        setPhase("type")
      }, DOTS_MS)
    } else if (phase === "type") {
      if (typed < text.length) {
        const delay = isCustomer ? humanCharDelay(text, typed) : AGENT_CHAR_MS
        t = window.setTimeout(() => setTyped((c) => c + 1), delay)
      } else {
        t = window.setTimeout(() => setPhase("done"), 160)
      }
    } else {
      t = window.setTimeout(() => {
        setActive((a) => a + 1)
        setPhase("dots")
        setTyped(0)
      }, GAP_MS)
    }
    return () => window.clearTimeout(t)
  }, [anim, entered, active, phase, typed])

  const done = !anim || active >= FINAL
  /* Turn i's phase: settled once passed, live while active, dots-pending
     before its card has arrived. Cards land when their turn begins. */
  const turnPhase = (i: number): Phase => (done || active > i ? "done" : phase)
  const turnTyped = (i: number) => (done || active > i ? Infinity : typed)
  const cardShown = (i: number) => done || active >= i + 1

  return (
    <div ref={rootRef} className="lv-opus-drift" aria-hidden="true">
      <div className="lv-opus-drift-bar">
        <span className="lv-opus-drift-bar-label">Three agents · one question</span>
        <span className="lv-opus-drift-live">
          <span className={`lv-opus-drift-live-dot${done ? "" : " is-live"}`} />
          Live
        </span>
      </div>

      <div className="lv-opus-drift-q">
        <span className="lv-opus-drift-q-tag">Customer</span>
        <StreamText
          text={QUESTION}
          phase={turnPhase(0)}
          typed={turnTyped(0)}
          className="lv-opus-drift-q-text"
        />
      </div>

      <div className="lv-opus-drift-stack">
        {CARDS.map((c, i) => (
          <div
            key={c.channel}
            className={`lv-opus-drift-card is-${c.channel}${cardShown(i) ? " is-shown" : ""}`}
          >
            <div className="lv-opus-drift-card-head">
              <span className="lv-opus-drift-chan">
                <span className="lv-opus-drift-chan-icon">
                  <ChannelIcon channel={c.channel} />
                </span>
                {c.label}
              </span>
              <span className="lv-opus-drift-agent">{c.agent}</span>
            </div>
            <StreamText
              text={c.reply}
              phase={turnPhase(i + 1)}
              typed={turnTyped(i + 1)}
              className="lv-opus-drift-reply"
            />
          </div>
        ))}
      </div>

      <p className={`lv-opus-drift-foot${done ? " is-shown" : ""}`}>
        Same facts. One voice.
      </p>
    </div>
  )
}
