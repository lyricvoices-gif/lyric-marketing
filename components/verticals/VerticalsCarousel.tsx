"use client"

/* Verticals carousel — a horizontal scroll-snap track of industry cards.
   Native scroll-snap handles touch, trackpad, and drag; pagination dots below
   the track give the scroll affordance (the scrollbar is hidden) and let a
   click jump.

   Dots are one per DISTINCT scroll position, not one per card: each card's
   left-edge target is clamped to the track's max scroll, and targets that
   collapse onto (or nearly onto) the same position share one dot. On a wide
   viewport the last two cards fit together, so the track has three real
   positions and three dots; on mobile every card is its own position and
   every card gets a dot. Positions recompute on resize. The active dot is
   the position nearest the current scroll.

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

/* Two clamped card targets within this range scroll to what reads as the
   same page — they share one dot. */
const SAME_POS = 40

type Position = { left: number; cardIndex: number }

/* `exclude` drops named verticals (by headline) — the agents page reuses this
   section minus Financial Services, which that page already covers.
   `allComingSoon` marks every card's status badge (the agents page framing:
   prebuilt agents for these verticals are coming). `showDots` off suppresses
   pagination when the visible cards fit one view. */
export default function VerticalsCarousel({
  exclude = [],
  allComingSoon = false,
  showDots = true,
  fit = false,
}: {
  exclude?: string[]
  allComingSoon?: boolean
  showDots?: boolean
  /* Desktop: shrink the visible cards to share one row (no overflow). */
  fit?: boolean
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [positions, setPositions] = useState<Position[]>([])
  const verticals = VERTICALS.filter((v) => !exclude.includes(v.headline))

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    // The distinct scroll positions the dots paginate: each card's left-edge
    // target, clamped to the track max; near-identical targets collapse into
    // one position (keeping the further-right target so the final position
    // is the true end of the track).
    const measure = () => {
      const max = el.scrollWidth - el.clientWidth
      if (max <= 4) {
        setPositions([])
        setActive(0)
        return
      }
      const trackLeft = el.getBoundingClientRect().left - el.scrollLeft
      const next: Position[] = []
      Array.from(el.children).forEach((c, i) => {
        const left = Math.min((c as HTMLElement).getBoundingClientRect().left - trackLeft, max)
        const prev = next[next.length - 1]
        if (prev && left - prev.left < SAME_POS) {
          prev.left = left
        } else {
          next.push({ left, cardIndex: i })
        }
      })
      setPositions(next)
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // The active dot is the position nearest the current scroll.
  useEffect(() => {
    const el = trackRef.current
    if (!el || positions.length === 0) return
    const pick = () => {
      let best = 0
      let bestDist = Infinity
      positions.forEach((p, i) => {
        const dist = Math.abs(p.left - el.scrollLeft)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }
    pick()
    el.addEventListener("scroll", pick, { passive: true })
    return () => el.removeEventListener("scroll", pick)
  }, [positions])

  const goTo = (p: Position) => {
    trackRef.current?.scrollTo({ left: p.left, behavior: "smooth" })
  }

  return (
    <div className="lv-vert-carousel" data-fit={fit ? "" : undefined}>
      <div className="lv-vert-track" ref={trackRef}>
        {verticals.map((v) => (
          <VerticalCard
            key={v.headline}
            label={v.label}
            headline={v.headline}
            body={v.body}
            accent={v.accent}
            comingSoon={allComingSoon || v.comingSoon}
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

      {showDots && positions.length > 1 && (
        <div className="lv-vert-dots" role="tablist" aria-label="Industries">
          {positions.map((p, i) => (
            <button
              key={p.cardIndex}
              type="button"
              role="tab"
              className={`lv-vert-dot${i === active ? " is-active" : ""}`}
              aria-selected={i === active}
              aria-label={`Show ${verticals[p.cardIndex].headline}`}
              onClick={() => goTo(p)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
