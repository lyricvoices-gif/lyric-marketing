/* Generate the FS Agents demo call — a real inbound call: phone ring, Sol
   picks up with the full Oakhaven Capital opening (recording notice,
   institution name, AI-identity concierge framing), then the locked
   unauthorized-charge scenario unchanged. Stitched into one file for the
   /agents page player, per-line clips kept for a later transcript-synced
   player.

   RUN WHERE THE ELEVENLABS KEY LIVES. This cannot run in the marketing
   sandbox (no egress to api.elevenlabs.io, no key). Requirements:
     - env ELEVENLABS_API_KEY
     - ffmpeg on PATH (trim + silence gaps + stitching)
   Usage:
     node scripts/generate-fs-demo-call.mjs
   Output:
     out/fs-demo-call/line-XX-{who}.mp3   (per-line clips, keep these)
     out/fs-demo-call/fs-demo-call.mp3    (stitched file for the page)
     out/fs-demo-call/manifest.json       (asset + provenance manifest)
   Then upload to the callio audio store (same bucket as the produced
   phone batch) and keep the URL in the page player:
     {AUDIO_BASE}/phone/fs-demo-call.mp3

   ── LISTEN FIRST: "Oakhaven Capital" ──
   Sol's opening is a live pronunciation stress test. Before anything else,
   play line-01-sol.mp3 and listen to how "Oakhaven Capital" lands. Clean:
   the demo doubles as proof the voice handles real institution names.
   Mangled: STOP — add "Oakhaven" to the FS per-voice pronunciation list,
   re-render, and only then stitch. Do not ship a demo with a mangled
   institution name; it is the most prominent word a visitor hears.

   ── COUNSEL SLOT — DO NOT TOUCH ──
   The greeting/recording notice below is a DEMO-RENDER value only. The
   adoption spec's disclosure slot in the callio KB (GREETING_DISCLOSURE)
   stays emit-empty and owed to counsel — an adopting enterprise fills its
   own legal wording. Do NOT populate the KB slot to match this demo.
   Two renders of the same governance: demo prepopulated, adoption spec
   blank.

   ── PLACEHOLDERS TO RESOLVE BEFORE RUNNING (marked [RESOLVE]) ──
   1. RING: a phone-ring clip from a cleared, royalty-free/LICENSED
      library. This is a licensed asset, not a sound effect grab — record
      the exact clip, its source library, and its license terms in the
      RING constants below (they are written into the manifest). The
      license must be verifiable; no untracked "free" clips. Same
      provenance discipline as the caller voice.
   2. CALLER_VOICE_ID: the male ElevenLabs voice from the cleared library
      selected earlier — keep it consistent with that selection. Record
      the ID and the reason for the choice back in this file.
   3. SOL_SETTINGS: Sol's PRODUCED leaf acoustics from the Callio Voice
      Settings sheet (the fs-phone-sol batch values). Do not run with the
      placeholder values below.

   ── REPORT BACK BEFORE COMMITTING (alongside the callio-side voice
      adapter's re-run test count) ──
   - ring clip source + license terms (from the manifest)
   - listen link to the stitched file on R2
   - the "Oakhaven Capital" verdict (clean / added to pronunciation list)
   - confirmation the KB counsel slot is still empty and untouched */

import { execSync } from "node:child_process"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"

const API = "https://api.elevenlabs.io/v1/text-to-speech"
const KEY = process.env.ELEVENLABS_API_KEY
if (!KEY) throw new Error("ELEVENLABS_API_KEY is not set")

const MODEL_ID = "eleven_flash_v2_5"

const SOL_VOICE_ID = "saV6oP1dYO4fund8B2Hr"
/* [RESOLVE] Sol's produced leaf acoustics — replace with the fs-phone-sol
   batch settings before running. */
const SOL_SETTINGS = { stability: null, similarity_boost: null, speed: null }

/* [RESOLVE] Cleared-library caller voice (the male voice selected
   earlier — keep it consistent). */
const CALLER_VOICE_ID = "REPLACE_WITH_CLEARED_LIBRARY_VOICE_ID"
const CALLER_SETTINGS = { stability: 0.45, similarity_boost: 0.75 }

