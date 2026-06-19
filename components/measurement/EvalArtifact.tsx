"use client"

/* Eval artifact — the visual proof behind the governance claim.

   A representative Lyric eval: the brand spec run against an agent's outputs
   OUT OF BAND (CI and monitoring), not in the live call path. The honesty of
   the breakdown is the credibility, so the visual grammar separates two
   kinds of measure:

     - Exact (hard): terminology and pronunciation, lexicon, disclosures show
       as pass with a precise count; pacing shows as a value inside a target
       band.
     - Approximate (soft): voice consistency shows as deviation from the spec
       target across the output's duration, inside a tolerance band, with any
       outlier flagged. It is never a single composite score.

   Everything is measured against the brand spec the customer configured, not
   a reference recording. Sample data, clearly labeled as an example.

   CSS and inline SVG only (no chart library). Subtle reveal once on scroll
   into view, then static. Reduced motion renders the final state. */

import { useEffect, useRef, useState } from "react"

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

const EXACT = [
  { dim: "Terminology & pronunciation", count: "14 / 14 terms" },
  { dim: "Lexicon & word choice", count: "0 violations" },
  { dim: "Required disclosures", count: "3 / 3 openings" },
]

const CHANNELS = [
  { name: "Web", flagged: false, status: "in band" },
  { name: "Phone", flagged: true, status: "flagged · 1 outlier" },
  { name: "Mobile", flagged: false, status: "in band" },
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

export default function EvalArtifact() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (revealed) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [revealed])

  const active = revealed || reduced

  return (
    <div ref={ref} className={`lv-eval${active ? " is-revealed" : ""}`} aria-hidden="true">
      <div className="lv-eval-card">
        <div className="lv-eval-card-head">
          <span className="lv-eval-kicker">Brand spec eval</span>
          <span className="lv-eval-tag">Example</span>
        </div>
        <p className="lv-eval-meta">
          out of band · runs in CI and monitoring, not in the call path
        </p>

        <p className="lv-eval-group-label">Exact</p>
        <ul className="lv-eval-rows">
          {EXACT.map((r) => (
            <li key={r.dim} className="lv-eval-row">
              <span className="lv-eval-dim">{r.dim}</span>
              <span className="lv-eval-result">
                <span className="lv-eval-count">{r.count}</span>
                <span className="lv-eval-pass">
                  <Check />
                  Pass
                </span>
              </span>
            </li>
          ))}
          <li className="lv-eval-row">
            <span className="lv-eval-dim">Pacing</span>
            <span className="lv-eval-result">
              <span className="lv-eval-range" aria-hidden="true">
                <span className="lv-eval-range-band" />
                <span className="lv-eval-range-marker" />
              </span>
              <span className="lv-eval-count">146 wpm</span>
              <span className="lv-eval-pass">In range</span>
            </span>
          </li>
        </ul>

        <p className="lv-eval-group-label">
          Approximate
          <span className="lv-eval-group-note">ranges and flags, never a single score</span>
        </p>
        <div className="lv-eval-consistency">
          <div className="lv-eval-consistency-head">
            <span className="lv-eval-dim">Voice consistency</span>
            <span className="lv-eval-flag">
              <span className="lv-eval-flag-dot" />
              within band · 1 outlier flagged
            </span>
          </div>
          <p className="lv-eval-consistency-sub">
            deviation from spec target over the output, start to end
          </p>
          <div className="lv-eval-spark">
            <svg viewBox="0 0 600 70" aria-hidden="true">
              <rect x="0" y="18" width="600" height="34" className="lv-eval-spark-band" />
              <line x1="0" y1="35" x2="600" y2="35" className="lv-eval-spark-target" />
              <polyline
                className="lv-eval-spark-line"
                points="12,38 60,33 108,40 156,30 204,37 252,28 300,36 348,42 396,26 420,11 444,33 504,38 552,32 588,36"
              />
              <circle cx="420" cy="11" r="6" className="lv-eval-spark-outlier-ring" />
              <circle cx="420" cy="11" r="3.5" className="lv-eval-spark-outlier" />
            </svg>
            <span className="lv-eval-spark-cover" />
          </div>
          <div className="lv-eval-spark-axis">
            <span>0:00</span>
            <span>0:48</span>
          </div>
        </div>
      </div>

      <div className="lv-eval-channels">
        <div className="lv-eval-channels-head">
          <span className="lv-eval-channels-label">Same spec, every channel</span>
          <span className="lv-eval-channels-legend">
            terminology · lexicon · disclosure · pacing
          </span>
        </div>
        <ul className="lv-eval-channel-list">
          {CHANNELS.map((c) => (
            <li key={c.name} className="lv-eval-channel">
              <span className="lv-eval-channel-name">{c.name}</span>
              <span className="lv-eval-channel-checks" aria-hidden="true">
                <span className="lv-eval-check"><Check /></span>
                <span className="lv-eval-check"><Check /></span>
                <span className="lv-eval-check"><Check /></span>
                <span className="lv-eval-check"><Check /></span>
              </span>
              <span className={`lv-eval-channel-status${c.flagged ? " is-flagged" : ""}`}>
                <span className="lv-eval-channel-dot" />
                {c.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
