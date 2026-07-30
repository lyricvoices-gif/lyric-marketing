/* Shared data for the roster layout explorations. Copy fields beyond the
   gallery's (register, locale, pace, bestFor) are PROPOSED values from the
   design exploration — Lyric finalizes wording before any variant ships. */

import { VOICE_COLORS } from "@/components/listen/data"

const AUDIO_BASE = "https://pub-9142daf6eac140228b494c56e7b13b22.r2.dev/phone"

export type RosterVoice = {
  id: string
  name: string
  credit: string
  character: string
  desc: string
  register: string
  registerSub: string
  locale: string
  pace: string
  pacePos: number // 0..1 along deliberate -> brisk
  bestFor: string
  sampleCaption: string
  sample: string
  color: string
  isDefault?: boolean
}

export const ROSTER_VOICES: RosterVoice[] = [
  {
    id: "sol",
    name: "Sol",
    credit: "The senior professional",
    character: "Senior. Warm. Unhurried.",
    desc:
      "The voice of a senior client services professional at a financial institution. Someone who has been doing this for fifteen years and has time for you.",
    register: "Reassuring",
    registerSub: "senior client services",
    locale: "English — US",
    pace: "Unhurried",
    pacePos: 0.22,
    bestFor: "Disputes, holds, and the calls that need patience. First deployments.",
    sampleCaption: "Sample · the demo call",
    sample: "/GovernedSample.mp3",
    color: VOICE_COLORS.morgan,
    isDefault: true,
  },
  {
    id: "sam",
    name: "Sam",
    credit: "The efficient one",
    character: "Crisp. Conversational. Direct.",
    desc:
      "A voice that respects the caller's time. Gets to the point without ever feeling rushed, and handles the routine so smoothly you barely notice the work.",
    register: "Efficient",
    registerSub: "everyday service",
    locale: "English — US",
    pace: "Brisk",
    pacePos: 0.78,
    bestFor: "High-volume routine — balances, cards, status checks.",
    sampleCaption: "Sample · produced call opening",
    sample: `${AUDIO_BASE}/sam_default.mp3`,
    color: VOICE_COLORS.atlas,
  },
  {
    id: "james",
    name: "James",
    credit: "The refined one",
    character: "British. Refined. Polished.",
    desc:
      "A composed British voice with an unhurried polish. Measured, precise, and quietly reassuring on the calls that need a steady hand.",
    register: "Formal",
    registerSub: "premier client",
    locale: "English — UK",
    pace: "Measured",
    pacePos: 0.45,
    bestFor: "Private-client and premier lines.",
    sampleCaption: "Sample · produced call opening",
    sample: `${AUDIO_BASE}/james_default.mp3`,
    color: VOICE_COLORS.riven,
  },
]

export const STANDFIRST =
  "Three produced voices, held to the same governed register. The behavior is identical; the choice is presentation."

export const SHARED_SPEC_LEAD = "Same governed spec. Same call flow. Only the delivery changes."

export const SHARED_SPEC_BODY =
  "Whichever voice you choose, the governed spec is identical — same verification gate, same disclosures, same record of every call."
