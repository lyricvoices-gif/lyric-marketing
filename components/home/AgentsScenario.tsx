"use client"

import Link from "next/link"
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import ScrollReveal from "@/components/ScrollReveal"

type TranscriptRole = "Agent" | "Customer"

type GovernanceAnnotation = {
  label: string
  delay: number
}

export type DemoTranscriptTurn = {
  id: string
  start: number
  role: TranscriptRole
  text: string
  annotations?: readonly GovernanceAnnotation[]
}

export type GovernedExperienceDemo = {
  id: string
  channel: "voice" | "text"
  audio?: {
    src: string
    fallbackDuration: number
    firstTurnAt: number
  }
  transcript: readonly DemoTranscriptTurn[]
}

/* This is the exact script currently paired with the /agents hero audio.
   Starts are calculated from the checked-in line durations and stitch gaps in
   scripts/generate-fs-demo-call.mjs, so the transcript follows the real
   recording rather than a generic caption track. The current agent take uses
   Jessica Anne Bogart (ElevenLabs voice g6xIsTj2HwM6VR4iXFCw); annotations
   appear only where the spoken turn directly demonstrates the named behavior. */
const FS_HERO_TRANSCRIPT: readonly DemoTranscriptTurn[] = [
  {
    id: "opening",
    start: 2.9,
    role: "Agent",
    text: "For quality and training purposes, calls may be recorded. Thank you for calling Oakhaven Capital. I'm your banking concierge. How can I help?",
    annotations: [{ label: "Disclosure present", delay: 3.1 }],
  },
  {
    id: "charge",
    start: 11.676984,
    role: "Customer",
    text: "Hi, um, I'm looking at my account and there's a charge for three hundred and twelve dollars that I definitely didn't make.",
  },
  {
    id: "verify-request",
    start: 18.131973,
    role: "Agent",
    text: "I'm sorry to hear that. I'll do my best to help. Before I can access your account, I'll need to verify your identity. Can you confirm the last four digits of the account number you're calling about?",
    annotations: [{ label: "Verify before access", delay: 6.4 }],
  },
  {
    id: "account-digits",
    start: 29.370272,
    role: "Customer",
    text: "It's the account ending in two, two, four, five.",
  },
  {
    id: "two-factor-request",
    start: 33.271066,
    role: "Agent",
    text: "Thank you. For added security, I've just sent a one-time verification code to the mobile number ending in four two. Could you read that code back to me?",
    annotations: [{ label: "Two-factor verification", delay: 2.8 }],
  },
  {
    id: "verification-code",
    start: 43.64449,
    role: "Customer",
    text: "Sure, one sec... okay, got it. It's four seven one two... nine five.",
  },
  {
    id: "verify-code",
    start: 48.427642,
    role: "Agent",
    text: "Thank you. One moment while I verify that.",
  },
  {
    id: "lookup",
    start: 53.992676,
    role: "Agent",
    text: "Thanks for verifying your identity. One moment while I look into that charge.",
  },
  {
    id: "merchant",
    start: 63.368866,
    role: "Agent",
    text: "Thank you for holding. I can see the three hundred twelve dollar charge you mentioned. Do you recognize the merchant listed on the transaction?",
  },
  {
    id: "unfamiliar",
    start: 72.05297,
    role: "Customer",
    text: "No, I've never heard of them.",
  },
  {
    id: "outcome",
    start: 73.910408,
    role: "Agent",
    text: "Understood. I've opened a dispute for the three hundred twelve dollar charge and applied a temporary credit to your account while we investigate. If we determine the charge was unauthorized, you won't be responsible for it. I'll walk you through what happens next.",
    annotations: [
      { label: "Required behavior met", delay: 6.2 },
      { label: "Resolution path explained", delay: 11.2 },
    ],
  },
] as const

const FS_HERO_DEMO: GovernedExperienceDemo = {
  id: "financial-services-hero-call",
  channel: "voice",
  audio: {
    src: "/audio/fs-demo-call.mp3",
    fallbackDuration: 87.981701,
    firstTurnAt: 2.9,
  },
  transcript: FS_HERO_TRANSCRIPT,
}

