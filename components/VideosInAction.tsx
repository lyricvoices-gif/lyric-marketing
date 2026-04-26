"use client"

import React from "react"
import Image from "next/image"

const LIGHT = "#f5f3ef"
const GOLD  = "#c9a96e"
const DARK  = "#2b2a25"

const cards = [
  {
    id: "hex",
    edition: "E01",
    voice: "MORGAN",
    vignette: "AD-STYLE VIGNETTE",
    headline: "Porsche",
    duration: "0:45",
    imageSrc: "/images/floret-hex.jpg",
    videoSrc: "/porsche_vignette.mp4",
  },
  {
    id: "nova",
    edition: "E01",
    voice: "NOVA",
    vignette: "WELLNESS-STYLE VIGNETTE",
    headline: "Yoga by the Sea",
    duration: "0:47",
    imageSrc: "/images/floret-nova.jpg",
    videoSrc: "/Yoga by the Sea.mp4",
  },
  {
    id: "morgan",
    edition: "E01",
    voice: "RIVEN",
    vignette: "FASHION AD-STYLE VIGNETTE",
    headline: "Let's Vogue",
    duration: "0:55",
    imageSrc: "/images/floret-morgan.jpg",
    videoSrc: "/vogue_vignette.mp4",
  },
]

type Card = (typeof cards)[number]

