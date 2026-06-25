"use client"

/* Movement 3 — How it works. A confident TYPOGRAPHIC treatment: three steps,
   gold italic numerals, one line each, generous space. Codify and Govern carry
   NO glyph — the words do the work. Port (03) gets the single meaningful visual:
   the spec sits ABOVE while the engines beneath it swap, the literal picture of
   "the spec rides above any model and any engine" and of the punchline "we are
   not one of them." The asymmetry (only Port has a visual) is intentional — Port
   is the only step whose idea is inherently visual.

   IO-gated: the Port engines cycle only once the section scrolls into view.
   Reduced motion: a static end-state — the spec above three distinct engine
   slots, no animation. */

import { useEffect, useRef, useState } from "react"

const STEPS = [
  { key: "codify", n: "01", title: "Codify", line: "Your brand’s voice becomes a portable spec." },
  {
    key: "govern",
    n: "02",
    title: "Govern",
    line: "Every agent is held to it, before a word reaches the customer.",
  },
  { key: "port", n: "03", title: "Port", line: "The spec rides above any model and any engine." },
] as const

/* Three engine arrangements. Cycling between them shows the engines swapping
   beneath the fixed spec; each slot differs within a state, so even the static
   (reduced-motion) frame reads as three distinct engines. */
const ENGINE_STATES: number[][][] = [
  [
    [6, 13, 8],
    [12, 7, 11],
    [9, 14, 6],
  ],
  [
    [12, 7, 11],
    [8, 14, 6],
    [13, 6, 10],
  ],
  [
    [9, 14, 6],
    [13, 6, 12],
    [7, 11, 14],
  ],
]

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

/* The one visual beat: a wide gold spec layer on top, three muted engine slots
   beneath it that change while the spec holds. Decorative — aria-hidden. */
function PortMotif({ phase }: { phase: number }) {
  const slots = ENGINE_STATES[phase]
  return (
    <div className="lv-opus-port" aria-hidden="true">
      <span className="lv-opus-port-spec">
        <span className="lv-opus-port-spec-label">Spec</span>
      </span>
      <span className="lv-opus-port-engines">
        {slots.map((bars, i) => (
          <span className="lv-opus-port-engine" key={i}>
            {bars.map((h, j) => (
              <i key={j} style={{ height: `${h}px` }} />
            ))}
          </span>
        ))}
      </span>
    </div>
  )
}

export default function OpusFlow() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (entered) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [entered])

  // Gentle engine cycle, only while in view and motion is allowed.
  useEffect(() => {
    if (reduced || !entered) return
    const id = window.setInterval(
      () => setPhase((p) => (p + 1) % ENGINE_STATES.length),
      1600,
    )
    return () => window.clearInterval(id)
  }, [reduced, entered])

  return (
    <div ref={ref} className="lv-opus-flow">
      {STEPS.map((s) => (
        <div className={`lv-opus-flow-step is-${s.key}`} key={s.key}>
          <span className="lv-opus-flow-num">{s.n}</span>
          <h3 className="lv-opus-flow-title">{s.title}</h3>
          <p className="lv-opus-flow-line">{s.line}</p>
          {s.key === "port" && <PortMotif phase={reduced ? 0 : phase} />}
        </div>
      ))}
    </div>
  )
}
