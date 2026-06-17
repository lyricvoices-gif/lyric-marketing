"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const DARK  = "#2b2a25"
const LIGHT = "#f5f3ef"

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Reveal once we're past the hero so we don't fight the hero CTAs.
      const past = window.scrollY > 320
      setVisible(past)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className="lyric-mobile-sticky-cta"
      aria-hidden={!visible}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
        background: "rgba(43, 42, 37, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(245,243,239,0.08)",
        display: "none",
        alignItems: "center",
        gap: "10px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "opacity 0.32s ease, transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <a
        href="mailto:info@lyricvoices.ai?subject=Lyric%20access"
        style={{
          flex: 1,
          minHeight: "48px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 14px",
          borderRadius: "100px",
          background: LIGHT,
          color: DARK,
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "0",
        }}
      >
        Request access
      </a>
      <Link
        href="/opus"
        style={{
          flex: 1,
          minHeight: "48px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 14px",
          borderRadius: "100px",
          background: "transparent",
          color: "rgba(245,243,239,0.92)",
          border: "1px solid rgba(245,243,239,0.22)",
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "0",
        }}
      >
        See how it works
      </Link>
    </div>
  )
}
