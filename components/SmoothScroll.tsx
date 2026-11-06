"use client"

import { useSyncExternalStore } from "react"
import { ReactLenis } from "lenis/react"
import { usePathname } from "next/navigation"
import "lenis/dist/lenis.css"

const motionQuery = "(prefers-reduced-motion: reduce)"
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const readMotionPreference = () => window.matchMedia(motionQuery).matches
const serverMotionPreference = () => true
function subscribeToMotionPreference(onChange: () => void) {
  const media = window.matchMedia(motionQuery)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

export default function SmoothScroll() {
  const pathname = usePathname()
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    readMotionPreference,
    serverMotionPreference,
  )

  // One global controller for both wheel/trackpad inertia and anchor movement.
  // Native touch momentum and nested product controls keep their own scrolling.
  return (
    <ReactLenis
      key={pathname}
      root
      options={{
        autoRaf: true,
        smoothWheel: !reducedMotion,
        syncTouch: false,
        allowNestedScroll: true,
        duration: 1.1,
        easing: easeOutCubic,
      }}
    />
  )
}
