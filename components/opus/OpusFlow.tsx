"use client"

/* Movement 3 — the numbered mechanism, the right column of the "What it governs"
   style two-column layout. Three rows (Codify / Govern / Port) separated by
   hairline rules; the gold italic numeral takes the place the home-page audio
   player gives its play button, with the step name + one line as the body.

   Codify and Govern are type only. Port carries the single, simple visual: a
   gold "Spec" sits ABOVE and stays put while the engine beneath it swaps — the
   literal picture of "rides above any model and any engine" / "we are not one of
   them." It is deliberately minimal so it reads at a glance.

   IO-gated: the Port engine cycles only once in view. Reduced motion: a static
   end-state (spec above one engine), no animation. */

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

/* Three interchangeable engines, as simple distinct glyphs. The constant spec
   on top never changes; cross-fading these underneath says "any engine." */
function EngineGlyph({ shape }: { shape: "hex" | "disc" | "square" }) {
  if (shape === "disc") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
      </svg>
    )
  }
  if (shape === "square") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="5.5" y="5.5" width="13" height="13" rx="2.5" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 4.5 19 8.5v7L12 19.5 5 15.5v-7z" />
    </svg>
  )
}

const ENGINES = ["hex", "disc", "square"] as const

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

/* The one visual beat: a gold "Spec" pill sitting above an engine slot. The
   engine cross-fades between glyphs while the spec holds. Decorative. */
function PortMotif({ phase }: { phase: number }) {
  return (
    <div className="lv-opus-port" aria-hidden="true">
      <span className="lv-opus-port-spec">Spec</span>
      <span className="lv-opus-port-link" />
      <span className="lv-opus-port-engine">
        {ENGINES.map((shape, i) => (
          <span
            key={shape}
            className="lv-opus-port-glyph"
            style={{ opacity: i === phase ? 1 : 0 }}
          >
            <EngineGlyph shape={shape} />
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
    const id = window.setInterval(() => setPhase((p) => (p + 1) % ENGINES.length), 1700)
    return () => window.clearInterval(id)
  }, [reduced, entered])

  return (
    <div ref={ref} className="lv-opus-flow">
      {STEPS.map((s) => (
        <div className={`lv-opus-flow-row is-${s.key}`} key={s.key}>
          <span className="lv-opus-flow-num">{s.n}</span>
          <div className="lv-opus-flow-body">
            <h3 className="lv-opus-flow-title">{s.title}</h3>
            <p className="lv-opus-flow-line">{s.line}</p>
            {s.key === "port" && <PortMotif phase={reduced ? 0 : phase} />}
          </div>
        </div>
      ))}
    </div>
  )
}
