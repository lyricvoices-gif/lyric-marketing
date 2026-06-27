"use client"

/* Movement 4 — Sonic, as an illustrative, AUTO-PLAYING SKELETON preview.

   The intake is rendered as skeleton / placeholder UI: every piece of intake
   text is a tonal bar/shape, never real words. This reads as a REPRESENTATION of
   the experience — the silhouette of the real intake — not a working product.
   The real intake is /start (not yet built); when it ships we swap the real UI
   in here.

   The skeleton still tells the show-don't-ask story in four beats and loops:
     1) Starter — a prompt bar above four tile shapes.
     2) Auto-selection — one tile highlights (gold), the grid recedes.
     3) Voice elicitation — a prompt bar with option shapes; one is picked (gold).
     4) Spec forms — skeleton lines stack up, the spec assembling from the pick.

   FRAMING (locked): this illustrates VOICE elicitation — show options, pick what
   sounds like you, picks become the spec. Never agent-building/assembly, no
   "Build it" affordance. Fully non-interactive (aria-hidden, no buttons/inputs),
   captures nothing; the section funnels to /start.
   // illustrative skeleton preview only — real intake is /start (not yet built)

   Reduced motion: one static skeleton end-state (options shown, one highlighted,
   a partial spec), no animation or looping. The real, legible framing words
   (eyebrow, headline, body, preview label, CTA) live in page.tsx. */

import { useEffect, useRef, useState } from "react"
import Isotype from "@/components/Isotype"

const TILES = [0, 1, 2, 3]
const PICKED_TILE = 0

/* Varied widths so the skeleton reads like real text rag, not a uniform grid. */
const OPTIONS: string[] = ["64%", "82%", "56%"]
const PICKED_OPTION = 0
const SPEC_LINES = ["88%", "66%", "78%", "50%"]

const ORDER = [
  "cards",
  "pickCard",
  "recede",
  "ask",
  "optionsIn",
  "pickOption",
  "spec",
  "dwell",
  "reset",
] as const
type Phase = (typeof ORDER)[number]

const IDLE: Record<Phase, number> = {
  cards: 1600,
  pickCard: 760,
  recede: 520,
  ask: 900,
  optionsIn: 1300,
  pickOption: 900,
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

/* A single skeleton bar — a tonal block standing in for a line of text. */
function Bar({ w, className = "" }: { w: string; className?: string }) {
  return <span className={`lv-opus-sp-bar ${className}`} style={{ width: w }} aria-hidden="true" />
}

export default function SonicPreview() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [phase, setPhase] = useState<Phase>("cards")

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
      return
    }
    if (!entered) return
    const next: Partial<Record<Phase, Phase>> = {
      cards: "pickCard",
      pickCard: "recede",
      recede: "ask",
      ask: "optionsIn",
      optionsIn: "pickOption",
      pickOption: "spec",
      spec: "dwell",
      dwell: "reset",
      reset: "cards",
    }
    const t = window.setTimeout(() => setPhase(next[phase] ?? "cards"), IDLE[phase])
    return () => window.clearTimeout(t)
  }, [reduced, entered, phase])

  const starterOut = at("recede")
  const convoIn = at("recede")
  const resetting = phase === "reset"

  return (
    <div ref={rootRef} className={`lv-opus-sp${resetting ? " is-resetting" : ""}`} aria-hidden="true">
      {/* Panel header: brand mark + a title placeholder (no readable label). */}
      <span className="lv-opus-sp-head">
        <Isotype size={13} color="#5A5E43" />
        <Bar w="34px" />
      </span>

      <div className="lv-opus-sp-stage">
        {/* Starter layer — prompt bar over four tile shapes */}
        <div className={`lv-opus-sp-starter${starterOut ? " is-out" : ""}`}>
          <Bar w="46%" className="lv-opus-sp-promptbar" />
          <div className="lv-opus-sp-cards">
            {TILES.map((i) => (
              <span
                key={i}
                className={`lv-opus-sp-card${at("pickCard") && i === PICKED_TILE ? " is-picked" : ""}`}
              >
                <Bar w="70%" />
                <Bar w="44%" className="is-faint" />
              </span>
            ))}
          </div>
        </div>

        {/* Conversation layer — prompt bar, option shapes, assembling spec */}
        <div className={`lv-opus-sp-convo${convoIn ? " is-in" : ""}`}>
          <Bar w="58%" className="lv-opus-sp-promptbar" />

          <div className={`lv-opus-sp-options${at("optionsIn") ? " is-shown" : ""}`}>
            {OPTIONS.map((w, i) => (
              <span
                key={i}
                className={`lv-opus-sp-option${at("pickOption") && i === PICKED_OPTION ? " is-picked" : ""}`}
                style={{ ["--d" as string]: `${i * 130}ms` }}
              >
                <span className="lv-opus-sp-option-dot" aria-hidden="true" />
                <Bar w={w} />
              </span>
            ))}
          </div>

          <div className={`lv-opus-sp-spec${at("spec") ? " is-shown" : ""}`}>
            <Bar w="28%" className="is-faint lv-opus-sp-spec-head" />
            <div className="lv-opus-sp-spec-lines">
              {SPEC_LINES.map((w, i) => (
                <Bar key={i} w={w} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="lv-opus-sp-note">A preview of the experience. The real intake opens in Sonic.</p>
    </div>
  )
}
