"use client"

/* The same real intake recording used on /callio's hero (production build,
   1.15x, opens on the industry question, ends at the channel selection),
   here without its own frame — the home section's browser shell provides
   the chrome. Under prefers-reduced-motion the video never mounts and the
   poster still renders in its place. */

import Image from "next/image"
import { useEffect, useState } from "react"

const POSTER = "/images/callio/intake-poster.png"

export default function CallioIntakeVideo() {
  const [reduced, setReduced] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return reduced === false ? (
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
      sizes="(max-width: 1120px) 94vw, 1060px"
      priority={false}
    />
  )
}
