/* Generate the Callio "Proof in practice" pair — one scenario heard two ways:
   the same caller takes in both tracks, with only the agent's responses
   differing (ungoverned drift vs governed precision). Replaces the
   hand-assembled clips diagnosed in the 2026-08-30 audio review (loudness
   seesaw, slot-time amputations, metronomic gaps, unstable agent pitch).

   Architecture and QA per docs/voice-output-acoustic-qa.md and the reference
   implementation scripts/generate-fs-demo-call.mjs:
     rule 1  previous_text/next_text prosody conditioning on every request
     rule 2  per-take f0 gate (median deviation <= 12%, IQR <= 65 Hz)
     rule 3  per-speaker reference seeded from approved takes (the committed
             fs-demo-call takes of the SAME two voices — this piece has no
             approved takes of its own yet; the manifest records the seeding)
     rule 4  up to 3 takes, best wins, loud WARN if none pass
     rule 6  STT round-trip of every fresh take and both stitches
     rule 7  QA report + provenance manifest ship beside the audio
   Additions over the reference pipeline (from the review's fix list):
     - per-speaker loudness matching before the stitch (speakers within
       ~1 LU; program near -18.5 LUFS integrated; -1.5 dB limiter ceiling)
     - caller f0 band widened to 70-350 Hz so the gate can actually measure
       low-pitched callers (the shipped clips' caller was unmeasurable)
     - authored gap map (caller->agent 750 ms, agent->caller 850 ms) instead
       of one constant gap
     - timings.json with per-line start/end offsets for CallioHearIt.tsx

   RUN WHERE THE ELEVENLABS KEY LIVES:
     ELEVENLABS_API_KEY=sk_... [FFMPEG_PATH=...] node scripts/generate-callio-proof.mjs
   In this sandbox, Node fetch needs the egress proxy:
     NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
   Output:
     out/callio-proof/line-*.mp3                 per-line takes (keep on approval)
     out/callio-proof/callio-proof-ungoverned.mp3
     out/callio-proof/callio-proof-governed.mp3
     out/callio-proof/manifest.json              provenance + QA + STT report
     out/callio-proof/timings.json               per-line offsets for the player */

import { execSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

const KEY = process.env.ELEVENLABS_API_KEY
if (!KEY) throw new Error("ELEVENLABS_API_KEY is not set")
const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg"
const MODEL_ID = "eleven_flash_v2_5"

/* Same two voices as the approved /agents demo call: one consistent caller
   and agent persona across the site's audio. */
const AGENT_VOICE_ID = "g6xIsTj2HwM6VR4iXFCw" // Jessica Anne Bogart
/* The agent voice carries deliberately tuned SAVED settings (stability 0.43,
   style 0.55, speed 0.98 per the reference script). This key has no
   voices_read scope, so instead of fetching them we OMIT voice_settings and
   ElevenLabs applies the voice's saved values server-side — same result,
   recorded as provenance below. */
const AGENT_SETTINGS = null
const CALLER_VOICE_ID = "iP95p4xoKVk53GoZ742B" // Chris (premade)
const CALLER_SETTINGS = { stability: 0.45, similarity_boost: 0.75 }

/* display = the page transcript, verbatim (never restated here).
   tts     = the spoken-normalized form (digits and acronyms written as they
             must be SPOKEN; "APR -> A P R" per the FS pronunciation
             guidance, decimal digits read individually). */
const CALLER_LINES = [
  {
    id: "caller-1",
    display:
      "Hi. I’m comparing the Cascade Rewards card, and I want to be clear about the purchase rate. What APR would apply if I carried a balance?",
    tts:
      "Hi. I'm comparing the Cascade Rewards card, and I want to be clear about the purchase rate. What A P R would apply if I carried a balance?",
  },
  {
    id: "caller-2",
    display: "So the purchase APR is 24.99%?",
    tts: "So the purchase A P R is twenty-four point nine nine percent?",
  },
  {
    id: "caller-3",
    display: "And where would I find the full rate and fee details?",
    tts: "And where would I find the full rate and fee details?",
  },
]

const AGENT_LINES = {
  ungoverned: [
    {
      id: "ungoverned-agent-1",
      display:
        "Yeah, of course. It’s basically 24.99% right now. That’s pretty typical for a rewards card, and it may move around a little, so I’d just think of it as roughly 25%.",
      tts:
        "Yeah, of course. It's basically twenty-four point nine nine percent right now. That's pretty typical for a rewards card, and it may move around a little, so I'd just think of it as roughly twenty-five percent.",
    },
    {
      id: "ungoverned-agent-2",
      display:
        "Right, about that. If you pay the balance off quickly, the interest usually isn’t a big deal.",
      tts:
        "Right, about that. If you pay the balance off quickly, the interest usually isn't a big deal.",
    },
    {
      id: "ungoverned-agent-3",
      display:
        "It should all be in the card paperwork or somewhere in your account. I can point you in the right direction.",
      tts:
        "It should all be in the card paperwork or somewhere in your account. I can point you in the right direction.",
    },
  ],
  governed: [
    {
      id: "governed-agent-1",
      display:
        "The purchase Annual Percentage Rate is 24.99%. Please review the card’s pricing and terms for complete rate and fee information.",
      tts:
        "The purchase Annual Percentage Rate is twenty-four point nine nine percent. Please review the card's pricing and terms for complete rate and fee information.",
    },
    {
      id: "governed-agent-2",
      display: "Yes. The purchase Annual Percentage Rate is 24.99%.",
      tts: "Yes. The purchase Annual Percentage Rate is twenty-four point nine nine percent.",
    },
    {
      id: "governed-agent-3",
      display:
        "Open the card’s pricing and terms. That document contains the complete rate and fee information.",
      tts:
        "Open the card's pricing and terms. That document contains the complete rate and fee information.",
    },
  ],
}

/* Authored gap map: the agent answers promptly (750 ms), the caller takes a
   slightly longer beat to absorb the answer before the next question
   (850 ms). Slight asymmetry instead of the shipped clips' metronomic
   0.560 s constant. */
const GAP_CALLER_TO_AGENT_MS = 750
const GAP_AGENT_TO_CALLER_MS = 850

/* Loudness targets (review fix 2): both speakers normalized to a common
   integrated level so neither side seesaws; limiter ceiling for safety. */
const SPEAKER_TARGET_LUFS = -18.5
const LIMITER_LINEAR = 0.8413 // -1.5 dBFS

const OUT = path.join("out", "callio-proof")
mkdirSync(OUT, { recursive: true })

/* ── f0 gate (QA doc rule 2), band parameterized per speaker ─────────── */
function f0Stats(file, minHz, maxHz) {
  const raw = execSync(
    `${FFMPEG} -i ${file} -f s16le -acodec pcm_s16le -ac 1 -ar 16000 - 2>/dev/null`,
    { maxBuffer: 1 << 28 },
  )
  const n = raw.length >> 1
  const s = new Float32Array(n)
  for (let i = 0; i < n; i++) s[i] = raw.readInt16LE(i << 1) / 32768
  const frame = 640
  const hop = 320
  const minLag = Math.floor(16000 / maxHz)
  const maxLag = Math.floor(16000 / minHz)
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

const BAND = { agent: [120, 350], caller: [70, 350] }

/* ── duration + loudness helpers ─────────────────────────────────────── */
function durationSec(file) {
  const raw = execSync(
    `${FFMPEG} -i ${file} -f s16le -acodec pcm_s16le -ac 1 -ar 44100 - 2>/dev/null`,
    { maxBuffer: 1 << 28 },
  )
  return raw.length / 2 / 44100
}

function integratedLufs(files) {
  /* ebur128 over the given clips decoded and concatenated. */
  const parts = []
  const filters = []
  files.forEach((f, i) => {
    parts.push("-i", f)
    filters.push(`[${i}:a]aresample=44100[a${i}]`)
  })
  const graph = `${filters.join(";")};${files.map((_, i) => `[a${i}]`).join("")}concat=n=${files.length}:v=0:a=1[c];[c]ebur128=peak=true[out]`
  const log = execSync(
    [FFMPEG, ...parts, "-filter_complex", `"${graph}"`, "-map", '"[out]"', "-f", "null", "-", "2>&1"].join(" "),
    { shell: "/bin/bash", maxBuffer: 1 << 26 },
  ).toString()
  const tail = log.slice(log.lastIndexOf("Integrated loudness"))
  const i = tail.match(/I:\s*(-?[\d.]+) LUFS/)
  const lra = tail.match(/LRA:\s*(-?[\d.]+) LU/)
  const peak = tail.match(/Peak:\s*(-?[\d.]+) dBFS/)
  return {
    lufs: i ? parseFloat(i[1]) : NaN,
    lra: lra ? parseFloat(lra[1]) : NaN,
    truePeakDb: peak ? parseFloat(peak[1]) : NaN,
  }
}

/* ── TTS + STT ───────────────────────────────────────────────────────── */
async function tts(text, voiceId, settings, previousText, nextText) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        /* settings === null: omit voice_settings so the voice's SAVED tuned
           settings apply server-side. */
        ...(settings ? { voice_settings: settings } : {}),
        ...(previousText ? { previous_text: previousText } : {}),
        ...(nextText ? { next_text: nextText } : {}),
      }),
    },
  )
  if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

