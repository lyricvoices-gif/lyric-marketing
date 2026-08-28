"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

/* Authentic captures from the shipped Callio intake. The sequence deliberately
   stops at the early company-name question and returns to the landing screen,
   before the intake or specification can resolve. */
const CAPTURES = [
  { src: "/images/callio/hero-01-landing.png", alt: "Callio intake opening screen with the Begin intake button." },
  { src: "/images/callio/hero-02-industry.png", alt: "Callio asking the first intake question about industry." },
  { src: "/images/callio/hero-03-company.png", alt: "Callio with Financial Services selected and the company-name question open." },
  { src: "/images/callio/hero-04-company-entered.png", alt: "Callio with Georgia Credit Union entered in the company-name field." },
] as const

export default function CallioIntakeTeaser() {
  const [active, setActive] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % CAPTURES.length),
      active === 0 ? 2400 : 3000,
    )
    return () => window.clearTimeout(timer)
  }, [active, reducedMotion])

  return (
    <figure className="lv-intake-teaser">
      <div className="lv-intake-teaser-browser" aria-hidden="true">
        <span><i /><i /><i /></span>
        <b>callio.lyricvoices.ai</b>
        <span />
      </div>
      <div className="lv-intake-teaser-captures">
        {CAPTURES.map((capture, index) => (
          <Image
            key={capture.src}
            className={index === active ? "is-active" : ""}
            src={capture.src}
            alt={capture.alt}
            width={3200}
            height={2000}
            sizes="(max-width: 768px) 100vw, 1072px"
            priority={index === 0}
          />
        ))}
      </div>
    </figure>
  )
}
