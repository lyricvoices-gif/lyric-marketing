"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"

import {
  FS_HERO_DEMO,
  LyricGovernedDemo,
} from "@/components/home/AgentsScenario"

type Channel = "voice" | "text"

type TextTurn = {
  role: "Agent" | "Customer"
  text: string
  typingMs: number
  proofs?: readonly string[]
}

const TEXT_TURNS: readonly TextTurn[] = [
  {
    role: "Customer",
    text: "I don’t recognize a $312 charge on my account.",
    typingMs: 900,
  },
  {
    role: "Agent",
    text: "I’m sorry to hear that. Before I access the account, I’ll need to verify your identity.",
    typingMs: 1350,
    proofs: ["Verify before access"],
  },
  {
    role: "Customer",
    text: "The account ends in 2245.",
    typingMs: 720,
  },
  {
    role: "Agent",
    text: "Thank you. I’ve sent a one-time verification code to the mobile number ending in 42.",
    typingMs: 1250,
    proofs: ["Two-factor verification"],
  },
  {
    role: "Customer",
    text: "Got it — 471295.",
    typingMs: 650,
  },
  {
    role: "Agent",
    text: "Your identity is verified. I can see the charge. Is the merchant completely unfamiliar?",
    typingMs: 1250,
  },
  {
    role: "Customer",
    text: "Completely unfamiliar.",
    typingMs: 620,
  },
  {
    role: "Agent",
    text: "I’ve opened a dispute and applied a temporary credit while we investigate. You won’t be responsible for an unauthorized charge, and I’ll explain what happens next.",
    typingMs: 1650,
    proofs: ["Required behavior met", "Resolution path explained"],
  },
] as const

