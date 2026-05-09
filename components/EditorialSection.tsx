import React from "react"
import ScrollReveal from "@/components/ScrollReveal"

type Theme = "light" | "dark"
type Align = "center" | "left"

type Props = {
  eyebrow?: string
  headline: React.ReactNode
  body?: React.ReactNode
  children?: React.ReactNode
  theme?: Theme
  align?: Align
  maxWidth?: number
  className?: string
}

const DARK   = "#2b2a25"
const LIGHT  = "#f5f3ef"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const BORDER = "#e5dfd5"

export default function EditorialSection({
  eyebrow,
  headline,
  body,
  children,
  theme = "light",
  align = "center",
  maxWidth = 720,
  className,
}: Props) {
  const isDark = theme === "dark"
  const bg = isDark ? DARK : LIGHT
  const headlineColor = isDark ? "#f5f3ef" : TEXT1
  const bodyColor = isDark ? "rgba(245,243,239,0.7)" : TEXT2
  const eyebrowColor = isDark ? "rgba(245,243,239,0.45)" : "#9c958f"

  return (
    <section
      className={`lyric-section ${className ?? ""}`.trim()}
      style={{
        background: bg,
        padding: "88px 48px",
        borderTop: isDark ? "none" : `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          maxWidth: `${maxWidth}px`,
          margin: "0 auto",
          textAlign: align,
        }}
      >
        {eyebrow && (
          <ScrollReveal>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: eyebrowColor,
                margin: "0 0 28px",
              }}
            >
              {eyebrow}
            </p>
          </ScrollReveal>
        )}

        <ScrollReveal delay={60}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.5vw, 48px)",
              fontWeight: 500,
              color: headlineColor,
              lineHeight: 1.1,
              letterSpacing: "0",
              margin: 0,
            }}
          >
            {headline}
          </h2>
        </ScrollReveal>

        {body && (
          <ScrollReveal delay={120}>
            <div
              style={{
                fontSize: "16px",
                color: bodyColor,
                lineHeight: 1.6,
                margin: "28px 0 0",
                letterSpacing: "0",
              }}
            >
              {body}
            </div>
          </ScrollReveal>
        )}

        {children && (
          <ScrollReveal delay={180}>
            <div style={{ marginTop: "36px" }}>{children}</div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
