"use client"

/* Adapted from LiveKit Agents UI (@agents-ui/agent-audio-visualizer-aura,
   livekit/components-js packages/shadcn). LiveKit's per-state personality —
   speed / scale / amplitude / frequency / brightness — is unchanged. Two
   adaptations for this site (same as the wave hook):
   - `motion/react` is replaced with a small rAF animator: easeOut tween,
     mirrored oscillation, and an easeOutBack tween standing in for the
     listening state's spring.
   - LiveKit track plumbing is dropped; the caller passes `volume` (0-1). */

import { useCallback, useEffect, useRef, useState } from "react"

import { type AgentState } from "@/components/agents-ui/use-agent-audio-visualizer-wave"

const DEFAULT_SPEED = 10
const DEFAULT_AMPLITUDE = 2
const DEFAULT_FREQUENCY = 0.5
const DEFAULT_SCALE = 0.2
const DEFAULT_BRIGHTNESS = 1.5

type Oscillation = { from: number; to: number; duration: number }

function useAnimatedValue(initialValue: number) {
  const [value, setValue] = useState(initialValue)
  const valueRef = useRef(initialValue)
  const rafRef = useRef(0)
  const animatingRef = useRef(false)

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    animatingRef.current = false
  }, [])

  const set = useCallback((v: number) => {
    valueRef.current = v
    setValue(v)
  }, [])

  /* easeOut tween; spring=true approximates motion's bounce with a gentle
     easeOutBack overshoot. duration 0 sets instantly. */
  const tween = useCallback(
    (target: number, duration: number, spring = false) => {
      stop()
      if (duration <= 0) {
        set(target)
        return
      }
      const from = valueRef.current
      const t0 = performance.now()
      animatingRef.current = true
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / (duration * 1000))
        const eased = spring
          ? 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2)
          : 1 - Math.pow(1 - t, 3)
        set(from + (target - from) * eased)
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          animatingRef.current = false
        }
      }
      rafRef.current = requestAnimationFrame(step)
    },
    [set, stop]
  )

  const oscillate = useCallback(
    ({ from, to, duration }: Oscillation) => {
      stop()
      animatingRef.current = true
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

  const isAnimating = useCallback(() => animatingRef.current, [])

  useEffect(() => stop, [stop])

  return { value, tween, oscillate, set, isAnimating }
}

export function useAgentAudioVisualizerAura(state?: AgentState, volume: number = 0) {
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  const scale = useAnimatedValue(DEFAULT_SCALE)
  const amplitude = useAnimatedValue(DEFAULT_AMPLITUDE)
  const frequency = useAnimatedValue(DEFAULT_FREQUENCY)
  const brightness = useAnimatedValue(DEFAULT_BRIGHTNESS)

  /* LiveKit's per-state personality, verbatim. */
  useEffect(() => {
    switch (state) {
      case "disconnected":
        setSpeed(10)
        scale.tween(0.2, 0.5)
        amplitude.tween(1.2, 0.5)
        frequency.tween(0.4, 0.5)
        brightness.tween(1.0, 0.5)
        return
      case "listening":
        setSpeed(20)
        scale.tween(0.3, 1.0, true)
        amplitude.tween(1.0, 0.5)
        frequency.tween(0.7, 0.5)
        brightness.oscillate({ from: 1.5, to: 2.0, duration: 0.35 })
        return
      case "thinking":
      case "connecting":
      case "initializing":
        setSpeed(30)
        scale.tween(0.3, 0.5)
        amplitude.tween(0.5, 0.5)
        frequency.tween(1, 0.5)
        brightness.oscillate({ from: 0.5, to: 2.5, duration: 0.35 })
        return
      case "speaking":
        setSpeed(70)
        scale.tween(0.3, 0.5)
        amplitude.tween(0.75, 0.5)
        frequency.tween(1.25, 0.5)
        brightness.tween(1.5, 0.5)
        return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  useEffect(() => {
    if (state === "speaking" && volume > 0 && !scale.isAnimating()) {
      scale.set(0.2 + 0.2 * volume)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, volume])

  return {
    speed,
    scale: scale.value,
    amplitude: amplitude.value,
    frequency: frequency.value,
    brightness: brightness.value,
  }
}
