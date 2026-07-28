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
   1. RING: RESOLVED — the supplied ElevenLabs SFX clip, committed at
      audio-src/fs-demo-call/ring-comcell-realistic.wav with provenance
      recorded below (and written into the manifest).
   2. CALLER_VOICE_ID: the male ElevenLabs voice from the cleared library
      selected earlier — keep it consistent with that selection. Record
      the ID and the reason for the choice back in this file.
   3. SOL_SETTINGS: Sol's PRODUCED leaf acoustics from the Callio Voice
      Settings sheet (the fs-phone-sol batch values). If left null, the
      script fetches the voice's SAVED settings from the ElevenLabs API
      (GET /v1/voices/{id}/settings) and records that provenance in the
      manifest — correct when the produced settings were saved onto the
      voice; hardcode the sheet values here if they were not.

   ffmpeg: uses $FFMPEG_PATH when set (e.g. the ffmpeg-static binary),
   plain "ffmpeg" otherwise.

   ── REPORT BACK BEFORE COMMITTING (alongside the callio-side voice
      adapter's re-run test count) ──
   - ring clip source + license terms (from the manifest)
   - listen link to the stitched file on R2
   - the "Oakhaven Capital" verdict (clean / added to pronunciation list)
   - confirmation the KB counsel slot is still empty and untouched */

import { execSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

const API = "https://api.elevenlabs.io/v1/text-to-speech"
const KEY = process.env.ELEVENLABS_API_KEY
if (!KEY) throw new Error("ELEVENLABS_API_KEY is not set")

const MODEL_ID = "eleven_flash_v2_5"

const SOL_VOICE_ID = "saV6oP1dYO4fund8B2Hr"
/* [RESOLVE] Sol's produced leaf acoustics — replace with the fs-phone-sol
   batch settings before running. */
const SOL_SETTINGS = { stability: null, similarity_boost: null, speed: null }

/* Caller voice: Chris (ElevenLabs premade, "Charming, Down-to-Earth" —
   male, American, middle_aged, conversational). Chosen 2026-07-28:
   premade voices carry unambiguous commercial clearance, and the
   down-to-earth everyday register reads as a real caller, clearly
   distinct from Sol's polished senior-professional delivery without
   competing with it. */
const CALLER_VOICE_ID = "iP95p4xoKVk53GoZ742B"
const CALLER_SETTINGS = { stability: 0.45, similarity_boost: 0.75 }

/* The licensed phone-ring clip — provenance record, written to the
   manifest. */
const RING = {
  file: "audio-src/fs-demo-call/ring-comcell-realistic.wav",
  /* Ring for roughly two to three seconds, then cut to Sol picking up.
     Source clip is 4.08s, 48kHz stereo. */
  trimSeconds: 2.6,
  gapAfterMs: 300,
  clipName: "COMCellRealistic_phone_call (ElevenLabs)",
  source:
    "ElevenLabs sound-effects library; file supplied by Lyric 2026-07-28, committed at audio-src/fs-demo-call/ring-comcell-realistic.wav",
  license:
    "ElevenLabs account license for generated/library SFX (commercial use under the workspace's subscription terms). VERIFY against the ElevenLabs terms line for SFX before wide distribution.",
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
    /* APPROVED TAKE 2026-07-28 — reuse the committed clip; do not
       re-render (TTS is non-deterministic and this take is signed off). */
    reuseFile: "audio-src/fs-demo-call/lines/line-01-sol.mp3",
  },
  {
    who: "caller",
    text:
      "Hi, um, I'm looking at my account and there's a charge for three hundred and twelve dollars that I definitely didn't make.",
    /* APPROVED TAKE 2026-07-28. */
    reuseFile: "audio-src/fs-demo-call/lines/line-02-caller.mp3",
  },
  {
    who: "sol",
    text:
      "I'm sorry to hear that. Let's get this resolved for you right away. Before I can pull up any account information, I need to verify your identity. Can you verify the last four digits of the account you're calling in about?",
    /* Empathy stays crisp and realistic: brief apology, straight to
       action. The agent never abbreviates: "account information", not
       "info". */
  },
  {
    who: "caller",
    text: "For sure. It's the account ending in two, two, four, five.",
    /* APPROVED TAKE 2026-07-28. */
    reuseFile: "audio-src/fs-demo-call/lines/line-04-caller.mp3",
  },
  {
    who: "sol",
    text: "Thank you. I'll verify that now.",
    /* APPROVED TAKE 2026-07-28. The verifying beat: two to three
       seconds before confirmation. */
    reuseFile: "audio-src/fs-demo-call/lines/line-05-sol.mp3",
    gapAfterMs: 2500,
  },
  {
    who: "sol",
    text: "I've confirmed your identity. One moment while I look into that charge.",
    /* APPROVED TAKE 2026-07-28. The lookup beat: four to five seconds
       before Sol comes back. */
    reuseFile: "audio-src/fs-demo-call/lines/line-06-sol.mp3",
    gapAfterMs: 4500,
  },
  {
    who: "sol",
    text:
      "Thank you for holding. I can see the three hundred twelve dollar charge you mentioned. Do you recognize the merchant name, or is it completely unfamiliar?",
    /* APPROVED TAKE 2026-07-28. */
    reuseFile: "audio-src/fs-demo-call/lines/line-07-sol.mp3",
  },
  {
    who: "caller",
    text: "Completely unfamiliar. I've never heard of them.",
    /* APPROVED TAKE 2026-07-28. */
    reuseFile: "audio-src/fs-demo-call/lines/line-08-caller.mp3",
  },
  {
    who: "sol",
    text:
      "Understood. I've opened a dispute for the three hundred twelve dollar charge, and I've applied a temporary credit to your account for that amount while we investigate. You won't be responsible for any charges you didn't authorize. I'll walk you through what happens next.",
    /* APPROVED TAKE 2026-07-28. Standard FS dispute language: dispute
       opened, temporary credit applied to the account, zero-liability
       assurance, next steps. */
    reuseFile: "audio-src/fs-demo-call/lines/line-09-sol.mp3",
  },
]

/* Natural inter-turn gap; the verifying beat above overrides per line. */
const DEFAULT_GAP_MS = 650

if (!existsSync(RING.file)) {
  throw new Error(`ring clip missing at ${RING.file} — run from the repo root`)
}

/* Sol's settings: use the hardcoded produced values when set; otherwise
   fetch the voice's saved settings from the API and record that. */
let solSettings = SOL_SETTINGS
let solSettingsSource = "hardcoded produced leaf acoustics (Callio Voice Settings sheet)"
if (solSettings.stability == null) {
  const res = await fetch(`https://api.elevenlabs.io/v1/voices/${SOL_VOICE_ID}/settings`, {
    headers: { "xi-api-key": KEY },
  })
  if (!res.ok) throw new Error(`voice settings fetch ${res.status}: ${await res.text()}`)
  solSettings = await res.json()
  solSettingsSource =
    "fetched from the voice's saved settings (GET /v1/voices/{id}/settings) at generation time"
  console.log("Sol settings (fetched):", JSON.stringify(solSettings))
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
  const file = path.join(OUT, `line-${String(i + 1).padStart(2, "0")}-${line.who}.mp3`)
  if (line.reuseFile && existsSync(line.reuseFile)) {
    /* Approved take: copy the committed clip instead of re-rendering. */
    writeFileSync(file, readFileSync(line.reuseFile))
    console.log("reused   ", file, "<-", line.reuseFile)
  } else {
    const buf = await tts(
      line.text,
      isSol ? SOL_VOICE_ID : CALLER_VOICE_ID,
      isSol ? solSettings : CALLER_SETTINGS,
    )
    writeFileSync(file, buf)
    console.log("generated", file)
  }
  clips.push({ file, gapAfterMs: line.gapAfterMs ?? DEFAULT_GAP_MS })
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
const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg"
execSync(
  [FFMPEG, "-y", ...parts, "-filter_complex", `"${filter}"`, "-map", '"[out]"', "-b:a", "128k", stitched].join(" "),
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
    settings: solSettings,
    settingsSource: solSettingsSource,
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
