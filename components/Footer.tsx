import ScrollReveal from "@/components/ScrollReveal"
import Isotype from "@/components/Isotype"
import { ComingSoonBadge } from "@/components/Nav"

const SOCIAL = [
  {
    label: "Substack",
    href: "https://thelyricbriefing.substack.com/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lyricvoices.ai/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/thelyricvoices",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@lyricvoices.ai",
    icon: (
      <svg width="15" height="16" viewBox="0 0 192 192" fill="currentColor">
        <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.347-10.548h.23c8.249.053 14.474 2.452 18.502 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 6.997 4.676 16.01 6.96 25.393 6.46 12.383-.657 22.092-5.396 28.855-14.082 5.15-6.718 8.408-15.44 9.867-26.481 5.923 3.569 10.304 8.285 12.735 13.987 4.084 9.606 4.324 25.402-8.54 38.253-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.273-21.742C35.218 138.02 29.652 120.08 29.434 97.2c.218-22.88 5.784-40.82 16.537-53.311 11.213-14.258 28.464-21.573 51.273-21.742 22.981.17 40.526 7.52 52.171 21.847 5.762 7.088 10.09 15.96 12.929 26.419l16.1-4.301c-3.476-12.758-9.026-23.777-16.612-32.987C147.036 14.962 125.202 5.174 97.28 5h-.478C69.006 5.174 47.408 15.001 33.577 34.287 21.359 51.226 15.07 74.983 14.824 97.2v.4c.246 22.217 6.535 45.974 18.753 62.913C47.408 179.799 69.006 189.626 96.802 189.8h.478c24.806-.168 42.227-6.675 56.556-21.002 18.428-18.427 17.866-41.458 11.802-55.624-4.306-10.142-12.575-18.354-23.601-23.186zm-41.235 38.695c-10.427.583-21.263-4.098-21.806-14.082-.405-7.598 5.41-16.07 23.29-17.1 2.037-.117 4.035-.173 5.993-.173 6.151 0 11.92.6 17.18 1.731-1.956 24.347-14.568 29.012-24.657 29.624z" />
      </svg>
    ),
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/6iu0viCB2eTtNiE0SM1Pl6?si=c39dff580e1f4634",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@LyricVoices",
    icon: (
      <svg width="18" height="13" viewBox="0 0 24 17" fill="currentColor">
        <path d="M23.495 2.656a3.016 3.016 0 0 0-2.122-2.135C19.505 0 12 0 12 0S4.495 0 2.627.521A3.016 3.016 0 0 0 .505 2.656 31.38 31.38 0 0 0 0 8.5a31.38 31.38 0 0 0 .505 5.844 3.016 3.016 0 0 0 2.122 2.135C4.495 17 12 17 12 17s7.505 0 9.373-.521a3.016 3.016 0 0 0 2.122-2.135A31.38 31.38 0 0 0 24 8.5a31.38 31.38 0 0 0-.505-5.844zM9.546 12.068V4.932L15.818 8.5l-6.272 3.568z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const DARK = "#2b2a25"

  /* Footer columns: Products mirrors the global nav dropdown (Callio / Voices &
     Sounds). Company carries the editorial routes. Locations lists the cities
     we are based in as read-only text (no links, no full addresses). Legal
     groups the policy documents. (Imprint is retired from public navigation;
     its page still resolves but is unlinked.) */
  type FooterLink = {
    label: string
    href?: string
    comingSoon?: boolean
    download?: boolean
  }
  type FooterCol = { heading: string; links: FooterLink[] }

  const cols: FooterCol[] = [
    {
      heading: "Products",
      links: [
        { label: "Callio",            href: "/callio" },
        { label: "Agents", href: "/agents" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About",    href: "/about" },
        { label: "Notes",    href: "/notes" },
      ],
    },
    {
      heading: "Locations",
      links: [
        { label: "San Francisco" },
        { label: "Atlanta" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use",   href: "/terms" },
      ],
    },
  ]

  return (
    <footer style={{ background: DARK }}>
      <ScrollReveal>
        <div
          className="lyric-footer-inner"
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "64px 48px 44px",
          }}
        >
          {/* Top row: brand + nav columns. Layout (grid placement, rhythm,
              alignment) lives in globals.css under "Global footer" — on
              desktop this is one shared 4-row grid so each link row
              baseline-aligns with a brand row (headings ↔ isotype base,
              links ↔ tagline / email / social icons). */}
          <div className="lyric-footer-grid">
            {/* Brand block — Isotype, eyebrow signature, contact, social */}
            <div className="lyric-footer-brand">
              <div className="lyric-footer-isotype">
                <Isotype size={36} color="#f5f3ef" />
              </div>

              <p
                className="lyric-footer-tagline"
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: "20px",
                  fontStyle: "italic",
                  color: "rgba(245,243,239,0.6)",
                  lineHeight: 1.3,
                  maxWidth: "260px",
                  letterSpacing: "0",
                }}
              >
                All your agents, one brand voice.
              </p>

              <a
                className="lyric-footer-email"
                href="mailto:info@lyricvoices.ai"
                style={{
                  display: "block",
                  fontSize: "13px",
                  color: "rgba(245,243,239,0.4)",
                  letterSpacing: "0",
                }}
              >
                info@lyricvoices.ai
              </a>

              {/* Social icons — natural sizing with a 16px gap so the
                  icons sit close like the live lyricvoices.ai footer. */}
              <div
                className="lyric-footer-social"
                style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}
              >
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              <style>{`
                .footer-social-icon {
                  color: rgba(245,243,239,0.25);
                  display: flex;
                  align-items: center;
                  transition: color 0.2s;
                }
                .footer-social-icon:hover {
                  color: rgba(245,243,239,0.9);
                }
              `}</style>
            </div>

            {/* Nav columns */}
            <div className="lyric-footer-cols">
              {cols.map((col) => (
                <div key={col.heading} className="lyric-footer-col">
                  <p
                    className="lyric-footer-colhead"
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(245,243,239,0.3)",
                    }}
                  >
                    {col.heading}
                  </p>
                  {col.links.map((link) => {
                    const sharedStyle: React.CSSProperties = {
                      fontSize: "13px",
                      color: "rgba(245,243,239,0.55)",
                      letterSpacing: "0",
                    }
                    // Read-only items (e.g. Locations cities) carry no href and
                    // render as plain text rather than links.
                    if (!link.href) {
                      return (
                        <div key={link.label} className="lyric-footer-link">
                          <span style={sharedStyle}>{link.label}</span>
                        </div>
                      )
                    }
                    const isMailto = link.href.startsWith("mailto:")
                    const isExternal = link.href.startsWith("http")
                    const isDownload = "download" in link && link.download
                    return (
                      <div key={link.label} className="lyric-footer-link">
                        <a
                          href={link.href}
                          {...(isDownload
                            ? { download: true }
                            : isExternal
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : isMailto
                                ? {}
                                : {})}
                          style={{
                            ...sharedStyle,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span>{link.label}</span>
                          {("comingSoon" in link) && link.comingSoon && <ComingSoonBadge tone="dark" />}
                        </a>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar — copyright only */}
          <div
            style={{
              paddingTop: "24px",
              borderTop: "1px solid rgba(245,243,239,0.07)",
            }}
          >
            <p style={{ fontSize: "12px", color: "rgba(245,243,239,0.22)", margin: 0 }}>
              © {new Date().getFullYear()} Lyric Voices, Inc.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  )
}
