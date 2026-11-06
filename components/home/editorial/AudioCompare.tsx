"use client"

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react"
import { Pause, Play, RotateCcw } from "lucide-react"
import DemoTabs from "./DemoTabs"
import {
  comparisonExamples,
  clipTranscript,
  type ComparisonClip,
} from "./audio-comparison-data"

function time(seconds: number) {
  const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0
  return `${Math.floor(safe / 60)}:${Math.floor(safe % 60)
    .toString()
    .padStart(2, "0")}`
}

function TranscriptDisclosure({ children }: { children: ReactNode }) {
  const details = useRef<HTMLDetailsElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const animation = useRef<Animation | null>(null)
  const expanding = useRef(false)
  const [expanded, setExpanded] = useState<boolean>()

  useEffect(() => () => animation.current?.cancel(), [])

  function toggle(event: MouseEvent<HTMLElement>) {
    const disclosure = details.current
    const content = panel.current
    if (!disclosure || !content) return
    event.preventDefault()

    const opening = animation.current ? !expanding.current : !disclosure.open
    // Read the current frame before cancellation so repeated clicks reverse smoothly.
    const height = disclosure.open ? content.getBoundingClientRect().height : 0
    const opacity = disclosure.open ? getComputedStyle(content).opacity : "0"
    animation.current?.cancel()
    animation.current = null
    expanding.current = opening
    setExpanded(opening)

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !content.animate
    ) {
      disclosure.open = opening
      return
    }

    // Keep native details open while closing, then release the measured height.
    disclosure.open = true
    const transition = content.animate(
      [
        { height: `${height}px`, opacity },
        {
          height: `${opening ? content.scrollHeight : 0}px`,
          opacity: opening ? 1 : 0,
        },
      ],
      {
        duration: opening ? 640 : 480,
        easing: "cubic-bezier(0.2, 0.65, 0.3, 1)",
        fill: "both",
      },
    )
    animation.current = transition
    transition.onfinish = () => {
      disclosure.open = opening
      transition.cancel()
      animation.current = null
    }
  }

  return (
    <details
      ref={details}
      className="le-comparison-transcripts"
      onToggle={(event) => {
        if (!animation.current) setExpanded(event.currentTarget.open)
      }}
    >
      <summary onClick={toggle} aria-expanded={expanded}>
        Read transcripts <span aria-hidden="true">+</span>
      </summary>
      <div
        ref={panel}
        className="le-transcripts-reveal"
        inert={expanded === false}
        aria-hidden={expanded === false ? true : undefined}
      >
        {children}
      </div>
    </details>
  )
}

