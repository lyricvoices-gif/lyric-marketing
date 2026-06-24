"use client"

/* Movement 5 — See it in text, with motion that means something.

   On scroll-in the UNGOVERNED bubbles arrive with mismatched timing and slight
   horizontal jitter, so the column feels like three different personalities. The
   GOVERNED bubbles resolve in unison — an even cadence, no jitter — settling
   into one coherent voice. The motion enacts the drift-vs-consistency point the
   copy makes.

   Layout, copy, channel labels, and the Lyric-palette bubble styling (not
   iMessage blue) are unchanged from the original static version. Reduced motion:
   both columns render in their final state with no animation (handled in CSS;
   inView is also forced true so the end-state class is applied). */

import { useEffect, useRef, useState } from "react"

type Channel = "sms" | "web"
type Msg = { channel: Channel; text: string }
type Motion = { delay: number; dur: number; bx: string }

const UNGOVERNED: Msg[] = [
  { channel: "sms", text: "yep payment went thru 👍 you’re good" },
  {
    channel: "web",
    text: "I have confirmed receipt of your remittance. The transaction has been successfully processed and posted to your account.",
  },
  {
    channel: "sms",
    text: "Hi! So I checked and yes it looks like it went through okay 😊 let me know if you need anything else!!",
  },
]

const GOVERNED: Msg[] = [
  { channel: "sms", text: "Your payment posted today. You’re all set." },
  {
    channel: "web",
    text: "Your payment posted today. You’re all set. You can see it in your account under Activity.",
  },
  { channel: "sms", text: "Your payment posted today. You’re all set." },
]

/* Mismatched cadence (uneven delays, varied durations, side-to-side jitter) vs
   an even, settling cadence with no jitter (unison). */
const UNGOVERNED_MOTION: Motion[] = [
  { delay: 220, dur: 520, bx: "-7px" },
  { delay: 40, dur: 780, bx: "9px" },
  { delay: 430, dur: 600, bx: "-4px" },
]

const GOVERNED_MOTION: Motion[] = [
  { delay: 80, dur: 600, bx: "0px" },
  { delay: 200, dur: 600, bx: "0px" },
  { delay: 320, dur: 600, bx: "0px" },
]

function Column({
  variant,
  label,
  sub,
  msgs,
  motion,
  inView,
}: {
  variant: "before" | "after"
  label: string
  sub: string
  msgs: Msg[]
  motion: Motion[]
  inView: boolean
}) {
  return (
    <div
      className={`lv-opus-proof-col lv-opus-proof-${variant} lv-opus-proof-anim${inView ? " is-in" : ""}`}
    >
      <p className="lv-opus-proof-label">
        {label} <span>{sub}</span>
      </p>
      {msgs.map((m, j) => (
        <div
          key={j}
          className={`lv-opus-bubble lv-opus-bubble-${m.channel}`}
          style={
            {
              ["--bx" as string]: motion[j].bx,
              transitionDelay: `${motion[j].delay}ms`,
              transitionDuration: `${motion[j].dur}ms`,
            } as React.CSSProperties
          }
        >
          <span className="lv-opus-bubble-tag">{m.channel === "sms" ? "SMS" : "Web chat"}</span>
          <p className="lv-opus-bubble-text">{m.text}</p>
        </div>
      ))}
    </div>
  )
}

export default function InTextProof() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setInView(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="lv-opus-proof-grid">
      <Column
        variant="before"
        label="Ungoverned"
        sub="Three agents, three personalities"
        msgs={UNGOVERNED}
        motion={UNGOVERNED_MOTION}
        inView={inView}
      />
      <Column
        variant="after"
        label="Governed"
        sub="Three agents, one brand"
        msgs={GOVERNED}
        motion={GOVERNED_MOTION}
        inView={inView}
      />
    </div>
  )
}
