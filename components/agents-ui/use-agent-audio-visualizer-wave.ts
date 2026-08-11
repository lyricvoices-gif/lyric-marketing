"use client"

/* Adapted from LiveKit Agents UI (@agents-ui/agent-audio-visualizer-wave,
   livekit/components-js packages/shadcn, Apache-2.0/MIT registry source).
   The state personality — speed / amplitude / frequency / opacity per agent
   state — is LiveKit's, unchanged. Two adaptations for this site:
   - `motion/react` is replaced with a small rAF animator (tween + mirrored
     oscillation) so no animation dependency is added.
   - LiveKit track plumbing is dropped; the caller passes `volume` (0-1)
     directly (the demo player computes it from its own WebAudio analyser). */

import { useCallback, useEffect, useRef, useState } from "react"

export type AgentState =
  | "disconnected"
  | "connecting"
  | "initializing"
  | "listening"
  | "thinking"
  | "speaking"

const DEFAULT_SPEED = 5
const DEFAULT_AMPLITUDE = 0.025
const DEFAULT_FREQUENCY = 10

type Oscillation = { from: number; to: number; duration: number }

/* Minimal stand-in for motion's animate(): easeOut tween to a target, or a
   mirrored infinite oscillation between two values. duration 0 sets
   instantly (used per-frame while speaking). */
function useAnimatedValue(initialValue: number) {
  const [value, setValue] = useState(initialValue)
  const valueRef = useRef(initialValue)
  const rafRef = useRef(0)

  const stop = useCallback(() => cancelAnimationFrame(rafRef.current), [])

  const set = useCallback((v: number) => {
    valueRef.current = v
    setValue(v)
  }, [])

  const tween = useCallback(
    (target: number, duration: number) => {
      stop()
      if (duration <= 0) {
        set(target)
        return
      }
      const from = valueRef.current
      const t0 = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / (duration * 1000))
        const eased = 1 - Math.pow(1 - t, 3)
        set(from + (target - from) * eased)
        if (t < 1) rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    },
    [set, stop]
  )

  const oscillate = useCallback(
    ({ from, to, duration }: Oscillation) => {
      stop()
      const t0 = performance.now()
      const step = (now: number) => {
        const phase = ((now - t0) / (duration * 1000)) % 2
        const t = phase < 1 ? phase : 2 - phase
        const eased = t * t * (3 - 2 * t)
        set(from + (to - from) * eased)
        rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    },
    [set, stop]
  )

  useEffect(() => stop, [stop])

  return { value, tween, oscillate, set }
}

export function useAgentAudioVisualizerWave({
  state,
  volume = 0,
}: {
  state?: AgentState
  volume?: number
}) {
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  const amplitude = useAnimatedValue(DEFAULT_AMPLITUDE)
  const frequency = useAnimatedValue(DEFAULT_FREQUENCY)
  const opacity = useAnimatedValue(1.0)

  /* LiveKit's per-state personality, verbatim. */
  useEffect(() => {
    switch (state) {
      case "disconnected":
        setSpeed(DEFAULT_SPEED)
        amplitude.tween(0, 0.2)
        frequency.tween(0, 0.2)
        opacity.tween(1.0, 0.2)
        return
      case "listening":
        setSpeed(DEFAULT_SPEED)
        amplitude.tween(DEFAULT_AMPLITUDE, 0.2)
        frequency.tween(DEFAULT_FREQUENCY, 0.2)
        opacity.oscillate({ from: 1.0, to: 0.3, duration: 0.75 })
        return
      case "thinking":
      case "connecting":
      case "initializing":
        setSpeed(DEFAULT_SPEED * 4)
        amplitude.tween(DEFAULT_AMPLITUDE / 4, 0.2)
        frequency.tween(DEFAULT_FREQUENCY * 4, 0.2)
        opacity.oscillate({ from: 1.0, to: 0.3, duration: 0.4 })
        return
      case "speaking":
      default:
        setSpeed(DEFAULT_SPEED * 2)
        opacity.tween(1.0, 0.2)
        return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  useEffect(() => {
    if (state === "speaking") {
      amplitude.set(0.015 + 0.4 * volume)
      frequency.set(20 + 60 * volume)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, volume])

  return {
    speed,
    amplitude: amplitude.value,
    frequency: frequency.value,
    opacity: opacity.value,
  }
}
