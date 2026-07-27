"use client"

/* The hero's demo panel: the LiveKit Agents UI aura (vendored under
   components/agents-ui) as the agent's visual personality. At rest it
   demos the agent's states on a loop — connecting, listening, speaking,
   thinking, a few seconds each — until the visitor presses Play call;
   then it holds the speaking state for the duration of the call, with
   the aura's scale driven by the call's live level (WebAudio analyser).
   One pill action beneath it, Play call. Sage accent. Under reduced
   motion the shader (which animates continuously) is replaced with a
   still sage disc.

   DEMO_CALL_SRC: STAND-IN. The produced two-voice call (Sol + caller,
   scripts/generate-fs-demo-call.mjs) replaces this with its R2 URL, path
   pattern {AUDIO_BASE}/phone/fs-demo-call.mp3. Until then the player runs
   on the existing governed FS sample so the instrument is real. */

import { useEffect, useRef, useState } from "react"

import { AgentAudioVisualizerAura } from "@/components/agents-ui/agent-audio-visualizer-aura"
import { type AgentState } from "@/components/agents-ui/use-agent-audio-visualizer-wave"

const DEMO_CALL_SRC = "/GovernedSample.mp3"

/* The page accent (sage) carries the aura. */
const AURA_COLOR = "#C1C17E" as const

/* The resting demo loop: each state holds a few seconds, then hands off. */
const ATTRACT_STATES: readonly AgentState[] = [
  "connecting",
  "listening",
  "speaking",
  "thinking",
]
const ATTRACT_STEP_MS = 3200

type CallState = "idle" | "connecting" | "speaking"

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
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const rafRef = useRef(0)
  const levelRef = useRef(0)
  const [callState, setCallState] = useState<CallState>("idle")
  const [attractIndex, setAttractIndex] = useState(0)
  const [volume, setVolume] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const active = callState !== "idle"

  /* The wave's state: the call's real state while active, the demo loop at
     rest. Reduced motion pins a still flat line (the disconnected pose). */
  const waveState: AgentState = reducedMotion
    ? "disconnected"
    : callState === "idle"
      ? ATTRACT_STATES[attractIndex]
      : callState

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  /* Resting loop through the agent's states until a call starts. */
  useEffect(() => {
    if (callState !== "idle" || reducedMotion) return
    const id = setInterval(
      () => setAttractIndex((i) => (i + 1) % ATTRACT_STATES.length),
      ATTRACT_STEP_MS
    )
    return () => clearInterval(id)
  }, [callState, reducedMotion])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onPlaying = () => setCallState("speaking")
    const reset = () => {
      setCallState("idle")
      setAttractIndex(0)
      setVolume(0)
    }
    a.addEventListener("playing", onPlaying)
    a.addEventListener("ended", reset)
    a.addEventListener("error", reset)
    return () => {
      a.removeEventListener("playing", onPlaying)
      a.removeEventListener("ended", reset)
      a.removeEventListener("error", reset)
    }
  }, [])

  /* Live call level for the wave: smoothed RMS from a WebAudio analyser.
     Only wired for the same-origin source (a cross-origin source without
     CORS headers would silence a MediaElementSource) — without it the wave
     still speaks with LiveKit's default speaking personality. */
  const startAnalysis = () => {
    if (analyserRef.current) return
    if (!DEMO_CALL_SRC.startsWith("/")) return
    const a = audioRef.current
    if (!a) return
    try {
      const ctx = new window.AudioContext()
      const src = ctx.createMediaElementSource(a)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 512
      analyser.smoothingTimeConstant = 0.55
      src.connect(analyser)
      analyser.connect(ctx.destination)
      ctxRef.current = ctx
      analyserRef.current = analyser
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
      const target = Math.min(1, rms * 2.6)
      levelRef.current += (target - levelRef.current) * (target > levelRef.current ? 0.4 : 0.15)
      setVolume(levelRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      setVolume(0)
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
      setAttractIndex(0)
      setVolume(0)
      return
    }
    startAnalysis()
    ctxRef.current?.resume().catch(() => {})
    a.src = DEMO_CALL_SRC
    setCallState("connecting")
    a.play().catch(() => {
      setCallState("idle")
    })
  }

  const pillLabel =
    callState === "idle" ? "Play call" : callState === "connecting" ? "Calling" : "Pause"

  return (
    <div className="lv-agdemo" data-state={callState}>
      <div className="lv-agdemo-voice">
        <div className="lv-agdemo-wave-wrap">
          {reducedMotion ? (
            <div className="lv-agdemo-aura lv-agdemo-aura-static" aria-hidden="true" />
          ) : (
            <AgentAudioVisualizerAura
              className="lv-agdemo-aura"
              state={waveState}
              color={AURA_COLOR}
              colorShift={0.3}
              themeMode="dark"
              volume={callState === "speaking" ? volume : 0}
              aria-hidden="true"
            />
          )}
          {/* The state, named — reads the resting loop as a tour. */}
          <p className="lv-agdemo-wave-state">{waveState}</p>
        </div>

        <button
          type="button"
          className="lv-agdemo-playpill"
          onClick={toggle}
          aria-label={active ? "Pause the governed call" : "Play the governed call"}
          aria-pressed={active}
        >
          <span className="lv-agdemo-playpill-glyph">
            {active ? <PauseGlyph /> : <PlayGlyph />}
          </span>
          <span>{pillLabel}</span>
        </button>
      </div>

      <audio ref={audioRef} preload="none" />
    </div>
  )
}
