"use client"

/* Verticals carousel — a horizontal, scroll-snap track of industry cards with
   prev/next controls. No carousel dependency: native scroll-snap handles
   touch and trackpad, the buttons scroll by one card, and the controls
   disable at each end. prefers-reduced-motion makes the button scroll jump
   instead of animate.

   Each card carries one accent color drawn from the brand's per-voice palette
   (CLAUDE.md): a pop that gives the card its identity while the format stays
   consistent across the set. Content stays specific to each vertical. */

import { useCallback, useEffect, useRef, useState } from "react"
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
}

const VERTICALS: Vertical[] = [
  {
    label: "Consistency at Every Touchpoint",
    headline: "Property Management",
    body: "A property manager runs agents for leasing, maintenance, and collections, across phone, portal, SMS, and email. Each needs its own register while sounding like one brand. Lease and property terms are said correctly, and required disclosures are handled the same way on every channel.",
    accent: "#7A9B82",
    contexts: ["Leasing", "Maintenance", "Collections"],
    term: "CAM charges",
    disclosure: "collection disclosure",
    tone: "warm to firm",
  },
  {
    label: "Consistency in Every Account Moment",
    headline: "Financial Services",
    body: "Support, fraud and disputes, and account servicing are different jobs with different stakes. Lyric keeps one brand across all of them, stays firm and calm when a customer is under stress, says financial terms correctly, and holds compliance-sensitive disclosures to the spec every time.",
    accent: "#F3D171",
    contexts: ["Support", "Disputes", "Servicing"],
    term: "APR",
    disclosure: "recording disclosure",
    tone: "firm, calm",
  },
  {
    label: "Consistency in Every Guest Moment",
    headline: "Travel & Hospitality",
    body: "Reservations, concierge, and loyalty each carry a different promise. Lyric keeps one brand across them, stays warm and gracious, says property and loyalty terms correctly, and handles rate and policy disclosures the same way on every channel.",
    accent: "#E0834A",
    contexts: ["Reservations", "Concierge", "Loyalty"],
    term: "folio",
    disclosure: "rate disclosure",
    tone: "warm, gracious",
  },
  {
    label: "Consistency in Every Patient Moment",
    headline: "Healthcare",
    body: "Scheduling, billing, and nurse lines are different jobs with different stakes. Lyric keeps one brand across them, stays warm and clear, says clinical and benefits terms correctly, and holds privacy disclosures to the spec on every channel.",
    accent: "#B5C19E",
    contexts: ["Scheduling", "Billing", "Nurse line"],
    term: "formulary",
    disclosure: "privacy disclosure",
    tone: "warm, clear",
  },
  {
    label: "Consistency in Every Claim Moment",
    headline: "Insurance",
    body: "Claims, policy service, and billing each carry different stakes. Lyric keeps one brand across them, stays calm and reassuring under pressure, says policy and coverage terms correctly, and holds required disclosures to the spec on every channel.",
    accent: "#B5634D",
    contexts: ["Claims", "Policy", "Billing"],
    term: "deductible",
    disclosure: "recording disclosure",
    tone: "calm, reassuring",
  },
]

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      {dir === "prev" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  )
}

export default function VerticalsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update])

  const scrollByCards = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector(".lv-vert-card") as HTMLElement | null
    const amount = (card?.offsetWidth ?? 340) + 24
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <div className="lv-vert-carousel">
      <div className="lv-vert-controls">
        <button
          type="button"
          className="lv-vert-arrow"
          onClick={() => scrollByCards(-1)}
          disabled={!canPrev}
          aria-label="Previous industries"
        >
          <Arrow dir="prev" />
        </button>
        <button
          type="button"
          className="lv-vert-arrow"
          onClick={() => scrollByCards(1)}
          disabled={!canNext}
          aria-label="Next industries"
        >
          <Arrow dir="next" />
        </button>
      </div>

      <div className="lv-vert-track" ref={trackRef}>
        {VERTICALS.map((v) => (
          <VerticalCard
            key={v.headline}
            label={v.label}
            headline={v.headline}
            body={v.body}
            accent={v.accent}
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
    </div>
  )
}
