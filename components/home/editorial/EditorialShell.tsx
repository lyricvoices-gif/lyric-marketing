"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState, type ReactNode } from "react"
import useEditorialAnchors from "./useEditorialAnchors"
import useSectionReveals from "./useSectionReveals"

const links = [
  ["Callio", "/callio"],
  ["Agents", "/agents"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["Notes", "/notes"],
] as const
const socials = [
  ["Substack", "https://thelyricbriefing.substack.com/"],
  ["Instagram", "https://www.instagram.com/lyricvoices.ai/"],
  ["X", "https://x.com/thelyricvoices"],
  ["Threads", "https://www.threads.com/@lyricvoices.ai"],
  [
    "Spotify",
    "https://open.spotify.com/show/6iu0viCB2eTtNiE0SM1Pl6?si=c39dff580e1f4634",
  ],
  ["YouTube", "https://www.youtube.com/@LyricVoices"],
] as const

export default function EditorialShell({
  children,
  playbackBar,
}: {
  children: ReactNode
  playbackBar: ReactNode
}) {
  useEditorialAnchors()
  useSectionReveals()
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const nav = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        trigger.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 901px)")
    const onResize = () => {
      if (desktop.matches) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    desktop.addEventListener("change", onResize)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
      desktop.removeEventListener("change", onResize)
    }
  }, [open])

  return (
    <div className="lyric-editorial">
      <a className="le-skip" href="#main-content">
        Skip to content
      </a>
      <header className="le-header">
        <nav ref={nav} className="le-nav le-wrap" aria-label="Main navigation">
          <Link href="/" className="le-brand" aria-label="Lyric home">
            <Image
              src="/images/lyric-logo-imagotype-2-black.svg"
              alt="Lyric"
              width={100}
              height={40}
              priority
            />
          </Link>
          <button
            ref={trigger}
            className="le-menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="home-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close −" : "Menu +"}
          </button>
          <div
            id="home-navigation"
            className={`le-nav-links${open ? " is-open" : ""}`}
          >
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <Link
              className="le-nav-cta"
              href="mailto:info@lyricvoices.ai?subject=Enterprise%20AI%20agents"
              onClick={() => setOpen(false)}
            >
              Talk to our team <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="le-footer le-wrap">
        <div className="le-footer-top" data-reveal>
          <div>
            <Link href="/" className="le-brand" aria-label="Lyric home">
              <Image
                src="/images/lyric-logo-imagotype-2-black.svg"
                alt="Lyric"
                width={100}
                height={40}
              />
            </Link>
            <a className="le-text-link" href="mailto:info@lyricvoices.ai">
              info@lyricvoices.ai <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div>
            <span className="le-label">Explore</span>
            <div className="le-footer-links">
              {links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <span className="le-label">Elsewhere</span>
            <div className="le-footer-links">
              {socials.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  {label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <span className="le-label">From</span>
            <p className="le-locations">
              San Francisco
              <br />
              Atlanta
            </p>
          </div>
        </div>
        <div className="le-footer-bottom">
          <span>© {new Date().getFullYear()} Lyric Voices, Inc.</span>
          <div>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
            <a href="#main-content">Back to top ↑</a>
          </div>
        </div>
      </footer>
      {playbackBar}
    </div>
  )
}