export default function VideosInAction() {
  const [activeIdx, setActiveIdx]       = React.useState(1)
  const [lightboxCard, setLightboxCard] = React.useState<Card | null>(null)
  const [hoveredSlot, setHoveredSlot]   = React.useState<number | null>(null)

  // Scroll-reveal for the section
  const sectionRef = React.useRef<HTMLElement>(null)
  const [sectionVisible, setSectionVisible] = React.useState(false)

  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) { setSectionVisible(true); return }

    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSectionVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const n = cards.length
  const advance = (dir: 1 | -1) =>
    setActiveIdx((p) => (p + dir + n) % n)

  // Fixed visual slots [left, center, right] — no CSS order changes, ever
  const slots = [
    (activeIdx - 1 + n) % n,
    activeIdx,
    (activeIdx + 1) % n,
  ]

  return (
    <section ref={sectionRef} style={{ background: LIGHT, padding: "72px 0 80px" }}>
      <style>{`
        @keyframes via-overlayFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Header row */}
      <div className="lyric-via-header" style={{
        padding: "0 48px",
        marginBottom: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "none" : "translateY(20px)",
        transition: "opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}>
        <p style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#9c958f",
          margin: 0,
        }}>
          Voices in action
        </p>

        {/* Arrow nav */}
        <div style={{ display: "flex", gap: "8px" }}>
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => advance(dir)}
              aria-label={dir === -1 ? "Previous" : "Next"}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid rgba(28,26,23,0.15)",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4a4a45",
              }}
            >
              {dir === -1 ? (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M5 1L1 5L5 9M1 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M7 1L11 5L7 9M11 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel track — entrance handled on the container, only width transitions on cards */}
      <div className="lyric-via-track" style={{
        display: "flex",
        gap: "12px",
        overflow: "hidden",
        paddingLeft: "48px",
        alignItems: "stretch",
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "none" : "translateY(20px)",
        transition: "opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}>
        {slots.map((cardIdx, visualPos) => {
          const card     = cards[cardIdx]
          const isCenter = visualPos === 1

          return (
            <div
              key={visualPos}
              className={isCenter ? "lyric-via-center" : "lyric-via-side"}
              onClick={() => { if (visualPos === 0) advance(-1); else if (visualPos === 2) advance(1) }}
              onMouseEnter={() => setHoveredSlot(visualPos)}
              onMouseLeave={() => setHoveredSlot(null)}
              style={{
                flexShrink: 0,
                width: isCenter ? "calc(66% - 6px)" : "calc(17% - 6px)",
                height: "480px",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                cursor: isCenter ? "default" : "pointer",
                background: DARK,
                transition: "width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Inner wrapper keyed to card.id */}
              <div style={{ position: "absolute", inset: 0 }}>
                {/* All card images stacked — always in DOM so they're pre-loaded.
                    Opacity cross-fade means no black flash when active card changes. */}
                <div style={{
                  position: "absolute", inset: 0,
                  transform: hoveredSlot === visualPos ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                }}>
                  {cards.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        position: "absolute", inset: 0,
                        opacity: c.id === card.id ? 1 : 0,
                        transition: "opacity 0.4s ease",
                      }}
                    >
                      <Image
                        src={c.imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 58vw"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        priority
                      />
                    </div>
                  ))}
                </div>

                {/* Dark scrim — bottom to top for text legibility */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0) 70%)",
                  pointerEvents: "none",
                }} />

                {/* Top-left: edition + vignette label — center card only */}
                {isCenter && (
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    pointerEvents: "none",
                    animation: "via-overlayFadeIn 0.35s ease both",
                  }}>
                    <span style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.65)",
                    }}>
                      {card.edition} {card.voice}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>·</span>
                    <span style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.65)",
                    }}>
                      {card.vignette}
                    </span>
                  </div>
                )}

                {/* Bottom-left: headline + watch button — center card only */}
                {isCenter && (
                  <div style={{
                    position: "absolute",
                    bottom: "28px",
                    left: "28px",
                    pointerEvents: "none",
                    animation: "via-overlayFadeIn 0.4s ease both",
                  }}>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(28px, 2.6vw, 40px)",
                      fontWeight: 500,
                      fontStyle: "italic",
                      color: "#ffffff",
                      margin: "0 0 16px",
                      lineHeight: 1.08,
                      letterSpacing: "-0.01em",
                    }}>
                      {card.headline}
                    </h3>
                    <button
                      onClick={(e) => { e.stopPropagation(); setLightboxCard(card) }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 16px 8px 13px",
                        borderRadius: "100px",
                        background: "rgba(255,255,255,0.92)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: DARK,
                        letterSpacing: "-0.01em",
                        pointerEvents: "auto",
                      }}
                    >
                      <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
                        <path d="M1 1L8 5L1 9V1Z" fill="currentColor" />
                      </svg>
                      Watch video ({card.duration})
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {lightboxCard && (
        <VideoLightbox card={lightboxCard} onClose={() => setLightboxCard(null)} />
      )}
    </section>
  )
}

// ─── Video lightbox ───────────────────────────────────────────────────────────

function VideoLightbox({ card, onClose }: { card: Card; onClose: () => void }) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isMuted,   setIsMuted]   = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration,    setDuration]    = React.useState(0)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setIsPlaying(true) }
    else          { v.pause(); setIsPlaying(false) }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setIsMuted(v.muted)
  }

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    return `${String(m).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "via-fadeIn 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <div
        style={{ width: "100%", maxWidth: "896px", position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-44px",
            right: 0,
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            fontSize: "24px",
            cursor: "pointer",
            lineHeight: 1,
            padding: "4px 8px",
          }}
        >×</button>

        {/* Video */}
        <div style={{
          position: "relative",
          paddingBottom: "56.25%",
          background: DARK,
          borderRadius: "10px 10px 0 0",
          overflow: "hidden",
        }}>
          <video
            ref={videoRef}
            src={card.videoSrc || undefined}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
            onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
          />
          {/* Photo bg in lightbox while no video */}
          {!card.videoSrc && (
            <>
              <Image
                src={card.imageSrc}
                alt=""
                fill
                style={{ objectFit: "cover", objectPosition: "center", opacity: 0.6 }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path d="M1 1L15 9L1 17V1Z" fill="rgba(255,255,255,0.5)" />
                  </svg>
                </div>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Video coming soon
                </span>
              </div>
            </>
          )}
        </div>

        {/* Control bar */}
        <div style={{
          background: "#1c1a17",
          borderRadius: "0 0 10px 10px",
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}>
          <button
            onClick={togglePlay}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: "2px", display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            {isPlaying ? (
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <rect x="0" y="0" width="4" height="14" fill="currentColor" />
                <rect x="8" y="0" width="4" height="14" fill="currentColor" />
              </svg>
            ) : (
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M0 0L12 7L0 14V0Z" fill="currentColor" />
              </svg>
            )}
          </button>

          <span style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", color: "rgba(255,255,255,0.45)", flexShrink: 0, letterSpacing: "0.04em" }}>
            {fmt(currentTime)} / {fmt(duration)}
          </span>

          <div
            style={{ flex: 1, height: "2px", background: "rgba(255,255,255,0.12)", borderRadius: "1px", position: "relative", cursor: "pointer" }}
            onClick={handleScrub}
          >
            <div style={{ height: "100%", width: `${progress}%`, background: GOLD, borderRadius: "1px", transition: "width 0.1s linear" }} />
            <div style={{ position: "absolute", top: "50%", left: `${progress}%`, transform: "translate(-50%, -50%)", width: "8px", height: "8px", borderRadius: "50%", background: GOLD }} />
          </div>

          <button
            onClick={toggleMute}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: "2px", display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            {isMuted ? (
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                <path d="M0 4H4L9 0V14L4 10H0V4Z" fill="currentColor" />
                <line x1="12" y1="4" x2="16" y2="10" stroke="currentColor" strokeWidth="1.5" />
                <line x1="16" y1="4" x2="12" y2="10" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            ) : (
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                <path d="M0 4H4L9 0V14L4 10H0V4Z" fill="currentColor" />
                <path d="M12 2C14.2 3.5 14.2 10.5 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes via-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
