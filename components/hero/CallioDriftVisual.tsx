"use client"

/* Home hero visual — one brand voice across channels, animated.

   Three agent instances answer the same customer question, one per channel,
   and each one sounds like the same company: the same governed voice, lightly
   adapted to the channel's norms. They reveal in sequence — call first, then
   chat, then SMS — so the viewer watches one brand hold across three
   surfaces. The breadth proof beside the home hero's breadth claim (one
   brand voice across every agent).

   Built on the same machinery as GovernedCallVisual (the Callio product
   hero's transcript): a useReducedMotion hook, a one-shot
   IntersectionObserver, and a small setTimeout step machine. Every card is
   rendered from the start so its space is reserved and nothing reflows as
   the sequence plays. Reduced-motion users get all three answers at once,
   static. */

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

/* Reveal cadence — one card at a time, call → chat → sms. `delay` is the pause
   before each card lands, measured from the previous one. */
const STEPS: readonly number[] = [350, 1150, 1150]

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

export default function CallioDriftVisual() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [stepIdx, setStepIdx] = useState(0)

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
      { threshold: 0.25 },
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
    const t = window.setTimeout(() => setStepIdx((s) => s + 1), STEPS[stepIdx])
    return () => window.clearTimeout(t)
  }, [reduced, hasEntered, stepIdx])

  const done = stepIdx >= STEPS.length
  const cardShown = (i: number) => stepIdx > i

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
        <p className="lv-opus-drift-q-text">{QUESTION}</p>
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
            <p className="lv-opus-drift-reply">{c.reply}</p>
          </div>
        ))}
      </div>

      <p className={`lv-opus-drift-foot${done ? " is-shown" : ""}`}>
        Same facts. One voice.
      </p>
    </div>
  )
}
