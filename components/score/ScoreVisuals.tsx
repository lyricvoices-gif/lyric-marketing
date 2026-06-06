/* Score micrographics — data-visualization quality SVGs for the Score
   page. The vocabulary is borrowed from real speech/audio research
   tools (session waveforms, valence/arousal scatter, fundamental
   frequency contours, stacked pitch traces) and rendered in Lyric's
   restrained palette: olive ground, cream traces, sage and gold as
   accent. Stroke weights stay thin (0.6–1.4px) so the visuals read as
   instruments, not illustrations. Motion is whisper-quiet and gated
   by prefers-reduced-motion via .lv-score-* classes in globals.css. */

import React from "react"

const OLIVE = "#5A5E43"
const SAGE = "#C1C17E"
const GOLD = "#c9a96e"
const CREAM = "#FFF8EC"

/* ─── Shared chrome ────────────────────────────────────────────────
   A common frame for every dataset micrographic: a wide rectangular
   plot area with faint corner ticks, a tiny axis label in the lower
   left, and an optional value readout in the upper right. This is
   what makes them feel like real instrument readouts rather than
   decorative shapes. */
function PlotChrome({
  label,
  readout,
}: {
  label: string
  readout?: string
}) {
  return (
    <g aria-hidden="true">
      {/* Corner ticks (top-left, top-right, bottom-left, bottom-right) */}
      <g stroke={CREAM} strokeOpacity={0.32} strokeWidth={0.6} strokeLinecap="round">
        <line x1="6" y1="6" x2="14" y2="6" />
        <line x1="6" y1="6" x2="6" y2="14" />
        <line x1="194" y1="6" x2="186" y2="6" />
        <line x1="194" y1="6" x2="194" y2="14" />
        <line x1="6" y1="154" x2="14" y2="154" />
        <line x1="6" y1="154" x2="6" y2="146" />
        <line x1="194" y1="154" x2="186" y2="154" />
        <line x1="194" y1="154" x2="194" y2="146" />
      </g>
      {/* Tiny axis label, lower left */}
      <text
        x="6"
        y="166"
        fontFamily="var(--font-body)"
        fontSize="6"
        fontWeight="600"
        letterSpacing="0.18em"
        fill={CREAM}
        fillOpacity={0.55}
      >
        {label}
      </text>
      {readout && (
        <text
          x="194"
          y="166"
          textAnchor="end"
          fontFamily="var(--font-body)"
          fontSize="6"
          fontWeight="500"
          letterSpacing="0.16em"
          fill={CREAM}
          fillOpacity={0.55}
        >
          {readout}
        </text>
      )}
    </g>
  )
}

/* ─── Dataset 01 — Anchor ──────────────────────────────────────────
   Audio session waveform with peak envelope. Eighty vertical bars
   draw the peak shape (top + bottom mirrored), with a thin RMS curve
   threaded through the centerline in sage. Reads as a session
   inspector — the reference take, made literal. */
