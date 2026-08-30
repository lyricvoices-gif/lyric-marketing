"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

/* A REAL recording of the shipped Callio intake, captured from a production
   build of the app and played at 1.15x. It opens on the industry question (no
   splash screen) and stops at the channel selection, so it shows three steps:
   industry -> company name -> channels. The preview-mode banner was hidden
   for the recording (user-authorized staging); everything else is the
   untouched app. Re-record with record-3step.js in the session scratchpad
   when the intake changes.

   Motion rules: autoplay, muted, loop, playsinline, poster; under
   prefers-reduced-motion the video never mounts and the poster still renders
   in its place. */

const POSTER = "/images/callio/intake-poster.png"

export default function CallioIntakeTeaser() {
  const [reduced, setReduced] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return (
    <figure className="lv-intake-teaser">
      <div className="lv-intake-teaser-browser" aria-hidden="true">
        <span><i /><i /><i /></span>
        <b>callio.lyricvoices.ai</b>
        <span />
      </div>
      <div className="lv-intake-teaser-captures">
        {reduced === false ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={POSTER}
            preload="metadata"
            aria-label="The opening of a Callio intake session, recorded from the live product: the industry, company, and channel selections"
          >
            <source src="/videos/callio-intake.webm" type="video/webm" />
            <source src="/videos/callio-intake.mp4" type="video/mp4" />
          </video>
        ) : (
          /* SSR default and reduced-motion: the still. */
          <Image
            className="is-active"
            src={POSTER}
            alt="The Callio intake: the industry question with the voice spec panel beside it"
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 1072px"
            priority
          />
        )}
      </div>
    </figure>
  )
}
