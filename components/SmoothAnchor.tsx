"use client"

import type { CSSProperties, ReactNode } from "react"

export default function SmoothAnchor({
  targetId,
  offset = 0,
  style,
  children,
}: {
  targetId: string
  offset?: number
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <a
      href={`#${targetId}`}
      onClick={(e) => {
        e.preventDefault()
        const el = document.getElementById(targetId)
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: "smooth" })
      }}
      style={style}
    >
      {children}
    </a>
  )
}