/* [RESOLVE] The licensed phone-ring clip. Every field below is required —
   it is the asset's provenance record and is written to the manifest. */
const RING = {
  file: "REPLACE_WITH_PATH_TO_LICENSED_RING_CLIP",
  /* Ring for roughly two to three seconds, then cut to Sol picking up. */
  trimSeconds: 2.6,
  gapAfterMs: 300,
  clipName: "REPLACE: exact clip name in the library",
  source: "REPLACE: library + URL of the clip",
  license: "REPLACE: license name + terms (must be verifiable)",
}

/* The locked script, TTS-normalized: dollars and digits are written as
   they must be SPOKEN ("$312" -> "three hundred twelve dollars",
   "4-7-1-2" -> spelled digits with commas for beat separation), same
   normalization discipline as the voice pipeline. Do not paraphrase.

   Line 1 is the NEW opening (verbatim, locked): recording notice,
   institution name, AI-identity. Everything after it is the previously
   locked call, unchanged. */
const LINES = [
  {
    who: "sol",
    text:
      "For quality and training purposes, calls may be recorded. Thank you for calling Oakhaven Capital. I'm your banking concierge. How can I help?",
    /* ^ Pronunciation stress test: listen to "Oakhaven Capital" first. */
  },
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

if (RING.file.startsWith("REPLACE") || !existsSync(RING.file)) {
  throw new Error("[RESOLVE] RING.file must point at the licensed ring clip")
}
for (const field of ["clipName", "source", "license"]) {
  if (RING[field].startsWith("REPLACE")) {
    throw new Error(`[RESOLVE] RING.${field} — the ring clip's provenance must be recorded`)
  }
}

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

/* Stitch: ring (trimmed) -> Sol's opening -> caller -> rest of the locked
   call, with silences, via ffmpeg (decode -> trim/pad -> concat). */
const inputs = [{ file: RING.file, trim: RING.trimSeconds, gapAfterMs: RING.gapAfterMs }, ...clips]
const parts = []
const filters = []
inputs.forEach((c, i) => {
  parts.push("-i", c.file)
  const trim = c.trim ? `,atrim=0:${c.trim}` : ""
  const pad = i < inputs.length - 1 ? `,apad=pad_dur=${c.gapAfterMs / 1000}` : ""
  filters.push(`[${i}:a]aresample=44100${trim}${pad}[a${i}]`)
})
const filter = `${filters.join(";")};${inputs.map((_, i) => `[a${i}]`).join("")}concat=n=${inputs.length}:v=0:a=1[out]`
const stitched = path.join(OUT, "fs-demo-call.mp3")
execSync(
  ["ffmpeg", "-y", ...parts, "-filter_complex", `"${filter}"`, "-map", '"[out]"', "-b:a", "128k", stitched].join(" "),
  { stdio: "inherit", shell: "/bin/bash" },
)

/* Provenance manifest — every third-party asset in the demo, verifiable. */
const manifest = {
  generatedAt: new Date().toISOString(),
  stitched: "fs-demo-call.mp3",
  stitchOrder: ["ring", ...LINES.map((l) => l.who)],
  ring: {
    clipName: RING.clipName,
    source: RING.source,
    license: RING.license,
    trimSeconds: RING.trimSeconds,
  },
  agent: {
    name: "Sol",
    voiceId: SOL_VOICE_ID,
    model: MODEL_ID,
    settings: SOL_SETTINGS,
  },
  caller: {
    voiceId: CALLER_VOICE_ID,
    library: "ElevenLabs cleared voice library",
    settings: CALLER_SETTINGS,
  },
  counselSlot:
    "GREETING_DISCLOSURE in the adoption spec is untouched and emit-empty; the demo greeting is a demo-render value only.",
}
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2))

console.log("\nstitched:", stitched)
console.log("manifest:", path.join(OUT, "manifest.json"))
console.log("\nBEFORE ANYTHING ELSE: listen to line-01-sol.mp3 — \"Oakhaven Capital\".")
console.log("upload:   wrangler r2 object put <bucket>/phone/fs-demo-call.mp3 --file", stitched)
