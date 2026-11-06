"use client"

import { useLayoutEffect } from "react"

export default function useSectionReveals() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".lyric-editorial")
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (
      !root ||
      !("IntersectionObserver" in window) ||
      !Element.prototype.animate
    )
      return

    const style = getComputedStyle(root)
    const duration =
      parseFloat(style.getPropertyValue("--le-reveal-duration")) || 1000
    const distance =
      style.getPropertyValue("--le-reveal-distance").trim() || "44px"
    const easing =
      style.getPropertyValue("--le-reveal-ease").trim() || "ease-out"
    const elements = [...root.querySelectorAll<HTMLElement>("[data-reveal]")]
    const animations = new Map<HTMLElement, Animation>()
    let entranceObserver: IntersectionObserver | undefined
    let resetObserver: IntersectionObserver | undefined

    const cancelAnimation = (element: HTMLElement) => {
      animations.get(element)?.cancel()
      animations.delete(element)
    }
    const showImmediately = (element: HTMLElement) => {
      cancelAnimation(element)
      element.dataset.revealState = "visible"
    }
    const prepare = (element: HTMLElement) => {
      // Never hide a keyboard user's current control, even if it is offscreen.
      if (element.contains(document.activeElement)) {
        showImmediately(element)
        return
      }
      cancelAnimation(element)
      element.dataset.revealState = "pending"
    }
    const reveal = (element: HTMLElement) => {
      if (element.dataset.revealState !== "pending") return
      element.dataset.revealState = "entering"
      const animation = element.animate(
        [
          { opacity: 0, transform: `translateY(${distance})` },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration,
          easing,
          delay: Number(element.dataset.revealDelay ?? 0),
          fill: "backwards",
        },
      )
      animations.set(element, animation)
      animation.onfinish = () => {
        animations.delete(element)
        element.dataset.revealState = "visible"
      }
    }
    const reset = () => {
      entranceObserver?.disconnect()
      resetObserver?.disconnect()
      animations.forEach((animation) => animation.cancel())
      animations.clear()
      elements.forEach((element) => {
        delete element.dataset.revealState
      })
    }
    const start = () => {
      reset()
      if (motion.matches) return

      // Prepare only after enhancement is available. Anchor targets and layout
      // stay fixed; server-rendered content remains visible without JavaScript.
      elements.forEach((element) => {
        if (element.getBoundingClientRect().bottom <= 0) showImmediately(element)
        else prepare(element)
      })
      entranceObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement)
          })
        },
        { threshold: 0, rootMargin: "0px 0px -80px 0px" },
      )
      // Reset only below the actual viewport, not at the inset trigger line.
      // This lets another downward pass reveal again without flickering while
      // a section is still visible or while reading upward through the page.
      resetObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (
            !entry.isIntersecting &&
            entry.boundingClientRect.top >= window.innerHeight
          )
            prepare(entry.target as HTMLElement)
        })
      })
      elements.forEach((element) => {
        entranceObserver?.observe(element)
        resetObserver?.observe(element)
      })
    }
    const onFocus = (event: FocusEvent) => {
      const element =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-reveal]")
          : null
      if (element) showImmediately(element)
    }
    start()
    motion.addEventListener("change", start)
    root.addEventListener("focusin", onFocus)
    return () => {
      reset()
      root.removeEventListener("focusin", onFocus)
      motion.removeEventListener("change", start)
    }
  }, [])
}
