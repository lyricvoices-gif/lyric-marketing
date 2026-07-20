"use client"

import React from "react"

interface Props {
  children: React.ReactNode
  delay?: number
  from?: "bottom" | "left"
  display?: string
  style?: React.CSSProperties
  /* Travel distance in px for the entrance (default matches the original
     20px rise; larger values read as a more pronounced scroll-up). */
  distance?: number
}

export default function ScrollReveal({
  children,
  delay = 0,
  from = "bottom",
  display = "block",
  style,
  distance = 20,
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay)
          } else {
            setVisible(true)
          }
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const translateStart =
    from === "left" ? "translateX(-24px)" : `translateY(${distance}px)`

  return (
    <div
      ref={ref}
      style={{
        display,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : translateStart,
        transition: `opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
