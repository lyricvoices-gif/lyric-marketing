type TranscriptRole = "Agent" | "Customer"

type GovernanceAnnotation = {
  label: string
  delay: number
}

export type DemoTranscriptTurn = {
  id: string
  start: number
  role: TranscriptRole
  text: string
  annotations?: readonly GovernanceAnnotation[]
}

export type GovernedExperienceDemo = {
  id: string
  channel: "voice" | "text"
  audio?: {
    src: string
    fallbackDuration: number
    firstTurnAt: number
  }
  transcript: readonly DemoTranscriptTurn[]
}

/* This is the exact script currently paired with the /agents hero audio.
   Starts are calculated from the checked-in line durations and stitch gaps in
   scripts/generate-fs-demo-call.mjs, so the transcript follows the real
   recording rather than a generic caption track. The current agent take uses
   Jessica Anne Bogart (ElevenLabs voice g6xIsTj2HwM6VR4iXFCw); annotations
   appear only where the spoken turn directly demonstrates the named behavior. */
const FS_HERO_TRANSCRIPT: readonly DemoTranscriptTurn[] = [
  {
    id: "opening",
    start: 2.9,
    role: "Agent",
    text: "For quality and training purposes, calls may be recorded. Thank you for calling Oakhaven Capital. I'm your banking concierge. How can I help?",
    annotations: [{ label: "Disclosure present", delay: 3.1 }],
  },
  {
    id: "charge",
    start: 11.676984,
    role: "Customer",
    text: "Hi, um, I'm looking at my account and there's a charge for three hundred and twelve dollars that I definitely didn't make.",
  },
  {
    id: "verify-request",
    start: 18.131973,
    role: "Agent",
    text: "I'm sorry to hear that. I'll do my best to help. Before I can access your account, I'll need to verify your identity. Can you confirm the last four digits of the account number you're calling about?",
    annotations: [{ label: "Verify before access", delay: 6.4 }],
  },
  {
    id: "account-digits",
    start: 29.370272,
    role: "Customer",
    text: "It's the account ending in two, two, four, five.",
  },
  {
    id: "two-factor-request",
    start: 33.271066,
    role: "Agent",
    text: "Thank you. For added security, I've just sent a one-time verification code to the mobile number ending in four two. Could you read that code back to me?",
    annotations: [{ label: "Two-factor verification", delay: 2.8 }],
  },
  {
    id: "verification-code",
    start: 43.64449,
    role: "Customer",
    text: "Sure, one sec... okay, got it. It's four seven one two... nine five.",
  },
  {
    id: "verify-code",
    start: 48.427642,
    role: "Agent",
    text: "Thank you. One moment while I verify that.",
  },
  {
    id: "lookup",
    start: 53.992676,
    role: "Agent",
    text: "Thanks for verifying your identity. One moment while I look into that charge.",
  },
  {
    id: "merchant",
    start: 63.368866,
    role: "Agent",
    text: "Thank you for holding. I can see the three hundred twelve dollar charge you mentioned. Do you recognize the merchant listed on the transaction?",
  },
  {
    id: "unfamiliar",
    start: 72.05297,
    role: "Customer",
    text: "No, I've never heard of them.",
  },
  {
    id: "outcome",
    start: 73.910408,
    role: "Agent",
    text: "Understood. I've opened a dispute for the three hundred twelve dollar charge and applied a temporary credit to your account while we investigate. If we determine the charge was unauthorized, you won't be responsible for it. I'll walk you through what happens next.",
    annotations: [
      { label: "Required behavior met", delay: 6.2 },
      { label: "Resolution path explained", delay: 11.2 },
    ],
  },
] as const

export const FS_HERO_DEMO: GovernedExperienceDemo = {
  id: "financial-services-hero-call",
  channel: "voice",
  audio: {
    src: "/audio/fs-demo-call.mp3",
    fallbackDuration: 87.981701,
    firstTurnAt: 2.9,
  },
  transcript: FS_HERO_TRANSCRIPT,
}
