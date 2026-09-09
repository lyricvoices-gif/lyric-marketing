"use client"

/* The pricing hero's live call surface: the actual governed FS agent on a
   live, unscripted call, running on the hosted LiveKit Cloud worker (the
   production agent). This is deliberately distinct from the produced
   scenario players on the home and agents pages (DemoCallPlayer,
   AgentChannelDemo): nothing here is a recording.

   Composition follows DemoCallPlayer's conventions: the vendored Agents UI
   aura as the agent's visual personality, one pill action beneath it, a
   quiet mono state caption. At rest the aura tours the agent's states on a
   loop; "Call the agent" mints a token (app/api/livekit-token), joins a
   fresh room, and the hosted worker dispatches into it. During the call the
   aura rides the agent's real state and speech level via useAgent and
   useTrackVolume. Under reduced motion the shader is replaced with the
   still sage disc. */

import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { Room } from "livekit-client"
import {
  RoomAudioRenderer,
  RoomContext,
  useAgent,
  useTrackVolume,
  type AgentState as LiveAgentState,
} from "@livekit/components-react"

import { AgentAudioVisualizerAura } from "@/components/agents-ui/agent-audio-visualizer-aura"
import { type AgentState as AuraState } from "@/components/agents-ui/use-agent-audio-visualizer-wave"

/* The page accent (sage) carries the aura, as on the agents page. */
const AURA_COLOR = "#C1C17E" as const

/* The static sage disc that stands in for the WebGL aura — used under reduced
   motion, before mount, when WebGL is unavailable, and as the error-boundary
   fallback. */
const STATIC_DISC = (
  <div className="lv-agdemo-aura lv-agdemo-aura-static" aria-hidden="true" />
)

/* Render the aura only once we've confirmed, on the client, that WebGL can
   actually create a context. Starting false means the server and the first
   client render both emit the static disc (no hydration mismatch); the effect
   then upgrades to the live aura only where WebGL works. Browsers with WebGL
   disabled or blocked never attempt the shader, so they can't crash on it. */
function useAuraReady(): boolean {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    try {
      const canvas = document.createElement("canvas")
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setReady(Boolean(gl))
    } catch {
      setReady(false)
    }
  }, [])
  return ready
}

/* Last-resort guard: if the shader throws during render despite the WebGL
   check, degrade to the static disc instead of taking the page down. */
class AuraBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.error("aura visualizer failed; using static fallback:", error)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/* The aura wrapped in its fallback boundary. */
function Aura(props: Parameters<typeof AgentAudioVisualizerAura>[0]) {
  return (
    <AuraBoundary fallback={STATIC_DISC}>
      <AgentAudioVisualizerAura {...props} />
    </AuraBoundary>
  )
}

const ATTRACT_STATES: readonly AuraState[] = [
  "connecting",
  "listening",
  "speaking",
  "thinking",
]
const ATTRACT_STEP_MS = 3200

type CallState = "idle" | "connecting" | "live" | "error"

/* The live hook's states are a superset of the vendored aura's. */
function toAuraState(state: LiveAgentState): AuraState {
  switch (state) {
    case "pre-connect-buffering":
      return "connecting"
    case "idle":
      return "listening"
    case "failed":
      return "disconnected"
    default:
      return state
  }
}

const STATE_LABEL: Record<string, string> = {
  connecting: "Connecting",
  initializing: "Warming up",
  listening: "Listening",
  thinking: "Thinking",
  speaking: "Speaking",
}

function PhoneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function EndGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
}

