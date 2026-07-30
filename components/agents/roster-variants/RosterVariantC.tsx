"use client"

/* VARIANT C — "The Voice Library" (layout exploration, ElevenLabs-inspired).
   The reference grammar (per the ElevenLabs DESIGN.md analysis): flat and
   unboxed — hairlines and spacing do the separation; voices as horizontal
   library rows (circular mark left, name + metadata + preview CTA); pill
   badges; atmospheric pastel color only inside the product visual (here, the
   play disc's soft per-voice orb); audio is the hero. Translated into Lyric
   tokens: cream ground, olive ink, GT Super names, GT America body, mono
   micro-labels, per-voice accents at low saturation. Sol leads via a gold
   "Default" pill, not size. */

import { type CSSProperties } from "react"
import { ROSTER_VOICES, SHARED_SPEC_LEAD, STANDFIRST } from "./data"
import { fmtTime, useRosterAudio } from "./shared"

const MONO: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#61644C",
}

function Pill({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--olive)",
        background: gold
          ? "color-mix(in srgb, var(--gold) 32%, #FFFDF7)"
          : "rgba(90, 94, 67, 0.07)",
        border: gold ? "1px solid color-mix(in srgb, var(--gold) 55%, transparent)" : "1px solid transparent",
        borderRadius: 9999,
        padding: "4px 12px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  )
}

export default function RosterVariantC() {
  const { audioRef, playing, progress, elapsed, duration, toggle } = useRosterAudio()

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px" }}>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-1)", maxWidth: "56ch", margin: "0 0 40px" }}>
        {STANDFIRST}
      </p>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {ROSTER_VOICES.map((v) => {
          const isOn = playing === v.id
          const r = 31
          const c = 2 * Math.PI * r
          return (
            <div
              key={v.id}
              className="lvx-lib-row"
              style={{
                borderBottom: "1px solid var(--border)",
                background: isOn ? "var(--surface-bright, #FFFDF7)" : "transparent",
                boxShadow: isOn ? "0 4px 16px rgba(0, 0, 0, 0.04)" : "none",
                borderRadius: isOn ? 16 : 0,
                transition: "background 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease",
              }}
            >
              <div className="lvx-lib-grid">
                {/* Play disc — the row's one color moment */}
                <button
                  type="button"
                  onClick={() => toggle(v)}
                  aria-label={isOn ? `Pause ${v.name} sample` : `Play ${v.name} sample`}
                  aria-pressed={isOn}
                  className="lvx-lib-disc"
                  style={{
                    position: "relative",
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--olive)",
                    background: `radial-gradient(circle at 32% 30%, color-mix(in srgb, ${v.color} 52%, #FFFDF7), color-mix(in srgb, ${v.color} 14%, #FFFDF7) 72%)`,
                  }}
                >
                  {isOn && (
                    <svg
                      viewBox="0 0 68 68"
                      width={68}
                      height={68}
                      aria-hidden="true"
                      style={{ position: "absolute", inset: -2, transform: "rotate(-90deg)" }}
                    >
                      <circle
                        cx="34"
                        cy="34"
                        r={r}
                        fill="none"
                        stroke={v.color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={c}
                        strokeDashoffset={c * (1 - progress)}
                      />
                    </svg>
                  )}
                  <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" aria-hidden="true">
                    {isOn ? (
                      <>
                        <rect x="7" y="5" width="3.5" height="14" rx="1" />
                        <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
                      </>
                    ) : (
                      <path d="M8 5.5v13l11-6.5z" />
                    )}
                  </svg>
                </button>

                {/* Identity */}
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 28,
                        color: "var(--olive)",
                        margin: 0,
                      }}
                    >
                      {v.name}
                    </h3>
                    <span style={{ ...MONO, letterSpacing: "0.12em" }}>{v.credit}</span>
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "#61644C",
                      maxWidth: "58ch",
                      margin: "8px 0 0",
                    }}
                  >
                    {v.desc}
                  </p>
                  <p
                    aria-live="polite"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "#61644C",
                      margin: "8px 0 0",
                      minHeight: 16,
                    }}
                  >
                    {isOn ? `${fmtTime(elapsed)} / ${fmtTime(duration)} — ${v.sampleCaption}` : ""}
                  </p>
                </div>

                {/* Metadata pills */}
                <div className="lvx-lib-pills">
                  {v.isDefault && <Pill gold>Default</Pill>}
                  <Pill>{v.locale}</Pill>
                  <Pill>{v.pace}</Pill>
                  <Pill>{v.register}</Pill>
                </div>

                {/* Row CTA */}
                <div className="lvx-lib-cta">
                  <a
                    href={`mailto:info@lyricvoices.ai?subject=FS%20agent%20—%20start%20with%20${v.name}`}
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--olive)",
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                      textDecorationThickness: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Start with {v.name} →
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p style={{ ...MONO, margin: "24px 0 0" }}>{SHARED_SPEC_LEAD}</p>

      <audio ref={audioRef} preload="none" />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .lvx-lib-grid {
              display: grid;
              grid-template-columns: 64px minmax(0, 1fr) auto auto;
              gap: 24px;
              align-items: center;
              padding: 28px 20px;
            }
            .lvx-lib-pills {
              display: flex;
              flex-direction: column;
              gap: 8px;
              align-items: flex-start;
            }
            @media (min-width: 1100px) {
              .lvx-lib-pills { flex-direction: row; align-items: center; }
            }
            @media (max-width: 899px) {
              .lvx-lib-grid {
                grid-template-columns: 56px minmax(0, 1fr);
                gap: 16px 18px;
                padding: 24px 4px;
              }
              .lvx-lib-disc { width: 56px !important; height: 56px !important; }
              .lvx-lib-pills {
                grid-column: 2;
                flex-direction: row;
                flex-wrap: wrap;
              }
              .lvx-lib-cta { grid-column: 2; }
            }
            .lvx-lib-disc:focus-visible { outline: 2px solid var(--olive); outline-offset: 3px; }
            @media (prefers-reduced-motion: reduce) {
              .lvx-lib-row { transition: none !important; }
            }
          `,
        }}
      />
    </div>
  )
}
