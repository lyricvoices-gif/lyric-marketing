"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import Wordmark from "@/components/Wordmark"


export default function Nav() {
  const pathname = usePathname()
  const [loaded, setLoaded] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) { setLoaded(true); return }
    const t = setTimeout(() => setLoaded(true), 40)
    return () => clearTimeout(t)
  }, [])

  // Close the mobile menu whenever the route changes
  React.useEffect(() => { setMenuOpen(false) }, [pathname])

  // Close on Escape
  React.useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  // Close on any click outside the hamburger toggle. Deferred by a tick so the
  // tap that opened the menu doesn't immediately close it. The listener does
  // NOT preventDefault — taps on a mini-composer voice card still trigger the
  // card's onClick, so the modal opens AND the menu closes from the same tap.
  React.useEffect(() => {
    if (!menuOpen) return
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest(".lyric-nav-mobile-toggle")) return
      setMenuOpen(false)
    }
    const id = window.setTimeout(() => document.addEventListener("click", onDocClick), 0)
    return () => {
      window.clearTimeout(id)
      document.removeEventListener("click", onDocClick)
    }
  }, [menuOpen])

  const links = [
    { href: "/editions", label: "Editions" },
    { href: "/composer", label: "Composer" },
    { href: "/about",    label: "About" },
    { href: "/pricing",  label: "Pricing" },
  ]

  return (
    <nav
      className="lyric-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        background: "#2b2a25",
        opacity: loaded ? 1 : 0,
        filter: loaded ? "blur(0px)" : "blur(4px)",
        transition: "opacity 0.6s ease-out, filter 0.6s ease-out",
      }}
    >
      {/* Brand — wordmark fades on mobile when the menu is open so the inline
          links have the full nav width to land in. Desktop is unaffected
          because .lyric-nav-mobile-menu is display:none above 768px. */}
      <Link
        href="/"
        className="lyric-wordmark-link"
        style={{
          display: "flex",
          alignItems: "center",
          opacity: menuOpen ? 0 : 1,
          transform: menuOpen ? "translateX(-6px)" : "translateX(0)",
          transition: "opacity 0.22s ease, transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: menuOpen ? "none" : "auto",
        }}
      >
        <Wordmark height={36} color="#f5f3ef" />
      </Link>

      {/* Desktop links */}
      <div className="lyric-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 400,
              color: pathname === link.href
                ? "rgba(245,243,239,0.9)"
                : "rgba(245,243,239,0.45)",
              background: pathname === link.href
                ? "rgba(245,243,239,0.08)"
                : "transparent",
              letterSpacing: "-0.01em",
            }}
          >
            {link.label}
          </Link>
        ))}
        <div
          style={{
            width: "1px",
            height: "16px",
            background: "rgba(245,243,239,0.1)",
            margin: "0 8px",
          }}
        />
        <a
          href="https://composer.lyricvoices.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "7px 16px",
            borderRadius: "100px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#2b2a25",
            background: "#f5f3ef",
            letterSpacing: "-0.01em",
          }}
        >
          Try composer
        </a>
      </div>

      {/* Mobile inline menu — sits ON the nav bar between the (faded) wordmark
          and the hamburger. Each link slides in from the right with a stagger;
          on close they slide back out to the right in reverse order. */}
      <div
        className="lyric-nav-mobile-menu"
        aria-hidden={!menuOpen}
        style={{
          position: "absolute",
          top: 0,
          left: "20px",
          right: "60px",
          height: "64px",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "2px",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 400,
              color: pathname === link.href
                ? "rgba(245,243,239,0.95)"
                : "rgba(245,243,239,0.75)",
              background: pathname === link.href
                ? "rgba(245,243,239,0.08)"
                : "transparent",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.32s ease, transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
              // Open: cascade left→right (Editions lands first on the left).
              // Close: reverse — Pricing exits first, Editions last.
              transitionDelay: menuOpen
                ? `${60 + i * 55}ms`
                : `${(links.length - 1 - i) * 35}ms`,
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile hamburger toggle — borderless, two-bar morph to X */}
      <button
        type="button"
        className="lyric-nav-mobile-toggle"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        style={{
          width: "44px",
          height: "44px",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
          padding: 0,
          margin: "0 -10px 0 0",
          cursor: "pointer",
          color: "#f5f3ef",
          position: "relative",
          zIndex: 102,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "20px",
            height: "1.5px",
            background: "currentColor",
            borderRadius: "2px",
            transform: menuOpen
              ? "translate(-50%, -50%) rotate(45deg)"
              : "translate(-50%, calc(-50% - 5px)) rotate(0)",
            transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "20px",
            height: "1.5px",
            background: "currentColor",
            borderRadius: "2px",
            transform: menuOpen
              ? "translate(-50%, -50%) rotate(-45deg)"
              : "translate(-50%, calc(-50% + 5px)) rotate(0)",
            transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </button>
    </nav>
  )
}