function formatTime(value: number) {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0
  const minutes = Math.floor(safe / 60)
  const seconds = Math.floor(safe % 60)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function DemoControls({
  playing,
  ended,
  muted,
  currentTime,
  duration,
  hasError,
  onListen,
  onMute,
  onSeek,
}: {
  playing: boolean
  ended: boolean
  muted: boolean
  currentTime: number
  duration: number
  hasError: boolean
  onListen: () => void
  onMute: () => void
  onSeek: (time: number) => void
}) {
  const progress = Math.min(100, (currentTime / Math.max(duration, 0.01)) * 100)
  const primaryLabel = ended
    ? "Replay"
    : playing && !muted
      ? "Pause"
      : playing && muted
        ? "Listen in"
        : currentTime > 0.1
          ? "Continue"
          : "Listen in"

  return (
    <div className="lv-splitdemo-controls">
      <div className="lv-splitdemo-actions">
        <button
          type="button"
          className="lv-splitdemo-listen"
          onClick={onListen}
          aria-label={`${primaryLabel} the governed financial services conversation`}
          aria-pressed={playing && !muted}
        >
          {playing && !muted ? (
            <Pause aria-hidden="true" />
          ) : ended ? (
            <RotateCcw aria-hidden="true" />
          ) : (
            <Play aria-hidden="true" />
          )}
          <span>{primaryLabel}</span>
        </button>

        <button
          type="button"
          className="lv-splitdemo-mute"
          onClick={onMute}
          aria-label={muted ? "Unmute conversation" : "Mute conversation"}
          aria-pressed={muted}
        >
          {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
          <span>{muted ? "Unmute" : "Mute"}</span>
        </button>
      </div>

      <label className="lv-splitdemo-timeline">
        <span className="lv-splitdemo-sr">Seek through the governed financial services conversation</span>
        <input
          type="range"
          min={0}
          max={Math.max(duration, 0.01)}
          step={0.05}
          value={Math.min(currentTime, duration)}
          onChange={(event) => onSeek(Number(event.currentTarget.value))}
          style={{ "--split-progress": `${progress}%` } as CSSProperties}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        />
      </label>

      <span className="lv-splitdemo-time" aria-hidden="true">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      {hasError ? (
        <p className="lv-splitdemo-error" role="status">
          Audio could not start. The synchronized transcript is continuing silently.
        </p>
      ) : null}
    </div>
  )
}

export function LyricGovernedDemo({ demo }: { demo: GovernedExperienceDemo }) {
  const rootRef = useRef<HTMLElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const turnRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const manualReadingUntilRef = useRef(0)
  const autoplayAttemptedRef = useRef(false)
  const fallbackTimerRef = useRef<number | null>(null)
  const scrollAnimationFrameRef = useRef<number | null>(null)
  const fallbackBaseRef = useRef(0)
  const fallbackStartedRef = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [ended, setEnded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const firstTurnAt = demo.audio?.firstTurnAt ?? 0
  const [absoluteTime, setAbsoluteTime] = useState(firstTurnAt)
  const [absoluteDuration, setAbsoluteDuration] = useState(
    demo.audio?.fallbackDuration ?? demo.transcript.at(-1)?.start ?? 0,
  )

  const experienceTime = Math.max(0, absoluteTime - firstTurnAt)
  const experienceDuration = Math.max(0, absoluteDuration - firstTurnAt)
  const activeTurnIndex = hasStarted
    ? demo.transcript.reduce(
        (found, turn, index) => (absoluteTime >= turn.start ? index : found),
        -1,
      )
    : -1
  const visibleTurns = activeTurnIndex >= 0 ? demo.transcript.slice(0, activeTurnIndex + 1) : []

  const stopFallback = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearInterval(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }
    setUsingFallback(false)
  }, [])

  const startFallback = useCallback(
    (from: number) => {
      if (fallbackTimerRef.current !== null) window.clearInterval(fallbackTimerRef.current)
      fallbackBaseRef.current = Math.max(firstTurnAt, from)
      fallbackStartedRef.current = performance.now()
      setHasStarted(true)
      setUsingFallback(true)
      setPlaying(true)
      setEnded(false)

      fallbackTimerRef.current = window.setInterval(() => {
        const elapsed = (performance.now() - fallbackStartedRef.current) / 1000
        const next = Math.min(absoluteDuration, fallbackBaseRef.current + elapsed)
        setAbsoluteTime(next)
        if (next >= absoluteDuration) {
          if (fallbackTimerRef.current !== null) window.clearInterval(fallbackTimerRef.current)
          fallbackTimerRef.current = null
          setUsingFallback(false)
          setPlaying(false)
          setEnded(true)
        }
      }, 100)
    },
    [absoluteDuration, firstTurnAt],
  )

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const syncTime = () => {
      if (!usingFallback) setAbsoluteTime(Math.max(firstTurnAt, audio.currentTime))
    }
    const syncDuration = () => {
      if (Number.isFinite(audio.duration)) setAbsoluteDuration(audio.duration)
    }
    const finish = () => {
      if (usingFallback) return
      setAbsoluteTime(audio.duration)
      setPlaying(false)
      setEnded(true)
    }

    audio.addEventListener("timeupdate", syncTime)
    audio.addEventListener("loadedmetadata", syncDuration)
    audio.addEventListener("durationchange", syncDuration)
    audio.addEventListener("ended", finish)
    return () => {
      audio.removeEventListener("timeupdate", syncTime)
      audio.removeEventListener("loadedmetadata", syncDuration)
      audio.removeEventListener("durationchange", syncDuration)
      audio.removeEventListener("ended", finish)
    }
  }, [firstTurnAt, usingFallback])

  useEffect(() => {
    const root = rootRef.current
    const audio = audioRef.current
    if (!root || !audio || !demo.audio) return

    const beginMutedDemo = () => {
      if (autoplayAttemptedRef.current) return
      autoplayAttemptedRef.current = true
      audio.currentTime = firstTurnAt
      audio.muted = true
      setMuted(true)
      setHasStarted(true)
      setAbsoluteTime(firstTurnAt)
      setEnded(false)
      audio
        .play()
        .then(() => {
          setPlaying(true)
          setHasError(false)
        })
        .catch(() => {
          /* Muted autoplay can still be blocked by browser policy. The
             transcript clock takes over silently without treating that
             expected policy decision as an error. */
          setHasError(false)
          startFallback(firstTurnAt)
        })
    }

    if (!("IntersectionObserver" in window)) {
      beginMutedDemo()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || autoplayAttemptedRef.current) return
        observer.disconnect()
        beginMutedDemo()
      },
      { threshold: 0.22 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [demo.audio, firstTurnAt, startFallback])

  useEffect(
    () => () => {
      if (fallbackTimerRef.current !== null) window.clearInterval(fallbackTimerRef.current)
      if (scrollAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationFrameRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    const pane = transcriptRef.current
    const currentTurn = activeTurnIndex >= 0 ? demo.transcript[activeTurnIndex] : null
    const node = currentTurn ? turnRefs.current[currentTurn.id] : null
    if (!pane || !node || Date.now() < manualReadingUntilRef.current) return

    const top = Math.max(0, node.offsetTop - pane.clientHeight * 0.42)
    if (scrollAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current)
      scrollAnimationFrameRef.current = null
    }

    if (reducedMotion) {
      pane.scrollTop = top
      return
    }

    const from = pane.scrollTop
    const distance = top - from
    if (Math.abs(distance) < 1) return

    const startedAt = performance.now()
    const duration = 620
    const advance = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      pane.scrollTop = from + distance * eased

      if (progress < 1) {
        scrollAnimationFrameRef.current = window.requestAnimationFrame(advance)
      } else {
        scrollAnimationFrameRef.current = null
      }
    }

    scrollAnimationFrameRef.current = window.requestAnimationFrame(advance)
    return () => {
      if (scrollAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationFrameRef.current)
        scrollAnimationFrameRef.current = null
      }
    }
  }, [activeTurnIndex, demo.transcript, reducedMotion])

  const markManualReading = () => {
    if (scrollAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current)
      scrollAnimationFrameRef.current = null
    }
    manualReadingUntilRef.current = Date.now() + 6000
  }

  const startAudiblePlayback = async (from: number) => {
    const audio = audioRef.current
    if (!audio) return false
    stopFallback()
    audio.currentTime = Math.min(absoluteDuration, Math.max(firstTurnAt, from))
    audio.muted = false
    setMuted(false)
    setHasStarted(true)
    setEnded(false)
    setAbsoluteTime(Math.min(absoluteDuration, Math.max(firstTurnAt, from)))
    try {
      await audio.play()
      setPlaying(true)
      setHasError(false)
      return true
    } catch {
      audio.muted = true
      setMuted(true)
      setHasError(true)
      startFallback(from)
      return false
    }
  }

  const listenIn = async () => {
    const audio = audioRef.current
    if (!audio || !demo.audio) return

    if (playing && !muted && !usingFallback) {
      audio.pause()
      setPlaying(false)
      return
    }

    const restart = ended || absoluteTime >= absoluteDuration - 0.1
    const from = restart ? firstTurnAt : absoluteTime
    if (restart) {
      setAbsoluteTime(firstTurnAt)
      setEnded(false)
      transcriptRef.current?.scrollTo({ top: 0, behavior: "auto" })
    }
    await startAudiblePlayback(from)
  }

  const toggleMute = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (muted) {
      if (ended) transcriptRef.current?.scrollTo({ top: 0, behavior: "auto" })
      await startAudiblePlayback(ended ? firstTurnAt : absoluteTime)
      return
    }

    audio.muted = true
    setMuted(true)
  }

  const seek = (time: number) => {
    const audio = audioRef.current
    if (!audio) return
    const next = Math.min(absoluteDuration, Math.max(firstTurnAt, time + firstTurnAt))
    audio.currentTime = next
    setAbsoluteTime(next)
    setHasStarted(true)
    setEnded(next >= absoluteDuration - 0.1)
    if (usingFallback) startFallback(next)
  }

  return (
    <article ref={rootRef} className="lv-splitdemo" data-demo-channel={demo.channel}>
      <div
        ref={transcriptRef}
        className="lv-splitdemo-transcript"
        onWheel={markManualReading}
        onTouchStart={markManualReading}
        onPointerDown={markManualReading}
        onKeyDown={markManualReading}
        tabIndex={0}
        aria-label="Transcript of a governed financial services agent and a customer discussing an unfamiliar charge"
        aria-live="off"
      >
        {visibleTurns.map((turn, index) => {
          return (
            <div
              key={turn.id}
              ref={(node) => {
                turnRefs.current[turn.id] = node
              }}
              className={`lv-splitdemo-turn is-${turn.role.toLowerCase()}${index === activeTurnIndex ? " is-current" : ""}`}
              aria-current={index === activeTurnIndex ? "true" : undefined}
            >
              <div className="lv-splitdemo-speaker">
                <span>{turn.role}</span>
              </div>
              <p>{turn.text}</p>
              {turn.annotations?.map((annotation) => {
                const annotationVisible = absoluteTime >= turn.start + annotation.delay
                return (
                  <span
                    key={annotation.label}
                    className={`lv-splitdemo-proof${annotationVisible ? " is-shown" : ""}`}
                  >
                    <span className="lv-splitdemo-proof-dot" aria-hidden="true" />
                    {annotation.label}
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>

      {demo.audio ? (
        <DemoControls
          playing={playing}
          ended={ended}
          muted={muted}
          currentTime={experienceTime}
          duration={experienceDuration}
          hasError={hasError}
          onListen={listenIn}
          onMute={toggleMute}
          onSeek={seek}
        />
      ) : null}

      {demo.audio ? <audio ref={audioRef} src={demo.audio.src} preload="metadata" playsInline /> : null}
    </article>
  )
}

export default function AgentsScenario() {
  return (
    <div className="lv-splitdemo-wrap">
      <ScrollReveal className="lv-splitdemo-reveal" distance={28}>
        <LyricGovernedDemo demo={FS_HERO_DEMO} />
      </ScrollReveal>

      <ScrollReveal>
        <Link href="/agents" className="lv-splitdemo-link">
          Explore our prebuilt agents <span aria-hidden="true">↗</span>
        </Link>
      </ScrollReveal>
    </div>
  )
}
