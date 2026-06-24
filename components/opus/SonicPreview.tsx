"use client"

/* Movement 4 — Sonic, as an illustrative, interactive preview.

   Picking a starter reveals a small glimpse of that path's intake: a
   "pick the voice that sounds like you" moment with example voice options
   animating in. This DEMONSTRATES the show-don't-ask idea (recognition over
   recall); it is not the real intake.

   HARD GUARDRAILS: this preview collects no input and submits nothing. The
   starter tiles only switch which illustration is shown; the voice options are
   display-only (not form fields), with one shown pre-picked as an example. The
   real intake lives at /start, which the section's CTA funnels to.
   // illustrative preview only — real intake is /start (not yet built)

   Framing discipline: Sonic codifies the BRAND VOICE; it never "builds an
   agent." Reduced motion: the illustration is shown with no animation. */

import { useState } from "react"

type Voice = { name: string; pick?: boolean }
type Starter = { key: string; label: string; hint: string; prompt: string; voices: Voice[] }

const STARTERS: readonly Starter[] = [
  {
    key: "refi",
    label: "Refi qualifier",
    hint: "Mortgage",
    prompt: "Pick the voice that sounds like you",
    voices: [
      { name: "Reassuring and clear", pick: true },
      { name: "Warm and efficient" },
      { name: "Steady and precise" },
    ],
  },
  {
    key: "patient",
    label: "Patient intake",
    hint: "Healthcare",
    prompt: "Pick the voice that sounds like you",
    voices: [
      { name: "Calm and gentle", pick: true },
      { name: "Warm and unhurried" },
      { name: "Soft and exact" },
    ],
  },
  {
    key: "claims",
    label: "Claims intake",
    hint: "Insurance",
    prompt: "Pick the voice that sounds like you",
    voices: [
      { name: "Direct and steady", pick: true },
      { name: "Calm and plain" },
      { name: "Brisk and clear" },
    ],
  },
  {
    key: "custom",
    label: "Custom",
    hint: "Start blank",
    prompt: "Pick a starting point, then make it yours",
    voices: [
      { name: "Bold and distinct", pick: true },
      { name: "Quiet and precise" },
      { name: "Bring your own" },
    ],
  },
]

function Wave() {
  return (
    <span className="lv-opus-sp-wave" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

export default function SonicPreview() {
  const [selected, setSelected] = useState(0)
  const cur = STARTERS[selected]

  return (
    <div className="lv-opus-sp">
      <span className="lv-opus-sp-eyebrow">Start from</span>
      <div className="lv-opus-sp-tiles" role="group" aria-label="Sonic starter previews">
        {STARTERS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className={`lv-opus-sp-tile${i === selected ? " is-selected" : ""}`}
            onClick={() => setSelected(i)}
            aria-pressed={i === selected}
          >
            <span className="lv-opus-sp-tile-label">{s.label}</span>
            <span className="lv-opus-sp-tile-hint">{s.hint}</span>
          </button>
        ))}
      </div>

      {/* Re-keyed on selection so the illustration re-animates each pick.
          Display-only: no inputs, nothing is captured here. */}
      <div className="lv-opus-sp-reveal" key={selected}>
        <p className="lv-opus-sp-prompt">{cur.prompt}</p>
        <div className="lv-opus-sp-voices">
          {cur.voices.map((v, j) => (
            <span
              key={v.name}
              className={`lv-opus-sp-voice${v.pick ? " is-pick" : ""}`}
              style={{ ["--d" as string]: `${j * 110}ms` }}
            >
              <Wave />
              <span className="lv-opus-sp-voice-name">{v.name}</span>
              {v.pick && <span className="lv-opus-sp-voice-mark" aria-hidden="true" />}
            </span>
          ))}
        </div>
        <p className="lv-opus-sp-note">
          Illustrative preview. The real intake opens in Try Sonic free.
        </p>
      </div>
    </div>
  )
}
