import EditorialSection from "@/components/EditorialSection"

export const metadata = {
  title: "For Brands",
  description:
    "License voices built by real talent. Explicit licensing. Transparent sourcing. Performance quality synthesis cannot match.",
}

export default function ForBrandsPage() {
  return (
    <EditorialSection
      theme="light"
      align="center"
      eyebrow="For brands"
      headline={
        <>
          License voices built by{" "}
          <em style={{ fontFamily: "var(--font-accent)", color: "#c9a96e", fontStyle: "italic" }}>real talent</em>.
        </>
      }
      body={
        <>
          Your brand voice is your sonic identity. Don&apos;t license a clone.
          License a performance. Lyric voices are built and directed by professional
          voice actors, with explicit licensing agreements, documented consent, and
          transparent sourcing. Know exactly who built your voice, how it was created,
          and where it&apos;s deployed. Scale with confidence.
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
          href="mailto:hi@lyricvoices.ai?subject=Brand%20partnership"
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
          Talk to a partnership manager
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
          A full brand-partnership page is coming soon.
        </p>
      </div>
    </EditorialSection>
  )
}
