"use client"

/* The hero visual: a REAL capture of the opening of a Callio intake session,
   recorded from the app running a production build at 1600x900 and played at
   1.15x. It opens on the business-vertical question (no splash/boot) and ends
   at the channel selection: industry -> company name -> channels. The
   preview-mode banner was hidden for the recording (user-authorized staging);
   everything else is the untouched app. Not a mockup. Re-record with
   record-3step.js in the session scratchpad when the intake changes.

   Motion rules: autoplay, muted, loop, playsinline, poster; under
   prefers-reduced-motion the video never mounts and the poster still renders
   in its place. */

import Image from "next/image"
import { useEffect, useState } from "react"

const POSTER = "/images/callio/intake-poster.png"

export default function IntakeRecording() {
  const [reduced, setReduced] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return (
    <figure className="lv-cin-recording">
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
          src={POSTER}
          alt="The Callio intake: the industry question with the voice spec panel beside it"
          width={1600}
          height={900}
          sizes="(max-width: 1180px) 94vw, 1132px"
          priority
        />
      )}
    </figure>
  )
}
