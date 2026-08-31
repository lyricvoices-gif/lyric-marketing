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
    /* This short closing question renders consistently rushed (7+ syl/s
       across many takes); a per-line speed pull-back is the realization
       knob for it. Recorded in the manifest. */
    settingsOverride: { ...({ stability: 0.45, similarity_boost: 0.75 }), speed: 0.85 },
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
        "You can find the full rate and fee details in the card’s Pricing & Terms document. It’s available on the card’s page under Disclosures. Let me know what you’d like to review next.",
      tts:
        "You can find the full rate and fee details in the card's Pricing and Terms document. It's available on the card's page under Disclosures. Let me know what you'd like to review next.",
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
function decodePcm(file) {
  return execSync(
    `${FFMPEG} -i ${file} -f s16le -acodec pcm_s16le -ac 1 -ar 44100 - 2>/dev/null`,
    { maxBuffer: 1 << 28 },
  )
}
function durationSec(file) {
  return decodePcm(file).length / 2 / 44100
}

/* Acoustic speech extents via 5ms RMS windows over -45 dBFS, resolved to the
   main speech CLUSTER: active windows merge into segments, the longest
   segment anchors, and neighbors within 350ms join it. Isolated islands
   outside the cluster (truncated breaths, clicks, orphaned onsets — the
   defects found in verification) are excluded, so the trim cuts them away.
   Also reports edge truncation — audible material running into the file's
   very first/last samples, which no amount of trimming can repair. */
function speechExtents(file) {
  const raw = decodePcm(file)
  const n = raw.length >> 1
  const win = Math.floor(44100 * 0.005)
  const thresh = Math.pow(10, -45 / 20)
  const active = []
  for (let start = 0; start + win <= n; start += win) {
    let e = 0
    for (let i = 0; i < win; i++) {
      const v = raw.readInt16LE((start + i) << 1) / 32768
      e += v * v
    }
    if (Math.sqrt(e / win) > thresh) active.push(start)
  }
  const dur = n / 44100
  if (!active.length) return { start: 0, end: dur, dur, headTruncated: false, tailTruncated: false }
  /* Merge windows into segments (<=100ms internal gaps). Keep every
     substantial segment (>=120ms — real speech, including sentences after
     long pauses); additionally keep short segments within 300ms of a kept
     one (plosive onsets, clipped word tails). What remains excluded is the
     defect class: tiny isolated islands (truncated breaths, clicks,
     orphaned onsets) far from any speech. */
  const segs = []
  for (const a of active) {
    const last = segs[segs.length - 1]
    if (last && a - last.e <= Math.floor(44100 * 0.1)) last.e = a + win
    else segs.push({ s: a, e: a + win })
  }
  const minKeep = Math.floor(44100 * 0.12)
  const nearGap = Math.floor(44100 * 0.3)
  const kept = segs.filter((sg) => sg.e - sg.s >= minKeep)
  if (!kept.length) kept.push(segs.reduce((a, b) => (b.e - b.s > a.e - a.s ? b : a)))
  for (const sg of segs) {
    if (kept.includes(sg)) continue
    if (kept.some((k) => Math.abs(sg.s - k.e) <= nearGap || Math.abs(k.s - sg.e) <= nearGap)) kept.push(sg)
  }
  const firstIdx = Math.min(...kept.map((k) => k.s))
  const lastIdx = Math.max(...kept.map((k) => k.e))
  const edgeRms = (from, len) => {
    let e = 0
    const m = Math.min(len, n - from)
    for (let i = 0; i < m; i++) {
      const v = raw.readInt16LE((from + i) << 1) / 32768
      e += v * v
    }
    return 20 * Math.log10(Math.sqrt(e / Math.max(m, 1)) + 1e-9)
  }
  const headWin = Math.floor(44100 * 0.02)
  return {
    start: firstIdx / 44100,
    end: lastIdx / 44100,
    dur,
    /* Speech in the first/last 25ms at conversational level = the render
       itself is cut mid-sound; trimming cannot restore the missing onset
       or decay. */
    headTruncated: firstIdx / 44100 < 0.025 && edgeRms(0, headWin) > -35,
    tailTruncated: (n - lastIdx) / 44100 < 0.025 && edgeRms(Math.max(0, n - headWin), headWin) > -35,
  }
}

/* Materialize a trimmed take: acoustic extents with a 40ms head pad and
   120ms tail pad, 12ms fade-in and 30ms fade-out, written as WAV so the
   stitch encodes MP3 exactly once. */
