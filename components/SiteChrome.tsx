"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

/* Wraps the global chrome (nav, footer, persistent playback bar) so it can be
   suppressed on standalone routes. Case studies read as self-contained editorial
   pieces, deliberately separate from the marketing site's navigation. The chrome
   elements are rendered server-side in the layout and passed in as props, so the
   only client concern here is the pathname check. */

const STANDALONE_PREFIXES = ["/case-studies"]

export default function SiteChrome({
  nav,
  footer,
  playbackBar,
  children,
}: {
  nav: ReactNode
  footer: ReactNode
  playbackBar: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()
  const standalone = STANDALONE_PREFIXES.some((p) => pathname?.startsWith(p))

  if (standalone) {
    return <main style={{ paddingTop: 0 }}>{children}</main>
  }

  return (
    <>
      {nav}
      <main>{children}</main>
      {footer}
      {playbackBar}
    </>
  )
}