async function stt(file) {
  const form = new FormData()
  form.append("model_id", "scribe_v1")
  form.append("file", new Blob([readFileSync(file)], { type: "audio/mpeg" }), path.basename(file))
  const res = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
    method: "POST",
    headers: { "xi-api-key": KEY },
    body: form,
  })
  if (!res.ok) throw new Error(`STT ${res.status}: ${await res.text()}`)
  const json = await res.json()
  return (json.text || "").trim()
}

const normalizeWords = (t) =>
  t
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9%.]+/g, " ")
    .trim()
    .split(/\s+/)

function wordDistance(a, b) {
  /* Levenshtein over word tokens. */
  const m = a.length
  const n = b.length
  let prev = Array.from({ length: n + 1 }, (_, j) => j)
  for (let i = 1; i <= m; i++) {
    const cur = [i]
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    }
    prev = cur
  }
  return prev[n]
}

/* ── Seed per-speaker pitch reference from the approved demo-call takes
      (same voices, committed in audio-src) ─────────────────────────────── */
const APPROVED_DIR = "audio-src/fs-demo-call/lines"
if (!existsSync(APPROVED_DIR)) throw new Error(`missing ${APPROVED_DIR} — run from the repo root`)
const refF0 = { agent: [], caller: [] }
for (const f of ["line-01-agent.mp3", "line-03-agent.mp3", "line-07-agent.mp3", "line-08-agent.mp3", "line-09-agent.mp3", "line-11-agent.mp3"]) {
  const st = f0Stats(path.join(APPROVED_DIR, f), ...BAND.agent)
  if (st.frames > 10) refF0.agent.push(st.median)
}
for (const f of ["line-02-caller.mp3", "line-04-caller.mp3", "line-06-caller.mp3", "line-10-caller.mp3"]) {
  const st = f0Stats(path.join(APPROVED_DIR, f), ...BAND.caller)
  if (st.frames > 10) refF0.caller.push(st.median)
}
const refMedian = (who) => {
  const a = [...refF0[who]].sort((x, y) => x - y)
  return a.length ? a[Math.floor(a.length / 2)] : null
}
console.log(`pitch reference seeds — agent ${refMedian("agent")?.toFixed(0)} Hz (${refF0.agent.length} takes), caller ${refMedian("caller")?.toFixed(0)} Hz (${refF0.caller.length} takes)`)

/* ── Render with gate + retry (rules 1, 2, 4) and per-take STT (rule 6) ── */
const MAX_TAKES = 3
const qaReport = []
const sttReport = []

