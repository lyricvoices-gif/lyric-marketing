"use client"

/* Dimensions visual — section 4's artifact. One spoken line shown two ways:
   as audio being governed (acoustic) and as language being governed (text).
   The contrast between the two representations is the point.

   ACOUSTIC: a register line moving through time inside a shaded tolerance band
   (the legible governance cue), a waveform whose per-bar heights come from a
   fixed per-word emphasis map of the sample sentence ("Caldera" is the tallest
   cluster), word markers on the timeline, and a playhead that sweeps once when
   the card enters view, lighting the register and bars as it passes, then
   rests at the end. It replays if the card re-enters; it does not loop while
   at rest.

   TEXTUAL: the same sentence as marked-up language: the brand term and the
   disclosure clause underlined, with a word-choice note. No green-tick
   checklist (the eval section owns that); this reads as annotated text.

   Representative, labeled "EXAMPLE." SVG + CSS only, no deps. Reduced motion
   renders the static fully-revealed end-state with no playhead. */

import { useEffect, useRef, useState } from "react"

const VB_W = 600
const VB_H = 150
const PAD = 14
const BASELINE = 122
const BAR_MAX = 30
const BAR_W = 2.4
const BAND_TOP = 28
const BAND_H = 50
const BAND_MID = BAND_TOP + BAND_H / 2

/* Per-word emphasis map for the sample line. Heights and the register contour
   are derived from this, so the acoustic maps to the actual words. */
const SENTENCE = [
  { w: "Thanks", e: 0.55 },
  { w: "for", e: 0.2 },
  { w: "calling", e: 0.4 },
  { w: "Caldera", e: 1.0 },
  { w: "Bank", e: 0.7 },
  { w: "This", e: 0.32 },
  { w: "call", e: 0.45 },
  { w: "is", e: 0.2 },
  { w: "recorded", e: 0.72 },
  { w: "for", e: 0.2 },
  { w: "quality", e: 0.5 },
  { w: "and", e: 0.2 },
  { w: "security", e: 0.68 },
]

const LENS = SENTENCE.map((s) => s.w.length + 1)
const TOTAL = LENS.reduce((a, b) => a + b, 0)
const PLACED = (() => {
  let acc = 0
  return SENTENCE.map((s, i) => {
    const x0 = PAD + (acc / TOTAL) * (VB_W - 2 * PAD)
    acc += LENS[i]
    const x1 = PAD + (acc / TOTAL) * (VB_W - 2 * PAD)
    return { ...s, x: (x0 + x1) / 2 }
  })
})()

function regY(e: number) {
  const y = BAND_MID - (e - 0.45) * 42
  return Math.max(BAND_TOP + 3, Math.min(BAND_TOP + BAND_H - 3, y))
}

const REG_POINTS = [
  `${PAD},${regY(PLACED[0].e).toFixed(1)}`,
  ...PLACED.map((p) => `${p.x.toFixed(1)},${regY(p.e).toFixed(1)}`),
  `${VB_W - PAD},${regY(PLACED[PLACED.length - 1].e).toFixed(1)}`,
].join(" ")

const BARS: { x: number; h: number }[] = []
for (const p of PLACED) {
  const h = p.e * BAR_MAX + 2
  for (const [k, dx] of [-3.6, 0, 3.6].entries()) {
    const m = k === 1 ? 1 : 0.66
    BARS.push({ x: p.x + dx, h: Math.max(2.5, h * m) })
  }
}

const LABELS = [0, 3, 8, 12].map((i) => ({ x: PLACED[i].x, w: PLACED[i].w, hot: i === 3 }))

function WaveContent({ bright }: { bright?: boolean }) {
  return (
    <>
      {!bright && (
        <rect className="lv-gov-band" x="0" y={BAND_TOP} width={VB_W} height={BAND_H} />
      )}
      {BARS.map((b, i) => (
        <rect
          key={i}
          className={bright ? "lv-gov-bar-on" : "lv-gov-bar"}
          x={b.x - BAR_W / 2}
          y={BASELINE - b.h}
          width={BAR_W}
          height={b.h}
          rx="1"
        />
      ))}
      <polyline className={bright ? "lv-gov-reg-on" : "lv-gov-reg"} points={REG_POINTS} />
      {!bright &&
        LABELS.map((l, i) => (
          <text
            key={i}
            className={`lv-gov-wlabel${l.hot ? " is-hot" : ""}`}
            x={l.x}
            y="142"
            textAnchor="middle"
          >
            {l.w}
          </text>
        ))}
    </>
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

export default function DimensionsVisual() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [playKey, setPlayKey] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          // Restart the sweep each time the card re-enters view.
          setPlayKey((k) => k + 1)
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="lv-gov-art" aria-hidden="true">
      <div className="lv-gov-card">
        <div className="lv-gov-head">
          <span className="lv-gov-tag">Example</span>
          <span className="lv-gov-sub">one line, two modes</span>
        </div>

        <div className="lv-gov-mode">
          <div className="lv-gov-mode-head">
            <span className="lv-gov-mode-label">How it sounds</span>
            <span className="lv-gov-mode-note">register · in band</span>
          </div>
          <div className="lv-gov-wave">
            <svg
              className="lv-gov-wave-svg"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              role="presentation"
            >
              <WaveContent />
            </svg>
            {reduced ? (
              <div className="lv-gov-wave-active-wrap">
                <svg
                  className="lv-gov-wave-svg lv-gov-wave-active is-static"
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  role="presentation"
                >
                  <WaveContent bright />
                </svg>
              </div>
            ) : entered ? (
              <div className="lv-gov-wave-anim" key={playKey}>
                <div className="lv-gov-wave-active-wrap">
                  <svg
                    className="lv-gov-wave-svg lv-gov-wave-active"
                    viewBox={`0 0 ${VB_W} ${VB_H}`}
                    role="presentation"
                  >
                    <WaveContent bright />
                  </svg>
                </div>
                <span className="lv-gov-playhead" />
              </div>
            ) : null}
          </div>
        </div>

        <div className="lv-gov-rule" />

        <div className="lv-gov-mode">
          <div className="lv-gov-mode-head">
            <span className="lv-gov-mode-label">How it communicates</span>
          </div>
          <p className="lv-gov-text">
            Thanks for calling{" "}
            <span className="lv-gov-mark lv-gov-mark-brand">Caldera Bank</span>.{" "}
            <span className="lv-gov-mark lv-gov-mark-disc">
              This call is recorded for quality and security.
            </span>
          </p>
          <div className="lv-gov-legend">
            <span className="lv-gov-leg">
              <span className="lv-gov-leg-sw lv-gov-leg-brand" />
              brand term
            </span>
            <span className="lv-gov-leg">
              <span className="lv-gov-leg-sw lv-gov-leg-disc" />
              disclosure
            </span>
            <span className="lv-gov-leg lv-gov-leg-note">word choice · within lexicon</span>
          </div>
        </div>
      </div>
    </div>
  )
}
