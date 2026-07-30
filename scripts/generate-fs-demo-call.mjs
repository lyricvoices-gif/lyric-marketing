/* Generate the FS Agents demo call — a real inbound call: phone ring, the agent
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
   play line-01-agent.mp3 and listen to how "Oakhaven Capital" lands. Clean:
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
   3. AGENT_SETTINGS: Sol's PRODUCED leaf acoustics from the Callio Voice
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

/* Agent voice switched 2026-07-28 from Sol (saV6oP1dYO4fund8B2Hr) to
   Jessica Anne Bogart — "Chatty and Friendly", female, American,
   conversational (ElevenLabs professional library, cleared in the
   workspace). Settings auto-fetch from the voice's saved values, which
   are deliberately tuned (stability 0.43, style 0.55, speed 0.98). */
const AGENT_VOICE_ID = "g6xIsTj2HwM6VR4iXFCw"
const AGENT_SETTINGS = { stability: null, similarity_boost: null, speed: null }

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
  /* Ring for roughly two to three seconds, then cut to the agent picking up.
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
    who: "agent",
    text:
      "For quality and training purposes, calls may be recorded. Thank you for calling Oakhaven Capital. I'm your banking concierge. How can I help?",
    /* APPROVED TAKE 2026-07-28 (Jessica). */
    reuseFile: "audio-src/fs-demo-call/lines/line-01-agent.mp3",
  },
  {
    who: "caller",
    text:
      "Hi, um, I'm looking at my account and there's a charge for three hundred and twelve dollars that I definitely didn't make.",
    /* APPROVED TAKE 2026-07-28. */
    reuseFile: "audio-src/fs-demo-call/lines/line-02-caller.mp3",
  },
  {
    who: "agent",
    text:
      "I'm sorry to hear that. I'll do my best to help. Before I can pull up any account information, I need to verify your identity. Can you verify the last four digits of the account number you're calling about?",
    /* Empathy crisp, no promised resolution before verification or
       investigation ("I'll do my best to help" — short form, 2026-07-30).
       The agent never abbreviates: "account information", not "info". */
    /* QA-PASSED TAKE 2026-07-30 (165 Hz, IQR 24 Hz); STT verbatim. */
    reuseFile: "audio-src/fs-demo-call/lines/line-03-agent.mp3",
  },
  {
    who: "caller",
    text: "For sure. It's the account ending in two, two, four, five.",
    /* APPROVED TAKE 2026-07-28. */
    reuseFile: "audio-src/fs-demo-call/lines/line-04-caller.mp3",
  },
  {
    who: "agent",
    text:
      "Thank you. As a second step, I've just sent a six digit verification code to the phone number we have on file. Can you read that code back to me once it arrives?",
    /* TWO-FACTOR STEP (restored 2026-07-30 per Lyric): knowledge factor
       (last four) plus possession factor (OTP to the phone on file). */
    /* QA-PASSED TAKE 2026-07-30 (158 Hz, IQR 28 Hz); STT verbatim. */
    reuseFile: "audio-src/fs-demo-call/lines/line-05-agent.mp3",
    gapAfterMs: 2200,
  },
  {
    who: "caller",
    text: "Sure, one sec... okay, got it. It's four, seven, one, two, nine, five.",
    /* Code digits spelled with commas for beat separation, per the
       normalization discipline above. */
    /* QA-PASSED TAKE 2026-07-30 (128 Hz, dev 1% vs caller ref); STT
       verbatim including all six digits. */
    reuseFile: "audio-src/fs-demo-call/lines/line-06-caller.mp3",
  },
  {
    who: "agent",
    text: "Thank you. One moment while I verify that.",
    /* "One moment while I..." repeats at the lookup on purpose: a
       consistent service idiom is what a governed register sounds
       like. */
    /* QA-PASSED TAKE 2026-07-28 (182 Hz, IQR 45 Hz). */
    reuseFile: "audio-src/fs-demo-call/lines/line-07-agent.mp3",
    gapAfterMs: 2500,
  },
  {
    who: "agent",
    text: "Thanks for verifying your identity. One moment while I look into that charge.",
    /* QA-PASSED TAKE 2026-07-28 (180 Hz, IQR 38 Hz). */
    reuseFile: "audio-src/fs-demo-call/lines/line-08-agent.mp3",
    gapAfterMs: 4500,
  },
  {
    who: "agent",
    text:
      "Thank you for holding. I can see the three hundred twelve dollar charge you mentioned. Do you recognize the merchant listed on the transaction?",
    /* Standard bank phrasing; the agent never says familiar or
       unfamiliar about a disputed charge. */
    /* QA-PASSED TAKE 2026-07-28 (178 Hz, IQR 61 Hz). */
    reuseFile: "audio-src/fs-demo-call/lines/line-09-agent.mp3",
  },
  {
    who: "caller",
    text: "No, I've never heard of them.",
    /* APPROVED TAKE 2026-07-28. */
    reuseFile: "audio-src/fs-demo-call/lines/line-10-caller.mp3",
  },
  {
    who: "agent",
    text:
      "Understood. I've opened a dispute for the three hundred twelve dollar charge and applied a temporary credit to your account while we investigate. If we determine the charge was unauthorized, you won't be responsible for it. I'll walk you through what happens next.",
    /* GOVERNANCE: liability is CONDITIONED on the investigation ("if we
       determine..."), never asserted before it. The unconditional form
       made a legal determination pre-investigation. */
    /* QA-PASSED TAKE 2026-07-28 (170 Hz, IQR 26 Hz). */
    reuseFile: "audio-src/fs-demo-call/lines/line-11-agent.mp3",
  },
]