async function renderLine(line, who, voiceId, settings, prevText, nextText) {
  const file = path.join(OUT, `line-${line.id}.mp3`)
  const ref = refMedian(who)
  /* REUSE_TAKES=1: keep the existing rendered take (rule 5 discipline while
     iterating on the stitch stage) — re-measure it, skip the TTS calls. */
  if (process.env.REUSE_TAKES === "1" && existsSync(file)) {
    const st = f0Stats(file, ...BAND[who])
    const dev = ref ? Math.abs(st.median - ref) / ref : 0
    refF0[who].push(st.median)
    qaReport.push({
      line: line.id,
      who,
      medianF0Hz: Math.round(st.median),
      iqrHz: Math.round(st.iqr),
      voicedFrames: st.frames,
      gatePassed: st.iqr <= 65 && dev <= 0.12,
      reused: true,
    })
    console.log(`reuse  ${line.id}: f0 ${st.median.toFixed(0)}Hz iqr ${st.iqr.toFixed(0)}Hz`)
    try {
      const transcript = await stt(file)
      const dist = wordDistance(normalizeWords(transcript), normalizeWords(line.tts))
      const distDisplay = wordDistance(normalizeWords(transcript), normalizeWords(line.display))
      sttReport.push({ line: line.id, transcript, wordDistanceVsTts: dist, wordDistanceVsDisplay: distDisplay })
      console.log(`stt    ${line.id}: dist ${dist} (vs tts) / ${distDisplay} (vs display)`)
    } catch (e) {
      sttReport.push({ line: line.id, error: String(e.message || e) })
      console.warn(`WARN stt ${line.id} unavailable`)
    }
    return file
  }
  let best = null
  for (let take = 1; take <= MAX_TAKES; take++) {
    const buf = await tts(line.tts, voiceId, settings, prevText, nextText)
    writeFileSync(file, buf)
    const st = f0Stats(file, ...BAND[who])
    const dev = ref ? Math.abs(st.median - ref) / ref : 0
    const pass = st.iqr <= 65 && dev <= 0.12
    const score = st.iqr + (ref ? Math.abs(st.median - ref) : 0)
    console.log(
      `render ${line.id} take ${take}: f0 ${st.median.toFixed(0)}Hz iqr ${st.iqr.toFixed(0)}Hz frames ${st.frames}` +
        (ref ? ` (ref ${ref.toFixed(0)}Hz, dev ${(dev * 100).toFixed(0)}%)` : "") +
        (pass ? " PASS" : " RETRY"),
    )
    if (!best || (pass && !best.pass) || (pass === best.pass && score < best.score)) {
      best = { buf, score, pass, st }
    }
    if (pass) break
  }
  if (!best.pass) console.warn(`WARN: ${line.id} best take still outside QA thresholds — human listen required`)
  writeFileSync(file, best.buf)
  refF0[who].push(best.st.median)
  qaReport.push({
    line: line.id,
    who,
    medianF0Hz: Math.round(best.st.median),
    iqrHz: Math.round(best.st.iqr),
    voicedFrames: best.st.frames,
    gatePassed: best.pass,
  })
  try {
    const transcript = await stt(file)
    const dist = wordDistance(normalizeWords(transcript), normalizeWords(line.tts))
    const distDisplay = wordDistance(normalizeWords(transcript), normalizeWords(line.display))
    sttReport.push({ line: line.id, transcript, wordDistanceVsTts: dist, wordDistanceVsDisplay: distDisplay })
    console.log(`stt    ${line.id}: dist ${dist} (vs tts) / ${distDisplay} (vs display) — "${transcript.slice(0, 80)}..."`)
  } catch (e) {
    /* Rule 6 still applies: an unavailable STT scope defers the round-trip,
       it does not waive it. Run scripts/stt-verify-callio-proof.mjs (or
       re-run with the scope enabled) before shipping. */
    sttReport.push({ line: line.id, error: String(e.message || e) })
    console.warn(`WARN stt ${line.id} unavailable: ${String(e.message || e).slice(0, 120)}`)
  }
  return file
}

/* Caller: rendered ONCE, reused in both tracks (rule 5 analogue: the shared
   caller is the same takes byte-for-byte at the take level). */