export function AnchorVisual() {
  /* Hand-tuned envelope: opening attack, sustained middle phrase,
     short pause, closing tail. The shape is a real-feeling speech
     envelope, not a sine wave. */
  const envelope = [
    /* attack */
    0.08, 0.14, 0.22, 0.32, 0.46, 0.58, 0.62, 0.55,
    /* phrase 1 */
    0.68, 0.74, 0.7, 0.78, 0.82, 0.76, 0.72, 0.78, 0.84, 0.88, 0.82, 0.76,
    /* dip */
    0.62, 0.5, 0.4, 0.34, 0.42, 0.5,
    /* phrase 2 */
    0.6, 0.72, 0.8, 0.86, 0.9, 0.84, 0.78, 0.82, 0.86, 0.8, 0.72, 0.66,
    /* pause */
    0.32, 0.18, 0.1, 0.06, 0.12, 0.22,
    /* phrase 3 */
    0.4, 0.56, 0.68, 0.76, 0.82, 0.78, 0.7, 0.74, 0.78, 0.72,
    /* tail */
    0.58, 0.46, 0.36, 0.28, 0.2, 0.14, 0.1, 0.06,
  ]
  const N = envelope.length
  const left = 14
  const right = 186
  const cx = (left + right) / 2
  const mid = 78
  const span = (right - left) / N

  /* RMS curve threaded through the envelope: a low-pass version of
     the same shape, drawn as a smooth path. */
  const rmsPath = (() => {
    const pts: string[] = []
    for (let i = 0; i < N; i++) {
      const x = left + span * (i + 0.5)
      const e = envelope[i]
      const y = mid - e * 12
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`)
    }
    return `M ${pts.join(" L ")}`
  })()

  return (
    <svg
      viewBox="0 0 200 170"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="lv-score-microviz lv-score-microviz-anchor"
    >
      {/* Faint baseline */}
      <line
        x1={left}
        y1={mid}
        x2={right}
        y2={mid}
        stroke={CREAM}
        strokeOpacity={0.18}
        strokeWidth={0.6}
      />

      {/* Waveform peak bars (top + bottom mirrored) */}
      <g>
        {envelope.map((e, i) => {
          const x = left + span * i + span * 0.5
          const h = e * 36
          const isAnchor = i === Math.floor(N / 2)
          return (
            <line
              key={i}
              x1={x}
              y1={mid - h}
              x2={x}
              y2={mid + h}
              stroke={isAnchor ? SAGE : CREAM}
              strokeOpacity={isAnchor ? 0.95 : 0.62}
              strokeWidth={isAnchor ? 1.2 : 0.9}
              strokeLinecap="round"
            />
          )
        })}
      </g>

      {/* RMS contour through the centerline */}
      <path
        d={rmsPath}
        fill="none"
        stroke={SAGE}
        strokeOpacity={0.6}
        strokeWidth={0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lv-score-anchor-rms"
      />

      {/* Center alignment marker — the "take" cue */}
      <g className="lv-score-anchor-cue">
        <line x1={cx} y1={mid - 28} x2={cx} y2={mid + 28} stroke={GOLD} strokeOpacity={0.7} strokeWidth={0.7} strokeDasharray="2 2" />
        <circle cx={cx} cy={mid} r="2" fill={GOLD} />
      </g>

      <PlotChrome label="ANCHOR · TAKE 03" readout="00 : 24" />
    </svg>
  )
}

/* ─── Dataset 02 — Spectrum ────────────────────────────────────────
   Valence × arousal scatter — the canonical 2D affect plot from
   emotion research. Axes are quiet hairlines, dots are scattered in
   the four quadrants, color-coded sage (low arousal) to gold (high
   arousal). One cream dot marks the centroid. Tiny quadrant labels
   in the corners ground the plot. */
export function SpectrumVisual() {
  const left = 16
  const right = 184
  const top = 12
  const bottom = 138
  const cx = (left + right) / 2
  const cy = (top + bottom) / 2

  /* Hand-placed dots so the clusters read intentional, not random.
     Quadrant convention: top = high arousal, right = positive valence. */
  const dots = [
    /* Top-right (bright / active) */
    { x: 0.62, y: 0.18, r: 1.6, c: GOLD, o: 0.95 },
    { x: 0.7, y: 0.26, r: 2.2, c: GOLD, o: 0.85 },
    { x: 0.78, y: 0.34, r: 1.4, c: GOLD, o: 0.75 },
    { x: 0.84, y: 0.22, r: 1.2, c: GOLD, o: 0.65 },
    /* Top-left (urgent / negative) */
    { x: 0.32, y: 0.2, r: 1.4, c: GOLD, o: 0.5 },
    { x: 0.22, y: 0.3, r: 1.2, c: GOLD, o: 0.4 },
    { x: 0.18, y: 0.42, r: 1.6, c: CREAM, o: 0.4 },
    /* Center (composed) */
    { x: 0.5, y: 0.5, r: 2.8, c: CREAM, o: 0.95 },
    { x: 0.46, y: 0.46, r: 1.4, c: CREAM, o: 0.55 },
    { x: 0.56, y: 0.54, r: 1.2, c: CREAM, o: 0.45 },
    /* Bottom-right (warm / calm) */
    { x: 0.6, y: 0.66, r: 1.8, c: SAGE, o: 0.95 },
    { x: 0.7, y: 0.74, r: 2.2, c: SAGE, o: 0.85 },
    { x: 0.78, y: 0.62, r: 1.4, c: SAGE, o: 0.7 },
    { x: 0.66, y: 0.82, r: 1.2, c: SAGE, o: 0.55 },
    /* Bottom-left (intimate / low) */
    { x: 0.3, y: 0.74, r: 1.6, c: SAGE, o: 0.7 },
    { x: 0.22, y: 0.66, r: 1.2, c: SAGE, o: 0.55 },
    { x: 0.18, y: 0.82, r: 1.8, c: SAGE, o: 0.45 },
    { x: 0.36, y: 0.86, r: 1.2, c: SAGE, o: 0.4 },
  ]

  return (
    <svg
      viewBox="0 0 200 170"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="lv-score-microviz lv-score-microviz-spectrum"
    >
      {/* Axes */}
      <line x1={left} y1={cy} x2={right} y2={cy} stroke={CREAM} strokeOpacity={0.18} strokeWidth={0.6} />
      <line x1={cx} y1={top} x2={cx} y2={bottom} stroke={CREAM} strokeOpacity={0.18} strokeWidth={0.6} />

      {/* Faint quadrant labels — tiny, in the corners */}
      <g
        fontFamily="var(--font-body)"
        fontSize="5.4"
        fontWeight="600"
        letterSpacing="0.18em"
        fill={CREAM}
        fillOpacity={0.42}
      >
        <text x={right - 2} y={top + 6} textAnchor="end">BRIGHT</text>
        <text x={left + 2} y={top + 6}>URGENT</text>
        <text x={right - 2} y={bottom - 2} textAnchor="end">WARM</text>
        <text x={left + 2} y={bottom - 2}>INTIMATE</text>
      </g>

      {/* Scatter */}
      <g>
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={left + (right - left) * d.x}
            cy={top + (bottom - top) * d.y}
            r={d.r}
            fill={d.c}
            fillOpacity={d.o}
          />
        ))}
      </g>

      {/* Centroid ring (the "imprint center" pulse) */}
      <circle
        cx={cx}
        cy={cy}
        r="9"
        fill="none"
        stroke={CREAM}
        strokeOpacity={0.32}
        strokeWidth={0.6}
        className="lv-score-spectrum-ring"
      />

      <PlotChrome label="VALENCE × AROUSAL" readout="N = 27" />
    </svg>
  )
}

/* ─── Dataset 03 — Cadence ─────────────────────────────────────────
   Pitch contour (fundamental frequency) over time, with breath marks
   and an intensity histogram in the lower band. The aesthetic borrows
   from speech-analysis tools (Praat, etc.) but in Lyric's palette.
   The contour drifts left at a very slow rate. */
export function CadenceVisual() {
  const left = 12
  const right = 188
  const W = right - left

  /* Build a smooth pitch contour: a stylized phrase rising then
     falling, with a hesitation in the middle. Drawn at 2x width so
     the marquee can translate -50% for a seamless loop. */
  const buildContour = (offset: number) => {
    const pts: string[] = []
    const samples = 200
    for (let i = 0; i <= samples; i++) {
      const t = i / samples
      const x = left + W * t * 2 + offset
      // Phrase: rise–fall–hesitation–rise–fall
      const base =
        Math.sin(t * Math.PI * 1.6) * 0.6 +
        Math.sin(t * Math.PI * 4.2 + 0.4) * 0.18 +
        Math.cos(t * Math.PI * 2.4) * 0.16
      const y = 58 + base * 18
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`)
    }
    return `M ${pts.join(" L ")}`
  }

  /* Intensity histogram (lower band) — short vertical bars that
     also drift. */
  const bars: number[] = []
  for (let i = 0; i < 64; i++) {
    const t = i / 64
    const h =
      4 +
      Math.abs(Math.sin(t * Math.PI * 3.2)) * 9 +
      Math.abs(Math.cos(t * Math.PI * 5.6)) * 4
    bars.push(h)
  }

  /* Breath marks — vertical hairline ticks at notable points */
  const breaths = [0.22, 0.48, 0.74]

  return (
    <svg
      viewBox="0 0 200 170"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="lv-score-microviz lv-score-microviz-cadence"
    >
      {/* Faint horizontal grid in the pitch band */}
      {[34, 58, 82].map(y => (
        <line
          key={y}
          x1={left}
          y1={y}
          x2={right}
          y2={y}
          stroke={CREAM}
          strokeOpacity={0.12}
          strokeWidth={0.5}
        />
      ))}

      {/* Pitch contour group — drifts left */}
      <g className="lv-score-cadence-contour">
        <path
          d={buildContour(0)}
          fill="none"
          stroke={CREAM}
          strokeOpacity={0.88}
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Breath marks */}
      <g>
        {breaths.map((b, i) => {
          const x = left + W * b
          return (
            <line
              key={i}
              x1={x}
              y1={32}
              x2={x}
              y2={86}
              stroke={GOLD}
              strokeOpacity={0.55}
              strokeWidth={0.6}
              strokeDasharray="1.5 2"
            />
          )
        })}
      </g>

      {/* Lower band — intensity histogram */}
      <g className="lv-score-cadence-bars">
        {[...bars, ...bars].map((h, i) => {
          const x = left + i * 2.75
          return (
            <rect
              key={i}
              x={x}
              y={138 - h}
              width="1.2"
              height={h}
              rx="0.6"
              fill={SAGE}
              fillOpacity={0.55}
            />
          )
        })}
      </g>

      {/* Divider between pitch band and intensity band */}
      <line
        x1={left}
        y1={108}
        x2={right}
        y2={108}
        stroke={CREAM}
        strokeOpacity={0.18}
        strokeWidth={0.5}
      />

      <PlotChrome label="F₀ · INTENSITY" readout="44.1 kHz" />
    </svg>
  )
}

