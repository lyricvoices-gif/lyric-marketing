"use client"

/* Section 5 — Build the voice spec (Callio intake). An inspectable preview of
   what a brand actually configures: the real spec dimensions, shown as a
   sample spec sheet. Less abstract than a skeleton, so an enterprise buyer can
   see the product, but still a read-only illustration, not a working intake.

   It reflects the intake model: ask the facts with a questionnaire, then show
   and pick for taste (recognition over recall). The picks become the spec. It
   never asks the brand to describe its voice in adjectives.

   The section headline is about the doing ("It does the rest"), so the panel
   assembles itself: on scroll-into-view a scripted loop walks the beats — the
   register is picked, the tone slider settles, the lexicon fills (approved
   terms drop in, banned terms struck through), the disclosure lands, and the
   remaining rows fill — then it rests on the finished spec, holds, and loops.
   The animation only rearranges the reveal of the SAME sample content; nothing
   is generated. Every row is present from the start (space reserved, no
   reflow); only opacity/transform animate. Progressive enhancement: without JS,
   or under prefers-reduced-motion, the finished spec renders static.

   Guardrails: the "Sample" tag stays on the panel so this never reads as a
   live customer spec. Callio codifies the brand voice — no approval workflows,
   escalation routing, or agent-build machinery. Sample content is the
   fictional Cascade / Caldera Bank used elsewhere on the page. Funnels to
   /start via the section CTA. */

import { useEffect, useRef, useState } from "react"

const REGISTER_OPTIONS = ["Composed and warm", "Brisk and upbeat", "Plain and direct"]
const PICKED = 0
const APPROVED = ["Annual Percentage Rate", "posted", "you’re all set"]
const BANNED = ["no worries", "yep", "emoji"]

/* Reveal stages, in the order the intake fills the spec. */
const REG = 1
const TONE = 2
const LEX_APP = 3
const LEX_BAN = 4
const DISC = 5
const EX = 6
const CHAN = 7
const PRON = 8
const FINAL = PRON

/* Pause held at each stage 0..7 before advancing; the finished spec dwells for
   HOLD before the loop resets. */
const DELAYS = [650, 700, 850, 650, 700, 650, 600, 600]
const HOLD = 2800

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

export default function SonicPreview() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => setMounted(true), [])

  // Only animate once mounted on the client and motion is allowed; otherwise
  // the panel renders its finished state (matching SSR — no hydration flip).
  const anim = mounted && !reduced

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.3,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The step machine advances only while the panel is on screen; it loops.
  useEffect(() => {
    if (!anim || !visible) return
    const t =
      stage < FINAL
        ? window.setTimeout(() => setStage((s) => s + 1), DELAYS[stage])
        : window.setTimeout(() => setStage(0), HOLD)
    return () => window.clearTimeout(t)
  }, [anim, visible, stage])

  const shown = (threshold: number) => !anim || stage >= threshold
  const chipDelay = (i: number) => (anim ? `${i * 90}ms` : undefined)

  return (
    <div ref={rootRef} className={`lv-spec${anim ? " is-anim" : ""}`}>
      <div className="lv-spec-bar">
        <span className="lv-spec-bar-name">Brand voice spec</span>
        <span className="lv-spec-bar-tag">Sample</span>
      </div>

      {/* Show, don't ask: pick the one that sounds like you. */}
      <div className="lv-spec-pick">
        <span className="lv-spec-pick-q">Pick the register that sounds like you</span>
        <div className="lv-spec-pick-opts">
          {REGISTER_OPTIONS.map((o, i) => (
            <span
              key={o}
              className={`lv-spec-opt${i === PICKED && shown(REG) ? " is-picked" : ""}`}
            >
              {o}
            </span>
          ))}
        </div>
      </div>

      <dl className="lv-spec-dims">
        <div className="lv-spec-dim">
          <dt className="lv-spec-dim-label">Tone range</dt>
          <dd className={`lv-spec-dim-value lv-anim-fade${shown(TONE) ? " is-in" : ""}`}>
            <div className="lv-spec-range" aria-hidden="true">
              <span className="lv-spec-range-end">Warm</span>
              <span className="lv-spec-range-track">
                <span
                  className="lv-spec-range-mark"
                  style={{ left: shown(TONE) ? "42%" : "0%" }}
                />
              </span>
              <span className="lv-spec-range-end">Direct</span>
            </div>
          </dd>
        </div>

        <div className="lv-spec-dim">
          <dt className="lv-spec-dim-label">Lexicon</dt>
          <dd className="lv-spec-dim-value">
            <div className="lv-spec-lex">
              <span className="lv-spec-lex-group">
                <span className="lv-spec-lex-tag">Approved</span>
                {APPROVED.map((term, i) => (
                  <span
                    key={term}
                    className={`lv-spec-chip is-approved${shown(LEX_APP) ? " is-in" : ""}`}
                    style={{ transitionDelay: chipDelay(i) }}
                  >
                    {term}
                  </span>
                ))}
              </span>
              <span className="lv-spec-lex-group">
                <span className="lv-spec-lex-tag">Banned</span>
                {BANNED.map((term, i) => (
                  <span
                    key={term}
                    className={`lv-spec-chip is-banned${shown(LEX_BAN) ? " is-in" : ""}`}
                    style={{ transitionDelay: chipDelay(i) }}
                  >
                    {term}
                  </span>
                ))}
              </span>
            </div>
          </dd>
        </div>

        <div className="lv-spec-dim">
          <dt className="lv-spec-dim-label">Required disclosures</dt>
          <dd className={`lv-spec-dim-value lv-anim-fade${shown(DISC) ? " is-in" : ""}`}>
            <p className="lv-spec-quote">
              &ldquo;This call may be recorded.&rdquo; Exact, every time.
            </p>
          </dd>
        </div>

        <div className="lv-spec-dim">
          <dt className="lv-spec-dim-label">Approved examples</dt>
          <dd className={`lv-spec-dim-value lv-anim-fade${shown(EX) ? " is-in" : ""}`}>
            <p className="lv-spec-quote">
              &ldquo;Your payment posted today. You&rsquo;re all set.&rdquo;
            </p>
          </dd>
        </div>

        <div className="lv-spec-dim">
          <dt className="lv-spec-dim-label">Channel constraints</dt>
          <dd className={`lv-spec-dim-value lv-anim-fade${shown(CHAN) ? " is-in" : ""}`}>
            <p className="lv-spec-text">
              SMS under 160 characters, no emoji. Voice spells out figures. Email
              keeps the full closing.
            </p>
          </dd>
        </div>

        <div className="lv-spec-dim">
          <dt className="lv-spec-dim-label">Pronunciation, pacing, register</dt>
          <dd className={`lv-spec-dim-value lv-anim-fade${shown(PRON) ? " is-in" : ""}`}>
            <p className="lv-spec-text">
              Caldera, said kal-DEH-ruh. Measured pace. Composed register.
            </p>
          </dd>
        </div>
      </dl>

      <p className="lv-spec-note">
        Facts by questionnaire. Taste by ear. Your picks become the spec.
      </p>
    </div>
  )
}
