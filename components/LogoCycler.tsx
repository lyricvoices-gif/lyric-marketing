"use client"

import React from "react"

/* Founder credit line + cycling brand slots. Same section shell as
   LogoMarquee (credit anchored left, logos filling the width to its
   right at desktop, stacked at mobile) but the strip itself is a row
   of fixed slots instead of a continuous scroll.

   Each slot swaps its logo with a masked vertical pass: the current
   mark slides straight up out of the slot's overflow clip, the slot
   sits empty for a beat, then the next mark rises into place from
   below. Swaps fire round-robin left to right, so a slow wave of
   change moves across the row while the other slots hold still —
   the strip always reads as a settled credit line with exactly one
   brand in motion.

   Brand order and per-logo optical scales match LogoMarquee. Each
   incoming mark is drawn at random from the off-stage pool and the
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
   per slot, ≈4.4s). */
const STAGGER_MS = 1100
/* Exit + empty-slot beat before the next mark enters. The enter
   duration itself lives in CSS (.lv-cycler-mark transitions). */
const EXIT_MS = 350
const EMPTY_MS = 420

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

    const interval = window.setInterval(() => {
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
    }, STAGGER_MS)

    return () => {
      cancelled = true
      window.clearInterval(interval)
      timeouts.forEach((id) => window.clearTimeout(id))
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
