/* Single article — placeholder.
   The article template (with the Lyric audio player as the editorial
   signature element) is a separate prompt. For now this stub renders
   a quiet "coming soon" so home page Notes cards don't 404 when
   clicked through. */

import Link from "next/link"

export const metadata = {
  title: "Notes — Lyric",
  description: "An ongoing publication on voice in the age of AI.",
}

export default async function NoteArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const title = slug
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")

  return (
    <main className="lv-notes-stub">
      <div className="lv-notes-stub-inner">
        <p className="lv-notes-stub-eyebrow">Notes / {title}</p>
        <h1>
          Article page <em>coming soon.</em>
        </h1>
        <p>
          The article template, with the Lyric audio player as the editorial
          signature element, is being built in a separate pass.
        </p>
        <p className="lv-notes-stub-back">
          <Link href="/">&larr; Back to home</Link>
        </p>
      </div>
    </main>
  )
}