const callerFiles = []
for (let i = 0; i < CALLER_LINES.length; i++) {
  const prev = i > 0 ? CALLER_LINES[i - 1].tts : undefined
  const next = i < CALLER_LINES.length - 1 ? CALLER_LINES[i + 1].tts : undefined
  callerFiles.push(await renderLine(CALLER_LINES[i], "caller", CALLER_VOICE_ID, CALLER_SETTINGS, prev, next))
}

const agentFiles = { ungoverned: [], governed: [] }
for (const track of ["ungoverned", "governed"]) {
  const lines = AGENT_LINES[track]
  for (let i = 0; i < lines.length; i++) {
    const prev = i > 0 ? lines[i - 1].tts : undefined
    const next = i < lines.length - 1 ? lines[i + 1].tts : undefined
    agentFiles[track].push(await renderLine(lines[i], "agent", AGENT_VOICE_ID, AGENT_SETTINGS, prev, next))
  }
}

/* ── Loudness matching (review fix 2) ────────────────────────────────── */
const callerLoud = integratedLufs(callerFiles)
const callerGainDb = SPEAKER_TARGET_LUFS - callerLoud.lufs
const agentGainDb = {}
for (const track of ["ungoverned", "governed"]) {
  const l = integratedLufs(agentFiles[track])
  agentGainDb[track] = SPEAKER_TARGET_LUFS - l.lufs
  console.log(
    `loudness ${track}: caller ${callerLoud.lufs} LUFS (gain ${callerGainDb.toFixed(1)} dB), agent ${l.lufs} LUFS (gain ${agentGainDb[track].toFixed(1)} dB)`,
  )
}

/* ── Stitch per track ────────────────────────────────────────────────── */
const timings = {}
const stitchedLoudness = {}
for (const track of ["ungoverned", "governed"]) {
  const order = [
    { file: callerFiles[0], who: "caller", gainDb: callerGainDb, gapMs: GAP_CALLER_TO_AGENT_MS },
    { file: agentFiles[track][0], who: "agent", gainDb: agentGainDb[track], gapMs: GAP_AGENT_TO_CALLER_MS },
    { file: callerFiles[1], who: "caller", gainDb: callerGainDb, gapMs: GAP_CALLER_TO_AGENT_MS },
    { file: agentFiles[track][1], who: "agent", gainDb: agentGainDb[track], gapMs: GAP_AGENT_TO_CALLER_MS },
    { file: callerFiles[2], who: "caller", gainDb: callerGainDb, gapMs: GAP_CALLER_TO_AGENT_MS },
    { file: agentFiles[track][2], who: "agent", gainDb: agentGainDb[track], gapMs: 0 },
  ]
  const parts = []
  const filters = []
  order.forEach((c, i) => {
    parts.push("-i", c.file)
    const pad = i < order.length - 1 ? `,apad=pad_dur=${c.gapMs / 1000}` : ""
    filters.push(`[${i}:a]aresample=44100,volume=${c.gainDb.toFixed(2)}dB${pad}[a${i}]`)
  })
  /* level=0: alimiter's default auto-leveling gains the whole program up to
     the ceiling, defeating the loudness targets; disabled it only limits. */
  const graph = `${filters.join(";")};${order.map((_, i) => `[a${i}]`).join("")}concat=n=${order.length}:v=0:a=1[cat];[cat]alimiter=limit=${LIMITER_LINEAR}:level=0[out]`
  const stitched = path.join(OUT, `callio-proof-${track}.mp3`)
  execSync(
    [FFMPEG, "-y", ...parts, "-filter_complex", `"${graph}"`, "-map", '"[out]"', "-b:a", "128k", stitched].join(" "),
    { stdio: "inherit", shell: "/bin/bash" },
  )

  /* Per-line offsets for the player (durations of the source takes; gains
     do not change duration). */
  let t = 0
  timings[track] = order.map((c, i) => {
    const d = durationSec(c.file)
    const entry = { who: c.who, start: +t.toFixed(3), end: +(t + d).toFixed(3) }
    t += d + c.gapMs / 1000
    return entry
  })
  timings[track + "Duration"] = +durationSec(stitched).toFixed(3)

  stitchedLoudness[track] = integratedLufs([stitched])
  console.log(`stitched ${track}:`, JSON.stringify(stitchedLoudness[track]), `${timings[track + "Duration"]}s`)

  try {
    const transcript = await stt(stitched)
    sttReport.push({ line: `stitched-${track}`, transcript })
  } catch (e) {
    sttReport.push({ line: `stitched-${track}`, error: String(e.message || e) })
    console.warn(`WARN stt stitched-${track} unavailable`)
  }
}

