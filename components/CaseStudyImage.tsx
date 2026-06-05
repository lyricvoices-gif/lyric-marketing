"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

/* Editorial case-study image: a subtle zoom on hover, and click-to-enlarge into
   a full-screen lightbox. Shared across all case-study pages so the behavior is
   identical. The lightbox renders through a portal to <body> so it is never
   clipped by the overflow-hidden media frames the thumbnails sit inside. */

export default function CaseStudyImage({
  src,
  alt = "",
  style,
}: {
  src: string
  alt?: string
  style?: React.CSSProperties
}) {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)
  const [hover, setHover] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => setShown(true))
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  function close() {
    setShown(false)
    window.setTimeout(() => setOpen(false), 220)
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...style,
          cursor: "zoom-in",
          transform: hover ? "scale(1.025)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(15, 17, 17, 0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5vw",
              cursor: "zoom-out",
              opacity: shown ? 1 : 0,
              transition: "opacity 0.22s ease",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5)",
                transform: shown ? "scale(1)" : "scale(0.985)",
                transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>,
          document.body
        )}
    </>
  )
}
