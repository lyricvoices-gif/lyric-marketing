import EditorialSection from "@/components/EditorialSection"

export const metadata = {
  title: "For Voice Artists",
  description:
    "Lyric is the voice talent partnership for the AI era. Real artists. Ongoing royalties. Creative control.",
}

export default function ForArtistsPage() {
  return (
    <EditorialSection
      theme="light"
      align="center"
      eyebrow="For voice artists"
      headline={
        <>
          Your voice is your asset.{" "}
          <em style={{ fontFamily: "var(--font-accent)", color: "#c9a96e", fontStyle: "italic" }}>Own it.</em>
        </>
      }
      body={
        <>
          At Lyric, you&apos;re not a sample. You&apos;re a partner. We work with you to
          build your voice for AI deployment. You approve how it&apos;s used, set
          boundaries, evolve your performance. You earn ongoing royalties as your
          voice scales across brand deployments. You see exactly where your voice
          is licensed and how much you&apos;re earning, in real time.
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
          href="mailto:hi@lyricvoices.ai?subject=Lyric%20Talent%20Network"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "52px",
            padding: "0 28px",
            borderRadius: "100px",
            background: "#1a1a18",
            color: "#f5f3ef",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0",
          }}
        >
          Join Lyric Talent Network
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
          A dedicated artist programme is coming soon.
        </p>
      </div>
    </EditorialSection>
  )
}
