"use client"

/* Movement 4 — Sonic, as an illustrative, AUTO-PLAYING preview.

   This plays itself and loops; the visitor does not drive it. It demonstrates
   show-don't-ask VOICE elicitation, not agent assembly:

     1) Starter state — a prompt and the four starter cards.
     2) Auto-selection — one card highlights as if chosen, then the grid recedes.
     3) Voice elicitation — Sonic asks "Here's how a greeting could sound. Which
        is you?", a few example takes animate in, one is picked, and a small
        brand-voice spec takes shape FROM that pick. The point on screen: you
        codify the voice by PICKING, not describing.
     4) Loop back to the starter state.

   FRAMING (locked): Sonic codifies the BRAND VOICE. It never builds, deploys, or
   assembles the agent — the agent already exists. No "Build it" affordance, no
   pathways/tools/persona wiring; cards use the voice-first "See it" verb.

   HARD GUARDRAILS: this is a preview that plays itself. It is fully
   non-interactive (aria-hidden, no buttons, no inputs), captures nothing, and
   the section funnels to /start for the real thing.
   // illustrative auto-play preview only — real intake is /start (not yet built)

   Re-skins the old Direction-canvas motion (IO-gated, streamed text, staggered
   reveals). Reduced motion: a single static completed elicitation moment, no
   animation or looping. */

import { useEffect, useRef, useState } from "react"
import Isotype from "@/components/Isotype"

const CARDS: ReadonlyArray<{ label: string; tag: string }> = [
  { label: "Refi qualifier", tag: "Mortgage" },
  { label: "Patient intake", tag: "Healthcare" },
  { label: "Claims intake", tag: "Insurance" },
  { label: "Custom", tag: "Start blank" },
]

/* The loop always demonstrates the first card's path — deterministic and calm. */
const PICKED_CARD = 0

const ASK = "Here’s how a greeting could sound. Which is you?"

const TAKES: ReadonlyArray<{ text: string }> = [
  { text: "Thanks for calling. Let’s see what we can save you." },
  { text: "Hi there. Ready to talk through your refinance?" },
  { text: "Good to have you. Let’s get your numbers sorted." },
]
const PICKED_TAKE = 0

const SPEC_ROWS: ReadonlyArray<[string, string]> = [
  ["Register", "Warm, plain-spoken"],
  ["Pace", "Measured"],
  ["Under pressure", "Reassuring"],
]

const ORDER = [
  "cards",
  "pickCard",
  "recede",
  "ask",
  "takesIn",
  "pickTake",
  "spec",
  "dwell",
  "reset",
] as const
type Phase = (typeof ORDER)[number]

