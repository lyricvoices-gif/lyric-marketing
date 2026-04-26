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

  // Close on Escape
  React.useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
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
          zIndex: 101,
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

      {/* Mobile flyout — backdrop + slide-in panel from right */}
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(15,14,12,0.55)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 98,
              animation: "lyric-backdrop-in 0.25s ease-out",
            }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            style={{
              position: "fixed",
              top: "64px",
              right: 0,
              width: "min(85vw, 320px)",
              height: "calc(100vh - 64px)",
              background: "#2b2a25",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              padding: "24px 20px 32px",
              gap: "2px",
              boxShadow: "-16px 0 40px rgba(0,0,0,0.45)",
              borderLeft: "1px solid rgba(245,243,239,0.06)",
              animation: "lyric-flyout-in 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
              overflowY: "auto",
            }}
          >
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "16px 12px",
                  borderRadius: "10px",
                  fontSize: "17px",
                  fontWeight: 400,
                  color: pathname === link.href
                    ? "rgba(245,243,239,0.95)"
                    : "rgba(245,243,239,0.65)",
                  background: pathname === link.href
                    ? "rgba(245,243,239,0.06)"
                    : "transparent",
                  letterSpacing: "-0.01em",
                  animation: `lyric-flyout-item-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both`,
                  animationDelay: `${0.08 + i * 0.04}s`,
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ flex: 1, minHeight: "20px" }} />
            <a
              href="https://composer.lyricvoices.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
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
                animation: `lyric-flyout-item-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both`,
                animationDelay: `${0.08 + links.length * 0.04}s`,
              }}
            >
              Try composer
            </a>
          </div>
          <style>{`
            @keyframes lyric-backdrop-in {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes lyric-flyout-in {
              from { transform: translateX(100%); }
              to   { transform: translateX(0); }
            }
            @keyframes lyric-flyout-item-in {
              from { opacity: 0; transform: translateX(12px); }
              to   { opacity: 1; transform: translateX(0); }
            }
          `}</style>
        </>
      )}
    </nav>
  )
}
