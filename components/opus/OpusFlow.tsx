"use client"

/* Movement 3 — How it works, as a visual flow rather than prose columns.

   The spec moves left to right through Codify → Govern → Port. On scroll-in each
   stage lights in sequence and the connectors fill, so the mechanism reads at a
   glance. Port carries the platform-independence point: the spec stays pinned
   ABOVE two engine slots that keep swapping underneath. The framing is
   independence, not compatibility — we do not integrate, we govern from above,
   which is the visual twin of the "We are not one of them" punchline. No engine
   brands are named; the swappable slots are deliberately abstract.

   Same machinery as the hero/home visuals: useReducedMotion, a one-shot
   IntersectionObserver, a small setTimeout step machine. Reduced motion: the
   completed flow is shown statically (all stages active, engines at rest). */

import { Fragment, useEffect, useRef, useState } from "react"

const STAGES = [
  { key: "codify", n: "01", title: "Codify", line: "Your brand’s voice becomes a portable spec." },
  {
    key: "govern",
    n: "02",
    title: "Govern",
    line: "Every agent is held to it, before a word reaches the customer.",
  },
  { key: "port", n: "03", title: "Port", line: "The spec rides above any model and any engine." },
] as const

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

/* The spec object — the same chip in every stage (persona / lexicon /
   pronunciation as three bars). In Port it is pinned, with a gold anchor. */
function SpecChip({ pinned = false }: { pinned?: boolean }) {
  return (
    <span className={`lv-opus-spec${pinned ? " is-pinned" : ""}`}>
      <span className="lv-opus-spec-tag">Spec</span>
      <span className="lv-opus-spec-bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {pinned && <span className="lv-opus-spec-anchor" aria-hidden="true" />}
    </span>
  )
}

function CodifyArt() {
  return (
    <div className="lv-opus-flow-art-inner">
      <SpecChip />
    </div>
  )
}

function GovernArt() {
  return (
    <div className="lv-opus-flow-art-inner lv-opus-govern">
      <SpecChip />
      <span className="lv-opus-govern-rule" aria-hidden="true" />
      <span className="lv-opus-govern-agents" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </div>
  )
}

function PortArt({ swapped }: { swapped: boolean }) {
  return (
    <div className="lv-opus-flow-art-inner lv-opus-port">
      <SpecChip pinned />
      <span className="lv-opus-port-divider" aria-hidden="true" />
      {/* Two abstract engine slots that swap underneath while the spec holds. */}
      <span className={`lv-opus-port-engines${swapped ? " is-swapped" : ""}`} aria-hidden="true">
        <span className="lv-opus-port-engine">
          <i />
          <i />
          <i />
        </span>
        <span className="lv-opus-port-engine">
          <i />
          <i />
          <i />
        </span>
      </span>
      <span className="lv-opus-port-swaplabel">engines swap · voice holds</span>
    </div>
  )
}

export default function OpusFlow() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [active, setActive] = useState(0)
  const [swap, setSwap] = useState(false)

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

  // Light the stages in sequence.
  useEffect(() => {
    if (reduced) {
      setActive(STAGES.length)
      return
    }
    if (!entered || active >= STAGES.length) return
    const t = window.setTimeout(() => setActive((a) => a + 1), active === 0 ? 350 : 820)
    return () => window.clearTimeout(t)
  }, [reduced, entered, active])

  // Once Port is live, swap the engines a few times, then rest.
  useEffect(() => {
    if (reduced || active < STAGES.length) return
    let n = 0
    const id = window.setInterval(() => {
      setSwap((s) => !s)
      n += 1
      if (n >= 4) window.clearInterval(id)
    }, 1150)
    return () => window.clearInterval(id)
  }, [reduced, active])

  return (
    <div ref={ref} className="lv-opus-flow" aria-hidden="true">
      {STAGES.map((s, i) => (
        <Fragment key={s.key}>
          {i > 0 && (
            <span className={`lv-opus-flow-link${active > i ? " is-on" : ""}`}>
              <span className="lv-opus-flow-link-line" />
              <span className="lv-opus-flow-link-head" />
            </span>
          )}
          <div className={`lv-opus-flow-stage is-${s.key}${active > i ? " is-active" : ""}`}>
            <span className="lv-opus-flow-num">{s.n}</span>
            <div className="lv-opus-flow-art">
              {s.key === "codify" && <CodifyArt />}
              {s.key === "govern" && <GovernArt />}
              {s.key === "port" && <PortArt swapped={swap} />}
            </div>
            <h3 className="lv-opus-flow-title">{s.title}</h3>
            <p className="lv-opus-flow-line">{s.line}</p>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