const ASK_CHAR_MS = 28
const IDLE = {
  cards: 1700,
  pickCard: 720,
  recede: 520,
  afterAsk: 700,
  takesIn: 1300,
  pickTake: 850,
  spec: 2400,
  dwell: 500,
  reset: 1100,
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

function Wave() {
  return (
    <span className="lv-opus-sp-wave" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

export default function SonicPreview() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [phase, setPhase] = useState<Phase>("cards")
  const [askTyped, setAskTyped] = useState(0)

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

  const idx = ORDER.indexOf(phase)
  const at = (p: Phase) => idx >= ORDER.indexOf(p)

  useEffect(() => {
    if (reduced) {
      // Static completed elicitation moment: conversation shown, take picked,
      // spec settled. No machine, no loop.
      setPhase("spec")
      setAskTyped(ASK.length)
      return
    }
    if (!entered) return

    let t: number
    switch (phase) {
      case "cards":
        t = window.setTimeout(() => setPhase("pickCard"), IDLE.cards)
        break
      case "pickCard":
        t = window.setTimeout(() => setPhase("recede"), IDLE.pickCard)
        break
      case "recede":
        t = window.setTimeout(() => {
          setPhase("ask")
          setAskTyped(0)
        }, IDLE.recede)
        break
      case "ask":
        if (askTyped < ASK.length)
          t = window.setTimeout(() => setAskTyped((c) => c + 1), ASK_CHAR_MS)
        else t = window.setTimeout(() => setPhase("takesIn"), IDLE.afterAsk)
        break
      case "takesIn":
        t = window.setTimeout(() => setPhase("pickTake"), IDLE.takesIn)
        break
      case "pickTake":
        t = window.setTimeout(() => setPhase("spec"), IDLE.pickTake)
        break
      case "spec":
        t = window.setTimeout(() => setPhase("dwell"), IDLE.spec)
        break
      case "dwell":
        t = window.setTimeout(() => setPhase("reset"), IDLE.dwell)
        break
      case "reset":
        t = window.setTimeout(() => {
          setPhase("cards")
          setAskTyped(0)
        }, IDLE.reset)
        break
    }
    return () => window.clearTimeout(t)
  }, [reduced, entered, phase, askTyped])

  const starterOut = at("recede")
  const convoIn = at("recede")
  const askText = at("takesIn") ? ASK : ASK.slice(0, askTyped)
  const askCaret = phase === "ask" && askTyped < ASK.length
  const resetting = phase === "reset"

  return (
    <div
      ref={rootRef}
      className={`lv-opus-sp${resetting ? " is-resetting" : ""}`}
      aria-hidden="true"
    >
      <div className="lv-opus-sp-bar">
        <span className="lv-opus-sp-brand">
          <Isotype size={15} color="#5A5E43" />
          <span className="lv-opus-sp-brand-name">Sonic</span>
        </span>
        <span className="lv-opus-sp-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="lv-opus-sp-stage">
        {/* Starter layer */}
        <div className={`lv-opus-sp-starter${starterOut ? " is-out" : ""}`}>
          <p className="lv-opus-sp-prompt">Where should we start?</p>
          <p className="lv-opus-sp-sub">Pick a starting point. Sonic listens for your voice.</p>
          <div className="lv-opus-sp-cards">
            {CARDS.map((c, i) => (
              <div
                key={c.label}
                className={`lv-opus-sp-card${at("pickCard") && i === PICKED_CARD ? " is-picked" : ""}`}
              >
                <span className="lv-opus-sp-card-label">{c.label}</span>
                <span className="lv-opus-sp-card-tag">{c.tag}</span>
                <span className="lv-opus-sp-card-see">
                  See it <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation layer */}
        <div className={`lv-opus-sp-convo${convoIn ? " is-in" : ""}`}>
          <span className="lv-opus-sp-crumb">
            {CARDS[PICKED_CARD].label} <span>{CARDS[PICKED_CARD].tag}</span>
          </span>

          <div className="lv-opus-sp-ask">
            <Isotype size={13} color="#5A5E43" style={{ marginTop: 3 }} />
            <p>
              {askText}
              {askCaret && <span className="lv-opus-sp-caret" />}
            </p>
          </div>

          <div className={`lv-opus-sp-takes${at("takesIn") ? " is-shown" : ""}`}>
            {TAKES.map((tk, j) => (
              <span
                key={tk.text}
                className={`lv-opus-sp-take${at("pickTake") && j === PICKED_TAKE ? " is-picked" : ""}`}
                style={{ ["--d" as string]: `${j * 130}ms` }}
              >
                <Wave />
                <span className="lv-opus-sp-take-text">{tk.text}</span>
                <span className="lv-opus-sp-take-mark" aria-hidden="true" />
              </span>
            ))}
          </div>

          <div className={`lv-opus-sp-spec${at("spec") ? " is-shown" : ""}`}>
            <span className="lv-opus-sp-spec-head">Brand voice spec · from your pick</span>
            <dl className="lv-opus-sp-spec-rows">
              {SPEC_ROWS.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <p className="lv-opus-sp-note">Illustrative preview. Plays on its own. The real intake opens in Try Sonic free.</p>
    </div>
  )
}
