"use client"

/* Self-service FAQ as an accordion. First item open by default so the page
   never reads as a wall of closed drawers; one item open at a time keeps the
   reading focused (clicking the open item closes it). Open/close animates via
   the 0fr -> 1fr grid-rows trick, height-agnostic, and the transition is
   gated behind prefers-reduced-motion in globals.css. */

import { useState } from "react"

export type FaqItem = { q: string; a: string }

export default function AgentsFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="lv-agfaq">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `lv-agfaq-panel-${i}`
        const btnId = `lv-agfaq-btn-${i}`
        return (
          <div key={item.q} className={`lv-agfaq-item${isOpen ? " is-open" : ""}`}>
            <h3 className="lv-agfaq-h">
              <button
                type="button"
                id={btnId}
                className="lv-agfaq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <svg
                  className="lv-agfaq-chevron"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="lv-agfaq-panel"
            >
              <div className="lv-agfaq-panel-inner">
                <p className="lv-agfaq-a">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