/* ─── Dataset 04 — Choir ───────────────────────────────────────────
   Three pitch contours stacked at distinct vocal registers (soprano /
   alto / baritone), drawn at slightly different phases so they read
   as three voices in conversation. Faint vertical "measure lines"
   ground the temporal axis. */
export function ChoirVisual() {
  const left = 14
  const right = 186
  const W = right - left

  const buildWave = (phase: number, amp: number, yMid: number) => {
    const pts: string[] = []
    const samples = 120
    for (let i = 0; i <= samples; i++) {
      const t = i / samples
      const x = left + W * t
      const y =
        yMid +
        Math.sin(t * Math.PI * 3.2 + phase) * amp +
        Math.sin(t * Math.PI * 6.4 + phase * 0.7) * (amp * 0.25)
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`)
    }
    return `M ${pts.join(" L ")}`
  }

  /* Vertical "measure" lines */
  const measures = [0.2, 0.4, 0.6, 0.8]

  return (
    <svg
      viewBox="0 0 200 170"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="lv-score-microviz lv-score-microviz-choir"
    >
      {/* Register baselines — three faint horizontal rules */}
      {[32, 78, 124].map((y, i) => (
        <line
          key={i}
          x1={left}
          y1={y}
          x2={right}
          y2={y}
          stroke={CREAM}
          strokeOpacity={0.14}
          strokeWidth={0.5}
        />
      ))}

      {/* Measure lines */}
      {measures.map((m, i) => {
        const x = left + W * m
        return (
          <line
            key={i}
            x1={x}
            y1={20}
            x2={x}
            y2={136}
            stroke={CREAM}
            strokeOpacity={0.1}
            strokeWidth={0.5}
            strokeDasharray="1 2"
          />
        )
      })}

      {/* Three voice contours */}
      <g className="lv-score-choir-wave lv-score-choir-wave-a">
        <path d={buildWave(0, 12, 32)} fill="none" stroke={GOLD} strokeOpacity={0.9} strokeWidth={1.1} strokeLinecap="round" />
      </g>
      <g className="lv-score-choir-wave lv-score-choir-wave-b">
        <path d={buildWave(1.6, 14, 78)} fill="none" stroke={CREAM} strokeOpacity={0.78} strokeWidth={1.1} strokeLinecap="round" />
      </g>
      <g className="lv-score-choir-wave lv-score-choir-wave-c">
        <path d={buildWave(3.1, 12, 124)} fill="none" stroke={SAGE} strokeOpacity={0.88} strokeWidth={1.1} strokeLinecap="round" />
      </g>

      {/* Voice labels — tiny, on the right edge */}
      <g
        fontFamily="var(--font-body)"
        fontSize="5.4"
        fontWeight="600"
        letterSpacing="0.18em"
        fill={CREAM}
        fillOpacity={0.5}
      >
        <text x={right - 2} y={28} textAnchor="end">V · I</text>
        <text x={right - 2} y={74} textAnchor="end">V · II</text>
        <text x={right - 2} y={120} textAnchor="end">V · III</text>
      </g>

      <PlotChrome label="ENSEMBLE · 3-VOICE" readout="STEMS" />
    </svg>
  )
}

/* ─── Methodology step icons ───────────────────────────────────────
   Refined, considered marks for the cream-ground methodology lane.
   Each is a small editorial glyph at 48px square, drawn in olive +
   sage. The shapes are deliberately diagrammatic rather than
   pictorial — they read as marks made for a process diagram. */

const StepBox = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="lv-score-stepicon"
  >
    {children}
  </svg>
)

/* i — Direct: a conductor's gesture line. Curved bezier with an
   arrowhead, starting from a small origin dot. Reads as direction /
   intent. */
export function StepDirectVisual() {
  return (
    <StepBox>
      <circle cx="10" cy="34" r="1.6" fill={OLIVE} />
      <path
        d="M 10 34 C 16 14, 30 12, 36 24"
        fill="none"
        stroke={OLIVE}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M 36 24 L 33 20 M 36 24 L 37 18.5"
        fill="none"
        stroke={SAGE}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </StepBox>
  )
}

/* ii — Record: a refined mic-capsule diagram. Outer ring + inner
   capsule + a single axial tick at top indicating the diaphragm
   orientation. */
export function StepRecordVisual() {
  return (
    <StepBox>
      <circle cx="24" cy="24" r="13" fill="none" stroke={OLIVE} strokeOpacity={0.45} strokeWidth="1" />
      <circle cx="24" cy="24" r="8" fill="none" stroke={OLIVE} strokeWidth="1.2" />
      {/* Capsule cross-hatch (diaphragm hint) */}
      <line x1="18" y1="24" x2="30" y2="24" stroke={OLIVE} strokeOpacity={0.55} strokeWidth="0.7" />
      <line x1="24" y1="18" x2="24" y2="30" stroke={OLIVE} strokeOpacity={0.55} strokeWidth="0.7" />
      {/* Axial indicator */}
      <line x1="24" y1="6" x2="24" y2="10" stroke={SAGE} strokeWidth="1.4" strokeLinecap="round" />
    </StepBox>
  )
}

/* iii — Annotate: a short waveform with a single annotated take —
   one bar in sage, with a small tag glyph above it (line + dot). */
export function StepAnnotateVisual() {
  const heights = [4, 8, 12, 16, 12, 18, 10, 14, 6]
  return (
    <StepBox>
      {heights.map((h, i) => {
        const x = 8 + i * 4
        const tagged = i === 4
        return (
          <line
            key={i}
            x1={x}
            y1={24 - h / 2}
            x2={x}
            y2={24 + h / 2}
            stroke={tagged ? SAGE : OLIVE}
            strokeOpacity={tagged ? 1 : 0.6}
            strokeWidth={tagged ? 1.4 : 0.9}
            strokeLinecap="round"
          />
        )
      })}
      {/* Tag for the highlighted bar */}
      <line x1="24" y1="8" x2="24" y2="14" stroke={OLIVE} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="24" y1="8" x2="32" y2="8" stroke={OLIVE} strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="33" cy="8" r="1.3" fill={SAGE} />
    </StepBox>
  )
}

/* iv — Verify: a signature line. Horizontal baseline with a small
   script-style flourish above it ending in a sage dot — the sign-off
   mark. Replaces the previous checkmark, which didn't carry the
   right meaning for "consent + provenance sign-off." */
export function StepVerifyVisual() {
  return (
    <StepBox>
      {/* Signature baseline */}
      <line
        x1="10"
        y1="32"
        x2="38"
        y2="32"
        stroke={OLIVE}
        strokeOpacity={0.5}
        strokeWidth="0.8"
      />
      {/* Signature flourish above the baseline */}
      <path
        d="M 11 28 C 14 18, 18 22, 21 24 S 26 18, 30 24 C 32 27, 34 23, 36 25"
        fill="none"
        stroke={OLIVE}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* End-of-signature sign-off dot */}
      <circle cx="37" cy="25" r="1.6" fill={SAGE} />
      {/* Subtle date tick under the baseline */}
      <line x1="30" y1="36" x2="38" y2="36" stroke={OLIVE} strokeOpacity={0.32} strokeWidth="0.6" strokeLinecap="round" />
    </StepBox>
  )
}

/* v — Compose: three stacked track segments aligning at a vertical
   "now" line — reads as multitrack assembly. */
export function StepComposeVisual() {
  return (
    <StepBox>
      {/* Three track rows */}
      {[14, 24, 34].map((y, i) => (
        <rect
          key={y}
          x="10"
          y={y - 1.5}
          width="28"
          height="3"
          rx="1.5"
          fill={OLIVE}
          fillOpacity={0.22 + i * 0.06}
        />
      ))}
      {/* Filled "performance" segment on each track */}
      <rect x="12" y="12.5" width="14" height="3" rx="1.5" fill={OLIVE} />
      <rect x="18" y="22.5" width="14" height="3" rx="1.5" fill={OLIVE} />
      <rect x="14" y="32.5" width="16" height="3" rx="1.5" fill={OLIVE} />
      {/* Now line */}
      <line x1="24" y1="9" x2="24" y2="39" stroke={SAGE} strokeWidth="1.1" strokeLinecap="round" />
    </StepBox>
  )
}

/* vi — Release: a small manifest card with a corner fold, plus a
   short outbound vector to the right. Reads as a packaged dataset
   being dispatched, with documentation. */
export function StepReleaseVisual() {
  return (
    <StepBox>
      {/* Document card body */}
      <path
        d="M 10 12 L 26 12 L 30 16 L 30 36 L 10 36 Z"
        fill="none"
        stroke={OLIVE}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Folded corner */}
      <path
        d="M 26 12 L 26 16 L 30 16"
        fill="none"
        stroke={OLIVE}
        strokeOpacity={0.55}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      {/* Manifest hairlines */}
      <line x1="14" y1="22" x2="26" y2="22" stroke={OLIVE} strokeOpacity={0.4} strokeWidth="0.7" />
      <line x1="14" y1="26" x2="24" y2="26" stroke={OLIVE} strokeOpacity={0.4} strokeWidth="0.7" />
      <line x1="14" y1="30" x2="22" y2="30" stroke={OLIVE} strokeOpacity={0.4} strokeWidth="0.7" />
      {/* Outbound arrow */}
      <line x1="34" y1="24" x2="42" y2="24" stroke={SAGE} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="42" y1="24" x2="39" y2="21" stroke={SAGE} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="42" y1="24" x2="39" y2="27" stroke={SAGE} strokeWidth="1.3" strokeLinecap="round" />
    </StepBox>
  )
}
