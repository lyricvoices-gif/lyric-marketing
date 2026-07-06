"use client"

/* Section 5 — Build the voice spec (Callio intake). A faithful preview of the
   real Callio v1 Voice Spec panel (github.com/lyricvoices-gif/callio), rebuilt
   in this site's design language: the same structure and the same content the
   shipped product produces, not invented fields.

   The panel is what Callio assembles as a brand answers the guided intake. The
   Foundation is pre-vetted, counsel-reviewed governance that arrives the moment
   an industry is chosen (locked, sage register); the picks below fill in as the
   brand chooses them (Industry, Use case, Company, Voice, and the delivery
   axes). Content mirrors the real Financial-Services / phone build: the
   pronunciation, disclosure, output-standard and pacing samples are the actual
   Foundation examples; the delivery values are the product's real defaults;
   Sam is a real brand voice. Caldera Bank stays the fictional company stand-in.

   The section headline is about the doing ("It does the rest"), so on
   scroll-into-view a scripted loop assembles the panel — the Foundation lands
   with the industry, then each pick settles in sequence — then rests on the
   finished spec, holds, and loops. Only the SAME content's reveal is scripted;
   every row is laid out from the start so nothing reflows. The "Sample" tag
   stays so this never reads as a live customer spec. Progressive enhancement:
   without JS, or under prefers-reduced-motion, the finished spec renders static. */

import { useEffect, useRef, useState } from "react"

/* The Foundation — real categories, counts, and verbatim examples from the v1
   Financial-Services knowledge base (lib/foundation.ts). */
const FOUNDATION = [
  {
    label: "Pronunciation guidance",
    count: "5 entries",
    example: "APR → A P R, distinct from A P Y",
  },
  {
    label: "Required disclosures",
    count: "1 disclosure",
    example: "For quality and training purposes, calls may be recorded.",
  },
  {
    label: "Voice Output Standards",
    count: "12 rules",
    example: "2026 → twenty twenty six",
  },
  {
    label: "Pacing rules",
    count: "6 rules",
    example: "Measured calls hold 140 to 260 words per minute",
  },
] as const

/* The picks — the product's real fields and default delivery values; Caldera
   Bank is the fictional company stand-in used across the page. */
const PICKS = [
  { label: "Industry", value: "Financial Services" },
  { label: "Use case", value: "Phone" },
  { label: "Company", value: "Caldera Bank" },
  { label: "Voice", value: "Sam" },
  { label: "Warmth", value: "Warm" },
  { label: "Pacing", value: "Measured" },
  { label: "Energy", value: "Steady" },
] as const

/* Reveal stages: the Foundation arrives with the Industry pick, then each
   remaining pick settles in order. */
const IND = 1
const FINAL = IND + (PICKS.length - 1) // one stage per pick after Industry

/* Pause held at each stage before advancing; the finished spec dwells for HOLD
   before the loop resets. */
const DELAYS = [720, 700, 650, 700, 650, 650, 650]
const HOLD = 3000

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

export default function SonicPreview() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => setMounted(true), [])

  // Only animate once mounted on the client and motion is allowed; otherwise
  // render the finished spec (matching SSR — no hydration flip).
  const anim = mounted && !reduced

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.3,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!anim || !visible) return
    const t =
      stage < FINAL
        ? window.setTimeout(() => setStage((s) => s + 1), DELAYS[Math.min(stage, DELAYS.length - 1)])
        : window.setTimeout(() => setStage(0), HOLD)
    return () => window.clearTimeout(t)
  }, [anim, visible, stage])

  const shown = (threshold: number) => !anim || stage >= threshold
  // Picks reveal one per stage from IND: Industry at IND, then the rest.
  const pickShown = (i: number) => shown(IND + Math.max(0, i))

  return (
    <div ref={rootRef} className={`lv-spec${anim ? " is-anim" : ""}`}>
      <div className="lv-spec-bar">
        <span className="lv-spec-bar-name">Voice spec</span>
        <span className="lv-spec-bar-tag">Sample</span>
      </div>

      <div className="lv-spec-body">
        {/* Foundation — pre-vetted governance, established with the industry. */}
        <div className={`lv-spec-fnd lv-anim-fade${shown(IND) ? " is-in" : ""}`}>
          <div className="lv-spec-fnd-head">
            <span className="lv-spec-fnd-lock" aria-hidden="true" />
            Foundation
          </div>
          <div className="lv-spec-fnd-list">
            {FOUNDATION.map((f, i) => (
              <div
                key={f.label}
                className={`lv-spec-fnd-cat lv-anim-fade${shown(IND) ? " is-in" : ""}`}
                style={{ transitionDelay: anim ? `${120 + i * 90}ms` : undefined }}
              >
                <div className="lv-spec-fnd-cat-head">
                  <span className="lv-spec-fnd-cat-label">{f.label}</span>
                  <span className="lv-spec-fnd-cat-count">{f.count}</span>
                </div>
                <p className="lv-spec-fnd-cat-ex">{f.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Picks — the brand's decisions, settling in one at a time. */}
        <dl className="lv-spec-rows">
          {PICKS.map((p, i) => (
            <div className="lv-spec-row" key={p.label}>
              <dt className="lv-spec-row-label">{p.label}</dt>
              <dd className={`lv-spec-row-value lv-anim-fade${pickShown(i) ? " is-in" : ""}`}>
                {p.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
