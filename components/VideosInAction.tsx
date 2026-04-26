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

// Detect mobile via matchMedia. Returns false during SSR / first render so the
// desktop layout owns the initial paint; flips to true on mount if the viewport
// is narrow.
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isMobile
}

export default function VideosInAction() {
  const isMobile = useIsMobile()
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

  // Desktop visual slots [left, center, right]
  const slots = [
    (activeIdx - 1 + n) % n,
    activeIdx,
    (activeIdx + 1) % n,
  ]

  // ─── Mobile carousel ────────────────────────────────────────────────────
  // Real flex track that translates from one card to the next. Touch handlers
  // capture the gesture once it's clearly horizontal, then preventDefault on a
  // non-passive listener so the page can't scroll vertically mid-swipe. On
  // release we either commit (advance + animate to the next slot) or snap back.
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [dragX, setDragX]       = React.useState(0)
  const [animating, setAnimating] = React.useState(false)
  const touchRef = React.useRef<{ x: number; y: number; captured: boolean } | null>(null)
  const activeIdxRef = React.useRef(activeIdx)
  React.useEffect(() => { activeIdxRef.current = activeIdx }, [activeIdx])

  React.useEffect(() => {
    if (!isMobile) return
    const el = trackRef.current
    if (!el) return

    const onMove = (e: TouchEvent) => {
      if (!touchRef.current) return
      const t = e.touches[0]
      const dx = t.clientX - touchRef.current.x
      const dy = t.clientY - touchRef.current.y
      if (!touchRef.current.captured) {
        if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
          touchRef.current.captured = true
        } else if (Math.abs(dy) > 6) {
          // Vertical scroll wins — release the gesture
          touchRef.current = null
          return
        }
      }
      if (touchRef.current?.captured) {
        e.preventDefault() // lock page scroll once we own the gesture
        const idx = activeIdxRef.current
        let next = dx
        // Rubber-band the ends so swipe doesn't fly off; arrow buttons still wrap
        if ((idx === 0 && dx > 0) || (idx === n - 1 && dx < 0)) {
          next = dx * 0.32
        }
        setDragX(next)
      }
    }
    el.addEventListener("touchmove", onMove, { passive: false })
    return () => el.removeEventListener("touchmove", onMove)
  }, [isMobile, n])

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY, captured: false }
    setAnimating(false)
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) { setAnimating(true); setDragX(0); return }
    const t = e.changedTouches[0]
    const dx = t.clientX - touchRef.current.x
    const captured = touchRef.current.captured
    touchRef.current = null
    setAnimating(true)
    if (!captured) { setDragX(0); return }

    const threshold = 50
    if (dx < -threshold && activeIdx < n - 1) {
      setActiveIdx(activeIdx + 1)
      setDragX(0)
    } else if (dx > threshold && activeIdx > 0) {
      setActiveIdx(activeIdx - 1)
      setDragX(0)
    } else {
      setDragX(0)
    }
  }

  // Mobile track translation: each card is 100% wide with a 12px gap between
  // them. To centre card N we shift left by N * (100% + 12px), then add the
  // live drag offset.
  const mobileTransform = `translate3d(calc(${-activeIdx * 100}% - ${activeIdx * 12}px + ${dragX}px), 0, 0)`

  return (
    <section ref={sectionRef} style={{ background: LIGHT, padding: "72px 0 80px" }}>
      <style>{`
        @keyframes via-overlayFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Header row — eyebrow only; arrows now overlay the desktop carousel */}
      <div className="lyric-via-header" style={{
        padding: "0 48px",
        marginBottom: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
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
      </div>

      {isMobile ? (
        // Mobile: real flex carousel — every card is full container width.
        <div
          style={{
            padding: "0 20px",
            overflow: "hidden",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <div
            ref={trackRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
            onTransitionEnd={() => setAnimating(false)}
            style={{
              display: "flex",
              gap: "12px",
              transform: mobileTransform,
              transition: animating ? "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
              willChange: "transform",
              touchAction: "pan-y",
            }}
          >
            {cards.map((card) => (
              <MobileCarouselCard
                key={card.id}
                card={card}
                onWatch={() => setLightboxCard(card)}
              />
            ))}
          </div>

          {/* Dot indicators */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
          }}>
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => { setAnimating(true); setActiveIdx(i) }}
                aria-label={`Go to card ${i + 1}`}
                style={{
                  width: i === activeIdx ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "100px",
                  border: "none",
                  background: i === activeIdx ? "rgba(28,26,23,0.7)" : "rgba(28,26,23,0.2)",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 0.3s ease, background 0.25s ease",
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        // Desktop: existing 3-slot width-based carousel + modern overlay arrows
        <div style={{ position: "relative" }}>
        <button
          type="button"
          className="lyric-via-arrow lyric-via-arrow--prev"
          onClick={() => advance(-1)}
          aria-label="Previous"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2.5L4 7L9 11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="lyric-via-arrow lyric-via-arrow--next"
          onClick={() => advance(1)}
          aria-label="Next"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 2.5L10 7L5 11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
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
                <div style={{ position: "absolute", inset: 0 }}>
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

                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0) 70%)",
                    pointerEvents: "none",
                  }} />

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
        </div>
      )}

      {/* Lightbox */}
      {lightboxCard && (
        <VideoLightbox card={lightboxCard} onClose={() => setLightboxCard(null)} />
      )}
    </section>
  )
}

// ─── Mobile carousel card ────────────────────────────────────────────────────

function MobileCarouselCard({ card, onWatch }: { card: Card; onWatch: () => void }) {
  return (
    <div style={{
      flex: "0 0 100%",
      height: "440px",
      borderRadius: "12px",
      overflow: "hidden",
      position: "relative",
      background: DARK,
    }}>
      <Image
        src={card.imageSrc}
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0) 70%)",
        pointerEvents: "none",
      }} />

      {/* Top label row */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        right: "20px",
        display: "flex",
        alignItems: "center",
        gap: "7px",
        pointerEvents: "none",
        flexWrap: "wrap",
      }}>
        <span style={{
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
        }}>
          {card.edition} {card.voice}
        </span>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px" }}>·</span>
        <span style={{
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
        }}>
          {card.vignette}
        </span>
      </div>

      {/* Headline + CTA */}
      <div style={{
        position: "absolute",
        bottom: "24px",
        left: "24px",
        right: "24px",
      }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "30px",
          fontWeight: 500,
          fontStyle: "italic",
          color: "#ffffff",
          margin: "0 0 14px",
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
        }}>
          {card.headline}
        </h3>
        <button
          onClick={onWatch}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 16px 9px 13px",
            borderRadius: "100px",
            background: "rgba(255,255,255,0.94)",
            border: "none",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
            color: DARK,
            letterSpacing: "-0.01em",
          }}
        >
          <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
            <path d="M1 1L8 5L1 9V1Z" fill="currentColor" />
          </svg>
          Watch video ({card.duration})
        </button>
      </div>
    </div>
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
