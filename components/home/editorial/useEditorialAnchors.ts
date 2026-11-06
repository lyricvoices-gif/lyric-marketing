"use client"

import { useEffect } from "react"
import { useLenis } from "lenis/react"

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export default function useEditorialAnchors() {
  const lenis = useLenis()
  useEffect(() => {
    const root = document.querySelector(".lyric-editorial")
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let anchoring = false

    const cancel = () => {
      if (!anchoring) return
      anchoring = false
      if (lenis && !lenis.isStopped) {
        lenis.stop()
        lenis.start()
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
          "Escape",
        ].includes(event.key)
      )
        cancel()
    }
    const onClick = (event: Event) => {
      if (
        !(event instanceof MouseEvent) ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
          : null
      if (
        !link ||
        link.classList.contains("le-skip") ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return
      const target = document.getElementById(link.hash.slice(1))
      if (!target) return

      event.preventDefault()
      cancel()
      const headerHeight =
        root?.querySelector(".le-header")?.getBoundingClientRect().height ?? 0
      const startY = window.scrollY
      const endY = Math.max(
        0,
        Math.min(
          target.getBoundingClientRect().top + startY - headerHeight - 12,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      )
      const distance = endY - startY
      if (window.location.hash !== link.hash)
        window.history.pushState(window.history.state, "", link.hash)

      const finish = () => {
        anchoring = false
        target.focus({ preventScroll: true })
      }
      if (!lenis) {
        window.scrollTo({ top: endY, behavior: "auto" })
        finish()
        return
      }

      // A deliberate pace, with a little more time for the longer section jumps.
      anchoring = true
      lenis.scrollTo(endY, {
        duration: Math.min(1.6, 1.1 + Math.abs(distance) * 0.00012),
        easing: easeInOutCubic,
        immediate: motion.matches,
        onComplete: finish,
      })
    }

    root?.addEventListener("click", onClick)
    // Cancel before Lenis applies a new gesture, so the first wheel delta is kept.
    lenis?.on("virtual-scroll", cancel)
    window.addEventListener("pointerdown", cancel, { passive: true })
    window.addEventListener("keydown", onKey)
    return () => {
      root?.removeEventListener("click", onClick)
      lenis?.off("virtual-scroll", cancel)
      window.removeEventListener("pointerdown", cancel)
      window.removeEventListener("keydown", onKey)
    }
  }, [lenis])
}
