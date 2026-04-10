"use client"

import { useState, useEffect, useRef } from "react"

const GOLD   = "#c9a96e"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"
const LIGHT  = "#f5f3ef"

const VOICE_NAMES = ["Morgan", "Nova", "Atlas", "Riven", "Hex"]
const INTENTS     = ["Authoritative", "Warm", "Composed"]
const FULL_TEXT   = "The work your team has done speaks for itself."
const WARM_PHRASE = "The work your team has done"

// ── Sequential timing (ms from animation start) ───────────────────────────
const V1         = 400                                             // first voice pill
const V_STEP     = 320                                             // between voice pills
const LAST_VOICE = V1 + (VOICE_NAMES.length - 1) * V_STEP         // 1680

const I1          = LAST_VOICE + 600                               // first intent pill: 2280
const I_STEP      = 350                                            // between intent pills
const LAST_INTENT = I1 + (INTENTS.length - 1) * I_STEP            // 2980

const WARM_SEL   = LAST_INTENT + 500                               // warm selected: 3480
const TYPE_START = WARM_SEL + 900                                  // typing begins: 4380
const CHAR_MS    = 42                                              // ms per character
const TYPE_END   = TYPE_START + FULL_TEXT.length * CHAR_MS         // typing ends: 6312

const TAG_SHOW   = TYPE_END + 1000                                 // tags render: 7312
const TAG_VIS    = TAG_SHOW + 60                                   // tags fade in: 7372
const WARM_ACT   = TAG_VIS + 900                                   // warm color: 8272
const LOOP_AT    = WARM_ACT + 3200                                 // loop: 11472

