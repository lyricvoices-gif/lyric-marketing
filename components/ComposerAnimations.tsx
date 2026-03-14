"use client"

import { useState, useEffect } from "react"

const GOLD = "#c9a96e"

// ── 1. Voice Pills ─────────────────────────────────────────────────────────
const VOICE_NAMES = ["Morgan", "Nova", "Atlas", "Riven", "Hex"]

export function VoicePills() {
  const [loopKey, setLoopKey] = useState(0)
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    setRevealed(0)
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const revealNext = (n: number) => {
      const t = setTimeout(() => {
        setRevealed(n)
        if (n < VOICE_NAMES.length) {
          revealNext(n + 1)
        } else {
          // Pause then reset
          const reset = setTimeout(() => {
            setLoopKey((k) => k + 1)
          }, 3200)
          timeouts.push(reset)
        }
      }, n === 1 ? 500 : 320)
      timeouts.push(t)
    }

    revealNext(1)
    return () => timeouts.forEach(clearTimeout)
  }, [loopKey])

  return (
    <div
      style={{
        background: "#1c1a17",
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "rgba(232,227,220,0.4)",
          fontWeight: 600,
          margin: 0,
        }}
      >
        Voice
      </p>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {VOICE_NAMES.map((v, i) => (
          <span
            key={v}
            style={{
              fontSize: "12px",
              padding: "6px 14px",
              borderRadius: "100px",
              border:
                i === 0
                  ? "1px solid rgba(232,227,220,0.7)"
                  : "1px solid rgba(232,227,220,0.18)",
              background: i === 0 ? "rgba(232,227,220,0.1)" : "transparent",
              color: i === 0 ? "#e8e3dc" : "rgba(232,227,220,0.4)",
              opacity: i < revealed ? 1 : 0,
              transform: i < revealed ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── 2. Intent Pills ─────────────────────────────────────────────────────────
const INTENTS = ["Authoritative", "Warm", "Composed"]

export function IntentPills() {
  const [loopKey, setLoopKey] = useState(0)
  const [revealed, setRevealed] = useState(0)
  const [warmSelected, setWarmSelected] = useState(false)

  useEffect(() => {
    setRevealed(0)
    setWarmSelected(false)
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const revealNext = (n: number) => {
      const t = setTimeout(() => {
        setRevealed(n)
        if (n < INTENTS.length) {
          revealNext(n + 1)
        } else {
          // All revealed — pause, then select Warm
          const t2 = setTimeout(() => {
            setWarmSelected(true)
            // Hold, then loop
            const t3 = setTimeout(() => {
              setLoopKey((k) => k + 1)
            }, 3000)
            timeouts.push(t3)
          }, 500)
          timeouts.push(t2)
        }
      }, n === 1 ? 500 : 350)
      timeouts.push(t)
    }

    revealNext(1)
    return () => timeouts.forEach(clearTimeout)
  }, [loopKey])

  return (
    <div
      style={{
        background: "#1c1a17",
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "rgba(232,227,220,0.4)",
          fontWeight: 600,
          margin: 0,
        }}
      >
        Voice Direction
      </p>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {INTENTS.map((intent, i) => {
          const isWarm = intent === "Warm"
          const selected = isWarm && warmSelected
          return (
            <span
              key={intent}
              style={{
                fontSize: "12px",
                padding: "7px 14px",
                borderRadius: "100px",
                border: selected
                  ? "1px solid rgba(201,169,110,0.75)"
                  : "1px solid rgba(232,227,220,0.18)",
                background: selected ? "rgba(201,169,110,0.12)" : "transparent",
                color: selected
                  ? "rgba(201,169,110,1)"
                  : "rgba(232,227,220,0.4)",
                opacity: i < revealed ? 1 : 0,
                transform: i < revealed ? "translateY(0)" : "translateY(8px)",
                transition:
                  "opacity 0.4s ease, transform 0.4s ease, border-color 0.8s ease, background 0.8s ease, color 0.8s ease",
              }}
            >
              {intent}
            </span>
          )
        })}
      </div>
    </div>
  )
}

// ── 3. Typewriter Script ────────────────────────────────────────────────────
const FULL_TEXT = "The work your team has done speaks for itself."
const WARM_PHRASE = "The work your team has done"

export function TypewriterScript() {
  const [loopKey, setLoopKey] = useState(0)
  const [charCount, setCharCount] = useState(0)
  // showTags: tags are rendered but may be invisible; tagsVisible: fade them in
  const [showTags, setShowTags] = useState(false)
  const [tagsVisible, setTagsVisible] = useState(false)
  const [warmActive, setWarmActive] = useState(false)

  useEffect(() => {
    setCharCount(0)
    setShowTags(false)
    setTagsVisible(false)
    setWarmActive(false)

    const timeouts: ReturnType<typeof setTimeout>[] = []
    let typingInterval: ReturnType<typeof setInterval> | null = null
    let count = 0

    const startTyping = () => {
      typingInterval = setInterval(() => {
        count++
        setCharCount(count)
        if (count >= FULL_TEXT.length) {
          clearInterval(typingInterval!)
          typingInterval = null

          // Pause after typing finishes
          const t1 = setTimeout(() => {
            // Switch to tagged render (still invisible)
            setShowTags(true)
            // Next tick: fade tags in
            const t2 = setTimeout(() => {
              setTagsVisible(true)
              // Then slowly activate warm color
              const t3 = setTimeout(() => {
                setWarmActive(true)
                // Hold, then loop
                const t4 = setTimeout(() => {
                  setLoopKey((k) => k + 1)
                }, 3200)
                timeouts.push(t4)
              }, 900)
              timeouts.push(t3)
            }, 60)
            timeouts.push(t2)
          }, 1000)
          timeouts.push(t1)
        }
      }, 42)
    }

    const initDelay = setTimeout(startTyping, 500)
    timeouts.push(initDelay)

    return () => {
      if (typingInterval) clearInterval(typingInterval)
      timeouts.forEach(clearTimeout)
    }
  }, [loopKey])

  const displayText = FULL_TEXT.slice(0, charCount)

  return (
    <div
      style={{
        background: "#1c1a17",
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "rgba(232,227,220,0.4)",
          fontWeight: 600,
          margin: 0,
        }}
      >
        Script
      </p>
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(232,227,220,0.15)",
          borderRadius: "12px",
          padding: "12px 14px",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "#e8e3dc",
          minHeight: "52px",
        }}
      >
        {!showTags ? (
          <>
            <span>{displayText}</span>
            <span
              className="cursor-blink"
              style={{
                display: "inline-block",
                width: "1.5px",
                height: "14px",
                background: GOLD,
                verticalAlign: "middle",
                marginLeft: "2px",
              }}
            />
          </>
        ) : (
          <>
            <span
              style={{
                color: warmActive ? "rgba(201,169,110,0.6)" : "rgba(232,227,220,0.35)",
                opacity: tagsVisible ? 1 : 0,
                transition: "opacity 0.8s ease, color 1.4s ease",
              }}
            >
              {"[warm] "}
            </span>
            <span
              style={{
                color: warmActive ? "rgba(201,169,110,0.9)" : "#e8e3dc",
                transition: "color 1.4s ease",
              }}
            >
              {WARM_PHRASE}
            </span>
            <span
              style={{
                color: warmActive ? "rgba(201,169,110,0.6)" : "rgba(232,227,220,0.35)",
                opacity: tagsVisible ? 1 : 0,
                transition: "opacity 0.8s ease, color 1.4s ease",
              }}
            >
              {" [/warm]"}
            </span>
            <span style={{ color: "rgba(232,227,220,0.55)" }}>{" speaks for itself."}</span>
          </>
        )}
      </div>
    </div>
  )
}
