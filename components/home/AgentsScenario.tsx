"use client"

import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import ScrollReveal from "@/components/ScrollReveal"

import {
  FS_HERO_DEMO,
  type GovernedExperienceDemo,
} from "@/components/home/governed-demo"
export { FS_HERO_DEMO } from "@/components/home/governed-demo"
export type {
  DemoTranscriptTurn,
  GovernedExperienceDemo,
} from "@/components/home/governed-demo"

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
    : playing
      ? "Pause"
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
          aria-pressed={playing}
        >
          {playing ? (
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
          {muted ? (
            <VolumeX aria-hidden="true" />
          ) : (
            <Volume2 aria-hidden="true" />
          )}
          <span>{muted ? "Unmute" : "Mute"}</span>
        </button>
      </div>

      <label className="lv-splitdemo-timeline">
        <span className="lv-splitdemo-sr">
          Seek through the governed financial services conversation
        </span>
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
          Audio could not start. The synchronized transcript is continuing
          silently.
        </p>
      ) : null}
    </div>
  )
}

export function LyricGovernedDemo({
  demo,
  autoPlay = true,
  chapters,
}: {
  demo: GovernedExperienceDemo
  autoPlay?: boolean
  chapters?: readonly { label: string; time: number }[]
}) {
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
  const [hasStarted, setHasStarted] = useState(!autoPlay)
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
  const visibleTurns =
    activeTurnIndex >= 0 ? demo.transcript.slice(0, activeTurnIndex + 1) : []

  const stopFallback = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearInterval(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }
    setUsingFallback(false)
  }, [])

  const startFallback = useCallback(
    (from: number) => {
      if (fallbackTimerRef.current !== null)
        window.clearInterval(fallbackTimerRef.current)
      fallbackBaseRef.current = Math.max(firstTurnAt, from)
      fallbackStartedRef.current = performance.now()
      setHasStarted(true)
      setUsingFallback(true)
      setPlaying(true)
      setEnded(false)

      fallbackTimerRef.current = window.setInterval(() => {
        const elapsed = (performance.now() - fallbackStartedRef.current) / 1000
        const next = Math.min(
          absoluteDuration,
          fallbackBaseRef.current + elapsed,
        )
        setAbsoluteTime(next)
        if (next >= absoluteDuration) {
          if (fallbackTimerRef.current !== null)
            window.clearInterval(fallbackTimerRef.current)
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
      if (!usingFallback)
        setAbsoluteTime(Math.max(firstTurnAt, audio.currentTime))
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
    const syncPaused = () => setPlaying(false)
    audio.addEventListener("pause", syncPaused)
    return () => {
      audio.removeEventListener("timeupdate", syncTime)
      audio.removeEventListener("loadedmetadata", syncDuration)
      audio.removeEventListener("durationchange", syncDuration)
      audio.removeEventListener("ended", finish)
      audio.removeEventListener("pause", syncPaused)
    }
  }, [firstTurnAt, usingFallback])

  useEffect(() => {
    const root = rootRef.current
    const audio = audioRef.current
    if (
      !root ||
      !audio ||
      !demo.audio ||
      !autoPlay ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return

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
  }, [autoPlay, demo.audio, firstTurnAt, startFallback])

  useEffect(
    () => () => {
      if (fallbackTimerRef.current !== null)
        window.clearInterval(fallbackTimerRef.current)
      if (scrollAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationFrameRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    const pane = transcriptRef.current
    const currentTurn =
      activeTurnIndex >= 0 ? demo.transcript[activeTurnIndex] : null
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

    if (playing) {
      audio.pause()
      stopFallback()
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
    const next = Math.min(
      absoluteDuration,
      Math.max(firstTurnAt, time + firstTurnAt),
    )
    audio.currentTime = next
    setAbsoluteTime(next)
    setHasStarted(true)
    const atEnd = next >= absoluteDuration - 0.1
    setEnded(atEnd)
    if (atEnd) {
      audio.pause()
      stopFallback()
      setPlaying(false)
    } else if (usingFallback) startFallback(next)
  }

  return (
    <article
      ref={rootRef}
      className="lv-splitdemo"
      data-demo-channel={demo.channel}
    >
      {chapters ? (
        <div
          className="le-conversation-chapters"
          aria-label="Play a conversation chapter"
        >
          {chapters.map((chapter, index) => (
            <button
              key={chapter.label}
              type="button"
              aria-label={`Play ${chapter.label.toLowerCase()} chapter`}
              aria-current={
                absoluteTime >= chapter.time &&
                absoluteTime < (chapters[index + 1]?.time ?? Infinity)
                  ? "true"
                  : undefined
              }
              onClick={() => {
                manualReadingUntilRef.current = 0
                void startAudiblePlayback(chapter.time)
              }}
            >
              <span>
                {formatTime(chapter.time - firstTurnAt)}{" "}
                <span aria-hidden="true">↗</span>
              </span>
              {chapter.label}
            </button>
          ))}
        </div>
      ) : null}
      <div
        ref={transcriptRef}
        className="lv-splitdemo-transcript"
        data-lenis-prevent
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
                const annotationVisible =
                  absoluteTime >= turn.start + annotation.delay
                return (
                  <span
                    key={annotation.label}
                    className={`lv-splitdemo-proof${annotationVisible ? " is-shown" : ""}`}
                    aria-hidden={!annotationVisible}
                  >
                    <span
                      className="lv-splitdemo-proof-dot"
                      aria-hidden="true"
                    />
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

      {demo.audio ? (
        <audio
          ref={audioRef}
          src={demo.audio.src}
          preload="metadata"
          playsInline
        />
      ) : null}
    </article>
  )
}

export default function AgentsScenario() {
  return (
    <div className="lv-splitdemo-wrap">
      <ScrollReveal className="lv-splitdemo-reveal" distance={28}>
        <LyricGovernedDemo demo={FS_HERO_DEMO} />
      </ScrollReveal>
    </div>
  )
}
