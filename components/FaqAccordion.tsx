"use client"

import { useState } from "react"

const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

interface FaqItem {
  q: string
  a: string
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "24px",
              padding: "24px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <p style={{
              fontSize: "14px",
              fontWeight: 600,
              color: TEXT1,
              margin: 0,
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
            }}>
              {faq.q}
            </p>
            <span style={{
              fontSize: "20px",
              color: TEXT3,
              flexShrink: 0,
              lineHeight: 1,
              display: "block",
              transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
              +
            </span>
          </button>
          <div style={{
            maxHeight: openIndex === i ? "320px" : "0",
            opacity: openIndex === i ? 1 : 0,
            overflow: "hidden",
            transition: openIndex === i
              ? "max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease"
              : "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease",
          }}>
            <p style={{
              fontSize: "13px",
              color: TEXT2,
              lineHeight: 1.7,
              margin: "0 0 24px",
              maxWidth: "560px",
              transform: openIndex === i ? "translateY(0)" : "translateY(-4px)",
              transition: openIndex === i
                ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                : "transform 0.2s ease",
            }}>
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
