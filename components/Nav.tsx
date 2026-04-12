"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import Wordmark from "@/components/Wordmark"


export default function Nav() {
  const pathname = usePathname()
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) { setLoaded(true); return }
    const t = setTimeout(() => setLoaded(true), 40)
    return () => clearTimeout(t)
  }, [])

  const links = [
    { href: "/editions", label: "Editions" },
    { href: "/composer", label: "Composer" },
    { href: "/about",    label: "About" },
    { href: "/pricing",  label: "Pricing" },
  ]

  return (
    <nav
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

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
    </nav>
  )
}
