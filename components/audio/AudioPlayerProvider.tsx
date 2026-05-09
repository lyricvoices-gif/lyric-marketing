"use client"

/* Global audio player infrastructure.

   A single hidden <audio> element backs the entire site so only one
   source ever plays at a time — selecting a voice clip while the
   Briefing is playing pauses the Briefing automatically, and any
   surface (Listen section now, Notes article pages later) hooks into
   the same context. The persistent global playback bar reads from this
   context too, slides in when audio starts, slides out when stopped.

   The store is a small React Context — no dependency on a state
   library — to keep the audio infrastructure self-contained and easy
   to lift into other Lyric properties. */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export type Track = {
  id: string
  src: string
  /* What to render in the persistent bar's "now playing" line. The
     voice name appears in body type; the title appears in display
     type next to it. */
  voiceName: string
  title: string
  /* Per-voice brand color used for the attribution dot, the active
     state outline on persona cards, and the playback bar's voice
     marker. Hex string. */
  voiceColor: string
  /* Editorial label for the bar's metadata column. e.g. "4 min listen"
     for a Briefing episode, "0:23" for a voice signature clip. */
  durationLabel?: string
  type: "briefing" | "voice-sample" | "note"
}

type AudioState = {
  /* The track that's currently loaded (may be paused). null when no
     track has been selected — the persistent bar is hidden in this
     state. */
  track: Track | null
  isPlaying: boolean
  /* Live progress reported by the audio element. duration may be NaN
     until metadata loads. */
  currentTime: number
  duration: number
  play: (track: Track) => void
  toggle: (track: Track) => void
  pause: () => void
  resume: () => void
  stop: () => void
  seek: (seconds: number) => void
}

const Ctx = createContext<AudioState | null>(null)

export function useAudioPlayer(): AudioState {
  const ctx = useContext(Ctx)
  if (!ctx) {
    throw new Error(
      "useAudioPlayer must be used inside AudioPlayerProvider — wrap your app in <AudioPlayerProvider>."
    )
  }
  return ctx
}

/* Convenience hook for play surfaces (Briefing player, persona card)
   that need to know whether *they* are the active source. Returns:
   - isActive: this surface is the current track (may be paused)
   - isPlaying: this surface is actively playing
   - toggle: play this track, or pause it if already active */
export function useTrackState(track: Track) {
  const { track: current, isPlaying, toggle } = useAudioPlayer()
  const isActive = current?.id === track.id
  return {
    isActive,
    isPlaying: isActive && isPlaying,
    toggle: () => toggle(track),
  }
}

export default function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [track, setTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  /* Keep refs to the latest state so audio event handlers (which are
     attached to the element once) read fresh values without churning
     listener registrations on every render. */
  const trackRef = useRef<Track | null>(null)
  trackRef.current = track

  /* Lazy-create a single hidden audio element and wire its event
     stream to React state. We use a ref-managed element rather than a
     React-rendered <audio> tag so the same element survives any
     remount of the provider during dev HMR and so we never end up with
     two audio elements playing at once. */
  useEffect(() => {
    if (typeof window === "undefined") return
    const a = new Audio()
    a.preload = "metadata"
    audioRef.current = a

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      a.currentTime = 0
    }
    const onTime = () => setCurrentTime(a.currentTime)
    const onMeta = () => setDuration(a.duration || 0)
    const onError = () => setIsPlaying(false)

    a.addEventListener("play", onPlay)
    a.addEventListener("pause", onPause)
    a.addEventListener("ended", onEnded)
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("loadedmetadata", onMeta)
    a.addEventListener("error", onError)

    return () => {
      a.removeEventListener("play", onPlay)
      a.removeEventListener("pause", onPause)
      a.removeEventListener("ended", onEnded)
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("loadedmetadata", onMeta)
      a.removeEventListener("error", onError)
      a.pause()
      a.src = ""
    }
  }, [])

  const play = useCallback((next: Track) => {
    const a = audioRef.current
    if (!a) return
    const wasSameTrack = trackRef.current?.id === next.id
    if (!wasSameTrack) {
      a.src = next.src
      a.currentTime = 0
      setCurrentTime(0)
      setDuration(0)
      setTrack(next)
    }
    a.play().catch(() => {
      // Autoplay restrictions or load errors. State will reset via the
      // 'error' listener; surface stays in its current visual state.
    })
  }, [])

  const pause = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    a.pause()
  }, [])

  const resume = useCallback(() => {
    const a = audioRef.current
    if (!a || !trackRef.current) return
    a.play().catch(() => {})
  }, [])

  const stop = useCallback(() => {
    const a = audioRef.current
    if (a) {
      a.pause()
      a.currentTime = 0
      a.src = ""
    }
    setTrack(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [])

  const toggle = useCallback(
    (next: Track) => {
      const a = audioRef.current
      if (!a) return
      const sameTrack = trackRef.current?.id === next.id
      if (sameTrack && !a.paused) {
        a.pause()
      } else {
        play(next)
      }
    },
    [play]
  )

  const seek = useCallback((seconds: number) => {
    const a = audioRef.current
    if (!a) return
    a.currentTime = seconds
    setCurrentTime(seconds)
  }, [])

  const value = useMemo<AudioState>(
    () => ({
      track,
      isPlaying,
      currentTime,
      duration,
      play,
      toggle,
      pause,
      resume,
      stop,
      seek,
    }),
    [track, isPlaying, currentTime, duration, play, toggle, pause, resume, stop, seek]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
