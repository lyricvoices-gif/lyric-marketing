"use client"

/* The hero's demo panel, matching the callio build's split-hero layout:
   a Chat / Voice toggle at the top, then one mode at a time.

   Voice (default): a gradient orb as the centerpiece with two labeled round
   actions beneath it — play the governed call (functional, with a progress
   ring) and call the agent live (links to the try path). No transcript in
   this mode; the voice demo stays a voice instrument.

   Chat: the same governed call as a readable thread (the site's governed-
   chat grammar, with the governance notes). Switching modes never stops
   playback — the audio element is shared and lives outside the modes.

   DEMO_CALL_SRC: STAND-IN. The produced two-voice call (Sol + caller,
   scripts/generate-fs-demo-call.mjs) replaces this with its R2 URL, path
   pattern {AUDIO_BASE}/phone/fs-demo-call.mp3. Until then the player runs
   on the existing governed FS sample so the instrument is real. */

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const DEMO_CALL_SRC = "/GovernedSample.mp3"
const TRY_HREF = "/start"

const BTN_R = 30
const BTN_C = 2 * Math.PI * BTN_R

type Turn = { who: "caller" | "agent"; text: string; note?: string }

/* The locked call script, written form (the audio speaks the normalized
   form: "three hundred twelve dollars", spelled digits). */
const TRANSCRIPT: readonly Turn[] = [
  {
    who: "caller",
    text:
      "Hi, um, I'm looking at my account and there's a charge here I definitely didn't make. Three hundred and twelve dollars. I have no idea what this is.",
  },
  {
    who: "agent",
    text:
      "I understand, and I'll help you get to the bottom of it. An unexpected charge like that is unsettling. Before I pull up any account details, I need to verify your identity. Can you confirm the phone number or email on the account?",
    note: "acknowledges, then verifies before any account detail",
  },
  { who: "caller", text: "Yeah, it's the phone ending in 4-7-1-2." },
  { who: "agent", text: "Thank you. I'll verify that now." },
  {
    who: "agent",
    text:
      "I've confirmed your identity. I can see the $312 charge you mentioned. I can't say yet whether it's fraud until we look closer, so let's review it together. Do you recognize the merchant name, or is it completely unfamiliar?",
    note: "careful before reassuring: not “fraud” until confirmed",
  },
  { who: "caller", text: "Completely unfamiliar. I've never heard of them." },
  {
    who: "agent",
    text:
      "Understood. I'm going to open a dispute on that transaction and place a temporary hold so nothing else moves on it while we investigate. You won't be held responsible for a charge you didn't authorize. I'll walk you through what happens next.",
    note: "resolves with next steps, register held throughout",
  },
]

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  )
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="7" y="5" width="3.5" height="14" rx="1" />
      <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
    </svg>
  )
}

function PhoneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export default function DemoCallPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [mode, setMode] = useState<"chat" | "voice">("voice")
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => {
      if (a.duration > 0) setProgress(a.currentTime / a.duration)
    }
    const reset = () => {
      setPlaying(false)
      setProgress(0)
    }
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("ended", reset)
    a.addEventListener("error", reset)
    return () => {
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("ended", reset)
      a.removeEventListener("error", reset)
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
      setProgress(0)
      return
    }
    a.src = DEMO_CALL_SRC
    setProgress(0)
    setPlaying(true)
    a.play().catch(() => {
      setPlaying(false)
      setProgress(0)
    })
  }

  return (
    <div className={`lv-agdemo${playing ? " is-playing" : ""}`}>
      <div className="lv-agdemo-top">
        <span className="lv-agdemo-top-label">
          Governed call &middot; Sol &middot; FS agent
        </span>
        <div className="lv-agdemo-toggle" role="tablist" aria-label="Demo mode">
          <button
            type="button"
            role="tab"
            className="lv-agdemo-toggle-btn"
            aria-selected={mode === "chat"}
            onClick={() => setMode("chat")}
          >
            Chat
          </button>
          <button
            type="button"
            role="tab"
            className="lv-agdemo-toggle-btn"
            aria-selected={mode === "voice"}
            onClick={() => setMode("voice")}
          >
            Voice
          </button>
        </div>
      </div>

      {mode === "voice" ? (
        <div className="lv-agdemo-voice">
          <div className="lv-agdemo-orb-wrap">
            <span className="lv-agdemo-pulse lv-agdemo-pulse-1" aria-hidden="true" />
            <span className="lv-agdemo-pulse lv-agdemo-pulse-2" aria-hidden="true" />
            <div className="lv-agdemo-orb" aria-hidden="true" />
          </div>

          <div className="lv-agdemo-actions">
            <div className="lv-agdemo-action">
              <button
                type="button"
                className="lv-agdemo-action-btn lv-agdemo-action-primary"
                onClick={toggle}
                aria-label={playing ? "Pause the governed call" : "Play the governed call"}
                aria-pressed={playing}
              >
                <svg className="lv-agdemo-action-ring" viewBox="0 0 64 64" aria-hidden="true">
                  <circle
                    className="lv-agdemo-action-ring-prog"
                    cx="32"
                    cy="32"
                    r={BTN_R}
                    style={{
                      strokeDasharray: BTN_C,
                      strokeDashoffset: BTN_C * (1 - progress),
                    }}
                  />
                </svg>
                <span className="lv-agdemo-action-glyph">
                  {playing ? <PauseGlyph /> : <PlayGlyph />}
                </span>
              </button>
              <span className="lv-agdemo-action-label">
                {playing ? "Playing" : "Play the call"}
              </span>
            </div>

            <div className="lv-agdemo-action">
              <Link
                href={TRY_HREF}
                className="lv-agdemo-action-btn lv-agdemo-action-secondary"
                aria-label="Call the agent live"
              >
                <span className="lv-agdemo-action-glyph lv-agdemo-action-glyph-phone">
                  <PhoneGlyph />
                </span>
              </Link>
              <span className="lv-agdemo-action-label">Call it live</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="lv-agdemo-thread">
          {TRANSCRIPT.map((t, i) => (
            <div key={i} className={`lv-agdemo-row is-${t.who}`}>
              <span className="lv-agdemo-meta">{t.who === "agent" ? "Sol" : "Caller"}</span>
              <p className="lv-agdemo-bubble">{t.text}</p>
              {t.note && (
                <span className="lv-agdemo-note">
                  <span className="lv-agdemo-note-dot" aria-hidden="true" />
                  {t.note}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <audio ref={audioRef} preload="none" />
    </div>
  )
}
