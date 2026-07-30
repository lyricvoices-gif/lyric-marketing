"use client"

/* Shared audio state + play ring for the roster layout explorations —
   the lv-vtile ring mechanics (track + accent progress arc) in a
   size-parametrized form, and one audio element per variant so a single
   voice plays at a time within a variant. */

import { useEffect, useRef, useState } from "react"
import type { RosterVoice } from "./data"

export function useRosterAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => {
      if (a.duration > 0) {
        setProgress(a.currentTime / a.duration)
        setElapsed(a.currentTime)
        setDuration(a.duration)
      }
    }
    const reset = () => {
      setPlaying(null)
      setProgress(0)
      setElapsed(0)
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

  const toggle = (v: RosterVoice) => {
    const a = audioRef.current
    if (!a) return
    if (playing === v.id) {
      a.pause()
      setPlaying(null)
      setProgress(0)
      setElapsed(0)
      return
    }
    a.src = v.sample
    setProgress(0)
    setElapsed(0)
    setPlaying(v.id)
    a.play().catch(() => {
      setPlaying(null)
      setProgress(0)
    })
  }

  return { audioRef, playing, progress, elapsed, duration, toggle }
}

export function fmtTime(s: number) {
  if (!isFinite(s) || s <= 0) return "0:00"
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${String(r).padStart(2, "0")}`
}

export function PlayRing({
  size,
  playing,
  progress,
  accent,
  label,
  onClick,
}: {
  size: number
  playing: boolean
  progress: number
  accent: string
  label: string
  onClick: () => void
}) {
  const r = size / 2 - 3
  const c = 2 * Math.PI * r
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={playing}
      className="lvx-ring-btn"
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "inline-grid",
        placeItems: "center",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        color: playing ? accent : "var(--olive)",
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(90,94,67,0.22)"
          strokeWidth="1.5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - (playing ? progress : 0))}
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        width={size * 0.42}
        height={size * 0.42}
        fill="currentColor"
        aria-hidden="true"
      >
        {playing ? (
          <>
            <rect x="7" y="5" width="3.5" height="14" rx="1" />
            <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
          </>
        ) : (
          <path d="M8 5.5v13l11-6.5z" />
        )}
      </svg>
    </button>
  )
}
