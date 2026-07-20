"use client"

import Link from "next/link"
import { useState } from "react"
import ScrollReveal from "@/components/ScrollReveal"

/* The contents table of the portfolio index. Six hairline rows on paper;
   hovering a row summons that study's plate, fixed and centered beneath the
   type, while the other rows ghost. The plate arrives pre-captioned, like a
   tipped-in print plate. On touch devices the table stays pure type and the
   media lives in the Plates section below. */

export type PortfolioEntry = {
  num: string
  year: string
  client: string
  pre: string
  italic: string
  post: string
  href: string
  accent: string
  plate: string
  caption: string
}

const INK = "#141410"
const INK_DIM = "rgba(20, 20, 16, 0.55)"
const HAIRLINE = "rgba(20, 20, 16, 0.16)"

export default function PortfolioIndex({ entries }: { entries: PortfolioEntry[] }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div onMouseLeave={() => setActive(null)}>
      <style>{`
        .pi-plates {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pi-plate {
          position: absolute;
          margin: 0;
          width: min(46vw, 620px);
          opacity: 0;
          transform: scale(1.015);
          transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pi-plate img {
          display: block;
          width: 100%;
          aspect-ratio: 3 / 2;
          object-fit: cover;
          border: 1px solid ${HAIRLINE};
          background: #e9e6df;
          box-shadow: 0 24px 80px rgba(20, 20, 16, 0.16);
        }
        .pi-plate figcaption {
          font-family: var(--pf-sans, sans-serif);
          font-style: italic;
          font-size: 13px;
          line-height: 1.5;
          letter-spacing: 0.01em;
          color: ${INK_DIM};
          text-align: center;
          margin-top: 14px;
        }
        .pi-plate.pi-on {
          opacity: 1;
          transform: scale(1);
        }
        .pi-table {
          position: relative;
          z-index: 1;
          border-bottom: 1px solid ${HAIRLINE};
        }
        .pi-row {
          display: grid;
          grid-template-columns: 56px 72px 176px 1fr auto;
          align-items: baseline;
          gap: 16px;
          padding: 30px 0;
          border-top: 1px solid ${HAIRLINE};
          text-decoration: none;
          transition: opacity 0.35s ease, border-color 0.25s ease;
        }
        .pi-table.pi-hovering .pi-row:not(.pi-on) {
          opacity: 0.22;
        }
        .pi-row.pi-on {
          border-top-color: var(--acc);
        }
        .pi-row:focus-visible {
          outline: 1px solid var(--acc);
          outline-offset: 6px;
        }
        .pi-num,
        .pi-year,
        .pi-client {
          font-family: var(--pf-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${INK_DIM};
        }
        .pi-title {
          font-family: var(--pf-sans, sans-serif);
          font-size: clamp(24px, 3.2vw, 40px);
          font-weight: 500;
          line-height: 1.06;
          letter-spacing: -0.01em;
          color: ${INK};
        }
        .pi-title em {
          font-style: italic;
          font-weight: 400;
        }
        .pi-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--acc);
          align-self: center;
        }
        @media (hover: none), (max-width: 900px) {
          .pi-plates {
            display: none;
          }
          .pi-table.pi-hovering .pi-row:not(.pi-on) {
            opacity: 1;
          }
        }
        @media (max-width: 760px) {
          .pi-row {
            grid-template-columns: 44px 1fr 14px;
            grid-template-areas:
              "num client dot"
              "num title dot";
            row-gap: 8px;
            align-items: start;
          }
          .pi-num { grid-area: num; }
          .pi-client { grid-area: client; }
          .pi-title { grid-area: title; }
          .pi-dot { grid-area: dot; align-self: start; margin-top: 5px; }
          .pi-year { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pi-row,
          .pi-plate {
            transition: none;
          }
          .pi-plate {
            transform: none;
          }
          .pi-table.pi-hovering .pi-row:not(.pi-on) {
            opacity: 0.5;
          }
        }
      `}</style>

      {/* The plate layer. Beneath the type; visible only while a row is held. */}
      <div className="pi-plates" aria-hidden="true">
        {entries.map((e, i) => (
          <figure key={e.href} className={`pi-plate${i === active ? " pi-on" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={e.plate} alt="" loading="lazy" />
            <figcaption>{e.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className={`pi-table${active !== null ? " pi-hovering" : ""}`}>
        {entries.map((e, i) => (
          <ScrollReveal key={e.href} delay={i * 70}>
            <Link
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`pi-row${i === active ? " pi-on" : ""}`}
              style={{ "--acc": e.accent } as React.CSSProperties}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="pi-num">{e.num}</span>
              <span className="pi-year">{e.year}</span>
              <span className="pi-client">{e.client}</span>
              <span className="pi-title">
                {e.pre}
                <em>{e.italic}</em>
                {e.post}
              </span>
              <span className="pi-dot" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
