"use client"

/* Dimensions visual — section 4's artifact. One agent output evaluated on the
   two dimensions Lyric governs, side by side: how it SOUNDS and how it
   COMMUNICATES. A vertical divider makes the split literal.

   Only items that actually appear in the sample line are listed (no invented
   terms). Representative, labeled "EXAMPLE," in the same family as the eval
   and verticals artifacts but on the section's dark ground, so it pairs with
   section 3's app/voice illustration. Built so a real product visual can drop
   into .lv-gov-card later without changing the layout.

   CSS and inline SVG only. Subtle one-time reveal on scroll; reduced motion
   renders the static end-state. */

import { useEffect, useRef, useState } from "react"

function Check() {
  return (
    <svg
      className="lv-gov-check"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

type Item = { label: string; status: string; check?: boolean }

const SOUNDS: Item[] = [
  { label: "“Caldera”", status: "on brand", check: true },
  { label: "register", status: "calm, in band" },
]

const COMMUNICATES: Item[] = [
  { label: "word choice", status: "within lexicon", check: true },
  { label: "disclosure", status: "recording present", check: true },
  { label: "tone", status: "firm, calm" },
]

function Rows({ items }: { items: Item[] }) {
  return (
    <ul className="lv-gov-rows">
      {items.map((r) => (
        <li key={r.label} className="lv-gov-row">
          <span className="lv-gov-row-label">{r.label}</span>
          <span className="lv-gov-row-status">
            {r.check && <Check />}
            {r.status}
          </span>
        </li>
      ))}
    </ul>
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
    <div ref={ref} className={`lv-gov-art${active ? " is-revealed" : ""}`} aria-hidden="true">
      <div className="lv-gov-card">
        <div className="lv-gov-head">
          <span className="lv-gov-tag">Example</span>
          <span className="lv-gov-sub">one output, two dimensions</span>
        </div>

        <p className="lv-gov-line">
          Thanks for calling <span className="lv-gov-term">Caldera Bank</span>.
          This call is recorded for quality and security.
        </p>

        <div className="lv-gov-rule" />

        <div className="lv-gov-split">
          <div className="lv-gov-dim">
            <p className="lv-gov-dim-label">How it sounds</p>
            <Rows items={SOUNDS} />
          </div>
          <div className="lv-gov-dim">
            <p className="lv-gov-dim-label">How it communicates</p>
            <Rows items={COMMUNICATES} />
          </div>
        </div>
      </div>
    </div>
  )
}
