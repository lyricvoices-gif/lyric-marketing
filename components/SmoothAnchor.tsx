"use client"

import type { CSSProperties, ReactNode } from "react"

/* Editorial-pace smooth scroll. The browser's native scroll-behavior:smooth
   completes long-distance scrolls in a fixed time (~300-500ms), which lands
   abruptly. This RAF-driven version uses a longer duration with an
   easeInOutCubic curve so the scroll feels considered, not rushed. */
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

function smoothScrollTo(targetY: number, duration: number) {
  const startY = window.scrollY
  const distance = targetY - startY
  if (Math.abs(distance) < 1) return

  // Honor prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY)
    return
  }

  /* The page sets scroll-behavior: smooth on <html> for native anchor
     fallback. While our RAF loop is running, that CSS would re-smooth each
     per-frame scroll and create stutter. Temporarily switch to auto and
     restore when the animation finishes. */
  const html = document.documentElement
  const previousBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = "auto"

  const start = performance.now()

  function step(now: number) {
    const elapsed = now - start
    const t = Math.min(1, elapsed / duration)
    const eased = easeInOutCubic(t)
    window.scrollTo(0, startY + distance * eased)
    if (t < 1) {
      requestAnimationFrame(step)
    } else {
      html.style.scrollBehavior = previousBehavior
    }
  }

  requestAnimationFrame(step)
}

export default function SmoothAnchor({
  targetId,
  offset = 0,
  duration = 1400,
  style,
  className,
  children,
}: {
  targetId: string
  /** Pixels to subtract from the target's top — typically 64 to account for
      the fixed nav bar so the anchored eyebrow isn't tucked under it. */
  offset?: number
  /** Animation duration in ms. 1400 is the Lyric editorial default. */
  duration?: number
  style?: CSSProperties
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={`#${targetId}`}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        const el = document.getElementById(targetId)
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        smoothScrollTo(top, duration)
        if (typeof history !== "undefined") {
          history.replaceState(null, "", `#${targetId}`)
        }
      }}
      style={style}
    >
      {children}
    </a>
  )
}
