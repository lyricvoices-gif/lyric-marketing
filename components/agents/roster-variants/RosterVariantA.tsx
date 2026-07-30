"use client"

/* VARIANT A — "The Delivery Sheet" (layout exploration).
   One comparison instrument: a left attribute spine (Character / Register /
   Locale / Pace / Best for / In short) with all three voices' values aligned
   to it in columns. Horizontal hairlines only — no cells, no zebra. Listening
   sits inline as evidence; every column ends in a named action; a Shared-spec
   footer states the invariant and hands off to the governance section.
   Desktop is the signature four-column read; mobile restacks per voice. */

import { type CSSProperties } from "react"
import { ROSTER_VOICES, SHARED_SPEC_BODY, SHARED_SPEC_LEAD, STANDFIRST } from "./data"
import { PlayRing, fmtTime, useRosterAudio } from "./shared"

const MONO: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#61644C",
}

const ROWS = [
  { key: "character", label: "Character" },
  { key: "register", label: "Register" },
  { key: "locale", label: "Locale" },
  { key: "pace", label: "Pace" },
  { key: "bestFor", label: "Best for" },
  { key: "desc", label: "In short" },
  { key: "cta", label: "" },
] as const

export default function RosterVariantA() {
  const { audioRef, playing, progress, elapsed, duration, toggle } = useRosterAudio()

  const cellPad: CSSProperties = { padding: "24px 0 26px" }
  const rule: CSSProperties = { borderTop: "1px solid var(--border)" }

  const value = (v: (typeof ROSTER_VOICES)[number], key: (typeof ROWS)[number]["key"]) => {
    switch (key) {
      case "character":
        return (
          <span
            style={{
              fontFamily: "var(--font-accent)",
              fontStyle: "italic",
              fontSize: 19,
              lineHeight: 1.35,
              color: "var(--olive)",
            }}
          >
            {v.character}
          </span>
        )
      case "register":
        return (
          <span style={{ display: "block" }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--olive)" }}>{v.register}</span>
            <span style={{ display: "block", fontSize: 13, color: "#61644C" }}>{v.registerSub}</span>
          </span>
        )
      case "locale":
        return <span style={{ fontSize: 14, fontWeight: 500, color: "var(--olive)" }}>{v.locale}</span>
      case "pace":
        return (
          <span style={{ display: "block" }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--olive)" }}>{v.pace}</span>
            <span
              aria-hidden="true"
              style={{
                display: "block",
                position: "relative",
                width: 56,
                height: 1,
                background: "rgba(90,94,67,0.22)",
                marginTop: 12,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -3.5,
                  left: `${v.pacePos * 100}%`,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: v.color,
                }}
              />
            </span>
          </span>
        )
      case "bestFor":
        return <span style={{ fontSize: 14, lineHeight: 1.55, color: "var(--olive)" }}>{v.bestFor}</span>
      case "desc":
        return <span style={{ fontSize: 14, lineHeight: 1.65, color: "var(--olive)" }}>{v.desc}</span>
      case "cta":
        return (
          <a
            href={`mailto:info@lyricvoices.ai?subject=FS%20agent%20—%20start%20with%20${v.name}`}
            className="lvx-sheet-cta"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--olive)",
              textDecoration: "underline",
              textUnderlineOffset: 4,
              textDecorationThickness: 1,
            }}
          >
            Start with {v.name} →
          </a>
        )
    }
  }

  const head = (v: (typeof ROSTER_VOICES)[number]) => {
    const isOn = playing === v.id
    return (
      <div style={{ paddingBottom: 26 }}>
        <div style={{ borderTop: `2px solid ${v.color}`, marginBottom: 18 }} />
        <div style={{ height: 16, marginBottom: 6 }}>
          {v.isDefault && (
            <a
              href="#top"
              style={{
                ...MONO,
                fontSize: 10,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)" }} />
              Heard in the demo above
            </a>
          )}
        </div>
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
        <p style={{ ...MONO, letterSpacing: "0.12em", margin: "8px 0 18px" }}>{v.credit}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <PlayRing
            size={44}
            playing={isOn}
            progress={progress}
            accent={v.color}
            label={isOn ? `Pause ${v.name} sample` : `Play ${v.name} sample`}
            onClick={() => toggle(v)}
          />
          <span style={{ display: "block" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--olive)", display: "block" }}>
              {isOn ? `${fmtTime(elapsed)} / ${fmtTime(duration)}` : "Listen"}
            </span>
            <span style={{ ...MONO, fontSize: 9.5, letterSpacing: "0.12em", display: "block", marginTop: 3 }}>
              {v.sampleCaption}
            </span>
          </span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px" }}>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-1)", maxWidth: "52ch", margin: "0 0 48px" }}>
        {STANDFIRST}
      </p>

      {/* Desktop instrument */}
      <div className="lvx-sheet-desktop">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(112px, 150px) repeat(3, 1fr)",
            columnGap: "clamp(24px, 4vw, 44px)",
          }}
        >
          {/* Row 0 — heads */}
          <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 26 }}>
            <span style={MONO}>FS agent · delivery options</span>
          </div>
          {ROSTER_VOICES.map((v) => (
            <div key={`h-${v.id}`}>{head(v)}</div>
          ))}

          {/* Attribute rows */}
          {ROWS.map((row) => (
            <div key={row.key} style={{ display: "contents" }}>
              <div style={{ ...cellPad, ...rule }}>
                <span style={MONO}>{row.label}</span>
                {row.key === "pace" && (
                  <span
                    style={{
                      ...MONO,
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      display: "block",
                      marginTop: 8,
                      textTransform: "none",
                    }}
                  >
                    deliberate — brisk
                  </span>
                )}
              </div>
              {ROSTER_VOICES.map((v) => (
                <div key={`${row.key}-${v.id}`} style={{ ...cellPad, ...rule }}>
                  {value(v, row.key)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile restack — same content, per-voice blocks */}
      <div className="lvx-sheet-mobile">
        {ROSTER_VOICES.map((v) => (
          <div
            key={`m-${v.id}`}
            style={{ borderTop: `2px solid ${v.color}`, padding: "20px 0 32px", marginBottom: 8 }}
          >
            {v.isDefault && (
              <p style={{ ...MONO, fontSize: 10, margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)" }} />
                Heard in the demo above
              </p>
            )}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: v.color }} aria-hidden="true" />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 26,
                    color: "var(--olive)",
                    margin: 0,
                  }}
                >
                  {v.name}
                </h3>
              </div>
              <PlayRing
                size={44}
                playing={playing === v.id}
                progress={progress}
                accent={v.color}
                label={playing === v.id ? `Pause ${v.name} sample` : `Play ${v.name} sample`}
                onClick={() => toggle(v)}
              />
            </div>
            <p style={{ ...MONO, letterSpacing: "0.12em", margin: "8px 0 14px" }}>{v.credit}</p>
            <p
              style={{
                fontFamily: "var(--font-accent)",
                fontStyle: "italic",
                fontSize: 19,
                color: "var(--olive)",
                margin: "0 0 12px",
              }}
            >
              {v.character}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--olive)", margin: "0 0 16px" }}>{v.desc}</p>
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "84px 1fr", rowGap: 8, columnGap: 12 }}>
              <dt style={MONO}>Register</dt>
              <dd style={{ margin: 0, fontSize: 13, color: "var(--olive)" }}>
                {v.register} · {v.registerSub}
              </dd>
              <dt style={MONO}>Locale</dt>
              <dd style={{ margin: 0, fontSize: 13, color: "var(--olive)" }}>{v.locale}</dd>
              <dt style={MONO}>Pace</dt>
              <dd style={{ margin: 0, fontSize: 13, color: "var(--olive)" }}>{v.pace}</dd>
              <dt style={MONO}>Best for</dt>
              <dd style={{ margin: 0, fontSize: 13, color: "var(--olive)" }}>{v.bestFor}</dd>
            </dl>
            <p style={{ margin: "18px 0 0" }}>
              <a
                href={`mailto:info@lyricvoices.ai?subject=FS%20agent%20—%20start%20with%20${v.name}`}
                style={{ fontSize: 14, fontWeight: 500, color: "var(--olive)", textUnderlineOffset: 4 }}
              >
                Start with {v.name} →
              </a>
            </p>
          </div>
        ))}
      </div>

      {/* Shared-spec footer */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, marginTop: 8 }}>
        <span style={MONO}>{SHARED_SPEC_LEAD}</span>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-1)", maxWidth: "62ch", margin: "10px 0 0" }}>
          {SHARED_SPEC_BODY}
        </p>
      </div>

      <audio ref={audioRef} preload="none" />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .lvx-sheet-mobile { display: none; }
            @media (max-width: 899px) {
              .lvx-sheet-desktop { display: none; }
              .lvx-sheet-mobile { display: block; }
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
