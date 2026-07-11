"use client"

/* Brand Governance Layer carousel — the four control-plane moves (Codify /
   Govern / Port / Monitor), one at a time under the centered section header
   instead of the old 2x2 grid.

   Each slide keeps the audience-block type treatment (gold italic number,
   small label, display headline, body). Slides are stacked in one grid cell
   so the stage holds the tallest slide's height and nothing below reflows;
   the active slide cross-fades in with the site's small rise.

   Pagination is story-style: each step is a dot; the active step stretches
   into a short track and a gold fill sweeps across it for the slide's
   duration. The fill IS the timer — the slide advances on the fill's
   animationend — so the bar and the rotation cannot drift apart. Hovering
   the carousel (or scrolling it out of view) pauses the fill, which pauses
   the rotation with it. Clicking a dot jumps to that step and restarts the
   sweep.

   Reduced-motion users get no autoplay and no sweep: the active dot is a
   solid gold pill and the dots are plain manual pagination. SSR renders
   slide 01 settled. */

import { useEffect, useRef, useState, type ReactNode } from "react"

type Step = { num: string; label: string; head: ReactNode; body: string }

const STEPS: readonly Step[] = [
  {
    num: "01",
    label: "Codify",
    head: (
      <>
        Capture the <em>persona</em>.
      </>
    ),
    body:
      "Your brand becomes a portable specification. One versioned source of truth for how every agent should sound and speak.",
  },
  {
    num: "02",
    label: "Govern",
    head: (
      <>
        Hold every agent in <em>tolerance</em>.
      </>
    ),
    body:
      "Every agent is conditioned against the spec at the point of generation, so it stays on brand before a word reaches the customer. The same standard, applied everywhere.",
  },
  {
    num: "03",
    label: "Port",
    head: (
      <>
        Stay <em>vendor agnostic</em>.
      </>
    ),
    body:
      "The spec is portable. Move from one speech provider to another and the brand voice holds. ElevenLabs, Hume, Microsoft, and whatever comes next.",
  },
  {
    num: "04",
    label: "Monitor",
    head: (
      <>
        Catch <em>drift</em> over time.
      </>
    ),
    body:
      "Every governed agent is monitored over time. Drift against the spec is caught, consistency and disclosure adherence are checked, and when something sounds off-brand, the cause is diagnosed.",
  },
] as const

/* Dwell per step — the fill animation's duration; animationend advances the
   carousel, so this single value times both. */
const STEP_MS = 6000

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

export default function GovernanceCarousel() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [inView, setInView] = useState(false)
  const [active, setActive] = useState(0)
  /* Bumped on manual jumps so the fill restarts even when the same step is
     re-selected. */
  const [run, setRun] = useState(0)

  useEffect(() => setMounted(true), [])
  const autoplay = mounted && !reduced

  // The sweep (and with it the rotation) only runs while the carousel is on
  // screen; scrolled away it pauses in place.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const go = (i: number) => {
    setActive(i)
    setRun((r) => r + 1)
  }

  const advance = () => {
    setActive((a) => (a + 1) % STEPS.length)
  }

  return (
    <div
      ref={rootRef}
      className={`lv-govcar${autoplay ? " is-anim" : ""}${inView ? " is-inview" : ""}`}
    >
      <div className="lv-govcar-stage">
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            className={`lv-audience-block lv-govcar-slide${i === active ? " is-active" : ""}`}
            aria-hidden={i !== active}
          >
            <span className="lv-audience-number">{s.num}</span>
            <p className="lv-audience-label lv-govcar-label">{s.label}</p>
            <h2>{s.head}</h2>
            <p className="lv-audience-body">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="lv-govcar-dots" role="tablist" aria-label="Governance layer steps">
        {STEPS.map((s, i) => (
          <button
            key={s.num}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`${s.num} ${s.label}`}
            className={`lv-govcar-dot${i === active ? " is-active" : ""}`}
            onClick={() => go(i)}
          >
            {autoplay && i === active && (
              <span
                key={`${active}-${run}`}
                className="lv-govcar-dot-fill"
                style={{ animationDuration: `${STEP_MS}ms` }}
                onAnimationEnd={advance}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
