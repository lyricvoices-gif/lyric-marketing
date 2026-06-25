"use client"

/* Movement 4 — Sonic, as an illustrative, AUTO-PLAYING preview.

   Deliberately abstract, not a literal product UI. It plays itself and loops,
   reading as a soft impression of the experience rather than a working intake:

     1) Starter state — a prompt and the four starter presets as soft tiles.
     2) Auto-selection — one tile warms as if chosen, then the grid recedes.
     3) Voice elicitation — Sonic asks "Here's how a greeting could sound. Which
        is you?", a few options appear as abstracted waveforms with a tone, one
        is chosen, and the choice settles into a small set of voice tokens. The
        point on screen: you codify the voice by PICKING, not describing.
     4) Loop back to the starter state.

   FRAMING (locked): Sonic codifies the BRAND VOICE. It never builds, deploys, or
   assembles the agent. No "Build it" affordance, no pathways/tools/persona
   wiring; the agent already exists, Sonic captures how it sounds.

   HARD GUARDRAILS: a preview that plays itself. Fully non-interactive
   (aria-hidden, no buttons, no inputs), captures nothing; the section funnels to
   /start for the real thing.
   // illustrative auto-play preview only — real intake is /start (not yet built)

   IO-gated, streamed text, staggered reveals. Reduced motion: a single static
   completed elicitation moment, no animation or looping. */

import { useEffect, useRef, useState } from "react"
import Isotype from "@/components/Isotype"

const CARDS: ReadonlyArray<{ label: string; tag: string }> = [
  { label: "Refi qualifier", tag: "Mortgage" },
  { label: "Patient intake", tag: "Healthcare" },
  { label: "Claims intake", tag: "Insurance" },
  { label: "Custom", tag: "Start blank" },
]
const PICKED_CARD = 0

const ASK = "Here’s how a greeting could sound. Which is you?"

/* Each option is an abstracted voice: a distinct waveform plus a tone. No
   literal script text — the shapes carry the "different voices" read. */
const TAKES: ReadonlyArray<{ tone: string; bars: number[] }> = [
  { tone: "Warm, measured", bars: [7, 15, 10, 19, 12, 17, 9, 14, 8] },
  { tone: "Brisk, upbeat", bars: [11, 7, 16, 9, 19, 12, 8, 15, 6] },
  { tone: "Plain, direct", bars: [9, 12, 7, 14, 8, 11, 15, 9, 13] },
]
const PICKED_TAKE = 0

/* The pick settles into a few soft voice tokens (not a data table). */
const TOKENS = ["warm", "measured", "reassuring"]

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

function Wave({ bars }: { bars: number[] }) {
  return (
    <span className="lv-opus-sp-wave" aria-hidden="true">
      {bars.map((h, i) => (
        <i key={i} style={{ height: `${h}px` }} />
      ))}
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
    <div ref={rootRef} className={`lv-opus-sp${resetting ? " is-resetting" : ""}`} aria-hidden="true">
      <span className="lv-opus-sp-kicker">
        <Isotype size={13} color="#5A5E43" />
        Sonic
      </span>

      <div className="lv-opus-sp-stage">
        {/* Starter layer */}
        <div className={`lv-opus-sp-starter${starterOut ? " is-out" : ""}`}>
          <p className="lv-opus-sp-prompt">Where should we start?</p>
          <div className="lv-opus-sp-cards">
            {CARDS.map((c, i) => (
              <span
                key={c.label}
                className={`lv-opus-sp-card${at("pickCard") && i === PICKED_CARD ? " is-picked" : ""}`}
              >
                <span className="lv-opus-sp-card-label">{c.label}</span>
                <span className="lv-opus-sp-card-tag">{c.tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Conversation layer */}
        <div className={`lv-opus-sp-convo${convoIn ? " is-in" : ""}`}>
          <p className="lv-opus-sp-ask">
            {askText}
            {askCaret && <span className="lv-opus-sp-caret" />}
          </p>

          <div className={`lv-opus-sp-takes${at("takesIn") ? " is-shown" : ""}`}>
            {TAKES.map((tk, j) => (
              <span
                key={tk.tone}
                className={`lv-opus-sp-take${at("pickTake") && j === PICKED_TAKE ? " is-picked" : ""}`}
                style={{ ["--d" as string]: `${j * 130}ms` }}
              >
                <Wave bars={tk.bars} />
                <span className="lv-opus-sp-take-tone">{tk.tone}</span>
              </span>
            ))}
          </div>

          <div className={`lv-opus-sp-spec${at("spec") ? " is-shown" : ""}`}>
            <span className="lv-opus-sp-spec-head">your voice, captured</span>
            <span className="lv-opus-sp-tokens">
              {TOKENS.map((tok) => (
                <span key={tok} className="lv-opus-sp-token">
                  {tok}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <p className="lv-opus-sp-note">Illustrative preview. Plays on its own. The real intake opens in Try Sonic free.</p>
    </div>
  )
}
