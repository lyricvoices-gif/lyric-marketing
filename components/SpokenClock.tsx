"use client"

import { useEffect, useState } from "react"

/* A production-house corner clock, spoken rather than shown. The time is
   written out in words, rounded to the nearest five minutes, because a voice
   designer's clock should not need digits. Renders only after mount so the
   server and client never disagree about the hour. */

const HOURS = [
  "TWELVE",
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
  "ELEVEN",
]

function speakTime(d: Date): string {
  let h = d.getHours()
  let m = Math.round(d.getMinutes() / 5) * 5
  if (m === 60) {
    m = 0
    h = (h + 1) % 24
  }
  const onHour = HOURS[h % 12]
  const nextHour = HOURS[(h + 1) % 12]
  switch (m) {
    case 0:
      return `${onHour} O'CLOCK`
    case 5:
      return `FIVE PAST ${onHour}`
    case 10:
      return `TEN PAST ${onHour}`
    case 15:
      return `QUARTER PAST ${onHour}`
    case 20:
      return `TWENTY PAST ${onHour}`
    case 25:
      return `TWENTY-FIVE PAST ${onHour}`
    case 30:
      return `HALF PAST ${onHour}`
    case 35:
      return `TWENTY-FIVE TO ${nextHour}`
    case 40:
      return `TWENTY TO ${nextHour}`
    case 45:
      return `QUARTER TO ${nextHour}`
    case 50:
      return `TEN TO ${nextHour}`
    default:
      return `FIVE TO ${nextHour}`
  }
}

export default function SpokenClock() {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setNow(speakTime(new Date()))
    tick()
    const id = window.setInterval(tick, 20000)
    return () => window.clearInterval(id)
  }, [])

  if (!now) return null

  return (
    <>
      <style>{`
        .pf-clock {
          position: fixed;
          right: 24px;
          bottom: 20px;
          z-index: 20;
          font-family: var(--pf-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.18em;
          color: #f5f3ef;
          mix-blend-mode: difference;
          pointer-events: none;
        }
        @media (max-width: 760px) {
          .pf-clock { display: none; }
        }
      `}</style>
      <span className="pf-clock" aria-hidden="true">
        {now} [LOCAL]
      </span>
    </>
  )
}
