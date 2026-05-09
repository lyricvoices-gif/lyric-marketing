/* Notes archive — placeholder.
   The dedicated archive page will be built in a future pass. The
   home page Notes grid links here; for now this stub renders a
   quiet "coming soon" so visits don't 404. */

import Link from "next/link"

export const metadata = {
  title: "Notes — Lyric",
  description: "An ongoing publication on voice in the age of AI.",
}

export default function NotesIndexPage() {
  return (
    <main className="lv-notes-stub">
      <div className="lv-notes-stub-inner">
        <p className="lv-notes-stub-eyebrow">Notes</p>
        <h1>
          The archive is <em>on the way.</em>
        </h1>
        <p>
          The full Notes archive will live here. In the meantime, the three
          featured pieces on the home page lead to placeholder routes too;
          each will become its own article page in a coming pass.
        </p>
        <p className="lv-notes-stub-back">
          <Link href="/">&larr; Back to home</Link>
        </p>
      </div>
    </main>
  )
}
