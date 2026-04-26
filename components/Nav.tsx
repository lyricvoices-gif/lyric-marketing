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

  // Lock scroll while the mobile menu is open
  React.useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
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
      {/* Brand */}
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
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

      {/* Mobile hamburger toggle */}
      <button
        type="button"
        className="lyric-nav-mobile-toggle"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        style={{
          width: "40px",
          height: "40px",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "1px solid rgba(245,243,239,0.18)",
          borderRadius: "10px",
          padding: 0,
          cursor: "pointer",
          color: "#f5f3ef",
        }}
      >
        {menuOpen ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M1 1H17M1 7H17M1 13H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "#2b2a25",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "4px",
            animation: "lyric-menu-in 0.2s ease-out",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "16px 12px",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: 400,
                color: pathname === link.href
                  ? "rgba(245,243,239,0.95)"
                  : "rgba(245,243,239,0.6)",
                background: pathname === link.href
                  ? "rgba(245,243,239,0.06)"
                  : "transparent",
                letterSpacing: "-0.01em",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://composer.lyricvoices.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: "16px",
              padding: "14px 20px",
              borderRadius: "100px",
              fontSize: "15px",
              fontWeight: 500,
              color: "#2b2a25",
              background: "#f5f3ef",
              letterSpacing: "-0.01em",
              textAlign: "center",
            }}
          >
            Try composer
          </a>
          <style>{`
            @keyframes lyric-menu-in {
              from { opacity: 0; transform: translateY(-6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </nav>
  )
}
