/* Generate the FS Agents demo call: a two-voice governed dispute call
   (agent: Sol, caller: cleared-library male), stitched into one file for
   the /agents page player, with per-line clips kept for a later
   transcript-synced player.

   RUN WHERE THE ELEVENLABS KEY LIVES. This cannot run in the marketing
   sandbox (no egress to api.elevenlabs.io, no key). Requirements:
     - env ELEVENLABS_API_KEY
     - ffmpeg on PATH (stitching + silence gaps)
   Usage:
     node scripts/generate-fs-demo-call.mjs
   Output:
     out/fs-demo-call/line-XX-{who}.mp3   (per-line clips, keep these)
     out/fs-demo-call/fs-demo-call.mp3    (stitched file for the page)
   Then upload to the callio audio store (same bucket as the produced
   phone batch) and keep the URL in app/agents/page.tsx:
     {AUDIO_BASE}/phone/fs-demo-call.mp3

   ── PLACEHOLDERS TO RESOLVE BEFORE RUNNING (marked [RESOLVE]) ──
   1. CALLER_VOICE_ID: pick a natural, conversational American male from
      the cleared library that contrasts with Sol without competing:
      slightly less polished, believable as a real caller. Record the ID
      and the reason for the choice back in this file.
   2. SOL_SETTINGS: pull Sol's PRODUCED leaf acoustics from the Callio
      Voice Settings sheet (the fs-phone-sol batch values). Do not run
      with the placeholder values below. */

import { execSync } from "node:child_process"
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"

const API = "https://api.elevenlabs.io/v1/text-to-speech"
const KEY = process.env.ELEVENLABS_API_KEY
if (!KEY) throw new Error("ELEVENLABS_API_KEY is not set")

const MODEL_ID = "eleven_flash_v2_5"

const SOL_VOICE_ID = "saV6oP1dYO4fund8B2Hr"
/* [RESOLVE] Sol's produced leaf acoustics — replace with the fs-phone-sol
   batch settings before running. */
const SOL_SETTINGS = { stability: null, similarity_boost: null, speed: null }

/* [RESOLVE] Cleared-library caller voice. */
const CALLER_VOICE_ID = "REPLACE_WITH_CLEARED_LIBRARY_VOICE_ID"
const CALLER_SETTINGS = { stability: 0.45, similarity_boost: 0.75 }

/* The locked script, TTS-normalized: dollars and digits are written as
   they must be SPOKEN ("$312" -> "three hundred twelve dollars",
   "4-7-1-2" -> spelled digits with commas for beat separation), same
   normalization discipline as the voice pipeline. Do not paraphrase. */
const LINES = [
  {
    who: "caller",
    text:
      "Hi, um, I'm looking at my account and there's a charge here I definitely didn't make. Three hundred and twelve dollars. I have no idea what this is.",
  },
  {
    who: "sol",
    text:
      "I understand, and I'll help you get to the bottom of it. An unexpected charge like that is unsettling. Before I pull up any account details, I need to verify your identity. Can you confirm the phone number or email on the account?",
  },
  {
    who: "caller",
    text: "Yeah, it's the phone ending in four, seven, one, two.",
  },
  {
    who: "sol",
    text: "Thank you. I'll verify that now.",
    /* The marked verifying pause follows this line. */
    gapAfterMs: 1500,
  },
  {
    who: "sol",
    text:
      "I've confirmed your identity. I can see the three hundred twelve dollar charge you mentioned. I can't say yet whether it's fraud until we look closer, so let's review it together. Do you recognize the merchant name, or is it completely unfamiliar?",
  },
  {
    who: "caller",
    text: "Completely unfamiliar. I've never heard of them.",
  },
  {
    who: "sol",
    text:
      "Understood. I'm going to open a dispute on that transaction and place a temporary hold so nothing else moves on it while we investigate. You won't be held responsible for a charge you didn't authorize. I'll walk you through what happens next.",
  },
]

/* Natural inter-turn gap; the verifying beat above overrides per line. */
const DEFAULT_GAP_MS = 650

const OUT = path.join("out", "fs-demo-call")
mkdirSync(OUT, { recursive: true })

async function tts(text, voiceId, settings) {
  const res = await fetch(`${API}/${voiceId}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: settings,
    }),
  })
  if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

const clips = []
for (let i = 0; i < LINES.length; i++) {
  const line = LINES[i]
  const isSol = line.who === "sol"
  if (isSol && SOL_SETTINGS.stability == null) {
    throw new Error("[RESOLVE] Sol's produced settings are still placeholders")
  }
  const buf = await tts(
    line.text,
    isSol ? SOL_VOICE_ID : CALLER_VOICE_ID,
    isSol ? SOL_SETTINGS : CALLER_SETTINGS,
  )
  const file = path.join(OUT, `line-${String(i + 1).padStart(2, "0")}-${line.who}.mp3`)
  writeFileSync(file, buf)
  clips.push({ file, gapAfterMs: line.gapAfterMs ?? DEFAULT_GAP_MS })
  console.log("generated", file)
}

/* Stitch with silences via ffmpeg concat (decode -> pad -> concat). */
const parts = []
const filters = []
clips.forEach((c, i) => {
  parts.push("-i", c.file)
  const pad = i < clips.length - 1 ? `,apad=pad_dur=${c.gapAfterMs / 1000}` : ""
  filters.push(`[${i}:a]aresample=44100${pad}[a${i}]`)
})
const filter = `${filters.join(";")};${clips.map((_, i) => `[a${i}]`).join("")}concat=n=${clips.length}:v=0:a=1[out]`
const stitched = path.join(OUT, "fs-demo-call.mp3")
execSync(
  ["ffmpeg", "-y", ...parts, "-filter_complex", `"${filter}"`, "-map", '"[out]"', "-b:a", "128k", stitched].join(" "),
  { stdio: "inherit", shell: "/bin/bash" },
)
console.log("\nstitched:", stitched)
console.log("upload:   wrangler r2 object put <bucket>/phone/fs-demo-call.mp3 --file", stitched)
