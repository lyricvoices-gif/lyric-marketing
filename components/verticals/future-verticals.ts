/* Holding file for verticals not currently shown on the homepage carousel.
   These entries were removed from the live carousel during a copy
   deduplication pass to keep the homepage to three industries. They are kept
   here verbatim so a future dedicated industries page can reuse them without
   reconstructing the data. Not imported anywhere yet. */

export type Vertical = {
  label: string
  headline: string
  body: string
  accent: string
  contexts: string[]
  term: string
  disclosure: string
  tone: string
}

export const FUTURE_VERTICALS: Vertical[] = [
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