function TextChannelConversation() {
  const rootRef = useRef<HTMLDivElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [typingRole, setTypingRole] = useState<TextTurn["role"] | null>(null)
  const [typingText, setTypingText] = useState("")

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncPreference = () => setReducedMotion(media.matches)
    syncPreference()
    media.addEventListener("change", syncPreference)

    const root = rootRef.current
    if (!root || !("IntersectionObserver" in window)) {
      setRunning(true)
      return () => media.removeEventListener("change", syncPreference)
    }

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.24 },
    )
    observer.observe(root)

    return () => {
      observer.disconnect()
      media.removeEventListener("change", syncPreference)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(TEXT_TURNS.length)
      setTypingRole(null)
      setTypingText("")
      return
    }

    if (!running) return

    const nextTurn = TEXT_TURNS[visibleCount]
    if (!nextTurn) {
      setTypingRole(null)
      setTypingText("")
      const resetTimer = window.setTimeout(() => setVisibleCount(0), 3600)
      return () => window.clearTimeout(resetTimer)
    }

    setTypingRole(nextTurn.role)
    setTypingText("")

    const responsePauseMs = nextTurn.role === "Customer" ? 780 : 620
    const baseCharacterDelay = Math.max(
      nextTurn.role === "Customer" ? 58 : 42,
      Math.ceil(nextTurn.typingMs / nextTurn.text.length),
    )
    let characterIndex = 0
    let typingTimer = 0
    let settleTimer = 0

    const settleMessage = () => {
      settleTimer = window.setTimeout(() => {
        setVisibleCount((count) => Math.min(count + 1, TEXT_TURNS.length))
        setTypingRole(null)
        setTypingText("")
      }, 340)
    }

    const typeNextCharacter = () => {
      characterIndex += 1
      setTypingText(nextTurn.text.slice(0, characterIndex))

      if (characterIndex >= nextTurn.text.length) {
        settleMessage()
        return
      }

      const character = nextTurn.text[characterIndex - 1]
      const cadenceOffset = [0, 6, -3, 4, -2][characterIndex % 5]
      let nextDelay = baseCharacterDelay + cadenceOffset

      if (/[.!?]/.test(character)) nextDelay += 300
      else if (/[,;:]/.test(character)) nextDelay += 170
      else if (character === "—") nextDelay += 220
      else if (character === " ") nextDelay = Math.round(baseCharacterDelay * 0.62)

      typingTimer = window.setTimeout(typeNextCharacter, nextDelay)
    }

    typingTimer = window.setTimeout(typeNextCharacter, responsePauseMs)

    return () => {
      window.clearTimeout(typingTimer)
      window.clearTimeout(settleTimer)
    }
  }, [reducedMotion, running, visibleCount])

  useEffect(() => {
    const thread = threadRef.current
    if (!thread || reducedMotion) return

    const frame = window.requestAnimationFrame(() => {
      thread.scrollTo({ top: thread.scrollHeight, behavior: "smooth" })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [reducedMotion, typingRole, typingText, visibleCount])

  return (
    <div
      ref={rootRef}
      className={`lv-agents-v3-chat${running ? " is-running" : ""}${reducedMotion ? " is-reduced" : ""}`}
      aria-label="Example governed Financial Services text conversation"
    >
      <div className="lv-agents-v3-chat-head">
        <span>Secure chat</span>
        <strong>Financial Services</strong>
      </div>
      <div
        ref={threadRef}
        className="lv-agents-v3-chat-thread"
        aria-live="polite"
        aria-atomic="false"
      >
        {TEXT_TURNS.slice(0, visibleCount).map((turn) => (
          <div
            key={turn.text}
            className={`lv-agents-v3-chat-turn is-${turn.role.toLowerCase()}`}
          >
            <span className="lv-agents-v3-chat-speaker">{turn.role}</span>
            <p>{turn.text}</p>
            {turn.proofs?.map((proof) => (
              <small key={proof}>
                <i aria-hidden="true" />
                {proof}
              </small>
            ))}
          </div>
        ))}
        {typingRole ? (
          <div
            className={`lv-agents-v3-chat-turn is-${typingRole.toLowerCase()} is-typing has-copy`}
            aria-hidden="true"
          >
            <span className="lv-agents-v3-chat-speaker">{typingRole}</span>
            <p>
              <span className="lv-agents-v3-chat-sizer">
                {TEXT_TURNS[visibleCount]?.text}
              </span>
              <span className="lv-agents-v3-chat-composing">
                {typingText}
                <span className="lv-agents-v3-chat-caret" />
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function AgentChannelDemo() {
  const [channel, setChannel] = useState<Channel>("voice")

  const moveTabFocus = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
    event.preventDefault()
    const next: Channel =
      event.key === "ArrowLeft" || event.key === "Home" ? "voice" : "text"
    setChannel(next)
    window.requestAnimationFrame(() => {
      document.getElementById(`agents-${next}-tab`)?.focus()
    })
  }

  return (
    <div className="lv-agents-v2-demo">
      <div className="lv-agents-v2-demo-head">
        <div
          className="lv-agents-v2-tabs"
          role="tablist"
          aria-label="Choose a channel demonstration"
          aria-orientation="horizontal"
        >
          <button
            type="button"
            id="agents-voice-tab"
            role="tab"
            aria-selected={channel === "voice"}
            aria-controls="agents-voice-panel"
            tabIndex={channel === "voice" ? 0 : -1}
            onClick={() => setChannel("voice")}
            onKeyDown={moveTabFocus}
          >
            Voice
          </button>
          <button
            type="button"
            id="agents-text-tab"
            role="tab"
            aria-selected={channel === "text"}
            aria-controls="agents-text-panel"
            tabIndex={channel === "text" ? 0 : -1}
            onClick={() => setChannel("text")}
            onKeyDown={moveTabFocus}
          >
            Text
          </button>
        </div>
      </div>

      {channel === "voice" ? (
        <div
          id="agents-voice-panel"
          role="tabpanel"
          aria-labelledby="agents-voice-tab"
          className="lv-agents-v2-demo-panel"
        >
          <LyricGovernedDemo demo={FS_HERO_DEMO} />
        </div>
      ) : (
        <div
          id="agents-text-panel"
          role="tabpanel"
          aria-labelledby="agents-text-tab"
          className="lv-agents-v2-demo-panel"
        >
          <TextChannelConversation />
        </div>
      )}
    </div>
  )
}