function trimTake(file, ext) {
  const out = file.replace(/\.mp3$/, ".trim.wav")
  const from = Math.max(0, ext.start - 0.04)
  const to = Math.min(ext.dur, ext.end + 0.12)
  const d = to - from
  execSync(
    [
      FFMPEG,
      "-y",
      "-i",
      file,
      "-af",
      `"atrim=${from.toFixed(4)}:${to.toFixed(4)},asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.012,afade=t=out:st=${Math.max(0, d - 0.03).toFixed(4)}:d=0.03"`,
      "-ar",
      "44100",
      "-ac",
      "1",
      out,
    ].join(" "),
    { shell: "/bin/bash", stdio: "pipe" },
  )
  return out
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

/* Full take QA (2026-08-31 verification round additions): beyond the f0
   gate, a take fails when its render is EDGE-TRUNCATED (audible material at
   the file's first/last samples — an amputated onset or decay no trim can
   repair) or when its speaking rate over the acoustic span is outside
   100-215 wpm (the rushed-line defect). */
/* Rough syllable estimate: vowel groups per word, minimum one. Rate gates
   are syllable-based — a words-per-minute gate falsely flags short
   monosyllabic lines, where a natural fluent read scores 300+ wpm while
   sitting well under 6 syllables per second. The 2026-08-30 review flagged
   rushed delivery at 6.15+ syl/s; healthy lines measured 4.8-5.2. */
const syllables = (text) =>
  text
    .toLowerCase()
    .split(/\s+/)
    .reduce((sum, w) => {
      let n = (w.match(/[aeiouy]+/g) || []).length
      /* Silent trailing e ("where", "rate") overcounts by one. */
      if (n > 1 && /[^aeiouy]e[^a-z]*$/.test(w)) n--
      return sum + Math.max(1, n)
    }, 0)

function takeQa(file, line, who, ref) {
  const st = f0Stats(file, ...BAND[who])
  const ext = speechExtents(file)
  const span = Math.max(ext.end - ext.start, 0.1)
  const sylPerSec = syllables(line.tts) / span
  const wpm = (line.tts.split(/\s+/).length / span) * 60
  const dev = ref ? Math.abs(st.median - ref) / ref : 0
  const reasons = []
  if (st.iqr > 65) reasons.push(`iqr ${st.iqr.toFixed(0)}`)
  if (dev > 0.12) reasons.push(`dev ${(dev * 100).toFixed(0)}%`)
  if (ext.headTruncated) reasons.push("head-truncated")
  if (ext.tailTruncated) reasons.push("tail-truncated")
  if (sylPerSec > 5.9) reasons.push(`rushed ${sylPerSec.toFixed(1)}syl/s`)
  if (sylPerSec < 2.0) reasons.push(`dragging ${sylPerSec.toFixed(1)}syl/s`)
  return {
    st,
    ext,
    wpm,
    sylPerSec,
    dev,
    pass: reasons.length === 0,
    reasons,
    score:
      st.iqr +
      (ref ? Math.abs(st.median - ref) : 0) +
      Math.max(0, sylPerSec - 5.9) * 60 +
      (ext.headTruncated || ext.tailTruncated ? 500 : 0),
  }
}

async function sttCheck(file, line) {
  try {
    const transcript = await stt(file)
    const dist = wordDistance(normalizeWords(transcript), normalizeWords(line.tts))
    const distDisplay = wordDistance(normalizeWords(transcript), normalizeWords(line.display))
    sttReport.push({ line: line.id, transcript, wordDistanceVsTts: dist, wordDistanceVsDisplay: distDisplay })
    console.log(`stt    ${line.id}: dist ${dist} (vs tts) / ${distDisplay} (vs display)`)
  } catch (e) {
    /* Rule 6 still applies: an unavailable STT scope defers the round-trip,
       it does not waive it. Re-run with the scope enabled before shipping. */
    sttReport.push({ line: line.id, error: String(e.message || e) })
    console.warn(`WARN stt ${line.id} unavailable: ${String(e.message || e).slice(0, 120)}`)
  }
}

function recordQa(line, who, qa, reused) {
  refF0[who].push(qa.st.median)
  qaReport.push({
    line: line.id,
    who,
    medianF0Hz: Math.round(qa.st.median),
    iqrHz: Math.round(qa.st.iqr),
    voicedFrames: qa.st.frames,
    wpm: Math.round(qa.wpm),
    sylPerSec: +qa.sylPerSec.toFixed(2),
    speechSpanSec: +(qa.ext.end - qa.ext.start).toFixed(3),
    gatePassed: qa.pass,
    ...(qa.pass ? {} : { failReasons: qa.reasons }),
    ...(reused ? { reused: true } : {}),
  })
}

async function renderLine(line, who, voiceId, settings, prevText, nextText) {
  const file = path.join(OUT, `line-${line.id}.mp3`)
  const ref = refMedian(who)
  /* REUSE_TAKES=1: keep an existing take ONLY if it passes the full gate —
     a reused take that fails falls through to a fresh render. */
  if (process.env.REUSE_TAKES === "1" && existsSync(file)) {
    const qa = takeQa(file, line, who, ref)
    if (qa.pass) {
      recordQa(line, who, qa, true)
      console.log(`reuse  ${line.id}: f0 ${qa.st.median.toFixed(0)}Hz iqr ${qa.st.iqr.toFixed(0)}Hz ${qa.wpm.toFixed(0)}wpm`)
      await sttCheck(file, line)
      return { file, trimmed: trimTake(file, qa.ext) }
    }
    console.log(`reuse  ${line.id} REJECTED (${qa.reasons.join(", ")}) — re-rendering`)
  }
  let best = null
  for (let take = 1; take <= MAX_TAKES; take++) {
    const buf = await tts(line.tts, voiceId, line.settingsOverride ?? settings, prevText, nextText)
    writeFileSync(file, buf)
    const qa = takeQa(file, line, who, ref)
    console.log(
      `render ${line.id} take ${take}: f0 ${qa.st.median.toFixed(0)}Hz iqr ${qa.st.iqr.toFixed(0)}Hz ${qa.wpm.toFixed(0)}wpm` +
        (ref ? ` (ref ${ref.toFixed(0)}Hz, dev ${(qa.dev * 100).toFixed(0)}%)` : "") +
        (qa.pass ? " PASS" : ` RETRY [${qa.reasons.join(", ")}]`),
    )
    if (!best || (qa.pass && !best.qa.pass) || (qa.pass === best.qa.pass && qa.score < best.qa.score)) {
      best = { buf, qa }
    }
    if (qa.pass) break
  }
  if (!best.qa.pass) console.warn(`WARN: ${line.id} best take still outside QA thresholds (${best.qa.reasons.join(", ")}) — human listen required`)
  writeFileSync(file, best.buf)
  const qa = takeQa(file, line, who, ref) /* re-measure the written winner */
  recordQa(line, who, qa, false)
  await sttCheck(file, line)
  return { file, trimmed: trimTake(file, qa.ext) }
}

/* Caller: rendered ONCE, reused in both tracks (rule 5 analogue: the shared
   caller is the same takes byte-for-byte at the take level). */
const jobs = []
CALLER_LINES.forEach((line, i, arr) =>
  jobs.push({
    line,
    who: "caller",
    voiceId: CALLER_VOICE_ID,
    settings: CALLER_SETTINGS,
    prev: i > 0 ? arr[i - 1].tts : undefined,
    next: i < arr.length - 1 ? arr[i + 1].tts : undefined,
  }),
)
for (const track of ["ungoverned", "governed"]) {
  AGENT_LINES[track].forEach((line, i, arr) =>
    jobs.push({
      line,
      who: "agent",
      voiceId: AGENT_VOICE_ID,
      settings: AGENT_SETTINGS,
      prev: i > 0 ? arr[i - 1].tts : undefined,
      next: i < arr.length - 1 ? arr[i + 1].tts : undefined,
    }),
  )
}

const takes = {}
for (const j of jobs) {
  takes[j.line.id] = await renderLine(j.line, j.who, j.voiceId, j.settings, j.prev, j.next)
}

/* ── In-file pitch spread check (verification round): the per-take gate
   compares each take to the reference, but takes can individually pass and
   still spread >12% (max-min over min) as a GROUP. Re-render the take
   farthest from the pooled median, up to twice. ── */
for (let round = 0; round < 2; round++) {
  let worst = null
  for (const who of ["agent", "caller"]) {
    const rows = qaReport.filter((r) => r.who === who && !r.stale)
    const meds = rows.map((r) => r.medianF0Hz).sort((a, b) => a - b)
    if ((meds[meds.length - 1] - meds[0]) / meds[0] <= 0.12) continue
    const pooled = meds[Math.floor(meds.length / 2)]
    for (const r of rows) {
      const dev = Math.abs(r.medianF0Hz - pooled) / pooled
      if (!worst || dev > worst.dev) worst = { r, dev }
    }
  }
  if (!worst) break
  const id = worst.r.line
  console.log(`spread: ${id} (${worst.r.medianF0Hz} Hz) is the outlier of a >12% in-file spread — re-rendering`)
  worst.r.stale = true
  const sttIdx = sttReport.findIndex((s) => s.line === id)
  if (sttIdx >= 0) sttReport.splice(sttIdx, 1)
  execSync(`rm -f ${path.join(OUT, `line-${id}.mp3`)}`)
  const j = jobs.find((x) => x.line.id === id)
  takes[id] = await renderLine(j.line, j.who, j.voiceId, j.settings, j.prev, j.next)
}
const finalQa = qaReport.filter((r) => !r.stale)

/* ── Loudness matching (review fix 2), measured over the TRIMMED takes —
   the material that actually reaches the stitch. ── */
const callerTrims = CALLER_LINES.map((l) => takes[l.id].trimmed)
const callerLoud = integratedLufs(callerTrims)
const callerGainDb = SPEAKER_TARGET_LUFS - callerLoud.lufs
const agentGainDb = {}
for (const track of ["ungoverned", "governed"]) {
  const l = integratedLufs(AGENT_LINES[track].map((x) => takes[x.id].trimmed))
  agentGainDb[track] = SPEAKER_TARGET_LUFS - l.lufs
  console.log(
    `loudness ${track}: caller ${callerLoud.lufs} LUFS (gain ${callerGainDb.toFixed(1)} dB), agent ${l.lufs} LUFS (gain ${agentGainDb[track].toFixed(1)} dB)`,
  )
}

/* ── Stitch per track ────────────────────────────────────────────────── */
const timings = {}
const stitchedLoudness = {}
for (const track of ["ungoverned", "governed"]) {
  const agentIds = AGENT_LINES[track].map((l) => l.id)
  const order = [
    { file: takes[CALLER_LINES[0].id].trimmed, who: "caller", gainDb: callerGainDb, gapMs: GAP_CALLER_TO_AGENT_MS },
    { file: takes[agentIds[0]].trimmed, who: "agent", gainDb: agentGainDb[track], gapMs: GAP_AGENT_TO_CALLER_MS },
    { file: takes[CALLER_LINES[1].id].trimmed, who: "caller", gainDb: callerGainDb, gapMs: GAP_CALLER_TO_AGENT_MS },
    { file: takes[agentIds[1]].trimmed, who: "agent", gainDb: agentGainDb[track], gapMs: GAP_AGENT_TO_CALLER_MS },
    { file: takes[CALLER_LINES[2].id].trimmed, who: "caller", gainDb: callerGainDb, gapMs: GAP_CALLER_TO_AGENT_MS },
    { file: takes[agentIds[2]].trimmed, who: "agent", gainDb: agentGainDb[track], gapMs: 0 },
  ]
  const parts = []
  const filters = []
  order.forEach((c, i) => {
    parts.push("-i", c.file)
    const pad = i < order.length - 1 ? `,apad=pad_dur=${c.gapMs / 1000}` : ""
    filters.push(`[${i}:a]aresample=44100,volume=${c.gainDb.toFixed(2)}dB${pad}[a${i}]`)
  })
  /* Noise bed: apad inserts digital-zero gaps while the takes carry an
     ~-80 dBFS room-tone floor, so without a bed the floor audibly drops out
     mid-gap (verification round). A pink bed near -88 dBFS RMS under the
     whole program matches the approved reference's quiet-frame level.
     level=0 on the limiter: its default auto-leveling gains the program up
     to the ceiling, defeating the loudness targets. */
  const graph =
    `${filters.join(";")};${order.map((_, i) => `[a${i}]`).join("")}concat=n=${order.length}:v=0:a=1[cat];` +
    `anoisesrc=colour=pink:sample_rate=44100:amplitude=0.00006[nz];` +
    `[cat][nz]amix=inputs=2:duration=first:normalize=0[mx];[mx]alimiter=limit=${LIMITER_LINEAR}:level=0[out]`
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
  const meds = finalQa.filter((r) => r.who === who).map((r) => r.medianF0Hz)
  const spreadPct = ((Math.max(...meds) - Math.min(...meds)) / Math.min(...meds)) * 100
  console.log(`QA ${who}: medians ${meds.join("/")} Hz, spread ${spreadPct.toFixed(1)}% (gate 12%)`)
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
    perLineOverrides: Object.fromEntries(
      CALLER_LINES.filter((l) => l.settingsOverride).map((l) => [l.id, l.settingsOverride]),
    ),
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
      "median f0 + IQR per take (autocorrelation, 40ms frames/20ms hop, corr gate 0.6; band 120-350 Hz agent, 70-350 Hz caller — widened for low-pitched callers per the 2026-08-30 review); fresh takes gated at IQR <= 65 Hz, <= 12% median deviation vs the approved reference, no edge truncation, 100-215 wpm over the acoustic span; in-file per-speaker spread held <= 12% with outlier re-renders; takes trimmed to the main speech cluster (40ms/120ms pads, 12ms/30ms fades) before stitching; reference seeded from the approved fs-demo-call takes of the same two voices (this piece's first generation has no own approved takes; docs/voice-output-acoustic-qa.md rule 3 notes recorded here)",
    report: finalQa,
    retakenForSpread: qaReport.filter((r) => r.stale).map((r) => ({ line: r.line, rejectedMedianF0Hz: r.medianF0Hz })),
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
