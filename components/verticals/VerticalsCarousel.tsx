"use client"

/* Verticals carousel — a horizontal scroll-snap track of industry cards.
   Native scroll-snap handles touch, trackpad, and drag; pagination dots below
   the track give the scroll affordance (the scrollbar is hidden) and let a
   click jump to any card. The active dot tracks the card nearest the left
   edge as the track scrolls.

   Each card carries one accent color from the brand's per-voice palette
   (CLAUDE.md) via --card-accent, a pop that gives the card its identity while
   the format stays consistent. Content stays specific to each vertical. */

import { useEffect, useRef, useState } from "react"
import VerticalCard from "@/components/verticals/VerticalCard"
import VerticalMockup from "@/components/verticals/mockups"

type Vertical = {
  label: string
  headline: string
  body: string
  accent: string
  contexts: string[]
  term: string
  disclosure: string
  tone: string
  comingSoon?: boolean
}

/* Three live industries plus Healthcare as a coming-soon fourth (its content
   comes from future-verticals.ts). Insurance stays in future-verticals.ts for
   a later industries page. */
const VERTICALS: Vertical[] = [
  {
    label: "Consistency at Every Touchpoint",
    headline: "Property Management",
    body: "Residents hear from you across leasing, maintenance, and collections, and those are three different emotional jobs. The leasing voice that wins a lease sounds wrong chasing late rent. Lyric lets each context have its own register while a resident still recognizes one company, and keeps lease and fee terminology right on every channel.",
    accent: "#7A9B82",
    contexts: ["Leasing", "Maintenance", "Collections"],
    term: "CAM charges",
    disclosure: "collection disclosure",
    tone: "warm to firm",
  },
  {
    label: "Cohesion in Every Account Moment",
    headline: "Financial Services",
    body: "In a dispute or a fraud call, the customer is already stressed, and the wrong tone makes it worse. The voice has to stay firm and calm under pressure, get financial terms exactly right, and deliver compliance disclosures the same way every time. There is little room for an agent that drifts.",
    accent: "#F3D171",
    contexts: ["Support", "Disputes", "Servicing"],
    term: "APR",
    disclosure: "recording disclosure",
    tone: "firm, calm",
  },
  {
    label: "Harmony in Every Guest Moment",
    headline: "Travel & Hospitality",
    body: "A guest's first impression and their loyalty both run through the same voice. Reservations, concierge, and loyalty each carry a different promise, and a clipped or off-brand moment undercuts the experience you sell. Lyric keeps the voice warm and gracious across all of them, and handles rate and policy disclosures consistently.",
    accent: "#E0834A",
    contexts: ["Reservations", "Concierge", "Loyalty"],
    term: "folio",
    disclosure: "rate disclosure",
    tone: "warm, gracious",
  },
  {
    label: "Alignment in Every Patient Moment",
    headline: "Healthcare",
    body: "Scheduling, billing, and nurse lines are different jobs with different stakes. Lyric keeps one brand across them, stays warm and clear, says clinical and benefits terms correctly, and holds privacy disclosures to the spec on every channel.",
    accent: "#B5C19E",
    contexts: ["Scheduling", "Billing", "Nurse line"],
    term: "formulary",
    disclosure: "privacy disclosure",
    tone: "warm, clear",
    comingSoon: true,
  },
]

export default function VerticalsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [scrollable, setScrollable] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      setScrollable(max > 4)
      if (max <= 4) {
        setActive(0)
        return
      }
      // At the end of the track, the last card owns the active dot even if it
      // can't reach the left edge; otherwise the card nearest the left wins.
      if (el.scrollLeft >= max - 2) {
        setActive(el.children.length - 1)
        return
      }
      const trackLeft = el.getBoundingClientRect().left
      let best = 0
      let bestDist = Infinity
      Array.from(el.children).forEach((c, i) => {
        const dist = Math.abs((c as HTMLElement).getBoundingClientRect().left - trackLeft)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }

    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.children[i] as HTMLElement | undefined
    if (!card) return
    const delta = card.getBoundingClientRect().left - el.getBoundingClientRect().left
    el.scrollTo({ left: el.scrollLeft + delta, behavior: "smooth" })
  }

  return (
    <div className="lv-vert-carousel">
      <div className="lv-vert-track" ref={trackRef}>
        {VERTICALS.map((v) => (
          <VerticalCard
            key={v.headline}
            label={v.label}
            headline={v.headline}
            body={v.body}
            accent={v.accent}
            comingSoon={v.comingSoon}
          >
            <VerticalMockup
              contexts={v.contexts}
              term={v.term}
              disclosure={v.disclosure}
              tone={v.tone}
            />
          </VerticalCard>
        ))}
      </div>

      {scrollable && (
        <div className="lv-vert-dots" role="tablist" aria-label="Industries">
          {VERTICALS.map((v, i) => (
            <button
              key={v.headline}
              type="button"
              role="tab"
              className={`lv-vert-dot${i === active ? " is-active" : ""}`}
              aria-selected={i === active}
              aria-label={`Show ${v.headline}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
