"use client"

/* VARIANT B — "The Voice Register" (layout exploration).
   One bordered "controlled document" on surface-bright: an engineering-
   drawing title block, three identical specification entries (identification /
   human read / spec strip / audition), and a shared-spec footer strip. The
   double meaning of "register" (vocal register / official registry) does the
   positioning: the buyer reviews three interchangeable, QA'd line items inside
   one governed spec. Sol is marked DEFAULT via a gold-ground chip — config
   documents recommend via "default", not via size. */

import { type CSSProperties } from "react"
import { ROSTER_VOICES, SHARED_SPEC_LEAD, STANDFIRST } from "./data"
import { PlayRing, fmtTime, useRosterAudio } from "./shared"

const MONO: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#61644C",
}

const SPEC_FIELDS = [
  { key: "register", label: "Register" },
  { key: "locale", label: "Locale" },
  { key: "pace", label: "Pace" },
  { key: "bestFor", label: "Best for" },
  { key: "production", label: "Production" },
] as const

export default function RosterVariantB() {
  const { audioRef, playing, progress, elapsed, duration, toggle } = useRosterAudio()

  const specValue = (v: (typeof ROSTER_VOICES)[number], key: (typeof SPEC_FIELDS)[number]["key"]) => {
    switch (key) {
      case "register":
        return `${v.register} · ${v.registerSub}`
      case "locale":
        return v.locale
      case "pace":
        return v.pace
      case "bestFor":
        return v.bestFor
      case "production":
        return "Produced performance · QA'd"
    }
  }

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px" }}>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-1)", maxWidth: "56ch", margin: "0 0 48px" }}>
        {STANDFIRST}
      </p>

      <div
        style={{
          background: "var(--surface-bright, #FFFDF7)",
          border: "1px solid var(--border)",
          borderRadius: 3,
        }}
      >
        {/* Title block */}
        <div
          className="lvx-reg-titleblock"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "8px 28px",
            padding: "18px 32px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span style={MONO}>Governed voice register</span>
          <span style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <span style={MONO}>
              Voices <span style={{ color: "var(--olive)" }}>03</span>
            </span>
            <span style={MONO}>
              Status <span style={{ color: "var(--olive)" }}>Produced</span>
            </span>
            <span style={MONO}>
              Spec <span style={{ color: "var(--olive)" }}>Shared</span>
            </span>
          </span>
        </div>

        {/* Entries */}
        {ROSTER_VOICES.map((v, i) => {
          const isOn = playing === v.id
          return (
            <div
              key={v.id}
              className="lvx-reg-entry"
              style={{
                position: "relative",
                padding: "40px 32px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {/* accent file-folder edge */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 24,
                  bottom: 24,
                  width: 2,
                  background: isOn ? v.color : `color-mix(in srgb, ${v.color} 50%, transparent)`,
                }}
              />
              <div className="lvx-reg-grid">
                {/* COL A — identification */}
                <div>
                  <p style={{ ...MONO, letterSpacing: "0.14em", margin: "0 0 10px" }}>
                    Entry 0{i + 1} / 03
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      className={isOn ? "lvx-dot lvx-dot-on" : "lvx-dot"}
                      style={{ width: 9, height: 9, borderRadius: "50%", background: v.color }}
                      aria-hidden="true"
                    />
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: "clamp(26px, 3vw, 32px)",
                        color: "var(--olive)",
                        margin: 0,
                      }}
                    >
                      {v.name}
                    </h3>
                  </div>
                  <p style={{ ...MONO, letterSpacing: "0.12em", margin: "8px 0 0" }}>{v.credit}</p>
                  {v.isDefault && (
                    <p style={{ margin: "14px 0 0" }}>
                      <a
                        href="#top"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9.5,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--olive)",
                          background: "color-mix(in srgb, var(--gold) 32%, var(--surface-bright, #FFFDF7))",
                          border: "1px solid color-mix(in srgb, var(--gold) 55%, transparent)",
                          borderRadius: 3,
                          padding: "4px 10px",
                          display: "inline-block",
                          textDecoration: "none",
                        }}
                      >
                        Default · heard in the demo above
                      </a>
                    </p>
                  )}
                </div>

                {/* COL B — the human read */}
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-accent)",
                      fontStyle: "italic",
                      fontSize: 19,
                      lineHeight: 1.3,
                      color: "var(--olive)",
                      margin: 0,
                    }}
                  >
                    {v.character}
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: "var(--olive)",
                      maxWidth: "46ch",
                      margin: "12px 0 0",
                    }}
                  >
                    {v.desc}
                  </p>
                </div>

                {/* COL C — spec strip */}
                <dl className="lvx-reg-spec" style={{ margin: 0 }}>
                  {SPEC_FIELDS.map((f) => (
                    <div key={f.key} style={{ display: "flex", gap: 12, marginBottom: 9 }}>
                      <dt
                        style={{
                          ...MONO,
                          fontSize: 9.5,
                          letterSpacing: "0.16em",
                          flex: "0 0 96px",
                          paddingTop: 2,
                        }}
                      >
                        {f.label}
                      </dt>
                      <dd style={{ margin: 0, fontSize: 13, lineHeight: 1.45, color: "var(--olive)" }}>
                        {specValue(v, f.key)}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* COL D — audition */}
                <div style={{ textAlign: "center" }}>
                  <p style={{ ...MONO, fontSize: 9.5, letterSpacing: "0.16em", margin: "0 0 10px" }}>Audition</p>
                  <PlayRing
                    size={56}
                    playing={isOn}
                    progress={progress}
                    accent={v.color}
                    label={isOn ? `Pause ${v.name} sample` : `Play ${v.name} sample`}
                    onClick={() => toggle(v)}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: isOn ? "var(--olive)" : "#61644C",
                      margin: "10px 0 0",
                    }}
                  >
                    {isOn ? `${fmtTime(elapsed)} / ${fmtTime(duration)}` : "Play"}
                  </p>
                  <p
                    style={{
                      ...MONO,
                      fontSize: 8.5,
                      letterSpacing: "0.1em",
                      margin: "6px 0 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {v.sampleCaption}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "10px 28px",
            padding: "18px 32px",
          }}
        >
          <span style={MONO}>{SHARED_SPEC_LEAD}</span>
          <a
            href="mailto:info@lyricvoices.ai?subject=FS%20agent%20voices"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--olive)",
              textUnderlineOffset: 4,
            }}
          >
            Talk through the choice →
          </a>
        </div>
      </div>

      <audio ref={audioRef} preload="none" />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .lvx-reg-grid {
              display: grid;
              grid-template-columns: 190px minmax(0, 1fr) 280px 96px;
              column-gap: 40px;
              align-items: start;
            }
            @media (max-width: 899px) {
              .lvx-reg-grid {
                grid-template-columns: 1fr auto;
                row-gap: 20px;
              }
              .lvx-reg-grid > :nth-child(2) { grid-column: 1 / -1; }
              .lvx-reg-grid > :nth-child(3) { grid-column: 1 / -1; }
              .lvx-reg-entry { padding: 28px 20px !important; }
              .lvx-reg-titleblock { padding: 16px 20px !important; }
            }
            .lvx-dot-on { animation: lvx-pulse 3.6s ease-in-out infinite; }
            @keyframes lvx-pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.35); opacity: 0.7; }
            }
            @media (prefers-reduced-motion: reduce) {
              .lvx-dot-on { animation: none; }
            }
            .lvx-ring-btn:focus-visible { outline: 2px solid var(--olive); outline-offset: 3px; border-radius: 50%; }
          `,
        }}
      />
    </div>
  )
}
