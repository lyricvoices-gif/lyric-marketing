"use client"

/* Governed call visual — the home hero's single animated mockup.

   An inbound voice call passing through Lyric's governance layer in real
   time. The motion demonstrates the mechanism, not decoration: a call
   arrives, connects, Lyric's persona spec engages, then the agent's reply
   streams in already governed. Two governed beats land as it speaks:

     - SOUND: the brand term gets a gold underline and a phonetic chip
       ("kal-DAIR-uh · on brand") — pronunciation held to the spec.
     - COMMUNICATE: a "disclosure added" marker — word choice and required
       disclosure held to the spec.

   The waveform sits inside two faint tolerance guides, so pacing and tone
   read as held within brand tolerance the whole time.

   Motion is CSS transforms and opacity only. The sequence plays once when
   the hero scrolls into view (effectively on load, since it sits at the
   top), then settles and freezes. No loop. Reduced-motion users get the
   settled end-state with no streaming, pulsing, caret, or wave motion.

   Built to mirror components/products/OpusVisual.tsx: a useReducedMotion
   hook, a one-shot IntersectionObserver start, and a small setTimeout
   phase machine. No libraries, no images. */

import { useEffect, useRef, useState } from "react"

type Token = string | { term: string; phon: string }

/* The agent's reply. The brand term is one token so its underline and
   phonetic chip can animate as a unit. "Caldera Bank" / "kal-DAIR-uh" is a
   neutral placeholder — swap for any brand or industry term. */
const TOKENS: readonly Token[] = [
  "Thanks",
  "for",
  "calling",
  { term: "Caldera Bank.", phon: "kal-DAIR-uh" },
  "I",
  "can",
  "help",
  "with",
  "that",
  "right",
  "away.",
] as const

const TERM_INDEX = TOKENS.findIndex((t) => typeof t !== "string")

const PHASE_MS = {
  ringing: 1600,
  connected: 1000,
  spec: 900,
  afterLine: 800,
  afterDisclosure: 1400,
}

/* Calm speaking pace. A longer dwell after the brand term so the underline
   and phonetic chip read; a small breath at punctuation. */
function wordDelay(justRevealed: number): number {
  const tok = TOKENS[justRevealed]
  if (tok && typeof tok !== "string") return 850
  if (typeof tok === "string" && /[.,]$/.test(tok)) return 520
  return 280
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return reduced
}

type Phase = "idle" | "ringing" | "connected" | "spec" | "speaking" | "settled"

export default function GovernedCallVisual() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>("idle")
  const [words, setWords] = useState(0)
  const [discShown, setDiscShown] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    if (hasEntered) return
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasEntered])

  useEffect(() => {
    if (reduced) {
      // Static fallback: park at the settled, fully governed end-state.
      setPhase("settled")
      setWords(TOKENS.length)
      setDiscShown(true)
      return
    }
    if (!hasEntered) return

    if (phase === "idle") {
      const t = window.setTimeout(() => setPhase("ringing"), 400)
      return () => window.clearTimeout(t)
    }
    if (phase === "ringing") {
      const t = window.setTimeout(() => setPhase("connected"), PHASE_MS.ringing)
      return () => window.clearTimeout(t)
    }
    if (phase === "connected") {
      const t = window.setTimeout(() => setPhase("spec"), PHASE_MS.connected)
      return () => window.clearTimeout(t)
    }
    if (phase === "spec") {
      const t = window.setTimeout(() => setPhase("speaking"), PHASE_MS.spec)
      return () => window.clearTimeout(t)
    }
    if (phase === "speaking") {
      if (words < TOKENS.length) {
        const t = window.setTimeout(() => setWords((w) => w + 1), wordDelay(words - 1))
        return () => window.clearTimeout(t)
      }
      if (!discShown) {
        const t = window.setTimeout(() => setDiscShown(true), PHASE_MS.afterLine)
        return () => window.clearTimeout(t)
      }
      const t = window.setTimeout(() => setPhase("settled"), PHASE_MS.afterDisclosure)
      return () => window.clearTimeout(t)
    }
  }, [reduced, hasEntered, phase, words, discShown])

  const connected = phase !== "idle" && phase !== "ringing"
  const specActive = phase === "spec" || phase === "speaking" || phase === "settled"
  const speaking = phase === "speaking"
  const waveActive = phase === "speaking" || phase === "settled"
  const termActive = words > TERM_INDEX
  const caret = speaking && words < TOKENS.length

  const revealed = TOKENS.slice(0, words)

  /* Deterministic per-bar timing so the waveform reads organic but stable
     across renders. Heights stay inside the tolerance band by construction. */
  const bars = Array.from({ length: 13 })

  return (
    <div
      ref={rootRef}
      className={[
        "lv-hcall",
        `is-${phase}`,
        connected ? "is-connected" : "",
        specActive ? "is-spec" : "",
        waveActive ? "is-wave" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="lv-hcall-panel">
        <div className="lv-hcall-head">
          <span className="lv-hcall-kicker">Inbound call</span>
          <span className="lv-hcall-status">
            <span className="lv-hcall-status-dot" />
            <span className="lv-hcall-status-label">
              {connected ? "Connected" : "Ringing"}
            </span>
          </span>
        </div>

        <div className="lv-hcall-caller">+1 (415) 555 0148 · 0:03</div>

        <div className="lv-hcall-band">
          <div className="lv-hcall-band-row">
            <span className="lv-hcall-band-label">Persona spec · on brand</span>
            <span className="lv-hcall-band-check" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <span className="lv-hcall-band-rule" />
        </div>

        <div className="lv-hcall-transcript">
          <p className="lv-hcall-line">
            {revealed.map((tok, i) =>
              typeof tok === "string" ? (
                <span key={i} className="lv-hcall-word">
                  {tok}{" "}
                </span>
              ) : (
                <span key={i} className="lv-hcall-word">
                  <span className={`lv-hcall-term${termActive ? " is-active" : ""}`}>
                    {tok.term}
                    <span className="lv-hcall-term-rule" />
                  </span>{" "}
                </span>
              ),
            )}
            {caret && <span className="lv-hcall-caret" />}
          </p>

          <span className={`lv-hcall-phon${termActive ? " is-shown" : ""}`}>
            {TERM_INDEX >= 0 && typeof TOKENS[TERM_INDEX] !== "string"
              ? (TOKENS[TERM_INDEX] as { phon: string }).phon
              : ""}
            <span className="lv-hcall-phon-tag"> · pronounced on brand</span>
          </span>
        </div>

        <div className="lv-hcall-wave">
          <span className="lv-hcall-wave-bound lv-hcall-wave-bound-top" />
          <span className="lv-hcall-wave-bound lv-hcall-wave-bound-bottom" />
          <div className="lv-hcall-bars">
            {bars.map((_, i) => (
              <span
                key={i}
                className="lv-hcall-bar"
                style={{
                  animationDelay: `${(i * 137) % 900}ms`,
                  animationDuration: `${1400 + ((i * 211) % 700)}ms`,
                }}
              />
            ))}
          </div>
          <span className="lv-hcall-wave-label">pace and tone · within tolerance</span>
        </div>

        <span className={`lv-hcall-disclosure${discShown ? " is-shown" : ""}`}>
          <span className="lv-hcall-disclosure-dot" aria-hidden="true" />
          disclosure added
        </span>
      </div>
    </div>
  )
}
