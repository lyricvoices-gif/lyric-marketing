/* ─────────────────────────────────────────────────────────────────────────
   INTAKE FACTS — the single source of truth for every measured figure on
   the /callio intake explainer. Each value was derived from the callio
   repository (lyricvoices-gif/callio) on 2026-08-11; nothing here is
   estimated. When the intake changes (exemplar and example selection are
   still to be added), update THIS file and the page follows.

   Derivations (Phase 1 report, approved 2026-08-11):
   - stages/decision points/clicks: components/sonic/SonicChat.tsx phase
     machine, driven end to end in a live session.
   - foundation counts: lib/foundation.ts (pacing count computed from the
     enforced CONFIRM_PIPELINE bands).
   - governance block counts: docs/callio-fs-text-governance.md Part 1
     (FS-P-01..20) and Part 1b (6 fs.* blocks).
   - channel slots: docs/callio-fs-text-governance.md §6.7 + Part 1 slots.
   - obligations: 19 named {{SLOT | owner}} slots across the governance
     doc, all emit-empty with provenance.
   - spec fields: lib/spec.ts SonicSpec.
   - scripted floor: a Playwright-driven complete run, page load to
     composed confirmation, measured 2026-08-11.
   ───────────────────────────────────────────────────────────────────────── */

export const INTAKE_FACTS = {
  /* Flow shape */
  stages: 6, // industry -> company & channels -> tone -> voice -> delivery (derived) -> confirmation
  decisionPoints: 6,
  approxClicks: 10,
  typedFields: 1, // company name
  /* Duration: a shape claim, not a minute count. No human-session evidence
     exists yet; a scripted complete run measured 26s wall-clock (the
     mechanical floor, not a human figure). Exemplar selection will extend
     this; the shape claim is written to survive that. */
  durationShape: "a single sitting",
  scriptedFloorSeconds: 26,

  /* Question groups the institution answers today. The exemplar and
     example-selection group is NOT counted yet; see the marked slot in the
     What-we-ask section. */
  questionGroups: 4, // institution identity / channels / persona / voice casting
  deliveryAxes: 3, // warmth, pacing, energy — derived from answers, overridable

  /* The pre-authored foundation, established on the industry pick. */
  foundation: {
    categories: 4,
    items: 24,
    pronunciationEntries: 5,
    disclosures: 1,
    voiceOutputRules: 12,
    pacingRules: 6,
  },

  /* The authored governance corpus the spec keys into. */
  governance: {
    promptBlocks: 20, // FS-P-01..20
    mannerBlocks: 6, // fs.* character and delivery-manner blocks
    totalBlocks: 26,
    voiceOnlyBlocks: 4, // FS-P-19, FS-P-20 + 2 voice-only manner blocks
    textOnlyBlocks: 1, // no template-stamped writing
    counselGatedBlocks: 10,
  },

  /* Channel-native guidance (text channels authored separately). */
  channels: {
    textChannels: 3, // SMS, Email, Chat
    smsSlots: 3,
    emailSlots: 3,
    chatSlots: 1,
  },

  /* Adapters that render the spec into use. */
  adapters: 4, // voice prompt, per-channel text prompt, checkable text checks, voice realization profiles

  /* Unfilled obligations: named slots, every one emitted empty with its
     owner recorded. Honest by design. */
  obligations: {
    total: 19,
    counsel: 8,
    institution: 4,
    intake: 5, // declared intake-owned, not yet collected by the flow
    sharedCounselInstitution: 2,
  },

  /* The downloadable spec object. */
  spec: {
    fields: 8, // preset, useCase, voipUsage, voice, voiceOverrides?, warmth, pacing, energy
  },

  voices: 6,
} as const

export type IntakeFacts = typeof INTAKE_FACTS