function Clip({
  clip,
  question,
  governed = false,
}: {
  clip: ComparisonClip
  question: string
  governed?: boolean
}) {
  const audio = useRef<HTMLAudioElement>(null)
  const transcript = useRef<HTMLDivElement>(null)
  const followTranscript = useRef(true)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(clip.duration)
  const [error, setError] = useState(false)
  const title = governed ? "Governed" : "Ungoverned"
  const id = `comparison-${governed ? "governed" : "ungoverned"}`
  const ended = duration > 0 && elapsed >= duration - 0.05
  const action = playing ? "Pause" : ended ? "Replay" : "Play"
  const visibleWords = clip.words.filter(([start]) => start <= elapsed)
  const visibleWordCount = visibleWords.length

  useEffect(() => {
    // Cached metadata can arrive before React hydrates the audio element.
    const media = audio.current
    if (media && Number.isFinite(media.duration)) setDuration(media.duration)
    return () => media?.pause()
  }, [])

  useEffect(() => {
    if (!playing) return
    // Read the real media clock, including stalls, instead of advancing a timer.
    const interval = window.setInterval(() => {
      if (audio.current) setElapsed(audio.current.currentTime)
    }, 80)
    return () => window.clearInterval(interval)
  }, [playing])

  useEffect(() => {
    const viewport = transcript.current
    if (viewport && started && followTranscript.current) {
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [visibleWordCount, started])

  async function toggle() {
    const media = audio.current
    if (!media) return
    if (!media.paused) {
      media.pause()
      return
    }
    if (media.ended || ended) {
      media.currentTime = 0
      setElapsed(0)
    }
    followTranscript.current = true
    setError(false)
    try {
      await media.play()
    } catch {
      setError(true)
    }
  }

  return (
    <article
      className={`le-audio-clip${governed ? " is-governed" : ""}${started ? " has-started" : ""}`}
      aria-labelledby={`${id}-title`}
    >
      <h3 className="le-audio-title le-label" id={`${id}-title`}>
        {title}
      </h3>
      <div className="le-audio-controls">
        <button
          type="button"
          className="le-audio-play"
          aria-label={`${action} ${title.toLowerCase()} response`}
          aria-pressed={playing}
          onClick={toggle}
        >
          <svg
            className="le-audio-ring"
            viewBox="0 0 120 56"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect
              className="le-audio-ring-track"
              x="1"
              y="1"
              width="118"
              height="54"
              rx="27"
            />
            <rect
              className="le-audio-ring-orbit"
              x="1"
              y="1"
              width="118"
              height="54"
              rx="27"
              pathLength="100"
            />
          </svg>
          {playing ? (
            <Pause aria-hidden="true" />
          ) : ended ? (
            <RotateCcw aria-hidden="true" />
          ) : (
            <Play aria-hidden="true" />
          )}
          {action}
        </button>
        <div
          className="le-audio-timeline"
          aria-hidden={!started}
          inert={!started}
        >
          <input
            type="range"
            aria-label={`Seek ${title.toLowerCase()} response`}
            min={0}
            max={duration || 1}
            step={0.01}
            value={Math.min(elapsed, duration)}
            disabled={!duration}
            aria-valuetext={`${time(elapsed)} of ${time(duration)}`}
            onChange={(event) => {
              const value = Number(event.currentTarget.value)
              if (audio.current) audio.current.currentTime = value
              followTranscript.current = true
              setElapsed(value)
              setStarted(true)
            }}
          />
          <span className="le-caption">
            {time(elapsed)} / {time(duration)}
          </span>
        </div>
      </div>
      <div
        ref={transcript}
        className="le-clip-transcript"
        role="region"
        aria-label={`${title} transcript`}
        aria-hidden={!started}
        inert={!started}
        tabIndex={started ? 0 : undefined}
        data-lenis-prevent
        onWheel={() => {
          followTranscript.current = false
        }}
        onTouchStart={() => {
          followTranscript.current = false
        }}
        onKeyDown={() => {
          followTranscript.current = false
        }}
      >
        <div className="le-transcript-turn is-caller">
          <span className="le-transcript-speaker">
            Caller <span>Prompt</span>
          </span>
          <p>{question}</p>
        </div>
        <div className="le-transcript-turn is-agent">
          <span className="le-transcript-speaker">Agent</span>
          <p>
            {visibleWords.map(([, word], index) => (
              <span key={index} className="le-transcript-word">
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
      {error ? (
        <p className="le-audio-error" role="status">
          Audio couldn’t play. Read the transcript below or{" "}
          <a href={clip.src}>open the recording</a>.
        </p>
      ) : null}
      <audio
        ref={audio}
        src={clip.src}
        preload="metadata"
        onLoadedMetadata={(event) => {
          if (Number.isFinite(event.currentTarget.duration))
            setDuration(event.currentTarget.duration)
        }}
        onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
        onPlay={() => {
          setPlaying(true)
          setStarted(true)
        }}
        onPause={() => setPlaying(false)}
        onEnded={(event) => {
          setPlaying(false)
          setElapsed(event.currentTarget.duration)
        }}
        onError={() => setError(true)}
      />
    </article>
  )
}

export default function AudioCompare({
  introduction,
}: {
  introduction: ReactNode
}) {
  const [selected, setSelected] = useState(0)
  const example = comparisonExamples[selected]
  useEffect(() => {
    // Moving between demos never leaves multiple recordings speaking at once.
    const root = document.querySelector(".lyric-editorial")
    function exclusivePlayback(event: Event) {
      if (!(event.target instanceof HTMLMediaElement)) return
      root
        ?.querySelectorAll<HTMLMediaElement>("audio, video")
        .forEach((media) => {
          if (media !== event.target && !media.paused) media.pause()
        })
    }
    root?.addEventListener("play", exclusivePlayback, true)
    return () => root?.removeEventListener("play", exclusivePlayback, true)
  }, [])
  return (
    <div className="le-proof-layout">
      <div className="le-proof-intro" data-reveal>
        {introduction}
      </div>
      <div className="le-audio-comparison" data-reveal data-reveal-delay="90">
        <DemoTabs
          id="comparison"
          label="Choose a recorded example"
          items={comparisonExamples.map((item) => item.label)}
          selected={selected}
          onSelect={setSelected}
          showNumbers={false}
        />
        <div
          id="comparison-panel"
          role="tabpanel"
          aria-labelledby={`comparison-tab-${selected}`}
          tabIndex={0}
        >
          <div className="le-audio-pair" key={selected}>
            <Clip clip={example.before} question={example.question} />
            <Clip clip={example.after} question={example.question} governed />
          </div>
          <div className="le-comparison-caption">
            <p>Recorded agent responses. Caller prompts shown for context.</p>
            <TranscriptDisclosure key={selected}>
              <div className="le-transcripts-full">
                <p className="le-transcript-context">
                  <span className="le-transcript-speaker">Caller · Prompt</span>
                  {example.question}
                </p>
                {[
                  { label: "Ungoverned agent", clip: example.before },
                  { label: "Governed agent", clip: example.after },
                ].map(({ label, clip }) => (
                  <div key={label}>
                    <h4 className="le-label">{label}</h4>
                    <p>{clipTranscript(clip)}</p>
                  </div>
                ))}
              </div>
            </TranscriptDisclosure>
          </div>
        </div>
      </div>
    </div>
  )
}
