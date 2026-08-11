"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

/* Nav items — primary structure for both desktop bar and mobile overlay.
   Products is the only dropdown; About and Notes are simple links.
   The mobile overlay flattens the dropdown into an indented sub-group
   so visitors see every destination without an extra tap. */

type NavLink = { href: string; label: string; external?: boolean; comingSoon?: boolean }

type NavItem =
  | ({ type: "link" } & NavLink)
  | { type: "dropdown"; label: string; items: NavLink[] }

const NAV_ITEMS: NavItem[] = [
  { type: "link", href: "/about", label: "About" },
  {
    type: "dropdown",
    label: "Products",
    items: [
      { href: "/callio", label: "Callio" },
      { href: "/agents", label: "Agents" },
    ],
  },
  { type: "link", href: "/pricing", label: "Pricing" },
  { type: "link", href: "/notes", label: "Notes" },
]

/* Primary self-service CTA target. /start is a named placeholder route for the
   product entry flow (the route may not be built yet); the nav and the mobile
   sticky CTA both point here, never a dead "#". */
const PRIMARY_CTA_HREF = "/start"
const PRIMARY_CTA_LABEL = "Generate your governed spec"

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [loaded, setLoaded] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [productsOpen, setProductsOpen] = React.useState(false)
  const productsRef = React.useRef<HTMLDivElement>(null)
  const closeTimer = React.useRef<number | null>(null)

  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) { setLoaded(true); return }
    const t = setTimeout(() => setLoaded(true), 40)
    return () => clearTimeout(t)
  }, [])

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  // Close on route change
  React.useEffect(() => {
    setMenuOpen(false)
    setProductsOpen(false)
  }, [pathname])

  // Close on Escape
  React.useEffect(() => {
    if (!menuOpen && !productsOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
        setProductsOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen, productsOpen])

  // Lock body scroll when overlay is open
  React.useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [menuOpen])

  // Click outside the Products dropdown closes it
  React.useEffect(() => {
    if (!productsOpen) return
    const onClick = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [productsOpen])

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  // Small delay on mouse-leave so a quick cursor jog from button to panel
  // (or back) doesn't snap the menu shut mid-traversal.
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setProductsOpen(false), 140)
  }

  const linkBase = (active: boolean): React.CSSProperties => ({
    padding: "6px 10px",
    fontSize: "13px",
    fontWeight: 400,
    color: isHome
      ? active ? "var(--text-1)" : "rgba(28, 26, 23, 0.7)"
      : active ? "var(--olive)" : "rgba(90,94,67,0.6)",
    letterSpacing: "0",
  })

  return (
    <>
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
          background: scrolled
            ? "rgba(255, 248, 236, 1)"
            : "rgba(255, 248, 236, 0)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderBottom: scrolled ? "1px solid rgba(90,94,67,0.1)" : "1px solid transparent",
          opacity: loaded ? 1 : 0,
          filter: loaded ? "blur(0px)" : "blur(4px)",
          transition:
            "opacity 0.6s ease-out, filter 0.6s ease-out, background-color 0.36s ease, border-color 0.28s ease",
        }}
      >
        {/* Brand logo — official Lyric imagotype (icon + wordmark), links home */}
        <Link
          href="/"
          className="lyric-wordmark-link"
          aria-label="Lyric Home"
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 102,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logos/Lyric_Logo_Imagotype-2-Black.svg"
            alt="Lyric"
            style={{ height: "34px", width: "auto", display: "block" }}
          />
        </Link>

        {/* Desktop links */}
        <div className="lyric-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {NAV_ITEMS.map((item) => {
            if (item.type === "link") {
              const active = !item.external && pathname === item.href
              const className = `lyric-nav-link${active ? " lyric-nav-link-active" : ""}`
              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  style={linkBase(active)}
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className={className} style={linkBase(active)}>
                  {item.label}
                </Link>
              )
            }

            // Dropdown
            const childActive = item.items.some(sub => pathname === sub.href)
            return (
              <div
                key={item.label}
                ref={productsRef}
                className="lyric-nav-dropdown"
                onMouseEnter={() => { cancelClose(); setProductsOpen(true) }}
                onMouseLeave={scheduleClose}
                style={{ position: "relative" }}
              >
                <button
                  type="button"
                  className={`lyric-nav-link${childActive ? " lyric-nav-link-active" : ""}`}
                  aria-haspopup="menu"
                  aria-expanded={productsOpen}
                  onClick={() => setProductsOpen(o => !o)}
                  onFocus={() => { cancelClose(); setProductsOpen(true) }}
                  style={{
                    ...linkBase(childActive),
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {item.label}
                  <Chevron open={productsOpen} />
                </button>

                <div
                  role="menu"
                  aria-label={item.label}
                  aria-hidden={!productsOpen}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    left: 0,
                    minWidth: "200px",
                    background: "var(--bg-light)",
                    border: "1px solid rgba(90,94,67,0.14)",
                    borderRadius: "10px",
                    padding: "6px",
                    boxShadow: "0 12px 32px rgba(28, 26, 23, 0.08)",
                    opacity: productsOpen ? 1 : 0,
                    transform: productsOpen ? "translateY(0)" : "translateY(-4px)",
                    pointerEvents: productsOpen ? "auto" : "none",
                    transition: "opacity 0.22s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                  }}
                >
                  {item.items.map(sub => {
                    const subActive = pathname === sub.href
                    return (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        role="menuitem"
                        onClick={() => setProductsOpen(false)}
                        className="lyric-nav-dropdown-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          fontSize: "13px",
                          fontWeight: 400,
                          color: subActive ? "var(--olive)" : "rgba(90,94,67,0.78)",
                          letterSpacing: "0",
                          borderRadius: "6px",
                          transition: "background 0.18s ease, color 0.18s ease",
                        }}
                      >
                        <span>{sub.label}</span>
                        {sub.comingSoon && <ComingSoonBadge tone="light" />}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Primary self-service CTA — filled pill in the brand olive/cream
              treatment used for primary CTAs elsewhere on the site. */}
          <Link
            href={PRIMARY_CTA_HREF}
            className="lyric-nav-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "40px",
              padding: "0 18px",
              marginLeft: "8px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              background: "var(--olive-deep)",
              color: "var(--bg-light)",
              border: "1px solid transparent",
              boxShadow:
                "0 1px 2px rgba(28, 26, 23, 0.14), 0 8px 18px -10px rgba(72, 75, 54, 0.55)",
              transition: "background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {PRIMARY_CTA_LABEL}
          </Link>
        </div>

        {/* Mobile hamburger */}
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
            color: "var(--olive)",
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

      {/* Mobile overlay — sits below the 64px nav. Display is controlled by
          CSS so it's fully removed on desktop. */}
      <div
        className="lyric-nav-overlay"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 101,
          background: "var(--bg-light)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.32s ease",
          padding: "96px 28px 40px",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {NAV_ITEMS.map((item, i) => {
            const baseDelay = 80 + i * 60
            const headingStyle = (active: boolean): React.CSSProperties => ({
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              lineHeight: 1.15,
              fontWeight: 500,
              color: active ? "var(--olive)" : "rgba(90,94,67,0.85)",
              padding: "12px 4px",
              letterSpacing: "0",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.42s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: menuOpen ? `${baseDelay}ms` : "0ms",
              display: "block",
            })

            if (item.type === "link") {
              const active = !item.external && pathname === item.href
              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={headingStyle(active)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={headingStyle(active)}
                >
                  {item.label}
                </Link>
              )
            }

            // Dropdown — flatten as a label with indented children
            const childActive = item.items.some(sub => pathname === sub.href)
            return (
              <div key={item.label}>
                <p
                  style={{
                    ...headingStyle(childActive),
                    margin: 0,
                    color: childActive ? "var(--olive)" : "rgba(90,94,67,0.85)",
                  }}
                >
                  {item.label}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    paddingLeft: "16px",
                    borderLeft: "1px solid rgba(90,94,67,0.18)",
                    marginLeft: "4px",
                    marginBottom: "8px",
                  }}
                >
                  {item.items.map((sub, j) => {
                    const subActive = pathname === sub.href
                    const subDelay = baseDelay + 60 + j * 30
                    return (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          color: subActive ? "var(--olive)" : "rgba(90,94,67,0.7)",
                          padding: "8px 4px",
                          letterSpacing: "0",
                          opacity: menuOpen ? 1 : 0,
                          transform: menuOpen ? "translateY(0)" : "translateY(8px)",
                          transition: "opacity 0.42s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                          transitionDelay: menuOpen ? `${subDelay}ms` : "0ms",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span>{sub.label}</span>
                        {sub.comingSoon && <ComingSoonBadge tone="light" />}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Primary self-service CTA in the mobile overlay. */}
          <Link
            href={PRIMARY_CTA_HREF}
            onClick={() => setMenuOpen(false)}
            className="lyric-nav-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "52px",
              marginTop: "20px",
              padding: "0 24px",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              background: "var(--olive-deep)",
              color: "var(--bg-light)",
              border: "1px solid transparent",
              boxShadow:
                "0 1px 2px rgba(28, 26, 23, 0.14), 0 8px 18px -10px rgba(72, 75, 54, 0.55)",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.42s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: menuOpen ? "320ms" : "0ms",
            }}
          >
            {PRIMARY_CTA_LABEL}
          </Link>
        </div>
      </div>
    </>
  )
}

/* Small "Coming soon" pill rendered next to nav items that aren't
   live yet. Two tones so the pill reads correctly on both light nav
   surfaces (Products dropdown) and dark ones (footer column). */
export function ComingSoonBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const styles =
    tone === "dark"
      ? { color: "rgba(245,243,239,0.7)", background: "rgba(245,243,239,0.1)", border: "1px solid rgba(245,243,239,0.16)" }
      : { color: "var(--olive)", background: "rgba(193,193,126,0.22)", border: "1px solid rgba(193,193,126,0.42)" }
  return (
    <span
      aria-label="(Coming soon)"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "2px 6px",
        borderRadius: "3px",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...styles,
      }}
    >
      Coming soon
    </span>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