export default function LiveCallDemo() {
  const [callState, setCallState] = useState<CallState>("idle")
  const [room, setRoom] = useState<Room | null>(null)
  const roomRef = useRef<Room | null>(null)
  const [attractIndex, setAttractIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const auraReady = useAuraReady()

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
      ATTRACT_STEP_MS,
    )
    return () => clearInterval(id)
  }, [callState, reducedMotion])

  const endCall = useCallback(() => {
    roomRef.current?.disconnect()
    roomRef.current = null
    setRoom(null)
    setCallState("idle")
    setAttractIndex(0)
  }, [])

  useEffect(() => () => { roomRef.current?.disconnect() }, [])

  const startCall = useCallback(async () => {
    setCallState("connecting")
    try {
      const res = await fetch("/api/livekit-token", { method: "POST" })
      if (!res.ok) throw new Error(`token endpoint: ${res.status}`)
      const { url, token } = (await res.json()) as { url: string; token: string }

      const lkRoom = new Room()
      roomRef.current = lkRoom
      lkRoom.on("disconnected", () => {
        roomRef.current = null
        setRoom(null)
        setCallState("idle")
        setAttractIndex(0)
      })

      await lkRoom.connect(url, token)
      /* The mic prompt can be declined; the call still stands and the agent
         still greets. */
      try {
        await lkRoom.localParticipant.setMicrophoneEnabled(true)
      } catch {}
      setRoom(lkRoom)
      setCallState("live")
    } catch (err) {
      console.error("call failed:", err)
      roomRef.current?.disconnect()
      roomRef.current = null
      setRoom(null)
      setCallState("error")
    }
  }, [])

  const idleAuraState: AuraState = reducedMotion
    ? "disconnected"
    : callState === "connecting"
      ? "connecting"
      : ATTRACT_STATES[attractIndex]

  return (
    <div className="lv-agdemo lv-livecall" data-state={callState}>
      <div className="lv-agdemo-voice">
        <div className="lv-agdemo-eyebrow">
          <span className="lv-eyebrow-dot" aria-hidden="true" />
          <span>Live call &middot; FS agent</span>
        </div>

        {room ? (
          <RoomContext.Provider value={room}>
            <RoomAudioRenderer />
            <LiveSurface reducedMotion={reducedMotion} onEnd={endCall} />
          </RoomContext.Provider>
        ) : (
          <>
            <div className="lv-agdemo-wave-wrap">
              {reducedMotion || !auraReady ? (
                STATIC_DISC
              ) : (
                <Aura
                  className="lv-agdemo-aura"
                  state={idleAuraState}
                  color={AURA_COLOR}
                  colorShift={0.3}
                  themeMode="dark"
                  volume={0}
                  aria-hidden="true"
                />
              )}
              <p className="lv-agdemo-wave-state" aria-live="polite">
                {callState === "connecting"
                  ? "connecting"
                  : callState === "error"
                    ? "line unavailable"
                    : idleAuraState}
              </p>
            </div>

            <button
              type="button"
              className="lv-agdemo-playpill"
              onClick={callState === "connecting" ? endCall : startCall}
              disabled={callState === "connecting"}
              aria-label="Call the governed agent"
            >
              <span className="lv-agdemo-playpill-glyph">
                <PhoneGlyph />
              </span>
              <span>{callState === "connecting" ? "Connecting" : "Call the agent"}</span>
            </button>

            {callState === "error" ? (
              <p className="lv-livecall-note" role="status">
                The line did not connect. Try again in a moment.
              </p>
            ) : (
              <p className="lv-livecall-note">
                Your browser will ask for the microphone. The call is live.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/* Inside the room: the aura and caption ride useAgent directly, and the
   aura's scale rides the agent's real speech level. */
function LiveSurface({
  reducedMotion,
  onEnd,
}: {
  reducedMotion: boolean
  onEnd: () => void
}) {
  const { state, microphoneTrack } = useAgent()
  const volume = useTrackVolume(microphoneTrack)
  const auraReady = useAuraReady()

  return (
    <>
      <div className="lv-agdemo-wave-wrap">
        {reducedMotion || !auraReady ? (
          STATIC_DISC
        ) : (
          <Aura
            className="lv-agdemo-aura"
            state={toAuraState(state)}
            color={AURA_COLOR}
            colorShift={0.3}
            themeMode="dark"
            volume={state === "speaking" ? volume : 0}
            aria-hidden="true"
          />
        )}
        <p className="lv-agdemo-wave-state" aria-live="polite">
          {STATE_LABEL[state] ?? "Connected"}
        </p>
      </div>

      <button
        type="button"
        className="lv-agdemo-playpill lv-livecall-endpill"
        onClick={onEnd}
        aria-label="End the call"
      >
        <span className="lv-agdemo-playpill-glyph">
          <EndGlyph />
        </span>
        <span>End call</span>
      </button>

      <p className="lv-livecall-note">
        Ask it whether an account exists. It will not say until identity is
        verified.
      </p>
    </>
  )
}