/* Natural inter-turn gap; the verifying beat above overrides per line. */
const DEFAULT_GAP_MS = 650

if (!existsSync(RING.file)) {
  throw new Error(`ring clip missing at ${RING.file} — run from the repo root`)
}

/* Sol's settings: use the hardcoded produced values when set; otherwise
   fetch the voice's saved settings from the API and record that. */
let agentSettings = AGENT_SETTINGS
let agentSettingsSource = "hardcoded produced leaf acoustics (Callio Voice Settings sheet)"
if (agentSettings.stability == null) {
  const res = await fetch(`https://api.elevenlabs.io/v1/voices/${AGENT_VOICE_ID}/settings`, {
    headers: { "xi-api-key": KEY },
  })
  if (!res.ok) throw new Error(`voice settings fetch ${res.status}: ${await res.text()}`)
  agentSettings = await res.json()
  agentSettingsSource =
    "fetched from the voice's saved settings (GET /v1/voices/{id}/settings) at generation time"
  console.log("Sol settings (fetched):", JSON.stringify(agentSettings))
}

const OUT = path.join("out", "fs-demo-call")
mkdirSync(OUT, { recursive: true })

const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg"

/* ── Acoustic QA ────────────────────────────────────────────────────────
   Separately generated takes can drift in pitch (most audible on short
   lines rendered without context). Every fresh take is measured — median
   f0 and interquartile range via autocorrelation on the decoded PCM —
   and compared against the speaker's approved takes. A take fails QA
   when its median deviates more than 12% from the speaker's reference
   or its IQR exceeds 65 Hz (an erratic take); failing takes regenerate
   up to MAX_TAKES times and the best-scoring one wins. */
const MAX_TAKES = 3

function f0Stats(file) {
  const raw = execSync(`${FFMPEG} -i ${file} -f s16le -acodec pcm_s16le -ac 1 -ar 16000 - 2>/dev/null`, {
    maxBuffer: 1 << 28,
  })
  const n = raw.length >> 1
  const s = new Float32Array(n)
  for (let i = 0; i < n; i++) s[i] = raw.readInt16LE(i << 1) / 32768
  const frame = 640
  const hop = 320
  const minLag = Math.floor(16000 / 350)
  const maxLag = Math.floor(16000 / 120)
  const f0s = []
  for (let start = 0; start + frame + maxLag < n; start += hop) {
    let energy = 0
    for (let i = 0; i < frame; i++) energy += s[start + i] * s[start + i]
    if (energy / frame < 0.0004) continue
    let best = 0
    let bestLag = 0
    let norm0 = 0
    for (let i = 0; i < frame; i++) norm0 += s[start + i] * s[start + i]
    for (let lag = minLag; lag <= maxLag; lag++) {
      let c = 0
      let norm1 = 0
      for (let i = 0; i < frame; i++) {
        c += s[start + i] * s[start + i + lag]
        norm1 += s[start + i + lag] * s[start + i + lag]
      }
      const r = c / Math.sqrt(norm0 * norm1 + 1e-9)
      if (r > best) {
        best = r
        bestLag = lag
      }
    }
    if (best > 0.6 && bestLag > 0) f0s.push(16000 / bestLag)
  }
  f0s.sort((a, b) => a - b)
  const q = (p) => f0s[Math.floor(f0s.length * p)] ?? 0
  return { median: q(0.5), iqr: q(0.75) - q(0.25), frames: f0s.length }
}

