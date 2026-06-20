/* Verticals carousel — a horizontal scroll-snap track of industry cards. No
   controls and no JavaScript: native scroll-snap handles touch, trackpad, and
   drag, and the peek of the next card is the affordance that there is more.

   Each card carries one accent color from the brand's per-voice palette
   (CLAUDE.md) via --card-accent, a pop that gives the card its identity while
   the format stays consistent. Content stays specific to each vertical. */

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
    label: "Cohesion in Every Account Moment",
    headline: "Financial Services",
    body: "Support, fraud and disputes, and account servicing are different jobs with different stakes. Lyric keeps one brand across all of them, stays firm and calm when a customer is under stress, says financial terms correctly, and holds compliance-sensitive disclosures to the spec every time.",
    accent: "#F3D171",
    contexts: ["Support", "Disputes", "Servicing"],
    term: "APR",
    disclosure: "recording disclosure",
    tone: "firm, calm",
  },
  {
    label: "Harmony in Every Guest Moment",
    headline: "Travel & Hospitality",
    body: "Reservations, concierge, and loyalty each carry a different promise. Lyric keeps one brand across them, stays warm and gracious, says property and loyalty terms correctly, and handles rate and policy disclosures the same way on every channel.",
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
  },
  {
    label: "Continuity in Every Claim Moment",
    headline: "Insurance",
    body: "Claims, policy service, and billing each carry different stakes. Lyric keeps one brand across them, stays calm and reassuring under pressure, says policy and coverage terms correctly, and holds required disclosures to the spec on every channel.",
    accent: "#B5634D",
    contexts: ["Claims", "Policy", "Billing"],
    term: "deductible",
    disclosure: "recording disclosure",
    tone: "calm, reassuring",
  },
]

export default function VerticalsCarousel() {
  return (
    <div className="lv-vert-track">
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
  )
}