// ── Component ─────────────────────────────────────────────────────────────
export default function HowItWorksAnimations() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [inView,       setInView]       = useState(false)
  const [loopKey,      setLoopKey]      = useState(0)
  const [voiceReveal,  setVoiceReveal]  = useState(0)
  const [intentReveal, setIntentReveal] = useState(0)
  const [warmSelected, setWarmSelected] = useState(false)
  const [charCount,    setCharCount]    = useState(0)
  const [showTags,     setShowTags]     = useState(false)
  const [tagsVisible,  setTagsVisible]  = useState(false)
  const [warmActive,   setWarmActive]   = useState(false)

  // Fire only once when section scrolls into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Coordinated sequence
  useEffect(() => {
    if (!inView) return

    setVoiceReveal(0)
    setIntentReveal(0)
    setWarmSelected(false)
    setCharCount(0)
    setShowTags(false)
    setTagsVisible(false)
    setWarmActive(false)

    const T: ReturnType<typeof setTimeout>[] = []
    const at = (ms: number, fn: () => void) => { T.push(setTimeout(fn, ms)) }

    // 1. Voice pills appear one by one → Morgan selected
    VOICE_NAMES.forEach((_, i) => at(V1 + i * V_STEP, () => setVoiceReveal(i + 1)))

    // 2. Intent pills appear one by one → Warm selected
    INTENTS.forEach((_, i) => at(I1 + i * I_STEP, () => setIntentReveal(i + 1)))
    at(WARM_SEL, () => setWarmSelected(true))

    // 3. Script types out character by character
    for (let i = 1; i <= FULL_TEXT.length; i++) {
      at(TYPE_START + i * CHAR_MS, () => setCharCount(c => c + 1))
    }

    // 4. [warm] tags fade in, then text shifts gold
    at(TAG_SHOW, () => setShowTags(true))
    at(TAG_VIS,  () => setTagsVisible(true))
    at(WARM_ACT, () => setWarmActive(true))

    // 5. Hold, then loop
    at(LOOP_AT, () => setLoopKey(k => k + 1))

    return () => T.forEach(clearTimeout)
  }, [loopKey, inView])

  const displayText = FULL_TEXT.slice(0, charCount)

  return (
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1px",
        background: BORDER,
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      {/* ── Col 1: Choose the character ── */}
      <div style={{ background: LIGHT, padding: "48px 40px 52px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: TEXT3, margin: "0 0 20px" }}>
          Begin here
        </p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em", color: TEXT1, margin: "0 0 12px", lineHeight: 1.2 }}>
          Choose the character.
        </h3>
        <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.7, margin: "0 0 40px" }}>
          Five voices, each built for a different kind of moment. The one you choose shapes everything that follows.
        </p>

        <div style={{ background: "#1c1a17", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,227,220,0.4)", fontWeight: 600, margin: 0 }}>
            Voice
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {VOICE_NAMES.map((v, i) => (
              <span key={v} style={{
                fontSize: "12px",
                padding: "6px 14px",
                borderRadius: "100px",
                border: i === 0 ? "1px solid rgba(232,227,220,0.7)" : "1px solid rgba(232,227,220,0.18)",
                background: i === 0 ? "rgba(232,227,220,0.1)" : "transparent",
                color: i === 0 ? "#e8e3dc" : "rgba(232,227,220,0.4)",
                opacity: i < voiceReveal ? 1 : 0,
                transform: i < voiceReveal ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}>
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Col 2: Set the intent ── */}
      <div style={{ background: LIGHT, padding: "48px 40px 52px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: TEXT3, margin: "0 0 20px" }}>
          Then this
        </p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em", color: TEXT1, margin: "0 0 12px", lineHeight: 1.2 }}>
          Set the intent.
        </h3>
        <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.7, margin: "0 0 40px" }}>
          Each voice ships with tonal variants. After picking a voice, select the emotion you want the voice to express.
        </p>

        <div style={{ background: "#1c1a17", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,227,220,0.4)", fontWeight: 600, margin: 0 }}>
            Voice Direction
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {INTENTS.map((intent, i) => {
              const selected = intent === "Warm" && warmSelected
              return (
                <span key={intent} style={{
                  fontSize: "12px",
                  padding: "7px 14px",
                  borderRadius: "100px",
                  border: selected ? "1px solid rgba(201,169,110,0.75)" : "1px solid rgba(232,227,220,0.18)",
                  background: selected ? "rgba(201,169,110,0.12)" : "transparent",
                  color: selected ? "rgba(201,169,110,1)" : "rgba(232,227,220,0.4)",
                  opacity: i < intentReveal ? 1 : 0,
                  transform: i < intentReveal ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease, border-color 0.8s ease, background 0.8s ease, color 0.8s ease",
                }}>
                  {intent}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Col 3: Direct as you compose ── */}
      <div style={{ background: LIGHT, padding: "48px 40px 52px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: TEXT3, margin: "0 0 20px" }}>
          Now write
        </p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em", color: TEXT1, margin: "0 0 12px", lineHeight: 1.2 }}>
          Direct as you compose.
        </h3>
        <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.7, margin: "0 0 40px" }}>
          Inline marks let you shift the tone mid-script. A single take can move from quiet to urgent without switching voices.
        </p>

        <div style={{ background: "#1c1a17", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,227,220,0.4)", fontWeight: 600, margin: 0 }}>
            Script
          </p>
          <div style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(232,227,220,0.15)",
            borderRadius: "12px",
            padding: "12px 14px",
            fontSize: "13px",
            lineHeight: 1.6,
            color: "#e8e3dc",
            minHeight: "52px",
          }}>
            {!showTags ? (
              <>
                <span>{displayText}</span>
                <span
                  className="cursor-blink"
                  style={{ display: "inline-block", width: "1.5px", height: "14px", background: GOLD, verticalAlign: "middle", marginLeft: "2px" }}
                />
              </>
            ) : (
              <>
                <span style={{ color: warmActive ? "rgba(201,169,110,0.6)" : "rgba(232,227,220,0.35)", opacity: tagsVisible ? 1 : 0, transition: "opacity 0.8s ease, color 1.4s ease" }}>{"[warm] "}</span>
                <span style={{ color: warmActive ? "rgba(201,169,110,0.9)" : "#e8e3dc", transition: "color 1.4s ease" }}>{WARM_PHRASE}</span>
                <span style={{ color: warmActive ? "rgba(201,169,110,0.6)" : "rgba(232,227,220,0.35)", opacity: tagsVisible ? 1 : 0, transition: "opacity 0.8s ease, color 1.4s ease" }}>{" [/warm]"}</span>
                <span style={{ color: "rgba(232,227,220,0.55)" }}>{" speaks for itself."}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
