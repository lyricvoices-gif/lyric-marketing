"use client"

import React from "react"

/* Founder credit line + cycling brand slots, used below the manifesto
   on the home page and under the narrative on /about. The credit
   anchors left with the strip filling the width to its right at
   desktop, stacked at mobile; the strip is a row of fixed slots
   rather than a continuous scroll.

   Each slot swaps its logo with a masked vertical pass: the current
   mark slides straight up out of the slot's overflow clip, the slot
   sits empty for a beat, then the next mark rises into place from
   below. Swaps fire round-robin left to right, so a slow wave of
   change moves across the row while the other slots hold still —
   the strip always reads as a settled credit line with exactly one
   brand in motion.

   Brand order and per-logo optical scales carry over from the
   retired marquee version of this strip. Each incoming mark is
   drawn at random from the off-stage pool and the
   outgoing mark returns to it, so no brand ever appears in two slots
   at once — and slots don't ping-pong between a fixed pair (which is
   what any uniform rotation would do with 8 brands over 4 slots). */

type Brand = {
  name: string
  src: string
  /* Per-logo optical scale, applied as a multiplier of the base row
     height (set in CSS as --logo-h). Wide wordmarks scale down; square
     icon-style marks scale up; medium wordmarks stay near 1. */
  scale: number
}

const BRANDS: Brand[] = [
  { name: "Google",          src: "/images/logos/google.svg",         scale: 0.95 },
  { name: "JBL",             src: "/images/logos/jbl.svg",            scale: 1.15 },
  { name: "United Airlines", src: "/images/logos/unitedairlines.svg", scale: 0.78 },
  { name: "Virgin Atlantic", src: "/images/logos/virginatlantic.svg", scale: 1.2  },
  { name: "Verizon",         src: "/images/logos/verizon.svg",        scale: 0.78 },
  { name: "BMW Group",       src: "/images/logos/bmw.svg",            scale: 1.2  },
  { name: "Appfolio",        src: "/images/logos/appfolio.svg",       scale: 0.78 },
  { name: "Meta",            src: "/images/logos/meta.svg",           scale: 1.3  },
]

const SLOT_COUNT = 4
/* Gap between consecutive slot swaps — sets the speed of the wave and,
   with SLOT_COUNT, how long each mark holds (SLOT_COUNT × STAGGER_MS
   per slot, ≈4.8s). The full swap (exit + empty beat + enter, ≈2.1s
   with the CSS durations) deliberately outlasts this gap, so the next
   slot lifts off while the previous mark is still settling — the
   motion hands off slot to slot and reads as one wave traveling
   left to right, never as isolated pops. */
const STAGGER_MS = 1200
/* Exit + empty-slot beat before the next mark enters. The exit and
   enter durations themselves live in CSS (.lv-cycler-mark
   transitions) and must stay in step with these. */
const EXIT_MS = 550
const EMPTY_MS = 550

type Phase = "shown" | "out" | "below"
type Slot = { brand: number; phase: Phase }

export default function LogoCycler() {
  const [slots, setSlots] = React.useState<Slot[]>(() =>
    Array.from({ length: SLOT_COUNT }, (_, i) => ({ brand: i, phase: "shown" }))
  )

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let cancelled = false
    let swap = 0
    const visible = BRANDS.map((_, i) => i).slice(0, SLOT_COUNT)
    const hidden = BRANDS.map((_, i) => i).slice(SLOT_COUNT)
    const timeouts = new Set<number>()
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id)
        fn()
      }, ms)
      timeouts.add(id)
    }

    const setSlot = (i: number, patch: Partial<Slot>) =>
      setSlots((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)))

    const fire = () => {
      const slot = swap % SLOT_COUNT
      swap += 1
      const pick = Math.floor(Math.random() * hidden.length)
      const next = hidden[pick]
      hidden[pick] = visible[slot]
      visible[slot] = next

      setSlot(slot, { phase: "out" })
      later(() => {
        /* Park the incoming mark below the clip without a transition,
           let that position paint, then release it into view. */
        setSlot(slot, { brand: next, phase: "below" })
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (!cancelled) setSlot(slot, { phase: "shown" })
          })
        )
      }, EXIT_MS + EMPTY_MS)
    }

    let interval: number | undefined
    const start = () => {
      if (interval === undefined) interval = window.setInterval(fire, STAGGER_MS)
    }
    const stop = () => {
      if (interval !== undefined) {
        window.clearInterval(interval)
        interval = undefined
      }
      timeouts.forEach((id) => window.clearTimeout(id))
      timeouts.clear()
    }

    /* Background tabs suspend requestAnimationFrame and throttle timers,
       which can strand a slot mid-swap and then replay the backlog in a
       burst on return — scrambling the left-to-right order. Instead,
       halt the loop on hide, settle every slot on its assigned brand
       while nothing is being painted, and resume cleanly on return. */
    const onVisibility = () => {
      if (document.hidden) {
        stop()
        setSlots(visible.map((brand) => ({ brand, phase: "shown" })))
      } else {
        start()
      }
    }
    document.addEventListener("visibilitychange", onVisibility)
    start()

    return () => {
      cancelled = true
      document.removeEventListener("visibilitychange", onVisibility)
      stop()
    }
  }, [])

  return (
    <section className="lv-logos">
      <div className="lv-logos-row">
        <p className="lv-logos-credit">Our founders shaped voice AI at</p>

        <div className="lv-cycler" aria-hidden="true">
          {slots.map((slot, i) => {
            const brand = BRANDS[slot.brand]
            return (
              <div key={i} className="lv-cycler-slot">
                <img
                  className={`lv-logos-mark lv-cycler-mark is-${slot.phase}`}
                  src={brand.src}
                  alt={brand.name}
                  style={{ height: `calc(var(--logo-h) * ${brand.scale})` }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
