import EditorialSection from "@/components/EditorialSection"

export const metadata = {
  title: "Score",
  description:
    "Lyric Score — performance-grade voice datasets built from real voice actor sessions. Consented, attributed, defensibly sourced.",
}

export default function ScorePage() {
  return (
    <EditorialSection
      theme="light"
      align="center"
      eyebrow="For researchers"
      headline={
        <>
          Performance-grade voice datasets.{" "}
          <em style={{ fontFamily: "var(--font-accent)", color: "#c9a96e", fontStyle: "italic" }}>
            Defensibly sourced.
          </em>
        </>
      }
      body={
        <>
          Lyric Score is a dataset product line built from real voice actor sessions.
          Anchor passages, directed emotional range, full performance metadata. Every
          recording is consented. Every artist is attributed. Every dataset is
          defensibly sourced.
        </>
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <a
          href="mailto:hi@lyricvoices.ai?subject=Lyric%20Score%20%E2%80%94%20dataset%20licensing"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "54px",
            padding: "0 28px",
            borderRadius: "100px",
            background: "#1a1a18",
            color: "#f5f3ef",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0",
          }}
        >
          Request a Score briefing
        </a>
        <p
          style={{
            fontFamily: "var(--font-accent)",
            fontStyle: "italic",
            fontSize: "17px",
            color: "#9c958f",
            margin: 0,
            letterSpacing: "0",
          }}
        >
          A full Score page is coming soon.
        </p>
      </div>
    </EditorialSection>
  )
}
