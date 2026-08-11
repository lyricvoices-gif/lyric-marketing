"use client"

/* The hero visual: a REAL capture of a complete Callio intake session,
   recorded from the live app (Financial Services -> company + channels ->
   tone -> voice -> composed confirmation) and played back at 1.8x. Not a
   mockup. Re-record with scripts in the session scratchpad when the intake
   changes (exemplar work will require a fresh capture).

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
          aria-label="A complete Callio intake session, recorded from the live product"
        >
          <source src="/videos/callio-intake.webm" type="video/webm" />
          <source src="/videos/callio-intake.mp4" type="video/mp4" />
        </video>
      ) : (
        /* SSR default and reduced-motion: the still. */
        <Image
          src={POSTER}
          alt="The Callio intake: the industry question answered, the voice spec panel beginning to fill"
          width={1280}
          height={800}
          sizes="(max-width: 900px) 94vw, 640px"
          priority
        />
      )}
      <figcaption className="lv-cin-recording-caption">
        A complete intake, recorded from the live product. Played at 1.8x.
      </figcaption>
    </figure>
  )
}