/* ── Verify the review's acceptance numbers ──────────────────────────── */
for (const track of ["ungoverned", "governed"]) {
  const s = stitchedLoudness[track]
  const ok =
    Math.abs(s.lufs - SPEAKER_TARGET_LUFS) <= 1.5 && s.lra <= 8 && s.truePeakDb <= -1.0
  console.log(
    `${ok ? "OK  " : "WARN"} ${track}: program ${s.lufs} LUFS (target ${SPEAKER_TARGET_LUFS}), LRA ${s.lra} LU, TP ${s.truePeakDb} dBFS`,
  )
}
for (const who of ["agent", "caller"]) {
  const meds = qaReport.filter((r) => r.who === who).map((r) => r.medianF0Hz)
  console.log(`QA ${who}: medians ${meds.join("/")} Hz, spread ${Math.max(...meds) - Math.min(...meds)} Hz`)
}

/* ── Manifest (rule 7) ───────────────────────────────────────────────── */
const manifest = {
  generatedAt: new Date().toISOString(),
  piece: "Callio Proof in practice pair (ungoverned / governed)",
  outputs: ["callio-proof-ungoverned.mp3", "callio-proof-governed.mp3"],
  sharedCaller:
    "caller takes rendered once and stitched into both tracks; the agent response is the only variable",
  agent: {
    voiceId: AGENT_VOICE_ID,
    name: "Jessica Anne Bogart (same agent voice as the approved /agents demo call)",
    model: MODEL_ID,
    settingsSource:
      "voice_settings omitted per request; the voice's SAVED tuned settings (stability 0.43, style 0.55, speed 0.98 per scripts/generate-fs-demo-call.mjs) applied server-side — this key has no voices_read scope to fetch and echo them",
  },
  caller: {
    voiceId: CALLER_VOICE_ID,
    name: "Chris (ElevenLabs premade; same caller voice as the approved demo call)",
    model: MODEL_ID,
    settings: CALLER_SETTINGS,
  },
  gapMapMs: { callerToAgent: GAP_CALLER_TO_AGENT_MS, agentToCaller: GAP_AGENT_TO_CALLER_MS },
  loudness: {
    speakerTargetLufs: SPEAKER_TARGET_LUFS,
    callerGainDb: +callerGainDb.toFixed(2),
    agentGainDb: { ungoverned: +agentGainDb.ungoverned.toFixed(2), governed: +agentGainDb.governed.toFixed(2) },
    limiterCeilingDb: -1.5,
    stitched: stitchedLoudness,
  },
  acousticQa: {
    method:
      "median f0 + IQR per take (autocorrelation, 40ms frames/20ms hop, corr gate 0.6; band 120-350 Hz agent, 70-350 Hz caller — widened for low-pitched callers per the 2026-08-30 review); fresh takes gated at IQR <= 65 Hz and <= 12% median deviation; reference seeded from the approved fs-demo-call takes of the same two voices (this piece's first generation has no own approved takes; docs/voice-output-acoustic-qa.md rule 3 notes recorded here)",
    report: qaReport,
  },
  sttRoundTrip: {
    model: "scribe_v1",
    note: "wordDistance is Levenshtein over normalized word tokens vs the spoken-normalized text and vs the page display text; STT often inverse-normalizes numbers, so the MIN of the two distances is the meaningful one",
    report: sttReport,
  },
  timings,
}
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2))
writeFileSync(path.join(OUT, "timings.json"), JSON.stringify(timings, null, 2))
console.log("\nmanifest:", path.join(OUT, "manifest.json"))
console.log("LISTEN to both stitched files before shipping; then copy to public/audio/ and update CallioHearIt.tsx timings from timings.json")
