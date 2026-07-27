"use client"

/* The hero's demo panel, matching the callio build's split-hero layout:
   a Chat / Voice toggle at the top, then one mode at a time.

   Voice (default): the agent orb as the centerpiece, moving through the
   call's states — idle (slow breathe), connecting (quick ring pulses
   while the call opens), speaking (audio-reactive: the orb scales with
   the live level of the call via a WebAudio analyser, with a CSS
   fast-breathe fallback when analysis is unavailable). One pill action
   beneath it, Play call. This page runs the sage accent, not gold.

   NOTE: the exact orb-state implementation lives in the callio repo,
   which is outside this session's repository scope; this is a faithful
   reconstruction. Swap in the callio component when a session has that
   repo attached.

   Chat: the same governed call as a readable thread (the site's governed-
   chat grammar, with the governance notes). Switching modes never stops
   playback — the audio element is shared and lives outside the modes.

   DEMO_CALL_SRC: STAND-IN. The produced two-voice call (Sol + caller,
   scripts/generate-fs-demo-call.mjs) replaces this with its R2 URL, path
   pattern {AUDIO_BASE}/phone/fs-demo-call.mp3. Until then the player runs
   on the existing governed FS sample so the instrument is real. */

import { useEffect, useRef, useState } from "react"

const DEMO_CALL_SRC = "/GovernedSample.mp3"

type CallState = "idle" | "connecting" | "speaking"

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

export default function DemoCallPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const rafRef = useRef(0)
  const levelRef = useRef(0)
  const [mode, setMode] = useState<"chat" | "voice">("voice")
  const [callState, setCallState] = useState<CallState>("idle")
  const [liveViz, setLiveViz] = useState(false)
  const [progress, setProgress] = useState(0)
  const active = callState !== "idle"

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => {
      if (a.duration > 0) setProgress(a.currentTime / a.duration)
    }
    const onPlaying = () => setCallState("speaking")
    const reset = () => {
      setCallState("idle")
      setProgress(0)
    }
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("playing", onPlaying)
    a.addEventListener("ended", reset)
    a.addEventListener("error", reset)
    return () => {
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("playing", onPlaying)
      a.removeEventListener("ended", reset)
      a.removeEventListener("error", reset)
    }
  }, [])

  /* Audio-reactive level: RMS of the call's waveform, smoothed, written to
     --orb-level on the panel for the orb's speaking transform. Only wired
     for the same-origin source (a cross-origin source without CORS headers
     would silence a MediaElementSource) and never under reduced motion —
     both fall back to the CSS fast-breathe. */
  const startAnalysis = () => {
    if (analyserRef.current) return
    if (!DEMO_CALL_SRC.startsWith("/")) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const a = audioRef.current
    if (!a) return
    try {
      const Ctx = window.AudioContext
      const ctx = new Ctx()
      const src = ctx.createMediaElementSource(a)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 512
      src.connect(analyser)
      analyser.connect(ctx.destination)
      ctxRef.current = ctx
      analyserRef.current = analyser
      setLiveViz(true)
    } catch {
      /* Analysis is decoration; playback continues without it. */
    }
  }

  useEffect(() => {
    if (callState !== "speaking" || !analyserRef.current) return
    const analyser = analyserRef.current
    const data = new Uint8Array(analyser.fftSize)
    const tick = () => {
      analyser.getByteTimeDomainData(data)
      let sum = 0
      for (let i = 0; i < data.length; i++) {
        const d = (data[i] - 128) / 128
        sum += d * d
      }
      const rms = Math.sqrt(sum / data.length)
      /* Smooth attack/decay so the orb swells rather than jitters. */
      const target = Math.min(1, rms * 3.2)
      levelRef.current += (target - levelRef.current) * (target > levelRef.current ? 0.35 : 0.12)
      rootRef.current?.style.setProperty("--orb-level", levelRef.current.toFixed(3))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      rootRef.current?.style.setProperty("--orb-level", "0")
    }
  }, [callState])

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {})
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (active) {
      a.pause()
      setCallState("idle")
      setProgress(0)
      return
    }
    startAnalysis()
    ctxRef.current?.resume().catch(() => {})
    a.src = DEMO_CALL_SRC
    setProgress(0)
    setCallState("connecting")
    a.play().catch(() => {
      setCallState("idle")
      setProgress(0)
    })
  }

  const pillLabel =
    callState === "idle" ? "Play call" : callState === "connecting" ? "Calling" : "Pause"

  return (
    <div
      ref={rootRef}
      className="lv-agdemo"
      data-state={callState}
      data-viz={liveViz ? "live" : "css"}
    >
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

          <button
            type="button"
            className="lv-agdemo-playpill"
            onClick={toggle}
            aria-label={active ? "Pause the governed call" : "Play the governed call"}
            aria-pressed={active}
          >
            {/* Progress fills the pill's underlay while playing. */}
            <span
              className="lv-agdemo-playpill-prog"
              style={{ transform: `scaleX(${active ? progress : 0})` }}
              aria-hidden="true"
            />
            <span className="lv-agdemo-playpill-glyph">
              {active ? <PauseGlyph /> : <PlayGlyph />}
            </span>
            <span>{pillLabel}</span>
          </button>
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