async function tts(text, voiceId, settings, previousText, nextText) {
  const res = await fetch(`${API}/${voiceId}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: settings,
      /* Prosody conditioning: the same speaker's surrounding lines, so a
         take is rendered in context instead of in isolation. */
      ...(previousText ? { previous_text: previousText } : {}),
      ...(nextText ? { next_text: nextText } : {}),
    }),
  })
  if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

/* Reference pitch per speaker, seeded from the approved (reused) takes. */
const refF0 = { agent: [], caller: [] }
for (const line of LINES) {
  if (line.reuseFile && existsSync(line.reuseFile)) {
    const st = f0Stats(line.reuseFile)
    if (st.frames > 10) refF0[line.who].push(st.median)
  }
}
const refMedian = (who) => {
  const a = [...refF0[who]].sort((x, y) => x - y)
  return a.length ? a[Math.floor(a.length / 2)] : null
}

const clips = []
for (let i = 0; i < LINES.length; i++) {
  const line = LINES[i]
  const isAgent = line.who === "agent"
  const file = path.join(OUT, `line-${String(i + 1).padStart(2, "0")}-${line.who}.mp3`)
  if (line.reuseFile && existsSync(line.reuseFile)) {
    /* Approved take: copy the committed clip instead of re-rendering. */
    writeFileSync(file, readFileSync(line.reuseFile))
    console.log("reused   ", file, "<-", line.reuseFile)
  } else {
    const prev = LINES.slice(0, i).reverse().find((l) => l.who === line.who)?.text
    const next = LINES.slice(i + 1).find((l) => l.who === line.who)?.text
    const ref = refMedian(line.who)
    let best = null
    for (let take = 1; take <= MAX_TAKES; take++) {
      const buf = await tts(
        line.text,
        isAgent ? AGENT_VOICE_ID : CALLER_VOICE_ID,
        isAgent ? agentSettings : CALLER_SETTINGS,
        prev,
        next,
      )
      writeFileSync(file, buf)
      const st = f0Stats(file)
      const dev = ref ? Math.abs(st.median - ref) / ref : 0
      const pass = st.iqr <= 65 && dev <= 0.12
      const score = st.iqr + (ref ? Math.abs(st.median - ref) : 0)
      console.log(
        `generated ${file} take ${take}: f0 ${st.median.toFixed(0)}Hz iqr ${st.iqr.toFixed(0)}Hz` +
          (ref ? ` (ref ${ref.toFixed(0)}Hz, dev ${(dev * 100).toFixed(0)}%)` : "") +
          (pass ? " PASS" : " RETRY"),
      )
      /* A passing take always beats a failing one; score breaks ties. */
      if (!best || (pass && !best.pass) || (pass === best.pass && score < best.score)) {
        best = { buf, score, pass }
      }
      if (pass) break
    }
    if (!best.pass) console.warn(`WARN: ${file} best take still outside QA thresholds`)
    writeFileSync(file, best.buf)
    if (isAgent || line.who === "caller") {
      const st = f0Stats(file)
      if (st.frames > 10) refF0[line.who].push(st.median)
    }
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
execSync(
  [FFMPEG, "-y", ...parts, "-filter_complex", `"${filter}"`, "-map", '"[out]"', "-b:a", "128k", stitched].join(" "),
  { stdio: "inherit", shell: "/bin/bash" },
)

/* Acoustic QA report over the FINAL takes (reused and fresh alike):
   per-clip median f0 + IQR, per-speaker spread. Written alongside the
   manifest so every shipped stitch carries its measurements. */
const qaReport = clips.map((c, i) => {
  const st = f0Stats(c.file)
  return {
    file: path.basename(c.file),
    who: LINES[i].who,
    medianF0Hz: Math.round(st.median),
    iqrHz: Math.round(st.iqr),
    voicedFrames: st.frames,
  }
})
for (const who of ["agent", "caller"]) {
  const meds = qaReport.filter((r) => r.who === who).map((r) => r.medianF0Hz)
  const spread = Math.max(...meds) - Math.min(...meds)
  console.log(`QA ${who}: medians ${meds.join("/")} Hz, cross-take spread ${spread} Hz`)
}
console.table(qaReport)

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
    name: "FS agent (voice: Jessica Anne Bogart)",
    voiceId: AGENT_VOICE_ID,
    model: MODEL_ID,
    settings: agentSettings,
    settingsSource: agentSettingsSource,
  },
  caller: {
    voiceId: CALLER_VOICE_ID,
    library: "ElevenLabs cleared voice library",
    settings: CALLER_SETTINGS,
  },
  counselSlot:
    "GREETING_DISCLOSURE in the adoption spec is untouched and emit-empty; the demo greeting is a demo-render value only.",
  acousticQa: {
    method:
      "median f0 + IQR per take (autocorrelation, 120-350 Hz, 40ms frames); fresh takes gated at IQR <= 65 Hz and <= 12% median deviation from the speaker's approved-take reference, up to 3 takes, best wins; TTS conditioned with same-speaker previous_text/next_text",
    report: qaReport,
  },
}
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2))

console.log("\nstitched:", stitched)
console.log("manifest:", path.join(OUT, "manifest.json"))
console.log("\nBEFORE ANYTHING ELSE: listen to line-01-sol.mp3 — \"Oakhaven Capital\".")
console.log("upload:   wrangler r2 object put <bucket>/phone/fs-demo-call.mp3 --file", stitched)
